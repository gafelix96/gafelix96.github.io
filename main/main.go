package main

import (
	"crypto/md5"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

type Food struct {
	infoPath string
	dataPath string
	data     []FoodData
	hash     map[string]interface{}
}

type FoodData struct {
	Name   string  `json:"itemName"`
	Res    string  `json:"resourceName"`
	Hunger float64 `json:"hunger"`
	Energy int     `json:"energy"`
	Fep    []struct {
		Name  string  `json:"name"`
		Value float64 `json:"value"`
	} `json:"feps"`
	Ingredients []struct {
		Name       string `json:"name"`
		Percentage int    `json:"percentage"`
	} `json:"ingredients"`
}

func GetMD5HashFromInfo(foodInfo FoodData) string {
	builder := strings.Builder{}
	builder.WriteString(foodInfo.Name)
	builder.WriteString(";")
	builder.WriteString(foodInfo.Res)
	builder.WriteString(";")

	for _, ingredient := range foodInfo.Ingredients {
		builder.WriteString(ingredient.Name)
		builder.WriteString(";")
		builder.WriteString(fmt.Sprintf("%d", ingredient.Percentage))
		builder.WriteString(";")
	}
	return GetMD5Hash(builder.String())
}

func GetMD5Hash(text string) string {
	data := []byte(text)
	return fmt.Sprintf("%x", md5.Sum(data))
}

func create(p string) (*os.File, error) {
	if err := os.MkdirAll(filepath.Dir(p), 0770); err != nil {
		return nil, err
	}
	return os.Create(p)
}

var (
	dataPath = filepath.FromSlash("frontend/api/data/food-info2.json")
	infoPath = filepath.FromSlash("frontend/api/data/food-info.json")

	port = flag.Int("port", func() int {
		if port, ok := os.LookupEnv("HNHFOOD_PORT"); ok {
			p, err := strconv.Atoi(port)
			if err != nil {
				log.Fatal(err)
			}
			return p
		}
		return 8080
	}(), "Port to listen on")
)

func main() {
	flag.Parse()

	m := Food{
		dataPath: dataPath,
		infoPath: infoPath,
	}

	//load hash
	infoBuf, err := os.ReadFile(infoPath)
	if err != nil {
		log.Println(err)
		if errors.Is(err, os.ErrNotExist) {
			log.Println("creating")
			infoFile, err := create(infoPath)
			if err != nil {
				log.Println(err)
				return
			}
			infoBuf = []byte("{}")
			_, err = infoFile.Write(infoBuf)
			if err != nil {
				log.Println(err)
				return
			}
			defer infoFile.Close()
		}
	}

	err = json.Unmarshal(infoBuf, &m.hash)
	if err != nil {
		log.Println(err)
		return
	}

	//load data
	dataBuf, err := os.ReadFile(dataPath)
	if err != nil {
		log.Println(err)
		if errors.Is(err, os.ErrNotExist) {
			log.Println("creating")
			dataFile, err := create(dataPath)
			if err != nil {
				log.Println(err)
				return
			}
			dataBuf = []byte("[]")
			_, err = dataFile.Write(dataBuf)
			if err != nil {
				log.Println(err)
				return
			}
			defer dataFile.Close()
		}
	}

	err = json.Unmarshal(dataBuf, &m.data)
	if err != nil {
		log.Println(err)
		return
	}

	//check hash
	var dirty bool
	if len(m.data) < 100 {
		for _, foodData := range m.data {
			dirty = m.checkHashAndAdd(foodData) || dirty
		}
	}

	if dirty {
		dirty = false
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
	}

	http.Handle("/", http.FileServer(http.Dir("frontend")))

	http.HandleFunc("/api/food", m.api)
	http.Handle("/api/data/food-info2.json", http.FileServer(http.Dir("frontend")))
	http.HandleFunc("/api/data/food-info.json", m.foodInfo)

	log.Printf("Listening on port %d", *port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), nil))
}
