package main

import (
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"unicode"
)

func (m *Food) hasHash(foodData FoodData) bool {
	hash := GetMD5HashFromInfo(foodData)
	return m.hash[hash] != nil
}

func (m *Food) checkHashAndAdd(foodData FoodData) bool {
	if m.checkName(foodData) {
		hash := GetMD5HashFromInfo(foodData)
		if m.hash[hash] == nil {
			m.hash[hash] = map[string]string{}
			return true
		}
	}
	return false
}

func (m *Food) checkName(foodData FoodData) bool {
	for _, r := range foodData.Name {
		if unicode.Is(unicode.Cyrillic, r) || unicode.Is(unicode.Han, r) || unicode.Is(unicode.Hangul, r) {
			return false
		}
	}
	for _, ingredient := range foodData.Ingredients {
		for _, r := range ingredient.Name {
			if unicode.Is(unicode.Cyrillic, r) || unicode.Is(unicode.Han, r) || unicode.Is(unicode.Hangul, r) {
				return false
			}
		}
	}
	return true
}

func (m *Food) checkHunger(foodData FoodData) bool {
	hash := GetMD5HashFromInfo(foodData)
	for i, r := range m.data {
		hash2 := GetMD5HashFromInfo(r)
		if hash == hash2 {
			if r.Hunger != foodData.Hunger {
				m.data = append(m.data[:i], m.data[i+1:]...)
				return true
			}
		}
	}
	return false
}

func (m *Food) api(rw http.ResponseWriter, req *http.Request) {
	defer req.Body.Close()
	log.Println(req)

	buf, err := io.ReadAll(req.Body)
	if err != nil {
		log.Println(err)
		http.Redirect(rw, req, "/", 302)
		return
	}

	var data []FoodData

	err = json.Unmarshal(buf, &data)
	if err != nil {
		log.Println(err)
		http.Redirect(rw, req, "/", 302)
		return
	}

	rw.WriteHeader(200)
	_, err = rw.Write([]byte{})
	if err != nil {
		log.Println(err)
	}

	var data2 []FoodData
	var dirty bool
	if len(data) < 100 {
		for _, foodData := range data {
			added := m.checkHashAndAdd(foodData)
			if added {
				dirty = true
				data2 = append(data2, foodData)
			} else {
				ch := m.checkHunger(foodData)
				if ch {
					dirty = true
					data2 = append(data2, foodData)
				}
			}
		}
	}

	if dirty {
		bytes, err := json.Marshal(m.hash)
		if err != nil {
			log.Println(err)
			return
		}
		err = os.WriteFile(m.infoPath, bytes, 0666)
		if err != nil {
			log.Println(err)
			return
		}
		if len(data2) > 0 {
			m.data = append(m.data, data2...)

			bytes, err := json.Marshal(m.data)
			if err != nil {
				log.Println(err)
				return
			}
			err = os.WriteFile(m.dataPath, bytes, 0666)
			if err != nil {
				log.Println(err)
				return
			}
		}
	}
}

func (m *Food) foodInfo(rw http.ResponseWriter, req *http.Request) {
	log.Println(req)
	data, err := os.ReadFile(m.infoPath)
	if err != nil {
		_, err := fmt.Fprint(rw, err)
		if err != nil {
			log.Println(err)
			return
		}
		return
	}

	rw.WriteHeader(200)
	if strings.Contains(req.Header.Get("User-Agent"), "H&H Client/") {
		w := gzip.NewWriter(rw)
		_, err := w.Write(data)
		if err != nil {
			log.Println(err)
			return
		}
		err = w.Close()
		if err != nil {
			log.Println(err)
			return
		}
	} else {
		_, err := rw.Write(data)
		if err != nil {
			log.Println(err)
			return
		}
	}
}
