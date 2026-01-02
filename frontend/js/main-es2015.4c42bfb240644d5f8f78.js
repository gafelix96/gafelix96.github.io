(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
    0: function (t, e, n) {
        t.exports = n("zUnb")
    }, zUnb: function (t, e, n) {
        "use strict";

        function s(t) {
            return "function" == typeof t
        }

        n.r(e);
        let i = !1;
        const r = {
            Promise: void 0, set useDeprecatedSynchronousErrorHandling(t) {
                if (t) {
                    const t = new Error;
                    console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + t.stack)
                } else i && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                i = t
            }, get useDeprecatedSynchronousErrorHandling() {
                return i
            }
        };

        function o(t) {
            setTimeout(() => {
                throw t
            }, 0)
        }

        const a = {
            closed: !0, next(t) {
            }, error(t) {
                if (r.useDeprecatedSynchronousErrorHandling) throw t;
                o(t)
            }, complete() {
            }
        }, l = (() => Array.isArray || (t => t && "number" == typeof t.length))();

        function c(t) {
            return null !== t && "object" == typeof t
        }

        const h = (() => {
            function t(t) {
                return Error.call(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((t, e) => `${e + 1}) ${t.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t, this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();
        let u = (() => {
            class t {
                constructor(t) {
                    this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._unsubscribe = t)
                }

                unsubscribe() {
                    let e;
                    if (this.closed) return;
                    let {_parentOrParents: n, _unsubscribe: i, _subscriptions: r} = this;
                    if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, n instanceof t) n.remove(this); else if (null !== n) for (let t = 0; t < n.length; ++t) n[t].remove(this);
                    if (s(i)) try {
                        i.call(this)
                    } catch (o) {
                        e = o instanceof h ? d(o.errors) : [o]
                    }
                    if (l(r)) {
                        let t = -1, n = r.length;
                        for (; ++t < n;) {
                            const n = r[t];
                            if (c(n)) try {
                                n.unsubscribe()
                            } catch (o) {
                                e = e || [], o instanceof h ? e = e.concat(d(o.errors)) : e.push(o)
                            }
                        }
                    }
                    if (e) throw new h(e)
                }

                add(e) {
                    let n = e;
                    if (!e) return t.EMPTY;
                    switch (typeof e) {
                        case"function":
                            n = new t(e);
                        case"object":
                            if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
                            if (this.closed) return n.unsubscribe(), n;
                            if (!(n instanceof t)) {
                                const e = n;
                                n = new t, n._subscriptions = [e]
                            }
                            break;
                        default:
                            throw new Error("unrecognized teardown " + e + " added to Subscription.")
                    }
                    let {_parentOrParents: s} = n;
                    if (null === s) n._parentOrParents = this; else if (s instanceof t) {
                        if (s === this) return n;
                        n._parentOrParents = [s, this]
                    } else {
                        if (-1 !== s.indexOf(this)) return n;
                        s.push(this)
                    }
                    const i = this._subscriptions;
                    return null === i ? this._subscriptions = [n] : i.push(n), n
                }

                remove(t) {
                    const e = this._subscriptions;
                    if (e) {
                        const n = e.indexOf(t);
                        -1 !== n && e.splice(n, 1)
                    }
                }
            }

            return t.EMPTY = function (t) {
                return t.closed = !0, t
            }(new t), t
        })();

        function d(t) {
            return t.reduce((t, e) => t.concat(e instanceof h ? e.errors : e), [])
        }

        const p = (() => "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random())();

        class f extends u {
            constructor(t, e, n) {
                switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
                    case 0:
                        this.destination = a;
                        break;
                    case 1:
                        if (!t) {
                            this.destination = a;
                            break
                        }
                        if ("object" == typeof t) {
                            t instanceof f ? (this.syncErrorThrowable = t.syncErrorThrowable, this.destination = t, t.add(this)) : (this.syncErrorThrowable = !0, this.destination = new m(this, t));
                            break
                        }
                    default:
                        this.syncErrorThrowable = !0, this.destination = new m(this, t, e, n)
                }
            }

            [p]() {
                return this
            }

            static create(t, e, n) {
                const s = new f(t, e, n);
                return s.syncErrorThrowable = !1, s
            }

            next(t) {
                this.isStopped || this._next(t)
            }

            error(t) {
                this.isStopped || (this.isStopped = !0, this._error(t))
            }

            complete() {
                this.isStopped || (this.isStopped = !0, this._complete())
            }

            unsubscribe() {
                this.closed || (this.isStopped = !0, super.unsubscribe())
            }

            _next(t) {
                this.destination.next(t)
            }

            _error(t) {
                this.destination.error(t), this.unsubscribe()
            }

            _complete() {
                this.destination.complete(), this.unsubscribe()
            }

            _unsubscribeAndRecycle() {
                const {_parentOrParents: t} = this;
                return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
            }
        }

        class m extends f {
            constructor(t, e, n, i) {
                let r;
                super(), this._parentSubscriber = t;
                let o = this;
                s(e) ? r = e : e && (r = e.next, n = e.error, i = e.complete, e !== a && (o = Object.create(e), s(o.unsubscribe) && this.add(o.unsubscribe.bind(o)), o.unsubscribe = this.unsubscribe.bind(this))), this._context = o, this._next = r, this._error = n, this._complete = i
            }

            next(t) {
                if (!this.isStopped && this._next) {
                    const {_parentSubscriber: e} = this;
                    r.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
                }
            }

            error(t) {
                if (!this.isStopped) {
                    const {_parentSubscriber: e} = this, {useDeprecatedSynchronousErrorHandling: n} = r;
                    if (this._error) n && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe()); else if (e.syncErrorThrowable) n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : o(t), this.unsubscribe(); else {
                        if (this.unsubscribe(), n) throw t;
                        o(t)
                    }
                }
            }

            complete() {
                if (!this.isStopped) {
                    const {_parentSubscriber: t} = this;
                    if (this._complete) {
                        const e = () => this._complete.call(this._context);
                        r.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, e), this.unsubscribe()) : (this.__tryOrUnsub(e), this.unsubscribe())
                    } else this.unsubscribe()
                }
            }

            __tryOrUnsub(t, e) {
                try {
                    t.call(this._context, e)
                } catch (n) {
                    if (this.unsubscribe(), r.useDeprecatedSynchronousErrorHandling) throw n;
                    o(n)
                }
            }

            __tryOrSetError(t, e, n) {
                if (!r.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                try {
                    e.call(this._context, n)
                } catch (s) {
                    return r.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = s, t.syncErrorThrown = !0, !0) : (o(s), !0)
                }
                return !1
            }

            _unsubscribe() {
                const {_parentSubscriber: t} = this;
                this._context = null, this._parentSubscriber = null, t.unsubscribe()
            }
        }

        const g = (() => "function" == typeof Symbol && Symbol.observable || "@@observable")();

        function _(t) {
            return t
        }

        let y = (() => {
            class t {
                constructor(t) {
                    this._isScalar = !1, t && (this._subscribe = t)
                }

                lift(e) {
                    const n = new t;
                    return n.source = this, n.operator = e, n
                }

                subscribe(t, e, n) {
                    const {operator: s} = this, i = function (t, e, n) {
                        if (t) {
                            if (t instanceof f) return t;
                            if (t[p]) return t[p]()
                        }
                        return t || e || n ? new f(t, e, n) : new f(a)
                    }(t, e, n);
                    if (i.add(s ? s.call(i, this.source) : this.source || r.useDeprecatedSynchronousErrorHandling && !i.syncErrorThrowable ? this._subscribe(i) : this._trySubscribe(i)), r.useDeprecatedSynchronousErrorHandling && i.syncErrorThrowable && (i.syncErrorThrowable = !1, i.syncErrorThrown)) throw i.syncErrorValue;
                    return i
                }

                _trySubscribe(t) {
                    try {
                        return this._subscribe(t)
                    } catch (e) {
                        r.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e), function (t) {
                            for (; t;) {
                                const {closed: e, destination: n, isStopped: s} = t;
                                if (e || s) return !1;
                                t = n && n instanceof f ? n : null
                            }
                            return !0
                        }(t) ? t.error(e) : console.warn(e)
                    }
                }

                forEach(t, e) {
                    return new (e = b(e))((e, n) => {
                        let s;
                        s = this.subscribe(e => {
                            try {
                                t(e)
                            } catch (i) {
                                n(i), s && s.unsubscribe()
                            }
                        }, n, e)
                    })
                }

                _subscribe(t) {
                    const {source: e} = this;
                    return e && e.subscribe(t)
                }

                [g]() {
                    return this
                }

                pipe(...t) {
                    return 0 === t.length ? this : (0 === (e = t).length ? _ : 1 === e.length ? e[0] : function (t) {
                        return e.reduce((t, e) => e(t), t)
                    })(this);
                    var e
                }

                toPromise(t) {
                    return new (t = b(t))((t, e) => {
                        let n;
                        this.subscribe(t => n = t, t => e(t), () => t(n))
                    })
                }
            }

            return t.create = e => new t(e), t
        })();

        function b(t) {
            if (t || (t = r.Promise || Promise), !t) throw new Error("no Promise impl found");
            return t
        }

        const v = (() => {
            function t() {
                return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();

        class w extends u {
            constructor(t, e) {
                super(), this.subject = t, this.subscriber = e, this.closed = !1
            }

            unsubscribe() {
                if (this.closed) return;
                this.closed = !0;
                const t = this.subject, e = t.observers;
                if (this.subject = null, !e || 0 === e.length || t.isStopped || t.closed) return;
                const n = e.indexOf(this.subscriber);
                -1 !== n && e.splice(n, 1)
            }
        }

        class C extends f {
            constructor(t) {
                super(t), this.destination = t
            }
        }

        let S = (() => {
            class t extends y {
                constructor() {
                    super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null
                }

                [p]() {
                    return new C(this)
                }

                lift(t) {
                    const e = new x(this, this);
                    return e.operator = t, e
                }

                next(t) {
                    if (this.closed) throw new v;
                    if (!this.isStopped) {
                        const {observers: e} = this, n = e.length, s = e.slice();
                        for (let i = 0; i < n; i++) s[i].next(t)
                    }
                }

                error(t) {
                    if (this.closed) throw new v;
                    this.hasError = !0, this.thrownError = t, this.isStopped = !0;
                    const {observers: e} = this, n = e.length, s = e.slice();
                    for (let i = 0; i < n; i++) s[i].error(t);
                    this.observers.length = 0
                }

                complete() {
                    if (this.closed) throw new v;
                    this.isStopped = !0;
                    const {observers: t} = this, e = t.length, n = t.slice();
                    for (let s = 0; s < e; s++) n[s].complete();
                    this.observers.length = 0
                }

                unsubscribe() {
                    this.isStopped = !0, this.closed = !0, this.observers = null
                }

                _trySubscribe(t) {
                    if (this.closed) throw new v;
                    return super._trySubscribe(t)
                }

                _subscribe(t) {
                    if (this.closed) throw new v;
                    return this.hasError ? (t.error(this.thrownError), u.EMPTY) : this.isStopped ? (t.complete(), u.EMPTY) : (this.observers.push(t), new w(this, t))
                }

                asObservable() {
                    const t = new y;
                    return t.source = this, t
                }
            }

            return t.create = (t, e) => new x(t, e), t
        })();

        class x extends S {
            constructor(t, e) {
                super(), this.destination = t, this.source = e
            }

            next(t) {
                const {destination: e} = this;
                e && e.next && e.next(t)
            }

            error(t) {
                const {destination: e} = this;
                e && e.error && this.destination.error(t)
            }

            complete() {
                const {destination: t} = this;
                t && t.complete && this.destination.complete()
            }

            _subscribe(t) {
                const {source: e} = this;
                return e ? this.source.subscribe(t) : u.EMPTY
            }
        }

        function k(t) {
            return t && "function" == typeof t.schedule
        }

        class E extends f {
            constructor(t, e, n) {
                super(), this.parent = t, this.outerValue = e, this.outerIndex = n, this.index = 0
            }

            _next(t) {
                this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this)
            }

            _error(t) {
                this.parent.notifyError(t, this), this.unsubscribe()
            }

            _complete() {
                this.parent.notifyComplete(this), this.unsubscribe()
            }
        }

        const O = t => e => {
            for (let n = 0, s = t.length; n < s && !e.closed; n++) e.next(t[n]);
            e.complete()
        };

        function R() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
        }

        const T = R(), A = t => t && "number" == typeof t.length && "function" != typeof t;

        function D(t) {
            return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        }

        const I = t => {
            if (t && "function" == typeof t[g]) return s = t, t => {
                const e = s[g]();
                if ("function" != typeof e.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                return e.subscribe(t)
            };
            if (A(t)) return O(t);
            if (D(t)) return n = t, t => (n.then(e => {
                t.closed || (t.next(e), t.complete())
            }, e => t.error(e)).then(null, o), t);
            if (t && "function" == typeof t[T]) return e = t, t => {
                const n = e[T]();
                for (; ;) {
                    const e = n.next();
                    if (e.done) {
                        t.complete();
                        break
                    }
                    if (t.next(e.value), t.closed) break
                }
                return "function" == typeof n.return && t.add(() => {
                    n.return && n.return()
                }), t
            };
            {
                const e = c(t) ? "an invalid object" : `'${t}'`;
                throw new TypeError(`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)
            }
            var e, n, s
        };

        function P(t, e, n, s, i = new E(t, n, s)) {
            if (!i.closed) return e instanceof y ? e.subscribe(i) : I(e)(i)
        }

        class N extends f {
            notifyNext(t, e, n, s, i) {
                this.destination.next(e)
            }

            notifyError(t, e) {
                this.destination.error(t)
            }

            notifyComplete(t) {
                this.destination.complete()
            }
        }

        function F(t, e) {
            return function (n) {
                if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                return n.lift(new L(t, e))
            }
        }

        class L {
            constructor(t, e) {
                this.project = t, this.thisArg = e
            }

            call(t, e) {
                return e.subscribe(new M(t, this.project, this.thisArg))
            }
        }

        class M extends f {
            constructor(t, e, n) {
                super(t), this.project = e, this.count = 0, this.thisArg = n || this
            }

            _next(t) {
                let e;
                try {
                    e = this.project.call(this.thisArg, t, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(e)
            }
        }

        function V(t, e) {
            return new y(n => {
                const s = new u;
                let i = 0;
                return s.add(e.schedule((function () {
                    i !== t.length ? (n.next(t[i++]), n.closed || s.add(this.schedule())) : n.complete()
                }))), s
            })
        }

        function j(t, e) {
            return e ? function (t, e) {
                if (null != t) {
                    if (function (t) {
                        return t && "function" == typeof t[g]
                    }(t)) return function (t, e) {
                        return new y(n => {
                            const s = new u;
                            return s.add(e.schedule(() => {
                                const i = t[g]();
                                s.add(i.subscribe({
                                    next(t) {
                                        s.add(e.schedule(() => n.next(t)))
                                    }, error(t) {
                                        s.add(e.schedule(() => n.error(t)))
                                    }, complete() {
                                        s.add(e.schedule(() => n.complete()))
                                    }
                                }))
                            })), s
                        })
                    }(t, e);
                    if (D(t)) return function (t, e) {
                        return new y(n => {
                            const s = new u;
                            return s.add(e.schedule(() => t.then(t => {
                                s.add(e.schedule(() => {
                                    n.next(t), s.add(e.schedule(() => n.complete()))
                                }))
                            }, t => {
                                s.add(e.schedule(() => n.error(t)))
                            }))), s
                        })
                    }(t, e);
                    if (A(t)) return V(t, e);
                    if (function (t) {
                        return t && "function" == typeof t[T]
                    }(t) || "string" == typeof t) return function (t, e) {
                        if (!t) throw new Error("Iterable cannot be null");
                        return new y(n => {
                            const s = new u;
                            let i;
                            return s.add(() => {
                                i && "function" == typeof i.return && i.return()
                            }), s.add(e.schedule(() => {
                                i = t[T](), s.add(e.schedule((function () {
                                    if (n.closed) return;
                                    let t, e;
                                    try {
                                        const n = i.next();
                                        t = n.value, e = n.done
                                    } catch (s) {
                                        return void n.error(s)
                                    }
                                    e ? n.complete() : (n.next(t), this.schedule())
                                })))
                            })), s
                        })
                    }(t, e)
                }
                throw new TypeError((null !== t && typeof t || t) + " is not observable")
            }(t, e) : t instanceof y ? t : new y(I(t))
        }

        function z(t, e, n = Number.POSITIVE_INFINITY) {
            return "function" == typeof e ? s => s.pipe(z((n, s) => j(t(n, s)).pipe(F((t, i) => e(n, t, s, i))), n)) : ("number" == typeof e && (n = e), e => e.lift(new B(t, n)))
        }

        class B {
            constructor(t, e = Number.POSITIVE_INFINITY) {
                this.project = t, this.concurrent = e
            }

            call(t, e) {
                return e.subscribe(new H(t, this.project, this.concurrent))
            }
        }

        class H extends N {
            constructor(t, e, n = Number.POSITIVE_INFINITY) {
                super(t), this.project = e, this.concurrent = n, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0
            }

            _next(t) {
                this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
            }

            _tryNext(t) {
                let e;
                const n = this.index++;
                try {
                    e = this.project(t, n)
                } catch (s) {
                    return void this.destination.error(s)
                }
                this.active++, this._innerSub(e, t, n)
            }

            _innerSub(t, e, n) {
                const s = new E(this, e, n), i = this.destination;
                i.add(s);
                const r = P(this, t, void 0, void 0, s);
                r !== s && i.add(r)
            }

            _complete() {
                this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
            }

            notifyNext(t, e, n, s, i) {
                this.destination.next(e)
            }

            notifyComplete(t) {
                const e = this.buffer;
                this.remove(t), this.active--, e.length > 0 ? this._next(e.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
            }
        }

        function U(t = Number.POSITIVE_INFINITY) {
            return z(_, t)
        }

        function $(t, e) {
            return e ? V(t, e) : new y(O(t))
        }

        function q(...t) {
            let e = Number.POSITIVE_INFINITY, n = null, s = t[t.length - 1];
            return k(s) ? (n = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (e = t.pop())) : "number" == typeof s && (e = t.pop()), null === n && 1 === t.length && t[0] instanceof y ? t[0] : U(e)($(t, n))
        }

        function W() {
            return function (t) {
                return t.lift(new G(t))
            }
        }

        class G {
            constructor(t) {
                this.connectable = t
            }

            call(t, e) {
                const {connectable: n} = this;
                n._refCount++;
                const s = new K(t, n), i = e.subscribe(s);
                return s.closed || (s.connection = n.connect()), i
            }
        }

        class K extends f {
            constructor(t, e) {
                super(t), this.connectable = e
            }

            _unsubscribe() {
                const {connectable: t} = this;
                if (!t) return void (this.connection = null);
                this.connectable = null;
                const e = t._refCount;
                if (e <= 0) return void (this.connection = null);
                if (t._refCount = e - 1, e > 1) return void (this.connection = null);
                const {connection: n} = this, s = t._connection;
                this.connection = null, !s || n && s !== n || s.unsubscribe()
            }
        }

        class Z extends y {
            constructor(t, e) {
                super(), this.source = t, this.subjectFactory = e, this._refCount = 0, this._isComplete = !1
            }

            _subscribe(t) {
                return this.getSubject().subscribe(t)
            }

            getSubject() {
                const t = this._subject;
                return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
            }

            connect() {
                let t = this._connection;
                return t || (this._isComplete = !1, t = this._connection = new u, t.add(this.source.subscribe(new Y(this.getSubject(), this))), t.closed && (this._connection = null, t = u.EMPTY)), t
            }

            refCount() {
                return W()(this)
            }
        }

        const Q = (() => {
            const t = Z.prototype;
            return {
                operator: {value: null},
                _refCount: {value: 0, writable: !0},
                _subject: {value: null, writable: !0},
                _connection: {value: null, writable: !0},
                _subscribe: {value: t._subscribe},
                _isComplete: {value: t._isComplete, writable: !0},
                getSubject: {value: t.getSubject},
                connect: {value: t.connect},
                refCount: {value: t.refCount}
            }
        })();

        class Y extends C {
            constructor(t, e) {
                super(t), this.connectable = e
            }

            _error(t) {
                this._unsubscribe(), super._error(t)
            }

            _complete() {
                this.connectable._isComplete = !0, this._unsubscribe(), super._complete()
            }

            _unsubscribe() {
                const t = this.connectable;
                if (t) {
                    this.connectable = null;
                    const e = t._connection;
                    t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe()
                }
            }
        }

        function X() {
            return new S
        }

        function J(t) {
            for (let e in t) if (t[e] === J) return e;
            throw Error("Could not find renamed property on target object.")
        }

        function tt(t, e) {
            for (const n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n])
        }

        function et(t) {
            if ("string" == typeof t) return t;
            if (Array.isArray(t)) return "[" + t.map(et).join(", ") + "]";
            if (null == t) return "" + t;
            if (t.overriddenName) return "" + t.overriddenName;
            if (t.name) return "" + t.name;
            const e = t.toString();
            if (null == e) return "" + e;
            const n = e.indexOf("\n");
            return -1 === n ? e : e.substring(0, n)
        }

        function nt(t, e) {
            return null == t || "" === t ? null === e ? "" : e : null == e || "" === e ? t : t + " " + e
        }

        const st = J({__forward_ref__: J});

        function it(t) {
            return t.__forward_ref__ = it, t.toString = function () {
                return et(this())
            }, t
        }

        function rt(t) {
            return ot(t) ? t() : t
        }

        function ot(t) {
            return "function" == typeof t && t.hasOwnProperty(st) && t.__forward_ref__ === it
        }

        class at extends Error {
            constructor(t, e) {
                super(function (t, e) {
                    return `${t ? `NG0${t}: ` : ""}${e}`
                }(t, e)), this.code = t
            }
        }

        function lt(t) {
            return "string" == typeof t ? t : null == t ? "" : String(t)
        }

        function ct(t) {
            return "function" == typeof t ? t.name || t.toString() : "object" == typeof t && null != t && "function" == typeof t.type ? t.type.name || t.type.toString() : lt(t)
        }

        function ht(t, e) {
            const n = e ? " in " + e : "";
            throw new at("201", `No provider for ${ct(t)} found${n}`)
        }

        function ut(t) {
            return {token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0}
        }

        function dt(t) {
            return {providers: t.providers || [], imports: t.imports || []}
        }

        function pt(t) {
            return ft(t, gt) || ft(t, yt)
        }

        function ft(t, e) {
            return t.hasOwnProperty(e) ? t[e] : null
        }

        function mt(t) {
            return t && (t.hasOwnProperty(_t) || t.hasOwnProperty(bt)) ? t[_t] : null
        }

        const gt = J({"\u0275prov": J}), _t = J({"\u0275inj": J}), yt = J({ngInjectableDef: J}),
            bt = J({ngInjectorDef: J});
        var vt = function (t) {
            return t[t.Default = 0] = "Default", t[t.Host = 1] = "Host", t[t.Self = 2] = "Self", t[t.SkipSelf = 4] = "SkipSelf", t[t.Optional = 8] = "Optional", t
        }({});
        let wt;

        function Ct(t) {
            const e = wt;
            return wt = t, e
        }

        function St(t, e, n) {
            const s = pt(t);
            return s && "root" == s.providedIn ? void 0 === s.value ? s.value = s.factory() : s.value : n & vt.Optional ? null : void 0 !== e ? e : void ht(et(t), "Injector")
        }

        function xt(t) {
            return {toString: t}.toString()
        }

        var kt = function (t) {
            return t[t.OnPush = 0] = "OnPush", t[t.Default = 1] = "Default", t
        }({}), Et = function (t) {
            return t[t.Emulated = 0] = "Emulated", t[t.None = 2] = "None", t[t.ShadowDom = 3] = "ShadowDom", t
        }({});
        const Ot = "undefined" != typeof globalThis && globalThis, Rt = "undefined" != typeof window && window,
            Tt = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
            At = "undefined" != typeof global && global, Dt = Ot || At || Rt || Tt, It = {}, Pt = [], Nt = [],
            Ft = J({"\u0275cmp": J}), Lt = J({"\u0275dir": J}), Mt = J({"\u0275pipe": J}), Vt = J({"\u0275mod": J}),
            jt = J({"\u0275loc": J}), zt = J({"\u0275fac": J}), Bt = J({__NG_ELEMENT_ID__: J});
        let Ht = 0;

        function Ut(t) {
            return xt(() => {
                const e = {}, n = {
                    type: t.type,
                    providersResolver: null,
                    decls: t.decls,
                    vars: t.vars,
                    factory: null,
                    template: t.template || null,
                    consts: t.consts || null,
                    ngContentSelectors: t.ngContentSelectors,
                    hostBindings: t.hostBindings || null,
                    hostVars: t.hostVars || 0,
                    hostAttrs: t.hostAttrs || null,
                    contentQueries: t.contentQueries || null,
                    declaredInputs: e,
                    inputs: null,
                    outputs: null,
                    exportAs: t.exportAs || null,
                    onPush: t.changeDetection === kt.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    selectors: t.selectors || Nt,
                    viewQuery: t.viewQuery || null,
                    features: t.features || null,
                    data: t.data || {},
                    encapsulation: t.encapsulation || Et.Emulated,
                    id: "c",
                    styles: t.styles || Nt,
                    _: null,
                    setInput: null,
                    schemas: t.schemas || null,
                    tView: null
                }, s = t.directives, i = t.features, r = t.pipes;
                return n.id += Ht++, n.inputs = Kt(t.inputs, e), n.outputs = Kt(t.outputs), i && i.forEach(t => t(n)), n.directiveDefs = s ? () => ("function" == typeof s ? s() : s).map($t) : null, n.pipeDefs = r ? () => ("function" == typeof r ? r() : r).map(qt) : null, n
            })
        }

        function $t(t) {
            return Yt(t) || function (t) {
                return t[Lt] || null
            }(t)
        }

        function qt(t) {
            return function (t) {
                return t[Mt] || null
            }(t)
        }

        const Wt = {};

        function Gt(t) {
            const e = {
                type: t.type,
                bootstrap: t.bootstrap || Nt,
                declarations: t.declarations || Nt,
                imports: t.imports || Nt,
                exports: t.exports || Nt,
                transitiveCompileScopes: null,
                schemas: t.schemas || null,
                id: t.id || null
            };
            return null != t.id && xt(() => {
                Wt[t.id] = t.type
            }), e
        }

        function Kt(t, e) {
            if (null == t) return It;
            const n = {};
            for (const s in t) if (t.hasOwnProperty(s)) {
                let i = t[s], r = i;
                Array.isArray(i) && (r = i[1], i = i[0]), n[i] = s, e && (e[i] = r)
            }
            return n
        }

        const Zt = Ut;

        function Qt(t) {
            return {
                type: t.type,
                name: t.name,
                factory: null,
                pure: !1 !== t.pure,
                onDestroy: t.type.prototype.ngOnDestroy || null
            }
        }

        function Yt(t) {
            return t[Ft] || null
        }

        function Xt(t, e) {
            const n = t[Vt] || null;
            if (!n && !0 === e) throw new Error(`Type ${et(t)} does not have '\u0275mod' property.`);
            return n
        }

        function Jt(t) {
            return Array.isArray(t) && "object" == typeof t[1]
        }

        function te(t) {
            return Array.isArray(t) && !0 === t[1]
        }

        function ee(t) {
            return 0 != (8 & t.flags)
        }

        function ne(t) {
            return 2 == (2 & t.flags)
        }

        function se(t) {
            return 1 == (1 & t.flags)
        }

        function ie(t) {
            return null !== t.template
        }

        function re(t, e) {
            return t.hasOwnProperty(zt) ? t[zt] : null
        }

        class oe {
            constructor(t, e, n) {
                this.previousValue = t, this.currentValue = e, this.firstChange = n
            }

            isFirstChange() {
                return this.firstChange
            }
        }

        function ae() {
            return le
        }

        function le(t) {
            return t.type.prototype.ngOnChanges && (t.setInput = he), ce
        }

        function ce() {
            const t = ue(this), e = null == t ? void 0 : t.current;
            if (e) {
                const n = t.previous;
                if (n === It) t.previous = e; else for (let t in e) n[t] = e[t];
                t.current = null, this.ngOnChanges(e)
            }
        }

        function he(t, e, n, s) {
            const i = ue(t) || function (t, e) {
                    return t.__ngSimpleChanges__ = e
                }(t, {previous: It, current: null}), r = i.current || (i.current = {}), o = i.previous,
                a = this.declaredInputs[n], l = o[a];
            r[a] = new oe(l && l.currentValue, e, o === It), t[s] = e
        }

        function ue(t) {
            return t.__ngSimpleChanges__ || null
        }

        ae.ngInherit = !0;
        let de = void 0;

        function pe(t) {
            return !!t.listen
        }

        const fe = {createRenderer: (t, e) => void 0 !== de ? de : "undefined" != typeof document ? document : void 0};

        function me(t) {
            for (; Array.isArray(t);) t = t[0];
            return t
        }

        function ge(t, e) {
            return me(e[t])
        }

        function _e(t, e) {
            return me(e[t.index])
        }

        function ye(t, e) {
            return t.data[e]
        }

        function be(t, e) {
            return t[e]
        }

        function ve(t, e) {
            const n = e[t];
            return Jt(n) ? n : n[0]
        }

        function we(t) {
            const e = function (t) {
                return t.__ngContext__ || null
            }(t);
            return e ? Array.isArray(e) ? e : e.lView : null
        }

        function Ce(t) {
            return 4 == (4 & t[2])
        }

        function Se(t) {
            return 128 == (128 & t[2])
        }

        function xe(t, e) {
            return null == e ? null : t[e]
        }

        function ke(t) {
            t[18] = 0
        }

        function Ee(t, e) {
            t[5] += e;
            let n = t, s = t[3];
            for (; null !== s && (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);) s[5] += e, n = s, s = s[3]
        }

        const Oe = {lFrame: Qe(null), bindingsEnabled: !0, isInCheckNoChangesMode: !1};

        function Re() {
            return Oe.bindingsEnabled
        }

        function Te() {
            return Oe.lFrame.lView
        }

        function Ae() {
            return Oe.lFrame.tView
        }

        function De(t) {
            Oe.lFrame.contextLView = t
        }

        function Ie() {
            let t = Pe();
            for (; null !== t && 64 === t.type;) t = t.parent;
            return t
        }

        function Pe() {
            return Oe.lFrame.currentTNode
        }

        function Ne(t, e) {
            const n = Oe.lFrame;
            n.currentTNode = t, n.isParent = e
        }

        function Fe() {
            return Oe.lFrame.isParent
        }

        function Le() {
            Oe.lFrame.isParent = !1
        }

        function Me() {
            return Oe.isInCheckNoChangesMode
        }

        function Ve(t) {
            Oe.isInCheckNoChangesMode = t
        }

        function je() {
            const t = Oe.lFrame;
            let e = t.bindingRootIndex;
            return -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        }

        function ze() {
            return Oe.lFrame.bindingIndex++
        }

        function Be(t) {
            const e = Oe.lFrame, n = e.bindingIndex;
            return e.bindingIndex = e.bindingIndex + t, n
        }

        function He(t, e) {
            const n = Oe.lFrame;
            n.bindingIndex = n.bindingRootIndex = t, Ue(e)
        }

        function Ue(t) {
            Oe.lFrame.currentDirectiveIndex = t
        }

        function $e() {
            return Oe.lFrame.currentQueryIndex
        }

        function qe(t) {
            Oe.lFrame.currentQueryIndex = t
        }

        function We(t) {
            const e = t[1];
            return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null
        }

        function Ge(t, e, n) {
            if (n & vt.SkipSelf) {
                let s = e, i = t;
                for (; s = s.parent, !(null !== s || n & vt.Host || (s = We(i), null === s) || (i = i[15], 10 & s.type));) ;
                if (null === s) return !1;
                e = s, t = i
            }
            const s = Oe.lFrame = Ze();
            return s.currentTNode = e, s.lView = t, !0
        }

        function Ke(t) {
            const e = Ze(), n = t[1];
            Oe.lFrame = e, e.currentTNode = n.firstChild, e.lView = t, e.tView = n, e.contextLView = t, e.bindingIndex = n.bindingStartIndex, e.inI18n = !1
        }

        function Ze() {
            const t = Oe.lFrame, e = null === t ? null : t.child;
            return null === e ? Qe(t) : e
        }

        function Qe(t) {
            const e = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: t,
                child: null,
                inI18n: !1
            };
            return null !== t && (t.child = e), e
        }

        function Ye() {
            const t = Oe.lFrame;
            return Oe.lFrame = t.parent, t.currentTNode = null, t.lView = null, t
        }

        const Xe = Ye;

        function Je() {
            const t = Ye();
            t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0
        }

        function tn() {
            return Oe.lFrame.selectedIndex
        }

        function en(t) {
            Oe.lFrame.selectedIndex = t
        }

        function nn() {
            const t = Oe.lFrame;
            return ye(t.tView, t.selectedIndex)
        }

        function sn() {
            Oe.lFrame.currentNamespace = "http://www.w3.org/2000/svg"
        }

        function rn() {
            Oe.lFrame.currentNamespace = null
        }

        function on(t, e) {
            for (let n = e.directiveStart, s = e.directiveEnd; n < s; n++) {
                const e = t.data[n].type.prototype, {
                    ngAfterContentInit: s,
                    ngAfterContentChecked: i,
                    ngAfterViewInit: r,
                    ngAfterViewChecked: o,
                    ngOnDestroy: a
                } = e;
                s && (t.contentHooks || (t.contentHooks = [])).push(-n, s), i && ((t.contentHooks || (t.contentHooks = [])).push(n, i), (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, i)), r && (t.viewHooks || (t.viewHooks = [])).push(-n, r), o && ((t.viewHooks || (t.viewHooks = [])).push(n, o), (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)), null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
            }
        }

        function an(t, e, n) {
            hn(t, e, 3, n)
        }

        function ln(t, e, n, s) {
            (3 & t[2]) === n && hn(t, e, n, s)
        }

        function cn(t, e) {
            let n = t[2];
            (3 & n) === e && (n &= 2047, n += 1, t[2] = n)
        }

        function hn(t, e, n, s) {
            const i = null != s ? s : -1, r = e.length - 1;
            let o = 0;
            for (let a = void 0 !== s ? 65535 & t[18] : 0; a < r; a++) if ("number" == typeof e[a + 1]) {
                if (o = e[a], null != s && o >= s) break
            } else e[a] < 0 && (t[18] += 65536), (o < i || -1 == i) && (un(t, n, e, a), t[18] = (4294901760 & t[18]) + a + 2), a++
        }

        function un(t, e, n, s) {
            const i = n[s] < 0, r = n[s + 1], o = t[i ? -n[s] : n[s]];
            i ? t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e && (t[2] += 2048, r.call(o)) : r.call(o)
        }

        class dn {
            constructor(t, e, n) {
                this.factory = t, this.resolving = !1, this.canSeeViewProviders = e, this.injectImpl = n
            }
        }

        function pn(t, e, n) {
            const s = pe(t);
            let i = 0;
            for (; i < n.length;) {
                const r = n[i];
                if ("number" == typeof r) {
                    if (0 !== r) break;
                    i++;
                    const o = n[i++], a = n[i++], l = n[i++];
                    s ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
                } else {
                    const o = r, a = n[++i];
                    mn(o) ? s && t.setProperty(e, o, a) : s ? t.setAttribute(e, o, a) : e.setAttribute(o, a), i++
                }
            }
            return i
        }

        function fn(t) {
            return 3 === t || 4 === t || 6 === t
        }

        function mn(t) {
            return 64 === t.charCodeAt(0)
        }

        function gn(t, e) {
            if (null === e || 0 === e.length) ; else if (null === t || 0 === t.length) t = e.slice(); else {
                let n = -1;
                for (let s = 0; s < e.length; s++) {
                    const i = e[s];
                    "number" == typeof i ? n = i : 0 === n || _n(t, n, i, null, -1 === n || 2 === n ? e[++s] : null)
                }
            }
            return t
        }

        function _n(t, e, n, s, i) {
            let r = 0, o = t.length;
            if (-1 === e) o = -1; else for (; r < t.length;) {
                const n = t[r++];
                if ("number" == typeof n) {
                    if (n === e) {
                        o = -1;
                        break
                    }
                    if (n > e) {
                        o = r - 1;
                        break
                    }
                }
            }
            for (; r < t.length;) {
                const e = t[r];
                if ("number" == typeof e) break;
                if (e === n) {
                    if (null === s) return void (null !== i && (t[r + 1] = i));
                    if (s === t[r + 1]) return void (t[r + 2] = i)
                }
                r++, null !== s && r++, null !== i && r++
            }
            -1 !== o && (t.splice(o, 0, e), r = o + 1), t.splice(r++, 0, n), null !== s && t.splice(r++, 0, s), null !== i && t.splice(r++, 0, i)
        }

        function yn(t) {
            return -1 !== t
        }

        function bn(t) {
            return 32767 & t
        }

        function vn(t, e) {
            let n = t >> 16, s = e;
            for (; n > 0;) s = s[15], n--;
            return s
        }

        let wn = !0;

        function Cn(t) {
            const e = wn;
            return wn = t, e
        }

        let Sn = 0;

        function xn(t, e) {
            const n = En(t, e);
            if (-1 !== n) return n;
            const s = e[1];
            s.firstCreatePass && (t.injectorIndex = e.length, kn(s.data, t), kn(e, null), kn(s.blueprint, null));
            const i = On(t, e), r = t.injectorIndex;
            if (yn(i)) {
                const t = bn(i), n = vn(i, e), s = n[1].data;
                for (let i = 0; i < 8; i++) e[r + i] = n[t + i] | s[t + i]
            }
            return e[r + 8] = i, r
        }

        function kn(t, e) {
            t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
        }

        function En(t, e) {
            return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === e[t.injectorIndex + 8] ? -1 : t.injectorIndex
        }

        function On(t, e) {
            if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
            let n = 0, s = null, i = e;
            for (; null !== i;) {
                const t = i[1], e = t.type;
                if (s = 2 === e ? t.declTNode : 1 === e ? i[6] : null, null === s) return -1;
                if (n++, i = i[15], -1 !== s.injectorIndex) return s.injectorIndex | n << 16
            }
            return -1
        }

        function Rn(t, e, n) {
            !function (t, e, n) {
                let s;
                "string" == typeof n ? s = n.charCodeAt(0) || 0 : n.hasOwnProperty(Bt) && (s = n[Bt]), null == s && (s = n[Bt] = Sn++);
                const i = 255 & s;
                e.data[t + (i >> 5)] |= 1 << i
            }(t, e, n)
        }

        function Tn(t, e, n) {
            if (n & vt.Optional) return t;
            ht(e, "NodeInjector")
        }

        function An(t, e, n, s) {
            if (n & vt.Optional && void 0 === s && (s = null), 0 == (n & (vt.Self | vt.Host))) {
                const i = t[9], r = Ct(void 0);
                try {
                    return i ? i.get(e, s, n & vt.Optional) : St(e, s, n & vt.Optional)
                } finally {
                    Ct(r)
                }
            }
            return Tn(s, e, n)
        }

        function Dn(t, e, n, s = vt.Default, i) {
            if (null !== t) {
                const r = function (t) {
                    if ("string" == typeof t) return t.charCodeAt(0) || 0;
                    const e = t.hasOwnProperty(Bt) ? t[Bt] : void 0;
                    return "number" == typeof e ? e >= 0 ? 255 & e : Pn : e
                }(n);
                if ("function" == typeof r) {
                    if (!Ge(e, t, s)) return s & vt.Host ? Tn(i, n, s) : An(e, n, s, i);
                    try {
                        const t = r();
                        if (null != t || s & vt.Optional) return t;
                        ht(n)
                    } finally {
                        Xe()
                    }
                } else if ("number" == typeof r) {
                    let i = null, o = En(t, e), a = -1, l = s & vt.Host ? e[16][6] : null;
                    for ((-1 === o || s & vt.SkipSelf) && (a = -1 === o ? On(t, e) : e[o + 8], -1 !== a && Vn(s, !1) ? (i = e[1], o = bn(a), e = vn(a, e)) : o = -1); -1 !== o;) {
                        const t = e[1];
                        if (Mn(r, o, t.data)) {
                            const t = Nn(o, e, n, i, s, l);
                            if (t !== In) return t
                        }
                        a = e[o + 8], -1 !== a && Vn(s, e[1].data[o + 8] === l) && Mn(r, o, e) ? (i = t, o = bn(a), e = vn(a, e)) : o = -1
                    }
                }
            }
            return An(e, n, s, i)
        }

        const In = {};

        function Pn() {
            return new jn(Ie(), Te())
        }

        function Nn(t, e, n, s, i, r) {
            const o = e[1], a = o.data[t + 8],
                l = Fn(a, o, n, null == s ? ne(a) && wn : s != o && 0 != (3 & a.type), i & vt.Host && r === a);
            return null !== l ? Ln(e, o, l, a) : In
        }

        function Fn(t, e, n, s, i) {
            const r = t.providerIndexes, o = e.data, a = 1048575 & r, l = t.directiveStart, c = r >> 20,
                h = i ? a + c : t.directiveEnd;
            for (let u = s ? a : a + c; u < h; u++) {
                const t = o[u];
                if (u < l && n === t || u >= l && t.type === n) return u
            }
            if (i) {
                const t = o[l];
                if (t && ie(t) && t.type === n) return l
            }
            return null
        }

        function Ln(t, e, n, s) {
            let i = t[n];
            const r = e.data;
            if (i instanceof dn) {
                const o = i;
                o.resolving && function (t, e) {
                    throw new at("200", "Circular dependency in DI detected for " + t)
                }(ct(r[n]));
                const a = Cn(o.canSeeViewProviders);
                o.resolving = !0;
                const l = o.injectImpl ? Ct(o.injectImpl) : null;
                Ge(t, s, vt.Default);
                try {
                    i = t[n] = o.factory(void 0, r, t, s), e.firstCreatePass && n >= s.directiveStart && function (t, e, n) {
                        const {ngOnChanges: s, ngOnInit: i, ngDoCheck: r} = e.type.prototype;
                        if (s) {
                            const s = le(e);
                            (n.preOrderHooks || (n.preOrderHooks = [])).push(t, s), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, s)
                        }
                        i && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, i), r && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r))
                    }(n, r[n], e)
                } finally {
                    null !== l && Ct(l), Cn(a), o.resolving = !1, Xe()
                }
            }
            return i
        }

        function Mn(t, e, n) {
            return !!(n[e + (t >> 5)] & 1 << t)
        }

        function Vn(t, e) {
            return !(t & vt.Self || t & vt.Host && e)
        }

        class jn {
            constructor(t, e) {
                this._tNode = t, this._lView = e
            }

            get(t, e) {
                return Dn(this._tNode, this._lView, t, void 0, e)
            }
        }

        function zn(t) {
            return xt(() => {
                const e = t.prototype.constructor, n = e[zt] || Bn(e), s = Object.prototype;
                let i = Object.getPrototypeOf(t.prototype).constructor;
                for (; i && i !== s;) {
                    const t = i[zt] || Bn(i);
                    if (t && t !== n) return t;
                    i = Object.getPrototypeOf(i)
                }
                return t => new t
            })
        }

        function Bn(t) {
            return ot(t) ? () => {
                const e = Bn(rt(t));
                return e && e()
            } : re(t)
        }

        function Hn(t) {
            return function (t, e) {
                if ("class" === e) return t.classes;
                if ("style" === e) return t.styles;
                const n = t.attrs;
                if (n) {
                    const t = n.length;
                    let s = 0;
                    for (; s < t;) {
                        const i = n[s];
                        if (fn(i)) break;
                        if (0 === i) s += 2; else if ("number" == typeof i) for (s++; s < t && "string" == typeof n[s];) s++; else {
                            if (i === e) return n[s + 1];
                            s += 2
                        }
                    }
                }
                return null
            }(Ie(), t)
        }

        function Un(t, e, n) {
            return xt(() => {
                const s = function (t) {
                    return function (...e) {
                        if (t) {
                            const n = t(...e);
                            for (const t in n) this[t] = n[t]
                        }
                    }
                }(e);

                function i(...t) {
                    if (this instanceof i) return s.apply(this, t), this;
                    const e = new i(...t);
                    return n.annotation = e, n;

                    function n(t, n, s) {
                        const i = t.hasOwnProperty("__parameters__") ? t.__parameters__ : Object.defineProperty(t, "__parameters__", {value: []}).__parameters__;
                        for (; i.length <= s;) i.push(null);
                        return (i[s] = i[s] || []).push(e), t
                    }
                }

                return n && (i.prototype = Object.create(n.prototype)), i.prototype.ngMetadataName = t, i.annotationCls = i, i
            })
        }

        class $n {
            constructor(t, e) {
                this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof e ? this.__NG_ELEMENT_ID__ = e : void 0 !== e && (this.\u0275prov = ut({
                    token: this,
                    providedIn: e.providedIn || "root",
                    factory: e.factory
                }))
            }

            toString() {
                return "InjectionToken " + this._desc
            }
        }

        const qn = new $n("AnalyzeForEntryComponents"), Wn = Function;

        function Gn(t, e) {
            t.forEach(t => Array.isArray(t) ? Gn(t, e) : e(t))
        }

        function Kn(t, e, n) {
            e >= t.length ? t.push(n) : t.splice(e, 0, n)
        }

        function Zn(t, e) {
            return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
        }

        function Qn(t, e) {
            const n = [];
            for (let s = 0; s < t; s++) n.push(e);
            return n
        }

        function Yn(t, e, n) {
            let s = Jn(t, e);
            return s >= 0 ? t[1 | s] = n : (s = ~s, function (t, e, n, s) {
                let i = t.length;
                if (i == e) t.push(n, s); else if (1 === i) t.push(s, t[0]), t[0] = n; else {
                    for (i--, t.push(t[i - 1], t[i]); i > e;) t[i] = t[i - 2], i--;
                    t[e] = n, t[e + 1] = s
                }
            }(t, s, e, n)), s
        }

        function Xn(t, e) {
            const n = Jn(t, e);
            if (n >= 0) return t[1 | n]
        }

        function Jn(t, e) {
            return function (t, e, n) {
                let s = 0, i = t.length >> 1;
                for (; i !== s;) {
                    const n = s + (i - s >> 1), r = t[n << 1];
                    if (e === r) return n << 1;
                    r > e ? i = n : s = n + 1
                }
                return ~(i << 1)
            }(t, e)
        }

        const ts = {}, es = /\n/gm, ns = J({provide: String, useValue: J});
        let ss = void 0;

        function is(t) {
            const e = ss;
            return ss = t, e
        }

        function rs(t, e = vt.Default) {
            if (void 0 === ss) throw new Error("inject() must be called from an injection context");
            return null === ss ? St(t, void 0, e) : ss.get(t, e & vt.Optional ? null : void 0, e)
        }

        function os(t, e = vt.Default) {
            return (wt || rs)(rt(t), e)
        }

        const as = os;

        function ls(t) {
            const e = [];
            for (let n = 0; n < t.length; n++) {
                const s = rt(t[n]);
                if (Array.isArray(s)) {
                    if (0 === s.length) throw new Error("Arguments array must have arguments.");
                    let t = void 0, n = vt.Default;
                    for (let e = 0; e < s.length; e++) {
                        const i = s[e], r = i.__NG_DI_FLAG__;
                        "number" == typeof r ? -1 === r ? t = i.token : n |= r : t = i
                    }
                    e.push(os(t, n))
                } else e.push(os(s))
            }
            return e
        }

        function cs(t, e) {
            return t.__NG_DI_FLAG__ = e, t.prototype.__NG_DI_FLAG__ = e, t
        }

        const hs = cs(Un("Inject", t => ({token: t})), -1), us = cs(Un("Optional"), 8), ds = cs(Un("SkipSelf"), 4);

        class ps {
            constructor(t) {
                this.changingThisBreaksApplicationSecurity = t
            }

            toString() {
                return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity + " (see https://g.co/ng/security#xss)"
            }
        }

        function fs(t) {
            return t instanceof ps ? t.changingThisBreaksApplicationSecurity : t
        }

        const ms = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
            gs = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
        var _s = function (t) {
            return t[t.NONE = 0] = "NONE", t[t.HTML = 1] = "HTML", t[t.STYLE = 2] = "STYLE", t[t.SCRIPT = 3] = "SCRIPT", t[t.URL = 4] = "URL", t[t.RESOURCE_URL = 5] = "RESOURCE_URL", t
        }({});

        function ys(t) {
            const e = function () {
                const t = Te();
                return t && t[12]
            }();
            return e ? e.sanitize(_s.URL, t) || "" : function (t, e) {
                const n = function (t) {
                    return t instanceof ps && t.getTypeName() || null
                }(t);
                if (null != n && n !== e) {
                    if ("ResourceURL" === n && "URL" === e) return !0;
                    throw new Error(`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`)
                }
                return n === e
            }(t, "URL") ? fs(t) : (n = lt(t), (n = String(n)).match(ms) || n.match(gs) ? n : "unsafe:" + n);
            var n
        }

        function bs(t) {
            return t.ngDebugContext
        }

        function vs(t) {
            return t.ngOriginalError
        }

        function ws(t, ...e) {
            t.error(...e)
        }

        class Cs {
            constructor() {
                this._console = console
            }

            handleError(t) {
                const e = this._findOriginalError(t), n = this._findContext(t), s = function (t) {
                    return t.ngErrorLogger || ws
                }(t);
                s(this._console, "ERROR", t), e && s(this._console, "ORIGINAL ERROR", e), n && s(this._console, "ERROR CONTEXT", n)
            }

            _findContext(t) {
                return t ? bs(t) ? bs(t) : this._findContext(vs(t)) : null
            }

            _findOriginalError(t) {
                let e = vs(t);
                for (; e && vs(e);) e = vs(e);
                return e
            }
        }

        function Ss(t, e) {
            t.__ngContext__ = e
        }

        const xs = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(Dt))();

        function ks(t) {
            return {name: "body", target: t.ownerDocument.body}
        }

        function Es(t) {
            return t instanceof Function ? t() : t
        }

        var Os = function (t) {
            return t[t.Important = 1] = "Important", t[t.DashCase = 2] = "DashCase", t
        }({});

        function Rs(t, e) {
            return (void 0)(t, e)
        }

        function Ts(t) {
            const e = t[3];
            return te(e) ? e[3] : e
        }

        function As(t) {
            return Is(t[13])
        }

        function Ds(t) {
            return Is(t[4])
        }

        function Is(t) {
            for (; null !== t && !te(t);) t = t[4];
            return t
        }

        function Ps(t, e, n, s, i) {
            if (null != s) {
                let r, o = !1;
                te(s) ? r = s : Jt(s) && (o = !0, s = s[0]);
                const a = me(s);
                0 === t && null !== n ? null == i ? Bs(e, n, a) : zs(e, n, a, i || null, !0) : 1 === t && null !== n ? zs(e, n, a, i || null, !0) : 2 === t ? function (t, e, n) {
                    const s = Us(t, e);
                    s && function (t, e, n, s) {
                        pe(t) ? t.removeChild(e, n, s) : e.removeChild(n)
                    }(t, s, e, n)
                }(e, a, o) : 3 === t && e.destroyNode(a), null != r && function (t, e, n, s, i) {
                    const r = n[7];
                    r !== me(n) && Ps(e, t, s, r, i);
                    for (let o = 10; o < n.length; o++) {
                        const i = n[o];
                        Zs(i[1], i, t, e, s, r)
                    }
                }(e, t, r, n, i)
            }
        }

        function Ns(t, e, n) {
            return pe(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e)
        }

        function Fs(t, e) {
            const n = t[9], s = n.indexOf(e), i = e[3];
            1024 & e[2] && (e[2] &= -1025, Ee(i, -1)), n.splice(s, 1)
        }

        function Ls(t, e) {
            if (t.length <= 10) return;
            const n = 10 + e, s = t[n];
            if (s) {
                const r = s[17];
                null !== r && r !== t && Fs(r, s), e > 0 && (t[n - 1][4] = s[4]);
                const o = Zn(t, 10 + e);
                Zs(s[1], i = s, i[11], 2, null, null), i[0] = null, i[6] = null;
                const a = o[19];
                null !== a && a.detachView(o[1]), s[3] = null, s[4] = null, s[2] &= -129
            }
            var i;
            return s
        }

        function Ms(t, e) {
            if (!(256 & e[2])) {
                const n = e[11];
                pe(n) && n.destroyNode && Zs(t, e, n, 3, null, null), function (t) {
                    let e = t[13];
                    if (!e) return Vs(t[1], t);
                    for (; e;) {
                        let n = null;
                        if (Jt(e)) n = e[13]; else {
                            const t = e[10];
                            t && (n = t)
                        }
                        if (!n) {
                            for (; e && !e[4] && e !== t;) Jt(e) && Vs(e[1], e), e = e[3];
                            null === e && (e = t), Jt(e) && Vs(e[1], e), n = e && e[4]
                        }
                        e = n
                    }
                }(e)
            }
        }

        function Vs(t, e) {
            if (!(256 & e[2])) {
                e[2] &= -129, e[2] |= 256, function (t, e) {
                    let n;
                    if (null != t && null != (n = t.destroyHooks)) for (let s = 0; s < n.length; s += 2) {
                        const t = e[n[s]];
                        if (!(t instanceof dn)) {
                            const e = n[s + 1];
                            if (Array.isArray(e)) for (let n = 0; n < e.length; n += 2) e[n + 1].call(t[e[n]]); else e.call(t)
                        }
                    }
                }(t, e), function (t, e) {
                    const n = t.cleanup, s = e[7];
                    let i = -1;
                    if (null !== n) for (let r = 0; r < n.length - 1; r += 2) if ("string" == typeof n[r]) {
                        const t = n[r + 1], o = "function" == typeof t ? t(e) : me(e[t]), a = s[i = n[r + 2]],
                            l = n[r + 3];
                        "boolean" == typeof l ? o.removeEventListener(n[r], a, l) : l >= 0 ? s[i = l]() : s[i = -l].unsubscribe(), r += 2
                    } else {
                        const t = s[i = n[r + 1]];
                        n[r].call(t)
                    }
                    if (null !== s) {
                        for (let t = i + 1; t < s.length; t++) (0, s[t])();
                        e[7] = null
                    }
                }(t, e), 1 === e[1].type && pe(e[11]) && e[11].destroy();
                const n = e[17];
                if (null !== n && te(e[3])) {
                    n !== e[3] && Fs(n, e);
                    const s = e[19];
                    null !== s && s.detachView(t)
                }
            }
        }

        function js(t, e, n) {
            return function (t, e, n) {
                let s = e;
                for (; null !== s && 40 & s.type;) s = (e = s).parent;
                if (null === s) return n[0];
                if (2 & s.flags) {
                    const e = t.data[s.directiveStart].encapsulation;
                    if (e === Et.None || e === Et.Emulated) return null
                }
                return _e(s, n)
            }(t, e.parent, n)
        }

        function zs(t, e, n, s, i) {
            pe(t) ? t.insertBefore(e, n, s, i) : e.insertBefore(n, s, i)
        }

        function Bs(t, e, n) {
            pe(t) ? t.appendChild(e, n) : e.appendChild(n)
        }

        function Hs(t, e, n, s, i) {
            null !== s ? zs(t, e, n, s, i) : Bs(t, e, n)
        }

        function Us(t, e) {
            return pe(t) ? t.parentNode(e) : e.parentNode
        }

        function $s(t, e, n) {
            return qs(t, e, n)
        }

        let qs = function (t, e, n) {
            return 40 & t.type ? _e(t, n) : null
        };

        function Ws(t, e, n, s) {
            const i = js(t, s, e), r = e[11], o = $s(s.parent || e[6], s, e);
            if (null != i) if (Array.isArray(n)) for (let a = 0; a < n.length; a++) Hs(r, i, n[a], o, !1); else Hs(r, i, n, o, !1)
        }

        function Gs(t, e) {
            return null !== e ? t[16][6].projection[e.projection] : null
        }

        function Ks(t, e, n, s, i, r, o) {
            for (; null != n;) {
                const a = s[n.index], l = n.type;
                if (o && 0 === e && (a && Ss(me(a), s), n.flags |= 4), 64 != (64 & n.flags)) if (8 & l) Ks(t, e, n.child, s, i, r, !1), Ps(e, t, i, a, r); else if (32 & l) {
                    const o = Rs(n, s);
                    let l;
                    for (; l = o();) Ps(e, t, i, l, r);
                    Ps(e, t, i, a, r)
                } else 16 & l ? Qs(t, e, s, n, i, r) : Ps(e, t, i, a, r);
                n = o ? n.projectionNext : n.next
            }
        }

        function Zs(t, e, n, s, i, r) {
            Ks(n, s, t.firstChild, e, i, r, !1)
        }

        function Qs(t, e, n, s, i, r) {
            const o = n[16], a = o[6].projection[s.projection];
            if (Array.isArray(a)) for (let l = 0; l < a.length; l++) Ps(e, t, i, a[l], r); else Ks(t, e, a, o[3], i, r, !0)
        }

        function Ys(t, e, n) {
            pe(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n
        }

        function Xs(t, e, n) {
            pe(t) ? "" === n ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n) : e.className = n
        }

        function Js(t, e, n) {
            let s = t.length;
            for (; ;) {
                const i = t.indexOf(e, n);
                if (-1 === i) return i;
                if (0 === i || t.charCodeAt(i - 1) <= 32) {
                    const n = e.length;
                    if (i + n === s || t.charCodeAt(i + n) <= 32) return i
                }
                n = i + 1
            }
        }

        function ti(t, e, n) {
            let s = 0;
            for (; s < t.length;) {
                let i = t[s++];
                if (n && "class" === i) {
                    if (i = t[s], -1 !== Js(i.toLowerCase(), e, 0)) return !0
                } else if (1 === i) {
                    for (; s < t.length && "string" == typeof (i = t[s++]);) if (i.toLowerCase() === e) return !0;
                    return !1
                }
            }
            return !1
        }

        function ei(t) {
            return 4 === t.type && "ng-template" !== t.value
        }

        function ni(t, e, n) {
            return e === (4 !== t.type || n ? t.value : "ng-template")
        }

        function si(t, e, n) {
            let s = 4;
            const i = t.attrs || [], r = function (t) {
                for (let e = 0; e < t.length; e++) if (fn(t[e])) return e;
                return t.length
            }(i);
            let o = !1;
            for (let a = 0; a < e.length; a++) {
                const l = e[a];
                if ("number" != typeof l) {
                    if (!o) if (4 & s) {
                        if (s = 2 | 1 & s, "" !== l && !ni(t, l, n) || "" === l && 1 === e.length) {
                            if (ii(s)) return !1;
                            o = !0
                        }
                    } else {
                        const c = 8 & s ? l : e[++a];
                        if (8 & s && null !== t.attrs) {
                            if (!ti(t.attrs, c, n)) {
                                if (ii(s)) return !1;
                                o = !0
                            }
                            continue
                        }
                        const h = ri(8 & s ? "class" : l, i, ei(t), n);
                        if (-1 === h) {
                            if (ii(s)) return !1;
                            o = !0;
                            continue
                        }
                        if ("" !== c) {
                            let t;
                            t = h > r ? "" : i[h + 1].toLowerCase();
                            const e = 8 & s ? t : null;
                            if (e && -1 !== Js(e, c, 0) || 2 & s && c !== t) {
                                if (ii(s)) return !1;
                                o = !0
                            }
                        }
                    }
                } else {
                    if (!o && !ii(s) && !ii(l)) return !1;
                    if (o && ii(l)) continue;
                    o = !1, s = l | 1 & s
                }
            }
            return ii(s) || o
        }

        function ii(t) {
            return 0 == (1 & t)
        }

        function ri(t, e, n, s) {
            if (null === e) return -1;
            let i = 0;
            if (s || !n) {
                let n = !1;
                for (; i < e.length;) {
                    const s = e[i];
                    if (s === t) return i;
                    if (3 === s || 6 === s) n = !0; else {
                        if (1 === s || 2 === s) {
                            let t = e[++i];
                            for (; "string" == typeof t;) t = e[++i];
                            continue
                        }
                        if (4 === s) break;
                        if (0 === s) {
                            i += 4;
                            continue
                        }
                    }
                    i += n ? 1 : 2
                }
                return -1
            }
            return function (t, e) {
                let n = t.indexOf(4);
                if (n > -1) for (n++; n < t.length;) {
                    const s = t[n];
                    if ("number" == typeof s) return -1;
                    if (s === e) return n;
                    n++
                }
                return -1
            }(e, t)
        }

        function oi(t, e, n = !1) {
            for (let s = 0; s < e.length; s++) if (si(t, e[s], n)) return !0;
            return !1
        }

        function ai(t, e) {
            t:for (let n = 0; n < e.length; n++) {
                const s = e[n];
                if (t.length === s.length) {
                    for (let e = 0; e < t.length; e++) if (t[e] !== s[e]) continue t;
                    return !0
                }
            }
            return !1
        }

        function li(t, e) {
            return t ? ":not(" + e.trim() + ")" : e
        }

        function ci(t) {
            let e = t[0], n = 1, s = 2, i = "", r = !1;
            for (; n < t.length;) {
                let o = t[n];
                if ("string" == typeof o) if (2 & s) {
                    const e = t[++n];
                    i += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
                } else 8 & s ? i += "." + o : 4 & s && (i += " " + o); else "" === i || ii(o) || (e += li(r, i), i = ""), s = o, r = r || !ii(s);
                n++
            }
            return "" !== i && (e += li(r, i)), e
        }

        const hi = {};

        function ui(t) {
            di(Ae(), Te(), tn() + t, Me())
        }

        function di(t, e, n, s) {
            if (!s) if (3 == (3 & e[2])) {
                const s = t.preOrderCheckHooks;
                null !== s && an(e, s, n)
            } else {
                const s = t.preOrderHooks;
                null !== s && ln(e, s, 0, n)
            }
            en(n)
        }

        function pi(t, e) {
            return t << 17 | e << 2
        }

        function fi(t) {
            return t >> 17 & 32767
        }

        function mi(t) {
            return 2 | t
        }

        function gi(t) {
            return (131068 & t) >> 2
        }

        function _i(t, e) {
            return -131069 & t | e << 2
        }

        function yi(t) {
            return 1 | t
        }

        function bi(t, e) {
            const n = t.contentQueries;
            if (null !== n) for (let s = 0; s < n.length; s += 2) {
                const i = n[s], r = n[s + 1];
                if (-1 !== r) {
                    const n = t.data[r];
                    qe(i), n.contentQueries(2, e[r], r)
                }
            }
        }

        function vi(t, e, n, s, i, r, o, a, l, c) {
            const h = e.blueprint.slice();
            return h[0] = i, h[2] = 140 | s, ke(h), h[3] = h[15] = t, h[8] = n, h[10] = o || t && t[10], h[11] = a || t && t[11], h[12] = l || t && t[12] || null, h[9] = c || t && t[9] || null, h[6] = r, h[16] = 2 == e.type ? t[16] : h, h
        }

        function wi(t, e, n, s, i) {
            let r = t.data[e];
            if (null === r) r = function (t, e, n, s, i) {
                const r = Pe(), o = Fe(), a = t.data[e] = function (t, e, n, s, i, r) {
                    return {
                        type: n,
                        index: s,
                        insertBeforeIndex: null,
                        injectorIndex: e ? e.injectorIndex : -1,
                        directiveStart: -1,
                        directiveEnd: -1,
                        directiveStylingLast: -1,
                        propertyBindings: null,
                        flags: 0,
                        providerIndexes: 0,
                        value: i,
                        attrs: r,
                        mergedAttrs: null,
                        localNames: null,
                        initialInputs: void 0,
                        inputs: null,
                        outputs: null,
                        tViews: null,
                        next: null,
                        projectionNext: null,
                        child: null,
                        parent: e,
                        projection: null,
                        styles: null,
                        stylesWithoutHost: null,
                        residualStyles: void 0,
                        classes: null,
                        classesWithoutHost: null,
                        residualClasses: void 0,
                        classBindings: 0,
                        styleBindings: 0
                    }
                }(0, o ? r : r && r.parent, n, e, s, i);
                return null === t.firstChild && (t.firstChild = a), null !== r && (o ? null == r.child && null !== a.parent && (r.child = a) : null === r.next && (r.next = a)), a
            }(t, e, n, s, i), Oe.lFrame.inI18n && (r.flags |= 64); else if (64 & r.type) {
                r.type = n, r.value = s, r.attrs = i;
                const t = function () {
                    const t = Oe.lFrame, e = t.currentTNode;
                    return t.isParent ? e : e.parent
                }();
                r.injectorIndex = null === t ? -1 : t.injectorIndex
            }
            return Ne(r, !0), r
        }

        function Ci(t, e, n, s) {
            if (0 === n) return -1;
            const i = e.length;
            for (let r = 0; r < n; r++) e.push(s), t.blueprint.push(s), t.data.push(null);
            return i
        }

        function Si(t, e, n) {
            Ke(e);
            try {
                const s = t.viewQuery;
                null !== s && Xi(1, s, n);
                const i = t.template;
                null !== i && Ei(t, e, i, 1, n), t.firstCreatePass && (t.firstCreatePass = !1), t.staticContentQueries && bi(t, e), t.staticViewQueries && Xi(2, t.viewQuery, n);
                const r = t.components;
                null !== r && function (t, e) {
                    for (let n = 0; n < e.length; n++) Gi(t, e[n])
                }(e, r)
            } catch (s) {
                throw t.firstCreatePass && (t.incompleteFirstPass = !0), s
            } finally {
                e[2] &= -5, Je()
            }
        }

        function xi(t, e, n, s) {
            const i = e[2];
            if (256 == (256 & i)) return;
            Ke(e);
            const r = Me();
            try {
                ke(e), Oe.lFrame.bindingIndex = t.bindingStartIndex, null !== n && Ei(t, e, n, 2, s);
                const o = 3 == (3 & i);
                if (!r) if (o) {
                    const n = t.preOrderCheckHooks;
                    null !== n && an(e, n, null)
                } else {
                    const n = t.preOrderHooks;
                    null !== n && ln(e, n, 0, null), cn(e, 0)
                }
                if (function (t) {
                    for (let e = As(t); null !== e; e = Ds(e)) {
                        if (!e[2]) continue;
                        const t = e[9];
                        for (let e = 0; e < t.length; e++) {
                            const n = t[e], s = n[3];
                            0 == (1024 & n[2]) && Ee(s, 1), n[2] |= 1024
                        }
                    }
                }(e), function (t) {
                    for (let e = As(t); null !== e; e = Ds(e)) for (let t = 10; t < e.length; t++) {
                        const n = e[t], s = n[1];
                        Se(n) && xi(s, n, s.template, n[8])
                    }
                }(e), null !== t.contentQueries && bi(t, e), !r) if (o) {
                    const n = t.contentCheckHooks;
                    null !== n && an(e, n)
                } else {
                    const n = t.contentHooks;
                    null !== n && ln(e, n, 1), cn(e, 1)
                }
                !function (t, e) {
                    const n = t.hostBindingOpCodes;
                    if (null !== n) try {
                        for (let t = 0; t < n.length; t++) {
                            const s = n[t];
                            if (s < 0) en(~s); else {
                                const i = s, r = n[++t], o = n[++t];
                                He(r, i), o(2, e[i])
                            }
                        }
                    } finally {
                        en(-1)
                    }
                }(t, e);
                const a = t.components;
                null !== a && function (t, e) {
                    for (let n = 0; n < e.length; n++) Wi(t, e[n])
                }(e, a);
                const l = t.viewQuery;
                if (null !== l && Xi(2, l, s), !r) if (o) {
                    const n = t.viewCheckHooks;
                    null !== n && an(e, n)
                } else {
                    const n = t.viewHooks;
                    null !== n && ln(e, n, 2), cn(e, 2)
                }
                !0 === t.firstUpdatePass && (t.firstUpdatePass = !1), r || (e[2] &= -73), 1024 & e[2] && (e[2] &= -1025, Ee(e[3], -1))
            } finally {
                Je()
            }
        }

        function ki(t, e, n, s) {
            const i = e[10], r = !Me(), o = Ce(e);
            try {
                r && !o && i.begin && i.begin(), o && Si(t, e, s), xi(t, e, n, s)
            } finally {
                r && !o && i.end && i.end()
            }
        }

        function Ei(t, e, n, s, i) {
            const r = tn();
            try {
                en(-1), 2 & s && e.length > 20 && di(t, e, 20, Me()), n(s, i)
            } finally {
                en(r)
            }
        }

        function Oi(t, e, n) {
            if (ee(e)) {
                const s = e.directiveEnd;
                for (let i = e.directiveStart; i < s; i++) {
                    const e = t.data[i];
                    e.contentQueries && e.contentQueries(1, n[i], i)
                }
            }
        }

        function Ri(t, e, n) {
            Re() && (function (t, e, n, s) {
                const i = n.directiveStart, r = n.directiveEnd;
                t.firstCreatePass || xn(n, e), Ss(s, e);
                const o = n.initialInputs;
                for (let a = i; a < r; a++) {
                    const s = t.data[a], r = ie(s);
                    r && Hi(e, n, s);
                    const l = Ln(e, t, a, n);
                    Ss(l, e), null !== o && Ui(0, a - i, l, s, 0, o), r && (ve(n.index, e)[8] = l)
                }
            }(t, e, n, _e(n, e)), 128 == (128 & n.flags) && function (t, e, n) {
                const s = n.directiveStart, i = n.directiveEnd, r = n.index, o = Oe.lFrame.currentDirectiveIndex;
                try {
                    en(r);
                    for (let n = s; n < i; n++) {
                        const s = t.data[n], i = e[n];
                        Ue(n), null === s.hostBindings && 0 === s.hostVars && null === s.hostAttrs || Mi(s, i)
                    }
                } finally {
                    en(-1), Ue(o)
                }
            }(t, e, n))
        }

        function Ti(t, e, n = _e) {
            const s = e.localNames;
            if (null !== s) {
                let i = e.index + 1;
                for (let r = 0; r < s.length; r += 2) {
                    const o = s[r + 1], a = -1 === o ? n(e, t) : t[o];
                    t[i++] = a
                }
            }
        }

        function Ai(t) {
            const e = t.tView;
            return null === e || e.incompleteFirstPass ? t.tView = Di(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : e
        }

        function Di(t, e, n, s, i, r, o, a, l, c) {
            const h = 20 + s, u = h + i, d = function (t, e) {
                const n = [];
                for (let s = 0; s < e; s++) n.push(s < t ? null : hi);
                return n
            }(h, u), p = "function" == typeof c ? c() : c;
            return d[1] = {
                type: t,
                blueprint: d,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: e,
                data: d.slice().fill(null, h),
                bindingStartIndex: h,
                expandoStartIndex: u,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof r ? r() : r,
                pipeRegistry: "function" == typeof o ? o() : o,
                firstChild: null,
                schemas: l,
                consts: p,
                incompleteFirstPass: !1
            }
        }

        function Ii(t, e, n, s) {
            const i = tr(e);
            null === n ? i.push(s) : (i.push(n), t.firstCreatePass && er(t).push(s, i.length - 1))
        }

        function Pi(t, e, n) {
            for (let s in t) if (t.hasOwnProperty(s)) {
                const i = t[s];
                (n = null === n ? {} : n).hasOwnProperty(s) ? n[s].push(e, i) : n[s] = [e, i]
            }
            return n
        }

        function Ni(t, e, n, s, i, r, o, a) {
            const l = _e(e, n);
            let c, h = e.inputs;
            var u;
            !a && null != h && (c = h[s]) ? (sr(t, n, c, s, i), ne(e) && function (t, e) {
                const n = ve(e, t);
                16 & n[2] || (n[2] |= 64)
            }(n, e.index)) : 3 & e.type && (s = "class" === (u = s) ? "className" : "for" === u ? "htmlFor" : "formaction" === u ? "formAction" : "innerHtml" === u ? "innerHTML" : "readonly" === u ? "readOnly" : "tabindex" === u ? "tabIndex" : u, i = null != o ? o(i, e.value || "", s) : i, pe(r) ? r.setProperty(l, s, i) : mn(s) || (l.setProperty ? l.setProperty(s, i) : l[s] = i))
        }

        function Fi(t, e, n, s) {
            let i = !1;
            if (Re()) {
                const r = function (t, e, n) {
                    const s = t.directiveRegistry;
                    let i = null;
                    if (s) for (let r = 0; r < s.length; r++) {
                        const o = s[r];
                        oi(n, o.selectors, !1) && (i || (i = []), Rn(xn(n, e), t, o.type), ie(o) ? (Vi(t, n), i.unshift(o)) : i.push(o))
                    }
                    return i
                }(t, e, n), o = null === s ? null : {"": -1};
                if (null !== r) {
                    i = !0, zi(n, t.data.length, r.length);
                    for (let t = 0; t < r.length; t++) {
                        const e = r[t];
                        e.providersResolver && e.providersResolver(e)
                    }
                    let s = !1, a = !1, l = Ci(t, e, r.length, null);
                    for (let i = 0; i < r.length; i++) {
                        const c = r[i];
                        n.mergedAttrs = gn(n.mergedAttrs, c.hostAttrs), Bi(t, n, e, l, c), ji(l, c, o), null !== c.contentQueries && (n.flags |= 8), null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars || (n.flags |= 128);
                        const h = c.type.prototype;
                        !s && (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), s = !0), a || !h.ngOnChanges && !h.ngDoCheck || ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), a = !0), l++
                    }
                    !function (t, e) {
                        const n = e.directiveEnd, s = t.data, i = e.attrs, r = [];
                        let o = null, a = null;
                        for (let l = e.directiveStart; l < n; l++) {
                            const t = s[l], n = t.inputs, c = null === i || ei(e) ? null : $i(n, i);
                            r.push(c), o = Pi(n, l, o), a = Pi(t.outputs, l, a)
                        }
                        null !== o && (o.hasOwnProperty("class") && (e.flags |= 16), o.hasOwnProperty("style") && (e.flags |= 32)), e.initialInputs = r, e.inputs = o, e.outputs = a
                    }(t, n)
                }
                o && function (t, e, n) {
                    if (e) {
                        const s = t.localNames = [];
                        for (let t = 0; t < e.length; t += 2) {
                            const i = n[e[t + 1]];
                            if (null == i) throw new at("301", `Export of name '${e[t + 1]}' not found!`);
                            s.push(e[t], i)
                        }
                    }
                }(n, s, o)
            }
            return n.mergedAttrs = gn(n.mergedAttrs, n.attrs), i
        }

        function Li(t, e, n, s, i, r) {
            const o = r.hostBindings;
            if (o) {
                let n = t.hostBindingOpCodes;
                null === n && (n = t.hostBindingOpCodes = []);
                const r = ~e.index;
                (function (t) {
                    let e = t.length;
                    for (; e > 0;) {
                        const n = t[--e];
                        if ("number" == typeof n && n < 0) return n
                    }
                    return 0
                })(n) != r && n.push(r), n.push(s, i, o)
            }
        }

        function Mi(t, e) {
            null !== t.hostBindings && t.hostBindings(1, e)
        }

        function Vi(t, e) {
            e.flags |= 2, (t.components || (t.components = [])).push(e.index)
        }

        function ji(t, e, n) {
            if (n) {
                if (e.exportAs) for (let s = 0; s < e.exportAs.length; s++) n[e.exportAs[s]] = t;
                ie(e) && (n[""] = t)
            }
        }

        function zi(t, e, n) {
            t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n, t.providerIndexes = e
        }

        function Bi(t, e, n, s, i) {
            t.data[s] = i;
            const r = i.factory || (i.factory = re(i.type)), o = new dn(r, ie(i), null);
            t.blueprint[s] = o, n[s] = o, Li(t, e, 0, s, Ci(t, n, i.hostVars, hi), i)
        }

        function Hi(t, e, n) {
            const s = _e(e, t), i = Ai(n), r = t[10],
                o = Ki(t, vi(t, i, null, n.onPush ? 64 : 16, s, e, r, r.createRenderer(s, n), null, null));
            t[e.index] = o
        }

        function Ui(t, e, n, s, i, r) {
            const o = r[e];
            if (null !== o) {
                const t = s.setInput;
                for (let e = 0; e < o.length;) {
                    const i = o[e++], r = o[e++], a = o[e++];
                    null !== t ? s.setInput(n, a, i, r) : n[r] = a
                }
            }
        }

        function $i(t, e) {
            let n = null, s = 0;
            for (; s < e.length;) {
                const i = e[s];
                if (0 !== i) if (5 !== i) {
                    if ("number" == typeof i) break;
                    t.hasOwnProperty(i) && (null === n && (n = []), n.push(i, t[i], e[s + 1])), s += 2
                } else s += 2; else s += 4
            }
            return n
        }

        function qi(t, e, n, s) {
            return new Array(t, !0, !1, e, null, 0, s, n, null, null)
        }

        function Wi(t, e) {
            const n = ve(e, t);
            if (Se(n)) {
                const t = n[1];
                80 & n[2] ? xi(t, n, t.template, n[8]) : n[5] > 0 && function t(e) {
                    for (let s = As(e); null !== s; s = Ds(s)) for (let e = 10; e < s.length; e++) {
                        const n = s[e];
                        if (1024 & n[2]) {
                            const t = n[1];
                            xi(t, n, t.template, n[8])
                        } else n[5] > 0 && t(n)
                    }
                    const n = e[1].components;
                    if (null !== n) for (let s = 0; s < n.length; s++) {
                        const i = ve(n[s], e);
                        Se(i) && i[5] > 0 && t(i)
                    }
                }(n)
            }
        }

        function Gi(t, e) {
            const n = ve(e, t), s = n[1];
            !function (t, e) {
                for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n])
            }(s, n), Si(s, n, n[8])
        }

        function Ki(t, e) {
            return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e
        }

        function Zi(t) {
            for (; t;) {
                t[2] |= 64;
                const e = Ts(t);
                if (0 != (512 & t[2]) && !e) return t;
                t = e
            }
            return null
        }

        function Qi(t, e, n) {
            const s = e[10];
            s.begin && s.begin();
            try {
                xi(t, e, t.template, n)
            } catch (i) {
                throw nr(e, i), i
            } finally {
                s.end && s.end()
            }
        }

        function Yi(t) {
            !function (t) {
                for (let e = 0; e < t.components.length; e++) {
                    const n = t.components[e], s = we(n), i = s[1];
                    ki(i, s, i.template, n)
                }
            }(t[8])
        }

        function Xi(t, e, n) {
            qe(0), e(t, n)
        }

        const Ji = (() => Promise.resolve(null))();

        function tr(t) {
            return t[7] || (t[7] = [])
        }

        function er(t) {
            return t.cleanup || (t.cleanup = [])
        }

        function nr(t, e) {
            const n = t[9], s = n ? n.get(Cs, null) : null;
            s && s.handleError(e)
        }

        function sr(t, e, n, s, i) {
            for (let r = 0; r < n.length;) {
                const o = n[r++], a = n[r++], l = e[o], c = t.data[o];
                null !== c.setInput ? c.setInput(l, i, s, a) : l[a] = i
            }
        }

        function ir(t, e, n) {
            let s = n ? t.styles : null, i = n ? t.classes : null, r = 0;
            if (null !== e) for (let o = 0; o < e.length; o++) {
                const t = e[o];
                "number" == typeof t ? r = t : 1 == r ? i = nt(i, t) : 2 == r && (s = nt(s, t + ": " + e[++o] + ";"))
            }
            n ? t.styles = s : t.stylesWithoutHost = s, n ? t.classes = i : t.classesWithoutHost = i
        }

        const rr = new $n("INJECTOR", -1);

        class or {
            get(t, e = ts) {
                if (e === ts) {
                    const e = new Error(`NullInjectorError: No provider for ${et(t)}!`);
                    throw e.name = "NullInjectorError", e
                }
                return e
            }
        }

        const ar = new $n("Set Injector scope."), lr = {}, cr = {}, hr = [];
        let ur = void 0;

        function dr() {
            return void 0 === ur && (ur = new or), ur
        }

        function pr(t, e = null, n = null, s) {
            return new fr(t, n, e || dr(), s)
        }

        class fr {
            constructor(t, e, n, s = null) {
                this.parent = n, this.records = new Map, this.injectorDefTypes = new Set, this.onDestroy = new Set, this._destroyed = !1;
                const i = [];
                e && Gn(e, n => this.processProvider(n, t, e)), Gn([t], t => this.processInjectorType(t, [], i)), this.records.set(rr, _r(void 0, this));
                const r = this.records.get(ar);
                this.scope = null != r ? r.value : null, this.source = s || ("object" == typeof t ? null : et(t))
            }

            get destroyed() {
                return this._destroyed
            }

            destroy() {
                this.assertNotDestroyed(), this._destroyed = !0;
                try {
                    this.onDestroy.forEach(t => t.ngOnDestroy())
                } finally {
                    this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear()
                }
            }

            get(t, e = ts, n = vt.Default) {
                this.assertNotDestroyed();
                const s = is(this);
                try {
                    if (!(n & vt.SkipSelf)) {
                        let e = this.records.get(t);
                        if (void 0 === e) {
                            const n = ("function" == typeof (i = t) || "object" == typeof i && i instanceof $n) && pt(t);
                            e = n && this.injectableDefInScope(n) ? _r(mr(t), lr) : null, this.records.set(t, e)
                        }
                        if (null != e) return this.hydrate(t, e)
                    }
                    return (n & vt.Self ? dr() : this.parent).get(t, e = n & vt.Optional && e === ts ? null : e)
                } catch (r) {
                    if ("NullInjectorError" === r.name) {
                        if ((r.ngTempTokenPath = r.ngTempTokenPath || []).unshift(et(t)), s) throw r;
                        return function (t, e, n, s) {
                            const i = t.ngTempTokenPath;
                            throw e.__source && i.unshift(e.__source), t.message = function (t, e, n, s = null) {
                                t = t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1) ? t.substr(2) : t;
                                let i = et(e);
                                if (Array.isArray(e)) i = e.map(et).join(" -> "); else if ("object" == typeof e) {
                                    let t = [];
                                    for (let n in e) if (e.hasOwnProperty(n)) {
                                        let s = e[n];
                                        t.push(n + ":" + ("string" == typeof s ? JSON.stringify(s) : et(s)))
                                    }
                                    i = `{${t.join(", ")}}`
                                }
                                return `${n}${s ? "(" + s + ")" : ""}[${i}]: ${t.replace(es, "\n  ")}`
                            }("\n" + t.message, i, n, s), t.ngTokenPath = i, t.ngTempTokenPath = null, t
                        }(r, t, "R3InjectorError", this.source)
                    }
                    throw r
                } finally {
                    is(s)
                }
                var i
            }

            _resolveInjectorDefTypes() {
                this.injectorDefTypes.forEach(t => this.get(t))
            }

            toString() {
                const t = [];
                return this.records.forEach((e, n) => t.push(et(n))), `R3Injector[${t.join(", ")}]`
            }

            assertNotDestroyed() {
                if (this._destroyed) throw new Error("Injector has already been destroyed.")
            }

            processInjectorType(t, e, n) {
                if (!(t = rt(t))) return !1;
                let s = mt(t);
                const i = null == s && t.ngModule || void 0, r = void 0 === i ? t : i, o = -1 !== n.indexOf(r);
                if (void 0 !== i && (s = mt(i)), null == s) return !1;
                if (null != s.imports && !o) {
                    let t;
                    n.push(r);
                    try {
                        Gn(s.imports, s => {
                            this.processInjectorType(s, e, n) && (void 0 === t && (t = []), t.push(s))
                        })
                    } finally {
                    }
                    if (void 0 !== t) for (let e = 0; e < t.length; e++) {
                        const {ngModule: n, providers: s} = t[e];
                        Gn(s, t => this.processProvider(t, n, s || hr))
                    }
                }
                this.injectorDefTypes.add(r);
                const a = re(r) || (() => new r);
                this.records.set(r, _r(a, lr));
                const l = s.providers;
                if (null != l && !o) {
                    const e = t;
                    Gn(l, t => this.processProvider(t, e, l))
                }
                return void 0 !== i && void 0 !== t.providers
            }

            processProvider(t, e, n) {
                let s = br(t = rt(t)) ? t : rt(t && t.provide);
                const i = function (t, e, n) {
                    return yr(t) ? _r(void 0, t.useValue) : _r(gr(t), lr)
                }(t);
                if (br(t) || !0 !== t.multi) this.records.get(s); else {
                    let e = this.records.get(s);
                    e || (e = _r(void 0, lr, !0), e.factory = () => ls(e.multi), this.records.set(s, e)), s = t, e.multi.push(t)
                }
                this.records.set(s, i)
            }

            hydrate(t, e) {
                var n;
                return e.value === lr && (e.value = cr, e.value = e.factory()), "object" == typeof e.value && e.value && null !== (n = e.value) && "object" == typeof n && "function" == typeof n.ngOnDestroy && this.onDestroy.add(e.value), e.value
            }

            injectableDefInScope(t) {
                return !!t.providedIn && ("string" == typeof t.providedIn ? "any" === t.providedIn || t.providedIn === this.scope : this.injectorDefTypes.has(t.providedIn))
            }
        }

        function mr(t) {
            const e = pt(t), n = null !== e ? e.factory : re(t);
            if (null !== n) return n;
            if (t instanceof $n) throw new Error(`Token ${et(t)} is missing a \u0275prov definition.`);
            if (t instanceof Function) return function (t) {
                const e = t.length;
                if (e > 0) {
                    const n = Qn(e, "?");
                    throw new Error(`Can't resolve all parameters for ${et(t)}: (${n.join(", ")}).`)
                }
                const n = function (t) {
                    const e = t && (t[gt] || t[yt]);
                    if (e) {
                        const n = function (t) {
                            if (t.hasOwnProperty("name")) return t.name;
                            const e = ("" + t).match(/^function\s*([^\s(]+)/);
                            return null === e ? "" : e[1]
                        }(t);
                        return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), e
                    }
                    return null
                }(t);
                return null !== n ? () => n.factory(t) : () => new t
            }(t);
            throw new Error("unreachable")
        }

        function gr(t, e, n) {
            let s = void 0;
            if (br(t)) {
                const e = rt(t);
                return re(e) || mr(e)
            }
            if (yr(t)) s = () => rt(t.useValue); else if ((i = t) && i.useFactory) s = () => t.useFactory(...ls(t.deps || [])); else if (function (t) {
                return !(!t || !t.useExisting)
            }(t)) s = () => os(rt(t.useExisting)); else {
                const e = rt(t && (t.useClass || t.provide));
                if (!function (t) {
                    return !!t.deps
                }(t)) return re(e) || mr(e);
                s = () => new e(...ls(t.deps))
            }
            var i;
            return s
        }

        function _r(t, e, n = !1) {
            return {factory: t, value: e, multi: n ? [] : void 0}
        }

        function yr(t) {
            return null !== t && "object" == typeof t && ns in t
        }

        function br(t) {
            return "function" == typeof t
        }

        const vr = function (t, e, n) {
            return function (t, e = null, n = null, s) {
                const i = pr(t, e, n, s);
                return i._resolveInjectorDefTypes(), i
            }({name: n}, e, t, n)
        };
        let wr = (() => {
            class t {
                static create(t, e) {
                    return Array.isArray(t) ? vr(t, e, "") : vr(t.providers, t.parent, t.name || "")
                }
            }

            return t.THROW_IF_NOT_FOUND = ts, t.NULL = new or, t.\u0275prov = ut({
                token: t,
                providedIn: "any",
                factory: () => os(rr)
            }), t.__NG_ELEMENT_ID__ = -1, t
        })();

        function Cr(t, e) {
            on(we(t)[1], Ie())
        }

        function Sr(t) {
            let e = Object.getPrototypeOf(t.type.prototype).constructor, n = !0;
            const s = [t];
            for (; e;) {
                let i = void 0;
                if (ie(t)) i = e.\u0275cmp || e.\u0275dir; else {
                    if (e.\u0275cmp) throw new Error("Directives cannot inherit Components");
                    i = e.\u0275dir
                }
                if (i) {
                    if (n) {
                        s.push(i);
                        const e = t;
                        e.inputs = xr(t.inputs), e.declaredInputs = xr(t.declaredInputs), e.outputs = xr(t.outputs);
                        const n = i.hostBindings;
                        n && Or(t, n);
                        const r = i.viewQuery, o = i.contentQueries;
                        if (r && kr(t, r), o && Er(t, o), tt(t.inputs, i.inputs), tt(t.declaredInputs, i.declaredInputs), tt(t.outputs, i.outputs), ie(i) && i.data.animation) {
                            const e = t.data;
                            e.animation = (e.animation || []).concat(i.data.animation)
                        }
                    }
                    const e = i.features;
                    if (e) for (let s = 0; s < e.length; s++) {
                        const i = e[s];
                        i && i.ngInherit && i(t), i === Sr && (n = !1)
                    }
                }
                e = Object.getPrototypeOf(e)
            }
            !function (t) {
                let e = 0, n = null;
                for (let s = t.length - 1; s >= 0; s--) {
                    const i = t[s];
                    i.hostVars = e += i.hostVars, i.hostAttrs = gn(i.hostAttrs, n = gn(n, i.hostAttrs))
                }
            }(s)
        }

        function xr(t) {
            return t === It ? {} : t === Nt ? [] : t
        }

        function kr(t, e) {
            const n = t.viewQuery;
            t.viewQuery = n ? (t, s) => {
                e(t, s), n(t, s)
            } : e
        }

        function Er(t, e) {
            const n = t.contentQueries;
            t.contentQueries = n ? (t, s, i) => {
                e(t, s, i), n(t, s, i)
            } : e
        }

        function Or(t, e) {
            const n = t.hostBindings;
            t.hostBindings = n ? (t, s) => {
                e(t, s), n(t, s)
            } : e
        }

        let Rr = null;

        function Tr() {
            if (!Rr) {
                const t = Dt.Symbol;
                if (t && t.iterator) Rr = t.iterator; else {
                    const t = Object.getOwnPropertyNames(Map.prototype);
                    for (let e = 0; e < t.length; ++e) {
                        const n = t[e];
                        "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (Rr = n)
                    }
                }
            }
            return Rr
        }

        class Ar {
            constructor(t) {
                this.wrapped = t
            }

            static wrap(t) {
                return new Ar(t)
            }

            static unwrap(t) {
                return Ar.isWrapped(t) ? t.wrapped : t
            }

            static isWrapped(t) {
                return t instanceof Ar
            }
        }

        function Dr(t) {
            return !!Ir(t) && (Array.isArray(t) || !(t instanceof Map) && Tr() in t)
        }

        function Ir(t) {
            return null !== t && ("function" == typeof t || "object" == typeof t)
        }

        function Pr(t, e, n) {
            return t[e] = n
        }

        function Nr(t, e, n) {
            return !Object.is(t[e], n) && (t[e] = n, !0)
        }

        function Fr(t, e, n, s) {
            const i = Te();
            return Nr(i, ze(), e) && (Ae(), function (t, e, n, s, i, r) {
                const o = _e(t, e);
                !function (t, e, n, s, i, r, o) {
                    if (null == r) pe(t) ? t.removeAttribute(e, i, n) : e.removeAttribute(i); else {
                        const a = null == o ? lt(r) : o(r, s || "", i);
                        pe(t) ? t.setAttribute(e, i, a, n) : n ? e.setAttributeNS(n, i, a) : e.setAttribute(i, a)
                    }
                }(e[11], o, r, t.value, n, s, i)
            }(nn(), i, t, e, n, s)), Fr
        }

        function Lr(t, e, n, s) {
            return Nr(t, ze(), n) ? e + lt(n) + s : hi
        }

        function Mr(t, e, n, s, i, r, o, a) {
            const l = Te(), c = Ae(), h = t + 20, u = c.firstCreatePass ? function (t, e, n, s, i, r, o, a, l) {
                const c = e.consts, h = wi(e, t, 4, o || null, xe(c, a));
                Fi(e, n, h, xe(c, l)), on(e, h);
                const u = h.tViews = Di(2, h, s, i, r, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c);
                return null !== e.queries && (e.queries.template(e, h), u.queries = e.queries.embeddedTView(h)), h
            }(h, c, l, e, n, s, i, r, o) : c.data[h];
            Ne(u, !1);
            const d = l[11].createComment("");
            Ws(c, l, d, u), Ss(d, l), Ki(l, l[h] = qi(d, l, d, u)), se(u) && Ri(c, l, u), null != o && Ti(l, u, a)
        }

        function Vr(t, e = vt.Default) {
            const n = Te();
            return null === n ? os(t, e) : Dn(Ie(), n, rt(t), e)
        }

        function jr(t, e, n) {
            const s = Te();
            return Nr(s, ze(), e) && Ni(Ae(), nn(), s, t, e, s[11], n, !1), jr
        }

        function zr(t, e, n, s, i) {
            const r = i ? "class" : "style";
            sr(t, n, e.inputs[r], r, s)
        }

        function Br(t, e, n, s) {
            const i = Te(), r = Ae(), o = 20 + t, a = i[11], l = i[o] = Ns(a, e, Oe.lFrame.currentNamespace),
                c = r.firstCreatePass ? function (t, e, n, s, i, r, o) {
                    const a = e.consts, l = wi(e, t, 2, i, xe(a, r));
                    return Fi(e, n, l, xe(a, o)), null !== l.attrs && ir(l, l.attrs, !1), null !== l.mergedAttrs && ir(l, l.mergedAttrs, !0), null !== e.queries && e.queries.elementStart(e, l), l
                }(o, r, i, 0, e, n, s) : r.data[o];
            Ne(c, !0);
            const h = c.mergedAttrs;
            null !== h && pn(a, l, h);
            const u = c.classes;
            null !== u && Xs(a, l, u);
            const d = c.styles;
            null !== d && Ys(a, l, d), 64 != (64 & c.flags) && Ws(r, i, l, c), 0 === Oe.lFrame.elementDepthCount && Ss(l, i), Oe.lFrame.elementDepthCount++, se(c) && (Ri(r, i, c), Oi(r, c, i)), null !== s && Ti(i, c)
        }

        function Hr() {
            let t = Ie();
            Fe() ? Le() : (t = t.parent, Ne(t, !1));
            const e = t;
            Oe.lFrame.elementDepthCount--;
            const n = Ae();
            n.firstCreatePass && (on(n, t), ee(t) && n.queries.elementEnd(t)), null != e.classesWithoutHost && function (t) {
                return 0 != (16 & t.flags)
            }(e) && zr(n, e, Te(), e.classesWithoutHost, !0), null != e.stylesWithoutHost && function (t) {
                return 0 != (32 & t.flags)
            }(e) && zr(n, e, Te(), e.stylesWithoutHost, !1)
        }

        function Ur(t, e, n, s) {
            Br(t, e, n, s), Hr()
        }

        function $r(t, e, n) {
            const s = Te(), i = Ae(), r = t + 20, o = i.firstCreatePass ? function (t, e, n, s, i) {
                const r = e.consts, o = xe(r, s), a = wi(e, t, 8, "ng-container", o);
                return null !== o && ir(a, o, !0), Fi(e, n, a, xe(r, i)), null !== e.queries && e.queries.elementStart(e, a), a
            }(r, i, s, e, n) : i.data[r];
            Ne(o, !0);
            const a = s[r] = s[11].createComment("");
            Ws(i, s, a, o), Ss(a, s), se(o) && (Ri(i, s, o), Oi(i, o, s)), null != n && Ti(s, o)
        }

        function qr() {
            let t = Ie();
            const e = Ae();
            Fe() ? Le() : (t = t.parent, Ne(t, !1)), e.firstCreatePass && (on(e, t), ee(t) && e.queries.elementEnd(t))
        }

        function Wr(t, e, n) {
            $r(t, e, n), qr()
        }

        function Gr() {
            return Te()
        }

        function Kr(t) {
            return !!t && "function" == typeof t.then
        }

        function Zr(t) {
            return !!t && "function" == typeof t.subscribe
        }

        const Qr = Zr;

        function Yr(t, e, n = !1, s) {
            const i = Te(), r = Ae(), o = Ie();
            return function (t, e, n, s, i, r, o = !1, a) {
                const l = se(s), c = t.firstCreatePass && er(t), h = tr(e);
                let u = !0;
                if (3 & s.type) {
                    const d = _e(s, e), p = a ? a(d) : It, f = p.target || d, m = h.length,
                        g = a ? t => a(me(t[s.index])).target : s.index;
                    if (pe(n)) {
                        let o = null;
                        if (!a && l && (o = function (t, e, n, s) {
                            const i = t.cleanup;
                            if (null != i) for (let r = 0; r < i.length - 1; r += 2) {
                                const t = i[r];
                                if (t === n && i[r + 1] === s) {
                                    const t = e[7], n = i[r + 2];
                                    return t.length > n ? t[n] : null
                                }
                                "string" == typeof t && (r += 2)
                            }
                            return null
                        }(t, e, i, s.index)), null !== o) (o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = r, o.__ngLastListenerFn__ = r, u = !1; else {
                            r = Jr(s, e, r, !1);
                            const t = n.listen(p.name || f, i, r);
                            h.push(r, t), c && c.push(i, g, m, m + 1)
                        }
                    } else r = Jr(s, e, r, !0), f.addEventListener(i, r, o), h.push(r), c && c.push(i, g, m, o)
                } else r = Jr(s, e, r, !1);
                const d = s.outputs;
                let p;
                if (u && null !== d && (p = d[i])) {
                    const t = p.length;
                    if (t) for (let n = 0; n < t; n += 2) {
                        const t = e[p[n]][p[n + 1]].subscribe(r), o = h.length;
                        h.push(r, t), c && c.push(i, s.index, o, -(o + 1))
                    }
                }
            }(r, i, i[11], o, t, e, n, s), Yr
        }

        function Xr(t, e, n) {
            try {
                return !1 !== e(n)
            } catch (s) {
                return nr(t, s), !1
            }
        }

        function Jr(t, e, n, s) {
            return function i(r) {
                if (r === Function) return n;
                const o = 2 & t.flags ? ve(t.index, e) : e;
                0 == (32 & e[2]) && Zi(o);
                let a = Xr(e, n, r), l = i.__ngNextListenerFn__;
                for (; l;) a = Xr(e, l, r) && a, l = l.__ngNextListenerFn__;
                return s && !1 === a && (r.preventDefault(), r.returnValue = !1), a
            }
        }

        function to(t = 1) {
            return function (t) {
                return (Oe.lFrame.contextLView = function (t, e) {
                    for (; t > 0;) e = e[15], t--;
                    return e
                }(t, Oe.lFrame.contextLView))[8]
            }(t)
        }

        function eo(t, e) {
            let n = null;
            const s = function (t) {
                const e = t.attrs;
                if (null != e) {
                    const t = e.indexOf(5);
                    if (0 == (1 & t)) return e[t + 1]
                }
                return null
            }(t);
            for (let i = 0; i < e.length; i++) {
                const r = e[i];
                if ("*" !== r) {
                    if (null === s ? oi(t, r, !0) : ai(s, r)) return i
                } else n = i
            }
            return n
        }

        function no(t) {
            const e = Te()[16][6];
            if (!e.projection) {
                const n = e.projection = Qn(t ? t.length : 1, null), s = n.slice();
                let i = e.child;
                for (; null !== i;) {
                    const e = t ? eo(i, t) : 0;
                    null !== e && (s[e] ? s[e].projectionNext = i : n[e] = i, s[e] = i), i = i.next
                }
            }
        }

        function so(t, e = 0, n) {
            const s = Te(), i = Ae(), r = wi(i, 20 + t, 16, null, n || null);
            null === r.projection && (r.projection = e), Le(), 64 != (64 & r.flags) && function (t, e, n) {
                Qs(e[11], 0, e, n, js(t, n, e), $s(n.parent || e[6], n, e))
            }(i, s, r)
        }

        function io(t, e, n) {
            return ro(t, "", e, "", n), io
        }

        function ro(t, e, n, s, i) {
            const r = Te(), o = Lr(r, e, n, s);
            return o !== hi && Ni(Ae(), nn(), r, t, o, r[11], i, !1), ro
        }

        function oo(t, e, n, s, i) {
            const r = t[n + 1], o = null === e;
            let a = s ? fi(r) : gi(r), l = !1;
            for (; 0 !== a && (!1 === l || o);) {
                const n = t[a + 1];
                ao(t[a], e) && (l = !0, t[a + 1] = s ? yi(n) : mi(n)), a = s ? fi(n) : gi(n)
            }
            l && (t[n + 1] = s ? mi(r) : yi(r))
        }

        function ao(t, e) {
            return null === t || null == e || (Array.isArray(t) ? t[1] : t) === e || !(!Array.isArray(t) || "string" != typeof e) && Jn(t, e) >= 0
        }

        const lo = {textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0};

        function co(t) {
            return t.substring(lo.key, lo.keyEnd)
        }

        function ho(t, e) {
            const n = lo.textEnd;
            return n === e ? -1 : (e = lo.keyEnd = function (t, e, n) {
                for (; e < n && t.charCodeAt(e) > 32;) e++;
                return e
            }(t, lo.key = e, n), uo(t, e, n))
        }

        function uo(t, e, n) {
            for (; e < n && t.charCodeAt(e) <= 32;) e++;
            return e
        }

        function po(t, e, n) {
            return go(t, e, n, !1), po
        }

        function fo(t, e) {
            return go(t, e, null, !0), fo
        }

        function mo(t, e) {
            for (let n = function (t) {
                return function (t) {
                    lo.key = 0, lo.keyEnd = 0, lo.value = 0, lo.valueEnd = 0, lo.textEnd = t.length
                }(t), ho(t, uo(t, 0, lo.textEnd))
            }(e); n >= 0; n = ho(e, n)) Yn(t, co(e), !0)
        }

        function go(t, e, n, s) {
            const i = Te(), r = Ae(), o = Be(2);
            r.firstUpdatePass && yo(r, t, o, s), e !== hi && Nr(i, o, e) && wo(r, r.data[tn()], i, i[11], t, i[o + 1] = function (t, e) {
                return null == t || ("string" == typeof e ? t += e : "object" == typeof t && (t = et(fs(t)))), t
            }(e, n), s, o)
        }

        function _o(t, e) {
            return e >= t.expandoStartIndex
        }

        function yo(t, e, n, s) {
            const i = t.data;
            if (null === i[n + 1]) {
                const r = i[tn()], o = _o(t, n);
                xo(r, s) && null === e && !o && (e = !1), e = function (t, e, n, s) {
                    const i = function (t) {
                        const e = Oe.lFrame.currentDirectiveIndex;
                        return -1 === e ? null : t[e]
                    }(t);
                    let r = s ? e.residualClasses : e.residualStyles;
                    if (null === i) 0 === (s ? e.classBindings : e.styleBindings) && (n = vo(n = bo(null, t, e, n, s), e.attrs, s), r = null); else {
                        const o = e.directiveStylingLast;
                        if (-1 === o || t[o] !== i) if (n = bo(i, t, e, n, s), null === r) {
                            let n = function (t, e, n) {
                                const s = n ? e.classBindings : e.styleBindings;
                                if (0 !== gi(s)) return t[fi(s)]
                            }(t, e, s);
                            void 0 !== n && Array.isArray(n) && (n = bo(null, t, e, n[1], s), n = vo(n, e.attrs, s), function (t, e, n, s) {
                                t[fi(n ? e.classBindings : e.styleBindings)] = s
                            }(t, e, s, n))
                        } else r = function (t, e, n) {
                            let s = void 0;
                            const i = e.directiveEnd;
                            for (let r = 1 + e.directiveStylingLast; r < i; r++) s = vo(s, t[r].hostAttrs, n);
                            return vo(s, e.attrs, n)
                        }(t, e, s)
                    }
                    return void 0 !== r && (s ? e.residualClasses = r : e.residualStyles = r), n
                }(i, r, e, s), function (t, e, n, s, i, r) {
                    let o = r ? e.classBindings : e.styleBindings, a = fi(o), l = gi(o);
                    t[s] = n;
                    let c, h = !1;
                    if (Array.isArray(n)) {
                        const t = n;
                        c = t[1], (null === c || Jn(t, c) > 0) && (h = !0)
                    } else c = n;
                    if (i) if (0 !== l) {
                        const e = fi(t[a + 1]);
                        t[s + 1] = pi(e, a), 0 !== e && (t[e + 1] = _i(t[e + 1], s)), t[a + 1] = 131071 & t[a + 1] | s << 17
                    } else t[s + 1] = pi(a, 0), 0 !== a && (t[a + 1] = _i(t[a + 1], s)), a = s; else t[s + 1] = pi(l, 0), 0 === a ? a = s : t[l + 1] = _i(t[l + 1], s), l = s;
                    h && (t[s + 1] = mi(t[s + 1])), oo(t, c, s, !0), oo(t, c, s, !1), function (t, e, n, s, i) {
                        const r = i ? t.residualClasses : t.residualStyles;
                        null != r && "string" == typeof e && Jn(r, e) >= 0 && (n[s + 1] = yi(n[s + 1]))
                    }(e, c, t, s, r), o = pi(a, l), r ? e.classBindings = o : e.styleBindings = o
                }(i, r, e, n, o, s)
            }
        }

        function bo(t, e, n, s, i) {
            let r = null;
            const o = n.directiveEnd;
            let a = n.directiveStylingLast;
            for (-1 === a ? a = n.directiveStart : a++; a < o && (r = e[a], s = vo(s, r.hostAttrs, i), r !== t);) a++;
            return null !== t && (n.directiveStylingLast = a), s
        }

        function vo(t, e, n) {
            const s = n ? 1 : 2;
            let i = -1;
            if (null !== e) for (let r = 0; r < e.length; r++) {
                const o = e[r];
                "number" == typeof o ? i = o : i === s && (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]), Yn(t, o, !!n || e[++r]))
            }
            return void 0 === t ? null : t
        }

        function wo(t, e, n, s, i, r, o, a) {
            if (!(3 & e.type)) return;
            const l = t.data, c = l[a + 1];
            So(1 == (1 & c) ? Co(l, e, n, i, gi(c), o) : void 0) || (So(r) || function (t) {
                return 2 == (2 & t)
            }(c) && (r = Co(l, null, n, i, a, o)), function (t, e, n, s, i) {
                const r = pe(t);
                if (e) i ? r ? t.addClass(n, s) : n.classList.add(s) : r ? t.removeClass(n, s) : n.classList.remove(s); else {
                    let e = -1 === s.indexOf("-") ? void 0 : Os.DashCase;
                    if (null == i) r ? t.removeStyle(n, s, e) : n.style.removeProperty(s); else {
                        const o = "string" == typeof i && i.endsWith("!important");
                        o && (i = i.slice(0, -10), e |= Os.Important), r ? t.setStyle(n, s, i, e) : n.style.setProperty(s, i, o ? "important" : "")
                    }
                }
            }(s, o, ge(tn(), n), i, r))
        }

        function Co(t, e, n, s, i, r) {
            const o = null === e;
            let a = void 0;
            for (; i > 0;) {
                const e = t[i], r = Array.isArray(e), l = r ? e[1] : e, c = null === l;
                let h = n[i + 1];
                h === hi && (h = c ? Pt : void 0);
                let u = c ? Xn(h, s) : l === s ? h : void 0;
                if (r && !So(u) && (u = Xn(e, s)), So(u) && (a = u, o)) return a;
                const d = t[i + 1];
                i = o ? fi(d) : gi(d)
            }
            if (null !== e) {
                let t = r ? e.residualClasses : e.residualStyles;
                null != t && (a = Xn(t, s))
            }
            return a
        }

        function So(t) {
            return void 0 !== t
        }

        function xo(t, e) {
            return 0 != (t.flags & (e ? 16 : 32))
        }

        function ko(t, e = "") {
            const n = Te(), s = Ae(), i = t + 20, r = s.firstCreatePass ? wi(s, i, 1, e, null) : s.data[i],
                o = n[i] = function (t, e) {
                    return pe(t) ? t.createText(e) : t.createTextNode(e)
                }(n[11], e);
            Ws(s, n, o, r), Ne(r, !1)
        }

        function Eo(t) {
            return Oo("", t, ""), Eo
        }

        function Oo(t, e, n) {
            const s = Te(), i = Lr(s, t, e, n);
            return i !== hi && function (t, e, n) {
                const s = ge(e, t);
                !function (t, e, n) {
                    pe(t) ? t.setValue(e, n) : e.textContent = n
                }(t[11], s, n)
            }(s, tn(), i), Oo
        }

        function Ro(t, e, n) {
            const s = Te();
            return Nr(s, ze(), e) && Ni(Ae(), nn(), s, t, e, s[11], n, !0), Ro
        }

        const To = void 0;
        var Ao = ["en", [["a", "p"], ["AM", "PM"], To], [["AM", "PM"], To, To], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], To, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], To, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", To, "{1} 'at' {0}", To], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", function (t) {
            let e = Math.floor(Math.abs(t)), n = t.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === e && 0 === n ? 1 : 5
        }];
        let Do = {};

        function Io(t) {
            return t in Do || (Do[t] = Dt.ng && Dt.ng.common && Dt.ng.common.locales && Dt.ng.common.locales[t]), Do[t]
        }

        var Po = function (t) {
            return t[t.LocaleId = 0] = "LocaleId", t[t.DayPeriodsFormat = 1] = "DayPeriodsFormat", t[t.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", t[t.DaysFormat = 3] = "DaysFormat", t[t.DaysStandalone = 4] = "DaysStandalone", t[t.MonthsFormat = 5] = "MonthsFormat", t[t.MonthsStandalone = 6] = "MonthsStandalone", t[t.Eras = 7] = "Eras", t[t.FirstDayOfWeek = 8] = "FirstDayOfWeek", t[t.WeekendRange = 9] = "WeekendRange", t[t.DateFormat = 10] = "DateFormat", t[t.TimeFormat = 11] = "TimeFormat", t[t.DateTimeFormat = 12] = "DateTimeFormat", t[t.NumberSymbols = 13] = "NumberSymbols", t[t.NumberFormats = 14] = "NumberFormats", t[t.CurrencyCode = 15] = "CurrencyCode", t[t.CurrencySymbol = 16] = "CurrencySymbol", t[t.CurrencyName = 17] = "CurrencyName", t[t.Currencies = 18] = "Currencies", t[t.Directionality = 19] = "Directionality", t[t.PluralCase = 20] = "PluralCase", t[t.ExtraData = 21] = "ExtraData", t
        }({});
        let No = "en-US";

        function Fo(t) {
            var e, n;
            n = "Expected localeId to be defined", null == (e = t) && function (t, e, n, s) {
                throw new Error("ASSERTION ERROR: " + t + ` [Expected=> null != ${e} <=Actual]`)
            }(n, e), "string" == typeof t && (No = t.toLowerCase().replace(/_/g, "-"))
        }

        function Lo(t, e, n, s, i) {
            if (t = rt(t), Array.isArray(t)) for (let r = 0; r < t.length; r++) Lo(t[r], e, n, s, i); else {
                const r = Ae(), o = Te();
                let a = br(t) ? t : rt(t.provide), l = gr(t);
                const c = Ie(), h = 1048575 & c.providerIndexes, u = c.directiveStart, d = c.providerIndexes >> 20;
                if (br(t) || !t.multi) {
                    const s = new dn(l, i, Vr), p = jo(a, e, i ? h : h + d, u);
                    -1 === p ? (Rn(xn(c, o), r, a), Mo(r, t, e.length), e.push(a), c.directiveStart++, c.directiveEnd++, i && (c.providerIndexes += 1048576), n.push(s), o.push(s)) : (n[p] = s, o[p] = s)
                } else {
                    const p = jo(a, e, h + d, u), f = jo(a, e, h, h + d), m = p >= 0 && n[p], g = f >= 0 && n[f];
                    if (i && !g || !i && !m) {
                        Rn(xn(c, o), r, a);
                        const h = function (t, e, n, s, i) {
                            const r = new dn(t, n, Vr);
                            return r.multi = [], r.index = e, r.componentProviders = 0, Vo(r, i, s && !n), r
                        }(i ? Bo : zo, n.length, i, s, l);
                        !i && g && (n[f].providerFactory = h), Mo(r, t, e.length, 0), e.push(a), c.directiveStart++, c.directiveEnd++, i && (c.providerIndexes += 1048576), n.push(h), o.push(h)
                    } else Mo(r, t, p > -1 ? p : f, Vo(n[i ? f : p], l, !i && s));
                    !i && s && g && n[f].componentProviders++
                }
            }
        }

        function Mo(t, e, n, s) {
            const i = br(e);
            if (i || e.useClass) {
                const r = (e.useClass || e).prototype.ngOnDestroy;
                if (r) {
                    const o = t.destroyHooks || (t.destroyHooks = []);
                    if (!i && e.multi) {
                        const t = o.indexOf(n);
                        -1 === t ? o.push(n, [s, r]) : o[t + 1].push(s, r)
                    } else o.push(n, r)
                }
            }
        }

        function Vo(t, e, n) {
            return n && t.componentProviders++, t.multi.push(e) - 1
        }

        function jo(t, e, n, s) {
            for (let i = n; i < s; i++) if (e[i] === t) return i;
            return -1
        }

        function zo(t, e, n, s) {
            return Ho(this.multi, [])
        }

        function Bo(t, e, n, s) {
            const i = this.multi;
            let r;
            if (this.providerFactory) {
                const t = this.providerFactory.componentProviders, e = Ln(n, n[1], this.providerFactory.index, s);
                r = e.slice(0, t), Ho(i, r);
                for (let n = t; n < e.length; n++) r.push(e[n])
            } else r = [], Ho(i, r);
            return r
        }

        function Ho(t, e) {
            for (let n = 0; n < t.length; n++) e.push((0, t[n])());
            return e
        }

        function Uo(t, e = []) {
            return n => {
                n.providersResolver = (n, s) => function (t, e, n) {
                    const s = Ae();
                    if (s.firstCreatePass) {
                        const i = ie(t);
                        Lo(n, s.data, s.blueprint, i, !0), Lo(e, s.data, s.blueprint, i, !1)
                    }
                }(n, s ? s(t) : t, e)
            }
        }

        class $o {
        }

        class qo {
            resolveComponentFactory(t) {
                throw function (t) {
                    const e = Error(`No component factory found for ${et(t)}. Did you add it to @NgModule.entryComponents?`);
                    return e.ngComponent = t, e
                }(t)
            }
        }

        let Wo = (() => {
            class t {
            }

            return t.NULL = new qo, t
        })();

        function Go(...t) {
        }

        function Ko(t, e) {
            return new Qo(_e(t, e))
        }

        const Zo = function () {
            return Ko(Ie(), Te())
        };
        let Qo = (() => {
            class t {
                constructor(t) {
                    this.nativeElement = t
                }
            }

            return t.__NG_ELEMENT_ID__ = Zo, t
        })();

        function Yo(t) {
            return t instanceof Qo ? t.nativeElement : t
        }

        class Xo {
        }

        let Jo = (() => {
            class t {
            }

            return t.__NG_ELEMENT_ID__ = () => ta(), t
        })();
        const ta = function () {
            const t = Te(), e = ve(Ie().index, t);
            return function (t) {
                return t[11]
            }(Jt(e) ? e : t)
        };
        let ea = (() => {
            class t {
            }

            return t.\u0275prov = ut({token: t, providedIn: "root", factory: () => null}), t
        })();

        class na {
            constructor(t) {
                this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".")
            }
        }

        const sa = new na("11.2.6");

        class ia {
            constructor() {
            }

            supports(t) {
                return Dr(t)
            }

            create(t) {
                return new oa(t)
            }
        }

        const ra = (t, e) => e;

        class oa {
            constructor(t) {
                this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || ra
            }

            forEachItem(t) {
                let e;
                for (e = this._itHead; null !== e; e = e._next) t(e)
            }

            forEachOperation(t) {
                let e = this._itHead, n = this._removalsHead, s = 0, i = null;
                for (; e || n;) {
                    const r = !n || e && e.currentIndex < ha(n, s, i) ? e : n, o = ha(r, s, i), a = r.currentIndex;
                    if (r === n) s--, n = n._nextRemoved; else if (e = e._next, null == r.previousIndex) s++; else {
                        i || (i = []);
                        const t = o - s, e = a - s;
                        if (t != e) {
                            for (let n = 0; n < t; n++) {
                                const s = n < i.length ? i[n] : i[n] = 0, r = s + n;
                                e <= r && r < t && (i[n] = s + 1)
                            }
                            i[r.previousIndex] = e - t
                        }
                    }
                    o !== a && t(r, o, a)
                }
            }

            forEachPreviousItem(t) {
                let e;
                for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e)
            }

            forEachAddedItem(t) {
                let e;
                for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
            }

            forEachMovedItem(t) {
                let e;
                for (e = this._movesHead; null !== e; e = e._nextMoved) t(e)
            }

            forEachRemovedItem(t) {
                let e;
                for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
            }

            forEachIdentityChange(t) {
                let e;
                for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e)
            }

            diff(t) {
                if (null == t && (t = []), !Dr(t)) throw new Error(`Error trying to diff '${et(t)}'. Only arrays and iterables are allowed`);
                return this.check(t) ? this : null
            }

            onDestroy() {
            }

            check(t) {
                this._reset();
                let e, n, s, i = this._itHead, r = !1;
                if (Array.isArray(t)) {
                    this.length = t.length;
                    for (let e = 0; e < this.length; e++) n = t[e], s = this._trackByFn(e, n), null !== i && Object.is(i.trackById, s) ? (r && (i = this._verifyReinsertion(i, n, s, e)), Object.is(i.item, n) || this._addIdentityChange(i, n)) : (i = this._mismatch(i, n, s, e), r = !0), i = i._next
                } else e = 0, function (t, e) {
                    if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n]); else {
                        const n = t[Tr()]();
                        let s;
                        for (; !(s = n.next()).done;) e(s.value)
                    }
                }(t, t => {
                    s = this._trackByFn(e, t), null !== i && Object.is(i.trackById, s) ? (r && (i = this._verifyReinsertion(i, t, s, e)), Object.is(i.item, t) || this._addIdentityChange(i, t)) : (i = this._mismatch(i, t, s, e), r = !0), i = i._next, e++
                }), this.length = e;
                return this._truncate(i), this.collection = t, this.isDirty
            }

            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }

            _reset() {
                if (this.isDirty) {
                    let t;
                    for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
                    for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved) t.previousIndex = t.currentIndex;
                    this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                }
            }

            _mismatch(t, e, n, s) {
                let i;
                return null === t ? i = this._itTail : (i = t._prev, this._remove(t)), null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, i, s)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, s)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, i, s)) : t = this._addAfter(new aa(e, n), i, s), t
            }

            _verifyReinsertion(t, e, n, s) {
                let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                return null !== i ? t = this._reinsertAfter(i, t._prev, s) : t.currentIndex != s && (t.currentIndex = s, this._addToMoves(t, s)), t
            }

            _truncate(t) {
                for (; null !== t;) {
                    const e = t._next;
                    this._addToRemovals(this._unlink(t)), t = e
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }

            _reinsertAfter(t, e, n) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                const s = t._prevRemoved, i = t._nextRemoved;
                return null === s ? this._removalsHead = i : s._nextRemoved = i, null === i ? this._removalsTail = s : i._prevRemoved = s, this._insertAfter(t, e, n), this._addToMoves(t, n), t
            }

            _moveAfter(t, e, n) {
                return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t
            }

            _addAfter(t, e, n) {
                return this._insertAfter(t, e, n), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t
            }

            _insertAfter(t, e, n) {
                const s = null === e ? this._itHead : e._next;
                return t._next = s, t._prev = e, null === s ? this._itTail = t : s._prev = t, null === e ? this._itHead = t : e._next = t, null === this._linkedRecords && (this._linkedRecords = new ca), this._linkedRecords.put(t), t.currentIndex = n, t
            }

            _remove(t) {
                return this._addToRemovals(this._unlink(t))
            }

            _unlink(t) {
                null !== this._linkedRecords && this._linkedRecords.remove(t);
                const e = t._prev, n = t._next;
                return null === e ? this._itHead = n : e._next = n, null === n ? this._itTail = e : n._prev = e, t
            }

            _addToMoves(t, e) {
                return t.previousIndex === e || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t
            }

            _addToRemovals(t) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new ca), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
            }

            _addIdentityChange(t, e) {
                return t.item = e, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t
            }
        }

        class aa {
            constructor(t, e) {
                this.item = t, this.trackById = e, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
            }
        }

        class la {
            constructor() {
                this._head = null, this._tail = null
            }

            add(t) {
                null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
            }

            get(t, e) {
                let n;
                for (n = this._head; null !== n; n = n._nextDup) if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
                return null
            }

            remove(t) {
                const e = t._prevDup, n = t._nextDup;
                return null === e ? this._head = n : e._nextDup = n, null === n ? this._tail = e : n._prevDup = e, null === this._head
            }
        }

        class ca {
            constructor() {
                this.map = new Map
            }

            put(t) {
                const e = t.trackById;
                let n = this.map.get(e);
                n || (n = new la, this.map.set(e, n)), n.add(t)
            }

            get(t, e) {
                const n = this.map.get(t);
                return n ? n.get(t, e) : null
            }

            remove(t) {
                const e = t.trackById;
                return this.map.get(e).remove(t) && this.map.delete(e), t
            }

            get isEmpty() {
                return 0 === this.map.size
            }

            clear() {
                this.map.clear()
            }
        }

        function ha(t, e, n) {
            const s = t.previousIndex;
            if (null === s) return s;
            let i = 0;
            return n && s < n.length && (i = n[s]), s + e + i
        }

        class ua {
            constructor() {
            }

            supports(t) {
                return t instanceof Map || Ir(t)
            }

            create() {
                return new da
            }
        }

        class da {
            constructor() {
                this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
            }

            get isDirty() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
            }

            forEachItem(t) {
                let e;
                for (e = this._mapHead; null !== e; e = e._next) t(e)
            }

            forEachPreviousItem(t) {
                let e;
                for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e)
            }

            forEachChangedItem(t) {
                let e;
                for (e = this._changesHead; null !== e; e = e._nextChanged) t(e)
            }

            forEachAddedItem(t) {
                let e;
                for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
            }

            forEachRemovedItem(t) {
                let e;
                for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
            }

            diff(t) {
                if (t) {
                    if (!(t instanceof Map || Ir(t))) throw new Error(`Error trying to diff '${et(t)}'. Only maps and objects are allowed`)
                } else t = new Map;
                return this.check(t) ? this : null
            }

            onDestroy() {
            }

            check(t) {
                this._reset();
                let e = this._mapHead;
                if (this._appendAfter = null, this._forEach(t, (t, n) => {
                    if (e && e.key === n) this._maybeAddToChanges(e, t), this._appendAfter = e, e = e._next; else {
                        const s = this._getOrCreateRecordForKey(n, t);
                        e = this._insertBeforeOrAppend(e, s)
                    }
                }), e) {
                    e._prev && (e._prev._next = null), this._removalsHead = e;
                    for (let t = e; null !== t; t = t._nextRemoved) t === this._mapHead && (this._mapHead = null), this._records.delete(t.key), t._nextRemoved = t._next, t.previousValue = t.currentValue, t.currentValue = null, t._prev = null, t._next = null
                }
                return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
            }

            _insertBeforeOrAppend(t, e) {
                if (t) {
                    const n = t._prev;
                    return e._next = t, e._prev = n, t._prev = e, n && (n._next = e), t === this._mapHead && (this._mapHead = e), this._appendAfter = t, t
                }
                return this._appendAfter ? (this._appendAfter._next = e, e._prev = this._appendAfter) : this._mapHead = e, this._appendAfter = e, null
            }

            _getOrCreateRecordForKey(t, e) {
                if (this._records.has(t)) {
                    const n = this._records.get(t);
                    this._maybeAddToChanges(n, e);
                    const s = n._prev, i = n._next;
                    return s && (s._next = i), i && (i._prev = s), n._next = null, n._prev = null, n
                }
                const n = new pa(t);
                return this._records.set(t, n), n.currentValue = e, this._addToAdditions(n), n
            }

            _reset() {
                if (this.isDirty) {
                    let t;
                    for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next) t._nextPrevious = t._next;
                    for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
                    for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
                    this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                }
            }

            _maybeAddToChanges(t, e) {
                Object.is(e, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = e, this._addToChanges(t))
            }

            _addToAdditions(t) {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
            }

            _addToChanges(t) {
                null === this._changesHead ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
            }

            _forEach(t, e) {
                t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(n => e(t[n], n))
            }
        }

        class pa {
            constructor(t) {
                this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
            }
        }

        function fa() {
            return new ma([new ia])
        }

        let ma = (() => {
            class t {
                constructor(t) {
                    this.factories = t
                }

                static create(e, n) {
                    if (null != n) {
                        const t = n.factories.slice();
                        e = e.concat(t)
                    }
                    return new t(e)
                }

                static extend(e) {
                    return {provide: t, useFactory: n => t.create(e, n || fa()), deps: [[t, new ds, new us]]}
                }

                find(t) {
                    const e = this.factories.find(e => e.supports(t));
                    if (null != e) return e;
                    throw new Error(`Cannot find a differ supporting object '${t}' of type '${n = t, n.name || typeof n}'`);
                    var n
                }
            }

            return t.\u0275prov = ut({token: t, providedIn: "root", factory: fa}), t
        })();

        function ga() {
            return new _a([new ua])
        }

        let _a = (() => {
            class t {
                constructor(t) {
                    this.factories = t
                }

                static create(e, n) {
                    if (n) {
                        const t = n.factories.slice();
                        e = e.concat(t)
                    }
                    return new t(e)
                }

                static extend(e) {
                    return {provide: t, useFactory: n => t.create(e, n || ga()), deps: [[t, new ds, new us]]}
                }

                find(t) {
                    const e = this.factories.find(e => e.supports(t));
                    if (e) return e;
                    throw new Error(`Cannot find a differ supporting object '${t}'`)
                }
            }

            return t.\u0275prov = ut({token: t, providedIn: "root", factory: ga}), t
        })();

        class ya {
            constructor(t, e) {
                this._lView = t, this._cdRefInjectingView = e, this._appRef = null, this._attachedToViewContainer = !1
            }

            get rootNodes() {
                const t = this._lView, e = t[1];
                return function t(e, n, s, i, r = !1) {
                    for (; null !== s;) {
                        const o = n[s.index];
                        if (null !== o && i.push(me(o)), te(o)) for (let e = 10; e < o.length; e++) {
                            const n = o[e], s = n[1].firstChild;
                            null !== s && t(n[1], n, s, i)
                        }
                        const a = s.type;
                        if (8 & a) t(e, n, s.child, i); else if (32 & a) {
                            const t = Rs(s, n);
                            let e;
                            for (; e = t();) i.push(e)
                        } else if (16 & a) {
                            const e = Gs(n, s);
                            if (Array.isArray(e)) i.push(...e); else {
                                const s = Ts(n[16]);
                                t(s[1], s, e, i, !0)
                            }
                        }
                        s = r ? s.projectionNext : s.next
                    }
                    return i
                }(e, t, e.firstChild, [])
            }

            get context() {
                return this._lView[8]
            }

            get destroyed() {
                return 256 == (256 & this._lView[2])
            }

            destroy() {
                if (this._appRef) this._appRef.detachView(this); else if (this._attachedToViewContainer) {
                    const t = this._lView[3];
                    if (te(t)) {
                        const e = t[8], n = e ? e.indexOf(this) : -1;
                        n > -1 && (Ls(t, n), Zn(e, n))
                    }
                    this._attachedToViewContainer = !1
                }
                Ms(this._lView[1], this._lView)
            }

            onDestroy(t) {
                Ii(this._lView[1], this._lView, null, t)
            }

            markForCheck() {
                Zi(this._cdRefInjectingView || this._lView)
            }

            detach() {
                this._lView[2] &= -129
            }

            reattach() {
                this._lView[2] |= 128
            }

            detectChanges() {
                Qi(this._lView[1], this._lView, this.context)
            }

            checkNoChanges() {
                !function (t, e, n) {
                    Ve(!0);
                    try {
                        Qi(t, e, n)
                    } finally {
                        Ve(!1)
                    }
                }(this._lView[1], this._lView, this.context)
            }

            attachToViewContainerRef() {
                if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                this._attachedToViewContainer = !0
            }

            detachFromAppRef() {
                var t;
                this._appRef = null, Zs(this._lView[1], t = this._lView, t[11], 2, null, null)
            }

            attachToAppRef(t) {
                if (this._attachedToViewContainer) throw new Error("This view is already attached to a ViewContainer!");
                this._appRef = t
            }
        }

        class ba extends ya {
            constructor(t) {
                super(t), this._view = t
            }

            detectChanges() {
                Yi(this._view)
            }

            checkNoChanges() {
                !function (t) {
                    Ve(!0);
                    try {
                        Yi(t)
                    } finally {
                        Ve(!1)
                    }
                }(this._view)
            }

            get context() {
                return null
            }
        }

        const va = Ca;
        let wa = (() => {
            class t {
            }

            return t.__NG_ELEMENT_ID__ = va, t.__ChangeDetectorRef__ = !0, t
        })();

        function Ca(t = !1) {
            return function (t, e, n) {
                if (!n && ne(t)) {
                    const n = ve(t.index, e);
                    return new ya(n, n)
                }
                return 47 & t.type ? new ya(e[16], e) : null
            }(Ie(), Te(), t)
        }

        const Sa = [new ua], xa = new ma([new ia]), ka = new _a(Sa), Ea = function () {
            return Aa(Ie(), Te())
        };
        let Oa = (() => {
            class t {
            }

            return t.__NG_ELEMENT_ID__ = Ea, t
        })();
        const Ra = Oa, Ta = class extends Ra {
            constructor(t, e, n) {
                super(), this._declarationLView = t, this._declarationTContainer = e, this.elementRef = n
            }

            createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                    n = vi(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null);
                n[17] = this._declarationLView[this._declarationTContainer.index];
                const s = this._declarationLView[19];
                return null !== s && (n[19] = s.createEmbeddedView(e)), Si(e, n, t), new ya(n)
            }
        };

        function Aa(t, e) {
            return 4 & t.type ? new Ta(e, t, Ko(t, e)) : null
        }

        class Da {
        }

        class Ia {
        }

        const Pa = function () {
            return ja(Ie(), Te())
        };
        let Na = (() => {
            class t {
            }

            return t.__NG_ELEMENT_ID__ = Pa, t
        })();
        const Fa = Na, La = class extends Fa {
            constructor(t, e, n) {
                super(), this._lContainer = t, this._hostTNode = e, this._hostLView = n
            }

            get element() {
                return Ko(this._hostTNode, this._hostLView)
            }

            get injector() {
                return new jn(this._hostTNode, this._hostLView)
            }

            get parentInjector() {
                const t = On(this._hostTNode, this._hostLView);
                if (yn(t)) {
                    const e = vn(t, this._hostLView), n = bn(t);
                    return new jn(e[1].data[n + 8], e)
                }
                return new jn(null, this._hostLView)
            }

            clear() {
                for (; this.length > 0;) this.remove(this.length - 1)
            }

            get(t) {
                const e = Ma(this._lContainer);
                return null !== e && e[t] || null
            }

            get length() {
                return this._lContainer.length - 10
            }

            createEmbeddedView(t, e, n) {
                const s = t.createEmbeddedView(e || {});
                return this.insert(s, n), s
            }

            createComponent(t, e, n, s, i) {
                const r = n || this.parentInjector;
                if (!i && null == t.ngModule && r) {
                    const t = r.get(Da, null);
                    t && (i = t)
                }
                const o = t.create(r, s, void 0, i);
                return this.insert(o.hostView, e), o
            }

            insert(t, e) {
                const n = t._lView, s = n[1];
                if (te(n[3])) {
                    const e = this.indexOf(t);
                    if (-1 !== e) this.detach(e); else {
                        const e = n[3], s = new La(e, e[6], e[3]);
                        s.detach(s.indexOf(t))
                    }
                }
                const i = this._adjustIndex(e), r = this._lContainer;
                !function (t, e, n, s) {
                    const i = 10 + s, r = n.length;
                    s > 0 && (n[i - 1][4] = e), s < r - 10 ? (e[4] = n[i], Kn(n, 10 + s, e)) : (n.push(e), e[4] = null), e[3] = n;
                    const o = e[17];
                    null !== o && n !== o && function (t, e) {
                        const n = t[9];
                        e[16] !== e[3][3][16] && (t[2] = !0), null === n ? t[9] = [e] : n.push(e)
                    }(o, e);
                    const a = e[19];
                    null !== a && a.insertView(t), e[2] |= 128
                }(s, n, r, i);
                const o = function t(e, n) {
                    const s = 10 + e + 1;
                    if (s < n.length) {
                        const e = n[s], i = e[1].firstChild;
                        if (null !== i) return function e(n, s) {
                            if (null !== s) {
                                const i = s.type;
                                if (3 & i) return _e(s, n);
                                if (4 & i) return t(-1, n[s.index]);
                                if (8 & i) {
                                    const i = s.child;
                                    if (null !== i) return e(n, i);
                                    {
                                        const e = n[s.index];
                                        return te(e) ? t(-1, e) : me(e)
                                    }
                                }
                                if (32 & i) return Rs(s, n)() || me(n[s.index]);
                                {
                                    const t = Gs(n, s);
                                    return null !== t ? Array.isArray(t) ? t[0] : e(Ts(n[16]), t) : e(n, s.next)
                                }
                            }
                            return null
                        }(e, i)
                    }
                    return n[7]
                }(i, r), a = n[11], l = Us(a, r[7]);
                return null !== l && function (t, e, n, s, i, r) {
                    s[0] = i, s[6] = e, Zs(t, s, n, 1, i, r)
                }(s, r[6], a, n, l, o), t.attachToViewContainerRef(), Kn(Va(r), i, t), t
            }

            move(t, e) {
                return this.insert(t, e)
            }

            indexOf(t) {
                const e = Ma(this._lContainer);
                return null !== e ? e.indexOf(t) : -1
            }

            remove(t) {
                const e = this._adjustIndex(t, -1), n = Ls(this._lContainer, e);
                n && (Zn(Va(this._lContainer), e), Ms(n[1], n))
            }

            detach(t) {
                const e = this._adjustIndex(t, -1), n = Ls(this._lContainer, e);
                return n && null != Zn(Va(this._lContainer), e) ? new ya(n) : null
            }

            _adjustIndex(t, e = 0) {
                return null == t ? this.length + e : t
            }
        };

        function Ma(t) {
            return t[8]
        }

        function Va(t) {
            return t[8] || (t[8] = [])
        }

        function ja(t, e) {
            let n;
            const s = e[t.index];
            if (te(s)) n = s; else {
                let i;
                if (8 & t.type) i = me(s); else {
                    const n = e[11];
                    i = n.createComment("");
                    const s = _e(t, e);
                    zs(n, Us(n, s), i, function (t, e) {
                        return pe(t) ? t.nextSibling(e) : e.nextSibling
                    }(n, s), !1)
                }
                e[t.index] = n = qi(s, e, i, t), Ki(e, n)
            }
            return new La(n, t, e)
        }

        const za = {};

        class Ba extends Wo {
            constructor(t) {
                super(), this.ngModule = t
            }

            resolveComponentFactory(t) {
                const e = Yt(t);
                return new $a(e, this.ngModule)
            }
        }

        function Ha(t) {
            const e = [];
            for (let n in t) t.hasOwnProperty(n) && e.push({propName: t[n], templateName: n});
            return e
        }

        const Ua = new $n("SCHEDULER_TOKEN", {providedIn: "root", factory: () => xs});

        class $a extends $o {
            constructor(t, e) {
                super(), this.componentDef = t, this.ngModule = e, this.componentType = t.type, this.selector = t.selectors.map(ci).join(","), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!e
            }

            get inputs() {
                return Ha(this.componentDef.inputs)
            }

            get outputs() {
                return Ha(this.componentDef.outputs)
            }

            create(t, e, n, s) {
                const i = (s = s || this.ngModule) ? function (t, e) {
                        return {
                            get: (n, s, i) => {
                                const r = t.get(n, za, i);
                                return r !== za || s === za ? r : e.get(n, s, i)
                            }
                        }
                    }(t, s.injector) : t, r = i.get(Xo, fe), o = i.get(ea, null),
                    a = r.createRenderer(null, this.componentDef), l = this.componentDef.selectors[0][0] || "div",
                    c = n ? function (t, e, n) {
                        if (pe(t)) return t.selectRootElement(e, n === Et.ShadowDom);
                        let s = "string" == typeof e ? t.querySelector(e) : e;
                        return s.textContent = "", s
                    }(a, n, this.componentDef.encapsulation) : Ns(r.createRenderer(null, this.componentDef), l, function (t) {
                        const e = t.toLowerCase();
                        return "svg" === e ? "http://www.w3.org/2000/svg" : "math" === e ? "http://www.w3.org/1998/MathML/" : null
                    }(l)), h = this.componentDef.onPush ? 576 : 528,
                    u = {components: [], scheduler: xs, clean: Ji, playerHandler: null, flags: 0},
                    d = Di(0, null, null, 1, 0, null, null, null, null, null),
                    p = vi(null, d, u, h, null, null, r, a, o, i);
                let f, m;
                Ke(p);
                try {
                    const t = function (t, e, n, s, i, r) {
                        const o = n[1];
                        n[20] = t;
                        const a = wi(o, 20, 2, "#host", null), l = a.mergedAttrs = e.hostAttrs;
                        null !== l && (ir(a, l, !0), null !== t && (pn(i, t, l), null !== a.classes && Xs(i, t, a.classes), null !== a.styles && Ys(i, t, a.styles)));
                        const c = s.createRenderer(t, e),
                            h = vi(n, Ai(e), null, e.onPush ? 64 : 16, n[20], a, s, c, null, null);
                        return o.firstCreatePass && (Rn(xn(a, n), o, e.type), Vi(o, a), zi(a, n.length, 1)), Ki(n, h), n[20] = h
                    }(c, this.componentDef, p, r, a);
                    if (c) if (n) pn(a, c, ["ng-version", sa.full]); else {
                        const {attrs: t, classes: e} = function (t) {
                            const e = [], n = [];
                            let s = 1, i = 2;
                            for (; s < t.length;) {
                                let r = t[s];
                                if ("string" == typeof r) 2 === i ? "" !== r && e.push(r, t[++s]) : 8 === i && n.push(r); else {
                                    if (!ii(i)) break;
                                    i = r
                                }
                                s++
                            }
                            return {attrs: e, classes: n}
                        }(this.componentDef.selectors[0]);
                        t && pn(a, c, t), e && e.length > 0 && Xs(a, c, e.join(" "))
                    }
                    if (m = ye(d, 20), void 0 !== e) {
                        const t = m.projection = [];
                        for (let n = 0; n < this.ngContentSelectors.length; n++) {
                            const s = e[n];
                            t.push(null != s ? Array.from(s) : null)
                        }
                    }
                    f = function (t, e, n, s, i) {
                        const r = n[1], o = function (t, e, n) {
                            const s = Ie();
                            t.firstCreatePass && (n.providersResolver && n.providersResolver(n), Bi(t, s, e, Ci(t, e, 1, null), n));
                            const i = Ln(e, t, s.directiveStart, s);
                            Ss(i, e);
                            const r = _e(s, e);
                            return r && Ss(r, e), i
                        }(r, n, e);
                        if (s.components.push(o), t[8] = o, i && i.forEach(t => t(o, e)), e.contentQueries) {
                            const t = Ie();
                            e.contentQueries(1, o, t.directiveStart)
                        }
                        const a = Ie();
                        return !r.firstCreatePass || null === e.hostBindings && null === e.hostAttrs || (en(a.index), Li(n[1], a, 0, a.directiveStart, a.directiveEnd, e), Mi(e, o)), o
                    }(t, this.componentDef, p, u, [Cr]), Si(d, p, null)
                } finally {
                    Je()
                }
                return new qa(this.componentType, f, Ko(m, p), p, m)
            }
        }

        class qa extends class {
        } {
            constructor(t, e, n, s, i) {
                super(), this.location = n, this._rootLView = s, this._tNode = i, this.instance = e, this.hostView = this.changeDetectorRef = new ba(s), this.componentType = t
            }

            get injector() {
                return new jn(this._tNode, this._rootLView)
            }

            destroy() {
                this.hostView.destroy()
            }

            onDestroy(t) {
                this.hostView.onDestroy(t)
            }
        }

        const Wa = new Map;

        class Ga extends Da {
            constructor(t, e) {
                super(), this._parent = e, this._bootstrapComponents = [], this.injector = this, this.destroyCbs = [], this.componentFactoryResolver = new Ba(this);
                const n = Xt(t), s = t[jt] || null;
                s && Fo(s), this._bootstrapComponents = Es(n.bootstrap), this._r3Injector = pr(t, e, [{
                    provide: Da,
                    useValue: this
                }, {
                    provide: Wo,
                    useValue: this.componentFactoryResolver
                }], et(t)), this._r3Injector._resolveInjectorDefTypes(), this.instance = this.get(t)
            }

            get(t, e = wr.THROW_IF_NOT_FOUND, n = vt.Default) {
                return t === wr || t === Da || t === rr ? this : this._r3Injector.get(t, e, n)
            }

            destroy() {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
            }

            onDestroy(t) {
                this.destroyCbs.push(t)
            }
        }

        class Ka extends Ia {
            constructor(t) {
                super(), this.moduleType = t, null !== Xt(t) && function (t) {
                    const e = new Set;
                    !function t(n) {
                        const s = Xt(n, !0), i = s.id;
                        null !== i && (function (t, e, n) {
                            if (e && e !== n) throw new Error(`Duplicate module registered for ${t} - ${et(e)} vs ${et(e.name)}`)
                        }(i, Wa.get(i), n), Wa.set(i, n));
                        const r = Es(s.imports);
                        for (const o of r) e.has(o) || (e.add(o), t(o))
                    }(t)
                }(t)
            }

            create(t) {
                return new Ga(this.moduleType, t)
            }
        }

        function Za(t, e) {
            const n = t[e];
            return n === hi ? void 0 : n
        }

        function Qa(t, e) {
            const n = Ae();
            let s;
            const i = t + 20;
            n.firstCreatePass ? (s = function (t, e) {
                if (e) for (let n = e.length - 1; n >= 0; n--) {
                    const s = e[n];
                    if (t === s.name) return s
                }
                throw new at("302", `The pipe '${t}' could not be found!`)
            }(e, n.pipeRegistry), n.data[i] = s, s.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(i, s.onDestroy)) : s = n.data[i];
            const r = s.factory || (s.factory = re(s.type)), o = Ct(Vr);
            try {
                const t = Cn(!1), e = r();
                return Cn(t), function (t, e, n, s) {
                    n >= t.data.length && (t.data[n] = null, t.blueprint[n] = null), e[n] = s
                }(n, Te(), i, e), e
            } finally {
                Ct(o)
            }
        }

        function Ya(t, e, n) {
            const s = t + 20, i = Te(), r = be(i, s);
            return tl(i, Ja(i, s) ? function (t, e, n, s, i, r) {
                const o = e + n;
                return Nr(t, o, i) ? Pr(t, o + 1, r ? s.call(r, i) : s(i)) : Za(t, o + 1)
            }(i, je(), e, r.transform, n, r) : r.transform(n))
        }

        function Xa(t, e, n, s) {
            const i = t + 20, r = Te(), o = be(r, i);
            return tl(r, Ja(r, i) ? function (t, e, n, s, i, r, o) {
                const a = e + n;
                return function (t, e, n, s) {
                    const i = Nr(t, e, n);
                    return Nr(t, e + 1, s) || i
                }(t, a, i, r) ? Pr(t, a + 2, o ? s.call(o, i, r) : s(i, r)) : Za(t, a + 2)
            }(r, je(), e, o.transform, n, s, o) : o.transform(n, s))
        }

        function Ja(t, e) {
            return t[1].data[e].pure
        }

        function tl(t, e) {
            return Ar.isWrapped(e) && (e = Ar.unwrap(e), t[Oe.lFrame.bindingIndex] = hi), e
        }

        const el = class extends S {
            constructor(t = !1) {
                super(), this.__isAsync = t
            }

            emit(t) {
                super.next(t)
            }

            subscribe(t, e, n) {
                let s, i = t => null, r = () => null;
                t && "object" == typeof t ? (s = this.__isAsync ? e => {
                    setTimeout(() => t.next(e))
                } : e => {
                    t.next(e)
                }, t.error && (i = this.__isAsync ? e => {
                    setTimeout(() => t.error(e))
                } : e => {
                    t.error(e)
                }), t.complete && (r = this.__isAsync ? () => {
                    setTimeout(() => t.complete())
                } : () => {
                    t.complete()
                })) : (s = this.__isAsync ? e => {
                    setTimeout(() => t(e))
                } : e => {
                    t(e)
                }, e && (i = this.__isAsync ? t => {
                    setTimeout(() => e(t))
                } : t => {
                    e(t)
                }), n && (r = this.__isAsync ? () => {
                    setTimeout(() => n())
                } : () => {
                    n()
                }));
                const o = super.subscribe(s, i, r);
                return t instanceof u && t.add(o), o
            }
        };

        function nl() {
            return this._results[Tr()]()
        }

        class sl {
            constructor(t = !1) {
                this._emitDistinctChangesOnly = t, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
                const e = Tr(), n = sl.prototype;
                n[e] || (n[e] = nl)
            }

            get changes() {
                return this._changes || (this._changes = new el)
            }

            get(t) {
                return this._results[t]
            }

            map(t) {
                return this._results.map(t)
            }

            filter(t) {
                return this._results.filter(t)
            }

            find(t) {
                return this._results.find(t)
            }

            reduce(t, e) {
                return this._results.reduce(t, e)
            }

            forEach(t) {
                this._results.forEach(t)
            }

            some(t) {
                return this._results.some(t)
            }

            toArray() {
                return this._results.slice()
            }

            toString() {
                return this._results.toString()
            }

            reset(t, e) {
                this.dirty = !1;
                const n = function t(e, n) {
                    void 0 === n && (n = e);
                    for (let s = 0; s < e.length; s++) {
                        let i = e[s];
                        Array.isArray(i) ? (n === e && (n = e.slice(0, s)), t(i, n)) : n !== e && n.push(i)
                    }
                    return n
                }(t);
                (this._changesDetected = !function (t, e, n) {
                    if (t.length !== e.length) return !1;
                    for (let s = 0; s < t.length; s++) {
                        let i = t[s], r = e[s];
                        if (n && (i = n(i), r = n(r)), r !== i) return !1
                    }
                    return !0
                }(this._results, n, e)) && (this._results = n, this.length = n.length, this.last = n[this.length - 1], this.first = n[0])
            }

            notifyOnChanges() {
                !this._changes || !this._changesDetected && this._emitDistinctChangesOnly || this._changes.emit(this)
            }

            setDirty() {
                this.dirty = !0
            }

            destroy() {
                this.changes.complete(), this.changes.unsubscribe()
            }
        }

        class il {
            constructor(t) {
                this.queryList = t, this.matches = null
            }

            clone() {
                return new il(this.queryList)
            }

            setDirty() {
                this.queryList.setDirty()
            }
        }

        class rl {
            constructor(t = []) {
                this.queries = t
            }

            createEmbeddedView(t) {
                const e = t.queries;
                if (null !== e) {
                    const n = null !== t.contentQueries ? t.contentQueries[0] : e.length, s = [];
                    for (let t = 0; t < n; t++) {
                        const n = e.getByIndex(t);
                        s.push(this.queries[n.indexInDeclarationView].clone())
                    }
                    return new rl(s)
                }
                return null
            }

            insertView(t) {
                this.dirtyQueriesWithMatches(t)
            }

            detachView(t) {
                this.dirtyQueriesWithMatches(t)
            }

            dirtyQueriesWithMatches(t) {
                for (let e = 0; e < this.queries.length; e++) null !== yl(t, e).matches && this.queries[e].setDirty()
            }
        }

        class ol {
            constructor(t, e, n = null) {
                this.predicate = t, this.flags = e, this.read = n
            }
        }

        class al {
            constructor(t = []) {
                this.queries = t
            }

            elementStart(t, e) {
                for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(t, e)
            }

            elementEnd(t) {
                for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t)
            }

            embeddedTView(t) {
                let e = null;
                for (let n = 0; n < this.length; n++) {
                    const s = null !== e ? e.length : 0, i = this.getByIndex(n).embeddedTView(t, s);
                    i && (i.indexInDeclarationView = n, null !== e ? e.push(i) : e = [i])
                }
                return null !== e ? new al(e) : null
            }

            template(t, e) {
                for (let n = 0; n < this.queries.length; n++) this.queries[n].template(t, e)
            }

            getByIndex(t) {
                return this.queries[t]
            }

            get length() {
                return this.queries.length
            }

            track(t) {
                this.queries.push(t)
            }
        }

        class ll {
            constructor(t, e = -1) {
                this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = e
            }

            elementStart(t, e) {
                this.isApplyingToNode(e) && this.matchTNode(t, e)
            }

            elementEnd(t) {
                this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
            }

            template(t, e) {
                this.elementStart(t, e)
            }

            embeddedTView(t, e) {
                return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, e), new ll(this.metadata)) : null
            }

            isApplyingToNode(t) {
                if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                    const e = this._declarationNodeIndex;
                    let n = t.parent;
                    for (; null !== n && 8 & n.type && n.index !== e;) n = n.parent;
                    return e === (null !== n ? n.index : -1)
                }
                return this._appliesToNextNode
            }

            matchTNode(t, e) {
                const n = this.metadata.predicate;
                if (Array.isArray(n)) for (let s = 0; s < n.length; s++) {
                    const i = n[s];
                    this.matchTNodeWithReadOption(t, e, cl(e, i)), this.matchTNodeWithReadOption(t, e, Fn(e, t, i, !1, !1))
                } else n === Oa ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1) : this.matchTNodeWithReadOption(t, e, Fn(e, t, n, !1, !1))
            }

            matchTNodeWithReadOption(t, e, n) {
                if (null !== n) {
                    const s = this.metadata.read;
                    if (null !== s) if (s === Qo || s === Na || s === Oa && 4 & e.type) this.addMatch(e.index, -2); else {
                        const n = Fn(e, t, s, !1, !1);
                        null !== n && this.addMatch(e.index, n)
                    } else this.addMatch(e.index, n)
                }
            }

            addMatch(t, e) {
                null === this.matches ? this.matches = [t, e] : this.matches.push(t, e)
            }
        }

        function cl(t, e) {
            const n = t.localNames;
            if (null !== n) for (let s = 0; s < n.length; s += 2) if (n[s] === e) return n[s + 1];
            return null
        }

        function hl(t, e, n, s) {
            return -1 === n ? function (t, e) {
                return 11 & t.type ? Ko(t, e) : 4 & t.type ? Aa(t, e) : null
            }(e, t) : -2 === n ? function (t, e, n) {
                return n === Qo ? Ko(e, t) : n === Oa ? Aa(e, t) : n === Na ? ja(e, t) : void 0
            }(t, e, s) : Ln(t, t[1], n, e)
        }

        function ul(t, e, n, s) {
            const i = e[19].queries[s];
            if (null === i.matches) {
                const s = t.data, r = n.matches, o = [];
                for (let t = 0; t < r.length; t += 2) {
                    const i = r[t];
                    o.push(i < 0 ? null : hl(e, s[i], r[t + 1], n.metadata.read))
                }
                i.matches = o
            }
            return i.matches
        }

        function dl(t) {
            const e = Te(), n = Ae(), s = $e();
            qe(s + 1);
            const i = yl(n, s);
            if (t.dirty && Ce(e) === (2 == (2 & i.metadata.flags))) {
                if (null === i.matches) t.reset([]); else {
                    const r = i.crossesNgTemplate ? function t(e, n, s, i) {
                        const r = e.queries.getByIndex(s), o = r.matches;
                        if (null !== o) {
                            const a = ul(e, n, r, s);
                            for (let e = 0; e < o.length; e += 2) {
                                const s = o[e];
                                if (s > 0) i.push(a[e / 2]); else {
                                    const r = o[e + 1], a = n[-s];
                                    for (let e = 10; e < a.length; e++) {
                                        const n = a[e];
                                        n[17] === n[3] && t(n[1], n, r, i)
                                    }
                                    if (null !== a[9]) {
                                        const e = a[9];
                                        for (let n = 0; n < e.length; n++) {
                                            const s = e[n];
                                            t(s[1], s, r, i)
                                        }
                                    }
                                }
                            }
                        }
                        return i
                    }(n, e, s, []) : ul(n, e, i, s);
                    t.reset(r, Yo), t.notifyOnChanges()
                }
                return !0
            }
            return !1
        }

        function pl(t, e, n) {
            const s = Ae();
            s.firstCreatePass && (_l(s, new ol(t, e, n), -1), 2 == (2 & e) && (s.staticViewQueries = !0)), gl(s, Te(), e)
        }

        function fl(t, e, n, s) {
            const i = Ae();
            if (i.firstCreatePass) {
                const r = Ie();
                _l(i, new ol(e, n, s), r.index), function (t, e) {
                    const n = t.contentQueries || (t.contentQueries = []);
                    e !== (n.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e)
                }(i, t), 2 == (2 & n) && (i.staticContentQueries = !0)
            }
            gl(i, Te(), n)
        }

        function ml() {
            return t = Te(), e = $e(), t[19].queries[e].queryList;
            var t, e
        }

        function gl(t, e, n) {
            const s = new sl(4 == (4 & n));
            Ii(t, e, s, s.destroy), null === e[19] && (e[19] = new rl), e[19].queries.push(new il(s))
        }

        function _l(t, e, n) {
            null === t.queries && (t.queries = new al), t.queries.track(new ll(e, n))
        }

        function yl(t, e) {
            return t.queries.getByIndex(e)
        }

        const bl = new $n("Application Initializer");
        let vl = (() => {
            class t {
                constructor(t) {
                    this.appInits = t, this.resolve = Go, this.reject = Go, this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, e) => {
                        this.resolve = t, this.reject = e
                    })
                }

                runInitializers() {
                    if (this.initialized) return;
                    const t = [], e = () => {
                        this.done = !0, this.resolve()
                    };
                    if (this.appInits) for (let n = 0; n < this.appInits.length; n++) {
                        const e = this.appInits[n]();
                        Kr(e) && t.push(e)
                    }
                    Promise.all(t).then(() => {
                        e()
                    }).catch(t => {
                        this.reject(t)
                    }), 0 === t.length && e(), this.initialized = !0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bl, 8))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const wl = new $n("AppId"), Cl = {
            provide: wl, useFactory: function () {
                return `${Sl()}${Sl()}${Sl()}`
            }, deps: []
        };

        function Sl() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }

        const xl = new $n("Platform Initializer"), kl = new $n("Platform ID"), El = new $n("appBootstrapListener");
        let Ol = (() => {
            class t {
                log(t) {
                    console.log(t)
                }

                warn(t) {
                    console.warn(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Rl = new $n("LocaleId"), Tl = new $n("DefaultCurrencyCode");

        class Al {
            constructor(t, e) {
                this.ngModuleFactory = t, this.componentFactories = e
            }
        }

        const Dl = function (t) {
            return new Ka(t)
        }, Il = Dl, Pl = function (t) {
            return Promise.resolve(Dl(t))
        }, Nl = function (t) {
            const e = Dl(t), n = Es(Xt(t).declarations).reduce((t, e) => {
                const n = Yt(e);
                return n && t.push(new $a(n)), t
            }, []);
            return new Al(e, n)
        }, Fl = Nl, Ll = function (t) {
            return Promise.resolve(Nl(t))
        };
        let Ml = (() => {
            class t {
                constructor() {
                    this.compileModuleSync = Il, this.compileModuleAsync = Pl, this.compileModuleAndAllComponentsSync = Fl, this.compileModuleAndAllComponentsAsync = Ll
                }

                clearCache() {
                }

                clearCacheFor(t) {
                }

                getModuleId(t) {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Vl = (() => Promise.resolve(0))();

        function jl(t) {
            "undefined" == typeof Zone ? Vl.then(() => {
                t && t.apply(null, null)
            }) : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
        }

        class zl {
            constructor({
                            enableLongStackTrace: t = !1,
                            shouldCoalesceEventChangeDetection: e = !1,
                            shouldCoalesceRunChangeDetection: n = !1
                        }) {
                if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new el(!1), this.onMicrotaskEmpty = new el(!1), this.onStable = new el(!1), this.onError = new el(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                Zone.assertZonePatched(), this._nesting = 0, this._outer = this._inner = Zone.current, Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)), this.shouldCoalesceEventChangeDetection = !n && e, this.shouldCoalesceRunChangeDetection = n, this.lastRequestAnimationFrameId = -1, this.nativeRequestAnimationFrame = function () {
                    let t = Dt.requestAnimationFrame, e = Dt.cancelAnimationFrame;
                    if ("undefined" != typeof Zone && t && e) {
                        const n = t[Zone.__symbol__("OriginalDelegate")];
                        n && (t = n);
                        const s = e[Zone.__symbol__("OriginalDelegate")];
                        s && (e = s)
                    }
                    return {nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e}
                }().nativeRequestAnimationFrame, function (t) {
                    const e = () => {
                        !function (t) {
                            -1 === t.lastRequestAnimationFrameId && (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(Dt, () => {
                                t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                    t.lastRequestAnimationFrameId = -1, Ul(t), Hl(t)
                                }, void 0, () => {
                                }, () => {
                                })), t.fakeTopEventTask.invoke()
                            }), Ul(t))
                        }(t)
                    };
                    t._inner = t._inner.fork({
                        name: "angular",
                        properties: {isAngularZone: !0},
                        onInvokeTask: (n, s, i, r, o, a) => {
                            try {
                                return $l(t), n.invokeTask(i, r, o, a)
                            } finally {
                                (t.shouldCoalesceEventChangeDetection && "eventTask" === r.type || t.shouldCoalesceRunChangeDetection) && e(), ql(t)
                            }
                        },
                        onInvoke: (n, s, i, r, o, a, l) => {
                            try {
                                return $l(t), n.invoke(i, r, o, a, l)
                            } finally {
                                t.shouldCoalesceRunChangeDetection && e(), ql(t)
                            }
                        },
                        onHasTask: (e, n, s, i) => {
                            e.hasTask(s, i), n === s && ("microTask" == i.change ? (t._hasPendingMicrotasks = i.microTask, Ul(t), Hl(t)) : "macroTask" == i.change && (t.hasPendingMacrotasks = i.macroTask))
                        },
                        onHandleError: (e, n, s, i) => (e.handleError(s, i), t.runOutsideAngular(() => t.onError.emit(i)), !1)
                    })
                }(this)
            }

            static isInAngularZone() {
                return !0 === Zone.current.get("isAngularZone")
            }

            static assertInAngularZone() {
                if (!zl.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
            }

            static assertNotInAngularZone() {
                if (zl.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
            }

            run(t, e, n) {
                return this._inner.run(t, e, n)
            }

            runTask(t, e, n, s) {
                const i = this._inner, r = i.scheduleEventTask("NgZoneEvent: " + s, t, Bl, Go, Go);
                try {
                    return i.runTask(r, e, n)
                } finally {
                    i.cancelTask(r)
                }
            }

            runGuarded(t, e, n) {
                return this._inner.runGuarded(t, e, n)
            }

            runOutsideAngular(t) {
                return this._outer.run(t)
            }
        }

        const Bl = {};

        function Hl(t) {
            if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable) try {
                t._nesting++, t.onMicrotaskEmpty.emit(null)
            } finally {
                if (t._nesting--, !t.hasPendingMicrotasks) try {
                    t.runOutsideAngular(() => t.onStable.emit(null))
                } finally {
                    t.isStable = !0
                }
            }
        }

        function Ul(t) {
            t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && -1 !== t.lastRequestAnimationFrameId)
        }

        function $l(t) {
            t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
        }

        function ql(t) {
            t._nesting--, Hl(t)
        }

        class Wl {
            constructor() {
                this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new el, this.onMicrotaskEmpty = new el, this.onStable = new el, this.onError = new el
            }

            run(t, e, n) {
                return t.apply(e, n)
            }

            runGuarded(t, e, n) {
                return t.apply(e, n)
            }

            runOutsideAngular(t) {
                return t()
            }

            runTask(t, e, n, s) {
                return t.apply(e, n)
            }
        }

        let Gl = (() => {
            class t {
                constructor(t) {
                    this._ngZone = t, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), t.run(() => {
                        this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                    })
                }

                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: () => {
                            this._didWork = !0, this._isZoneStable = !1
                        }
                    }), this._ngZone.runOutsideAngular(() => {
                        this._ngZone.onStable.subscribe({
                            next: () => {
                                zl.assertNotInAngularZone(), jl(() => {
                                    this._isZoneStable = !0, this._runCallbacksIfReady()
                                })
                            }
                        })
                    })
                }

                increasePendingRequestCount() {
                    return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                }

                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(), this._pendingCount
                }

                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }

                _runCallbacksIfReady() {
                    if (this.isStable()) jl(() => {
                        for (; 0 !== this._callbacks.length;) {
                            let t = this._callbacks.pop();
                            clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                        }
                        this._didWork = !1
                    }); else {
                        let t = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(e => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)), this._didWork = !0
                    }
                }

                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                        source: t.source,
                        creationLocation: t.creationLocation,
                        data: t.data
                    })) : []
                }

                addCallback(t, e, n) {
                    let s = -1;
                    e && e > 0 && (s = setTimeout(() => {
                        this._callbacks = this._callbacks.filter(t => t.timeoutId !== s), t(this._didWork, this.getPendingTasks())
                    }, e)), this._callbacks.push({doneCb: t, timeoutId: s, updateCb: n})
                }

                whenStable(t, e, n) {
                    if (n && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                    this.addCallback(t, e, n), this._runCallbacksIfReady()
                }

                getPendingRequestCount() {
                    return this._pendingCount
                }

                findProviders(t, e, n) {
                    return []
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(zl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Kl = (() => {
            class t {
                constructor() {
                    this._applications = new Map, Yl.addToWindow(this)
                }

                registerApplication(t, e) {
                    this._applications.set(t, e)
                }

                unregisterApplication(t) {
                    this._applications.delete(t)
                }

                unregisterAllApplications() {
                    this._applications.clear()
                }

                getTestability(t) {
                    return this._applications.get(t) || null
                }

                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }

                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }

                findTestabilityInTree(t, e = !0) {
                    return Yl.findTestabilityInTree(this, t, e)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class Zl {
            addToWindow(t) {
            }

            findTestabilityInTree(t, e, n) {
                return null
            }
        }

        let Ql, Yl = new Zl, Xl = !0, Jl = !1;

        function tc() {
            return Jl = !0, Xl
        }

        const ec = new $n("AllowMultipleToken");

        class nc {
            constructor(t, e) {
                this.name = t, this.token = e
            }
        }

        function sc(t, e, n = []) {
            const s = "Platform: " + e, i = new $n(s);
            return (e = []) => {
                let r = ic();
                if (!r || r.injector.get(ec, !1)) if (t) t(n.concat(e).concat({provide: i, useValue: !0})); else {
                    const t = n.concat(e).concat({provide: i, useValue: !0}, {provide: ar, useValue: "platform"});
                    !function (t) {
                        if (Ql && !Ql.destroyed && !Ql.injector.get(ec, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                        Ql = t.get(rc);
                        const e = t.get(xl, null);
                        e && e.forEach(t => t())
                    }(wr.create({providers: t, name: s}))
                }
                return function (t) {
                    const e = ic();
                    if (!e) throw new Error("No platform exists!");
                    if (!e.injector.get(t, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                    return e
                }(i)
            }
        }

        function ic() {
            return Ql && !Ql.destroyed ? Ql : null
        }

        let rc = (() => {
            class t {
                constructor(t) {
                    this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                }

                bootstrapModuleFactory(t, e) {
                    const n = function (t, e) {
                        let n;
                        return n = "noop" === t ? new Wl : ("zone.js" === t ? void 0 : t) || new zl({
                            enableLongStackTrace: tc(),
                            shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                            shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing)
                        }), n
                    }(e ? e.ngZone : void 0, {
                        ngZoneEventCoalescing: e && e.ngZoneEventCoalescing || !1,
                        ngZoneRunCoalescing: e && e.ngZoneRunCoalescing || !1
                    }), s = [{provide: zl, useValue: n}];
                    return n.run(() => {
                        const e = wr.create({providers: s, parent: this.injector, name: t.moduleType.name}),
                            i = t.create(e), r = i.injector.get(Cs, null);
                        if (!r) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                        return n.runOutsideAngular(() => {
                            const t = n.onError.subscribe({
                                next: t => {
                                    r.handleError(t)
                                }
                            });
                            i.onDestroy(() => {
                                lc(this._modules, i), t.unsubscribe()
                            })
                        }), function (t, e, n) {
                            try {
                                const s = n();
                                return Kr(s) ? s.catch(n => {
                                    throw e.runOutsideAngular(() => t.handleError(n)), n
                                }) : s
                            } catch (s) {
                                throw e.runOutsideAngular(() => t.handleError(s)), s
                            }
                        }(r, n, () => {
                            const t = i.injector.get(vl);
                            return t.runInitializers(), t.donePromise.then(() => (Fo(i.injector.get(Rl, "en-US") || "en-US"), this._moduleDoBootstrap(i), i))
                        })
                    })
                }

                bootstrapModule(t, e = []) {
                    const n = oc({}, e);
                    return function (t, e, n) {
                        const s = new Ka(n);
                        return Promise.resolve(s)
                    }(0, 0, t).then(t => this.bootstrapModuleFactory(t, n))
                }

                _moduleDoBootstrap(t) {
                    const e = t.injector.get(ac);
                    if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(t => e.bootstrap(t)); else {
                        if (!t.instance.ngDoBootstrap) throw new Error(`The module ${et(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
                        t.instance.ngDoBootstrap(e)
                    }
                    this._modules.push(t)
                }

                onDestroy(t) {
                    this._destroyListeners.push(t)
                }

                get injector() {
                    return this._injector
                }

                destroy() {
                    if (this._destroyed) throw new Error("The platform has already been destroyed!");
                    this._modules.slice().forEach(t => t.destroy()), this._destroyListeners.forEach(t => t()), this._destroyed = !0
                }

                get destroyed() {
                    return this._destroyed
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(wr))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function oc(t, e) {
            return Array.isArray(e) ? e.reduce(oc, t) : Object.assign(Object.assign({}, t), e)
        }

        let ac = (() => {
            class t {
                constructor(t, e, n, s, i) {
                    this._zone = t, this._injector = e, this._exceptionHandler = n, this._componentFactoryResolver = s, this._initStatus = i, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this._zone.run(() => {
                                this.tick()
                            })
                        }
                    });
                    const r = new y(t => {
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                            t.next(this._stable), t.complete()
                        })
                    }), o = new y(t => {
                        let e;
                        this._zone.runOutsideAngular(() => {
                            e = this._zone.onStable.subscribe(() => {
                                zl.assertNotInAngularZone(), jl(() => {
                                    this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, t.next(!0))
                                })
                            })
                        });
                        const n = this._zone.onUnstable.subscribe(() => {
                            zl.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                t.next(!1)
                            }))
                        });
                        return () => {
                            e.unsubscribe(), n.unsubscribe()
                        }
                    });
                    this.isStable = q(r, o.pipe(t => {
                        return W()((e = X, function (t) {
                            let n;
                            n = "function" == typeof e ? e : function () {
                                return e
                            };
                            const s = Object.create(t, Q);
                            return s.source = t, s.subjectFactory = n, s
                        })(t));
                        var e
                    }))
                }

                bootstrap(t, e) {
                    if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                    let n;
                    n = t instanceof $o ? t : this._componentFactoryResolver.resolveComponentFactory(t), this.componentTypes.push(n.componentType);
                    const s = n.isBoundToModule ? void 0 : this._injector.get(Da),
                        i = n.create(wr.NULL, [], e || n.selector, s), r = i.location.nativeElement,
                        o = i.injector.get(Gl, null), a = o && i.injector.get(Kl);
                    return o && a && a.registerApplication(r, o), i.onDestroy(() => {
                        this.detachView(i.hostView), lc(this.components, i), a && a.unregisterApplication(r)
                    }), this._loadComponent(i), i
                }

                tick() {
                    if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
                    try {
                        this._runningTick = !0;
                        for (let t of this._views) t.detectChanges()
                    } catch (t) {
                        this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
                    } finally {
                        this._runningTick = !1
                    }
                }

                attachView(t) {
                    const e = t;
                    this._views.push(e), e.attachToAppRef(this)
                }

                detachView(t) {
                    const e = t;
                    lc(this._views, e), e.detachFromAppRef()
                }

                _loadComponent(t) {
                    this.attachView(t.hostView), this.tick(), this.components.push(t), this._injector.get(El, []).concat(this._bootstrapListeners).forEach(e => e(t))
                }

                ngOnDestroy() {
                    this._views.slice().forEach(t => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
                }

                get viewCount() {
                    return this._views.length
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(zl), os(wr), os(Cs), os(Wo), os(vl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function lc(t, e) {
            const n = t.indexOf(e);
            n > -1 && t.splice(n, 1)
        }

        class cc {
        }

        class hc {
        }

        const uc = {factoryPathPrefix: "", factoryPathSuffix: ".ngfactory"};
        let dc = (() => {
            class t {
                constructor(t, e) {
                    this._compiler = t, this._config = e || uc
                }

                load(t) {
                    return this.loadAndCompile(t)
                }

                loadAndCompile(t) {
                    let [e, s] = t.split("#");
                    return void 0 === s && (s = "default"), n("zn8P")(e).then(t => t[s]).then(t => pc(t, e, s)).then(t => this._compiler.compileModuleAsync(t))
                }

                loadFactory(t) {
                    let [e, s] = t.split("#"), i = "NgFactory";
                    return void 0 === s && (s = "default", i = ""), n("zn8P")(this._config.factoryPathPrefix + e + this._config.factoryPathSuffix).then(t => t[s + i]).then(t => pc(t, e, s))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Ml), os(hc, 8))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function pc(t, e, n) {
            if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
            return t
        }

        const fc = sc(null, "core", [{provide: kl, useValue: "unknown"}, {provide: rc, deps: [wr]}, {
            provide: Kl,
            deps: []
        }, {provide: Ol, deps: []}]), mc = [{provide: ac, useClass: ac, deps: [zl, wr, Cs, Wo, vl]}, {
            provide: Ua,
            deps: [zl],
            useFactory: function (t) {
                let e = [];
                return t.onStable.subscribe(() => {
                    for (; e.length;) e.pop()()
                }), function (t) {
                    e.push(t)
                }
            }
        }, {provide: vl, useClass: vl, deps: [[new us, bl]]}, {provide: Ml, useClass: Ml, deps: []}, Cl, {
            provide: ma,
            useFactory: function () {
                return xa
            },
            deps: []
        }, {
            provide: _a, useFactory: function () {
                return ka
            }, deps: []
        }, {
            provide: Rl, useFactory: function (t) {
                return Fo(t = t || "undefined" != typeof $localize && $localize.locale || "en-US"), t
            }, deps: [[new hs(Rl), new us, new ds]]
        }, {provide: Tl, useValue: "USD"}];
        let gc = (() => {
            class t {
                constructor(t) {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(ac))
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({providers: mc}), t
        })(), _c = null;

        function yc() {
            return _c
        }

        const bc = new $n("DocumentToken");
        let vc = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({factory: wc, token: t, providedIn: "platform"}), t
        })();

        function wc() {
            return os(Sc)
        }

        const Cc = new $n("Location Initialized");
        let Sc = (() => {
            class t extends vc {
                constructor(t) {
                    super(), this._doc = t, this._init()
                }

                _init() {
                    this.location = yc().getLocation(), this._history = yc().getHistory()
                }

                getBaseHrefFromDOM() {
                    return yc().getBaseHref(this._doc)
                }

                onPopState(t) {
                    yc().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", t, !1)
                }

                onHashChange(t) {
                    yc().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", t, !1)
                }

                get href() {
                    return this.location.href
                }

                get protocol() {
                    return this.location.protocol
                }

                get hostname() {
                    return this.location.hostname
                }

                get port() {
                    return this.location.port
                }

                get pathname() {
                    return this.location.pathname
                }

                get search() {
                    return this.location.search
                }

                get hash() {
                    return this.location.hash
                }

                set pathname(t) {
                    this.location.pathname = t
                }

                pushState(t, e, n) {
                    xc() ? this._history.pushState(t, e, n) : this.location.hash = n
                }

                replaceState(t, e, n) {
                    xc() ? this._history.replaceState(t, e, n) : this.location.hash = n
                }

                forward() {
                    this._history.forward()
                }

                back() {
                    this._history.back()
                }

                getState() {
                    return this._history.state
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc))
            }, t.\u0275prov = ut({factory: kc, token: t, providedIn: "platform"}), t
        })();

        function xc() {
            return !!window.history.pushState
        }

        function kc() {
            return new Sc(os(bc))
        }

        function Ec(t, e) {
            if (0 == t.length) return e;
            if (0 == e.length) return t;
            let n = 0;
            return t.endsWith("/") && n++, e.startsWith("/") && n++, 2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        }

        function Oc(t) {
            const e = t.match(/#|\?|$/), n = e && e.index || t.length;
            return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
        }

        function Rc(t) {
            return t && "?" !== t[0] ? "?" + t : t
        }

        let Tc = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({factory: Ac, token: t, providedIn: "root"}), t
        })();

        function Ac(t) {
            const e = os(bc).location;
            return new Ic(os(vc), e && e.origin || "")
        }

        const Dc = new $n("appBaseHref");
        let Ic = (() => {
            class t extends Tc {
                constructor(t, e) {
                    if (super(), this._platformLocation = t, null == e && (e = this._platformLocation.getBaseHrefFromDOM()), null == e) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                    this._baseHref = e
                }

                onPopState(t) {
                    this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t)
                }

                getBaseHref() {
                    return this._baseHref
                }

                prepareExternalUrl(t) {
                    return Ec(this._baseHref, t)
                }

                path(t = !1) {
                    const e = this._platformLocation.pathname + Rc(this._platformLocation.search),
                        n = this._platformLocation.hash;
                    return n && t ? `${e}${n}` : e
                }

                pushState(t, e, n, s) {
                    const i = this.prepareExternalUrl(n + Rc(s));
                    this._platformLocation.pushState(t, e, i)
                }

                replaceState(t, e, n, s) {
                    const i = this.prepareExternalUrl(n + Rc(s));
                    this._platformLocation.replaceState(t, e, i)
                }

                forward() {
                    this._platformLocation.forward()
                }

                back() {
                    this._platformLocation.back()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(vc), os(Dc, 8))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Pc = (() => {
            class t extends Tc {
                constructor(t, e) {
                    super(), this._platformLocation = t, this._baseHref = "", null != e && (this._baseHref = e)
                }

                onPopState(t) {
                    this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t)
                }

                getBaseHref() {
                    return this._baseHref
                }

                path(t = !1) {
                    let e = this._platformLocation.hash;
                    return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e
                }

                prepareExternalUrl(t) {
                    const e = Ec(this._baseHref, t);
                    return e.length > 0 ? "#" + e : e
                }

                pushState(t, e, n, s) {
                    let i = this.prepareExternalUrl(n + Rc(s));
                    0 == i.length && (i = this._platformLocation.pathname), this._platformLocation.pushState(t, e, i)
                }

                replaceState(t, e, n, s) {
                    let i = this.prepareExternalUrl(n + Rc(s));
                    0 == i.length && (i = this._platformLocation.pathname), this._platformLocation.replaceState(t, e, i)
                }

                forward() {
                    this._platformLocation.forward()
                }

                back() {
                    this._platformLocation.back()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(vc), os(Dc, 8))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Nc = (() => {
            class t {
                constructor(t, e) {
                    this._subject = new el, this._urlChangeListeners = [], this._platformStrategy = t;
                    const n = this._platformStrategy.getBaseHref();
                    this._platformLocation = e, this._baseHref = Oc(Lc(n)), this._platformStrategy.onPopState(t => {
                        this._subject.emit({url: this.path(!0), pop: !0, state: t.state, type: t.type})
                    })
                }

                path(t = !1) {
                    return this.normalize(this._platformStrategy.path(t))
                }

                getState() {
                    return this._platformLocation.getState()
                }

                isCurrentPathEqualTo(t, e = "") {
                    return this.path() == this.normalize(t + Rc(e))
                }

                normalize(e) {
                    return t.stripTrailingSlash(function (t, e) {
                        return t && e.startsWith(t) ? e.substring(t.length) : e
                    }(this._baseHref, Lc(e)))
                }

                prepareExternalUrl(t) {
                    return t && "/" !== t[0] && (t = "/" + t), this._platformStrategy.prepareExternalUrl(t)
                }

                go(t, e = "", n = null) {
                    this._platformStrategy.pushState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Rc(e)), n)
                }

                replaceState(t, e = "", n = null) {
                    this._platformStrategy.replaceState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Rc(e)), n)
                }

                forward() {
                    this._platformStrategy.forward()
                }

                back() {
                    this._platformStrategy.back()
                }

                onUrlChange(t) {
                    this._urlChangeListeners.push(t), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(t => {
                        this._notifyUrlChangeListeners(t.url, t.state)
                    }))
                }

                _notifyUrlChangeListeners(t = "", e) {
                    this._urlChangeListeners.forEach(n => n(t, e))
                }

                subscribe(t, e, n) {
                    return this._subject.subscribe({next: t, error: e, complete: n})
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Tc), os(vc))
            }, t.normalizeQueryParams = Rc, t.joinWithSlash = Ec, t.stripTrailingSlash = Oc, t.\u0275prov = ut({
                factory: Fc,
                token: t,
                providedIn: "root"
            }), t
        })();

        function Fc() {
            return new Nc(os(Tc), os(vc))
        }

        function Lc(t) {
            return t.replace(/\/index.html$/, "")
        }

        var Mc = function (t) {
            return t[t.Zero = 0] = "Zero", t[t.One = 1] = "One", t[t.Two = 2] = "Two", t[t.Few = 3] = "Few", t[t.Many = 4] = "Many", t[t.Other = 5] = "Other", t
        }({});

        class Vc {
        }

        let jc = (() => {
            class t extends Vc {
                constructor(t) {
                    super(), this.locale = t
                }

                getPluralCategory(t, e) {
                    switch (function (t) {
                        return function (t) {
                            const e = function (t) {
                                return t.toLowerCase().replace(/_/g, "-")
                            }(t);
                            let n = Io(e);
                            if (n) return n;
                            const s = e.split("-")[0];
                            if (n = Io(s), n) return n;
                            if ("en" === s) return Ao;
                            throw new Error(`Missing locale data for the locale "${t}".`)
                        }(t)[Po.PluralCase]
                    }(e || this.locale)(t)) {
                        case Mc.Zero:
                            return "zero";
                        case Mc.One:
                            return "one";
                        case Mc.Two:
                            return "two";
                        case Mc.Few:
                            return "few";
                        case Mc.Many:
                            return "many";
                        default:
                            return "other"
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Rl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function zc(t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
                const t = n.indexOf("="), [s, i] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
                if (s.trim() === e) return decodeURIComponent(i)
            }
            return null
        }

        let Bc = (() => {
            class t {
                constructor(t, e, n, s) {
                    this._iterableDiffers = t, this._keyValueDiffers = e, this._ngEl = n, this._renderer = s, this._iterableDiffer = null, this._keyValueDiffer = null, this._initialClasses = [], this._rawClass = null
                }

                set klass(t) {
                    this._removeClasses(this._initialClasses), this._initialClasses = "string" == typeof t ? t.split(/\s+/) : [], this._applyClasses(this._initialClasses), this._applyClasses(this._rawClass)
                }

                set ngClass(t) {
                    this._removeClasses(this._rawClass), this._applyClasses(this._initialClasses), this._iterableDiffer = null, this._keyValueDiffer = null, this._rawClass = "string" == typeof t ? t.split(/\s+/) : t, this._rawClass && (Dr(this._rawClass) ? this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create() : this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create())
                }

                ngDoCheck() {
                    if (this._iterableDiffer) {
                        const t = this._iterableDiffer.diff(this._rawClass);
                        t && this._applyIterableChanges(t)
                    } else if (this._keyValueDiffer) {
                        const t = this._keyValueDiffer.diff(this._rawClass);
                        t && this._applyKeyValueChanges(t)
                    }
                }

                _applyKeyValueChanges(t) {
                    t.forEachAddedItem(t => this._toggleClass(t.key, t.currentValue)), t.forEachChangedItem(t => this._toggleClass(t.key, t.currentValue)), t.forEachRemovedItem(t => {
                        t.previousValue && this._toggleClass(t.key, !1)
                    })
                }

                _applyIterableChanges(t) {
                    t.forEachAddedItem(t => {
                        if ("string" != typeof t.item) throw new Error("NgClass can only toggle CSS classes expressed as strings, got " + et(t.item));
                        this._toggleClass(t.item, !0)
                    }), t.forEachRemovedItem(t => this._toggleClass(t.item, !1))
                }

                _applyClasses(t) {
                    t && (Array.isArray(t) || t instanceof Set ? t.forEach(t => this._toggleClass(t, !0)) : Object.keys(t).forEach(e => this._toggleClass(e, !!t[e])))
                }

                _removeClasses(t) {
                    t && (Array.isArray(t) || t instanceof Set ? t.forEach(t => this._toggleClass(t, !1)) : Object.keys(t).forEach(t => this._toggleClass(t, !1)))
                }

                _toggleClass(t, e) {
                    (t = t.trim()) && t.split(/\s+/g).forEach(t => {
                        e ? this._renderer.addClass(this._ngEl.nativeElement, t) : this._renderer.removeClass(this._ngEl.nativeElement, t)
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(ma), Vr(_a), Vr(Qo), Vr(Jo))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "ngClass", ""]],
                inputs: {klass: ["class", "klass"], ngClass: "ngClass"}
            }), t
        })();

        class Hc {
            constructor(t, e, n, s) {
                this.$implicit = t, this.ngForOf = e, this.index = n, this.count = s
            }

            get first() {
                return 0 === this.index
            }

            get last() {
                return this.index === this.count - 1
            }

            get even() {
                return this.index % 2 == 0
            }

            get odd() {
                return !this.even
            }
        }

        let Uc = (() => {
            class t {
                constructor(t, e, n) {
                    this._viewContainer = t, this._template = e, this._differs = n, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
                }

                set ngForOf(t) {
                    this._ngForOf = t, this._ngForOfDirty = !0
                }

                set ngForTrackBy(t) {
                    this._trackByFn = t
                }

                get ngForTrackBy() {
                    return this._trackByFn
                }

                set ngForTemplate(t) {
                    t && (this._template = t)
                }

                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const n = this._ngForOf;
                        if (!this._differ && n) try {
                            this._differ = this._differs.find(n).create(this.ngForTrackBy)
                        } catch (e) {
                            throw new Error(`Cannot find a differ supporting object '${n}' of type '${t = n, t.name || typeof t}'. NgFor only supports binding to Iterables such as Arrays.`)
                        }
                    }
                    var t;
                    if (this._differ) {
                        const t = this._differ.diff(this._ngForOf);
                        t && this._applyChanges(t)
                    }
                }

                _applyChanges(t) {
                    const e = [];
                    t.forEachOperation((t, n, s) => {
                        if (null == t.previousIndex) {
                            const n = this._viewContainer.createEmbeddedView(this._template, new Hc(null, this._ngForOf, -1, -1), null === s ? void 0 : s),
                                i = new $c(t, n);
                            e.push(i)
                        } else if (null == s) this._viewContainer.remove(null === n ? void 0 : n); else if (null !== n) {
                            const i = this._viewContainer.get(n);
                            this._viewContainer.move(i, s);
                            const r = new $c(t, i);
                            e.push(r)
                        }
                    });
                    for (let n = 0; n < e.length; n++) this._perViewChange(e[n].view, e[n].record);
                    for (let n = 0, s = this._viewContainer.length; n < s; n++) {
                        const t = this._viewContainer.get(n);
                        t.context.index = n, t.context.count = s, t.context.ngForOf = this._ngForOf
                    }
                    t.forEachIdentityChange(t => {
                        this._viewContainer.get(t.currentIndex).context.$implicit = t.item
                    })
                }

                _perViewChange(t, e) {
                    t.context.$implicit = e.item
                }

                static ngTemplateContextGuard(t, e) {
                    return !0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na), Vr(Oa), Vr(ma))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "ngFor", "", "ngForOf", ""]],
                inputs: {ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate"}
            }), t
        })();

        class $c {
            constructor(t, e) {
                this.record = t, this.view = e
            }
        }

        let qc = (() => {
            class t {
                constructor(t, e) {
                    this._viewContainer = t, this._context = new Wc, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = e
                }

                set ngIf(t) {
                    this._context.$implicit = this._context.ngIf = t, this._updateView()
                }

                set ngIfThen(t) {
                    Gc("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
                }

                set ngIfElse(t) {
                    Gc("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
                }

                _updateView() {
                    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                }

                static ngTemplateContextGuard(t, e) {
                    return !0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na), Vr(Oa))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "ngIf", ""]],
                inputs: {ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse"}
            }), t
        })();

        class Wc {
            constructor() {
                this.$implicit = null, this.ngIf = null
            }
        }

        function Gc(t, e) {
            if (e && !e.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${et(e)}'.`)
        }

        class Kc {
            constructor(t, e) {
                this._viewContainerRef = t, this._templateRef = e, this._created = !1
            }

            create() {
                this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef)
            }

            destroy() {
                this._created = !1, this._viewContainerRef.clear()
            }

            enforceState(t) {
                t && !this._created ? this.create() : !t && this._created && this.destroy()
            }
        }

        let Zc = (() => {
            class t {
                constructor() {
                    this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1
                }

                set ngSwitch(t) {
                    this._ngSwitch = t, 0 === this._caseCount && this._updateDefaultCases(!0)
                }

                _addCase() {
                    return this._caseCount++
                }

                _addDefault(t) {
                    this._defaultViews || (this._defaultViews = []), this._defaultViews.push(t)
                }

                _matchCase(t) {
                    const e = t == this._ngSwitch;
                    return this._lastCasesMatched = this._lastCasesMatched || e, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), e
                }

                _updateDefaultCases(t) {
                    if (this._defaultViews && t !== this._defaultUsed) {
                        this._defaultUsed = t;
                        for (let e = 0; e < this._defaultViews.length; e++) this._defaultViews[e].enforceState(t)
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275dir = Zt({type: t, selectors: [["", "ngSwitch", ""]], inputs: {ngSwitch: "ngSwitch"}}), t
        })(), Qc = (() => {
            class t {
                constructor(t, e, n) {
                    this.ngSwitch = n, n._addCase(), this._view = new Kc(t, e)
                }

                ngDoCheck() {
                    this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na), Vr(Oa), Vr(Zc, 1))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "ngSwitchCase", ""]],
                inputs: {ngSwitchCase: "ngSwitchCase"}
            }), t
        })(), Yc = (() => {
            class t {
                constructor(t, e, n) {
                    n._addDefault(new Kc(t, e))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na), Vr(Oa), Vr(Zc, 1))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "ngSwitchDefault", ""]]}), t
        })();

        class Xc {
            createSubscription(t, e) {
                return t.subscribe({
                    next: e, error: t => {
                        throw t
                    }
                })
            }

            dispose(t) {
                t.unsubscribe()
            }

            onDestroy(t) {
                t.unsubscribe()
            }
        }

        class Jc {
            createSubscription(t, e) {
                return t.then(e, t => {
                    throw t
                })
            }

            dispose(t) {
            }

            onDestroy(t) {
            }
        }

        const th = new Jc, eh = new Xc;
        let nh = (() => {
            class t {
                constructor(t) {
                    this._ref = t, this._latestValue = null, this._subscription = null, this._obj = null, this._strategy = null
                }

                ngOnDestroy() {
                    this._subscription && this._dispose()
                }

                transform(t) {
                    return this._obj ? t !== this._obj ? (this._dispose(), this.transform(t)) : this._latestValue : (t && this._subscribe(t), this._latestValue)
                }

                _subscribe(t) {
                    this._obj = t, this._strategy = this._selectStrategy(t), this._subscription = this._strategy.createSubscription(t, e => this._updateLatestValue(t, e))
                }

                _selectStrategy(e) {
                    if (Kr(e)) return th;
                    if (Zr(e)) return eh;
                    throw Error(`InvalidPipeArgument: '${e}' for pipe '${et(t)}'`)
                }

                _dispose() {
                    this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null
                }

                _updateLatestValue(t, e) {
                    t === this._obj && (this._latestValue = e, this._ref.markForCheck())
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(function (t = vt.Default) {
                    const e = Ca(!0);
                    if (null != e || t & vt.Optional) return e;
                    ht("ChangeDetectorRef")
                }())
            }, t.\u0275pipe = Qt({name: "async", type: t, pure: !1}), t
        })(), sh = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({providers: [{provide: Vc, useClass: jc}]}), t
        })();

        function ih(t) {
            return "browser" === t
        }

        let rh = (() => {
            class t {
            }

            return t.\u0275prov = ut({token: t, providedIn: "root", factory: () => new oh(os(bc), window)}), t
        })();

        class oh {
            constructor(t, e) {
                this.document = t, this.window = e, this.offset = () => [0, 0]
            }

            setOffset(t) {
                this.offset = Array.isArray(t) ? () => t : t
            }

            getScrollPosition() {
                return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
            }

            scrollToPosition(t) {
                this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
            }

            scrollToAnchor(t) {
                var e;
                if (!this.supportsScrolling()) return;
                const n = null !== (e = this.document.getElementById(t)) && void 0 !== e ? e : this.document.getElementsByName(t)[0];
                void 0 !== n && (this.scrollToElement(n), this.attemptFocus(n))
            }

            setHistoryScrollRestoration(t) {
                if (this.supportScrollRestoration()) {
                    const e = this.window.history;
                    e && e.scrollRestoration && (e.scrollRestoration = t)
                }
            }

            scrollToElement(t) {
                const e = t.getBoundingClientRect(), n = e.left + this.window.pageXOffset,
                    s = e.top + this.window.pageYOffset, i = this.offset();
                this.window.scrollTo(n - i[0], s - i[1])
            }

            attemptFocus(t) {
                return t.focus(), this.document.activeElement === t
            }

            supportScrollRestoration() {
                try {
                    if (!this.supportsScrolling()) return !1;
                    const t = ah(this.window.history) || ah(Object.getPrototypeOf(this.window.history));
                    return !(!t || !t.writable && !t.set)
                } catch (t) {
                    return !1
                }
            }

            supportsScrolling() {
                try {
                    return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
                } catch (t) {
                    return !1
                }
            }
        }

        function ah(t) {
            return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
        }

        class lh extends class extends class {
        } {
            constructor() {
                super()
            }

            supportsDOMEvents() {
                return !0
            }
        } {
            static makeCurrent() {
                var t;
                t = new lh, _c || (_c = t)
            }

            getProperty(t, e) {
                return t[e]
            }

            log(t) {
                window.console && window.console.log && window.console.log(t)
            }

            logGroup(t) {
                window.console && window.console.group && window.console.group(t)
            }

            logGroupEnd() {
                window.console && window.console.groupEnd && window.console.groupEnd()
            }

            onAndCancel(t, e, n) {
                return t.addEventListener(e, n, !1), () => {
                    t.removeEventListener(e, n, !1)
                }
            }

            dispatchEvent(t, e) {
                t.dispatchEvent(e)
            }

            remove(t) {
                return t.parentNode && t.parentNode.removeChild(t), t
            }

            getValue(t) {
                return t.value
            }

            createElement(t, e) {
                return (e = e || this.getDefaultDocument()).createElement(t)
            }

            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }

            getDefaultDocument() {
                return document
            }

            isElementNode(t) {
                return t.nodeType === Node.ELEMENT_NODE
            }

            isShadowRoot(t) {
                return t instanceof DocumentFragment
            }

            getGlobalEventTarget(t, e) {
                return "window" === e ? window : "document" === e ? t : "body" === e ? t.body : null
            }

            getHistory() {
                return window.history
            }

            getLocation() {
                return window.location
            }

            getBaseHref(t) {
                const e = hh || (hh = document.querySelector("base"), hh) ? hh.getAttribute("href") : null;
                return null == e ? null : (n = e, ch || (ch = document.createElement("a")), ch.setAttribute("href", n), "/" === ch.pathname.charAt(0) ? ch.pathname : "/" + ch.pathname);
                var n
            }

            resetBaseElement() {
                hh = null
            }

            getUserAgent() {
                return window.navigator.userAgent
            }

            performanceNow() {
                return window.performance && window.performance.now ? window.performance.now() : (new Date).getTime()
            }

            supportsCookies() {
                return !0
            }

            getCookie(t) {
                return zc(document.cookie, t)
            }
        }

        let ch, hh = null;
        const uh = new $n("TRANSITION_ID"), dh = [{
            provide: bl, useFactory: function (t, e, n) {
                return () => {
                    n.get(vl).donePromise.then(() => {
                        const n = yc();
                        Array.prototype.slice.apply(e.querySelectorAll("style[ng-transition]")).filter(e => e.getAttribute("ng-transition") === t).forEach(t => n.remove(t))
                    })
                }
            }, deps: [uh, bc, wr], multi: !0
        }];

        class ph {
            static init() {
                var t;
                t = new ph, Yl = t
            }

            addToWindow(t) {
                Dt.getAngularTestability = (e, n = !0) => {
                    const s = t.findTestabilityInTree(e, n);
                    if (null == s) throw new Error("Could not find testability for element.");
                    return s
                }, Dt.getAllAngularTestabilities = () => t.getAllTestabilities(), Dt.getAllAngularRootElements = () => t.getAllRootElements(), Dt.frameworkStabilizers || (Dt.frameworkStabilizers = []), Dt.frameworkStabilizers.push(t => {
                    const e = Dt.getAllAngularTestabilities();
                    let n = e.length, s = !1;
                    const i = function (e) {
                        s = s || e, n--, 0 == n && t(s)
                    };
                    e.forEach((function (t) {
                        t.whenStable(i)
                    }))
                })
            }

            findTestabilityInTree(t, e, n) {
                if (null == e) return null;
                const s = t.getTestability(e);
                return null != s ? s : n ? yc().isShadowRoot(e) ? this.findTestabilityInTree(t, e.host, !0) : this.findTestabilityInTree(t, e.parentElement, !0) : null
            }
        }

        const fh = new $n("EventManagerPlugins");
        let mh = (() => {
            class t {
                constructor(t, e) {
                    this._zone = e, this._eventNameToPlugin = new Map, t.forEach(t => t.manager = this), this._plugins = t.slice().reverse()
                }

                addEventListener(t, e, n) {
                    return this._findPluginFor(e).addEventListener(t, e, n)
                }

                addGlobalEventListener(t, e, n) {
                    return this._findPluginFor(e).addGlobalEventListener(t, e, n)
                }

                getZone() {
                    return this._zone
                }

                _findPluginFor(t) {
                    const e = this._eventNameToPlugin.get(t);
                    if (e) return e;
                    const n = this._plugins;
                    for (let s = 0; s < n.length; s++) {
                        const e = n[s];
                        if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e
                    }
                    throw new Error("No event manager plugin found for event " + t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(fh), os(zl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class gh {
            constructor(t) {
                this._doc = t
            }

            addGlobalEventListener(t, e, n) {
                const s = yc().getGlobalEventTarget(this._doc, t);
                if (!s) throw new Error(`Unsupported event target ${s} for event ${e}`);
                return this.addEventListener(s, e, n)
            }
        }

        let _h = (() => {
            class t {
                constructor() {
                    this._stylesSet = new Set
                }

                addStyles(t) {
                    const e = new Set;
                    t.forEach(t => {
                        this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t))
                    }), this.onStylesAdded(e)
                }

                onStylesAdded(t) {
                }

                getAllStyles() {
                    return Array.from(this._stylesSet)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), yh = (() => {
            class t extends _h {
                constructor(t) {
                    super(), this._doc = t, this._hostNodes = new Set, this._styleNodes = new Set, this._hostNodes.add(t.head)
                }

                _addStylesToHost(t, e) {
                    t.forEach(t => {
                        const n = this._doc.createElement("style");
                        n.textContent = t, this._styleNodes.add(e.appendChild(n))
                    })
                }

                addHost(t) {
                    this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t)
                }

                removeHost(t) {
                    this._hostNodes.delete(t)
                }

                onStylesAdded(t) {
                    this._hostNodes.forEach(e => this._addStylesToHost(t, e))
                }

                ngOnDestroy() {
                    this._styleNodes.forEach(t => yc().remove(t))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const bh = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        }, vh = /%COMP%/g;

        function wh(t, e, n) {
            for (let s = 0; s < e.length; s++) {
                let i = e[s];
                Array.isArray(i) ? wh(t, i, n) : (i = i.replace(vh, t), n.push(i))
            }
            return n
        }

        function Ch(t) {
            return e => {
                if ("__ngUnwrap__" === e) return t;
                !1 === t(e) && (e.preventDefault(), e.returnValue = !1)
            }
        }

        let Sh = (() => {
            class t {
                constructor(t, e, n) {
                    this.eventManager = t, this.sharedStylesHost = e, this.appId = n, this.rendererByCompId = new Map, this.defaultRenderer = new xh(t)
                }

                createRenderer(t, e) {
                    if (!t || !e) return this.defaultRenderer;
                    switch (e.encapsulation) {
                        case Et.Emulated: {
                            let n = this.rendererByCompId.get(e.id);
                            return n || (n = new kh(this.eventManager, this.sharedStylesHost, e, this.appId), this.rendererByCompId.set(e.id, n)), n.applyToHost(t), n
                        }
                        case 1:
                        case Et.ShadowDom:
                            return new Eh(this.eventManager, this.sharedStylesHost, t, e);
                        default:
                            if (!this.rendererByCompId.has(e.id)) {
                                const t = wh(e.id, e.styles, []);
                                this.sharedStylesHost.addStyles(t), this.rendererByCompId.set(e.id, this.defaultRenderer)
                            }
                            return this.defaultRenderer
                    }
                }

                begin() {
                }

                end() {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(mh), os(yh), os(wl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class xh {
            constructor(t) {
                this.eventManager = t, this.data = Object.create(null)
            }

            destroy() {
            }

            createElement(t, e) {
                return e ? document.createElementNS(bh[e] || e, t) : document.createElement(t)
            }

            createComment(t) {
                return document.createComment(t)
            }

            createText(t) {
                return document.createTextNode(t)
            }

            appendChild(t, e) {
                t.appendChild(e)
            }

            insertBefore(t, e, n) {
                t && t.insertBefore(e, n)
            }

            removeChild(t, e) {
                t && t.removeChild(e)
            }

            selectRootElement(t, e) {
                let n = "string" == typeof t ? document.querySelector(t) : t;
                if (!n) throw new Error(`The selector "${t}" did not match any elements`);
                return e || (n.textContent = ""), n
            }

            parentNode(t) {
                return t.parentNode
            }

            nextSibling(t) {
                return t.nextSibling
            }

            setAttribute(t, e, n, s) {
                if (s) {
                    e = s + ":" + e;
                    const i = bh[s];
                    i ? t.setAttributeNS(i, e, n) : t.setAttribute(e, n)
                } else t.setAttribute(e, n)
            }

            removeAttribute(t, e, n) {
                if (n) {
                    const s = bh[n];
                    s ? t.removeAttributeNS(s, e) : t.removeAttribute(`${n}:${e}`)
                } else t.removeAttribute(e)
            }

            addClass(t, e) {
                t.classList.add(e)
            }

            removeClass(t, e) {
                t.classList.remove(e)
            }

            setStyle(t, e, n, s) {
                s & (Os.DashCase | Os.Important) ? t.style.setProperty(e, n, s & Os.Important ? "important" : "") : t.style[e] = n
            }

            removeStyle(t, e, n) {
                n & Os.DashCase ? t.style.removeProperty(e) : t.style[e] = ""
            }

            setProperty(t, e, n) {
                t[e] = n
            }

            setValue(t, e) {
                t.nodeValue = e
            }

            listen(t, e, n) {
                return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, e, Ch(n)) : this.eventManager.addEventListener(t, e, Ch(n))
            }
        }

        class kh extends xh {
            constructor(t, e, n, s) {
                super(t), this.component = n;
                const i = wh(s + "-" + n.id, n.styles, []);
                e.addStyles(i), this.contentAttr = "_ngcontent-%COMP%".replace(vh, s + "-" + n.id), this.hostAttr = function (t) {
                    return "_nghost-%COMP%".replace(vh, t)
                }(s + "-" + n.id)
            }

            applyToHost(t) {
                super.setAttribute(t, this.hostAttr, "")
            }

            createElement(t, e) {
                const n = super.createElement(t, e);
                return super.setAttribute(n, this.contentAttr, ""), n
            }
        }

        class Eh extends xh {
            constructor(t, e, n, s) {
                super(t), this.sharedStylesHost = e, this.hostEl = n, this.shadowRoot = n.attachShadow({mode: "open"}), this.sharedStylesHost.addHost(this.shadowRoot);
                const i = wh(s.id, s.styles, []);
                for (let r = 0; r < i.length; r++) {
                    const t = document.createElement("style");
                    t.textContent = i[r], this.shadowRoot.appendChild(t)
                }
            }

            nodeOrShadowRoot(t) {
                return t === this.hostEl ? this.shadowRoot : t
            }

            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }

            appendChild(t, e) {
                return super.appendChild(this.nodeOrShadowRoot(t), e)
            }

            insertBefore(t, e, n) {
                return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
            }

            removeChild(t, e) {
                return super.removeChild(this.nodeOrShadowRoot(t), e)
            }

            parentNode(t) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
            }
        }

        let Oh = (() => {
            class t extends gh {
                constructor(t) {
                    super(t)
                }

                supports(t) {
                    return !0
                }

                addEventListener(t, e, n) {
                    return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n)
                }

                removeEventListener(t, e, n) {
                    return t.removeEventListener(e, n)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Rh = ["alt", "control", "meta", "shift"], Th = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }, Ah = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "\x90": "NumLock"
        }, Dh = {alt: t => t.altKey, control: t => t.ctrlKey, meta: t => t.metaKey, shift: t => t.shiftKey};
        let Ih = (() => {
            class t extends gh {
                constructor(t) {
                    super(t)
                }

                supports(e) {
                    return null != t.parseEventName(e)
                }

                addEventListener(e, n, s) {
                    const i = t.parseEventName(n), r = t.eventCallback(i.fullKey, s, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(() => yc().onAndCancel(e, i.domEventName, r))
                }

                static parseEventName(e) {
                    const n = e.toLowerCase().split("."), s = n.shift();
                    if (0 === n.length || "keydown" !== s && "keyup" !== s) return null;
                    const i = t._normalizeKey(n.pop());
                    let r = "";
                    if (Rh.forEach(t => {
                        const e = n.indexOf(t);
                        e > -1 && (n.splice(e, 1), r += t + ".")
                    }), r += i, 0 != n.length || 0 === i.length) return null;
                    const o = {};
                    return o.domEventName = s, o.fullKey = r, o
                }

                static getEventFullKey(t) {
                    let e = "", n = function (t) {
                        let e = t.key;
                        if (null == e) {
                            if (e = t.keyIdentifier, null == e) return "Unidentified";
                            e.startsWith("U+") && (e = String.fromCharCode(parseInt(e.substring(2), 16)), 3 === t.location && Ah.hasOwnProperty(e) && (e = Ah[e]))
                        }
                        return Th[e] || e
                    }(t);
                    return n = n.toLowerCase(), " " === n ? n = "space" : "." === n && (n = "dot"), Rh.forEach(s => {
                        s != n && (0, Dh[s])(t) && (e += s + ".")
                    }), e += n, e
                }

                static eventCallback(e, n, s) {
                    return i => {
                        t.getEventFullKey(i) === e && s.runGuarded(() => n(i))
                    }
                }

                static _normalizeKey(t) {
                    switch (t) {
                        case"esc":
                            return "escape";
                        default:
                            return t
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Ph = sc(fc, "browser", [{provide: kl, useValue: "browser"}, {
            provide: xl, useValue: function () {
                lh.makeCurrent(), ph.init()
            }, multi: !0
        }, {
            provide: bc, useFactory: function () {
                return function (t) {
                    de = t
                }(document), document
            }, deps: []
        }]), Nh = [[], {provide: ar, useValue: "root"}, {
            provide: Cs, useFactory: function () {
                return new Cs
            }, deps: []
        }, {provide: fh, useClass: Oh, multi: !0, deps: [bc, zl, kl]}, {
            provide: fh,
            useClass: Ih,
            multi: !0,
            deps: [bc]
        }, [], {provide: Sh, useClass: Sh, deps: [mh, yh, wl]}, {provide: Xo, useExisting: Sh}, {
            provide: _h,
            useExisting: yh
        }, {provide: yh, useClass: yh, deps: [bc]}, {provide: Gl, useClass: Gl, deps: [zl]}, {
            provide: mh,
            useClass: mh,
            deps: [fh, zl]
        }, []];
        let Fh = (() => {
            class t {
                constructor(t) {
                    if (t) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                }

                static withServerTransition(e) {
                    return {
                        ngModule: t,
                        providers: [{provide: wl, useValue: e.appId}, {provide: uh, useExisting: wl}, dh]
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(t, 12))
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({providers: Nh, imports: [sh, gc]}), t
        })();

        function Lh(...t) {
            let e = t[t.length - 1];
            return k(e) ? (t.pop(), V(t, e)) : $(t)
        }

        "undefined" != typeof window && window;

        class Mh extends S {
            constructor(t) {
                super(), this._value = t
            }

            get value() {
                return this.getValue()
            }

            _subscribe(t) {
                const e = super._subscribe(t);
                return e && !e.closed && t.next(this._value), e
            }

            getValue() {
                if (this.hasError) throw this.thrownError;
                if (this.closed) throw new v;
                return this._value
            }

            next(t) {
                super.next(this._value = t)
            }
        }

        const Vh = {};

        function jh(...t) {
            let e = null, n = null;
            return k(t[t.length - 1]) && (n = t.pop()), "function" == typeof t[t.length - 1] && (e = t.pop()), 1 === t.length && l(t[0]) && (t = t[0]), $(t, n).lift(new zh(e))
        }

        class zh {
            constructor(t) {
                this.resultSelector = t
            }

            call(t, e) {
                return e.subscribe(new Bh(t, this.resultSelector))
            }
        }

        class Bh extends N {
            constructor(t, e) {
                super(t), this.resultSelector = e, this.active = 0, this.values = [], this.observables = []
            }

            _next(t) {
                this.values.push(Vh), this.observables.push(t)
            }

            _complete() {
                const t = this.observables, e = t.length;
                if (0 === e) this.destination.complete(); else {
                    this.active = e, this.toRespond = e;
                    for (let n = 0; n < e; n++) {
                        const e = t[n];
                        this.add(P(this, e, e, n))
                    }
                }
            }

            notifyComplete(t) {
                0 == (this.active -= 1) && this.destination.complete()
            }

            notifyNext(t, e, n, s, i) {
                const r = this.values, o = this.toRespond ? r[n] === Vh ? --this.toRespond : this.toRespond : 0;
                r[n] = e, 0 === o && (this.resultSelector ? this._tryResultSelector(r) : this.destination.next(r.slice()))
            }

            _tryResultSelector(t) {
                let e;
                try {
                    e = this.resultSelector.apply(this, t)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(e)
            }
        }

        const Hh = (() => {
            function t() {
                return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();

        function Uh(...t) {
            return U(1)(Lh(...t))
        }

        const $h = new y(t => t.complete());

        function qh(t) {
            return t ? function (t) {
                return new y(e => t.schedule(() => e.complete()))
            }(t) : $h
        }

        function Wh(t) {
            return new y(e => {
                let n;
                try {
                    n = t()
                } catch (s) {
                    return void e.error(s)
                }
                return (n ? j(n) : qh()).subscribe(e)
            })
        }

        function Gh(t, e) {
            return "function" == typeof e ? n => n.pipe(Gh((n, s) => j(t(n, s)).pipe(F((t, i) => e(n, t, s, i))))) : e => e.lift(new Kh(t))
        }

        class Kh {
            constructor(t) {
                this.project = t
            }

            call(t, e) {
                return e.subscribe(new Zh(t, this.project))
            }
        }

        class Zh extends N {
            constructor(t, e) {
                super(t), this.project = e, this.index = 0
            }

            _next(t) {
                let e;
                const n = this.index++;
                try {
                    e = this.project(t, n)
                } catch (s) {
                    return void this.destination.error(s)
                }
                this._innerSub(e, t, n)
            }

            _innerSub(t, e, n) {
                const s = this.innerSubscription;
                s && s.unsubscribe();
                const i = new E(this, e, n), r = this.destination;
                r.add(i), this.innerSubscription = P(this, t, void 0, void 0, i), this.innerSubscription !== i && r.add(this.innerSubscription)
            }

            _complete() {
                const {innerSubscription: t} = this;
                t && !t.closed || super._complete(), this.unsubscribe()
            }

            _unsubscribe() {
                this.innerSubscription = null
            }

            notifyComplete(t) {
                this.destination.remove(t), this.innerSubscription = null, this.isStopped && super._complete()
            }

            notifyNext(t, e, n, s, i) {
                this.destination.next(e)
            }
        }

        const Qh = (() => {
            function t() {
                return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();

        function Yh(t) {
            return e => 0 === t ? qh() : e.lift(new Xh(t))
        }

        class Xh {
            constructor(t) {
                if (this.total = t, this.total < 0) throw new Qh
            }

            call(t, e) {
                return e.subscribe(new Jh(t, this.total))
            }
        }

        class Jh extends f {
            constructor(t, e) {
                super(t), this.total = e, this.count = 0
            }

            _next(t) {
                const e = this.total, n = ++this.count;
                n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()))
            }
        }

        function tu(...t) {
            const e = t[t.length - 1];
            return k(e) ? (t.pop(), n => Uh(t, n, e)) : e => Uh(t, e)
        }

        function eu(t, e) {
            let n = !1;
            return arguments.length >= 2 && (n = !0), function (s) {
                return s.lift(new nu(t, e, n))
            }
        }

        class nu {
            constructor(t, e, n = !1) {
                this.accumulator = t, this.seed = e, this.hasSeed = n
            }

            call(t, e) {
                return e.subscribe(new su(t, this.accumulator, this.seed, this.hasSeed))
            }
        }

        class su extends f {
            constructor(t, e, n, s) {
                super(t), this.accumulator = e, this._seed = n, this.hasSeed = s, this.index = 0
            }

            get seed() {
                return this._seed
            }

            set seed(t) {
                this.hasSeed = !0, this._seed = t
            }

            _next(t) {
                if (this.hasSeed) return this._tryNext(t);
                this.seed = t, this.destination.next(t)
            }

            _tryNext(t) {
                const e = this.index++;
                let n;
                try {
                    n = this.accumulator(this.seed, t, e)
                } catch (s) {
                    this.destination.error(s)
                }
                this.seed = n, this.destination.next(n)
            }
        }

        function iu(t, e) {
            return function (n) {
                return n.lift(new ru(t, e))
            }
        }

        class ru {
            constructor(t, e) {
                this.predicate = t, this.thisArg = e
            }

            call(t, e) {
                return e.subscribe(new ou(t, this.predicate, this.thisArg))
            }
        }

        class ou extends f {
            constructor(t, e, n) {
                super(t), this.predicate = e, this.thisArg = n, this.count = 0
            }

            _next(t) {
                let e;
                try {
                    e = this.predicate.call(this.thisArg, t, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                e && this.destination.next(t)
            }
        }

        function au(t) {
            return function (e) {
                const n = new lu(t), s = e.lift(n);
                return n.caught = s
            }
        }

        class lu {
            constructor(t) {
                this.selector = t
            }

            call(t, e) {
                return e.subscribe(new cu(t, this.selector, this.caught))
            }
        }

        class cu extends N {
            constructor(t, e, n) {
                super(t), this.selector = e, this.caught = n
            }

            error(t) {
                if (!this.isStopped) {
                    let n;
                    try {
                        n = this.selector(t, this.caught)
                    } catch (e) {
                        return void super.error(e)
                    }
                    this._unsubscribeAndRecycle();
                    const s = new E(this, void 0, void 0);
                    this.add(s);
                    const i = P(this, n, void 0, void 0, s);
                    i !== s && this.add(i)
                }
            }
        }

        function hu(t, e) {
            return z(t, e, 1)
        }

        function uu(t) {
            return function (e) {
                return 0 === t ? qh() : e.lift(new du(t))
            }
        }

        class du {
            constructor(t) {
                if (this.total = t, this.total < 0) throw new Qh
            }

            call(t, e) {
                return e.subscribe(new pu(t, this.total))
            }
        }

        class pu extends f {
            constructor(t, e) {
                super(t), this.total = e, this.ring = new Array, this.count = 0
            }

            _next(t) {
                const e = this.ring, n = this.total, s = this.count++;
                e.length < n ? e.push(t) : e[s % n] = t
            }

            _complete() {
                const t = this.destination;
                let e = this.count;
                if (e > 0) {
                    const n = this.count >= this.total ? this.total : this.count, s = this.ring;
                    for (let i = 0; i < n; i++) {
                        const i = e++ % n;
                        t.next(s[i])
                    }
                }
                t.complete()
            }
        }

        function fu(t = _u) {
            return e => e.lift(new mu(t))
        }

        class mu {
            constructor(t) {
                this.errorFactory = t
            }

            call(t, e) {
                return e.subscribe(new gu(t, this.errorFactory))
            }
        }

        class gu extends f {
            constructor(t, e) {
                super(t), this.errorFactory = e, this.hasValue = !1
            }

            _next(t) {
                this.hasValue = !0, this.destination.next(t)
            }

            _complete() {
                if (this.hasValue) return this.destination.complete();
                {
                    let e;
                    try {
                        e = this.errorFactory()
                    } catch (t) {
                        e = t
                    }
                    this.destination.error(e)
                }
            }
        }

        function _u() {
            return new Hh
        }

        function yu(t = null) {
            return e => e.lift(new bu(t))
        }

        class bu {
            constructor(t) {
                this.defaultValue = t
            }

            call(t, e) {
                return e.subscribe(new vu(t, this.defaultValue))
            }
        }

        class vu extends f {
            constructor(t, e) {
                super(t), this.defaultValue = e, this.isEmpty = !0
            }

            _next(t) {
                this.isEmpty = !1, this.destination.next(t)
            }

            _complete() {
                this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
            }
        }

        function wu(t, e) {
            const n = arguments.length >= 2;
            return s => s.pipe(t ? iu((e, n) => t(e, n, s)) : _, Yh(1), n ? yu(e) : fu(() => new Hh))
        }

        function Cu() {
        }

        function Su(t, e, n) {
            return function (s) {
                return s.lift(new xu(t, e, n))
            }
        }

        class xu {
            constructor(t, e, n) {
                this.nextOrObserver = t, this.error = e, this.complete = n
            }

            call(t, e) {
                return e.subscribe(new ku(t, this.nextOrObserver, this.error, this.complete))
            }
        }

        class ku extends f {
            constructor(t, e, n, i) {
                super(t), this._tapNext = Cu, this._tapError = Cu, this._tapComplete = Cu, this._tapError = n || Cu, this._tapComplete = i || Cu, s(e) ? (this._context = this, this._tapNext = e) : e && (this._context = e, this._tapNext = e.next || Cu, this._tapError = e.error || Cu, this._tapComplete = e.complete || Cu)
            }

            _next(t) {
                try {
                    this._tapNext.call(this._context, t)
                } catch (e) {
                    return void this.destination.error(e)
                }
                this.destination.next(t)
            }

            _error(t) {
                try {
                    this._tapError.call(this._context, t)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.error(t)
            }

            _complete() {
                try {
                    this._tapComplete.call(this._context)
                } catch (t) {
                    return void this.destination.error(t)
                }
                return this.destination.complete()
            }
        }

        class Eu {
            constructor(t) {
                this.callback = t
            }

            call(t, e) {
                return e.subscribe(new Ou(t, this.callback))
            }
        }

        class Ou extends f {
            constructor(t, e) {
                super(t), this.add(new u(e))
            }
        }

        class Ru {
            constructor(t, e) {
                this.id = t, this.url = e
            }
        }

        class Tu extends Ru {
            constructor(t, e, n = "imperative", s = null) {
                super(t, e), this.navigationTrigger = n, this.restoredState = s
            }

            toString() {
                return `NavigationStart(id: ${this.id}, url: '${this.url}')`
            }
        }

        class Au extends Ru {
            constructor(t, e, n) {
                super(t, e), this.urlAfterRedirects = n
            }

            toString() {
                return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
            }
        }

        class Du extends Ru {
            constructor(t, e, n) {
                super(t, e), this.reason = n
            }

            toString() {
                return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
            }
        }

        class Iu extends Ru {
            constructor(t, e, n) {
                super(t, e), this.error = n
            }

            toString() {
                return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
            }
        }

        class Pu extends Ru {
            constructor(t, e, n, s) {
                super(t, e), this.urlAfterRedirects = n, this.state = s
            }

            toString() {
                return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }

        class Nu extends Ru {
            constructor(t, e, n, s) {
                super(t, e), this.urlAfterRedirects = n, this.state = s
            }

            toString() {
                return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }

        class Fu extends Ru {
            constructor(t, e, n, s, i) {
                super(t, e), this.urlAfterRedirects = n, this.state = s, this.shouldActivate = i
            }

            toString() {
                return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
            }
        }

        class Lu extends Ru {
            constructor(t, e, n, s) {
                super(t, e), this.urlAfterRedirects = n, this.state = s
            }

            toString() {
                return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }

        class Mu extends Ru {
            constructor(t, e, n, s) {
                super(t, e), this.urlAfterRedirects = n, this.state = s
            }

            toString() {
                return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }

        class Vu {
            constructor(t) {
                this.route = t
            }

            toString() {
                return `RouteConfigLoadStart(path: ${this.route.path})`
            }
        }

        class ju {
            constructor(t) {
                this.route = t
            }

            toString() {
                return `RouteConfigLoadEnd(path: ${this.route.path})`
            }
        }

        class zu {
            constructor(t) {
                this.snapshot = t
            }

            toString() {
                return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }

        class Bu {
            constructor(t) {
                this.snapshot = t
            }

            toString() {
                return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }

        class Hu {
            constructor(t) {
                this.snapshot = t
            }

            toString() {
                return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }

        class Uu {
            constructor(t) {
                this.snapshot = t
            }

            toString() {
                return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }

        class $u {
            constructor(t, e, n) {
                this.routerEvent = t, this.position = e, this.anchor = n
            }

            toString() {
                return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
            }
        }

        class qu {
            constructor(t) {
                this.params = t || {}
            }

            has(t) {
                return Object.prototype.hasOwnProperty.call(this.params, t)
            }

            get(t) {
                if (this.has(t)) {
                    const e = this.params[t];
                    return Array.isArray(e) ? e[0] : e
                }
                return null
            }

            getAll(t) {
                if (this.has(t)) {
                    const e = this.params[t];
                    return Array.isArray(e) ? e : [e]
                }
                return []
            }

            get keys() {
                return Object.keys(this.params)
            }
        }

        function Wu(t) {
            return new qu(t)
        }

        function Gu(t) {
            const e = Error("NavigationCancelingError: " + t);
            return e.ngNavigationCancelingError = !0, e
        }

        function Ku(t, e, n) {
            const s = n.path.split("/");
            if (s.length > t.length) return null;
            if ("full" === n.pathMatch && (e.hasChildren() || s.length < t.length)) return null;
            const i = {};
            for (let r = 0; r < s.length; r++) {
                const e = s[r], n = t[r];
                if (e.startsWith(":")) i[e.substring(1)] = n; else if (e !== n.path) return null
            }
            return {consumed: t.slice(0, s.length), posParams: i}
        }

        function Zu(t, e) {
            const n = t ? Object.keys(t) : void 0, s = e ? Object.keys(e) : void 0;
            if (!n || !s || n.length != s.length) return !1;
            let i;
            for (let r = 0; r < n.length; r++) if (i = n[r], !Qu(t[i], e[i])) return !1;
            return !0
        }

        function Qu(t, e) {
            if (Array.isArray(t) && Array.isArray(e)) {
                if (t.length !== e.length) return !1;
                const n = [...t].sort(), s = [...e].sort();
                return n.every((t, e) => s[e] === t)
            }
            return t === e
        }

        function Yu(t) {
            return Array.prototype.concat.apply([], t)
        }

        function Xu(t) {
            return t.length > 0 ? t[t.length - 1] : null
        }

        function Ju(t, e) {
            for (const n in t) t.hasOwnProperty(n) && e(t[n], n)
        }

        function td(t) {
            return Qr(t) ? t : Kr(t) ? j(Promise.resolve(t)) : Lh(t)
        }

        function ed(t, e, n) {
            return n ? function (t, e) {
                return Zu(t, e)
            }(t.queryParams, e.queryParams) && function t(e, n) {
                if (!rd(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const s in n.children) {
                    if (!e.children[s]) return !1;
                    if (!t(e.children[s], n.children[s])) return !1
                }
                return !0
            }(t.root, e.root) : function (t, e) {
                return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every(n => Qu(t[n], e[n]))
            }(t.queryParams, e.queryParams) && function t(e, n) {
                return function e(n, s, i) {
                    if (n.segments.length > i.length) return !!rd(n.segments.slice(0, i.length), i) && !s.hasChildren();
                    if (n.segments.length === i.length) {
                        if (!rd(n.segments, i)) return !1;
                        for (const e in s.children) {
                            if (!n.children[e]) return !1;
                            if (!t(n.children[e], s.children[e])) return !1
                        }
                        return !0
                    }
                    {
                        const t = i.slice(0, n.segments.length), r = i.slice(n.segments.length);
                        return !!rd(n.segments, t) && !!n.children.primary && e(n.children.primary, s, r)
                    }
                }(e, n, n.segments)
            }(t.root, e.root)
        }

        class nd {
            constructor(t, e, n) {
                this.root = t, this.queryParams = e, this.fragment = n
            }

            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = Wu(this.queryParams)), this._queryParamMap
            }

            toString() {
                return ld.serialize(this)
            }
        }

        class sd {
            constructor(t, e) {
                this.segments = t, this.children = e, this.parent = null, Ju(e, (t, e) => t.parent = this)
            }

            hasChildren() {
                return this.numberOfChildren > 0
            }

            get numberOfChildren() {
                return Object.keys(this.children).length
            }

            toString() {
                return cd(this)
            }
        }

        class id {
            constructor(t, e) {
                this.path = t, this.parameters = e
            }

            get parameterMap() {
                return this._parameterMap || (this._parameterMap = Wu(this.parameters)), this._parameterMap
            }

            toString() {
                return md(this)
            }
        }

        function rd(t, e) {
            return t.length === e.length && t.every((t, n) => t.path === e[n].path)
        }

        class od {
        }

        class ad {
            parse(t) {
                const e = new vd(t);
                return new nd(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment())
            }

            serialize(t) {
                return `${"/" + function t(e, n) {
                    if (!e.hasChildren()) return cd(e);
                    if (n) {
                        const n = e.children.primary ? t(e.children.primary, !1) : "", s = [];
                        return Ju(e.children, (e, n) => {
                            "primary" !== n && s.push(`${n}:${t(e, !1)}`)
                        }), s.length > 0 ? `${n}(${s.join("//")})` : n
                    }
                    {
                        const n = function (t, e) {
                            let n = [];
                            return Ju(t.children, (t, s) => {
                                "primary" === s && (n = n.concat(e(t, s)))
                            }), Ju(t.children, (t, s) => {
                                "primary" !== s && (n = n.concat(e(t, s)))
                            }), n
                        }(e, (n, s) => "primary" === s ? [t(e.children.primary, !1)] : [`${s}:${t(n, !1)}`]);
                        return 1 === Object.keys(e.children).length && null != e.children.primary ? `${cd(e)}/${n[0]}` : `${cd(e)}/(${n.join("//")})`
                    }
                }(t.root, !0)}${function (t) {
                    const e = Object.keys(t).map(e => {
                        const n = t[e];
                        return Array.isArray(n) ? n.map(t => `${ud(e)}=${ud(t)}`).join("&") : `${ud(e)}=${ud(n)}`
                    });
                    return e.length ? "?" + e.join("&") : ""
                }(t.queryParams)}${"string" == typeof t.fragment ? "#" + encodeURI(t.fragment) : ""}`
            }
        }

        const ld = new ad;

        function cd(t) {
            return t.segments.map(t => md(t)).join("/")
        }

        function hd(t) {
            return encodeURIComponent(t).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
        }

        function ud(t) {
            return hd(t).replace(/%3B/gi, ";")
        }

        function dd(t) {
            return hd(t).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
        }

        function pd(t) {
            return decodeURIComponent(t)
        }

        function fd(t) {
            return pd(t.replace(/\+/g, "%20"))
        }

        function md(t) {
            return `${dd(t.path)}${e = t.parameters, Object.keys(e).map(t => `;${dd(t)}=${dd(e[t])}`).join("")}`;
            var e
        }

        const gd = /^[^\/()?;=#]+/;

        function _d(t) {
            const e = t.match(gd);
            return e ? e[0] : ""
        }

        const yd = /^[^=?&#]+/, bd = /^[^?&#]+/;

        class vd {
            constructor(t) {
                this.url = t, this.remaining = t
            }

            parseRootSegment() {
                return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new sd([], {}) : new sd([], this.parseChildren())
            }

            parseQueryParams() {
                const t = {};
                if (this.consumeOptional("?")) do {
                    this.parseQueryParam(t)
                } while (this.consumeOptional("&"));
                return t
            }

            parseFragment() {
                return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
            }

            parseChildren() {
                if ("" === this.remaining) return {};
                this.consumeOptional("/");
                const t = [];
                for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
                let e = {};
                this.peekStartsWith("/(") && (this.capture("/"), e = this.parseParens(!0));
                let n = {};
                return this.peekStartsWith("(") && (n = this.parseParens(!1)), (t.length > 0 || Object.keys(e).length > 0) && (n.primary = new sd(t, e)), n
            }

            parseSegment() {
                const t = _d(this.remaining);
                if ("" === t && this.peekStartsWith(";")) throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
                return this.capture(t), new id(pd(t), this.parseMatrixParams())
            }

            parseMatrixParams() {
                const t = {};
                for (; this.consumeOptional(";");) this.parseParam(t);
                return t
            }

            parseParam(t) {
                const e = _d(this.remaining);
                if (!e) return;
                this.capture(e);
                let n = "";
                if (this.consumeOptional("=")) {
                    const t = _d(this.remaining);
                    t && (n = t, this.capture(n))
                }
                t[pd(e)] = pd(n)
            }

            parseQueryParam(t) {
                const e = function (t) {
                    const e = t.match(yd);
                    return e ? e[0] : ""
                }(this.remaining);
                if (!e) return;
                this.capture(e);
                let n = "";
                if (this.consumeOptional("=")) {
                    const t = function (t) {
                        const e = t.match(bd);
                        return e ? e[0] : ""
                    }(this.remaining);
                    t && (n = t, this.capture(n))
                }
                const s = fd(e), i = fd(n);
                if (t.hasOwnProperty(s)) {
                    let e = t[s];
                    Array.isArray(e) || (e = [e], t[s] = e), e.push(i)
                } else t[s] = i
            }

            parseParens(t) {
                const e = {};
                for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                    const n = _d(this.remaining), s = this.remaining[n.length];
                    if ("/" !== s && ")" !== s && ";" !== s) throw new Error(`Cannot parse url '${this.url}'`);
                    let i = void 0;
                    n.indexOf(":") > -1 ? (i = n.substr(0, n.indexOf(":")), this.capture(i), this.capture(":")) : t && (i = "primary");
                    const r = this.parseChildren();
                    e[i] = 1 === Object.keys(r).length ? r.primary : new sd([], r), this.consumeOptional("//")
                }
                return e
            }

            peekStartsWith(t) {
                return this.remaining.startsWith(t)
            }

            consumeOptional(t) {
                return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length), !0)
            }

            capture(t) {
                if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`)
            }
        }

        class wd {
            constructor(t) {
                this._root = t
            }

            get root() {
                return this._root.value
            }

            parent(t) {
                const e = this.pathFromRoot(t);
                return e.length > 1 ? e[e.length - 2] : null
            }

            children(t) {
                const e = Cd(t, this._root);
                return e ? e.children.map(t => t.value) : []
            }

            firstChild(t) {
                const e = Cd(t, this._root);
                return e && e.children.length > 0 ? e.children[0].value : null
            }

            siblings(t) {
                const e = Sd(t, this._root);
                return e.length < 2 ? [] : e[e.length - 2].children.map(t => t.value).filter(e => e !== t)
            }

            pathFromRoot(t) {
                return Sd(t, this._root).map(t => t.value)
            }
        }

        function Cd(t, e) {
            if (t === e.value) return e;
            for (const n of e.children) {
                const e = Cd(t, n);
                if (e) return e
            }
            return null
        }

        function Sd(t, e) {
            if (t === e.value) return [e];
            for (const n of e.children) {
                const s = Sd(t, n);
                if (s.length) return s.unshift(e), s
            }
            return []
        }

        class xd {
            constructor(t, e) {
                this.value = t, this.children = e
            }

            toString() {
                return `TreeNode(${this.value})`
            }
        }

        function kd(t) {
            const e = {};
            return t && t.children.forEach(t => e[t.value.outlet] = t), e
        }

        class Ed extends wd {
            constructor(t, e) {
                super(t), this.snapshot = e, Id(this, t)
            }

            toString() {
                return this.snapshot.toString()
            }
        }

        function Od(t, e) {
            const n = function (t, e) {
                    const n = new Ad([], {}, {}, "", {}, "primary", e, null, t.root, -1, {});
                    return new Dd("", new xd(n, []))
                }(t, e), s = new Mh([new id("", {})]), i = new Mh({}), r = new Mh({}), o = new Mh({}), a = new Mh(""),
                l = new Rd(s, i, o, a, r, "primary", e, n.root);
            return l.snapshot = n.root, new Ed(new xd(l, []), n)
        }

        class Rd {
            constructor(t, e, n, s, i, r, o, a) {
                this.url = t, this.params = e, this.queryParams = n, this.fragment = s, this.data = i, this.outlet = r, this.component = o, this._futureSnapshot = a
            }

            get routeConfig() {
                return this._futureSnapshot.routeConfig
            }

            get root() {
                return this._routerState.root
            }

            get parent() {
                return this._routerState.parent(this)
            }

            get firstChild() {
                return this._routerState.firstChild(this)
            }

            get children() {
                return this._routerState.children(this)
            }

            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }

            get paramMap() {
                return this._paramMap || (this._paramMap = this.params.pipe(F(t => Wu(t)))), this._paramMap
            }

            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(F(t => Wu(t)))), this._queryParamMap
            }

            toString() {
                return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
            }
        }

        function Td(t, e = "emptyOnly") {
            const n = t.pathFromRoot;
            let s = 0;
            if ("always" !== e) for (s = n.length - 1; s >= 1;) {
                const t = n[s], e = n[s - 1];
                if (t.routeConfig && "" === t.routeConfig.path) s--; else {
                    if (e.component) break;
                    s--
                }
            }
            return function (t) {
                return t.reduce((t, e) => ({
                    params: Object.assign(Object.assign({}, t.params), e.params),
                    data: Object.assign(Object.assign({}, t.data), e.data),
                    resolve: Object.assign(Object.assign({}, t.resolve), e._resolvedData)
                }), {params: {}, data: {}, resolve: {}})
            }(n.slice(s))
        }

        class Ad {
            constructor(t, e, n, s, i, r, o, a, l, c, h) {
                this.url = t, this.params = e, this.queryParams = n, this.fragment = s, this.data = i, this.outlet = r, this.component = o, this.routeConfig = a, this._urlSegment = l, this._lastPathIndex = c, this._resolve = h
            }

            get root() {
                return this._routerState.root
            }

            get parent() {
                return this._routerState.parent(this)
            }

            get firstChild() {
                return this._routerState.firstChild(this)
            }

            get children() {
                return this._routerState.children(this)
            }

            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }

            get paramMap() {
                return this._paramMap || (this._paramMap = Wu(this.params)), this._paramMap
            }

            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = Wu(this.queryParams)), this._queryParamMap
            }

            toString() {
                return `Route(url:'${this.url.map(t => t.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`
            }
        }

        class Dd extends wd {
            constructor(t, e) {
                super(e), this.url = t, Id(this, e)
            }

            toString() {
                return Pd(this._root)
            }
        }

        function Id(t, e) {
            e.value._routerState = t, e.children.forEach(e => Id(t, e))
        }

        function Pd(t) {
            const e = t.children.length > 0 ? ` { ${t.children.map(Pd).join(", ")} } ` : "";
            return `${t.value}${e}`
        }

        function Nd(t) {
            if (t.snapshot) {
                const e = t.snapshot, n = t._futureSnapshot;
                t.snapshot = n, Zu(e.queryParams, n.queryParams) || t.queryParams.next(n.queryParams), e.fragment !== n.fragment && t.fragment.next(n.fragment), Zu(e.params, n.params) || t.params.next(n.params), function (t, e) {
                    if (t.length !== e.length) return !1;
                    for (let n = 0; n < t.length; ++n) if (!Zu(t[n], e[n])) return !1;
                    return !0
                }(e.url, n.url) || t.url.next(n.url), Zu(e.data, n.data) || t.data.next(n.data)
            } else t.snapshot = t._futureSnapshot, t.data.next(t._futureSnapshot.data)
        }

        function Fd(t, e) {
            var n, s;
            return Zu(t.params, e.params) && rd(n = t.url, s = e.url) && n.every((t, e) => Zu(t.parameters, s[e].parameters)) && !(!t.parent != !e.parent) && (!t.parent || Fd(t.parent, e.parent))
        }

        function Ld(t) {
            return "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        }

        function Md(t) {
            return "object" == typeof t && null != t && t.outlets
        }

        function Vd(t, e, n, s, i) {
            let r = {};
            return s && Ju(s, (t, e) => {
                r[e] = Array.isArray(t) ? t.map(t => "" + t) : "" + t
            }), new nd(n.root === t ? e : function t(e, n, s) {
                const i = {};
                return Ju(e.children, (e, r) => {
                    i[r] = e === n ? s : t(e, n, s)
                }), new sd(e.segments, i)
            }(n.root, t, e), r, i)
        }

        class jd {
            constructor(t, e, n) {
                if (this.isAbsolute = t, this.numberOfDoubleDots = e, this.commands = n, t && n.length > 0 && Ld(n[0])) throw new Error("Root segment cannot have matrix parameters");
                const s = n.find(Md);
                if (s && s !== Xu(n)) throw new Error("{outlets:{}} has to be the last command")
            }

            toRoot() {
                return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
            }
        }

        class zd {
            constructor(t, e, n) {
                this.segmentGroup = t, this.processChildren = e, this.index = n
            }
        }

        function Bd(t, e, n) {
            if (t || (t = new sd([], {})), 0 === t.segments.length && t.hasChildren()) return Hd(t, e, n);
            const s = function (t, e, n) {
                let s = 0, i = e;
                const r = {match: !1, pathIndex: 0, commandIndex: 0};
                for (; i < t.segments.length;) {
                    if (s >= n.length) return r;
                    const e = t.segments[i], o = n[s];
                    if (Md(o)) break;
                    const a = "" + o, l = s < n.length - 1 ? n[s + 1] : null;
                    if (i > 0 && void 0 === a) break;
                    if (a && l && "object" == typeof l && void 0 === l.outlets) {
                        if (!Wd(a, l, e)) return r;
                        s += 2
                    } else {
                        if (!Wd(a, {}, e)) return r;
                        s++
                    }
                    i++
                }
                return {match: !0, pathIndex: i, commandIndex: s}
            }(t, e, n), i = n.slice(s.commandIndex);
            if (s.match && s.pathIndex < t.segments.length) {
                const e = new sd(t.segments.slice(0, s.pathIndex), {});
                return e.children.primary = new sd(t.segments.slice(s.pathIndex), t.children), Hd(e, 0, i)
            }
            return s.match && 0 === i.length ? new sd(t.segments, {}) : s.match && !t.hasChildren() ? Ud(t, e, n) : s.match ? Hd(t, 0, i) : Ud(t, e, n)
        }

        function Hd(t, e, n) {
            if (0 === n.length) return new sd(t.segments, {});
            {
                const s = function (t) {
                    return Md(t[0]) ? t[0].outlets : {primary: t}
                }(n), i = {};
                return Ju(s, (n, s) => {
                    "string" == typeof n && (n = [n]), null !== n && (i[s] = Bd(t.children[s], e, n))
                }), Ju(t.children, (t, e) => {
                    void 0 === s[e] && (i[e] = t)
                }), new sd(t.segments, i)
            }
        }

        function Ud(t, e, n) {
            const s = t.segments.slice(0, e);
            let i = 0;
            for (; i < n.length;) {
                const r = n[i];
                if (Md(r)) {
                    const t = $d(r.outlets);
                    return new sd(s, t)
                }
                if (0 === i && Ld(n[0])) {
                    s.push(new id(t.segments[e].path, qd(n[0]))), i++;
                    continue
                }
                const o = Md(r) ? r.outlets.primary : "" + r, a = i < n.length - 1 ? n[i + 1] : null;
                o && a && Ld(a) ? (s.push(new id(o, qd(a))), i += 2) : (s.push(new id(o, {})), i++)
            }
            return new sd(s, {})
        }

        function $d(t) {
            const e = {};
            return Ju(t, (t, n) => {
                "string" == typeof t && (t = [t]), null !== t && (e[n] = Ud(new sd([], {}), 0, t))
            }), e
        }

        function qd(t) {
            const e = {};
            return Ju(t, (t, n) => e[n] = "" + t), e
        }

        function Wd(t, e, n) {
            return t == n.path && Zu(e, n.parameters)
        }

        class Gd {
            constructor(t, e, n, s) {
                this.routeReuseStrategy = t, this.futureState = e, this.currState = n, this.forwardEvent = s
            }

            activate(t) {
                const e = this.futureState._root, n = this.currState ? this.currState._root : null;
                this.deactivateChildRoutes(e, n, t), Nd(this.futureState.root), this.activateChildRoutes(e, n, t)
            }

            deactivateChildRoutes(t, e, n) {
                const s = kd(e);
                t.children.forEach(t => {
                    const e = t.value.outlet;
                    this.deactivateRoutes(t, s[e], n), delete s[e]
                }), Ju(s, (t, e) => {
                    this.deactivateRouteAndItsChildren(t, n)
                })
            }

            deactivateRoutes(t, e, n) {
                const s = t.value, i = e ? e.value : null;
                if (s === i) if (s.component) {
                    const i = n.getContext(s.outlet);
                    i && this.deactivateChildRoutes(t, e, i.children)
                } else this.deactivateChildRoutes(t, e, n); else i && this.deactivateRouteAndItsChildren(e, n)
            }

            deactivateRouteAndItsChildren(t, e) {
                this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, e) : this.deactivateRouteAndOutlet(t, e)
            }

            detachAndStoreRouteSubtree(t, e) {
                const n = e.getContext(t.value.outlet);
                if (n && n.outlet) {
                    const e = n.outlet.detach(), s = n.children.onOutletDeactivated();
                    this.routeReuseStrategy.store(t.value.snapshot, {componentRef: e, route: t, contexts: s})
                }
            }

            deactivateRouteAndOutlet(t, e) {
                const n = e.getContext(t.value.outlet), s = n && t.value.component ? n.children : e, i = kd(t);
                for (const r of Object.keys(i)) this.deactivateRouteAndItsChildren(i[r], s);
                n && n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated())
            }

            activateChildRoutes(t, e, n) {
                const s = kd(e);
                t.children.forEach(t => {
                    this.activateRoutes(t, s[t.value.outlet], n), this.forwardEvent(new Uu(t.value.snapshot))
                }), t.children.length && this.forwardEvent(new Bu(t.value.snapshot))
            }

            activateRoutes(t, e, n) {
                const s = t.value, i = e ? e.value : null;
                if (Nd(s), s === i) if (s.component) {
                    const i = n.getOrCreateContext(s.outlet);
                    this.activateChildRoutes(t, e, i.children)
                } else this.activateChildRoutes(t, e, n); else if (s.component) {
                    const e = n.getOrCreateContext(s.outlet);
                    if (this.routeReuseStrategy.shouldAttach(s.snapshot)) {
                        const t = this.routeReuseStrategy.retrieve(s.snapshot);
                        this.routeReuseStrategy.store(s.snapshot, null), e.children.onOutletReAttached(t.contexts), e.attachRef = t.componentRef, e.route = t.route.value, e.outlet && e.outlet.attach(t.componentRef, t.route.value), Kd(t.route)
                    } else {
                        const n = function (t) {
                            for (let e = t.parent; e; e = e.parent) {
                                const t = e.routeConfig;
                                if (t && t._loadedConfig) return t._loadedConfig;
                                if (t && t.component) return null
                            }
                            return null
                        }(s.snapshot), i = n ? n.module.componentFactoryResolver : null;
                        e.attachRef = null, e.route = s, e.resolver = i, e.outlet && e.outlet.activateWith(s, i), this.activateChildRoutes(t, null, e.children)
                    }
                } else this.activateChildRoutes(t, null, n)
            }
        }

        function Kd(t) {
            Nd(t.value), t.children.forEach(Kd)
        }

        class Zd {
            constructor(t, e) {
                this.routes = t, this.module = e
            }
        }

        function Qd(t) {
            return "function" == typeof t
        }

        function Yd(t) {
            return t instanceof nd
        }

        const Xd = Symbol("INITIAL_VALUE");

        function Jd() {
            return Gh(t => jh(t.map(t => t.pipe(Yh(1), tu(Xd)))).pipe(eu((t, e) => {
                let n = !1;
                return e.reduce((t, s, i) => {
                    if (t !== Xd) return t;
                    if (s === Xd && (n = !0), !n) {
                        if (!1 === s) return s;
                        if (i === e.length - 1 || Yd(s)) return s
                    }
                    return t
                }, t)
            }, Xd), iu(t => t !== Xd), F(t => Yd(t) ? t : !0 === t), Yh(1)))
        }

        let tp = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = Ut({
                type: t, selectors: [["ng-component"]], decls: 1, vars: 0, template: function (t, e) {
                    1 & t && Ur(0, "router-outlet")
                }, directives: function () {
                    return [$p]
                }, encapsulation: 2
            }), t
        })();

        function ep(t, e = "") {
            for (let n = 0; n < t.length; n++) {
                const s = t[n];
                np(s, sp(e, s))
            }
        }

        function np(t, e) {
            t.children && ep(t.children, e)
        }

        function sp(t, e) {
            return e ? t || e.path ? t && !e.path ? t + "/" : !t && e.path ? e.path : `${t}/${e.path}` : "" : t
        }

        function ip(t) {
            const e = t.children && t.children.map(ip),
                n = e ? Object.assign(Object.assign({}, t), {children: e}) : Object.assign({}, t);
            return !n.component && (e || n.loadChildren) && n.outlet && "primary" !== n.outlet && (n.component = tp), n
        }

        function rp(t) {
            return t.outlet || "primary"
        }

        function op(t, e) {
            const n = t.filter(t => rp(t) === e);
            return n.push(...t.filter(t => rp(t) !== e)), n
        }

        const ap = {matched: !1, consumedSegments: [], lastChild: 0, parameters: {}, positionalParamSegments: {}};

        function lp(t, e, n) {
            var s;
            if ("" === e.path) return "full" === e.pathMatch && (t.hasChildren() || n.length > 0) ? Object.assign({}, ap) : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {}
            };
            const i = (e.matcher || Ku)(n, t, e);
            if (!i) return Object.assign({}, ap);
            const r = {};
            Ju(i.posParams, (t, e) => {
                r[e] = t.path
            });
            const o = i.consumed.length > 0 ? Object.assign(Object.assign({}, r), i.consumed[i.consumed.length - 1].parameters) : r;
            return {
                matched: !0,
                consumedSegments: i.consumed,
                lastChild: i.consumed.length,
                parameters: o,
                positionalParamSegments: null !== (s = i.posParams) && void 0 !== s ? s : {}
            }
        }

        function cp(t, e, n, s, i = "corrected") {
            if (n.length > 0 && function (t, e, n) {
                return n.some(n => hp(t, e, n) && "primary" !== rp(n))
            }(t, n, s)) {
                const i = new sd(e, function (t, e, n, s) {
                    const i = {};
                    i.primary = s, s._sourceSegment = t, s._segmentIndexShift = e.length;
                    for (const r of n) if ("" === r.path && "primary" !== rp(r)) {
                        const n = new sd([], {});
                        n._sourceSegment = t, n._segmentIndexShift = e.length, i[rp(r)] = n
                    }
                    return i
                }(t, e, s, new sd(n, t.children)));
                return i._sourceSegment = t, i._segmentIndexShift = e.length, {segmentGroup: i, slicedSegments: []}
            }
            if (0 === n.length && function (t, e, n) {
                return n.some(n => hp(t, e, n))
            }(t, n, s)) {
                const r = new sd(t.segments, function (t, e, n, s, i, r) {
                    const o = {};
                    for (const a of s) if (hp(t, n, a) && !i[rp(a)]) {
                        const n = new sd([], {});
                        n._sourceSegment = t, n._segmentIndexShift = "legacy" === r ? t.segments.length : e.length, o[rp(a)] = n
                    }
                    return Object.assign(Object.assign({}, i), o)
                }(t, e, n, s, t.children, i));
                return r._sourceSegment = t, r._segmentIndexShift = e.length, {segmentGroup: r, slicedSegments: n}
            }
            const r = new sd(t.segments, t.children);
            return r._sourceSegment = t, r._segmentIndexShift = e.length, {segmentGroup: r, slicedSegments: n}
        }

        function hp(t, e, n) {
            return (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) && "" === n.path
        }

        function up(t, e, n, s) {
            return !!(rp(t) === s || "primary" !== s && hp(e, n, t)) && ("**" === t.path || lp(e, t, n).matched)
        }

        function dp(t, e, n) {
            return 0 === e.length && !t.children[n]
        }

        class pp {
            constructor(t) {
                this.segmentGroup = t || null
            }
        }

        class fp {
            constructor(t) {
                this.urlTree = t
            }
        }

        function mp(t) {
            return new y(e => e.error(new pp(t)))
        }

        function gp(t) {
            return new y(e => e.error(new fp(t)))
        }

        function _p(t) {
            return new y(e => e.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${t}'`)))
        }

        class yp {
            constructor(t, e, n, s, i) {
                this.configLoader = e, this.urlSerializer = n, this.urlTree = s, this.config = i, this.allowRedirects = !0, this.ngModule = t.get(Da)
            }

            apply() {
                const t = cp(this.urlTree.root, [], [], this.config).segmentGroup, e = new sd(t.segments, t.children);
                return this.expandSegmentGroup(this.ngModule, this.config, e, "primary").pipe(F(t => this.createUrlTree(bp(t), this.urlTree.queryParams, this.urlTree.fragment))).pipe(au(t => {
                    if (t instanceof fp) return this.allowRedirects = !1, this.match(t.urlTree);
                    if (t instanceof pp) throw this.noMatchError(t);
                    throw t
                }))
            }

            match(t) {
                return this.expandSegmentGroup(this.ngModule, this.config, t.root, "primary").pipe(F(e => this.createUrlTree(bp(e), t.queryParams, t.fragment))).pipe(au(t => {
                    if (t instanceof pp) throw this.noMatchError(t);
                    throw t
                }))
            }

            noMatchError(t) {
                return new Error(`Cannot match any routes. URL Segment: '${t.segmentGroup}'`)
            }

            createUrlTree(t, e, n) {
                const s = t.segments.length > 0 ? new sd([], {primary: t}) : t;
                return new nd(s, e, n)
            }

            expandSegmentGroup(t, e, n, s) {
                return 0 === n.segments.length && n.hasChildren() ? this.expandChildren(t, e, n).pipe(F(t => new sd([], t))) : this.expandSegment(t, n, e, n.segments, s, !0)
            }

            expandChildren(t, e, n) {
                const s = [];
                for (const i of Object.keys(n.children)) "primary" === i ? s.unshift(i) : s.push(i);
                return j(s).pipe(hu(s => {
                    const i = n.children[s], r = op(e, s);
                    return this.expandSegmentGroup(t, r, i, s).pipe(F(t => ({segment: t, outlet: s})))
                }), eu((t, e) => (t[e.outlet] = e.segment, t), {}), function (t, e) {
                    const n = arguments.length >= 2;
                    return s => s.pipe(t ? iu((e, n) => t(e, n, s)) : _, uu(1), n ? yu(e) : fu(() => new Hh))
                }())
            }

            expandSegment(t, e, n, s, i, r) {
                return j(n).pipe(hu(o => this.expandSegmentAgainstRoute(t, e, n, o, s, i, r).pipe(au(t => {
                    if (t instanceof pp) return Lh(null);
                    throw t
                }))), wu(t => !!t), au((t, n) => {
                    if (t instanceof Hh || "EmptyError" === t.name) {
                        if (dp(e, s, i)) return Lh(new sd([], {}));
                        throw new pp(e)
                    }
                    throw t
                }))
            }

            expandSegmentAgainstRoute(t, e, n, s, i, r, o) {
                return up(s, e, i, r) ? void 0 === s.redirectTo ? this.matchSegmentAgainstRoute(t, e, s, i, r) : o && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, s, i, r) : mp(e) : mp(e)
            }

            expandSegmentAgainstRouteUsingRedirect(t, e, n, s, i, r) {
                return "**" === s.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, s, r) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, s, i, r)
            }

            expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, s) {
                const i = this.applyRedirectCommands([], n.redirectTo, {});
                return n.redirectTo.startsWith("/") ? gp(i) : this.lineralizeSegments(n, i).pipe(z(n => {
                    const i = new sd(n, {});
                    return this.expandSegment(t, i, e, n, s, !1)
                }))
            }

            expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, s, i, r) {
                const {matched: o, consumedSegments: a, lastChild: l, positionalParamSegments: c} = lp(e, s, i);
                if (!o) return mp(e);
                const h = this.applyRedirectCommands(a, s.redirectTo, c);
                return s.redirectTo.startsWith("/") ? gp(h) : this.lineralizeSegments(s, h).pipe(z(s => this.expandSegment(t, e, n, s.concat(i.slice(l)), r, !1)))
            }

            matchSegmentAgainstRoute(t, e, n, s, i) {
                if ("**" === n.path) return n.loadChildren ? (n._loadedConfig ? Lh(n._loadedConfig) : this.configLoader.load(t.injector, n)).pipe(F(t => (n._loadedConfig = t, new sd(s, {})))) : Lh(new sd(s, {}));
                const {matched: r, consumedSegments: o, lastChild: a} = lp(e, n, s);
                if (!r) return mp(e);
                const l = s.slice(a);
                return this.getChildConfig(t, n, s).pipe(z(t => {
                    const s = t.module, r = t.routes, {segmentGroup: a, slicedSegments: c} = cp(e, o, l, r),
                        h = new sd(a.segments, a.children);
                    if (0 === c.length && h.hasChildren()) return this.expandChildren(s, r, h).pipe(F(t => new sd(o, t)));
                    if (0 === r.length && 0 === c.length) return Lh(new sd(o, {}));
                    const u = rp(n) === i;
                    return this.expandSegment(s, h, r, c, u ? "primary" : i, !0).pipe(F(t => new sd(o.concat(t.segments), t.children)))
                }))
            }

            getChildConfig(t, e, n) {
                return e.children ? Lh(new Zd(e.children, t)) : e.loadChildren ? void 0 !== e._loadedConfig ? Lh(e._loadedConfig) : this.runCanLoadGuards(t.injector, e, n).pipe(z(n => n ? this.configLoader.load(t.injector, e).pipe(F(t => (e._loadedConfig = t, t))) : function (t) {
                    return new y(e => e.error(Gu(`Cannot load children because the guard of the route "path: '${t.path}'" returned false`)))
                }(e))) : Lh(new Zd([], t))
            }

            runCanLoadGuards(t, e, n) {
                const s = e.canLoad;
                return s && 0 !== s.length ? Lh(s.map(s => {
                    const i = t.get(s);
                    let r;
                    if (function (t) {
                        return t && Qd(t.canLoad)
                    }(i)) r = i.canLoad(e, n); else {
                        if (!Qd(i)) throw new Error("Invalid CanLoad guard");
                        r = i(e, n)
                    }
                    return td(r)
                })).pipe(Jd(), Su(t => {
                    if (!Yd(t)) return;
                    const e = Gu(`Redirecting to "${this.urlSerializer.serialize(t)}"`);
                    throw e.url = t, e
                }), F(t => !0 === t)) : Lh(!0)
            }

            lineralizeSegments(t, e) {
                let n = [], s = e.root;
                for (; ;) {
                    if (n = n.concat(s.segments), 0 === s.numberOfChildren) return Lh(n);
                    if (s.numberOfChildren > 1 || !s.children.primary) return _p(t.redirectTo);
                    s = s.children.primary
                }
            }

            applyRedirectCommands(t, e, n) {
                return this.applyRedirectCreatreUrlTree(e, this.urlSerializer.parse(e), t, n)
            }

            applyRedirectCreatreUrlTree(t, e, n, s) {
                const i = this.createSegmentGroup(t, e.root, n, s);
                return new nd(i, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment)
            }

            createQueryParams(t, e) {
                const n = {};
                return Ju(t, (t, s) => {
                    if ("string" == typeof t && t.startsWith(":")) {
                        const i = t.substring(1);
                        n[s] = e[i]
                    } else n[s] = t
                }), n
            }

            createSegmentGroup(t, e, n, s) {
                const i = this.createSegments(t, e.segments, n, s);
                let r = {};
                return Ju(e.children, (e, i) => {
                    r[i] = this.createSegmentGroup(t, e, n, s)
                }), new sd(i, r)
            }

            createSegments(t, e, n, s) {
                return e.map(e => e.path.startsWith(":") ? this.findPosParam(t, e, s) : this.findOrReturn(e, n))
            }

            findPosParam(t, e, n) {
                const s = n[e.path.substring(1)];
                if (!s) throw new Error(`Cannot redirect to '${t}'. Cannot find '${e.path}'.`);
                return s
            }

            findOrReturn(t, e) {
                let n = 0;
                for (const s of e) {
                    if (s.path === t.path) return e.splice(n), s;
                    n++
                }
                return t
            }
        }

        function bp(t) {
            const e = {};
            for (const n of Object.keys(t.children)) {
                const s = bp(t.children[n]);
                (s.segments.length > 0 || s.hasChildren()) && (e[n] = s)
            }
            return function (t) {
                if (1 === t.numberOfChildren && t.children.primary) {
                    const e = t.children.primary;
                    return new sd(t.segments.concat(e.segments), e.children)
                }
                return t
            }(new sd(t.segments, e))
        }

        class vp {
            constructor(t) {
                this.path = t, this.route = this.path[this.path.length - 1]
            }
        }

        class wp {
            constructor(t, e) {
                this.component = t, this.route = e
            }
        }

        function Cp(t, e, n) {
            const s = t._root;
            return function t(e, n, s, i, r = {canDeactivateChecks: [], canActivateChecks: []}) {
                const o = kd(n);
                return e.children.forEach(e => {
                    !function (e, n, s, i, r = {canDeactivateChecks: [], canActivateChecks: []}) {
                        const o = e.value, a = n ? n.value : null, l = s ? s.getContext(e.value.outlet) : null;
                        if (a && o.routeConfig === a.routeConfig) {
                            const c = function (t, e, n) {
                                if ("function" == typeof n) return n(t, e);
                                switch (n) {
                                    case"pathParamsChange":
                                        return !rd(t.url, e.url);
                                    case"pathParamsOrQueryParamsChange":
                                        return !rd(t.url, e.url) || !Zu(t.queryParams, e.queryParams);
                                    case"always":
                                        return !0;
                                    case"paramsOrQueryParamsChange":
                                        return !Fd(t, e) || !Zu(t.queryParams, e.queryParams);
                                    case"paramsChange":
                                    default:
                                        return !Fd(t, e)
                                }
                            }(a, o, o.routeConfig.runGuardsAndResolvers);
                            c ? r.canActivateChecks.push(new vp(i)) : (o.data = a.data, o._resolvedData = a._resolvedData), t(e, n, o.component ? l ? l.children : null : s, i, r), c && l && l.outlet && l.outlet.isActivated && r.canDeactivateChecks.push(new wp(l.outlet.component, a))
                        } else a && xp(n, l, r), r.canActivateChecks.push(new vp(i)), t(e, null, o.component ? l ? l.children : null : s, i, r)
                    }(e, o[e.value.outlet], s, i.concat([e.value]), r), delete o[e.value.outlet]
                }), Ju(o, (t, e) => xp(t, s.getContext(e), r)), r
            }(s, e ? e._root : null, n, [s.value])
        }

        function Sp(t, e, n) {
            const s = function (t) {
                if (!t) return null;
                for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig
                }
                return null
            }(e);
            return (s ? s.module.injector : n).get(t)
        }

        function xp(t, e, n) {
            const s = kd(t), i = t.value;
            Ju(s, (t, s) => {
                xp(t, i.component ? e ? e.children.getContext(s) : null : e, n)
            }), n.canDeactivateChecks.push(new wp(i.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null, i))
        }

        class kp {
        }

        function Ep(t) {
            return new y(e => e.error(t))
        }

        class Op {
            constructor(t, e, n, s, i, r) {
                this.rootComponentType = t, this.config = e, this.urlTree = n, this.url = s, this.paramsInheritanceStrategy = i, this.relativeLinkResolution = r
            }

            recognize() {
                const t = cp(this.urlTree.root, [], [], this.config.filter(t => void 0 === t.redirectTo), this.relativeLinkResolution).segmentGroup,
                    e = this.processSegmentGroup(this.config, t, "primary");
                if (null === e) return null;
                const n = new Ad([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, "primary", this.rootComponentType, null, this.urlTree.root, -1, {}),
                    s = new xd(n, e), i = new Dd(this.url, s);
                return this.inheritParamsAndData(i._root), i
            }

            inheritParamsAndData(t) {
                const e = t.value, n = Td(e, this.paramsInheritanceStrategy);
                e.params = Object.freeze(n.params), e.data = Object.freeze(n.data), t.children.forEach(t => this.inheritParamsAndData(t))
            }

            processSegmentGroup(t, e, n) {
                return 0 === e.segments.length && e.hasChildren() ? this.processChildren(t, e) : this.processSegment(t, e, e.segments, n)
            }

            processChildren(t, e) {
                const n = [];
                for (const i of Object.keys(e.children)) {
                    const s = e.children[i], r = op(t, i), o = this.processSegmentGroup(r, s, i);
                    if (null === o) return null;
                    n.push(...o)
                }
                const s = function (t) {
                    const e = [];
                    for (const n of t) {
                        if (!Rp(n)) {
                            e.push(n);
                            continue
                        }
                        const t = e.find(t => n.value.routeConfig === t.value.routeConfig);
                        void 0 !== t ? t.children.push(...n.children) : e.push(n)
                    }
                    return e
                }(n);
                return s.sort((t, e) => "primary" === t.value.outlet ? -1 : "primary" === e.value.outlet ? 1 : t.value.outlet.localeCompare(e.value.outlet)), s
            }

            processSegment(t, e, n, s) {
                for (const i of t) {
                    const t = this.processSegmentAgainstRoute(i, e, n, s);
                    if (null !== t) return t
                }
                return dp(e, n, s) ? [] : null
            }

            processSegmentAgainstRoute(t, e, n, s) {
                if (t.redirectTo || !up(t, e, n, s)) return null;
                let i, r = [], o = [];
                if ("**" === t.path) {
                    const s = n.length > 0 ? Xu(n).parameters : {};
                    i = new Ad(n, s, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, Dp(t), rp(t), t.component, t, Tp(e), Ap(e) + n.length, Ip(t))
                } else {
                    const s = lp(e, t, n);
                    if (!s.matched) return null;
                    r = s.consumedSegments, o = n.slice(s.lastChild), i = new Ad(r, s.parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, Dp(t), rp(t), t.component, t, Tp(e), Ap(e) + r.length, Ip(t))
                }
                const a = function (t) {
                    return t.children ? t.children : t.loadChildren ? t._loadedConfig.routes : []
                }(t), {
                    segmentGroup: l,
                    slicedSegments: c
                } = cp(e, r, o, a.filter(t => void 0 === t.redirectTo), this.relativeLinkResolution);
                if (0 === c.length && l.hasChildren()) {
                    const t = this.processChildren(a, l);
                    return null === t ? null : [new xd(i, t)]
                }
                if (0 === a.length && 0 === c.length) return [new xd(i, [])];
                const h = rp(t) === s, u = this.processSegment(a, l, c, h ? "primary" : s);
                return null === u ? null : [new xd(i, u)]
            }
        }

        function Rp(t) {
            const e = t.value.routeConfig;
            return e && "" === e.path && void 0 === e.redirectTo
        }

        function Tp(t) {
            let e = t;
            for (; e._sourceSegment;) e = e._sourceSegment;
            return e
        }

        function Ap(t) {
            let e = t, n = e._segmentIndexShift ? e._segmentIndexShift : 0;
            for (; e._sourceSegment;) e = e._sourceSegment, n += e._segmentIndexShift ? e._segmentIndexShift : 0;
            return n - 1
        }

        function Dp(t) {
            return t.data || {}
        }

        function Ip(t) {
            return t.resolve || {}
        }

        function Pp(t) {
            return Gh(e => {
                const n = t(e);
                return n ? j(n).pipe(F(() => e)) : Lh(e)
            })
        }

        class Np extends class {
            shouldDetach(t) {
                return !1
            }

            store(t, e) {
            }

            shouldAttach(t) {
                return !1
            }

            retrieve(t) {
                return null
            }

            shouldReuseRoute(t, e) {
                return t.routeConfig === e.routeConfig
            }
        } {
        }

        const Fp = new $n("ROUTES");

        class Lp {
            constructor(t, e, n, s) {
                this.loader = t, this.compiler = e, this.onLoadStartListener = n, this.onLoadEndListener = s
            }

            load(t, e) {
                if (e._loader$) return e._loader$;
                this.onLoadStartListener && this.onLoadStartListener(e);
                const n = this.loadModuleFactory(e.loadChildren).pipe(F(n => {
                    this.onLoadEndListener && this.onLoadEndListener(e);
                    const s = n.create(t);
                    return new Zd(Yu(s.injector.get(Fp, void 0, vt.Self | vt.Optional)).map(ip), s)
                }), au(t => {
                    throw e._loader$ = void 0, t
                }));
                return e._loader$ = new Z(n, () => new S).pipe(W()), e._loader$
            }

            loadModuleFactory(t) {
                return "string" == typeof t ? j(this.loader.load(t)) : td(t()).pipe(z(t => t instanceof Ia ? Lh(t) : j(this.compiler.compileModuleAsync(t))))
            }
        }

        class Mp {
            constructor() {
                this.outlet = null, this.route = null, this.resolver = null, this.children = new Vp, this.attachRef = null
            }
        }

        class Vp {
            constructor() {
                this.contexts = new Map
            }

            onChildOutletCreated(t, e) {
                const n = this.getOrCreateContext(t);
                n.outlet = e, this.contexts.set(t, n)
            }

            onChildOutletDestroyed(t) {
                const e = this.getContext(t);
                e && (e.outlet = null)
            }

            onOutletDeactivated() {
                const t = this.contexts;
                return this.contexts = new Map, t
            }

            onOutletReAttached(t) {
                this.contexts = t
            }

            getOrCreateContext(t) {
                let e = this.getContext(t);
                return e || (e = new Mp, this.contexts.set(t, e)), e
            }

            getContext(t) {
                return this.contexts.get(t) || null
            }
        }

        class jp {
            shouldProcessUrl(t) {
                return !0
            }

            extract(t) {
                return t
            }

            merge(t, e) {
                return t
            }
        }

        function zp(t) {
            throw t
        }

        function Bp(t, e, n) {
            return e.parse("/")
        }

        function Hp(t, e) {
            return Lh(null)
        }

        let Up = (() => {
            class t {
                constructor(t, e, n, s, i, r, o, a) {
                    this.rootComponentType = t, this.urlSerializer = e, this.rootContexts = n, this.location = s, this.config = a, this.lastSuccessfulNavigation = null, this.currentNavigation = null, this.disposed = !1, this.lastLocationChangeInfo = null, this.navigationId = 0, this.isNgZoneEnabled = !1, this.events = new S, this.errorHandler = zp, this.malformedUriErrorHandler = Bp, this.navigated = !1, this.lastSuccessfulId = -1, this.hooks = {
                        beforePreactivation: Hp,
                        afterPreactivation: Hp
                    }, this.urlHandlingStrategy = new jp, this.routeReuseStrategy = new Np, this.onSameUrlNavigation = "ignore", this.paramsInheritanceStrategy = "emptyOnly", this.urlUpdateStrategy = "deferred", this.relativeLinkResolution = "corrected", this.ngModule = i.get(Da), this.console = i.get(Ol);
                    const l = i.get(zl);
                    this.isNgZoneEnabled = l instanceof zl && zl.isInAngularZone(), this.resetConfig(a), this.currentUrlTree = new nd(new sd([], {}), {}, null), this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.configLoader = new Lp(r, o, t => this.triggerEvent(new Vu(t)), t => this.triggerEvent(new ju(t))), this.routerState = Od(this.currentUrlTree, this.rootComponentType), this.transitions = new Mh({
                        id: 0,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                        urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                        rawUrl: this.currentUrlTree,
                        extras: {},
                        resolve: null,
                        reject: null,
                        promise: Promise.resolve(!0),
                        source: "imperative",
                        restoredState: null,
                        currentSnapshot: this.routerState.snapshot,
                        targetSnapshot: null,
                        currentRouterState: this.routerState,
                        targetRouterState: null,
                        guards: {canActivateChecks: [], canDeactivateChecks: []},
                        guardsResult: null
                    }), this.navigations = this.setupNavigations(this.transitions), this.processNavigations()
                }

                setupNavigations(t) {
                    const e = this.events;
                    return t.pipe(iu(t => 0 !== t.id), F(t => Object.assign(Object.assign({}, t), {extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl)})), Gh(t => {
                        let n = !1, s = !1;
                        return Lh(t).pipe(Su(t => {
                            this.currentNavigation = {
                                id: t.id,
                                initialUrl: t.currentRawUrl,
                                extractedUrl: t.extractedUrl,
                                trigger: t.source,
                                extras: t.extras,
                                previousNavigation: this.lastSuccessfulNavigation ? Object.assign(Object.assign({}, this.lastSuccessfulNavigation), {previousNavigation: null}) : null
                            }
                        }), Gh(t => {
                            const n = !this.navigated || t.extractedUrl.toString() !== this.browserUrlTree.toString();
                            if (("reload" === this.onSameUrlNavigation || n) && this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) return Lh(t).pipe(Gh(t => {
                                const n = this.transitions.getValue();
                                return e.next(new Tu(t.id, this.serializeUrl(t.extractedUrl), t.source, t.restoredState)), n !== this.transitions.getValue() ? $h : Promise.resolve(t)
                            }), (s = this.ngModule.injector, i = this.configLoader, r = this.urlSerializer, o = this.config, Gh(t => function (t, e, n, s, i) {
                                return new yp(t, e, n, s, i).apply()
                            }(s, i, r, t.extractedUrl, o).pipe(F(e => Object.assign(Object.assign({}, t), {urlAfterRedirects: e}))))), Su(t => {
                                this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), {finalUrl: t.urlAfterRedirects})
                            }), function (t, e, n, s, i) {
                                return z(r => function (t, e, n, s, i = "emptyOnly", r = "legacy") {
                                    try {
                                        const o = new Op(t, e, n, s, i, r).recognize();
                                        return null === o ? Ep(new kp) : Lh(o)
                                    } catch (o) {
                                        return Ep(o)
                                    }
                                }(t, e, r.urlAfterRedirects, n(r.urlAfterRedirects), s, i).pipe(F(t => Object.assign(Object.assign({}, r), {targetSnapshot: t}))))
                            }(this.rootComponentType, this.config, t => this.serializeUrl(t), this.paramsInheritanceStrategy, this.relativeLinkResolution), Su(t => {
                                "eager" === this.urlUpdateStrategy && (t.extras.skipLocationChange || this.setBrowserUrl(t.urlAfterRedirects, !!t.extras.replaceUrl, t.id, t.extras.state), this.browserUrlTree = t.urlAfterRedirects);
                                const n = new Pu(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                                e.next(n)
                            }));
                            var s, i, r, o;
                            if (n && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                                const {id: n, extractedUrl: s, source: i, restoredState: r, extras: o} = t,
                                    a = new Tu(n, this.serializeUrl(s), i, r);
                                e.next(a);
                                const l = Od(s, this.rootComponentType).snapshot;
                                return Lh(Object.assign(Object.assign({}, t), {
                                    targetSnapshot: l,
                                    urlAfterRedirects: s,
                                    extras: Object.assign(Object.assign({}, o), {
                                        skipLocationChange: !1,
                                        replaceUrl: !1
                                    })
                                }))
                            }
                            return this.rawUrlTree = t.rawUrl, this.browserUrlTree = t.urlAfterRedirects, t.resolve(null), $h
                        }), Pp(t => {
                            const {
                                targetSnapshot: e,
                                id: n,
                                extractedUrl: s,
                                rawUrl: i,
                                extras: {skipLocationChange: r, replaceUrl: o}
                            } = t;
                            return this.hooks.beforePreactivation(e, {
                                navigationId: n,
                                appliedUrlTree: s,
                                rawUrlTree: i,
                                skipLocationChange: !!r,
                                replaceUrl: !!o
                            })
                        }), Su(t => {
                            const e = new Nu(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                            this.triggerEvent(e)
                        }), F(t => Object.assign(Object.assign({}, t), {guards: Cp(t.targetSnapshot, t.currentSnapshot, this.rootContexts)})), function (t, e) {
                            return z(n => {
                                const {
                                    targetSnapshot: s,
                                    currentSnapshot: i,
                                    guards: {canActivateChecks: r, canDeactivateChecks: o}
                                } = n;
                                return 0 === o.length && 0 === r.length ? Lh(Object.assign(Object.assign({}, n), {guardsResult: !0})) : function (t, e, n, s) {
                                    return j(t).pipe(z(t => function (t, e, n, s, i) {
                                        const r = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
                                        return r && 0 !== r.length ? Lh(r.map(r => {
                                            const o = Sp(r, e, i);
                                            let a;
                                            if (function (t) {
                                                return t && Qd(t.canDeactivate)
                                            }(o)) a = td(o.canDeactivate(t, e, n, s)); else {
                                                if (!Qd(o)) throw new Error("Invalid CanDeactivate guard");
                                                a = td(o(t, e, n, s))
                                            }
                                            return a.pipe(wu())
                                        })).pipe(Jd()) : Lh(!0)
                                    }(t.component, t.route, n, e, s)), wu(t => !0 !== t, !0))
                                }(o, s, i, t).pipe(z(n => n && "boolean" == typeof n ? function (t, e, n, s) {
                                    return j(e).pipe(hu(e => Uh(function (t, e) {
                                        return null !== t && e && e(new zu(t)), Lh(!0)
                                    }(e.route.parent, s), function (t, e) {
                                        return null !== t && e && e(new Hu(t)), Lh(!0)
                                    }(e.route, s), function (t, e, n) {
                                        const s = e[e.length - 1],
                                            i = e.slice(0, e.length - 1).reverse().map(t => function (t) {
                                                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                                                return e && 0 !== e.length ? {node: t, guards: e} : null
                                            }(t)).filter(t => null !== t).map(e => Wh(() => Lh(e.guards.map(i => {
                                                const r = Sp(i, e.node, n);
                                                let o;
                                                if (function (t) {
                                                    return t && Qd(t.canActivateChild)
                                                }(r)) o = td(r.canActivateChild(s, t)); else {
                                                    if (!Qd(r)) throw new Error("Invalid CanActivateChild guard");
                                                    o = td(r(s, t))
                                                }
                                                return o.pipe(wu())
                                            })).pipe(Jd())));
                                        return Lh(i).pipe(Jd())
                                    }(t, e.path, n), function (t, e, n) {
                                        const s = e.routeConfig ? e.routeConfig.canActivate : null;
                                        return s && 0 !== s.length ? Lh(s.map(s => Wh(() => {
                                            const i = Sp(s, e, n);
                                            let r;
                                            if (function (t) {
                                                return t && Qd(t.canActivate)
                                            }(i)) r = td(i.canActivate(e, t)); else {
                                                if (!Qd(i)) throw new Error("Invalid CanActivate guard");
                                                r = td(i(e, t))
                                            }
                                            return r.pipe(wu())
                                        }))).pipe(Jd()) : Lh(!0)
                                    }(t, e.route, n))), wu(t => !0 !== t, !0))
                                }(s, r, t, e) : Lh(n)), F(t => Object.assign(Object.assign({}, n), {guardsResult: t})))
                            })
                        }(this.ngModule.injector, t => this.triggerEvent(t)), Su(t => {
                            if (Yd(t.guardsResult)) {
                                const e = Gu(`Redirecting to "${this.serializeUrl(t.guardsResult)}"`);
                                throw e.url = t.guardsResult, e
                            }
                            const e = new Fu(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                            this.triggerEvent(e)
                        }), iu(t => {
                            if (!t.guardsResult) {
                                this.resetUrlToCurrentUrlTree();
                                const n = new Du(t.id, this.serializeUrl(t.extractedUrl), "");
                                return e.next(n), t.resolve(!1), !1
                            }
                            return !0
                        }), Pp(t => {
                            if (t.guards.canActivateChecks.length) return Lh(t).pipe(Su(t => {
                                const e = new Lu(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                                this.triggerEvent(e)
                            }), Gh(t => {
                                let n = !1;
                                return Lh(t).pipe((s = this.paramsInheritanceStrategy, i = this.ngModule.injector, z(t => {
                                    const {targetSnapshot: e, guards: {canActivateChecks: n}} = t;
                                    if (!n.length) return Lh(t);
                                    let r = 0;
                                    return j(n).pipe(hu(t => function (t, e, n, s) {
                                        return function (t, e, n, s) {
                                            const i = Object.keys(t);
                                            if (0 === i.length) return Lh({});
                                            const r = {};
                                            return j(i).pipe(z(i => function (t, e, n, s) {
                                                const i = Sp(t, e, s);
                                                return td(i.resolve ? i.resolve(e, n) : i(e, n))
                                            }(t[i], e, n, s).pipe(Su(t => {
                                                r[i] = t
                                            }))), uu(1), z(() => Object.keys(r).length === i.length ? Lh(r) : $h))
                                        }(t._resolve, t, e, s).pipe(F(e => (t._resolvedData = e, t.data = Object.assign(Object.assign({}, t.data), Td(t, n).resolve), null)))
                                    }(t.route, e, s, i)), Su(() => r++), uu(1), z(e => r === n.length ? Lh(t) : $h))
                                })), Su({
                                    next: () => n = !0, complete: () => {
                                        if (!n) {
                                            const n = new Du(t.id, this.serializeUrl(t.extractedUrl), "At least one route resolver didn't emit any value.");
                                            e.next(n), t.resolve(!1)
                                        }
                                    }
                                }));
                                var s, i
                            }), Su(t => {
                                const e = new Mu(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                                this.triggerEvent(e)
                            }))
                        }), Pp(t => {
                            const {
                                targetSnapshot: e,
                                id: n,
                                extractedUrl: s,
                                rawUrl: i,
                                extras: {skipLocationChange: r, replaceUrl: o}
                            } = t;
                            return this.hooks.afterPreactivation(e, {
                                navigationId: n,
                                appliedUrlTree: s,
                                rawUrlTree: i,
                                skipLocationChange: !!r,
                                replaceUrl: !!o
                            })
                        }), F(t => {
                            const e = function (t, e, n) {
                                const s = function t(e, n, s) {
                                    if (s && e.shouldReuseRoute(n.value, s.value.snapshot)) {
                                        const i = s.value;
                                        i._futureSnapshot = n.value;
                                        const r = function (e, n, s) {
                                            return n.children.map(n => {
                                                for (const i of s.children) if (e.shouldReuseRoute(n.value, i.value.snapshot)) return t(e, n, i);
                                                return t(e, n)
                                            })
                                        }(e, n, s);
                                        return new xd(i, r)
                                    }
                                    {
                                        const s = e.retrieve(n.value);
                                        if (s) {
                                            const t = s.route;
                                            return function t(e, n) {
                                                if (e.value.routeConfig !== n.value.routeConfig) throw new Error("Cannot reattach ActivatedRouteSnapshot created from a different route");
                                                if (e.children.length !== n.children.length) throw new Error("Cannot reattach ActivatedRouteSnapshot with a different number of children");
                                                n.value._futureSnapshot = e.value;
                                                for (let s = 0; s < e.children.length; ++s) t(e.children[s], n.children[s])
                                            }(n, t), t
                                        }
                                        {
                                            const s = new Rd(new Mh((i = n.value).url), new Mh(i.params), new Mh(i.queryParams), new Mh(i.fragment), new Mh(i.data), i.outlet, i.component, i),
                                                r = n.children.map(n => t(e, n));
                                            return new xd(s, r)
                                        }
                                    }
                                    var i
                                }(t, e._root, n ? n._root : void 0);
                                return new Ed(s, e)
                            }(this.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                            return Object.assign(Object.assign({}, t), {targetRouterState: e})
                        }), Su(t => {
                            this.currentUrlTree = t.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl), this.routerState = t.targetRouterState, "deferred" === this.urlUpdateStrategy && (t.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, !!t.extras.replaceUrl, t.id, t.extras.state), this.browserUrlTree = t.urlAfterRedirects)
                        }), (r = this.rootContexts, o = this.routeReuseStrategy, a = t => this.triggerEvent(t), F(t => (new Gd(o, t.targetRouterState, t.currentRouterState, a).activate(r), t))), Su({
                            next() {
                                n = !0
                            }, complete() {
                                n = !0
                            }
                        }), (i = () => {
                            if (!n && !s) {
                                this.resetUrlToCurrentUrlTree();
                                const n = new Du(t.id, this.serializeUrl(t.extractedUrl), `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`);
                                e.next(n), t.resolve(!1)
                            }
                            this.currentNavigation = null
                        }, t => t.lift(new Eu(i))), au(n => {
                            if (s = !0, (i = n) && i.ngNavigationCancelingError) {
                                const s = Yd(n.url);
                                s || (this.navigated = !0, this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl));
                                const i = new Du(t.id, this.serializeUrl(t.extractedUrl), n.message);
                                e.next(i), s ? setTimeout(() => {
                                    const e = this.urlHandlingStrategy.merge(n.url, this.rawUrlTree);
                                    this.scheduleNavigation(e, "imperative", null, {
                                        skipLocationChange: t.extras.skipLocationChange,
                                        replaceUrl: "eager" === this.urlUpdateStrategy
                                    }, {resolve: t.resolve, reject: t.reject, promise: t.promise})
                                }, 0) : t.resolve(!1)
                            } else {
                                this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                                const s = new Iu(t.id, this.serializeUrl(t.extractedUrl), n);
                                e.next(s);
                                try {
                                    t.resolve(this.errorHandler(n))
                                } catch (r) {
                                    t.reject(r)
                                }
                            }
                            var i;
                            return $h
                        }));
                        var i, r, o, a
                    }))
                }

                resetRootComponentType(t) {
                    this.rootComponentType = t, this.routerState.root.component = this.rootComponentType
                }

                getTransition() {
                    const t = this.transitions.value;
                    return t.urlAfterRedirects = this.browserUrlTree, t
                }

                setTransition(t) {
                    this.transitions.next(Object.assign(Object.assign({}, this.getTransition()), t))
                }

                initialNavigation() {
                    this.setUpLocationChangeListener(), 0 === this.navigationId && this.navigateByUrl(this.location.path(!0), {replaceUrl: !0})
                }

                setUpLocationChangeListener() {
                    this.locationSubscription || (this.locationSubscription = this.location.subscribe(t => {
                        const e = this.extractLocationChangeInfoFromEvent(t);
                        this.shouldScheduleNavigation(this.lastLocationChangeInfo, e) && setTimeout(() => {
                            const {source: t, state: n, urlTree: s} = e, i = {replaceUrl: !0};
                            if (n) {
                                const t = Object.assign({}, n);
                                delete t.navigationId, 0 !== Object.keys(t).length && (i.state = t)
                            }
                            this.scheduleNavigation(s, t, n, i)
                        }, 0), this.lastLocationChangeInfo = e
                    }))
                }

                extractLocationChangeInfoFromEvent(t) {
                    var e;
                    return {
                        source: "popstate" === t.type ? "popstate" : "hashchange",
                        urlTree: this.parseUrl(t.url),
                        state: (null === (e = t.state) || void 0 === e ? void 0 : e.navigationId) ? t.state : null,
                        transitionId: this.getTransition().id
                    }
                }

                shouldScheduleNavigation(t, e) {
                    if (!t) return !0;
                    const n = e.urlTree.toString() === t.urlTree.toString();
                    return !(e.transitionId === t.transitionId && n && ("hashchange" === e.source && "popstate" === t.source || "popstate" === e.source && "hashchange" === t.source))
                }

                get url() {
                    return this.serializeUrl(this.currentUrlTree)
                }

                getCurrentNavigation() {
                    return this.currentNavigation
                }

                triggerEvent(t) {
                    this.events.next(t)
                }

                resetConfig(t) {
                    ep(t), this.config = t.map(ip), this.navigated = !1, this.lastSuccessfulId = -1
                }

                ngOnDestroy() {
                    this.dispose()
                }

                dispose() {
                    this.transitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0
                }

                createUrlTree(t, e = {}) {
                    const {relativeTo: n, queryParams: s, fragment: i, queryParamsHandling: r, preserveFragment: o} = e,
                        a = n || this.routerState.root, l = o ? this.currentUrlTree.fragment : i;
                    let c = null;
                    switch (r) {
                        case"merge":
                            c = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), s);
                            break;
                        case"preserve":
                            c = this.currentUrlTree.queryParams;
                            break;
                        default:
                            c = s || null
                    }
                    return null !== c && (c = this.removeEmptyProps(c)), function (t, e, n, s, i) {
                        if (0 === n.length) return Vd(e.root, e.root, e, s, i);
                        const r = function (t) {
                            if ("string" == typeof t[0] && 1 === t.length && "/" === t[0]) return new jd(!0, 0, t);
                            let e = 0, n = !1;
                            const s = t.reduce((t, s, i) => {
                                if ("object" == typeof s && null != s) {
                                    if (s.outlets) {
                                        const e = {};
                                        return Ju(s.outlets, (t, n) => {
                                            e[n] = "string" == typeof t ? t.split("/") : t
                                        }), [...t, {outlets: e}]
                                    }
                                    if (s.segmentPath) return [...t, s.segmentPath]
                                }
                                return "string" != typeof s ? [...t, s] : 0 === i ? (s.split("/").forEach((s, i) => {
                                    0 == i && "." === s || (0 == i && "" === s ? n = !0 : ".." === s ? e++ : "" != s && t.push(s))
                                }), t) : [...t, s]
                            }, []);
                            return new jd(n, e, s)
                        }(n);
                        if (r.toRoot()) return Vd(e.root, new sd([], {}), e, s, i);
                        const o = function (t, e, n) {
                                if (t.isAbsolute) return new zd(e.root, !0, 0);
                                if (-1 === n.snapshot._lastPathIndex) {
                                    const t = n.snapshot._urlSegment;
                                    return new zd(t, t === e.root, 0)
                                }
                                const s = Ld(t.commands[0]) ? 0 : 1;
                                return function (t, e, n) {
                                    let s = t, i = e, r = n;
                                    for (; r > i;) {
                                        if (r -= i, s = s.parent, !s) throw new Error("Invalid number of '../'");
                                        i = s.segments.length
                                    }
                                    return new zd(s, !1, i - r)
                                }(n.snapshot._urlSegment, n.snapshot._lastPathIndex + s, t.numberOfDoubleDots)
                            }(r, e, t),
                            a = o.processChildren ? Hd(o.segmentGroup, o.index, r.commands) : Bd(o.segmentGroup, o.index, r.commands);
                        return Vd(o.segmentGroup, a, e, s, i)
                    }(a, this.currentUrlTree, t, c, l)
                }

                navigateByUrl(t, e = {skipLocationChange: !1}) {
                    const n = Yd(t) ? t : this.parseUrl(t), s = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
                    return this.scheduleNavigation(s, "imperative", null, e)
                }

                navigate(t, e = {skipLocationChange: !1}) {
                    return function (t) {
                        for (let e = 0; e < t.length; e++) {
                            const n = t[e];
                            if (null == n) throw new Error(`The requested path contains ${n} segment at index ${e}`)
                        }
                    }(t), this.navigateByUrl(this.createUrlTree(t, e), e)
                }

                serializeUrl(t) {
                    return this.urlSerializer.serialize(t)
                }

                parseUrl(t) {
                    let e;
                    try {
                        e = this.urlSerializer.parse(t)
                    } catch (n) {
                        e = this.malformedUriErrorHandler(n, this.urlSerializer, t)
                    }
                    return e
                }

                isActive(t, e) {
                    if (Yd(t)) return ed(this.currentUrlTree, t, e);
                    const n = this.parseUrl(t);
                    return ed(this.currentUrlTree, n, e)
                }

                removeEmptyProps(t) {
                    return Object.keys(t).reduce((e, n) => {
                        const s = t[n];
                        return null != s && (e[n] = s), e
                    }, {})
                }

                processNavigations() {
                    this.navigations.subscribe(t => {
                        this.navigated = !0, this.lastSuccessfulId = t.id, this.events.next(new Au(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree))), this.lastSuccessfulNavigation = this.currentNavigation, this.currentNavigation = null, t.resolve(!0)
                    }, t => {
                        this.console.warn("Unhandled Navigation Error: ")
                    })
                }

                scheduleNavigation(t, e, n, s, i) {
                    if (this.disposed) return Promise.resolve(!1);
                    const r = this.getTransition(),
                        o = "imperative" !== e && "imperative" === (null == r ? void 0 : r.source),
                        a = (this.lastSuccessfulId === r.id || this.currentNavigation ? r.rawUrl : r.urlAfterRedirects).toString() === t.toString();
                    if (o && a) return Promise.resolve(!0);
                    let l, c, h;
                    i ? (l = i.resolve, c = i.reject, h = i.promise) : h = new Promise((t, e) => {
                        l = t, c = e
                    });
                    const u = ++this.navigationId;
                    return this.setTransition({
                        id: u,
                        source: e,
                        restoredState: n,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.rawUrlTree,
                        rawUrl: t,
                        extras: s,
                        resolve: l,
                        reject: c,
                        promise: h,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState
                    }), h.catch(t => Promise.reject(t))
                }

                setBrowserUrl(t, e, n, s) {
                    const i = this.urlSerializer.serialize(t);
                    s = s || {}, this.location.isCurrentPathEqualTo(i) || e ? this.location.replaceState(i, "", Object.assign(Object.assign({}, s), {navigationId: n})) : this.location.go(i, "", Object.assign(Object.assign({}, s), {navigationId: n}))
                }

                resetStateAndUrl(t, e, n) {
                    this.routerState = t, this.currentUrlTree = e, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n), this.resetUrlToCurrentUrlTree()
                }

                resetUrlToCurrentUrlTree() {
                    this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", {navigationId: this.lastSuccessfulId})
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Wn), os(od), os(Vp), os(Nc), os(wr), os(cc), os(Ml), os(void 0))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), $p = (() => {
            class t {
                constructor(t, e, n, s, i) {
                    this.parentContexts = t, this.location = e, this.resolver = n, this.changeDetector = i, this.activated = null, this._activatedRoute = null, this.activateEvents = new el, this.deactivateEvents = new el, this.name = s || "primary", t.onChildOutletCreated(this.name, this)
                }

                ngOnDestroy() {
                    this.parentContexts.onChildOutletDestroyed(this.name)
                }

                ngOnInit() {
                    if (!this.activated) {
                        const t = this.parentContexts.getContext(this.name);
                        t && t.route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.resolver || null))
                    }
                }

                get isActivated() {
                    return !!this.activated
                }

                get component() {
                    if (!this.activated) throw new Error("Outlet is not activated");
                    return this.activated.instance
                }

                get activatedRoute() {
                    if (!this.activated) throw new Error("Outlet is not activated");
                    return this._activatedRoute
                }

                get activatedRouteData() {
                    return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                }

                detach() {
                    if (!this.activated) throw new Error("Outlet is not activated");
                    this.location.detach();
                    const t = this.activated;
                    return this.activated = null, this._activatedRoute = null, t
                }

                attach(t, e) {
                    this.activated = t, this._activatedRoute = e, this.location.insert(t.hostView)
                }

                deactivate() {
                    if (this.activated) {
                        const t = this.component;
                        this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(t)
                    }
                }

                activateWith(t, e) {
                    if (this.isActivated) throw new Error("Cannot activate an already activated outlet");
                    this._activatedRoute = t;
                    const n = (e = e || this.resolver).resolveComponentFactory(t._futureSnapshot.routeConfig.component),
                        s = this.parentContexts.getOrCreateContext(this.name).children,
                        i = new qp(t, s, this.location.injector);
                    this.activated = this.location.createComponent(n, this.location.length, i), this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Vp), Vr(Na), Vr(Wo), Hn("name"), Vr(wa))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["router-outlet"]],
                outputs: {activateEvents: "activate", deactivateEvents: "deactivate"},
                exportAs: ["outlet"]
            }), t
        })();

        class qp {
            constructor(t, e, n) {
                this.route = t, this.childContexts = e, this.parent = n
            }

            get(t, e) {
                return t === Rd ? this.route : t === Vp ? this.childContexts : this.parent.get(t, e)
            }
        }

        class Wp {
        }

        class Gp {
            preload(t, e) {
                return Lh(null)
            }
        }

        let Kp = (() => {
            class t {
                constructor(t, e, n, s, i) {
                    this.router = t, this.injector = s, this.preloadingStrategy = i, this.loader = new Lp(e, n, e => t.triggerEvent(new Vu(e)), e => t.triggerEvent(new ju(e)))
                }

                setUpPreloading() {
                    this.subscription = this.router.events.pipe(iu(t => t instanceof Au), hu(() => this.preload())).subscribe(() => {
                    })
                }

                preload() {
                    const t = this.injector.get(Da);
                    return this.processRoutes(t, this.router.config)
                }

                ngOnDestroy() {
                    this.subscription && this.subscription.unsubscribe()
                }

                processRoutes(t, e) {
                    const n = [];
                    for (const s of e) if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                        const t = s._loadedConfig;
                        n.push(this.processRoutes(t.module, t.routes))
                    } else s.loadChildren && !s.canLoad ? n.push(this.preloadConfig(t, s)) : s.children && n.push(this.processRoutes(t, s.children));
                    return j(n).pipe(U(), F(t => {
                    }))
                }

                preloadConfig(t, e) {
                    return this.preloadingStrategy.preload(e, () => (e._loadedConfig ? Lh(e._loadedConfig) : this.loader.load(t.injector, e)).pipe(z(t => (e._loadedConfig = t, this.processRoutes(t.module, t.routes)))))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Up), os(cc), os(Ml), os(wr), os(Wp))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Zp = (() => {
            class t {
                constructor(t, e, n = {}) {
                    this.router = t, this.viewportScroller = e, this.options = n, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, n.scrollPositionRestoration = n.scrollPositionRestoration || "disabled", n.anchorScrolling = n.anchorScrolling || "disabled"
                }

                init() {
                    "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
                }

                createScrollEvents() {
                    return this.router.events.subscribe(t => {
                        t instanceof Tu ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = t.navigationTrigger, this.restoredId = t.restoredState ? t.restoredState.navigationId : 0) : t instanceof Au && (this.lastId = t.id, this.scheduleScrollEvent(t, this.router.parseUrl(t.urlAfterRedirects).fragment))
                    })
                }

                consumeScrollEvents() {
                    return this.router.events.subscribe(t => {
                        t instanceof $u && (t.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position) : t.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(t.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                    })
                }

                scheduleScrollEvent(t, e) {
                    this.router.triggerEvent(new $u(t, "popstate" === this.lastSource ? this.store[this.restoredId] : null, e))
                }

                ngOnDestroy() {
                    this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(), this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Up), os(rh), os(void 0))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Qp = new $n("ROUTER_CONFIGURATION"), Yp = new $n("ROUTER_FORROOT_GUARD"),
            Xp = [Nc, {provide: od, useClass: ad}, {
                provide: Up,
                useFactory: function (t, e, n, s, i, r, o, a = {}, l, c) {
                    const h = new Up(null, t, e, n, s, i, r, Yu(o));
                    if (l && (h.urlHandlingStrategy = l), c && (h.routeReuseStrategy = c), function (t, e) {
                        t.errorHandler && (e.errorHandler = t.errorHandler), t.malformedUriErrorHandler && (e.malformedUriErrorHandler = t.malformedUriErrorHandler), t.onSameUrlNavigation && (e.onSameUrlNavigation = t.onSameUrlNavigation), t.paramsInheritanceStrategy && (e.paramsInheritanceStrategy = t.paramsInheritanceStrategy), t.relativeLinkResolution && (e.relativeLinkResolution = t.relativeLinkResolution), t.urlUpdateStrategy && (e.urlUpdateStrategy = t.urlUpdateStrategy)
                    }(a, h), a.enableTracing) {
                        const t = yc();
                        h.events.subscribe(e => {
                            t.logGroup("Router Event: " + e.constructor.name), t.log(e.toString()), t.log(e), t.logGroupEnd()
                        })
                    }
                    return h
                },
                deps: [od, Vp, Nc, wr, cc, Ml, Fp, Qp, [class {
                }, new us], [class {
                }, new us]]
            }, Vp, {
                provide: Rd, useFactory: function (t) {
                    return t.routerState.root
                }, deps: [Up]
            }, {provide: cc, useClass: dc}, Kp, Gp, class {
                preload(t, e) {
                    return e().pipe(au(() => Lh(null)))
                }
            }, {provide: Qp, useValue: {enableTracing: !1}}];

        function Jp() {
            return new nc("Router", Up)
        }

        let tf = (() => {
            class t {
                constructor(t, e) {
                }

                static forRoot(e, n) {
                    return {
                        ngModule: t,
                        providers: [Xp, rf(e), {
                            provide: Yp,
                            useFactory: sf,
                            deps: [[Up, new us, new ds]]
                        }, {provide: Qp, useValue: n || {}}, {
                            provide: Tc,
                            useFactory: nf,
                            deps: [vc, [new hs(Dc), new us], Qp]
                        }, {provide: Zp, useFactory: ef, deps: [Up, rh, Qp]}, {
                            provide: Wp,
                            useExisting: n && n.preloadingStrategy ? n.preloadingStrategy : Gp
                        }, {provide: nc, multi: !0, useFactory: Jp}, [of, {
                            provide: bl,
                            multi: !0,
                            useFactory: af,
                            deps: [of]
                        }, {provide: cf, useFactory: lf, deps: [of]}, {provide: El, multi: !0, useExisting: cf}]]
                    }
                }

                static forChild(e) {
                    return {ngModule: t, providers: [rf(e)]}
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Yp, 8), os(Up, 8))
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({}), t
        })();

        function ef(t, e, n) {
            return n.scrollOffset && e.setOffset(n.scrollOffset), new Zp(t, e, n)
        }

        function nf(t, e, n = {}) {
            return n.useHash ? new Pc(t, e) : new Ic(t, e)
        }

        function sf(t) {
            return "guarded"
        }

        function rf(t) {
            return [{provide: qn, multi: !0, useValue: t}, {provide: Fp, multi: !0, useValue: t}]
        }

        let of = (() => {
            class t {
                constructor(t) {
                    this.injector = t, this.initNavigation = !1, this.resultOfPreactivationDone = new S
                }

                appInitializer() {
                    return this.injector.get(Cc, Promise.resolve(null)).then(() => {
                        let t = null;
                        const e = new Promise(e => t = e), n = this.injector.get(Up), s = this.injector.get(Qp);
                        return "disabled" === s.initialNavigation ? (n.setUpLocationChangeListener(), t(!0)) : "enabled" === s.initialNavigation || "enabledBlocking" === s.initialNavigation ? (n.hooks.afterPreactivation = () => this.initNavigation ? Lh(null) : (this.initNavigation = !0, t(!0), this.resultOfPreactivationDone), n.initialNavigation()) : t(!0), e
                    })
                }

                bootstrapListener(t) {
                    const e = this.injector.get(Qp), n = this.injector.get(Kp), s = this.injector.get(Zp),
                        i = this.injector.get(Up), r = this.injector.get(ac);
                    t === r.components[0] && ("enabledNonBlocking" !== e.initialNavigation && void 0 !== e.initialNavigation || i.initialNavigation(), n.setUpPreloading(), s.init(), i.resetRootComponentType(r.componentTypes[0]), this.resultOfPreactivationDone.next(null), this.resultOfPreactivationDone.complete())
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(wr))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function af(t) {
            return t.appInitializer.bind(t)
        }

        function lf(t) {
            return t.bootstrapListener.bind(t)
        }

        const cf = new $n("Router Initializer"), hf = [];
        let uf = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[tf.forRoot(hf)], tf]}), t
        })();

        function df(t, ...e) {
            return e.length ? e.some(e => t[e]) : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey
        }

        class pf extends u {
            constructor(t, e) {
                super()
            }

            schedule(t, e = 0) {
                return this
            }
        }

        class ff extends pf {
            constructor(t, e) {
                super(t, e), this.scheduler = t, this.work = e, this.pending = !1
            }

            schedule(t, e = 0) {
                if (this.closed) return this;
                this.state = t;
                const n = this.id, s = this.scheduler;
                return null != n && (this.id = this.recycleAsyncId(s, n, e)), this.pending = !0, this.delay = e, this.id = this.id || this.requestAsyncId(s, this.id, e), this
            }

            requestAsyncId(t, e, n = 0) {
                return setInterval(t.flush.bind(t, this), n)
            }

            recycleAsyncId(t, e, n = 0) {
                if (null !== n && this.delay === n && !1 === this.pending) return e;
                clearInterval(e)
            }

            execute(t, e) {
                if (this.closed) return new Error("executing a cancelled action");
                this.pending = !1;
                const n = this._execute(t, e);
                if (n) return n;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }

            _execute(t, e) {
                let n = !1, s = void 0;
                try {
                    this.work(t)
                } catch (i) {
                    n = !0, s = !!i && i || new Error(i)
                }
                if (n) return this.unsubscribe(), s
            }

            _unsubscribe() {
                const t = this.id, e = this.scheduler, n = e.actions, s = n.indexOf(this);
                this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== s && n.splice(s, 1), null != t && (this.id = this.recycleAsyncId(e, t, null)), this.delay = null
            }
        }

        let mf = (() => {
            class t {
                constructor(e, n = t.now) {
                    this.SchedulerAction = e, this.now = n
                }

                schedule(t, e = 0, n) {
                    return new this.SchedulerAction(this, t).schedule(n, e)
                }
            }

            return t.now = () => Date.now(), t
        })();

        class gf extends mf {
            constructor(t, e = mf.now) {
                super(t, () => gf.delegate && gf.delegate !== this ? gf.delegate.now() : e()), this.actions = [], this.active = !1, this.scheduled = void 0
            }

            schedule(t, e = 0, n) {
                return gf.delegate && gf.delegate !== this ? gf.delegate.schedule(t, e, n) : super.schedule(t, e, n)
            }

            flush(t) {
                const {actions: e} = this;
                if (this.active) return void e.push(t);
                let n;
                this.active = !0;
                do {
                    if (n = t.execute(t.state, t.delay)) break
                } while (t = e.shift());
                if (this.active = !1, n) {
                    for (; t = e.shift();) t.unsubscribe();
                    throw n
                }
            }
        }

        const _f = new gf(ff);

        function yf(t, e = _f) {
            return n => n.lift(new bf(t, e))
        }

        class bf {
            constructor(t, e) {
                this.dueTime = t, this.scheduler = e
            }

            call(t, e) {
                return e.subscribe(new vf(t, this.dueTime, this.scheduler))
            }
        }

        class vf extends f {
            constructor(t, e, n) {
                super(t), this.dueTime = e, this.scheduler = n, this.debouncedSubscription = null, this.lastValue = null, this.hasValue = !1
            }

            _next(t) {
                this.clearDebounce(), this.lastValue = t, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(wf, this.dueTime, this))
            }

            _complete() {
                this.debouncedNext(), this.destination.complete()
            }

            debouncedNext() {
                if (this.clearDebounce(), this.hasValue) {
                    const {lastValue: t} = this;
                    this.lastValue = null, this.hasValue = !1, this.destination.next(t)
                }
            }

            clearDebounce() {
                const t = this.debouncedSubscription;
                null !== t && (this.remove(t), t.unsubscribe(), this.debouncedSubscription = null)
            }
        }

        function wf(t) {
            t.debouncedNext()
        }

        function Cf(t) {
            return null != t && "" + t != "false"
        }

        function Sf(t, e = 0) {
            return xf(t) ? Number(t) : e
        }

        function xf(t) {
            return !isNaN(parseFloat(t)) && !isNaN(Number(t))
        }

        function kf(t) {
            return Array.isArray(t) ? t : [t]
        }

        function Ef(t) {
            return null == t ? "" : "string" == typeof t ? t : t + "px"
        }

        function Of(t) {
            return t instanceof Qo ? t.nativeElement : t
        }

        let Rf;
        try {
            Rf = "undefined" != typeof Intl && Intl.v8BreakIterator
        } catch (Ax) {
            Rf = !1
        }
        let Tf, Af, Df, If = (() => {
            class t {
                constructor(t) {
                    this._platformId = t, this.isBrowser = this._platformId ? ih(this._platformId) : "object" == typeof document && !!document, this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), this.BLINK = this.isBrowser && !(!window.chrome && !Rf) && "undefined" != typeof CSS && !this.EDGE && !this.TRIDENT, this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window), this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(kl))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(kl))
                }, token: t, providedIn: "root"
            }), t
        })(), Pf = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({}), t
        })();

        function Nf(t) {
            return function () {
                if (null == Tf && "undefined" != typeof window) try {
                    window.addEventListener("test", null, Object.defineProperty({}, "passive", {get: () => Tf = !0}))
                } finally {
                    Tf = Tf || !1
                }
                return Tf
            }() ? t : !!t.capture
        }

        function Ff() {
            if (null == Af) {
                if ("object" != typeof document || !document) return Af = !1, Af;
                if ("scrollBehavior" in document.documentElement.style) Af = !0; else {
                    const t = Element.prototype.scrollTo;
                    Af = !!t && !/\{\s*\[native code\]\s*\}/.test(t.toString())
                }
            }
            return Af
        }

        function Lf(t) {
            if (function () {
                if (null == Df) {
                    const t = "undefined" != typeof document ? document.head : null;
                    Df = !(!t || !t.createShadowRoot && !t.attachShadow)
                }
                return Df
            }()) {
                const e = t.getRootNode ? t.getRootNode() : null;
                if ("undefined" != typeof ShadowRoot && ShadowRoot && e instanceof ShadowRoot) return e
            }
            return null
        }

        let Mf = (() => {
            class t {
                create(t) {
                    return "undefined" == typeof MutationObserver ? null : new MutationObserver(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t
                }, token: t, providedIn: "root"
            }), t
        })(), Vf = (() => {
            class t {
                constructor(t) {
                    this._mutationObserverFactory = t, this._observedElements = new Map
                }

                ngOnDestroy() {
                    this._observedElements.forEach((t, e) => this._cleanupObserver(e))
                }

                observe(t) {
                    const e = Of(t);
                    return new y(t => {
                        const n = this._observeElement(e).subscribe(t);
                        return () => {
                            n.unsubscribe(), this._unobserveElement(e)
                        }
                    })
                }

                _observeElement(t) {
                    if (this._observedElements.has(t)) this._observedElements.get(t).count++; else {
                        const e = new S, n = this._mutationObserverFactory.create(t => e.next(t));
                        n && n.observe(t, {
                            characterData: !0,
                            childList: !0,
                            subtree: !0
                        }), this._observedElements.set(t, {observer: n, stream: e, count: 1})
                    }
                    return this._observedElements.get(t).stream
                }

                _unobserveElement(t) {
                    this._observedElements.has(t) && (this._observedElements.get(t).count--, this._observedElements.get(t).count || this._cleanupObserver(t))
                }

                _cleanupObserver(t) {
                    if (this._observedElements.has(t)) {
                        const {observer: e, stream: n} = this._observedElements.get(t);
                        e && e.disconnect(), n.complete(), this._observedElements.delete(t)
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Mf))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(Mf))
                }, token: t, providedIn: "root"
            }), t
        })(), jf = (() => {
            class t {
                constructor(t, e, n) {
                    this._contentObserver = t, this._elementRef = e, this._ngZone = n, this.event = new el, this._disabled = !1, this._currentSubscription = null
                }

                get disabled() {
                    return this._disabled
                }

                set disabled(t) {
                    this._disabled = Cf(t), this._disabled ? this._unsubscribe() : this._subscribe()
                }

                get debounce() {
                    return this._debounce
                }

                set debounce(t) {
                    this._debounce = Sf(t), this._subscribe()
                }

                ngAfterContentInit() {
                    this._currentSubscription || this.disabled || this._subscribe()
                }

                ngOnDestroy() {
                    this._unsubscribe()
                }

                _subscribe() {
                    this._unsubscribe();
                    const t = this._contentObserver.observe(this._elementRef);
                    this._ngZone.runOutsideAngular(() => {
                        this._currentSubscription = (this.debounce ? t.pipe(yf(this.debounce)) : t).subscribe(this.event)
                    })
                }

                _unsubscribe() {
                    var t;
                    null === (t = this._currentSubscription) || void 0 === t || t.unsubscribe()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Vf), Vr(Qo), Vr(zl))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "cdkObserveContent", ""]],
                inputs: {disabled: ["cdkObserveContentDisabled", "disabled"], debounce: "debounce"},
                outputs: {event: "cdkObserveContent"},
                exportAs: ["cdkObserveContent"]
            }), t
        })(), zf = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({providers: [Mf]}), t
        })();

        function Bf(t, e) {
            return (t.getAttribute(e) || "").match(/\S+/g) || []
        }

        let Hf = 0;
        const Uf = new Map;
        let $f = null, qf = (() => {
            class t {
                constructor(t) {
                    this._document = t
                }

                describe(t, e, n) {
                    if (!this._canBeDescribed(t, e)) return;
                    const s = Wf(e, n);
                    "string" != typeof e ? (Gf(e), Uf.set(s, {
                        messageElement: e,
                        referenceCount: 0
                    })) : Uf.has(s) || this._createMessageElement(e, n), this._isElementDescribedByMessage(t, s) || this._addMessageReference(t, s)
                }

                removeDescription(t, e, n) {
                    if (!e || !this._isElementNode(t)) return;
                    const s = Wf(e, n);
                    if (this._isElementDescribedByMessage(t, s) && this._removeMessageReference(t, s), "string" == typeof e) {
                        const t = Uf.get(s);
                        t && 0 === t.referenceCount && this._deleteMessageElement(s)
                    }
                    $f && 0 === $f.childNodes.length && this._deleteMessagesContainer()
                }

                ngOnDestroy() {
                    const t = this._document.querySelectorAll("[cdk-describedby-host]");
                    for (let e = 0; e < t.length; e++) this._removeCdkDescribedByReferenceIds(t[e]), t[e].removeAttribute("cdk-describedby-host");
                    $f && this._deleteMessagesContainer(), Uf.clear()
                }

                _createMessageElement(t, e) {
                    const n = this._document.createElement("div");
                    Gf(n), n.textContent = t, e && n.setAttribute("role", e), this._createMessagesContainer(), $f.appendChild(n), Uf.set(Wf(t, e), {
                        messageElement: n,
                        referenceCount: 0
                    })
                }

                _deleteMessageElement(t) {
                    const e = Uf.get(t), n = e && e.messageElement;
                    $f && n && $f.removeChild(n), Uf.delete(t)
                }

                _createMessagesContainer() {
                    if (!$f) {
                        const t = this._document.getElementById("cdk-describedby-message-container");
                        t && t.parentNode && t.parentNode.removeChild(t), $f = this._document.createElement("div"), $f.id = "cdk-describedby-message-container", $f.style.visibility = "hidden", $f.classList.add("cdk-visually-hidden"), this._document.body.appendChild($f)
                    }
                }

                _deleteMessagesContainer() {
                    $f && $f.parentNode && ($f.parentNode.removeChild($f), $f = null)
                }

                _removeCdkDescribedByReferenceIds(t) {
                    const e = Bf(t, "aria-describedby").filter(t => 0 != t.indexOf("cdk-describedby-message"));
                    t.setAttribute("aria-describedby", e.join(" "))
                }

                _addMessageReference(t, e) {
                    const n = Uf.get(e);
                    !function (t, e, n) {
                        const s = Bf(t, e);
                        s.some(t => t.trim() == n.trim()) || (s.push(n.trim()), t.setAttribute(e, s.join(" ")))
                    }(t, "aria-describedby", n.messageElement.id), t.setAttribute("cdk-describedby-host", ""), n.referenceCount++
                }

                _removeMessageReference(t, e) {
                    const n = Uf.get(e);
                    n.referenceCount--, function (t, e, n) {
                        const s = Bf(t, e).filter(t => t != n.trim());
                        s.length ? t.setAttribute(e, s.join(" ")) : t.removeAttribute(e)
                    }(t, "aria-describedby", n.messageElement.id), t.removeAttribute("cdk-describedby-host")
                }

                _isElementDescribedByMessage(t, e) {
                    const n = Bf(t, "aria-describedby"), s = Uf.get(e), i = s && s.messageElement.id;
                    return !!i && -1 != n.indexOf(i)
                }

                _canBeDescribed(t, e) {
                    if (!this._isElementNode(t)) return !1;
                    if (e && "object" == typeof e) return !0;
                    const n = null == e ? "" : ("" + e).trim(), s = t.getAttribute("aria-label");
                    return !(!n || s && s.trim() === n)
                }

                _isElementNode(t) {
                    return t.nodeType === this._document.ELEMENT_NODE
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(bc))
                }, token: t, providedIn: "root"
            }), t
        })();

        function Wf(t, e) {
            return "string" == typeof t ? `${e || ""}/${t}` : t
        }

        function Gf(t) {
            t.id || (t.id = "cdk-describedby-message-" + Hf++)
        }

        class Kf extends class {
            constructor(t) {
                this._items = t, this._activeItemIndex = -1, this._activeItem = null, this._wrap = !1, this._letterKeyStream = new S, this._typeaheadSubscription = u.EMPTY, this._vertical = !0, this._allowedModifierKeys = [], this._homeAndEnd = !1, this._skipPredicateFn = t => t.disabled, this._pressedLetters = [], this.tabOut = new S, this.change = new S, t instanceof sl && t.changes.subscribe(t => {
                    if (this._activeItem) {
                        const e = t.toArray().indexOf(this._activeItem);
                        e > -1 && e !== this._activeItemIndex && (this._activeItemIndex = e)
                    }
                })
            }

            skipPredicate(t) {
                return this._skipPredicateFn = t, this
            }

            withWrap(t = !0) {
                return this._wrap = t, this
            }

            withVerticalOrientation(t = !0) {
                return this._vertical = t, this
            }

            withHorizontalOrientation(t) {
                return this._horizontal = t, this
            }

            withAllowedModifierKeys(t) {
                return this._allowedModifierKeys = t, this
            }

            withTypeAhead(t = 200) {
                return this._typeaheadSubscription.unsubscribe(), this._typeaheadSubscription = this._letterKeyStream.pipe(Su(t => this._pressedLetters.push(t)), yf(t), iu(() => this._pressedLetters.length > 0), F(() => this._pressedLetters.join(""))).subscribe(t => {
                    const e = this._getItemsArray();
                    for (let n = 1; n < e.length + 1; n++) {
                        const s = (this._activeItemIndex + n) % e.length, i = e[s];
                        if (!this._skipPredicateFn(i) && 0 === i.getLabel().toUpperCase().trim().indexOf(t)) {
                            this.setActiveItem(s);
                            break
                        }
                    }
                    this._pressedLetters = []
                }), this
            }

            withHomeAndEnd(t = !0) {
                return this._homeAndEnd = t, this
            }

            setActiveItem(t) {
                const e = this._activeItem;
                this.updateActiveItem(t), this._activeItem !== e && this.change.next(this._activeItemIndex)
            }

            onKeydown(t) {
                const e = t.keyCode,
                    n = ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(e => !t[e] || this._allowedModifierKeys.indexOf(e) > -1);
                switch (e) {
                    case 9:
                        return void this.tabOut.next();
                    case 40:
                        if (this._vertical && n) {
                            this.setNextItemActive();
                            break
                        }
                        return;
                    case 38:
                        if (this._vertical && n) {
                            this.setPreviousItemActive();
                            break
                        }
                        return;
                    case 39:
                        if (this._horizontal && n) {
                            "rtl" === this._horizontal ? this.setPreviousItemActive() : this.setNextItemActive();
                            break
                        }
                        return;
                    case 37:
                        if (this._horizontal && n) {
                            "rtl" === this._horizontal ? this.setNextItemActive() : this.setPreviousItemActive();
                            break
                        }
                        return;
                    case 36:
                        if (this._homeAndEnd && n) {
                            this.setFirstItemActive();
                            break
                        }
                        return;
                    case 35:
                        if (this._homeAndEnd && n) {
                            this.setLastItemActive();
                            break
                        }
                        return;
                    default:
                        return void ((n || df(t, "shiftKey")) && (t.key && 1 === t.key.length ? this._letterKeyStream.next(t.key.toLocaleUpperCase()) : (e >= 65 && e <= 90 || e >= 48 && e <= 57) && this._letterKeyStream.next(String.fromCharCode(e))))
                }
                this._pressedLetters = [], t.preventDefault()
            }

            get activeItemIndex() {
                return this._activeItemIndex
            }

            get activeItem() {
                return this._activeItem
            }

            isTyping() {
                return this._pressedLetters.length > 0
            }

            setFirstItemActive() {
                this._setActiveItemByIndex(0, 1)
            }

            setLastItemActive() {
                this._setActiveItemByIndex(this._items.length - 1, -1)
            }

            setNextItemActive() {
                this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1)
            }

            setPreviousItemActive() {
                this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1)
            }

            updateActiveItem(t) {
                const e = this._getItemsArray(), n = "number" == typeof t ? t : e.indexOf(t), s = e[n];
                this._activeItem = null == s ? null : s, this._activeItemIndex = n
            }

            _setActiveItemByDelta(t) {
                this._wrap ? this._setActiveInWrapMode(t) : this._setActiveInDefaultMode(t)
            }

            _setActiveInWrapMode(t) {
                const e = this._getItemsArray();
                for (let n = 1; n <= e.length; n++) {
                    const s = (this._activeItemIndex + t * n + e.length) % e.length;
                    if (!this._skipPredicateFn(e[s])) return void this.setActiveItem(s)
                }
            }

            _setActiveInDefaultMode(t) {
                this._setActiveItemByIndex(this._activeItemIndex + t, t)
            }

            _setActiveItemByIndex(t, e) {
                const n = this._getItemsArray();
                if (n[t]) {
                    for (; this._skipPredicateFn(n[t]);) if (!n[t += e]) return;
                    this.setActiveItem(t)
                }
            }

            _getItemsArray() {
                return this._items instanceof sl ? this._items.toArray() : this._items
            }
        } {
            setActiveItem(t) {
                this.activeItem && this.activeItem.setInactiveStyles(), super.setActiveItem(t), this.activeItem && this.activeItem.setActiveStyles()
            }
        }

        "undefined" != typeof Element && Element;
        const Zf = new $n("liveAnnouncerElement", {
            providedIn: "root", factory: function () {
                return null
            }
        }), Qf = new $n("LIVE_ANNOUNCER_DEFAULT_OPTIONS");
        let Yf = (() => {
            class t {
                constructor(t, e, n, s) {
                    this._ngZone = e, this._defaultOptions = s, this._document = n, this._liveElement = t || this._createLiveElement()
                }

                announce(t, ...e) {
                    const n = this._defaultOptions;
                    let s, i;
                    return 1 === e.length && "number" == typeof e[0] ? i = e[0] : [s, i] = e, this.clear(), clearTimeout(this._previousTimeout), s || (s = n && n.politeness ? n.politeness : "polite"), null == i && n && (i = n.duration), this._liveElement.setAttribute("aria-live", s), this._ngZone.runOutsideAngular(() => new Promise(e => {
                        clearTimeout(this._previousTimeout), this._previousTimeout = setTimeout(() => {
                            this._liveElement.textContent = t, e(), "number" == typeof i && (this._previousTimeout = setTimeout(() => this.clear(), i))
                        }, 100)
                    }))
                }

                clear() {
                    this._liveElement && (this._liveElement.textContent = "")
                }

                ngOnDestroy() {
                    clearTimeout(this._previousTimeout), this._liveElement && this._liveElement.parentNode && (this._liveElement.parentNode.removeChild(this._liveElement), this._liveElement = null)
                }

                _createLiveElement() {
                    const t = this._document.getElementsByClassName("cdk-live-announcer-element"),
                        e = this._document.createElement("div");
                    for (let n = 0; n < t.length; n++) t[n].parentNode.removeChild(t[n]);
                    return e.classList.add("cdk-live-announcer-element"), e.classList.add("cdk-visually-hidden"), e.setAttribute("aria-atomic", "true"), e.setAttribute("aria-live", "polite"), this._document.body.appendChild(e), e
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Zf, 8), os(zl), os(bc), os(Qf, 8))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(Zf, 8), os(zl), os(bc), os(Qf, 8))
                }, token: t, providedIn: "root"
            }), t
        })();

        function Xf(t) {
            return 0 === t.buttons
        }

        function Jf(t) {
            const e = t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0];
            return !(!e || -1 !== e.identifier || null != e.radiusX && 1 !== e.radiusX || null != e.radiusY && 1 !== e.radiusY)
        }

        const tm = new $n("cdk-focus-monitor-default-options"), em = Nf({passive: !0, capture: !0});
        let nm = (() => {
            class t {
                constructor(t, e, n, s) {
                    this._ngZone = t, this._platform = e, this._origin = null, this._windowFocused = !1, this._elementInfo = new Map, this._monitoredElementCount = 0, this._rootNodeFocusListenerCount = new Map, this._documentKeydownListener = () => {
                        this._lastTouchTarget = null, this._setOriginForCurrentEventQueue("keyboard")
                    }, this._documentMousedownListener = t => {
                        if (!this._lastTouchTarget) {
                            const e = Xf(t) ? "keyboard" : "mouse";
                            this._setOriginForCurrentEventQueue(e)
                        }
                    }, this._documentTouchstartListener = t => {
                        Jf(t) ? this._lastTouchTarget || this._setOriginForCurrentEventQueue("keyboard") : (null != this._touchTimeoutId && clearTimeout(this._touchTimeoutId), this._lastTouchTarget = sm(t), this._touchTimeoutId = setTimeout(() => this._lastTouchTarget = null, 650))
                    }, this._windowFocusListener = () => {
                        this._windowFocused = !0, this._windowFocusTimeoutId = setTimeout(() => this._windowFocused = !1)
                    }, this._rootNodeFocusAndBlurListener = t => {
                        const e = sm(t), n = "focus" === t.type ? this._onFocus : this._onBlur;
                        for (let s = e; s; s = s.parentElement) n.call(this, t, s)
                    }, this._document = n, this._detectionMode = (null == s ? void 0 : s.detectionMode) || 0
                }

                monitor(t, e = !1) {
                    const n = Of(t);
                    if (!this._platform.isBrowser || 1 !== n.nodeType) return Lh(null);
                    const s = Lf(n) || this._getDocument(), i = this._elementInfo.get(n);
                    if (i) return e && (i.checkChildren = !0), i.subject;
                    const r = {checkChildren: e, subject: new S, rootNode: s};
                    return this._elementInfo.set(n, r), this._registerGlobalListeners(r), r.subject
                }

                stopMonitoring(t) {
                    const e = Of(t), n = this._elementInfo.get(e);
                    n && (n.subject.complete(), this._setClasses(e), this._elementInfo.delete(e), this._removeGlobalListeners(n))
                }

                focusVia(t, e, n) {
                    const s = Of(t);
                    s === this._getDocument().activeElement ? this._getClosestElementsInfo(s).forEach(([t, n]) => this._originChanged(t, e, n)) : (this._setOriginForCurrentEventQueue(e), "function" == typeof s.focus && s.focus(n))
                }

                ngOnDestroy() {
                    this._elementInfo.forEach((t, e) => this.stopMonitoring(e))
                }

                _getDocument() {
                    return this._document || document
                }

                _getWindow() {
                    return this._getDocument().defaultView || window
                }

                _toggleClass(t, e, n) {
                    n ? t.classList.add(e) : t.classList.remove(e)
                }

                _getFocusOrigin(t) {
                    return this._origin ? this._origin : this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : this._wasCausedByTouch(t) ? "touch" : "program"
                }

                _setClasses(t, e) {
                    this._toggleClass(t, "cdk-focused", !!e), this._toggleClass(t, "cdk-touch-focused", "touch" === e), this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e), this._toggleClass(t, "cdk-mouse-focused", "mouse" === e), this._toggleClass(t, "cdk-program-focused", "program" === e)
                }

                _setOriginForCurrentEventQueue(t) {
                    this._ngZone.runOutsideAngular(() => {
                        this._origin = t, 0 === this._detectionMode && (this._originTimeoutId = setTimeout(() => this._origin = null, 1))
                    })
                }

                _wasCausedByTouch(t) {
                    const e = sm(t);
                    return this._lastTouchTarget instanceof Node && e instanceof Node && (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
                }

                _onFocus(t, e) {
                    const n = this._elementInfo.get(e);
                    n && (n.checkChildren || e === sm(t)) && this._originChanged(e, this._getFocusOrigin(t), n)
                }

                _onBlur(t, e) {
                    const n = this._elementInfo.get(e);
                    !n || n.checkChildren && t.relatedTarget instanceof Node && e.contains(t.relatedTarget) || (this._setClasses(e), this._emitOrigin(n.subject, null))
                }

                _emitOrigin(t, e) {
                    this._ngZone.run(() => t.next(e))
                }

                _registerGlobalListeners(t) {
                    if (!this._platform.isBrowser) return;
                    const e = t.rootNode, n = this._rootNodeFocusListenerCount.get(e) || 0;
                    n || this._ngZone.runOutsideAngular(() => {
                        e.addEventListener("focus", this._rootNodeFocusAndBlurListener, em), e.addEventListener("blur", this._rootNodeFocusAndBlurListener, em)
                    }), this._rootNodeFocusListenerCount.set(e, n + 1), 1 == ++this._monitoredElementCount && this._ngZone.runOutsideAngular(() => {
                        const t = this._getDocument(), e = this._getWindow();
                        t.addEventListener("keydown", this._documentKeydownListener, em), t.addEventListener("mousedown", this._documentMousedownListener, em), t.addEventListener("touchstart", this._documentTouchstartListener, em), e.addEventListener("focus", this._windowFocusListener)
                    })
                }

                _removeGlobalListeners(t) {
                    const e = t.rootNode;
                    if (this._rootNodeFocusListenerCount.has(e)) {
                        const t = this._rootNodeFocusListenerCount.get(e);
                        t > 1 ? this._rootNodeFocusListenerCount.set(e, t - 1) : (e.removeEventListener("focus", this._rootNodeFocusAndBlurListener, em), e.removeEventListener("blur", this._rootNodeFocusAndBlurListener, em), this._rootNodeFocusListenerCount.delete(e))
                    }
                    if (!--this._monitoredElementCount) {
                        const t = this._getDocument(), e = this._getWindow();
                        t.removeEventListener("keydown", this._documentKeydownListener, em), t.removeEventListener("mousedown", this._documentMousedownListener, em), t.removeEventListener("touchstart", this._documentTouchstartListener, em), e.removeEventListener("focus", this._windowFocusListener), clearTimeout(this._windowFocusTimeoutId), clearTimeout(this._touchTimeoutId), clearTimeout(this._originTimeoutId)
                    }
                }

                _originChanged(t, e, n) {
                    this._setClasses(t, e), this._emitOrigin(n.subject, e), this._lastFocusOrigin = e
                }

                _getClosestElementsInfo(t) {
                    const e = [];
                    return this._elementInfo.forEach((n, s) => {
                        (s === t || n.checkChildren && s.contains(t)) && e.push([s, n])
                    }), e
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(zl), os(If), os(bc, 8), os(tm, 8))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(zl), os(If), os(bc, 8), os(tm, 8))
                }, token: t, providedIn: "root"
            }), t
        })();

        function sm(t) {
            return t.composedPath ? t.composedPath()[0] : t.target
        }

        let im = (() => {
            class t {
                constructor(t, e) {
                    this._platform = t, this._document = e
                }

                getHighContrastMode() {
                    if (!this._platform.isBrowser) return 0;
                    const t = this._document.createElement("div");
                    t.style.backgroundColor = "rgb(1,2,3)", t.style.position = "absolute", this._document.body.appendChild(t);
                    const e = this._document.defaultView || window,
                        n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
                        s = (n && n.backgroundColor || "").replace(/ /g, "");
                    switch (this._document.body.removeChild(t), s) {
                        case"rgb(0,0,0)":
                            return 2;
                        case"rgb(255,255,255)":
                            return 1
                    }
                    return 0
                }

                _applyBodyHighContrastModeCssClasses() {
                    if (this._platform.isBrowser && this._document.body) {
                        const t = this._document.body.classList;
                        t.remove("cdk-high-contrast-active"), t.remove("cdk-high-contrast-black-on-white"), t.remove("cdk-high-contrast-white-on-black");
                        const e = this.getHighContrastMode();
                        1 === e ? (t.add("cdk-high-contrast-active"), t.add("cdk-high-contrast-black-on-white")) : 2 === e && (t.add("cdk-high-contrast-active"), t.add("cdk-high-contrast-white-on-black"))
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(If), os(bc))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(If), os(bc))
                }, token: t, providedIn: "root"
            }), t
        })(), rm = (() => {
            class t {
                constructor(t) {
                    t._applyBodyHighContrastModeCssClasses()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(im))
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[Pf, zf]]}), t
        })();
        const om = new $n("cdk-dir-doc", {
            providedIn: "root", factory: function () {
                return as(bc)
            }
        });
        let am = (() => {
            class t {
                constructor(t) {
                    if (this.value = "ltr", this.change = new el, t) {
                        const e = t.documentElement ? t.documentElement.dir : null,
                            n = (t.body ? t.body.dir : null) || e;
                        this.value = "ltr" === n || "rtl" === n ? n : "ltr"
                    }
                }

                ngOnDestroy() {
                    this.change.complete()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(om, 8))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(om, 8))
                }, token: t, providedIn: "root"
            }), t
        })(), lm = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({}), t
        })();
        const cm = new na("11.2.5");

        class hm {
        }

        function um(t, e) {
            return {type: 7, name: t, definitions: e, options: {}}
        }

        function dm(t, e = null) {
            return {type: 4, styles: e, timings: t}
        }

        function pm(t, e = null) {
            return {type: 2, steps: t, options: e}
        }

        function fm(t) {
            return {type: 6, styles: t, offset: null}
        }

        function mm(t, e, n) {
            return {type: 0, name: t, styles: e, options: n}
        }

        function gm(t) {
            return {type: 5, steps: t}
        }

        function _m(t, e, n = null) {
            return {type: 1, expr: t, animation: e, options: n}
        }

        function ym(t = null) {
            return {type: 9, options: t}
        }

        function bm(t, e, n = null) {
            return {type: 11, selector: t, animation: e, options: n}
        }

        function vm(t) {
            Promise.resolve(null).then(t)
        }

        class wm {
            constructor(t = 0, e = 0) {
                this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = t + e
            }

            _onFinish() {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
            }

            onStart(t) {
                this._onStartFns.push(t)
            }

            onDone(t) {
                this._onDoneFns.push(t)
            }

            onDestroy(t) {
                this._onDestroyFns.push(t)
            }

            hasStarted() {
                return this._started
            }

            init() {
            }

            play() {
                this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
            }

            triggerMicrotask() {
                vm(() => this._onFinish())
            }

            _onStart() {
                this._onStartFns.forEach(t => t()), this._onStartFns = []
            }

            pause() {
            }

            restart() {
            }

            finish() {
                this._onFinish()
            }

            destroy() {
                this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
            }

            reset() {
            }

            setPosition(t) {
                this._position = this.totalTime ? t * this.totalTime : 1
            }

            getPosition() {
                return this.totalTime ? this._position / this.totalTime : 1
            }

            triggerCallback(t) {
                const e = "start" == t ? this._onStartFns : this._onDoneFns;
                e.forEach(t => t()), e.length = 0
            }
        }

        class Cm {
            constructor(t) {
                this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = t;
                let e = 0, n = 0, s = 0;
                const i = this.players.length;
                0 == i ? vm(() => this._onFinish()) : this.players.forEach(t => {
                    t.onDone(() => {
                        ++e == i && this._onFinish()
                    }), t.onDestroy(() => {
                        ++n == i && this._onDestroy()
                    }), t.onStart(() => {
                        ++s == i && this._onStart()
                    })
                }), this.totalTime = this.players.reduce((t, e) => Math.max(t, e.totalTime), 0)
            }

            _onFinish() {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
            }

            init() {
                this.players.forEach(t => t.init())
            }

            onStart(t) {
                this._onStartFns.push(t)
            }

            _onStart() {
                this.hasStarted() || (this._started = !0, this._onStartFns.forEach(t => t()), this._onStartFns = [])
            }

            onDone(t) {
                this._onDoneFns.push(t)
            }

            onDestroy(t) {
                this._onDestroyFns.push(t)
            }

            hasStarted() {
                return this._started
            }

            play() {
                this.parentPlayer || this.init(), this._onStart(), this.players.forEach(t => t.play())
            }

            pause() {
                this.players.forEach(t => t.pause())
            }

            restart() {
                this.players.forEach(t => t.restart())
            }

            finish() {
                this._onFinish(), this.players.forEach(t => t.finish())
            }

            destroy() {
                this._onDestroy()
            }

            _onDestroy() {
                this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(t => t.destroy()), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
            }

            reset() {
                this.players.forEach(t => t.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
            }

            setPosition(t) {
                const e = t * this.totalTime;
                this.players.forEach(t => {
                    const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
                    t.setPosition(n)
                })
            }

            getPosition() {
                const t = this.players.reduce((t, e) => null === t || e.totalTime > t.totalTime ? e : t, null);
                return null != t ? t.getPosition() : 0
            }

            beforeDestroy() {
                this.players.forEach(t => {
                    t.beforeDestroy && t.beforeDestroy()
                })
            }

            triggerCallback(t) {
                const e = "start" == t ? this._onStartFns : this._onDoneFns;
                e.forEach(t => t()), e.length = 0
            }
        }

        function Sm() {
            return "undefined" != typeof process && "[object process]" === {}.toString.call(process)
        }

        function xm(t) {
            switch (t.length) {
                case 0:
                    return new wm;
                case 1:
                    return t[0];
                default:
                    return new Cm(t)
            }
        }

        function km(t, e, n, s, i = {}, r = {}) {
            const o = [], a = [];
            let l = -1, c = null;
            if (s.forEach(t => {
                const n = t.offset, s = n == l, h = s && c || {};
                Object.keys(t).forEach(n => {
                    let s = n, a = t[n];
                    if ("offset" !== n) switch (s = e.normalizePropertyName(s, o), a) {
                        case"!":
                            a = i[n];
                            break;
                        case"*":
                            a = r[n];
                            break;
                        default:
                            a = e.normalizeStyleValue(n, s, a, o)
                    }
                    h[s] = a
                }), s || a.push(h), c = h, l = n
            }), o.length) {
                const t = "\n - ";
                throw new Error(`Unable to animate due to the following errors:${t}${o.join(t)}`)
            }
            return a
        }

        function Em(t, e, n, s) {
            switch (e) {
                case"start":
                    t.onStart(() => s(n && Om(n, "start", t)));
                    break;
                case"done":
                    t.onDone(() => s(n && Om(n, "done", t)));
                    break;
                case"destroy":
                    t.onDestroy(() => s(n && Om(n, "destroy", t)))
            }
        }

        function Om(t, e, n) {
            const s = n.totalTime,
                i = Rm(t.element, t.triggerName, t.fromState, t.toState, e || t.phaseName, null == s ? t.totalTime : s, !!n.disabled),
                r = t._data;
            return null != r && (i._data = r), i
        }

        function Rm(t, e, n, s, i = "", r = 0, o) {
            return {element: t, triggerName: e, fromState: n, toState: s, phaseName: i, totalTime: r, disabled: !!o}
        }

        function Tm(t, e, n) {
            let s;
            return t instanceof Map ? (s = t.get(e), s || t.set(e, s = n)) : (s = t[e], s || (s = t[e] = n)), s
        }

        function Am(t) {
            const e = t.indexOf(":");
            return [t.substring(1, e), t.substr(e + 1)]
        }

        let Dm = (t, e) => !1, Im = (t, e) => !1, Pm = (t, e, n) => [];
        const Nm = Sm();
        (Nm || "undefined" != typeof Element) && (Dm = (t, e) => t.contains(e), Im = (() => {
            if (Nm || Element.prototype.matches) return (t, e) => t.matches(e);
            {
                const t = Element.prototype,
                    e = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector;
                return e ? (t, n) => e.apply(t, [n]) : Im
            }
        })(), Pm = (t, e, n) => {
            let s = [];
            if (n) {
                const n = t.querySelectorAll(e);
                for (let t = 0; t < n.length; t++) s.push(n[t])
            } else {
                const n = t.querySelector(e);
                n && s.push(n)
            }
            return s
        });
        let Fm = null, Lm = !1;

        function Mm(t) {
            Fm || (Fm = ("undefined" != typeof document ? document.body : null) || {}, Lm = !!Fm.style && "WebkitAppearance" in Fm.style);
            let e = !0;
            return Fm.style && !function (t) {
                return "ebkit" == t.substring(1, 6)
            }(t) && (e = t in Fm.style, !e && Lm) && (e = "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in Fm.style), e
        }

        const Vm = Im, jm = Dm, zm = Pm;

        function Bm(t) {
            const e = {};
            return Object.keys(t).forEach(n => {
                const s = n.replace(/([a-z])([A-Z])/g, "$1-$2");
                e[s] = t[n]
            }), e
        }

        let Hm = (() => {
            class t {
                validateStyleProperty(t) {
                    return Mm(t)
                }

                matchesElement(t, e) {
                    return Vm(t, e)
                }

                containsElement(t, e) {
                    return jm(t, e)
                }

                query(t, e, n) {
                    return zm(t, e, n)
                }

                computeStyle(t, e, n) {
                    return n || ""
                }

                animate(t, e, n, s, i, r = [], o) {
                    return new wm(n, s)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Um = (() => {
            class t {
            }

            return t.NOOP = new Hm, t
        })();

        function $m(t) {
            if ("number" == typeof t) return t;
            const e = t.match(/^(-?[\.\d]+)(m?s)/);
            return !e || e.length < 2 ? 0 : qm(parseFloat(e[1]), e[2])
        }

        function qm(t, e) {
            switch (e) {
                case"s":
                    return 1e3 * t;
                default:
                    return t
            }
        }

        function Wm(t, e, n) {
            return t.hasOwnProperty("duration") ? t : function (t, e, n) {
                let s, i = 0, r = "";
                if ("string" == typeof t) {
                    const n = t.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                    if (null === n) return e.push(`The provided timing value "${t}" is invalid.`), {
                        duration: 0,
                        delay: 0,
                        easing: ""
                    };
                    s = qm(parseFloat(n[1]), n[2]);
                    const o = n[3];
                    null != o && (i = qm(parseFloat(o), n[4]));
                    const a = n[5];
                    a && (r = a)
                } else s = t;
                if (!n) {
                    let n = !1, r = e.length;
                    s < 0 && (e.push("Duration values below 0 are not allowed for this animation step."), n = !0), i < 0 && (e.push("Delay values below 0 are not allowed for this animation step."), n = !0), n && e.splice(r, 0, `The provided timing value "${t}" is invalid.`)
                }
                return {duration: s, delay: i, easing: r}
            }(t, e, n)
        }

        function Gm(t, e = {}) {
            return Object.keys(t).forEach(n => {
                e[n] = t[n]
            }), e
        }

        function Km(t, e, n = {}) {
            if (e) for (let s in t) n[s] = t[s]; else Gm(t, n);
            return n
        }

        function Zm(t, e, n) {
            return n ? e + ":" + n + ";" : ""
        }

        function Qm(t) {
            let e = "";
            for (let n = 0; n < t.style.length; n++) {
                const s = t.style.item(n);
                e += Zm(0, s, t.style.getPropertyValue(s))
            }
            for (const n in t.style) t.style.hasOwnProperty(n) && !n.startsWith("_") && (e += Zm(0, n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), t.style[n]));
            t.setAttribute("style", e)
        }

        function Ym(t, e, n) {
            t.style && (Object.keys(e).forEach(s => {
                const i = rg(s);
                n && !n.hasOwnProperty(s) && (n[s] = t.style[i]), t.style[i] = e[s]
            }), Sm() && Qm(t))
        }

        function Xm(t, e) {
            t.style && (Object.keys(e).forEach(e => {
                const n = rg(e);
                t.style[n] = ""
            }), Sm() && Qm(t))
        }

        function Jm(t) {
            return Array.isArray(t) ? 1 == t.length ? t[0] : pm(t) : t
        }

        const tg = new RegExp("{{\\s*(.+?)\\s*}}", "g");

        function eg(t) {
            let e = [];
            if ("string" == typeof t) {
                let n;
                for (; n = tg.exec(t);) e.push(n[1]);
                tg.lastIndex = 0
            }
            return e
        }

        function ng(t, e, n) {
            const s = t.toString(), i = s.replace(tg, (t, s) => {
                let i = e[s];
                return e.hasOwnProperty(s) || (n.push("Please provide a value for the animation param " + s), i = ""), i.toString()
            });
            return i == s ? t : i
        }

        function sg(t) {
            const e = [];
            let n = t.next();
            for (; !n.done;) e.push(n.value), n = t.next();
            return e
        }

        const ig = /-+([a-z0-9])/g;

        function rg(t) {
            return t.replace(ig, (...t) => t[1].toUpperCase())
        }

        function og(t, e) {
            return 0 === t || 0 === e
        }

        function ag(t, e, n) {
            const s = Object.keys(n);
            if (s.length && e.length) {
                let r = e[0], o = [];
                if (s.forEach(t => {
                    r.hasOwnProperty(t) || o.push(t), r[t] = n[t]
                }), o.length) for (var i = 1; i < e.length; i++) {
                    let n = e[i];
                    o.forEach((function (e) {
                        n[e] = cg(t, e)
                    }))
                }
            }
            return e
        }

        function lg(t, e, n) {
            switch (e.type) {
                case 7:
                    return t.visitTrigger(e, n);
                case 0:
                    return t.visitState(e, n);
                case 1:
                    return t.visitTransition(e, n);
                case 2:
                    return t.visitSequence(e, n);
                case 3:
                    return t.visitGroup(e, n);
                case 4:
                    return t.visitAnimate(e, n);
                case 5:
                    return t.visitKeyframes(e, n);
                case 6:
                    return t.visitStyle(e, n);
                case 8:
                    return t.visitReference(e, n);
                case 9:
                    return t.visitAnimateChild(e, n);
                case 10:
                    return t.visitAnimateRef(e, n);
                case 11:
                    return t.visitQuery(e, n);
                case 12:
                    return t.visitStagger(e, n);
                default:
                    throw new Error("Unable to resolve animation metadata node #" + e.type)
            }
        }

        function cg(t, e) {
            return window.getComputedStyle(t)[e]
        }

        function hg(t, e) {
            const n = [];
            return "string" == typeof t ? t.split(/\s*,\s*/).forEach(t => function (t, e, n) {
                if (":" == t[0]) {
                    const s = function (t, e) {
                        switch (t) {
                            case":enter":
                                return "void => *";
                            case":leave":
                                return "* => void";
                            case":increment":
                                return (t, e) => parseFloat(e) > parseFloat(t);
                            case":decrement":
                                return (t, e) => parseFloat(e) < parseFloat(t);
                            default:
                                return e.push(`The transition alias value "${t}" is not supported`), "* => *"
                        }
                    }(t, n);
                    if ("function" == typeof s) return void e.push(s);
                    t = s
                }
                const s = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                if (null == s || s.length < 4) return n.push(`The provided transition expression "${t}" is not supported`), e;
                const i = s[1], r = s[2], o = s[3];
                e.push(pg(i, o)), "<" != r[0] || "*" == i && "*" == o || e.push(pg(o, i))
            }(t, n, e)) : n.push(t), n
        }

        const ug = new Set(["true", "1"]), dg = new Set(["false", "0"]);

        function pg(t, e) {
            const n = ug.has(t) || dg.has(t), s = ug.has(e) || dg.has(e);
            return (i, r) => {
                let o = "*" == t || t == i, a = "*" == e || e == r;
                return !o && n && "boolean" == typeof i && (o = i ? ug.has(t) : dg.has(t)), !a && s && "boolean" == typeof r && (a = r ? ug.has(e) : dg.has(e)), o && a
            }
        }

        const fg = new RegExp("s*:selfs*,?", "g");

        function mg(t, e, n) {
            return new gg(t).build(e, n)
        }

        class gg {
            constructor(t) {
                this._driver = t
            }

            build(t, e) {
                const n = new _g(e);
                return this._resetContextStyleTimingState(n), lg(this, Jm(t), n)
            }

            _resetContextStyleTimingState(t) {
                t.currentQuerySelector = "", t.collectedStyles = {}, t.collectedStyles[""] = {}, t.currentTime = 0
            }

            visitTrigger(t, e) {
                let n = e.queryCount = 0, s = e.depCount = 0;
                const i = [], r = [];
                return "@" == t.name.charAt(0) && e.errors.push("animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"), t.definitions.forEach(t => {
                    if (this._resetContextStyleTimingState(e), 0 == t.type) {
                        const n = t, s = n.name;
                        s.toString().split(/\s*,\s*/).forEach(t => {
                            n.name = t, i.push(this.visitState(n, e))
                        }), n.name = s
                    } else if (1 == t.type) {
                        const i = this.visitTransition(t, e);
                        n += i.queryCount, s += i.depCount, r.push(i)
                    } else e.errors.push("only state() and transition() definitions can sit inside of a trigger()")
                }), {type: 7, name: t.name, states: i, transitions: r, queryCount: n, depCount: s, options: null}
            }

            visitState(t, e) {
                const n = this.visitStyle(t.styles, e), s = t.options && t.options.params || null;
                if (n.containsDynamicStyles) {
                    const i = new Set, r = s || {};
                    if (n.styles.forEach(t => {
                        if (yg(t)) {
                            const e = t;
                            Object.keys(e).forEach(t => {
                                eg(e[t]).forEach(t => {
                                    r.hasOwnProperty(t) || i.add(t)
                                })
                            })
                        }
                    }), i.size) {
                        const n = sg(i.values());
                        e.errors.push(`state("${t.name}", ...) must define default values for all the following style substitutions: ${n.join(", ")}`)
                    }
                }
                return {type: 0, name: t.name, style: n, options: s ? {params: s} : null}
            }

            visitTransition(t, e) {
                e.queryCount = 0, e.depCount = 0;
                const n = lg(this, Jm(t.animation), e);
                return {
                    type: 1,
                    matchers: hg(t.expr, e.errors),
                    animation: n,
                    queryCount: e.queryCount,
                    depCount: e.depCount,
                    options: bg(t.options)
                }
            }

            visitSequence(t, e) {
                return {type: 2, steps: t.steps.map(t => lg(this, t, e)), options: bg(t.options)}
            }

            visitGroup(t, e) {
                const n = e.currentTime;
                let s = 0;
                const i = t.steps.map(t => {
                    e.currentTime = n;
                    const i = lg(this, t, e);
                    return s = Math.max(s, e.currentTime), i
                });
                return e.currentTime = s, {type: 3, steps: i, options: bg(t.options)}
            }

            visitAnimate(t, e) {
                const n = function (t, e) {
                    let n = null;
                    if (t.hasOwnProperty("duration")) n = t; else if ("number" == typeof t) return vg(Wm(t, e).duration, 0, "");
                    const s = t;
                    if (s.split(/\s+/).some(t => "{" == t.charAt(0) && "{" == t.charAt(1))) {
                        const t = vg(0, 0, "");
                        return t.dynamic = !0, t.strValue = s, t
                    }
                    return n = n || Wm(s, e), vg(n.duration, n.delay, n.easing)
                }(t.timings, e.errors);
                let s;
                e.currentAnimateTimings = n;
                let i = t.styles ? t.styles : fm({});
                if (5 == i.type) s = this.visitKeyframes(i, e); else {
                    let i = t.styles, r = !1;
                    if (!i) {
                        r = !0;
                        const t = {};
                        n.easing && (t.easing = n.easing), i = fm(t)
                    }
                    e.currentTime += n.duration + n.delay;
                    const o = this.visitStyle(i, e);
                    o.isEmptyStep = r, s = o
                }
                return e.currentAnimateTimings = null, {type: 4, timings: n, style: s, options: null}
            }

            visitStyle(t, e) {
                const n = this._makeStyleAst(t, e);
                return this._validateStyleAst(n, e), n
            }

            _makeStyleAst(t, e) {
                const n = [];
                Array.isArray(t.styles) ? t.styles.forEach(t => {
                    "string" == typeof t ? "*" == t ? n.push(t) : e.errors.push(`The provided style string value ${t} is not allowed.`) : n.push(t)
                }) : n.push(t.styles);
                let s = !1, i = null;
                return n.forEach(t => {
                    if (yg(t)) {
                        const e = t, n = e.easing;
                        if (n && (i = n, delete e.easing), !s) for (let t in e) if (e[t].toString().indexOf("{{") >= 0) {
                            s = !0;
                            break
                        }
                    }
                }), {type: 6, styles: n, easing: i, offset: t.offset, containsDynamicStyles: s, options: null}
            }

            _validateStyleAst(t, e) {
                const n = e.currentAnimateTimings;
                let s = e.currentTime, i = e.currentTime;
                n && i > 0 && (i -= n.duration + n.delay), t.styles.forEach(t => {
                    "string" != typeof t && Object.keys(t).forEach(n => {
                        if (!this._driver.validateStyleProperty(n)) return void e.errors.push(`The provided animation property "${n}" is not a supported CSS property for animations`);
                        const r = e.collectedStyles[e.currentQuerySelector], o = r[n];
                        let a = !0;
                        o && (i != s && i >= o.startTime && s <= o.endTime && (e.errors.push(`The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${i}ms" and "${s}ms"`), a = !1), i = o.startTime), a && (r[n] = {
                            startTime: i,
                            endTime: s
                        }), e.options && function (t, e, n) {
                            const s = e.params || {}, i = eg(t);
                            i.length && i.forEach(t => {
                                s.hasOwnProperty(t) || n.push(`Unable to resolve the local animation param ${t} in the given list of values`)
                            })
                        }(t[n], e.options, e.errors)
                    })
                })
            }

            visitKeyframes(t, e) {
                const n = {type: 5, styles: [], options: null};
                if (!e.currentAnimateTimings) return e.errors.push("keyframes() must be placed inside of a call to animate()"), n;
                let s = 0;
                const i = [];
                let r = !1, o = !1, a = 0;
                const l = t.steps.map(t => {
                    const n = this._makeStyleAst(t, e);
                    let l = null != n.offset ? n.offset : function (t) {
                        if ("string" == typeof t) return null;
                        let e = null;
                        if (Array.isArray(t)) t.forEach(t => {
                            if (yg(t) && t.hasOwnProperty("offset")) {
                                const n = t;
                                e = parseFloat(n.offset), delete n.offset
                            }
                        }); else if (yg(t) && t.hasOwnProperty("offset")) {
                            const n = t;
                            e = parseFloat(n.offset), delete n.offset
                        }
                        return e
                    }(n.styles), c = 0;
                    return null != l && (s++, c = n.offset = l), o = o || c < 0 || c > 1, r = r || c < a, a = c, i.push(c), n
                });
                o && e.errors.push("Please ensure that all keyframe offsets are between 0 and 1"), r && e.errors.push("Please ensure that all keyframe offsets are in order");
                const c = t.steps.length;
                let h = 0;
                s > 0 && s < c ? e.errors.push("Not all style() steps within the declared keyframes() contain offsets") : 0 == s && (h = 1 / (c - 1));
                const u = c - 1, d = e.currentTime, p = e.currentAnimateTimings, f = p.duration;
                return l.forEach((t, s) => {
                    const r = h > 0 ? s == u ? 1 : h * s : i[s], o = r * f;
                    e.currentTime = d + p.delay + o, p.duration = o, this._validateStyleAst(t, e), t.offset = r, n.styles.push(t)
                }), n
            }

            visitReference(t, e) {
                return {type: 8, animation: lg(this, Jm(t.animation), e), options: bg(t.options)}
            }

            visitAnimateChild(t, e) {
                return e.depCount++, {type: 9, options: bg(t.options)}
            }

            visitAnimateRef(t, e) {
                return {type: 10, animation: this.visitReference(t.animation, e), options: bg(t.options)}
            }

            visitQuery(t, e) {
                const n = e.currentQuerySelector, s = t.options || {};
                e.queryCount++, e.currentQuery = t;
                const [i, r] = function (t) {
                    const e = !!t.split(/\s*,\s*/).find(t => ":self" == t);
                    return e && (t = t.replace(fg, "")), [t = t.replace(/@\*/g, ".ng-trigger").replace(/@\w+/g, t => ".ng-trigger-" + t.substr(1)).replace(/:animating/g, ".ng-animating"), e]
                }(t.selector);
                e.currentQuerySelector = n.length ? n + " " + i : i, Tm(e.collectedStyles, e.currentQuerySelector, {});
                const o = lg(this, Jm(t.animation), e);
                return e.currentQuery = null, e.currentQuerySelector = n, {
                    type: 11,
                    selector: i,
                    limit: s.limit || 0,
                    optional: !!s.optional,
                    includeSelf: r,
                    animation: o,
                    originalSelector: t.selector,
                    options: bg(t.options)
                }
            }

            visitStagger(t, e) {
                e.currentQuery || e.errors.push("stagger() can only be used inside of query()");
                const n = "full" === t.timings ? {duration: 0, delay: 0, easing: "full"} : Wm(t.timings, e.errors, !0);
                return {type: 12, animation: lg(this, Jm(t.animation), e), timings: n, options: null}
            }
        }

        class _g {
            constructor(t) {
                this.errors = t, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, this.currentTime = 0, this.collectedStyles = {}, this.options = null
            }
        }

        function yg(t) {
            return !Array.isArray(t) && "object" == typeof t
        }

        function bg(t) {
            var e;
            return t ? (t = Gm(t)).params && (t.params = (e = t.params) ? Gm(e) : null) : t = {}, t
        }

        function vg(t, e, n) {
            return {duration: t, delay: e, easing: n}
        }

        function wg(t, e, n, s, i, r, o = null, a = !1) {
            return {
                type: 1,
                element: t,
                keyframes: e,
                preStyleProps: n,
                postStyleProps: s,
                duration: i,
                delay: r,
                totalTime: i + r,
                easing: o,
                subTimeline: a
            }
        }

        class Cg {
            constructor() {
                this._map = new Map
            }

            consume(t) {
                let e = this._map.get(t);
                return e ? this._map.delete(t) : e = [], e
            }

            append(t, e) {
                let n = this._map.get(t);
                n || this._map.set(t, n = []), n.push(...e)
            }

            has(t) {
                return this._map.has(t)
            }

            clear() {
                this._map.clear()
            }
        }

        const Sg = new RegExp(":enter", "g"), xg = new RegExp(":leave", "g");

        function kg(t, e, n, s, i, r = {}, o = {}, a, l, c = []) {
            return (new Eg).buildKeyframes(t, e, n, s, i, r, o, a, l, c)
        }

        class Eg {
            buildKeyframes(t, e, n, s, i, r, o, a, l, c = []) {
                l = l || new Cg;
                const h = new Rg(t, e, l, s, i, c, []);
                h.options = a, h.currentTimeline.setStyles([r], null, h.errors, a), lg(this, n, h);
                const u = h.timelines.filter(t => t.containsAnimation());
                if (u.length && Object.keys(o).length) {
                    const t = u[u.length - 1];
                    t.allowOnlyTimelineStyles() || t.setStyles([o], null, h.errors, a)
                }
                return u.length ? u.map(t => t.buildKeyframes()) : [wg(e, [], [], [], 0, 0, "", !1)]
            }

            visitTrigger(t, e) {
            }

            visitState(t, e) {
            }

            visitTransition(t, e) {
            }

            visitAnimateChild(t, e) {
                const n = e.subInstructions.consume(e.element);
                if (n) {
                    const s = e.createSubContext(t.options), i = e.currentTimeline.currentTime,
                        r = this._visitSubInstructions(n, s, s.options);
                    i != r && e.transformIntoNewTimeline(r)
                }
                e.previousNode = t
            }

            visitAnimateRef(t, e) {
                const n = e.createSubContext(t.options);
                n.transformIntoNewTimeline(), this.visitReference(t.animation, n), e.transformIntoNewTimeline(n.currentTimeline.currentTime), e.previousNode = t
            }

            _visitSubInstructions(t, e, n) {
                let s = e.currentTimeline.currentTime;
                const i = null != n.duration ? $m(n.duration) : null, r = null != n.delay ? $m(n.delay) : null;
                return 0 !== i && t.forEach(t => {
                    const n = e.appendInstructionToTimeline(t, i, r);
                    s = Math.max(s, n.duration + n.delay)
                }), s
            }

            visitReference(t, e) {
                e.updateOptions(t.options, !0), lg(this, t.animation, e), e.previousNode = t
            }

            visitSequence(t, e) {
                const n = e.subContextCount;
                let s = e;
                const i = t.options;
                if (i && (i.params || i.delay) && (s = e.createSubContext(i), s.transformIntoNewTimeline(), null != i.delay)) {
                    6 == s.previousNode.type && (s.currentTimeline.snapshotCurrentStyles(), s.previousNode = Og);
                    const t = $m(i.delay);
                    s.delayNextStep(t)
                }
                t.steps.length && (t.steps.forEach(t => lg(this, t, s)), s.currentTimeline.applyStylesToKeyframe(), s.subContextCount > n && s.transformIntoNewTimeline()), e.previousNode = t
            }

            visitGroup(t, e) {
                const n = [];
                let s = e.currentTimeline.currentTime;
                const i = t.options && t.options.delay ? $m(t.options.delay) : 0;
                t.steps.forEach(r => {
                    const o = e.createSubContext(t.options);
                    i && o.delayNextStep(i), lg(this, r, o), s = Math.max(s, o.currentTimeline.currentTime), n.push(o.currentTimeline)
                }), n.forEach(t => e.currentTimeline.mergeTimelineCollectedStyles(t)), e.transformIntoNewTimeline(s), e.previousNode = t
            }

            _visitTiming(t, e) {
                if (t.dynamic) {
                    const n = t.strValue;
                    return Wm(e.params ? ng(n, e.params, e.errors) : n, e.errors)
                }
                return {duration: t.duration, delay: t.delay, easing: t.easing}
            }

            visitAnimate(t, e) {
                const n = e.currentAnimateTimings = this._visitTiming(t.timings, e), s = e.currentTimeline;
                n.delay && (e.incrementTime(n.delay), s.snapshotCurrentStyles());
                const i = t.style;
                5 == i.type ? this.visitKeyframes(i, e) : (e.incrementTime(n.duration), this.visitStyle(i, e), s.applyStylesToKeyframe()), e.currentAnimateTimings = null, e.previousNode = t
            }

            visitStyle(t, e) {
                const n = e.currentTimeline, s = e.currentAnimateTimings;
                !s && n.getCurrentStyleProperties().length && n.forwardFrame();
                const i = s && s.easing || t.easing;
                t.isEmptyStep ? n.applyEmptyStep(i) : n.setStyles(t.styles, i, e.errors, e.options), e.previousNode = t
            }

            visitKeyframes(t, e) {
                const n = e.currentAnimateTimings, s = e.currentTimeline.duration, i = n.duration,
                    r = e.createSubContext().currentTimeline;
                r.easing = n.easing, t.styles.forEach(t => {
                    r.forwardTime((t.offset || 0) * i), r.setStyles(t.styles, t.easing, e.errors, e.options), r.applyStylesToKeyframe()
                }), e.currentTimeline.mergeTimelineCollectedStyles(r), e.transformIntoNewTimeline(s + i), e.previousNode = t
            }

            visitQuery(t, e) {
                const n = e.currentTimeline.currentTime, s = t.options || {}, i = s.delay ? $m(s.delay) : 0;
                i && (6 === e.previousNode.type || 0 == n && e.currentTimeline.getCurrentStyleProperties().length) && (e.currentTimeline.snapshotCurrentStyles(), e.previousNode = Og);
                let r = n;
                const o = e.invokeQuery(t.selector, t.originalSelector, t.limit, t.includeSelf, !!s.optional, e.errors);
                e.currentQueryTotal = o.length;
                let a = null;
                o.forEach((n, s) => {
                    e.currentQueryIndex = s;
                    const o = e.createSubContext(t.options, n);
                    i && o.delayNextStep(i), n === e.element && (a = o.currentTimeline), lg(this, t.animation, o), o.currentTimeline.applyStylesToKeyframe(), r = Math.max(r, o.currentTimeline.currentTime)
                }), e.currentQueryIndex = 0, e.currentQueryTotal = 0, e.transformIntoNewTimeline(r), a && (e.currentTimeline.mergeTimelineCollectedStyles(a), e.currentTimeline.snapshotCurrentStyles()), e.previousNode = t
            }

            visitStagger(t, e) {
                const n = e.parentContext, s = e.currentTimeline, i = t.timings, r = Math.abs(i.duration),
                    o = r * (e.currentQueryTotal - 1);
                let a = r * e.currentQueryIndex;
                switch (i.duration < 0 ? "reverse" : i.easing) {
                    case"reverse":
                        a = o - a;
                        break;
                    case"full":
                        a = n.currentStaggerTime
                }
                const l = e.currentTimeline;
                a && l.delayNextStep(a);
                const c = l.currentTime;
                lg(this, t.animation, e), e.previousNode = t, n.currentStaggerTime = s.currentTime - c + (s.startTime - n.currentTimeline.startTime)
            }
        }

        const Og = {};

        class Rg {
            constructor(t, e, n, s, i, r, o, a) {
                this._driver = t, this.element = e, this.subInstructions = n, this._enterClassName = s, this._leaveClassName = i, this.errors = r, this.timelines = o, this.parentContext = null, this.currentAnimateTimings = null, this.previousNode = Og, this.subContextCount = 0, this.options = {}, this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, this.currentTimeline = a || new Tg(this._driver, e, 0), o.push(this.currentTimeline)
            }

            get params() {
                return this.options.params
            }

            updateOptions(t, e) {
                if (!t) return;
                const n = t;
                let s = this.options;
                null != n.duration && (s.duration = $m(n.duration)), null != n.delay && (s.delay = $m(n.delay));
                const i = n.params;
                if (i) {
                    let t = s.params;
                    t || (t = this.options.params = {}), Object.keys(i).forEach(n => {
                        e && t.hasOwnProperty(n) || (t[n] = ng(i[n], t, this.errors))
                    })
                }
            }

            _copyOptions() {
                const t = {};
                if (this.options) {
                    const e = this.options.params;
                    if (e) {
                        const n = t.params = {};
                        Object.keys(e).forEach(t => {
                            n[t] = e[t]
                        })
                    }
                }
                return t
            }

            createSubContext(t = null, e, n) {
                const s = e || this.element,
                    i = new Rg(this._driver, s, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(s, n || 0));
                return i.previousNode = this.previousNode, i.currentAnimateTimings = this.currentAnimateTimings, i.options = this._copyOptions(), i.updateOptions(t), i.currentQueryIndex = this.currentQueryIndex, i.currentQueryTotal = this.currentQueryTotal, i.parentContext = this, this.subContextCount++, i
            }

            transformIntoNewTimeline(t) {
                return this.previousNode = Og, this.currentTimeline = this.currentTimeline.fork(this.element, t), this.timelines.push(this.currentTimeline), this.currentTimeline
            }

            appendInstructionToTimeline(t, e, n) {
                const s = {
                        duration: null != e ? e : t.duration,
                        delay: this.currentTimeline.currentTime + (null != n ? n : 0) + t.delay,
                        easing: ""
                    },
                    i = new Ag(this._driver, t.element, t.keyframes, t.preStyleProps, t.postStyleProps, s, t.stretchStartingKeyframe);
                return this.timelines.push(i), s
            }

            incrementTime(t) {
                this.currentTimeline.forwardTime(this.currentTimeline.duration + t)
            }

            delayNextStep(t) {
                t > 0 && this.currentTimeline.delayNextStep(t)
            }

            invokeQuery(t, e, n, s, i, r) {
                let o = [];
                if (s && o.push(this.element), t.length > 0) {
                    t = (t = t.replace(Sg, "." + this._enterClassName)).replace(xg, "." + this._leaveClassName);
                    let e = this._driver.query(this.element, t, 1 != n);
                    0 !== n && (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)), o.push(...e)
                }
                return i || 0 != o.length || r.push(`\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`), o
            }
        }

        class Tg {
            constructor(t, e, n, s) {
                this._driver = t, this.element = e, this.startTime = n, this._elementTimelineStylesLookup = s, this.duration = 0, this._previousKeyframe = {}, this._currentKeyframe = {}, this._keyframes = new Map, this._styleSummary = {}, this._pendingStyles = {}, this._backFill = {}, this._currentEmptyStepKeyframe = null, this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map), this._localTimelineStyles = Object.create(this._backFill, {}), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(e), this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, this._elementTimelineStylesLookup.set(e, this._localTimelineStyles)), this._loadKeyframe()
            }

            containsAnimation() {
                switch (this._keyframes.size) {
                    case 0:
                        return !1;
                    case 1:
                        return this.getCurrentStyleProperties().length > 0;
                    default:
                        return !0
                }
            }

            getCurrentStyleProperties() {
                return Object.keys(this._currentKeyframe)
            }

            get currentTime() {
                return this.startTime + this.duration
            }

            delayNextStep(t) {
                const e = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
                this.duration || e ? (this.forwardTime(this.currentTime + t), e && this.snapshotCurrentStyles()) : this.startTime += t
            }

            fork(t, e) {
                return this.applyStylesToKeyframe(), new Tg(this._driver, t, e || this.currentTime, this._elementTimelineStylesLookup)
            }

            _loadKeyframe() {
                this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}), this._keyframes.set(this.duration, this._currentKeyframe))
            }

            forwardFrame() {
                this.duration += 1, this._loadKeyframe()
            }

            forwardTime(t) {
                this.applyStylesToKeyframe(), this.duration = t, this._loadKeyframe()
            }

            _updateStyle(t, e) {
                this._localTimelineStyles[t] = e, this._globalTimelineStyles[t] = e, this._styleSummary[t] = {
                    time: this.currentTime,
                    value: e
                }
            }

            allowOnlyTimelineStyles() {
                return this._currentEmptyStepKeyframe !== this._currentKeyframe
            }

            applyEmptyStep(t) {
                t && (this._previousKeyframe.easing = t), Object.keys(this._globalTimelineStyles).forEach(t => {
                    this._backFill[t] = this._globalTimelineStyles[t] || "*", this._currentKeyframe[t] = "*"
                }), this._currentEmptyStepKeyframe = this._currentKeyframe
            }

            setStyles(t, e, n, s) {
                e && (this._previousKeyframe.easing = e);
                const i = s && s.params || {}, r = function (t, e) {
                    const n = {};
                    let s;
                    return t.forEach(t => {
                        "*" === t ? (s = s || Object.keys(e), s.forEach(t => {
                            n[t] = "*"
                        })) : Km(t, !1, n)
                    }), n
                }(t, this._globalTimelineStyles);
                Object.keys(r).forEach(t => {
                    const e = ng(r[t], i, n);
                    this._pendingStyles[t] = e, this._localTimelineStyles.hasOwnProperty(t) || (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(t) ? this._globalTimelineStyles[t] : "*"), this._updateStyle(t, e)
                })
            }

            applyStylesToKeyframe() {
                const t = this._pendingStyles, e = Object.keys(t);
                0 != e.length && (this._pendingStyles = {}, e.forEach(e => {
                    this._currentKeyframe[e] = t[e]
                }), Object.keys(this._localTimelineStyles).forEach(t => {
                    this._currentKeyframe.hasOwnProperty(t) || (this._currentKeyframe[t] = this._localTimelineStyles[t])
                }))
            }

            snapshotCurrentStyles() {
                Object.keys(this._localTimelineStyles).forEach(t => {
                    const e = this._localTimelineStyles[t];
                    this._pendingStyles[t] = e, this._updateStyle(t, e)
                })
            }

            getFinalKeyframe() {
                return this._keyframes.get(this.duration)
            }

            get properties() {
                const t = [];
                for (let e in this._currentKeyframe) t.push(e);
                return t
            }

            mergeTimelineCollectedStyles(t) {
                Object.keys(t._styleSummary).forEach(e => {
                    const n = this._styleSummary[e], s = t._styleSummary[e];
                    (!n || s.time > n.time) && this._updateStyle(e, s.value)
                })
            }

            buildKeyframes() {
                this.applyStylesToKeyframe();
                const t = new Set, e = new Set, n = 1 === this._keyframes.size && 0 === this.duration;
                let s = [];
                this._keyframes.forEach((i, r) => {
                    const o = Km(i, !0);
                    Object.keys(o).forEach(n => {
                        const s = o[n];
                        "!" == s ? t.add(n) : "*" == s && e.add(n)
                    }), n || (o.offset = r / this.duration), s.push(o)
                });
                const i = t.size ? sg(t.values()) : [], r = e.size ? sg(e.values()) : [];
                if (n) {
                    const t = s[0], e = Gm(t);
                    t.offset = 0, e.offset = 1, s = [t, e]
                }
                return wg(this.element, s, i, r, this.duration, this.startTime, this.easing, !1)
            }
        }

        class Ag extends Tg {
            constructor(t, e, n, s, i, r, o = !1) {
                super(t, e, r.delay), this.element = e, this.keyframes = n, this.preStyleProps = s, this.postStyleProps = i, this._stretchStartingKeyframe = o, this.timings = {
                    duration: r.duration,
                    delay: r.delay,
                    easing: r.easing
                }
            }

            containsAnimation() {
                return this.keyframes.length > 1
            }

            buildKeyframes() {
                let t = this.keyframes, {delay: e, duration: n, easing: s} = this.timings;
                if (this._stretchStartingKeyframe && e) {
                    const i = [], r = n + e, o = e / r, a = Km(t[0], !1);
                    a.offset = 0, i.push(a);
                    const l = Km(t[0], !1);
                    l.offset = Dg(o), i.push(l);
                    const c = t.length - 1;
                    for (let s = 1; s <= c; s++) {
                        let o = Km(t[s], !1);
                        o.offset = Dg((e + o.offset * n) / r), i.push(o)
                    }
                    n = r, e = 0, s = "", t = i
                }
                return wg(this.element, t, this.preStyleProps, this.postStyleProps, n, e, s, !0)
            }
        }

        function Dg(t, e = 3) {
            const n = Math.pow(10, e - 1);
            return Math.round(t * n) / n
        }

        class Ig {
        }

        class Pg extends Ig {
            normalizePropertyName(t, e) {
                return rg(t)
            }

            normalizeStyleValue(t, e, n, s) {
                let i = "";
                const r = n.toString().trim();
                if (Ng[e] && 0 !== n && "0" !== n) if ("number" == typeof n) i = "px"; else {
                    const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
                    e && 0 == e[1].length && s.push(`Please provide a CSS unit value for ${t}:${n}`)
                }
                return r + i
            }
        }

        const Ng = (() => function (t) {
            const e = {};
            return t.forEach(t => e[t] = !0), e
        }("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(",")))();

        function Fg(t, e, n, s, i, r, o, a, l, c, h, u, d) {
            return {
                type: 0,
                element: t,
                triggerName: e,
                isRemovalTransition: i,
                fromState: n,
                fromStyles: r,
                toState: s,
                toStyles: o,
                timelines: a,
                queriedElements: l,
                preStyleProps: c,
                postStyleProps: h,
                totalTime: u,
                errors: d
            }
        }

        const Lg = {};

        class Mg {
            constructor(t, e, n) {
                this._triggerName = t, this.ast = e, this._stateStyles = n
            }

            match(t, e, n, s) {
                return function (t, e, n, s, i) {
                    return t.some(t => t(e, n, s, i))
                }(this.ast.matchers, t, e, n, s)
            }

            buildStyles(t, e, n) {
                const s = this._stateStyles["*"], i = this._stateStyles[t], r = s ? s.buildStyles(e, n) : {};
                return i ? i.buildStyles(e, n) : r
            }

            build(t, e, n, s, i, r, o, a, l, c) {
                const h = [], u = this.ast.options && this.ast.options.params || Lg,
                    d = this.buildStyles(n, o && o.params || Lg, h), p = a && a.params || Lg,
                    f = this.buildStyles(s, p, h), m = new Set, g = new Map, _ = new Map, y = "void" === s,
                    b = {params: Object.assign(Object.assign({}, u), p)},
                    v = c ? [] : kg(t, e, this.ast.animation, i, r, d, f, b, l, h);
                let w = 0;
                if (v.forEach(t => {
                    w = Math.max(t.duration + t.delay, w)
                }), h.length) return Fg(e, this._triggerName, n, s, y, d, f, [], [], g, _, w, h);
                v.forEach(t => {
                    const n = t.element, s = Tm(g, n, {});
                    t.preStyleProps.forEach(t => s[t] = !0);
                    const i = Tm(_, n, {});
                    t.postStyleProps.forEach(t => i[t] = !0), n !== e && m.add(n)
                });
                const C = sg(m.values());
                return Fg(e, this._triggerName, n, s, y, d, f, v, C, g, _, w)
            }
        }

        class Vg {
            constructor(t, e) {
                this.styles = t, this.defaultParams = e
            }

            buildStyles(t, e) {
                const n = {}, s = Gm(this.defaultParams);
                return Object.keys(t).forEach(e => {
                    const n = t[e];
                    null != n && (s[e] = n)
                }), this.styles.styles.forEach(t => {
                    if ("string" != typeof t) {
                        const i = t;
                        Object.keys(i).forEach(t => {
                            let r = i[t];
                            r.length > 1 && (r = ng(r, s, e)), n[t] = r
                        })
                    }
                }), n
            }
        }

        class jg {
            constructor(t, e) {
                this.name = t, this.ast = e, this.transitionFactories = [], this.states = {}, e.states.forEach(t => {
                    this.states[t.name] = new Vg(t.style, t.options && t.options.params || {})
                }), zg(this.states, "true", "1"), zg(this.states, "false", "0"), e.transitions.forEach(e => {
                    this.transitionFactories.push(new Mg(t, e, this.states))
                }), this.fallbackTransition = new Mg(t, {
                    type: 1,
                    animation: {type: 2, steps: [], options: null},
                    matchers: [(t, e) => !0],
                    options: null,
                    queryCount: 0,
                    depCount: 0
                }, this.states)
            }

            get containsQueries() {
                return this.ast.queryCount > 0
            }

            matchTransition(t, e, n, s) {
                return this.transitionFactories.find(i => i.match(t, e, n, s)) || null
            }

            matchStyles(t, e, n) {
                return this.fallbackTransition.buildStyles(t, e, n)
            }
        }

        function zg(t, e, n) {
            t.hasOwnProperty(e) ? t.hasOwnProperty(n) || (t[n] = t[e]) : t.hasOwnProperty(n) && (t[e] = t[n])
        }

        const Bg = new Cg;

        class Hg {
            constructor(t, e, n) {
                this.bodyNode = t, this._driver = e, this._normalizer = n, this._animations = {}, this._playersById = {}, this.players = []
            }

            register(t, e) {
                const n = [], s = mg(this._driver, e, n);
                if (n.length) throw new Error("Unable to build the animation due to the following errors: " + n.join("\n"));
                this._animations[t] = s
            }

            _buildPlayer(t, e, n) {
                const s = t.element, i = km(0, this._normalizer, 0, t.keyframes, e, n);
                return this._driver.animate(s, i, t.duration, t.delay, t.easing, [], !0)
            }

            create(t, e, n = {}) {
                const s = [], i = this._animations[t];
                let r;
                const o = new Map;
                if (i ? (r = kg(this._driver, e, i, "ng-enter", "ng-leave", {}, {}, n, Bg, s), r.forEach(t => {
                    const e = Tm(o, t.element, {});
                    t.postStyleProps.forEach(t => e[t] = null)
                })) : (s.push("The requested animation doesn't exist or has already been destroyed"), r = []), s.length) throw new Error("Unable to create the animation due to the following errors: " + s.join("\n"));
                o.forEach((t, e) => {
                    Object.keys(t).forEach(n => {
                        t[n] = this._driver.computeStyle(e, n, "*")
                    })
                });
                const a = xm(r.map(t => {
                    const e = o.get(t.element);
                    return this._buildPlayer(t, {}, e)
                }));
                return this._playersById[t] = a, a.onDestroy(() => this.destroy(t)), this.players.push(a), a
            }

            destroy(t) {
                const e = this._getPlayer(t);
                e.destroy(), delete this._playersById[t];
                const n = this.players.indexOf(e);
                n >= 0 && this.players.splice(n, 1)
            }

            _getPlayer(t) {
                const e = this._playersById[t];
                if (!e) throw new Error("Unable to find the timeline player referenced by " + t);
                return e
            }

            listen(t, e, n, s) {
                const i = Rm(e, "", "", "");
                return Em(this._getPlayer(t), n, i, s), () => {
                }
            }

            command(t, e, n, s) {
                if ("register" == n) return void this.register(t, s[0]);
                if ("create" == n) return void this.create(t, e, s[0] || {});
                const i = this._getPlayer(t);
                switch (n) {
                    case"play":
                        i.play();
                        break;
                    case"pause":
                        i.pause();
                        break;
                    case"reset":
                        i.reset();
                        break;
                    case"restart":
                        i.restart();
                        break;
                    case"finish":
                        i.finish();
                        break;
                    case"init":
                        i.init();
                        break;
                    case"setPosition":
                        i.setPosition(parseFloat(s[0]));
                        break;
                    case"destroy":
                        this.destroy(t)
                }
            }
        }

        const Ug = [],
            $g = {namespaceId: "", setForRemoval: !1, setForMove: !1, hasAnimation: !1, removedBeforeQueried: !1},
            qg = {namespaceId: "", setForMove: !1, setForRemoval: !1, hasAnimation: !1, removedBeforeQueried: !0};

        class Wg {
            constructor(t, e = "") {
                this.namespaceId = e;
                const n = t && t.hasOwnProperty("value");
                if (this.value = null != (s = n ? t.value : t) ? s : null, n) {
                    const e = Gm(t);
                    delete e.value, this.options = e
                } else this.options = {};
                var s;
                this.options.params || (this.options.params = {})
            }

            get params() {
                return this.options.params
            }

            absorbOptions(t) {
                const e = t.params;
                if (e) {
                    const t = this.options.params;
                    Object.keys(e).forEach(n => {
                        null == t[n] && (t[n] = e[n])
                    })
                }
            }
        }

        const Gg = new Wg("void");

        class Kg {
            constructor(t, e, n) {
                this.id = t, this.hostElement = e, this._engine = n, this.players = [], this._triggers = {}, this._queue = [], this._elementListeners = new Map, this._hostClassName = "ng-tns-" + t, e_(e, this._hostClassName)
            }

            listen(t, e, n, s) {
                if (!this._triggers.hasOwnProperty(e)) throw new Error(`Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`);
                if (null == n || 0 == n.length) throw new Error(`Unable to listen on the animation trigger "${e}" because the provided event is undefined!`);
                if ("start" != (i = n) && "done" != i) throw new Error(`The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`);
                var i;
                const r = Tm(this._elementListeners, t, []), o = {name: e, phase: n, callback: s};
                r.push(o);
                const a = Tm(this._engine.statesByElement, t, {});
                return a.hasOwnProperty(e) || (e_(t, "ng-trigger"), e_(t, "ng-trigger-" + e), a[e] = Gg), () => {
                    this._engine.afterFlush(() => {
                        const t = r.indexOf(o);
                        t >= 0 && r.splice(t, 1), this._triggers[e] || delete a[e]
                    })
                }
            }

            register(t, e) {
                return !this._triggers[t] && (this._triggers[t] = e, !0)
            }

            _getTrigger(t) {
                const e = this._triggers[t];
                if (!e) throw new Error(`The provided animation trigger "${t}" has not been registered!`);
                return e
            }

            trigger(t, e, n, s = !0) {
                const i = this._getTrigger(e), r = new Qg(this.id, e, t);
                let o = this._engine.statesByElement.get(t);
                o || (e_(t, "ng-trigger"), e_(t, "ng-trigger-" + e), this._engine.statesByElement.set(t, o = {}));
                let a = o[e];
                const l = new Wg(n, this.id);
                if (!(n && n.hasOwnProperty("value")) && a && l.absorbOptions(a.options), o[e] = l, a || (a = Gg), "void" !== l.value && a.value === l.value) {
                    if (!function (t, e) {
                        const n = Object.keys(t), s = Object.keys(e);
                        if (n.length != s.length) return !1;
                        for (let i = 0; i < n.length; i++) {
                            const s = n[i];
                            if (!e.hasOwnProperty(s) || t[s] !== e[s]) return !1
                        }
                        return !0
                    }(a.params, l.params)) {
                        const e = [], n = i.matchStyles(a.value, a.params, e), s = i.matchStyles(l.value, l.params, e);
                        e.length ? this._engine.reportError(e) : this._engine.afterFlush(() => {
                            Xm(t, n), Ym(t, s)
                        })
                    }
                    return
                }
                const c = Tm(this._engine.playersByElement, t, []);
                c.forEach(t => {
                    t.namespaceId == this.id && t.triggerName == e && t.queued && t.destroy()
                });
                let h = i.matchTransition(a.value, l.value, t, l.params), u = !1;
                if (!h) {
                    if (!s) return;
                    h = i.fallbackTransition, u = !0
                }
                return this._engine.totalQueuedPlayers++, this._queue.push({
                    element: t,
                    triggerName: e,
                    transition: h,
                    fromState: a,
                    toState: l,
                    player: r,
                    isFallbackTransition: u
                }), u || (e_(t, "ng-animate-queued"), r.onStart(() => {
                    n_(t, "ng-animate-queued")
                })), r.onDone(() => {
                    let e = this.players.indexOf(r);
                    e >= 0 && this.players.splice(e, 1);
                    const n = this._engine.playersByElement.get(t);
                    if (n) {
                        let t = n.indexOf(r);
                        t >= 0 && n.splice(t, 1)
                    }
                }), this.players.push(r), c.push(r), r
            }

            deregister(t) {
                delete this._triggers[t], this._engine.statesByElement.forEach((e, n) => {
                    delete e[t]
                }), this._elementListeners.forEach((e, n) => {
                    this._elementListeners.set(n, e.filter(e => e.name != t))
                })
            }

            clearElementCache(t) {
                this._engine.statesByElement.delete(t), this._elementListeners.delete(t);
                const e = this._engine.playersByElement.get(t);
                e && (e.forEach(t => t.destroy()), this._engine.playersByElement.delete(t))
            }

            _signalRemovalForInnerTriggers(t, e) {
                const n = this._engine.driver.query(t, ".ng-trigger", !0);
                n.forEach(t => {
                    if (t.__ng_removed) return;
                    const n = this._engine.fetchNamespacesByElement(t);
                    n.size ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0)) : this.clearElementCache(t)
                }), this._engine.afterFlushAnimationsDone(() => n.forEach(t => this.clearElementCache(t)))
            }

            triggerLeaveAnimation(t, e, n, s) {
                const i = this._engine.statesByElement.get(t);
                if (i) {
                    const r = [];
                    if (Object.keys(i).forEach(e => {
                        if (this._triggers[e]) {
                            const n = this.trigger(t, e, "void", s);
                            n && r.push(n)
                        }
                    }), r.length) return this._engine.markElementAsRemoved(this.id, t, !0, e), n && xm(r).onDone(() => this._engine.processLeaveNode(t)), !0
                }
                return !1
            }

            prepareLeaveAnimationListeners(t) {
                const e = this._elementListeners.get(t), n = this._engine.statesByElement.get(t);
                if (e && n) {
                    const s = new Set;
                    e.forEach(e => {
                        const i = e.name;
                        if (s.has(i)) return;
                        s.add(i);
                        const r = this._triggers[i].fallbackTransition, o = n[i] || Gg, a = new Wg("void"),
                            l = new Qg(this.id, i, t);
                        this._engine.totalQueuedPlayers++, this._queue.push({
                            element: t,
                            triggerName: i,
                            transition: r,
                            fromState: o,
                            toState: a,
                            player: l,
                            isFallbackTransition: !0
                        })
                    })
                }
            }

            removeNode(t, e) {
                const n = this._engine;
                if (t.childElementCount && this._signalRemovalForInnerTriggers(t, e), this.triggerLeaveAnimation(t, e, !0)) return;
                let s = !1;
                if (n.totalAnimations) {
                    const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
                    if (e && e.length) s = !0; else {
                        let e = t;
                        for (; e = e.parentNode;) if (n.statesByElement.get(e)) {
                            s = !0;
                            break
                        }
                    }
                }
                if (this.prepareLeaveAnimationListeners(t), s) n.markElementAsRemoved(this.id, t, !1, e); else {
                    const s = t.__ng_removed;
                    s && s !== $g || (n.afterFlush(() => this.clearElementCache(t)), n.destroyInnerAnimations(t), n._onRemovalComplete(t, e))
                }
            }

            insertNode(t, e) {
                e_(t, this._hostClassName)
            }

            drainQueuedTransitions(t) {
                const e = [];
                return this._queue.forEach(n => {
                    const s = n.player;
                    if (s.destroyed) return;
                    const i = n.element, r = this._elementListeners.get(i);
                    r && r.forEach(e => {
                        if (e.name == n.triggerName) {
                            const s = Rm(i, n.triggerName, n.fromState.value, n.toState.value);
                            s._data = t, Em(n.player, e.phase, s, e.callback)
                        }
                    }), s.markedForDestroy ? this._engine.afterFlush(() => {
                        s.destroy()
                    }) : e.push(n)
                }), this._queue = [], e.sort((t, e) => {
                    const n = t.transition.ast.depCount, s = e.transition.ast.depCount;
                    return 0 == n || 0 == s ? n - s : this._engine.driver.containsElement(t.element, e.element) ? 1 : -1
                })
            }

            destroy(t) {
                this.players.forEach(t => t.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, t)
            }

            elementContainsData(t) {
                let e = !1;
                return this._elementListeners.has(t) && (e = !0), e = !!this._queue.find(e => e.element === t) || e, e
            }
        }

        class Zg {
            constructor(t, e, n) {
                this.bodyNode = t, this.driver = e, this._normalizer = n, this.players = [], this.newHostElements = new Map, this.playersByElement = new Map, this.playersByQueriedElement = new Map, this.statesByElement = new Map, this.disabledNodes = new Set, this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map, this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = (t, e) => {
                }
            }

            _onRemovalComplete(t, e) {
                this.onRemovalComplete(t, e)
            }

            get queuedPlayers() {
                const t = [];
                return this._namespaceList.forEach(e => {
                    e.players.forEach(e => {
                        e.queued && t.push(e)
                    })
                }), t
            }

            createNamespace(t, e) {
                const n = new Kg(t, e, this);
                return e.parentNode ? this._balanceNamespaceList(n, e) : (this.newHostElements.set(e, n), this.collectEnterElement(e)), this._namespaceLookup[t] = n
            }

            _balanceNamespaceList(t, e) {
                const n = this._namespaceList.length - 1;
                if (n >= 0) {
                    let s = !1;
                    for (let i = n; i >= 0; i--) if (this.driver.containsElement(this._namespaceList[i].hostElement, e)) {
                        this._namespaceList.splice(i + 1, 0, t), s = !0;
                        break
                    }
                    s || this._namespaceList.splice(0, 0, t)
                } else this._namespaceList.push(t);
                return this.namespacesByHostElement.set(e, t), t
            }

            register(t, e) {
                let n = this._namespaceLookup[t];
                return n || (n = this.createNamespace(t, e)), n
            }

            registerTrigger(t, e, n) {
                let s = this._namespaceLookup[t];
                s && s.register(e, n) && this.totalAnimations++
            }

            destroy(t, e) {
                if (!t) return;
                const n = this._fetchNamespace(t);
                this.afterFlush(() => {
                    this.namespacesByHostElement.delete(n.hostElement), delete this._namespaceLookup[t];
                    const e = this._namespaceList.indexOf(n);
                    e >= 0 && this._namespaceList.splice(e, 1)
                }), this.afterFlushAnimationsDone(() => n.destroy(e))
            }

            _fetchNamespace(t) {
                return this._namespaceLookup[t]
            }

            fetchNamespacesByElement(t) {
                const e = new Set, n = this.statesByElement.get(t);
                if (n) {
                    const t = Object.keys(n);
                    for (let s = 0; s < t.length; s++) {
                        const i = n[t[s]].namespaceId;
                        if (i) {
                            const t = this._fetchNamespace(i);
                            t && e.add(t)
                        }
                    }
                }
                return e
            }

            trigger(t, e, n, s) {
                if (Yg(e)) {
                    const i = this._fetchNamespace(t);
                    if (i) return i.trigger(e, n, s), !0
                }
                return !1
            }

            insertNode(t, e, n, s) {
                if (!Yg(e)) return;
                const i = e.__ng_removed;
                if (i && i.setForRemoval) {
                    i.setForRemoval = !1, i.setForMove = !0;
                    const t = this.collectedLeaveElements.indexOf(e);
                    t >= 0 && this.collectedLeaveElements.splice(t, 1)
                }
                if (t) {
                    const s = this._fetchNamespace(t);
                    s && s.insertNode(e, n)
                }
                s && this.collectEnterElement(e)
            }

            collectEnterElement(t) {
                this.collectedEnterElements.push(t)
            }

            markElementAsDisabled(t, e) {
                e ? this.disabledNodes.has(t) || (this.disabledNodes.add(t), e_(t, "ng-animate-disabled")) : this.disabledNodes.has(t) && (this.disabledNodes.delete(t), n_(t, "ng-animate-disabled"))
            }

            removeNode(t, e, n, s) {
                if (Yg(e)) {
                    const i = t ? this._fetchNamespace(t) : null;
                    if (i ? i.removeNode(e, s) : this.markElementAsRemoved(t, e, !1, s), n) {
                        const n = this.namespacesByHostElement.get(e);
                        n && n.id !== t && n.removeNode(e, s)
                    }
                } else this._onRemovalComplete(e, s)
            }

            markElementAsRemoved(t, e, n, s) {
                this.collectedLeaveElements.push(e), e.__ng_removed = {
                    namespaceId: t,
                    setForRemoval: s,
                    hasAnimation: n,
                    removedBeforeQueried: !1
                }
            }

            listen(t, e, n, s, i) {
                return Yg(e) ? this._fetchNamespace(t).listen(e, n, s, i) : () => {
                }
            }

            _buildInstruction(t, e, n, s, i) {
                return t.transition.build(this.driver, t.element, t.fromState.value, t.toState.value, n, s, t.fromState.options, t.toState.options, e, i)
            }

            destroyInnerAnimations(t) {
                let e = this.driver.query(t, ".ng-trigger", !0);
                e.forEach(t => this.destroyActiveAnimationsForElement(t)), 0 != this.playersByQueriedElement.size && (e = this.driver.query(t, ".ng-animating", !0), e.forEach(t => this.finishActiveQueriedAnimationOnElement(t)))
            }

            destroyActiveAnimationsForElement(t) {
                const e = this.playersByElement.get(t);
                e && e.forEach(t => {
                    t.queued ? t.markedForDestroy = !0 : t.destroy()
                })
            }

            finishActiveQueriedAnimationOnElement(t) {
                const e = this.playersByQueriedElement.get(t);
                e && e.forEach(t => t.finish())
            }

            whenRenderingDone() {
                return new Promise(t => {
                    if (this.players.length) return xm(this.players).onDone(() => t());
                    t()
                })
            }

            processLeaveNode(t) {
                const e = t.__ng_removed;
                if (e && e.setForRemoval) {
                    if (t.__ng_removed = $g, e.namespaceId) {
                        this.destroyInnerAnimations(t);
                        const n = this._fetchNamespace(e.namespaceId);
                        n && n.clearElementCache(t)
                    }
                    this._onRemovalComplete(t, e.setForRemoval)
                }
                this.driver.matchesElement(t, ".ng-animate-disabled") && this.markElementAsDisabled(t, !1), this.driver.query(t, ".ng-animate-disabled", !0).forEach(t => {
                    this.markElementAsDisabled(t, !1)
                })
            }

            flush(t = -1) {
                let e = [];
                if (this.newHostElements.size && (this.newHostElements.forEach((t, e) => this._balanceNamespaceList(t, e)), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length) for (let n = 0; n < this.collectedEnterElements.length; n++) e_(this.collectedEnterElements[n], "ng-star-inserted");
                if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                    const n = [];
                    try {
                        e = this._flushAnimations(n, t)
                    } finally {
                        for (let t = 0; t < n.length; t++) n[t]()
                    }
                } else for (let n = 0; n < this.collectedLeaveElements.length; n++) this.processLeaveNode(this.collectedLeaveElements[n]);
                if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, this._flushFns.forEach(t => t()), this._flushFns = [], this._whenQuietFns.length) {
                    const t = this._whenQuietFns;
                    this._whenQuietFns = [], e.length ? xm(e).onDone(() => {
                        t.forEach(t => t())
                    }) : t.forEach(t => t())
                }
            }

            reportError(t) {
                throw new Error("Unable to process animations due to the following failed trigger transitions\n " + t.join("\n"))
            }

            _flushAnimations(t, e) {
                const n = new Cg, s = [], i = new Map, r = [], o = new Map, a = new Map, l = new Map, c = new Set;
                this.disabledNodes.forEach(t => {
                    c.add(t);
                    const e = this.driver.query(t, ".ng-animate-queued", !0);
                    for (let n = 0; n < e.length; n++) c.add(e[n])
                });
                const h = this.bodyNode, u = Array.from(this.statesByElement.keys()),
                    d = t_(u, this.collectedEnterElements), p = new Map;
                let f = 0;
                d.forEach((t, e) => {
                    const n = "ng-enter" + f++;
                    p.set(e, n), t.forEach(t => e_(t, n))
                });
                const m = [], g = new Set, _ = new Set;
                for (let A = 0; A < this.collectedLeaveElements.length; A++) {
                    const t = this.collectedLeaveElements[A], e = t.__ng_removed;
                    e && e.setForRemoval && (m.push(t), g.add(t), e.hasAnimation ? this.driver.query(t, ".ng-star-inserted", !0).forEach(t => g.add(t)) : _.add(t))
                }
                const y = new Map, b = t_(u, Array.from(g));
                b.forEach((t, e) => {
                    const n = "ng-leave" + f++;
                    y.set(e, n), t.forEach(t => e_(t, n))
                }), t.push(() => {
                    d.forEach((t, e) => {
                        const n = p.get(e);
                        t.forEach(t => n_(t, n))
                    }), b.forEach((t, e) => {
                        const n = y.get(e);
                        t.forEach(t => n_(t, n))
                    }), m.forEach(t => {
                        this.processLeaveNode(t)
                    })
                });
                const v = [], w = [];
                for (let A = this._namespaceList.length - 1; A >= 0; A--) this._namespaceList[A].drainQueuedTransitions(e).forEach(t => {
                    const e = t.player, i = t.element;
                    if (v.push(e), this.collectedEnterElements.length) {
                        const t = i.__ng_removed;
                        if (t && t.setForMove) return void e.destroy()
                    }
                    const c = !h || !this.driver.containsElement(h, i), u = y.get(i), d = p.get(i),
                        f = this._buildInstruction(t, n, d, u, c);
                    if (f.errors && f.errors.length) w.push(f); else {
                        if (c) return e.onStart(() => Xm(i, f.fromStyles)), e.onDestroy(() => Ym(i, f.toStyles)), void s.push(e);
                        if (t.isFallbackTransition) return e.onStart(() => Xm(i, f.fromStyles)), e.onDestroy(() => Ym(i, f.toStyles)), void s.push(e);
                        f.timelines.forEach(t => t.stretchStartingKeyframe = !0), n.append(i, f.timelines), r.push({
                            instruction: f,
                            player: e,
                            element: i
                        }), f.queriedElements.forEach(t => Tm(o, t, []).push(e)), f.preStyleProps.forEach((t, e) => {
                            const n = Object.keys(t);
                            if (n.length) {
                                let t = a.get(e);
                                t || a.set(e, t = new Set), n.forEach(e => t.add(e))
                            }
                        }), f.postStyleProps.forEach((t, e) => {
                            const n = Object.keys(t);
                            let s = l.get(e);
                            s || l.set(e, s = new Set), n.forEach(t => s.add(t))
                        })
                    }
                });
                if (w.length) {
                    const t = [];
                    w.forEach(e => {
                        t.push(`@${e.triggerName} has failed due to:\n`), e.errors.forEach(e => t.push(`- ${e}\n`))
                    }), v.forEach(t => t.destroy()), this.reportError(t)
                }
                const C = new Map, S = new Map;
                r.forEach(t => {
                    const e = t.element;
                    n.has(e) && (S.set(e, e), this._beforeAnimationBuild(t.player.namespaceId, t.instruction, C))
                }), s.forEach(t => {
                    const e = t.element;
                    this._getPreviousPlayers(e, !1, t.namespaceId, t.triggerName, null).forEach(t => {
                        Tm(C, e, []).push(t), t.destroy()
                    })
                });
                const x = m.filter(t => i_(t, a, l)), k = new Map;
                Jg(k, this.driver, _, l, "*").forEach(t => {
                    i_(t, a, l) && x.push(t)
                });
                const E = new Map;
                d.forEach((t, e) => {
                    Jg(E, this.driver, new Set(t), a, "!")
                }), x.forEach(t => {
                    const e = k.get(t), n = E.get(t);
                    k.set(t, Object.assign(Object.assign({}, e), n))
                });
                const O = [], R = [], T = {};
                r.forEach(t => {
                    const {element: e, player: r, instruction: o} = t;
                    if (n.has(e)) {
                        if (c.has(e)) return r.onDestroy(() => Ym(e, o.toStyles)), r.disabled = !0, r.overrideTotalTime(o.totalTime), void s.push(r);
                        let t = T;
                        if (S.size > 1) {
                            let n = e;
                            const s = [];
                            for (; n = n.parentNode;) {
                                const e = S.get(n);
                                if (e) {
                                    t = e;
                                    break
                                }
                                s.push(n)
                            }
                            s.forEach(e => S.set(e, t))
                        }
                        const n = this._buildAnimation(r.namespaceId, o, C, i, E, k);
                        if (r.setRealPlayer(n), t === T) O.push(r); else {
                            const e = this.playersByElement.get(t);
                            e && e.length && (r.parentPlayer = xm(e)), s.push(r)
                        }
                    } else Xm(e, o.fromStyles), r.onDestroy(() => Ym(e, o.toStyles)), R.push(r), c.has(e) && s.push(r)
                }), R.forEach(t => {
                    const e = i.get(t.element);
                    if (e && e.length) {
                        const n = xm(e);
                        t.setRealPlayer(n)
                    }
                }), s.forEach(t => {
                    t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy()
                });
                for (let A = 0; A < m.length; A++) {
                    const t = m[A], e = t.__ng_removed;
                    if (n_(t, "ng-leave"), e && e.hasAnimation) continue;
                    let n = [];
                    if (o.size) {
                        let e = o.get(t);
                        e && e.length && n.push(...e);
                        let s = this.driver.query(t, ".ng-animating", !0);
                        for (let t = 0; t < s.length; t++) {
                            let e = o.get(s[t]);
                            e && e.length && n.push(...e)
                        }
                    }
                    const s = n.filter(t => !t.destroyed);
                    s.length ? s_(this, t, s) : this.processLeaveNode(t)
                }
                return m.length = 0, O.forEach(t => {
                    this.players.push(t), t.onDone(() => {
                        t.destroy();
                        const e = this.players.indexOf(t);
                        this.players.splice(e, 1)
                    }), t.play()
                }), O
            }

            elementContainsData(t, e) {
                let n = !1;
                const s = e.__ng_removed;
                return s && s.setForRemoval && (n = !0), this.playersByElement.has(e) && (n = !0), this.playersByQueriedElement.has(e) && (n = !0), this.statesByElement.has(e) && (n = !0), this._fetchNamespace(t).elementContainsData(e) || n
            }

            afterFlush(t) {
                this._flushFns.push(t)
            }

            afterFlushAnimationsDone(t) {
                this._whenQuietFns.push(t)
            }

            _getPreviousPlayers(t, e, n, s, i) {
                let r = [];
                if (e) {
                    const e = this.playersByQueriedElement.get(t);
                    e && (r = e)
                } else {
                    const e = this.playersByElement.get(t);
                    if (e) {
                        const t = !i || "void" == i;
                        e.forEach(e => {
                            e.queued || (t || e.triggerName == s) && r.push(e)
                        })
                    }
                }
                return (n || s) && (r = r.filter(t => !(n && n != t.namespaceId || s && s != t.triggerName))), r
            }

            _beforeAnimationBuild(t, e, n) {
                const s = e.element, i = e.isRemovalTransition ? void 0 : t,
                    r = e.isRemovalTransition ? void 0 : e.triggerName;
                for (const o of e.timelines) {
                    const t = o.element, a = t !== s, l = Tm(n, t, []);
                    this._getPreviousPlayers(t, a, i, r, e.toState).forEach(t => {
                        const e = t.getRealPlayer();
                        e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t)
                    })
                }
                Xm(s, e.fromStyles)
            }

            _buildAnimation(t, e, n, s, i, r) {
                const o = e.triggerName, a = e.element, l = [], c = new Set, h = new Set, u = e.timelines.map(e => {
                    const u = e.element;
                    c.add(u);
                    const d = u.__ng_removed;
                    if (d && d.removedBeforeQueried) return new wm(e.duration, e.delay);
                    const p = u !== a, f = function (t) {
                            const e = [];
                            return function t(e, n) {
                                for (let s = 0; s < e.length; s++) {
                                    const i = e[s];
                                    i instanceof Cm ? t(i.players, n) : n.push(i)
                                }
                            }(t, e), e
                        }((n.get(u) || Ug).map(t => t.getRealPlayer())).filter(t => !!t.element && t.element === u),
                        m = i.get(u), g = r.get(u), _ = km(0, this._normalizer, 0, e.keyframes, m, g),
                        y = this._buildPlayer(e, _, f);
                    if (e.subTimeline && s && h.add(u), p) {
                        const e = new Qg(t, o, u);
                        e.setRealPlayer(y), l.push(e)
                    }
                    return y
                });
                l.forEach(t => {
                    Tm(this.playersByQueriedElement, t.element, []).push(t), t.onDone(() => function (t, e, n) {
                        let s;
                        if (t instanceof Map) {
                            if (s = t.get(e), s) {
                                if (s.length) {
                                    const t = s.indexOf(n);
                                    s.splice(t, 1)
                                }
                                0 == s.length && t.delete(e)
                            }
                        } else if (s = t[e], s) {
                            if (s.length) {
                                const t = s.indexOf(n);
                                s.splice(t, 1)
                            }
                            0 == s.length && delete t[e]
                        }
                        return s
                    }(this.playersByQueriedElement, t.element, t))
                }), c.forEach(t => e_(t, "ng-animating"));
                const d = xm(u);
                return d.onDestroy(() => {
                    c.forEach(t => n_(t, "ng-animating")), Ym(a, e.toStyles)
                }), h.forEach(t => {
                    Tm(s, t, []).push(d)
                }), d
            }

            _buildPlayer(t, e, n) {
                return e.length > 0 ? this.driver.animate(t.element, e, t.duration, t.delay, t.easing, n) : new wm(t.duration, t.delay)
            }
        }

        class Qg {
            constructor(t, e, n) {
                this.namespaceId = t, this.triggerName = e, this.element = n, this._player = new wm, this._containsRealPlayer = !1, this._queuedCallbacks = {}, this.destroyed = !1, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, this.totalTime = 0
            }

            setRealPlayer(t) {
                this._containsRealPlayer || (this._player = t, Object.keys(this._queuedCallbacks).forEach(e => {
                    this._queuedCallbacks[e].forEach(n => Em(t, e, void 0, n))
                }), this._queuedCallbacks = {}, this._containsRealPlayer = !0, this.overrideTotalTime(t.totalTime), this.queued = !1)
            }

            getRealPlayer() {
                return this._player
            }

            overrideTotalTime(t) {
                this.totalTime = t
            }

            syncPlayerEvents(t) {
                const e = this._player;
                e.triggerCallback && t.onStart(() => e.triggerCallback("start")), t.onDone(() => this.finish()), t.onDestroy(() => this.destroy())
            }

            _queueEvent(t, e) {
                Tm(this._queuedCallbacks, t, []).push(e)
            }

            onDone(t) {
                this.queued && this._queueEvent("done", t), this._player.onDone(t)
            }

            onStart(t) {
                this.queued && this._queueEvent("start", t), this._player.onStart(t)
            }

            onDestroy(t) {
                this.queued && this._queueEvent("destroy", t), this._player.onDestroy(t)
            }

            init() {
                this._player.init()
            }

            hasStarted() {
                return !this.queued && this._player.hasStarted()
            }

            play() {
                !this.queued && this._player.play()
            }

            pause() {
                !this.queued && this._player.pause()
            }

            restart() {
                !this.queued && this._player.restart()
            }

            finish() {
                this._player.finish()
            }

            destroy() {
                this.destroyed = !0, this._player.destroy()
            }

            reset() {
                !this.queued && this._player.reset()
            }

            setPosition(t) {
                this.queued || this._player.setPosition(t)
            }

            getPosition() {
                return this.queued ? 0 : this._player.getPosition()
            }

            triggerCallback(t) {
                const e = this._player;
                e.triggerCallback && e.triggerCallback(t)
            }
        }

        function Yg(t) {
            return t && 1 === t.nodeType
        }

        function Xg(t, e) {
            const n = t.style.display;
            return t.style.display = null != e ? e : "none", n
        }

        function Jg(t, e, n, s, i) {
            const r = [];
            n.forEach(t => r.push(Xg(t)));
            const o = [];
            s.forEach((n, s) => {
                const r = {};
                n.forEach(t => {
                    const n = r[t] = e.computeStyle(s, t, i);
                    n && 0 != n.length || (s.__ng_removed = qg, o.push(s))
                }), t.set(s, r)
            });
            let a = 0;
            return n.forEach(t => Xg(t, r[a++])), o
        }

        function t_(t, e) {
            const n = new Map;
            if (t.forEach(t => n.set(t, [])), 0 == e.length) return n;
            const s = new Set(e), i = new Map;
            return e.forEach(t => {
                const e = function t(e) {
                    if (!e) return 1;
                    let r = i.get(e);
                    if (r) return r;
                    const o = e.parentNode;
                    return r = n.has(o) ? o : s.has(o) ? 1 : t(o), i.set(e, r), r
                }(t);
                1 !== e && n.get(e).push(t)
            }), n
        }

        function e_(t, e) {
            if (t.classList) t.classList.add(e); else {
                let n = t.$$classes;
                n || (n = t.$$classes = {}), n[e] = !0
            }
        }

        function n_(t, e) {
            if (t.classList) t.classList.remove(e); else {
                let n = t.$$classes;
                n && delete n[e]
            }
        }

        function s_(t, e, n) {
            xm(n).onDone(() => t.processLeaveNode(e))
        }

        function i_(t, e, n) {
            const s = n.get(t);
            if (!s) return !1;
            let i = e.get(t);
            return i ? s.forEach(t => i.add(t)) : e.set(t, s), n.delete(t), !0
        }

        class r_ {
            constructor(t, e, n) {
                this.bodyNode = t, this._driver = e, this._triggerCache = {}, this.onRemovalComplete = (t, e) => {
                }, this._transitionEngine = new Zg(t, e, n), this._timelineEngine = new Hg(t, e, n), this._transitionEngine.onRemovalComplete = (t, e) => this.onRemovalComplete(t, e)
            }

            registerTrigger(t, e, n, s, i) {
                const r = t + "-" + s;
                let o = this._triggerCache[r];
                if (!o) {
                    const t = [], e = mg(this._driver, i, t);
                    if (t.length) throw new Error(`The animation trigger "${s}" has failed to build due to the following errors:\n - ${t.join("\n - ")}`);
                    o = function (t, e) {
                        return new jg(t, e)
                    }(s, e), this._triggerCache[r] = o
                }
                this._transitionEngine.registerTrigger(e, s, o)
            }

            register(t, e) {
                this._transitionEngine.register(t, e)
            }

            destroy(t, e) {
                this._transitionEngine.destroy(t, e)
            }

            onInsert(t, e, n, s) {
                this._transitionEngine.insertNode(t, e, n, s)
            }

            onRemove(t, e, n, s) {
                this._transitionEngine.removeNode(t, e, s || !1, n)
            }

            disableAnimations(t, e) {
                this._transitionEngine.markElementAsDisabled(t, e)
            }

            process(t, e, n, s) {
                if ("@" == n.charAt(0)) {
                    const [t, i] = Am(n);
                    this._timelineEngine.command(t, e, i, s)
                } else this._transitionEngine.trigger(t, e, n, s)
            }

            listen(t, e, n, s, i) {
                if ("@" == n.charAt(0)) {
                    const [t, s] = Am(n);
                    return this._timelineEngine.listen(t, e, s, i)
                }
                return this._transitionEngine.listen(t, e, n, s, i)
            }

            flush(t = -1) {
                this._transitionEngine.flush(t)
            }

            get players() {
                return this._transitionEngine.players.concat(this._timelineEngine.players)
            }

            whenRenderingDone() {
                return this._transitionEngine.whenRenderingDone()
            }
        }

        function o_(t, e) {
            let n = null, s = null;
            return Array.isArray(e) && e.length ? (n = l_(e[0]), e.length > 1 && (s = l_(e[e.length - 1]))) : e && (n = l_(e)), n || s ? new a_(t, n, s) : null
        }

        let a_ = (() => {
            class t {
                constructor(e, n, s) {
                    this._element = e, this._startStyles = n, this._endStyles = s, this._state = 0;
                    let i = t.initialStylesByElement.get(e);
                    i || t.initialStylesByElement.set(e, i = {}), this._initialStyles = i
                }

                start() {
                    this._state < 1 && (this._startStyles && Ym(this._element, this._startStyles, this._initialStyles), this._state = 1)
                }

                finish() {
                    this.start(), this._state < 2 && (Ym(this._element, this._initialStyles), this._endStyles && (Ym(this._element, this._endStyles), this._endStyles = null), this._state = 1)
                }

                destroy() {
                    this.finish(), this._state < 3 && (t.initialStylesByElement.delete(this._element), this._startStyles && (Xm(this._element, this._startStyles), this._endStyles = null), this._endStyles && (Xm(this._element, this._endStyles), this._endStyles = null), Ym(this._element, this._initialStyles), this._state = 3)
                }
            }

            return t.initialStylesByElement = new WeakMap, t
        })();

        function l_(t) {
            let e = null;
            const n = Object.keys(t);
            for (let s = 0; s < n.length; s++) {
                const i = n[s];
                c_(i) && (e = e || {}, e[i] = t[i])
            }
            return e
        }

        function c_(t) {
            return "display" === t || "position" === t
        }

        class h_ {
            constructor(t, e, n, s, i, r, o) {
                this._element = t, this._name = e, this._duration = n, this._delay = s, this._easing = i, this._fillMode = r, this._onDoneFn = o, this._finished = !1, this._destroyed = !1, this._startTime = 0, this._position = 0, this._eventFn = t => this._handleCallback(t)
            }

            apply() {
                !function (t, e) {
                    const n = g_(t, "").trim();
                    n.length && (function (t, e) {
                        let n = 0;
                        for (let s = 0; s < t.length; s++) "," === t.charAt(s) && n++
                    }(n), e = `${n}, ${e}`), m_(t, "", e)
                }(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`), f_(this._element, this._eventFn, !1), this._startTime = Date.now()
            }

            pause() {
                u_(this._element, this._name, "paused")
            }

            resume() {
                u_(this._element, this._name, "running")
            }

            setPosition(t) {
                const e = d_(this._element, this._name);
                this._position = t * this._duration, m_(this._element, "Delay", `-${this._position}ms`, e)
            }

            getPosition() {
                return this._position
            }

            _handleCallback(t) {
                const e = t._ngTestManualTimestamp || Date.now(), n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
                t.animationName == this._name && Math.max(e - this._startTime, 0) >= this._delay && n >= this._duration && this.finish()
            }

            finish() {
                this._finished || (this._finished = !0, this._onDoneFn(), f_(this._element, this._eventFn, !0))
            }

            destroy() {
                this._destroyed || (this._destroyed = !0, this.finish(), function (t, e) {
                    const n = g_(t, "").split(","), s = p_(n, e);
                    s >= 0 && (n.splice(s, 1), m_(t, "", n.join(",")))
                }(this._element, this._name))
            }
        }

        function u_(t, e, n) {
            m_(t, "PlayState", n, d_(t, e))
        }

        function d_(t, e) {
            const n = g_(t, "");
            return n.indexOf(",") > 0 ? p_(n.split(","), e) : p_([n], e)
        }

        function p_(t, e) {
            for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
            return -1
        }

        function f_(t, e, n) {
            n ? t.removeEventListener("animationend", e) : t.addEventListener("animationend", e)
        }

        function m_(t, e, n, s) {
            const i = "animation" + e;
            if (null != s) {
                const e = t.style[i];
                if (e.length) {
                    const t = e.split(",");
                    t[s] = n, n = t.join(",")
                }
            }
            t.style[i] = n
        }

        function g_(t, e) {
            return t.style["animation" + e] || ""
        }

        class __ {
            constructor(t, e, n, s, i, r, o, a) {
                this.element = t, this.keyframes = e, this.animationName = n, this._duration = s, this._delay = i, this._finalStyles = o, this._specialStyles = a, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this.currentSnapshot = {}, this._state = 0, this.easing = r || "linear", this.totalTime = s + i, this._buildStyler()
            }

            onStart(t) {
                this._onStartFns.push(t)
            }

            onDone(t) {
                this._onDoneFns.push(t)
            }

            onDestroy(t) {
                this._onDestroyFns.push(t)
            }

            destroy() {
                this.init(), this._state >= 4 || (this._state = 4, this._styler.destroy(), this._flushStartFns(), this._flushDoneFns(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
            }

            _flushDoneFns() {
                this._onDoneFns.forEach(t => t()), this._onDoneFns = []
            }

            _flushStartFns() {
                this._onStartFns.forEach(t => t()), this._onStartFns = []
            }

            finish() {
                this.init(), this._state >= 3 || (this._state = 3, this._styler.finish(), this._flushStartFns(), this._specialStyles && this._specialStyles.finish(), this._flushDoneFns())
            }

            setPosition(t) {
                this._styler.setPosition(t)
            }

            getPosition() {
                return this._styler.getPosition()
            }

            hasStarted() {
                return this._state >= 2
            }

            init() {
                this._state >= 1 || (this._state = 1, this._styler.apply(), this._delay && this._styler.pause())
            }

            play() {
                this.init(), this.hasStarted() || (this._flushStartFns(), this._state = 2, this._specialStyles && this._specialStyles.start()), this._styler.resume()
            }

            pause() {
                this.init(), this._styler.pause()
            }

            restart() {
                this.reset(), this.play()
            }

            reset() {
                this._styler.destroy(), this._buildStyler(), this._styler.apply()
            }

            _buildStyler() {
                this._styler = new h_(this.element, this.animationName, this._duration, this._delay, this.easing, "forwards", () => this.finish())
            }

            triggerCallback(t) {
                const e = "start" == t ? this._onStartFns : this._onDoneFns;
                e.forEach(t => t()), e.length = 0
            }

            beforeDestroy() {
                this.init();
                const t = {};
                if (this.hasStarted()) {
                    const e = this._state >= 3;
                    Object.keys(this._finalStyles).forEach(n => {
                        "offset" != n && (t[n] = e ? this._finalStyles[n] : cg(this.element, n))
                    })
                }
                this.currentSnapshot = t
            }
        }

        class y_ extends wm {
            constructor(t, e) {
                super(), this.element = t, this._startingStyles = {}, this.__initialized = !1, this._styles = Bm(e)
            }

            init() {
                !this.__initialized && this._startingStyles && (this.__initialized = !0, Object.keys(this._styles).forEach(t => {
                    this._startingStyles[t] = this.element.style[t]
                }), super.init())
            }

            play() {
                this._startingStyles && (this.init(), Object.keys(this._styles).forEach(t => this.element.style.setProperty(t, this._styles[t])), super.play())
            }

            destroy() {
                this._startingStyles && (Object.keys(this._startingStyles).forEach(t => {
                    const e = this._startingStyles[t];
                    e ? this.element.style.setProperty(t, e) : this.element.style.removeProperty(t)
                }), this._startingStyles = null, super.destroy())
            }
        }

        class b_ {
            constructor() {
                this._count = 0, this._head = document.querySelector("head")
            }

            validateStyleProperty(t) {
                return Mm(t)
            }

            matchesElement(t, e) {
                return Vm(t, e)
            }

            containsElement(t, e) {
                return jm(t, e)
            }

            query(t, e, n) {
                return zm(t, e, n)
            }

            computeStyle(t, e, n) {
                return window.getComputedStyle(t)[e]
            }

            buildKeyframeElement(t, e, n) {
                n = n.map(t => Bm(t));
                let s = `@keyframes ${e} {\n`, i = "";
                n.forEach(t => {
                    i = " ";
                    const e = parseFloat(t.offset);
                    s += `${i}${100 * e}% {\n`, i += " ", Object.keys(t).forEach(e => {
                        const n = t[e];
                        switch (e) {
                            case"offset":
                                return;
                            case"easing":
                                return void (n && (s += `${i}animation-timing-function: ${n};\n`));
                            default:
                                return void (s += `${i}${e}: ${n};\n`)
                        }
                    }), s += i + "}\n"
                }), s += "}\n";
                const r = document.createElement("style");
                return r.textContent = s, r
            }

            animate(t, e, n, s, i, r = [], o) {
                const a = r.filter(t => t instanceof __), l = {};
                og(n, s) && a.forEach(t => {
                    let e = t.currentSnapshot;
                    Object.keys(e).forEach(t => l[t] = e[t])
                });
                const c = function (t) {
                    let e = {};
                    return t && (Array.isArray(t) ? t : [t]).forEach(t => {
                        Object.keys(t).forEach(n => {
                            "offset" != n && "easing" != n && (e[n] = t[n])
                        })
                    }), e
                }(e = ag(t, e, l));
                if (0 == n) return new y_(t, c);
                const h = "gen_css_kf_" + this._count++, u = this.buildKeyframeElement(t, h, e);
                document.querySelector("head").appendChild(u);
                const d = o_(t, e), p = new __(t, e, h, n, s, i, c, d);
                return p.onDestroy(() => {
                    var t;
                    (t = u).parentNode.removeChild(t)
                }), p
            }
        }

        class v_ {
            constructor(t, e, n, s) {
                this.element = t, this.keyframes = e, this.options = n, this._specialStyles = s, this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, this._finished = !1, this._started = !1, this._destroyed = !1, this.time = 0, this.parentPlayer = null, this.currentSnapshot = {}, this._duration = n.duration, this._delay = n.delay || 0, this.time = this._duration + this._delay
            }

            _onFinish() {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
            }

            init() {
                this._buildPlayer(), this._preparePlayerBeforeStart()
            }

            _buildPlayer() {
                if (this._initialized) return;
                this._initialized = !0;
                const t = this.keyframes;
                this.domPlayer = this._triggerWebAnimation(this.element, t, this.options), this._finalKeyframe = t.length ? t[t.length - 1] : {}, this.domPlayer.addEventListener("finish", () => this._onFinish())
            }

            _preparePlayerBeforeStart() {
                this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
            }

            _triggerWebAnimation(t, e, n) {
                return t.animate(e, n)
            }

            onStart(t) {
                this._onStartFns.push(t)
            }

            onDone(t) {
                this._onDoneFns.push(t)
            }

            onDestroy(t) {
                this._onDestroyFns.push(t)
            }

            play() {
                this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach(t => t()), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), this.domPlayer.play()
            }

            pause() {
                this.init(), this.domPlayer.pause()
            }

            finish() {
                this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), this.domPlayer.finish()
            }

            reset() {
                this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1
            }

            _resetDomPlayerState() {
                this.domPlayer && this.domPlayer.cancel()
            }

            restart() {
                this.reset(), this.play()
            }

            hasStarted() {
                return this._started
            }

            destroy() {
                this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
            }

            setPosition(t) {
                void 0 === this.domPlayer && this.init(), this.domPlayer.currentTime = t * this.time
            }

            getPosition() {
                return this.domPlayer.currentTime / this.time
            }

            get totalTime() {
                return this._delay + this._duration
            }

            beforeDestroy() {
                const t = {};
                this.hasStarted() && Object.keys(this._finalKeyframe).forEach(e => {
                    "offset" != e && (t[e] = this._finished ? this._finalKeyframe[e] : cg(this.element, e))
                }), this.currentSnapshot = t
            }

            triggerCallback(t) {
                const e = "start" == t ? this._onStartFns : this._onDoneFns;
                e.forEach(t => t()), e.length = 0
            }
        }

        class w_ {
            constructor() {
                this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(C_().toString()), this._cssKeyframesDriver = new b_
            }

            validateStyleProperty(t) {
                return Mm(t)
            }

            matchesElement(t, e) {
                return Vm(t, e)
            }

            containsElement(t, e) {
                return jm(t, e)
            }

            query(t, e, n) {
                return zm(t, e, n)
            }

            computeStyle(t, e, n) {
                return window.getComputedStyle(t)[e]
            }

            overrideWebAnimationsSupport(t) {
                this._isNativeImpl = t
            }

            animate(t, e, n, s, i, r = [], o) {
                if (!o && !this._isNativeImpl) return this._cssKeyframesDriver.animate(t, e, n, s, i, r);
                const a = {duration: n, delay: s, fill: 0 == s ? "both" : "forwards"};
                i && (a.easing = i);
                const l = {}, c = r.filter(t => t instanceof v_);
                og(n, s) && c.forEach(t => {
                    let e = t.currentSnapshot;
                    Object.keys(e).forEach(t => l[t] = e[t])
                });
                const h = o_(t, e = ag(t, e = e.map(t => Km(t, !1)), l));
                return new v_(t, e, a, h)
            }
        }

        function C_() {
            return "undefined" != typeof window && void 0 !== window.document && Element.prototype.animate || {}
        }

        let S_ = (() => {
            class t extends hm {
                constructor(t, e) {
                    super(), this._nextAnimationId = 0, this._renderer = t.createRenderer(e.body, {
                        id: "0",
                        encapsulation: Et.None,
                        styles: [],
                        data: {animation: []}
                    })
                }

                build(t) {
                    const e = this._nextAnimationId.toString();
                    this._nextAnimationId++;
                    const n = Array.isArray(t) ? pm(t) : t;
                    return E_(this._renderer, null, e, "register", [n]), new x_(e, this._renderer)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Xo), os(bc))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class x_ extends class {
        } {
            constructor(t, e) {
                super(), this._id = t, this._renderer = e
            }

            create(t, e) {
                return new k_(this._id, t, e || {}, this._renderer)
            }
        }

        class k_ {
            constructor(t, e, n, s) {
                this.id = t, this.element = e, this._renderer = s, this.parentPlayer = null, this._started = !1, this.totalTime = 0, this._command("create", n)
            }

            _listen(t, e) {
                return this._renderer.listen(this.element, `@@${this.id}:${t}`, e)
            }

            _command(t, ...e) {
                return E_(this._renderer, this.element, this.id, t, e)
            }

            onDone(t) {
                this._listen("done", t)
            }

            onStart(t) {
                this._listen("start", t)
            }

            onDestroy(t) {
                this._listen("destroy", t)
            }

            init() {
                this._command("init")
            }

            hasStarted() {
                return this._started
            }

            play() {
                this._command("play"), this._started = !0
            }

            pause() {
                this._command("pause")
            }

            restart() {
                this._command("restart")
            }

            finish() {
                this._command("finish")
            }

            destroy() {
                this._command("destroy")
            }

            reset() {
                this._command("reset")
            }

            setPosition(t) {
                this._command("setPosition", t)
            }

            getPosition() {
                var t, e;
                return null !== (e = null === (t = this._renderer.engine.players[+this.id]) || void 0 === t ? void 0 : t.getPosition()) && void 0 !== e ? e : 0
            }
        }

        function E_(t, e, n, s, i) {
            return t.setProperty(e, `@@${n}:${s}`, i)
        }

        let O_ = (() => {
            class t {
                constructor(t, e, n) {
                    this.delegate = t, this.engine = e, this._zone = n, this._currentId = 0, this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map, this._cdRecurDepth = 0, this.promise = Promise.resolve(0), e.onRemovalComplete = (t, e) => {
                        e && e.parentNode(t) && e.removeChild(t.parentNode, t)
                    }
                }

                createRenderer(t, e) {
                    const n = this.delegate.createRenderer(t, e);
                    if (!(t && e && e.data && e.data.animation)) {
                        let t = this._rendererCache.get(n);
                        return t || (t = new R_("", n, this.engine), this._rendererCache.set(n, t)), t
                    }
                    const s = e.id, i = e.id + "-" + this._currentId;
                    this._currentId++, this.engine.register(i, t);
                    const r = e => {
                        Array.isArray(e) ? e.forEach(r) : this.engine.registerTrigger(s, i, t, e.name, e)
                    };
                    return e.data.animation.forEach(r), new T_(this, i, n, this.engine)
                }

                begin() {
                    this._cdRecurDepth++, this.delegate.begin && this.delegate.begin()
                }

                _scheduleCountTask() {
                    this.promise.then(() => {
                        this._microtaskId++
                    })
                }

                scheduleListenerCallback(t, e, n) {
                    t >= 0 && t < this._microtaskId ? this._zone.run(() => e(n)) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(() => {
                        this._zone.run(() => {
                            this._animationCallbacksBuffer.forEach(t => {
                                const [e, n] = t;
                                e(n)
                            }), this._animationCallbacksBuffer = []
                        })
                    }), this._animationCallbacksBuffer.push([e, n]))
                }

                end() {
                    this._cdRecurDepth--, 0 == this._cdRecurDepth && this._zone.runOutsideAngular(() => {
                        this._scheduleCountTask(), this.engine.flush(this._microtaskId)
                    }), this.delegate.end && this.delegate.end()
                }

                whenRenderingDone() {
                    return this.engine.whenRenderingDone()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(Xo), os(r_), os(zl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class R_ {
            constructor(t, e, n) {
                this.namespaceId = t, this.delegate = e, this.engine = n, this.destroyNode = this.delegate.destroyNode ? t => e.destroyNode(t) : null
            }

            get data() {
                return this.delegate.data
            }

            destroy() {
                this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy()
            }

            createElement(t, e) {
                return this.delegate.createElement(t, e)
            }

            createComment(t) {
                return this.delegate.createComment(t)
            }

            createText(t) {
                return this.delegate.createText(t)
            }

            appendChild(t, e) {
                this.delegate.appendChild(t, e), this.engine.onInsert(this.namespaceId, e, t, !1)
            }

            insertBefore(t, e, n, s = !0) {
                this.delegate.insertBefore(t, e, n), this.engine.onInsert(this.namespaceId, e, t, s)
            }

            removeChild(t, e, n) {
                this.engine.onRemove(this.namespaceId, e, this.delegate, n)
            }

            selectRootElement(t, e) {
                return this.delegate.selectRootElement(t, e)
            }

            parentNode(t) {
                return this.delegate.parentNode(t)
            }

            nextSibling(t) {
                return this.delegate.nextSibling(t)
            }

            setAttribute(t, e, n, s) {
                this.delegate.setAttribute(t, e, n, s)
            }

            removeAttribute(t, e, n) {
                this.delegate.removeAttribute(t, e, n)
            }

            addClass(t, e) {
                this.delegate.addClass(t, e)
            }

            removeClass(t, e) {
                this.delegate.removeClass(t, e)
            }

            setStyle(t, e, n, s) {
                this.delegate.setStyle(t, e, n, s)
            }

            removeStyle(t, e, n) {
                this.delegate.removeStyle(t, e, n)
            }

            setProperty(t, e, n) {
                "@" == e.charAt(0) && "@.disabled" == e ? this.disableAnimations(t, !!n) : this.delegate.setProperty(t, e, n)
            }

            setValue(t, e) {
                this.delegate.setValue(t, e)
            }

            listen(t, e, n) {
                return this.delegate.listen(t, e, n)
            }

            disableAnimations(t, e) {
                this.engine.disableAnimations(t, e)
            }
        }

        class T_ extends R_ {
            constructor(t, e, n, s) {
                super(e, n, s), this.factory = t, this.namespaceId = e
            }

            setProperty(t, e, n) {
                "@" == e.charAt(0) ? "." == e.charAt(1) && "@.disabled" == e ? this.disableAnimations(t, n = void 0 === n || !!n) : this.engine.process(this.namespaceId, t, e.substr(1), n) : this.delegate.setProperty(t, e, n)
            }

            listen(t, e, n) {
                if ("@" == e.charAt(0)) {
                    const s = function (t) {
                        switch (t) {
                            case"body":
                                return document.body;
                            case"document":
                                return document;
                            case"window":
                                return window;
                            default:
                                return t
                        }
                    }(t);
                    let i = e.substr(1), r = "";
                    return "@" != i.charAt(0) && ([i, r] = function (t) {
                        const e = t.indexOf(".");
                        return [t.substring(0, e), t.substr(e + 1)]
                    }(i)), this.engine.listen(this.namespaceId, s, i, r, t => {
                        this.factory.scheduleListenerCallback(t._data || -1, n, t)
                    })
                }
                return this.delegate.listen(t, e, n)
            }
        }

        let A_ = (() => {
            class t extends r_ {
                constructor(t, e, n) {
                    super(t.body, e, n)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc), os(Um), os(Ig))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const D_ = new $n("AnimationModuleType"), I_ = [{
            provide: Um, useFactory: function () {
                return "function" == typeof C_() ? new w_ : new b_
            }
        }, {provide: D_, useValue: "BrowserAnimations"}, {provide: hm, useClass: S_}, {
            provide: Ig,
            useFactory: function () {
                return new Pg
            }
        }, {provide: r_, useClass: A_}, {
            provide: Xo, useFactory: function (t, e, n) {
                return new O_(t, e, n)
            }, deps: [Sh, r_, zl]
        }];
        let P_ = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({providers: I_, imports: [Fh]}), t
        })();

        function N_(t, e) {
            if (1 & t && Ur(0, "mat-pseudo-checkbox", 4), 2 & t) {
                const t = to();
                jr("state", t.selected ? "checked" : "unchecked")("disabled", t.disabled)
            }
        }

        function F_(t, e) {
            if (1 & t && (Br(0, "span", 5), ko(1), Hr()), 2 & t) {
                const t = to();
                ui(1), Oo("(", t.group.label, ")")
            }
        }

        const L_ = ["*"], M_ = new na("11.2.5"), V_ = new $n("mat-sanity-checks", {
            providedIn: "root", factory: function () {
                return !0
            }
        });
        let j_, z_ = (() => {
            class t {
                constructor(t, e, n) {
                    this._hasDoneGlobalChecks = !1, this._document = n, t._applyBodyHighContrastModeCssClasses(), this._sanityChecks = e, this._hasDoneGlobalChecks || (this._checkDoctypeIsDefined(), this._checkThemeIsPresent(), this._checkCdkVersionMatch(), this._hasDoneGlobalChecks = !0)
                }

                _getWindow() {
                    const t = this._document.defaultView || window;
                    return "object" == typeof t && t ? t : null
                }

                _checksAreEnabled() {
                    return tc() && !this._isTestEnv()
                }

                _isTestEnv() {
                    const t = this._getWindow();
                    return t && (t.__karma__ || t.jasmine)
                }

                _checkDoctypeIsDefined() {
                    this._checksAreEnabled() && (!0 === this._sanityChecks || this._sanityChecks.doctype) && !this._document.doctype && console.warn("Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.")
                }

                _checkThemeIsPresent() {
                    if (!this._checksAreEnabled() || !1 === this._sanityChecks || !this._sanityChecks.theme || !this._document.body || "function" != typeof getComputedStyle) return;
                    const t = this._document.createElement("div");
                    t.classList.add("mat-theme-loaded-marker"), this._document.body.appendChild(t);
                    const e = getComputedStyle(t);
                    e && "none" !== e.display && console.warn("Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"), this._document.body.removeChild(t)
                }

                _checkCdkVersionMatch() {
                    this._checksAreEnabled() && (!0 === this._sanityChecks || this._sanityChecks.version) && M_.full !== cm.full && console.warn("The Angular Material version (" + M_.full + ") does not match the Angular CDK version (" + cm.full + ").\nPlease ensure the versions of these two packages exactly match.")
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(im), os(V_, 8), os(bc))
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[lm], lm]}), t
        })();

        function B_(t) {
            return class extends t {
                constructor(...t) {
                    super(...t), this._disabled = !1
                }

                get disabled() {
                    return this._disabled
                }

                set disabled(t) {
                    this._disabled = Cf(t)
                }
            }
        }

        function H_(t, e) {
            return class extends t {
                constructor(...t) {
                    super(...t), this.defaultColor = e, this.color = e
                }

                get color() {
                    return this._color
                }

                set color(t) {
                    const e = t || this.defaultColor;
                    e !== this._color && (this._color && this._elementRef.nativeElement.classList.remove("mat-" + this._color), e && this._elementRef.nativeElement.classList.add("mat-" + e), this._color = e)
                }
            }
        }

        function U_(t) {
            return class extends t {
                constructor(...t) {
                    super(...t), this._disableRipple = !1
                }

                get disableRipple() {
                    return this._disableRipple
                }

                set disableRipple(t) {
                    this._disableRipple = Cf(t)
                }
            }
        }

        function $_(t, e = 0) {
            return class extends t {
                constructor(...t) {
                    super(...t), this._tabIndex = e, this.defaultTabIndex = e
                }

                get tabIndex() {
                    return this.disabled ? -1 : this._tabIndex
                }

                set tabIndex(t) {
                    this._tabIndex = null != t ? Sf(t) : this.defaultTabIndex
                }
            }
        }

        function q_(t) {
            return class extends t {
                constructor(...t) {
                    super(...t), this.errorState = !1, this.stateChanges = new S
                }

                updateErrorState() {
                    const t = this.errorState,
                        e = (this.errorStateMatcher || this._defaultErrorStateMatcher).isErrorState(this.ngControl ? this.ngControl.control : null, this._parentFormGroup || this._parentForm);
                    e !== t && (this.errorState = e, this.stateChanges.next())
                }
            }
        }

        function W_(t) {
            return class extends t {
                constructor(...t) {
                    super(...t), this._isInitialized = !1, this._pendingSubscribers = [], this.initialized = new y(t => {
                        this._isInitialized ? this._notifySubscriber(t) : this._pendingSubscribers.push(t)
                    })
                }

                _markInitialized() {
                    this._isInitialized = !0, this._pendingSubscribers.forEach(this._notifySubscriber), this._pendingSubscribers = null
                }

                _notifySubscriber(t) {
                    t.next(), t.complete()
                }
            }
        }

        try {
            j_ = "undefined" != typeof Intl
        } catch (Ax) {
            j_ = !1
        }
        let G_ = (() => {
            class t {
                isErrorState(t, e) {
                    return !!(t && t.invalid && (t.touched || e && e.submitted))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t
                }, token: t, providedIn: "root"
            }), t
        })();

        class K_ {
            constructor(t, e, n) {
                this._renderer = t, this.element = e, this.config = n, this.state = 3
            }

            fadeOut() {
                this._renderer.fadeOutRipple(this)
            }
        }

        const Z_ = {enterDuration: 450, exitDuration: 400}, Q_ = Nf({passive: !0}), Y_ = ["mousedown", "touchstart"],
            X_ = ["mouseup", "mouseleave", "touchend", "touchcancel"];

        class J_ {
            constructor(t, e, n, s) {
                this._target = t, this._ngZone = e, this._isPointerDown = !1, this._activeRipples = new Set, this._pointerUpEventsRegistered = !1, s.isBrowser && (this._containerElement = Of(n))
            }

            fadeInRipple(t, e, n = {}) {
                const s = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect(),
                    i = Object.assign(Object.assign({}, Z_), n.animation);
                n.centered && (t = s.left + s.width / 2, e = s.top + s.height / 2);
                const r = n.radius || function (t, e, n) {
                    const s = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                        i = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                    return Math.sqrt(s * s + i * i)
                }(t, e, s), o = t - s.left, a = e - s.top, l = i.enterDuration, c = document.createElement("div");
                c.classList.add("mat-ripple-element"), c.style.left = o - r + "px", c.style.top = a - r + "px", c.style.height = 2 * r + "px", c.style.width = 2 * r + "px", null != n.color && (c.style.backgroundColor = n.color), c.style.transitionDuration = l + "ms", this._containerElement.appendChild(c), window.getComputedStyle(c).getPropertyValue("opacity"), c.style.transform = "scale(1)";
                const h = new K_(this, c, n);
                return h.state = 0, this._activeRipples.add(h), n.persistent || (this._mostRecentTransientRipple = h), this._runTimeoutOutsideZone(() => {
                    const t = h === this._mostRecentTransientRipple;
                    h.state = 1, n.persistent || t && this._isPointerDown || h.fadeOut()
                }, l), h
            }

            fadeOutRipple(t) {
                const e = this._activeRipples.delete(t);
                if (t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null), this._activeRipples.size || (this._containerRect = null), !e) return;
                const n = t.element, s = Object.assign(Object.assign({}, Z_), t.config.animation);
                n.style.transitionDuration = s.exitDuration + "ms", n.style.opacity = "0", t.state = 2, this._runTimeoutOutsideZone(() => {
                    t.state = 3, n.parentNode.removeChild(n)
                }, s.exitDuration)
            }

            fadeOutAll() {
                this._activeRipples.forEach(t => t.fadeOut())
            }

            setupTriggerEvents(t) {
                const e = Of(t);
                e && e !== this._triggerElement && (this._removeTriggerEvents(), this._triggerElement = e, this._registerEvents(Y_))
            }

            handleEvent(t) {
                "mousedown" === t.type ? this._onMousedown(t) : "touchstart" === t.type ? this._onTouchStart(t) : this._onPointerUp(), this._pointerUpEventsRegistered || (this._registerEvents(X_), this._pointerUpEventsRegistered = !0)
            }

            _onMousedown(t) {
                const e = Xf(t), n = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + 800;
                this._target.rippleDisabled || e || n || (this._isPointerDown = !0, this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig))
            }

            _onTouchStart(t) {
                if (!this._target.rippleDisabled && !Jf(t)) {
                    this._lastTouchStartEvent = Date.now(), this._isPointerDown = !0;
                    const e = t.changedTouches;
                    for (let t = 0; t < e.length; t++) this.fadeInRipple(e[t].clientX, e[t].clientY, this._target.rippleConfig)
                }
            }

            _onPointerUp() {
                this._isPointerDown && (this._isPointerDown = !1, this._activeRipples.forEach(t => {
                    !t.config.persistent && (1 === t.state || t.config.terminateOnPointerUp && 0 === t.state) && t.fadeOut()
                }))
            }

            _runTimeoutOutsideZone(t, e = 0) {
                this._ngZone.runOutsideAngular(() => setTimeout(t, e))
            }

            _registerEvents(t) {
                this._ngZone.runOutsideAngular(() => {
                    t.forEach(t => {
                        this._triggerElement.addEventListener(t, this, Q_)
                    })
                })
            }

            _removeTriggerEvents() {
                this._triggerElement && (Y_.forEach(t => {
                    this._triggerElement.removeEventListener(t, this, Q_)
                }), this._pointerUpEventsRegistered && X_.forEach(t => {
                    this._triggerElement.removeEventListener(t, this, Q_)
                }))
            }
        }

        const ty = new $n("mat-ripple-global-options");
        let ey = (() => {
            class t {
                constructor(t, e, n, s, i) {
                    this._elementRef = t, this._animationMode = i, this.radius = 0, this._disabled = !1, this._isInitialized = !1, this._globalOptions = s || {}, this._rippleRenderer = new J_(this, e, t, n)
                }

                get disabled() {
                    return this._disabled
                }

                set disabled(t) {
                    this._disabled = t, this._setupTriggerEventsIfEnabled()
                }

                get trigger() {
                    return this._trigger || this._elementRef.nativeElement
                }

                set trigger(t) {
                    this._trigger = t, this._setupTriggerEventsIfEnabled()
                }

                ngOnInit() {
                    this._isInitialized = !0, this._setupTriggerEventsIfEnabled()
                }

                ngOnDestroy() {
                    this._rippleRenderer._removeTriggerEvents()
                }

                fadeOutAll() {
                    this._rippleRenderer.fadeOutAll()
                }

                get rippleConfig() {
                    return {
                        centered: this.centered,
                        radius: this.radius,
                        color: this.color,
                        animation: Object.assign(Object.assign(Object.assign({}, this._globalOptions.animation), "NoopAnimations" === this._animationMode ? {
                            enterDuration: 0,
                            exitDuration: 0
                        } : {}), this.animation),
                        terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
                    }
                }

                get rippleDisabled() {
                    return this.disabled || !!this._globalOptions.disabled
                }

                _setupTriggerEventsIfEnabled() {
                    !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger)
                }

                launch(t, e = 0, n) {
                    return "number" == typeof t ? this._rippleRenderer.fadeInRipple(t, e, Object.assign(Object.assign({}, this.rippleConfig), n)) : this._rippleRenderer.fadeInRipple(0, 0, Object.assign(Object.assign({}, this.rippleConfig), t))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Qo), Vr(zl), Vr(If), Vr(ty, 8), Vr(D_, 8))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
                hostAttrs: [1, "mat-ripple"],
                hostVars: 2,
                hostBindings: function (t, e) {
                    2 & t && fo("mat-ripple-unbounded", e.unbounded)
                },
                inputs: {
                    radius: ["matRippleRadius", "radius"],
                    disabled: ["matRippleDisabled", "disabled"],
                    trigger: ["matRippleTrigger", "trigger"],
                    color: ["matRippleColor", "color"],
                    unbounded: ["matRippleUnbounded", "unbounded"],
                    centered: ["matRippleCentered", "centered"],
                    animation: ["matRippleAnimation", "animation"]
                },
                exportAs: ["matRipple"]
            }), t
        })(), ny = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[z_, Pf], z_]}), t
        })(), sy = (() => {
            class t {
                constructor(t) {
                    this._animationMode = t, this.state = "unchecked", this.disabled = !1
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(D_, 8))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-pseudo-checkbox"]],
                hostAttrs: [1, "mat-pseudo-checkbox"],
                hostVars: 8,
                hostBindings: function (t, e) {
                    2 & t && fo("mat-pseudo-checkbox-indeterminate", "indeterminate" === e.state)("mat-pseudo-checkbox-checked", "checked" === e.state)("mat-pseudo-checkbox-disabled", e.disabled)("_mat-animation-noopable", "NoopAnimations" === e._animationMode)
                },
                inputs: {state: "state", disabled: "disabled"},
                decls: 0,
                vars: 0,
                template: function (t, e) {
                },
                styles: ['.mat-pseudo-checkbox{width:16px;height:16px;border:2px solid;border-radius:2px;cursor:pointer;display:inline-block;vertical-align:middle;box-sizing:border-box;position:relative;flex-shrink:0;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1),background-color 90ms cubic-bezier(0, 0, 0.2, 0.1)}.mat-pseudo-checkbox::after{position:absolute;opacity:0;content:"";border-bottom:2px solid currentColor;transition:opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}.mat-pseudo-checkbox.mat-pseudo-checkbox-checked,.mat-pseudo-checkbox.mat-pseudo-checkbox-indeterminate{border-color:transparent}._mat-animation-noopable.mat-pseudo-checkbox{transition:none;animation:none}._mat-animation-noopable.mat-pseudo-checkbox::after{transition:none}.mat-pseudo-checkbox-disabled{cursor:default}.mat-pseudo-checkbox-indeterminate::after{top:5px;left:1px;width:10px;opacity:1;border-radius:2px}.mat-pseudo-checkbox-checked::after{top:2.4px;left:1px;width:8px;height:3px;border-left:2px solid currentColor;transform:rotate(-45deg);opacity:1;box-sizing:content-box}\n'],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })(), iy = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[z_]]}), t
        })();
        const ry = new $n("MAT_OPTION_PARENT_COMPONENT");

        class oy {
        }

        const ay = B_(oy);
        let ly = 0, cy = (() => {
            class t extends ay {
                constructor(t) {
                    var e;
                    super(), this._labelId = "mat-optgroup-label-" + ly++, this._inert = null !== (e = null == t ? void 0 : t.inertGroups) && void 0 !== e && e
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(ry, 8))
            }, t.\u0275dir = Zt({type: t, inputs: {label: "label"}, features: [Sr]}), t
        })();
        const hy = new $n("MatOptgroup");
        let uy = 0;

        class dy {
            constructor(t, e = !1) {
                this.source = t, this.isUserInput = e
            }
        }

        let py = (() => {
            class t {
                constructor(t, e, n, s) {
                    this._element = t, this._changeDetectorRef = e, this._parent = n, this.group = s, this._selected = !1, this._active = !1, this._disabled = !1, this._mostRecentViewValue = "", this.id = "mat-option-" + uy++, this.onSelectionChange = new el, this._stateChanges = new S
                }

                get multiple() {
                    return this._parent && this._parent.multiple
                }

                get selected() {
                    return this._selected
                }

                get disabled() {
                    return this.group && this.group.disabled || this._disabled
                }

                set disabled(t) {
                    this._disabled = Cf(t)
                }

                get disableRipple() {
                    return this._parent && this._parent.disableRipple
                }

                get active() {
                    return this._active
                }

                get viewValue() {
                    return (this._getHostElement().textContent || "").trim()
                }

                select() {
                    this._selected || (this._selected = !0, this._changeDetectorRef.markForCheck(), this._emitSelectionChangeEvent())
                }

                deselect() {
                    this._selected && (this._selected = !1, this._changeDetectorRef.markForCheck(), this._emitSelectionChangeEvent())
                }

                focus(t, e) {
                    const n = this._getHostElement();
                    "function" == typeof n.focus && n.focus(e)
                }

                setActiveStyles() {
                    this._active || (this._active = !0, this._changeDetectorRef.markForCheck())
                }

                setInactiveStyles() {
                    this._active && (this._active = !1, this._changeDetectorRef.markForCheck())
                }

                getLabel() {
                    return this.viewValue
                }

                _handleKeydown(t) {
                    13 !== t.keyCode && 32 !== t.keyCode || df(t) || (this._selectViaInteraction(), t.preventDefault())
                }

                _selectViaInteraction() {
                    this.disabled || (this._selected = !this.multiple || !this._selected, this._changeDetectorRef.markForCheck(), this._emitSelectionChangeEvent(!0))
                }

                _getAriaSelected() {
                    return this.selected || !this.multiple && null
                }

                _getTabIndex() {
                    return this.disabled ? "-1" : "0"
                }

                _getHostElement() {
                    return this._element.nativeElement
                }

                ngAfterViewChecked() {
                    if (this._selected) {
                        const t = this.viewValue;
                        t !== this._mostRecentViewValue && (this._mostRecentViewValue = t, this._stateChanges.next())
                    }
                }

                ngOnDestroy() {
                    this._stateChanges.complete()
                }

                _emitSelectionChangeEvent(t = !1) {
                    this.onSelectionChange.emit(new dy(this, t))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Qo), Vr(wa), Vr(void 0), Vr(cy))
            }, t.\u0275dir = Zt({
                type: t,
                inputs: {id: "id", disabled: "disabled", value: "value"},
                outputs: {onSelectionChange: "onSelectionChange"}
            }), t
        })(), fy = (() => {
            class t extends py {
                constructor(t, e, n, s) {
                    super(t, e, n, s)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Qo), Vr(wa), Vr(ry, 8), Vr(hy, 8))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-option"]],
                hostAttrs: ["role", "option", 1, "mat-option", "mat-focus-indicator"],
                hostVars: 12,
                hostBindings: function (t, e) {
                    1 & t && Yr("click", (function () {
                        return e._selectViaInteraction()
                    }))("keydown", (function (t) {
                        return e._handleKeydown(t)
                    })), 2 & t && (Ro("id", e.id), Fr("tabindex", e._getTabIndex())("aria-selected", e._getAriaSelected())("aria-disabled", e.disabled.toString()), fo("mat-selected", e.selected)("mat-option-multiple", e.multiple)("mat-active", e.active)("mat-option-disabled", e.disabled))
                },
                exportAs: ["matOption"],
                features: [Sr],
                ngContentSelectors: L_,
                decls: 5,
                vars: 4,
                consts: [["class", "mat-option-pseudo-checkbox", 3, "state", "disabled", 4, "ngIf"], [1, "mat-option-text"], ["class", "cdk-visually-hidden", 4, "ngIf"], ["mat-ripple", "", 1, "mat-option-ripple", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mat-option-pseudo-checkbox", 3, "state", "disabled"], [1, "cdk-visually-hidden"]],
                template: function (t, e) {
                    1 & t && (no(), Mr(0, N_, 1, 2, "mat-pseudo-checkbox", 0), Br(1, "span", 1), so(2), Hr(), Mr(3, F_, 2, 1, "span", 2), Ur(4, "div", 3)), 2 & t && (jr("ngIf", e.multiple), ui(3), jr("ngIf", e.group && e.group._inert), ui(1), jr("matRippleTrigger", e._getHostElement())("matRippleDisabled", e.disabled || e.disableRipple))
                },
                directives: [qc, ey, sy],
                styles: [".mat-option{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative;cursor:pointer;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;-webkit-tap-highlight-color:transparent}.mat-option[disabled]{cursor:default}[dir=rtl] .mat-option{text-align:right}.mat-option .mat-icon{margin-right:16px;vertical-align:middle}.mat-option .mat-icon svg{vertical-align:top}[dir=rtl] .mat-option .mat-icon{margin-left:16px;margin-right:0}.mat-option[aria-disabled=true]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-optgroup .mat-option:not(.mat-option-multiple){padding-left:32px}[dir=rtl] .mat-optgroup .mat-option:not(.mat-option-multiple){padding-left:16px;padding-right:32px}.cdk-high-contrast-active .mat-option{margin:0 1px}.cdk-high-contrast-active .mat-option.mat-active{border:solid 1px currentColor;margin:0}.cdk-high-contrast-active .mat-option[aria-disabled=true]{opacity:.5}.mat-option-text{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis}.mat-option .mat-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-option-pseudo-checkbox{margin-right:8px}[dir=rtl] .mat-option-pseudo-checkbox{margin-left:8px;margin-right:0}\n"],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();

        function my(t, e, n) {
            if (n.length) {
                let s = e.toArray(), i = n.toArray(), r = 0;
                for (let e = 0; e < t + 1; e++) s[e].group && s[e].group === i[r] && r++;
                return r
            }
            return 0
        }

        let gy = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[ny, sh, z_, iy]]}), t
        })();
        const _y = ["mat-button", ""], yy = ["*"],
            by = ["mat-button", "mat-flat-button", "mat-icon-button", "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab"];

        class vy {
            constructor(t) {
                this._elementRef = t
            }
        }

        const wy = H_(B_(U_(vy)));
        let Cy = (() => {
            class t extends wy {
                constructor(t, e, n) {
                    super(t), this._focusMonitor = e, this._animationMode = n, this.isRoundButton = this._hasHostAttributes("mat-fab", "mat-mini-fab"), this.isIconButton = this._hasHostAttributes("mat-icon-button");
                    for (const s of by) this._hasHostAttributes(s) && this._getHostElement().classList.add(s);
                    t.nativeElement.classList.add("mat-button-base"), this.isRoundButton && (this.color = "accent")
                }

                ngAfterViewInit() {
                    this._focusMonitor.monitor(this._elementRef, !0)
                }

                ngOnDestroy() {
                    this._focusMonitor.stopMonitoring(this._elementRef)
                }

                focus(t, e) {
                    t ? this._focusMonitor.focusVia(this._getHostElement(), t, e) : this._getHostElement().focus(e)
                }

                _getHostElement() {
                    return this._elementRef.nativeElement
                }

                _isRippleDisabled() {
                    return this.disableRipple || this.disabled
                }

                _hasHostAttributes(...t) {
                    return t.some(t => this._getHostElement().hasAttribute(t))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Qo), Vr(nm), Vr(D_, 8))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["button", "mat-button", ""], ["button", "mat-raised-button", ""], ["button", "mat-icon-button", ""], ["button", "mat-fab", ""], ["button", "mat-mini-fab", ""], ["button", "mat-stroked-button", ""], ["button", "mat-flat-button", ""]],
                viewQuery: function (t, e) {
                    if (1 & t && pl(ey, 1), 2 & t) {
                        let t;
                        dl(t = ml()) && (e.ripple = t.first)
                    }
                },
                hostAttrs: [1, "mat-focus-indicator"],
                hostVars: 5,
                hostBindings: function (t, e) {
                    2 & t && (Fr("disabled", e.disabled || null), fo("_mat-animation-noopable", "NoopAnimations" === e._animationMode)("mat-button-disabled", e.disabled))
                },
                inputs: {disabled: "disabled", disableRipple: "disableRipple", color: "color"},
                exportAs: ["matButton"],
                features: [Sr],
                attrs: _y,
                ngContentSelectors: yy,
                decls: 4,
                vars: 5,
                consts: [[1, "mat-button-wrapper"], ["matRipple", "", 1, "mat-button-ripple", 3, "matRippleDisabled", "matRippleCentered", "matRippleTrigger"], [1, "mat-button-focus-overlay"]],
                template: function (t, e) {
                    1 & t && (no(), Br(0, "span", 0), so(1), Hr(), Ur(2, "span", 1), Ur(3, "span", 2)), 2 & t && (ui(2), fo("mat-button-ripple-round", e.isRoundButton || e.isIconButton), jr("matRippleDisabled", e._isRippleDisabled())("matRippleCentered", e.isIconButton)("matRippleTrigger", e._getHostElement()))
                },
                directives: [ey],
                styles: [".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n"],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })(), Sy = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[ny, z_], z_]}), t
        })();

        function xy(t, e, n, i) {
            return s(n) && (i = n, n = void 0), i ? xy(t, e, n).pipe(F(t => l(t) ? i(...t) : i(t))) : new y(s => {
                !function t(e, n, s, i, r) {
                    let o;
                    if (function (t) {
                        return t && "function" == typeof t.addEventListener && "function" == typeof t.removeEventListener
                    }(e)) {
                        const t = e;
                        e.addEventListener(n, s, r), o = () => t.removeEventListener(n, s, r)
                    } else if (function (t) {
                        return t && "function" == typeof t.on && "function" == typeof t.off
                    }(e)) {
                        const t = e;
                        e.on(n, s), o = () => t.off(n, s)
                    } else if (function (t) {
                        return t && "function" == typeof t.addListener && "function" == typeof t.removeListener
                    }(e)) {
                        const t = e;
                        e.addListener(n, s), o = () => t.removeListener(n, s)
                    } else {
                        if (!e || !e.length) throw new TypeError("Invalid event target");
                        for (let o = 0, a = e.length; o < a; o++) t(e[o], n, s, i, r)
                    }
                    i.add(o)
                }(t, e, (function (t) {
                    s.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : t)
                }), s, n)
            })
        }

        class ky {
            constructor(t, e) {
                this.compare = t, this.keySelector = e
            }

            call(t, e) {
                return e.subscribe(new Ey(t, this.compare, this.keySelector))
            }
        }

        class Ey extends f {
            constructor(t, e, n) {
                super(t), this.keySelector = n, this.hasKey = !1, "function" == typeof e && (this.compare = e)
            }

            compare(t, e) {
                return t === e
            }

            _next(t) {
                let e;
                try {
                    const {keySelector: n} = this;
                    e = n ? n(t) : t
                } catch (s) {
                    return this.destination.error(s)
                }
                let n = !1;
                if (this.hasKey) try {
                    const {compare: t} = this;
                    n = t(this.key, e)
                } catch (s) {
                    return this.destination.error(s)
                } else this.hasKey = !0;
                n || (this.key = e, this.destination.next(t))
            }
        }

        class Oy {
            constructor(t) {
                this.durationSelector = t
            }

            call(t, e) {
                return e.subscribe(new Ry(t, this.durationSelector))
            }
        }

        class Ry extends N {
            constructor(t, e) {
                super(t), this.durationSelector = e, this.hasValue = !1
            }

            _next(t) {
                if (this.value = t, this.hasValue = !0, !this.throttled) {
                    let n;
                    try {
                        const {durationSelector: e} = this;
                        n = e(t)
                    } catch (e) {
                        return this.destination.error(e)
                    }
                    const s = P(this, n);
                    !s || s.closed ? this.clearThrottle() : this.add(this.throttled = s)
                }
            }

            clearThrottle() {
                const {value: t, hasValue: e, throttled: n} = this;
                n && (this.remove(n), this.throttled = null, n.unsubscribe()), e && (this.value = null, this.hasValue = !1, this.destination.next(t))
            }

            notifyNext(t, e, n, s) {
                this.clearThrottle()
            }

            notifyComplete() {
                this.clearThrottle()
            }
        }

        function Ty(t) {
            return !l(t) && t - parseFloat(t) + 1 >= 0
        }

        function Ay(t) {
            const {index: e, period: n, subscriber: s} = t;
            if (s.next(e), !s.closed) {
                if (-1 === n) return s.complete();
                t.index = e + 1, this.schedule(t, n)
            }
        }

        function Dy(t, e = _f) {
            return n = () => function (t = 0, e, n) {
                let s = -1;
                return Ty(e) ? s = Number(e) < 1 ? 1 : Number(e) : k(e) && (n = e), k(n) || (n = _f), new y(e => {
                    const i = Ty(t) ? t : +t - n.now();
                    return n.schedule(Ay, i, {index: 0, period: s, subscriber: e})
                })
            }(t, e), function (t) {
                return t.lift(new Oy(n))
            };
            var n
        }

        function Iy(t) {
            return e => e.lift(new Py(t))
        }

        class Py {
            constructor(t) {
                this.notifier = t
            }

            call(t, e) {
                const n = new Ny(t), s = P(n, this.notifier);
                return s && !n.seenValue ? (n.add(s), e.subscribe(n)) : n
            }
        }

        class Ny extends N {
            constructor(t) {
                super(t), this.seenValue = !1
            }

            notifyNext(t, e, n, s, i) {
                this.seenValue = !0, this.complete()
            }

            notifyComplete() {
            }
        }

        function Fy(t) {
            return t && "function" == typeof t.connect
        }

        class Ly {
            applyChanges(t, e, n, s, i) {
                t.forEachOperation((t, s, r) => {
                    let o, a;
                    if (null == t.previousIndex) {
                        const i = n(t, s, r);
                        o = e.createEmbeddedView(i.templateRef, i.context, i.index), a = 1
                    } else null == r ? (e.remove(s), a = 3) : (o = e.get(s), e.move(o, r), a = 2);
                    i && i({context: null == o ? void 0 : o.context, operation: a, record: t})
                })
            }

            detach() {
            }
        }

        class My {
            constructor(t = !1, e, n = !0) {
                this._multiple = t, this._emitChanges = n, this._selection = new Set, this._deselectedToEmit = [], this._selectedToEmit = [], this.changed = new S, e && e.length && (t ? e.forEach(t => this._markSelected(t)) : this._markSelected(e[0]), this._selectedToEmit.length = 0)
            }

            get selected() {
                return this._selected || (this._selected = Array.from(this._selection.values())), this._selected
            }

            select(...t) {
                this._verifyValueAssignment(t), t.forEach(t => this._markSelected(t)), this._emitChangeEvent()
            }

            deselect(...t) {
                this._verifyValueAssignment(t), t.forEach(t => this._unmarkSelected(t)), this._emitChangeEvent()
            }

            toggle(t) {
                this.isSelected(t) ? this.deselect(t) : this.select(t)
            }

            clear() {
                this._unmarkAll(), this._emitChangeEvent()
            }

            isSelected(t) {
                return this._selection.has(t)
            }

            isEmpty() {
                return 0 === this._selection.size
            }

            hasValue() {
                return !this.isEmpty()
            }

            sort(t) {
                this._multiple && this.selected && this._selected.sort(t)
            }

            isMultipleSelection() {
                return this._multiple
            }

            _emitChangeEvent() {
                this._selected = null, (this._selectedToEmit.length || this._deselectedToEmit.length) && (this.changed.next({
                    source: this,
                    added: this._selectedToEmit,
                    removed: this._deselectedToEmit
                }), this._deselectedToEmit = [], this._selectedToEmit = [])
            }

            _markSelected(t) {
                this.isSelected(t) || (this._multiple || this._unmarkAll(), this._selection.add(t), this._emitChanges && this._selectedToEmit.push(t))
            }

            _unmarkSelected(t) {
                this.isSelected(t) && (this._selection.delete(t), this._emitChanges && this._deselectedToEmit.push(t))
            }

            _unmarkAll() {
                this.isEmpty() || this._selection.forEach(t => this._unmarkSelected(t))
            }

            _verifyValueAssignment(t) {
            }
        }

        const Vy = new $n("_ViewRepeater");
        let jy = (() => {
            class t {
                constructor(t, e, n) {
                    this._ngZone = t, this._platform = e, this._scrolled = new S, this._globalSubscription = null, this._scrolledCount = 0, this.scrollContainers = new Map, this._document = n
                }

                register(t) {
                    this.scrollContainers.has(t) || this.scrollContainers.set(t, t.elementScrolled().subscribe(() => this._scrolled.next(t)))
                }

                deregister(t) {
                    const e = this.scrollContainers.get(t);
                    e && (e.unsubscribe(), this.scrollContainers.delete(t))
                }

                scrolled(t = 20) {
                    return this._platform.isBrowser ? new y(e => {
                        this._globalSubscription || this._addGlobalListener();
                        const n = t > 0 ? this._scrolled.pipe(Dy(t)).subscribe(e) : this._scrolled.subscribe(e);
                        return this._scrolledCount++, () => {
                            n.unsubscribe(), this._scrolledCount--, this._scrolledCount || this._removeGlobalListener()
                        }
                    }) : Lh()
                }

                ngOnDestroy() {
                    this._removeGlobalListener(), this.scrollContainers.forEach((t, e) => this.deregister(e)), this._scrolled.complete()
                }

                ancestorScrolled(t, e) {
                    const n = this.getAncestorScrollContainers(t);
                    return this.scrolled(e).pipe(iu(t => !t || n.indexOf(t) > -1))
                }

                getAncestorScrollContainers(t) {
                    const e = [];
                    return this.scrollContainers.forEach((n, s) => {
                        this._scrollableContainsElement(s, t) && e.push(s)
                    }), e
                }

                _getWindow() {
                    return this._document.defaultView || window
                }

                _scrollableContainsElement(t, e) {
                    let n = Of(e), s = t.getElementRef().nativeElement;
                    do {
                        if (n == s) return !0
                    } while (n = n.parentElement);
                    return !1
                }

                _addGlobalListener() {
                    this._globalSubscription = this._ngZone.runOutsideAngular(() => xy(this._getWindow().document, "scroll").subscribe(() => this._scrolled.next()))
                }

                _removeGlobalListener() {
                    this._globalSubscription && (this._globalSubscription.unsubscribe(), this._globalSubscription = null)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(zl), os(If), os(bc, 8))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(zl), os(If), os(bc, 8))
                }, token: t, providedIn: "root"
            }), t
        })(), zy = (() => {
            class t {
                constructor(t, e, n) {
                    this._platform = t, this._change = new S, this._changeListener = t => {
                        this._change.next(t)
                    }, this._document = n, e.runOutsideAngular(() => {
                        if (t.isBrowser) {
                            const t = this._getWindow();
                            t.addEventListener("resize", this._changeListener), t.addEventListener("orientationchange", this._changeListener)
                        }
                        this.change().subscribe(() => this._updateViewportSize())
                    })
                }

                ngOnDestroy() {
                    if (this._platform.isBrowser) {
                        const t = this._getWindow();
                        t.removeEventListener("resize", this._changeListener), t.removeEventListener("orientationchange", this._changeListener)
                    }
                    this._change.complete()
                }

                getViewportSize() {
                    this._viewportSize || this._updateViewportSize();
                    const t = {width: this._viewportSize.width, height: this._viewportSize.height};
                    return this._platform.isBrowser || (this._viewportSize = null), t
                }

                getViewportRect() {
                    const t = this.getViewportScrollPosition(), {width: e, height: n} = this.getViewportSize();
                    return {top: t.top, left: t.left, bottom: t.top + n, right: t.left + e, height: n, width: e}
                }

                getViewportScrollPosition() {
                    if (!this._platform.isBrowser) return {top: 0, left: 0};
                    const t = this._document, e = this._getWindow(), n = t.documentElement,
                        s = n.getBoundingClientRect();
                    return {
                        top: -s.top || t.body.scrollTop || e.scrollY || n.scrollTop || 0,
                        left: -s.left || t.body.scrollLeft || e.scrollX || n.scrollLeft || 0
                    }
                }

                change(t = 20) {
                    return t > 0 ? this._change.pipe(Dy(t)) : this._change
                }

                _getWindow() {
                    return this._document.defaultView || window
                }

                _updateViewportSize() {
                    const t = this._getWindow();
                    this._viewportSize = this._platform.isBrowser ? {
                        width: t.innerWidth,
                        height: t.innerHeight
                    } : {width: 0, height: 0}
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(If), os(zl), os(bc, 8))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(If), os(zl), os(bc, 8))
                }, token: t, providedIn: "root"
            }), t
        })(), By = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({}), t
        })(), Hy = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[lm, Pf, By], lm, By]}), t
        })();

        class Uy {
            attach(t) {
                return this._attachedHost = t, t.attach(this)
            }

            detach() {
                let t = this._attachedHost;
                null != t && (this._attachedHost = null, t.detach())
            }

            get isAttached() {
                return null != this._attachedHost
            }

            setAttachedHost(t) {
                this._attachedHost = t
            }
        }

        class $y extends Uy {
            constructor(t, e, n, s) {
                super(), this.component = t, this.viewContainerRef = e, this.injector = n, this.componentFactoryResolver = s
            }
        }

        class qy extends Uy {
            constructor(t, e, n) {
                super(), this.templateRef = t, this.viewContainerRef = e, this.context = n
            }

            get origin() {
                return this.templateRef.elementRef
            }

            attach(t, e = this.context) {
                return this.context = e, super.attach(t)
            }

            detach() {
                return this.context = void 0, super.detach()
            }
        }

        class Wy extends Uy {
            constructor(t) {
                super(), this.element = t instanceof Qo ? t.nativeElement : t
            }
        }

        class Gy extends class {
            constructor() {
                this._isDisposed = !1, this.attachDomPortal = null
            }

            hasAttached() {
                return !!this._attachedPortal
            }

            attach(t) {
                return t instanceof $y ? (this._attachedPortal = t, this.attachComponentPortal(t)) : t instanceof qy ? (this._attachedPortal = t, this.attachTemplatePortal(t)) : this.attachDomPortal && t instanceof Wy ? (this._attachedPortal = t, this.attachDomPortal(t)) : void 0
            }

            detach() {
                this._attachedPortal && (this._attachedPortal.setAttachedHost(null), this._attachedPortal = null), this._invokeDisposeFn()
            }

            dispose() {
                this.hasAttached() && this.detach(), this._invokeDisposeFn(), this._isDisposed = !0
            }

            setDisposeFn(t) {
                this._disposeFn = t
            }

            _invokeDisposeFn() {
                this._disposeFn && (this._disposeFn(), this._disposeFn = null)
            }
        } {
            constructor(t, e, n, s, i) {
                super(), this.outletElement = t, this._componentFactoryResolver = e, this._appRef = n, this._defaultInjector = s, this.attachDomPortal = t => {
                    const e = t.element, n = this._document.createComment("dom-portal");
                    e.parentNode.insertBefore(n, e), this.outletElement.appendChild(e), super.setDisposeFn(() => {
                        n.parentNode && n.parentNode.replaceChild(e, n)
                    })
                }, this._document = i
            }

            attachComponentPortal(t) {
                const e = (t.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(t.component);
                let n;
                return t.viewContainerRef ? (n = t.viewContainerRef.createComponent(e, t.viewContainerRef.length, t.injector || t.viewContainerRef.injector), this.setDisposeFn(() => n.destroy())) : (n = e.create(t.injector || this._defaultInjector), this._appRef.attachView(n.hostView), this.setDisposeFn(() => {
                    this._appRef.detachView(n.hostView), n.destroy()
                })), this.outletElement.appendChild(this._getComponentRootNode(n)), n
            }

            attachTemplatePortal(t) {
                let e = t.viewContainerRef, n = e.createEmbeddedView(t.templateRef, t.context);
                return n.rootNodes.forEach(t => this.outletElement.appendChild(t)), n.detectChanges(), this.setDisposeFn(() => {
                    let t = e.indexOf(n);
                    -1 !== t && e.remove(t)
                }), n
            }

            dispose() {
                super.dispose(), null != this.outletElement.parentNode && this.outletElement.parentNode.removeChild(this.outletElement)
            }

            _getComponentRootNode(t) {
                return t.hostView.rootNodes[0]
            }
        }

        let Ky = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({}), t
        })();

        class Zy {
            constructor(t, e) {
                this.predicate = t, this.inclusive = e
            }

            call(t, e) {
                return e.subscribe(new Qy(t, this.predicate, this.inclusive))
            }
        }

        class Qy extends f {
            constructor(t, e, n) {
                super(t), this.predicate = e, this.inclusive = n, this.index = 0
            }

            _next(t) {
                const e = this.destination;
                let n;
                try {
                    n = this.predicate(t, this.index++)
                } catch (s) {
                    return void e.error(s)
                }
                this.nextOrComplete(t, n)
            }

            nextOrComplete(t, e) {
                const n = this.destination;
                Boolean(e) ? n.next(t) : (this.inclusive && n.next(t), n.complete())
            }
        }

        const Yy = Ff();

        class Xy {
            constructor(t, e) {
                this._viewportRuler = t, this._previousHTMLStyles = {
                    top: "",
                    left: ""
                }, this._isEnabled = !1, this._document = e
            }

            attach() {
            }

            enable() {
                if (this._canBeEnabled()) {
                    const t = this._document.documentElement;
                    this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition(), this._previousHTMLStyles.left = t.style.left || "", this._previousHTMLStyles.top = t.style.top || "", t.style.left = Ef(-this._previousScrollPosition.left), t.style.top = Ef(-this._previousScrollPosition.top), t.classList.add("cdk-global-scrollblock"), this._isEnabled = !0
                }
            }

            disable() {
                if (this._isEnabled) {
                    const t = this._document.documentElement, e = t.style, n = this._document.body.style,
                        s = e.scrollBehavior || "", i = n.scrollBehavior || "";
                    this._isEnabled = !1, e.left = this._previousHTMLStyles.left, e.top = this._previousHTMLStyles.top, t.classList.remove("cdk-global-scrollblock"), Yy && (e.scrollBehavior = n.scrollBehavior = "auto"), window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top), Yy && (e.scrollBehavior = s, n.scrollBehavior = i)
                }
            }

            _canBeEnabled() {
                if (this._document.documentElement.classList.contains("cdk-global-scrollblock") || this._isEnabled) return !1;
                const t = this._document.body, e = this._viewportRuler.getViewportSize();
                return t.scrollHeight > e.height || t.scrollWidth > e.width
            }
        }

        class Jy {
            constructor(t, e, n, s) {
                this._scrollDispatcher = t, this._ngZone = e, this._viewportRuler = n, this._config = s, this._scrollSubscription = null, this._detach = () => {
                    this.disable(), this._overlayRef.hasAttached() && this._ngZone.run(() => this._overlayRef.detach())
                }
            }

            attach(t) {
                this._overlayRef = t
            }

            enable() {
                if (this._scrollSubscription) return;
                const t = this._scrollDispatcher.scrolled(0);
                this._config && this._config.threshold && this._config.threshold > 1 ? (this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top, this._scrollSubscription = t.subscribe(() => {
                    const t = this._viewportRuler.getViewportScrollPosition().top;
                    Math.abs(t - this._initialScrollPosition) > this._config.threshold ? this._detach() : this._overlayRef.updatePosition()
                })) : this._scrollSubscription = t.subscribe(this._detach)
            }

            disable() {
                this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
            }

            detach() {
                this.disable(), this._overlayRef = null
            }
        }

        class tb {
            enable() {
            }

            disable() {
            }

            attach() {
            }
        }

        function eb(t, e) {
            return e.some(e => t.bottom < e.top || t.top > e.bottom || t.right < e.left || t.left > e.right)
        }

        function nb(t, e) {
            return e.some(e => t.top < e.top || t.bottom > e.bottom || t.left < e.left || t.right > e.right)
        }

        class sb {
            constructor(t, e, n, s) {
                this._scrollDispatcher = t, this._viewportRuler = e, this._ngZone = n, this._config = s, this._scrollSubscription = null
            }

            attach(t) {
                this._overlayRef = t
            }

            enable() {
                this._scrollSubscription || (this._scrollSubscription = this._scrollDispatcher.scrolled(this._config ? this._config.scrollThrottle : 0).subscribe(() => {
                    if (this._overlayRef.updatePosition(), this._config && this._config.autoClose) {
                        const t = this._overlayRef.overlayElement.getBoundingClientRect(), {
                            width: e,
                            height: n
                        } = this._viewportRuler.getViewportSize();
                        eb(t, [{
                            width: e,
                            height: n,
                            bottom: n,
                            right: e,
                            top: 0,
                            left: 0
                        }]) && (this.disable(), this._ngZone.run(() => this._overlayRef.detach()))
                    }
                }))
            }

            disable() {
                this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null)
            }

            detach() {
                this.disable(), this._overlayRef = null
            }
        }

        let ib = (() => {
            class t {
                constructor(t, e, n, s) {
                    this._scrollDispatcher = t, this._viewportRuler = e, this._ngZone = n, this.noop = () => new tb, this.close = t => new Jy(this._scrollDispatcher, this._ngZone, this._viewportRuler, t), this.block = () => new Xy(this._viewportRuler, this._document), this.reposition = t => new sb(this._scrollDispatcher, this._viewportRuler, this._ngZone, t), this._document = s
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(jy), os(zy), os(zl), os(bc))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(jy), os(zy), os(zl), os(bc))
                }, token: t, providedIn: "root"
            }), t
        })();

        class rb {
            constructor(t) {
                if (this.scrollStrategy = new tb, this.panelClass = "", this.hasBackdrop = !1, this.backdropClass = "cdk-overlay-dark-backdrop", this.disposeOnNavigation = !1, t) {
                    const e = Object.keys(t);
                    for (const n of e) void 0 !== t[n] && (this[n] = t[n])
                }
            }
        }

        class ob {
            constructor(t, e, n, s, i) {
                this.offsetX = n, this.offsetY = s, this.panelClass = i, this.originX = t.originX, this.originY = t.originY, this.overlayX = e.overlayX, this.overlayY = e.overlayY
            }
        }

        class ab {
            constructor(t, e) {
                this.connectionPair = t, this.scrollableViewProperties = e
            }
        }

        let lb = (() => {
            class t {
                constructor(t) {
                    this._attachedOverlays = [], this._document = t
                }

                ngOnDestroy() {
                    this.detach()
                }

                add(t) {
                    this.remove(t), this._attachedOverlays.push(t)
                }

                remove(t) {
                    const e = this._attachedOverlays.indexOf(t);
                    e > -1 && this._attachedOverlays.splice(e, 1), 0 === this._attachedOverlays.length && this.detach()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(bc))
                }, token: t, providedIn: "root"
            }), t
        })(), cb = (() => {
            class t extends lb {
                constructor(t) {
                    super(t), this._keydownListener = t => {
                        const e = this._attachedOverlays;
                        for (let n = e.length - 1; n > -1; n--) if (e[n]._keydownEvents.observers.length > 0) {
                            e[n]._keydownEvents.next(t);
                            break
                        }
                    }
                }

                add(t) {
                    super.add(t), this._isAttached || (this._document.body.addEventListener("keydown", this._keydownListener), this._isAttached = !0)
                }

                detach() {
                    this._isAttached && (this._document.body.removeEventListener("keydown", this._keydownListener), this._isAttached = !1)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(bc))
                }, token: t, providedIn: "root"
            }), t
        })(), hb = (() => {
            class t extends lb {
                constructor(t, e) {
                    super(t), this._platform = e, this._cursorStyleIsSet = !1, this._clickListener = t => {
                        const e = t.composedPath ? t.composedPath()[0] : t.target, n = this._attachedOverlays.slice();
                        for (let s = n.length - 1; s > -1; s--) {
                            const i = n[s];
                            if (!(i._outsidePointerEvents.observers.length < 1) && i.hasAttached()) {
                                if (i.overlayElement.contains(e)) break;
                                i._outsidePointerEvents.next(t)
                            }
                        }
                    }
                }

                add(t) {
                    super.add(t), this._isAttached || (this._document.body.addEventListener("click", this._clickListener, !0), this._document.body.addEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && !this._cursorStyleIsSet && (this._cursorOriginalValue = this._document.body.style.cursor, this._document.body.style.cursor = "pointer", this._cursorStyleIsSet = !0), this._isAttached = !0)
                }

                detach() {
                    this._isAttached && (this._document.body.removeEventListener("click", this._clickListener, !0), this._document.body.removeEventListener("contextmenu", this._clickListener, !0), this._platform.IOS && this._cursorStyleIsSet && (this._document.body.style.cursor = this._cursorOriginalValue, this._cursorStyleIsSet = !1), this._isAttached = !1)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc), os(If))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(bc), os(If))
                }, token: t, providedIn: "root"
            }), t
        })();
        const ub = !("undefined" == typeof window || !window || !window.__karma__ && !window.jasmine);
        let db = (() => {
            class t {
                constructor(t, e) {
                    this._platform = e, this._document = t
                }

                ngOnDestroy() {
                    const t = this._containerElement;
                    t && t.parentNode && t.parentNode.removeChild(t)
                }

                getContainerElement() {
                    return this._containerElement || this._createContainer(), this._containerElement
                }

                _createContainer() {
                    if (this._platform.isBrowser || ub) {
                        const t = this._document.querySelectorAll('.cdk-overlay-container[platform="server"], .cdk-overlay-container[platform="test"]');
                        for (let e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e])
                    }
                    const t = this._document.createElement("div");
                    t.classList.add("cdk-overlay-container"), ub ? t.setAttribute("platform", "test") : this._platform.isBrowser || t.setAttribute("platform", "server"), this._document.body.appendChild(t), this._containerElement = t
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc), os(If))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(bc), os(If))
                }, token: t, providedIn: "root"
            }), t
        })();

        class pb {
            constructor(t, e, n, s, i, r, o, a, l) {
                this._portalOutlet = t, this._host = e, this._pane = n, this._config = s, this._ngZone = i, this._keyboardDispatcher = r, this._document = o, this._location = a, this._outsideClickDispatcher = l, this._backdropElement = null, this._backdropClick = new S, this._attachments = new S, this._detachments = new S, this._locationChanges = u.EMPTY, this._backdropClickHandler = t => this._backdropClick.next(t), this._keydownEvents = new S, this._outsidePointerEvents = new S, s.scrollStrategy && (this._scrollStrategy = s.scrollStrategy, this._scrollStrategy.attach(this)), this._positionStrategy = s.positionStrategy
            }

            get overlayElement() {
                return this._pane
            }

            get backdropElement() {
                return this._backdropElement
            }

            get hostElement() {
                return this._host
            }

            attach(t) {
                let e = this._portalOutlet.attach(t);
                return !this._host.parentElement && this._previousHostParent && this._previousHostParent.appendChild(this._host), this._positionStrategy && this._positionStrategy.attach(this), this._updateStackingOrder(), this._updateElementSize(), this._updateElementDirection(), this._scrollStrategy && this._scrollStrategy.enable(), this._ngZone.onStable.pipe(Yh(1)).subscribe(() => {
                    this.hasAttached() && this.updatePosition()
                }), this._togglePointerEvents(!0), this._config.hasBackdrop && this._attachBackdrop(), this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0), this._attachments.next(), this._keyboardDispatcher.add(this), this._config.disposeOnNavigation && (this._locationChanges = this._location.subscribe(() => this.dispose())), this._outsideClickDispatcher.add(this), e
            }

            detach() {
                if (!this.hasAttached()) return;
                this.detachBackdrop(), this._togglePointerEvents(!1), this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(), this._scrollStrategy && this._scrollStrategy.disable();
                const t = this._portalOutlet.detach();
                return this._detachments.next(), this._keyboardDispatcher.remove(this), this._detachContentWhenStable(), this._locationChanges.unsubscribe(), this._outsideClickDispatcher.remove(this), t
            }

            dispose() {
                const t = this.hasAttached();
                this._positionStrategy && this._positionStrategy.dispose(), this._disposeScrollStrategy(), this.detachBackdrop(), this._locationChanges.unsubscribe(), this._keyboardDispatcher.remove(this), this._portalOutlet.dispose(), this._attachments.complete(), this._backdropClick.complete(), this._keydownEvents.complete(), this._outsidePointerEvents.complete(), this._outsideClickDispatcher.remove(this), this._host && this._host.parentNode && (this._host.parentNode.removeChild(this._host), this._host = null), this._previousHostParent = this._pane = null, t && this._detachments.next(), this._detachments.complete()
            }

            hasAttached() {
                return this._portalOutlet.hasAttached()
            }

            backdropClick() {
                return this._backdropClick
            }

            attachments() {
                return this._attachments
            }

            detachments() {
                return this._detachments
            }

            keydownEvents() {
                return this._keydownEvents
            }

            outsidePointerEvents() {
                return this._outsidePointerEvents
            }

            getConfig() {
                return this._config
            }

            updatePosition() {
                this._positionStrategy && this._positionStrategy.apply()
            }

            updatePositionStrategy(t) {
                t !== this._positionStrategy && (this._positionStrategy && this._positionStrategy.dispose(), this._positionStrategy = t, this.hasAttached() && (t.attach(this), this.updatePosition()))
            }

            updateSize(t) {
                this._config = Object.assign(Object.assign({}, this._config), t), this._updateElementSize()
            }

            setDirection(t) {
                this._config = Object.assign(Object.assign({}, this._config), {direction: t}), this._updateElementDirection()
            }

            addPanelClass(t) {
                this._pane && this._toggleClasses(this._pane, t, !0)
            }

            removePanelClass(t) {
                this._pane && this._toggleClasses(this._pane, t, !1)
            }

            getDirection() {
                const t = this._config.direction;
                return t ? "string" == typeof t ? t : t.value : "ltr"
            }

            updateScrollStrategy(t) {
                t !== this._scrollStrategy && (this._disposeScrollStrategy(), this._scrollStrategy = t, this.hasAttached() && (t.attach(this), t.enable()))
            }

            _updateElementDirection() {
                this._host.setAttribute("dir", this.getDirection())
            }

            _updateElementSize() {
                if (!this._pane) return;
                const t = this._pane.style;
                t.width = Ef(this._config.width), t.height = Ef(this._config.height), t.minWidth = Ef(this._config.minWidth), t.minHeight = Ef(this._config.minHeight), t.maxWidth = Ef(this._config.maxWidth), t.maxHeight = Ef(this._config.maxHeight)
            }

            _togglePointerEvents(t) {
                this._pane.style.pointerEvents = t ? "" : "none"
            }

            _attachBackdrop() {
                this._backdropElement = this._document.createElement("div"), this._backdropElement.classList.add("cdk-overlay-backdrop"), this._config.backdropClass && this._toggleClasses(this._backdropElement, this._config.backdropClass, !0), this._host.parentElement.insertBefore(this._backdropElement, this._host), this._backdropElement.addEventListener("click", this._backdropClickHandler), "undefined" != typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
                    requestAnimationFrame(() => {
                        this._backdropElement && this._backdropElement.classList.add("cdk-overlay-backdrop-showing")
                    })
                }) : this._backdropElement.classList.add("cdk-overlay-backdrop-showing")
            }

            _updateStackingOrder() {
                this._host.nextSibling && this._host.parentNode.appendChild(this._host)
            }

            detachBackdrop() {
                let t, e = this._backdropElement;
                if (!e) return;
                let n = () => {
                    e && (e.removeEventListener("click", this._backdropClickHandler), e.removeEventListener("transitionend", n), e.parentNode && e.parentNode.removeChild(e)), this._backdropElement == e && (this._backdropElement = null), this._config.backdropClass && this._toggleClasses(e, this._config.backdropClass, !1), clearTimeout(t)
                };
                e.classList.remove("cdk-overlay-backdrop-showing"), this._ngZone.runOutsideAngular(() => {
                    e.addEventListener("transitionend", n)
                }), e.style.pointerEvents = "none", t = this._ngZone.runOutsideAngular(() => setTimeout(n, 500))
            }

            _toggleClasses(t, e, n) {
                const s = t.classList;
                kf(e).forEach(t => {
                    t && (n ? s.add(t) : s.remove(t))
                })
            }

            _detachContentWhenStable() {
                this._ngZone.runOutsideAngular(() => {
                    const t = this._ngZone.onStable.pipe(Iy(q(this._attachments, this._detachments))).subscribe(() => {
                        this._pane && this._host && 0 !== this._pane.children.length || (this._pane && this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !1), this._host && this._host.parentElement && (this._previousHostParent = this._host.parentElement, this._previousHostParent.removeChild(this._host)), t.unsubscribe())
                    })
                })
            }

            _disposeScrollStrategy() {
                const t = this._scrollStrategy;
                t && (t.disable(), t.detach && t.detach())
            }
        }

        const fb = /([A-Za-z%]+)$/;

        class mb {
            constructor(t, e, n, s, i) {
                this._viewportRuler = e, this._document = n, this._platform = s, this._overlayContainer = i, this._lastBoundingBoxSize = {
                    width: 0,
                    height: 0
                }, this._isPushed = !1, this._canPush = !0, this._growAfterOpen = !1, this._hasFlexibleDimensions = !0, this._positionLocked = !1, this._viewportMargin = 0, this._scrollables = [], this._preferredPositions = [], this._positionChanges = new S, this._resizeSubscription = u.EMPTY, this._offsetX = 0, this._offsetY = 0, this._appliedPanelClasses = [], this.positionChanges = this._positionChanges, this.setOrigin(t)
            }

            get positions() {
                return this._preferredPositions
            }

            attach(t) {
                this._validatePositions(), t.hostElement.classList.add("cdk-overlay-connected-position-bounding-box"), this._overlayRef = t, this._boundingBox = t.hostElement, this._pane = t.overlayElement, this._isDisposed = !1, this._isInitialRender = !0, this._lastPosition = null, this._resizeSubscription.unsubscribe(), this._resizeSubscription = this._viewportRuler.change().subscribe(() => {
                    this._isInitialRender = !0, this.apply()
                })
            }

            apply() {
                if (this._isDisposed || !this._platform.isBrowser) return;
                if (!this._isInitialRender && this._positionLocked && this._lastPosition) return void this.reapplyLastPosition();
                this._clearPanelClasses(), this._resetOverlayElementStyles(), this._resetBoundingBoxStyles(), this._viewportRect = this._getNarrowedViewportRect(), this._originRect = this._getOriginRect(), this._overlayRect = this._pane.getBoundingClientRect();
                const t = this._originRect, e = this._overlayRect, n = this._viewportRect, s = [];
                let i;
                for (let r of this._preferredPositions) {
                    let o = this._getOriginPoint(t, r), a = this._getOverlayPoint(o, e, r),
                        l = this._getOverlayFit(a, e, n, r);
                    if (l.isCompletelyWithinViewport) return this._isPushed = !1, void this._applyPosition(r, o);
                    this._canFitWithFlexibleDimensions(l, a, n) ? s.push({
                        position: r,
                        origin: o,
                        overlayRect: e,
                        boundingBoxRect: this._calculateBoundingBoxRect(o, r)
                    }) : (!i || i.overlayFit.visibleArea < l.visibleArea) && (i = {
                        overlayFit: l,
                        overlayPoint: a,
                        originPoint: o,
                        position: r,
                        overlayRect: e
                    })
                }
                if (s.length) {
                    let t = null, e = -1;
                    for (const n of s) {
                        const s = n.boundingBoxRect.width * n.boundingBoxRect.height * (n.position.weight || 1);
                        s > e && (e = s, t = n)
                    }
                    return this._isPushed = !1, void this._applyPosition(t.position, t.origin)
                }
                if (this._canPush) return this._isPushed = !0, void this._applyPosition(i.position, i.originPoint);
                this._applyPosition(i.position, i.originPoint)
            }

            detach() {
                this._clearPanelClasses(), this._lastPosition = null, this._previousPushAmount = null, this._resizeSubscription.unsubscribe()
            }

            dispose() {
                this._isDisposed || (this._boundingBox && gb(this._boundingBox.style, {
                    top: "",
                    left: "",
                    right: "",
                    bottom: "",
                    height: "",
                    width: "",
                    alignItems: "",
                    justifyContent: ""
                }), this._pane && this._resetOverlayElementStyles(), this._overlayRef && this._overlayRef.hostElement.classList.remove("cdk-overlay-connected-position-bounding-box"), this.detach(), this._positionChanges.complete(), this._overlayRef = this._boundingBox = null, this._isDisposed = !0)
            }

            reapplyLastPosition() {
                if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
                    this._originRect = this._getOriginRect(), this._overlayRect = this._pane.getBoundingClientRect(), this._viewportRect = this._getNarrowedViewportRect();
                    const t = this._lastPosition || this._preferredPositions[0],
                        e = this._getOriginPoint(this._originRect, t);
                    this._applyPosition(t, e)
                }
            }

            withScrollableContainers(t) {
                return this._scrollables = t, this
            }

            withPositions(t) {
                return this._preferredPositions = t, -1 === t.indexOf(this._lastPosition) && (this._lastPosition = null), this._validatePositions(), this
            }

            withViewportMargin(t) {
                return this._viewportMargin = t, this
            }

            withFlexibleDimensions(t = !0) {
                return this._hasFlexibleDimensions = t, this
            }

            withGrowAfterOpen(t = !0) {
                return this._growAfterOpen = t, this
            }

            withPush(t = !0) {
                return this._canPush = t, this
            }

            withLockedPosition(t = !0) {
                return this._positionLocked = t, this
            }

            setOrigin(t) {
                return this._origin = t, this
            }

            withDefaultOffsetX(t) {
                return this._offsetX = t, this
            }

            withDefaultOffsetY(t) {
                return this._offsetY = t, this
            }

            withTransformOriginOn(t) {
                return this._transformOriginSelector = t, this
            }

            _getOriginPoint(t, e) {
                let n, s;
                if ("center" == e.originX) n = t.left + t.width / 2; else {
                    const s = this._isRtl() ? t.right : t.left, i = this._isRtl() ? t.left : t.right;
                    n = "start" == e.originX ? s : i
                }
                return s = "center" == e.originY ? t.top + t.height / 2 : "top" == e.originY ? t.top : t.bottom, {
                    x: n,
                    y: s
                }
            }

            _getOverlayPoint(t, e, n) {
                let s, i;
                return s = "center" == n.overlayX ? -e.width / 2 : "start" === n.overlayX ? this._isRtl() ? -e.width : 0 : this._isRtl() ? 0 : -e.width, i = "center" == n.overlayY ? -e.height / 2 : "top" == n.overlayY ? 0 : -e.height, {
                    x: t.x + s,
                    y: t.y + i
                }
            }

            _getOverlayFit(t, e, n, s) {
                const i = yb(e);
                let {x: r, y: o} = t, a = this._getOffset(s, "x"), l = this._getOffset(s, "y");
                a && (r += a), l && (o += l);
                let c = 0 - o, h = o + i.height - n.height,
                    u = this._subtractOverflows(i.width, 0 - r, r + i.width - n.width),
                    d = this._subtractOverflows(i.height, c, h), p = u * d;
                return {
                    visibleArea: p,
                    isCompletelyWithinViewport: i.width * i.height === p,
                    fitsInViewportVertically: d === i.height,
                    fitsInViewportHorizontally: u == i.width
                }
            }

            _canFitWithFlexibleDimensions(t, e, n) {
                if (this._hasFlexibleDimensions) {
                    const s = n.bottom - e.y, i = n.right - e.x, r = _b(this._overlayRef.getConfig().minHeight),
                        o = _b(this._overlayRef.getConfig().minWidth),
                        a = t.fitsInViewportHorizontally || null != o && o <= i;
                    return (t.fitsInViewportVertically || null != r && r <= s) && a
                }
                return !1
            }

            _pushOverlayOnScreen(t, e, n) {
                if (this._previousPushAmount && this._positionLocked) return {
                    x: t.x + this._previousPushAmount.x,
                    y: t.y + this._previousPushAmount.y
                };
                const s = yb(e), i = this._viewportRect, r = Math.max(t.x + s.width - i.width, 0),
                    o = Math.max(t.y + s.height - i.height, 0), a = Math.max(i.top - n.top - t.y, 0),
                    l = Math.max(i.left - n.left - t.x, 0);
                let c = 0, h = 0;
                return c = s.width <= i.width ? l || -r : t.x < this._viewportMargin ? i.left - n.left - t.x : 0, h = s.height <= i.height ? a || -o : t.y < this._viewportMargin ? i.top - n.top - t.y : 0, this._previousPushAmount = {
                    x: c,
                    y: h
                }, {x: t.x + c, y: t.y + h}
            }

            _applyPosition(t, e) {
                if (this._setTransformOrigin(t), this._setOverlayElementStyles(e, t), this._setBoundingBoxStyles(e, t), t.panelClass && this._addPanelClasses(t.panelClass), this._lastPosition = t, this._positionChanges.observers.length) {
                    const e = this._getScrollVisibility(), n = new ab(t, e);
                    this._positionChanges.next(n)
                }
                this._isInitialRender = !1
            }

            _setTransformOrigin(t) {
                if (!this._transformOriginSelector) return;
                const e = this._boundingBox.querySelectorAll(this._transformOriginSelector);
                let n, s = t.overlayY;
                n = "center" === t.overlayX ? "center" : this._isRtl() ? "start" === t.overlayX ? "right" : "left" : "start" === t.overlayX ? "left" : "right";
                for (let i = 0; i < e.length; i++) e[i].style.transformOrigin = `${n} ${s}`
            }

            _calculateBoundingBoxRect(t, e) {
                const n = this._viewportRect, s = this._isRtl();
                let i, r, o, a, l, c;
                if ("top" === e.overlayY) r = t.y, i = n.height - r + this._viewportMargin; else if ("bottom" === e.overlayY) o = n.height - t.y + 2 * this._viewportMargin, i = n.height - o + this._viewportMargin; else {
                    const e = Math.min(n.bottom - t.y + n.top, t.y), s = this._lastBoundingBoxSize.height;
                    i = 2 * e, r = t.y - e, i > s && !this._isInitialRender && !this._growAfterOpen && (r = t.y - s / 2)
                }
                if ("end" === e.overlayX && !s || "start" === e.overlayX && s) c = n.width - t.x + this._viewportMargin, a = t.x - this._viewportMargin; else if ("start" === e.overlayX && !s || "end" === e.overlayX && s) l = t.x, a = n.right - t.x; else {
                    const e = Math.min(n.right - t.x + n.left, t.x), s = this._lastBoundingBoxSize.width;
                    a = 2 * e, l = t.x - e, a > s && !this._isInitialRender && !this._growAfterOpen && (l = t.x - s / 2)
                }
                return {top: r, left: l, bottom: o, right: c, width: a, height: i}
            }

            _setBoundingBoxStyles(t, e) {
                const n = this._calculateBoundingBoxRect(t, e);
                this._isInitialRender || this._growAfterOpen || (n.height = Math.min(n.height, this._lastBoundingBoxSize.height), n.width = Math.min(n.width, this._lastBoundingBoxSize.width));
                const s = {};
                if (this._hasExactPosition()) s.top = s.left = "0", s.bottom = s.right = s.maxHeight = s.maxWidth = "", s.width = s.height = "100%"; else {
                    const t = this._overlayRef.getConfig().maxHeight, i = this._overlayRef.getConfig().maxWidth;
                    s.height = Ef(n.height), s.top = Ef(n.top), s.bottom = Ef(n.bottom), s.width = Ef(n.width), s.left = Ef(n.left), s.right = Ef(n.right), s.alignItems = "center" === e.overlayX ? "center" : "end" === e.overlayX ? "flex-end" : "flex-start", s.justifyContent = "center" === e.overlayY ? "center" : "bottom" === e.overlayY ? "flex-end" : "flex-start", t && (s.maxHeight = Ef(t)), i && (s.maxWidth = Ef(i))
                }
                this._lastBoundingBoxSize = n, gb(this._boundingBox.style, s)
            }

            _resetBoundingBoxStyles() {
                gb(this._boundingBox.style, {
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    height: "",
                    width: "",
                    alignItems: "",
                    justifyContent: ""
                })
            }

            _resetOverlayElementStyles() {
                gb(this._pane.style, {top: "", left: "", bottom: "", right: "", position: "", transform: ""})
            }

            _setOverlayElementStyles(t, e) {
                const n = {}, s = this._hasExactPosition(), i = this._hasFlexibleDimensions,
                    r = this._overlayRef.getConfig();
                if (s) {
                    const s = this._viewportRuler.getViewportScrollPosition();
                    gb(n, this._getExactOverlayY(e, t, s)), gb(n, this._getExactOverlayX(e, t, s))
                } else n.position = "static";
                let o = "", a = this._getOffset(e, "x"), l = this._getOffset(e, "y");
                a && (o += `translateX(${a}px) `), l && (o += `translateY(${l}px)`), n.transform = o.trim(), r.maxHeight && (s ? n.maxHeight = Ef(r.maxHeight) : i && (n.maxHeight = "")), r.maxWidth && (s ? n.maxWidth = Ef(r.maxWidth) : i && (n.maxWidth = "")), gb(this._pane.style, n)
            }

            _getExactOverlayY(t, e, n) {
                let s = {top: "", bottom: ""}, i = this._getOverlayPoint(e, this._overlayRect, t);
                this._isPushed && (i = this._pushOverlayOnScreen(i, this._overlayRect, n));
                let r = this._overlayContainer.getContainerElement().getBoundingClientRect().top;
                return i.y -= r, "bottom" === t.overlayY ? s.bottom = this._document.documentElement.clientHeight - (i.y + this._overlayRect.height) + "px" : s.top = Ef(i.y), s
            }

            _getExactOverlayX(t, e, n) {
                let s, i = {left: "", right: ""}, r = this._getOverlayPoint(e, this._overlayRect, t);
                return this._isPushed && (r = this._pushOverlayOnScreen(r, this._overlayRect, n)), s = this._isRtl() ? "end" === t.overlayX ? "left" : "right" : "end" === t.overlayX ? "right" : "left", "right" === s ? i.right = this._document.documentElement.clientWidth - (r.x + this._overlayRect.width) + "px" : i.left = Ef(r.x), i
            }

            _getScrollVisibility() {
                const t = this._getOriginRect(), e = this._pane.getBoundingClientRect(),
                    n = this._scrollables.map(t => t.getElementRef().nativeElement.getBoundingClientRect());
                return {
                    isOriginClipped: nb(t, n),
                    isOriginOutsideView: eb(t, n),
                    isOverlayClipped: nb(e, n),
                    isOverlayOutsideView: eb(e, n)
                }
            }

            _subtractOverflows(t, ...e) {
                return e.reduce((t, e) => t - Math.max(e, 0), t)
            }

            _getNarrowedViewportRect() {
                const t = this._document.documentElement.clientWidth, e = this._document.documentElement.clientHeight,
                    n = this._viewportRuler.getViewportScrollPosition();
                return {
                    top: n.top + this._viewportMargin,
                    left: n.left + this._viewportMargin,
                    right: n.left + t - this._viewportMargin,
                    bottom: n.top + e - this._viewportMargin,
                    width: t - 2 * this._viewportMargin,
                    height: e - 2 * this._viewportMargin
                }
            }

            _isRtl() {
                return "rtl" === this._overlayRef.getDirection()
            }

            _hasExactPosition() {
                return !this._hasFlexibleDimensions || this._isPushed
            }

            _getOffset(t, e) {
                return "x" === e ? null == t.offsetX ? this._offsetX : t.offsetX : null == t.offsetY ? this._offsetY : t.offsetY
            }

            _validatePositions() {
            }

            _addPanelClasses(t) {
                this._pane && kf(t).forEach(t => {
                    "" !== t && -1 === this._appliedPanelClasses.indexOf(t) && (this._appliedPanelClasses.push(t), this._pane.classList.add(t))
                })
            }

            _clearPanelClasses() {
                this._pane && (this._appliedPanelClasses.forEach(t => {
                    this._pane.classList.remove(t)
                }), this._appliedPanelClasses = [])
            }

            _getOriginRect() {
                const t = this._origin;
                if (t instanceof Qo) return t.nativeElement.getBoundingClientRect();
                if (t instanceof Element) return t.getBoundingClientRect();
                const e = t.width || 0, n = t.height || 0;
                return {top: t.y, bottom: t.y + n, left: t.x, right: t.x + e, height: n, width: e}
            }
        }

        function gb(t, e) {
            for (let n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }

        function _b(t) {
            if ("number" != typeof t && null != t) {
                const [e, n] = t.split(fb);
                return n && "px" !== n ? null : parseFloat(e)
            }
            return t || null
        }

        function yb(t) {
            return {
                top: Math.floor(t.top),
                right: Math.floor(t.right),
                bottom: Math.floor(t.bottom),
                left: Math.floor(t.left),
                width: Math.floor(t.width),
                height: Math.floor(t.height)
            }
        }

        class bb {
            constructor(t, e, n, s, i, r, o) {
                this._preferredPositions = [], this._positionStrategy = new mb(n, s, i, r, o).withFlexibleDimensions(!1).withPush(!1).withViewportMargin(0), this.withFallbackPosition(t, e), this.onPositionChange = this._positionStrategy.positionChanges
            }

            get positions() {
                return this._preferredPositions
            }

            attach(t) {
                this._overlayRef = t, this._positionStrategy.attach(t), this._direction && (t.setDirection(this._direction), this._direction = null)
            }

            dispose() {
                this._positionStrategy.dispose()
            }

            detach() {
                this._positionStrategy.detach()
            }

            apply() {
                this._positionStrategy.apply()
            }

            recalculateLastPosition() {
                this._positionStrategy.reapplyLastPosition()
            }

            withScrollableContainers(t) {
                this._positionStrategy.withScrollableContainers(t)
            }

            withFallbackPosition(t, e, n, s) {
                const i = new ob(t, e, n, s);
                return this._preferredPositions.push(i), this._positionStrategy.withPositions(this._preferredPositions), this
            }

            withDirection(t) {
                return this._overlayRef ? this._overlayRef.setDirection(t) : this._direction = t, this
            }

            withOffsetX(t) {
                return this._positionStrategy.withDefaultOffsetX(t), this
            }

            withOffsetY(t) {
                return this._positionStrategy.withDefaultOffsetY(t), this
            }

            withLockedPosition(t) {
                return this._positionStrategy.withLockedPosition(t), this
            }

            withPositions(t) {
                return this._preferredPositions = t.slice(), this._positionStrategy.withPositions(this._preferredPositions), this
            }

            setOrigin(t) {
                return this._positionStrategy.setOrigin(t), this
            }
        }

        class vb {
            constructor() {
                this._cssPosition = "static", this._topOffset = "", this._bottomOffset = "", this._leftOffset = "", this._rightOffset = "", this._alignItems = "", this._justifyContent = "", this._width = "", this._height = ""
            }

            attach(t) {
                const e = t.getConfig();
                this._overlayRef = t, this._width && !e.width && t.updateSize({width: this._width}), this._height && !e.height && t.updateSize({height: this._height}), t.hostElement.classList.add("cdk-global-overlay-wrapper"), this._isDisposed = !1
            }

            top(t = "") {
                return this._bottomOffset = "", this._topOffset = t, this._alignItems = "flex-start", this
            }

            left(t = "") {
                return this._rightOffset = "", this._leftOffset = t, this._justifyContent = "flex-start", this
            }

            bottom(t = "") {
                return this._topOffset = "", this._bottomOffset = t, this._alignItems = "flex-end", this
            }

            right(t = "") {
                return this._leftOffset = "", this._rightOffset = t, this._justifyContent = "flex-end", this
            }

            width(t = "") {
                return this._overlayRef ? this._overlayRef.updateSize({width: t}) : this._width = t, this
            }

            height(t = "") {
                return this._overlayRef ? this._overlayRef.updateSize({height: t}) : this._height = t, this
            }

            centerHorizontally(t = "") {
                return this.left(t), this._justifyContent = "center", this
            }

            centerVertically(t = "") {
                return this.top(t), this._alignItems = "center", this
            }

            apply() {
                if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
                const t = this._overlayRef.overlayElement.style, e = this._overlayRef.hostElement.style,
                    n = this._overlayRef.getConfig(), {width: s, height: i, maxWidth: r, maxHeight: o} = n,
                    a = !("100%" !== s && "100vw" !== s || r && "100%" !== r && "100vw" !== r),
                    l = !("100%" !== i && "100vh" !== i || o && "100%" !== o && "100vh" !== o);
                t.position = this._cssPosition, t.marginLeft = a ? "0" : this._leftOffset, t.marginTop = l ? "0" : this._topOffset, t.marginBottom = this._bottomOffset, t.marginRight = this._rightOffset, a ? e.justifyContent = "flex-start" : "center" === this._justifyContent ? e.justifyContent = "center" : "rtl" === this._overlayRef.getConfig().direction ? "flex-start" === this._justifyContent ? e.justifyContent = "flex-end" : "flex-end" === this._justifyContent && (e.justifyContent = "flex-start") : e.justifyContent = this._justifyContent, e.alignItems = l ? "flex-start" : this._alignItems
            }

            dispose() {
                if (this._isDisposed || !this._overlayRef) return;
                const t = this._overlayRef.overlayElement.style, e = this._overlayRef.hostElement, n = e.style;
                e.classList.remove("cdk-global-overlay-wrapper"), n.justifyContent = n.alignItems = t.marginTop = t.marginBottom = t.marginLeft = t.marginRight = t.position = "", this._overlayRef = null, this._isDisposed = !0
            }
        }

        let wb = (() => {
            class t {
                constructor(t, e, n, s) {
                    this._viewportRuler = t, this._document = e, this._platform = n, this._overlayContainer = s
                }

                global() {
                    return new vb
                }

                connectedTo(t, e, n) {
                    return new bb(e, n, t, this._viewportRuler, this._document, this._platform, this._overlayContainer)
                }

                flexibleConnectedTo(t) {
                    return new mb(t, this._viewportRuler, this._document, this._platform, this._overlayContainer)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(zy), os(bc), os(If), os(db))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(zy), os(bc), os(If), os(db))
                }, token: t, providedIn: "root"
            }), t
        })(), Cb = 0, Sb = (() => {
            class t {
                constructor(t, e, n, s, i, r, o, a, l, c, h) {
                    this.scrollStrategies = t, this._overlayContainer = e, this._componentFactoryResolver = n, this._positionBuilder = s, this._keyboardDispatcher = i, this._injector = r, this._ngZone = o, this._document = a, this._directionality = l, this._location = c, this._outsideClickDispatcher = h
                }

                create(t) {
                    const e = this._createHostElement(), n = this._createPaneElement(e),
                        s = this._createPortalOutlet(n), i = new rb(t);
                    return i.direction = i.direction || this._directionality.value, new pb(s, e, n, i, this._ngZone, this._keyboardDispatcher, this._document, this._location, this._outsideClickDispatcher)
                }

                position() {
                    return this._positionBuilder
                }

                _createPaneElement(t) {
                    const e = this._document.createElement("div");
                    return e.id = "cdk-overlay-" + Cb++, e.classList.add("cdk-overlay-pane"), t.appendChild(e), e
                }

                _createHostElement() {
                    const t = this._document.createElement("div");
                    return this._overlayContainer.getContainerElement().appendChild(t), t
                }

                _createPortalOutlet(t) {
                    return this._appRef || (this._appRef = this._injector.get(ac)), new Gy(t, this._componentFactoryResolver, this._appRef, this._injector, this._document)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(ib), os(db), os(Wo), os(wb), os(cb), os(wr), os(zl), os(bc), os(am), os(Nc), os(hb))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const xb = [{originX: "start", originY: "bottom", overlayX: "start", overlayY: "top"}, {
            originX: "start",
            originY: "top",
            overlayX: "start",
            overlayY: "bottom"
        }, {originX: "end", originY: "top", overlayX: "end", overlayY: "bottom"}, {
            originX: "end",
            originY: "bottom",
            overlayX: "end",
            overlayY: "top"
        }], kb = new $n("cdk-connected-overlay-scroll-strategy");
        let Eb = (() => {
            class t {
                constructor(t) {
                    this.elementRef = t
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Qo))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "cdk-overlay-origin", ""], ["", "overlay-origin", ""], ["", "cdkOverlayOrigin", ""]],
                exportAs: ["cdkOverlayOrigin"]
            }), t
        })(), Ob = (() => {
            class t {
                constructor(t, e, n, s, i) {
                    this._overlay = t, this._dir = i, this._hasBackdrop = !1, this._lockPosition = !1, this._growAfterOpen = !1, this._flexibleDimensions = !1, this._push = !1, this._backdropSubscription = u.EMPTY, this._attachSubscription = u.EMPTY, this._detachSubscription = u.EMPTY, this._positionSubscription = u.EMPTY, this.viewportMargin = 0, this.open = !1, this.disableClose = !1, this.backdropClick = new el, this.positionChange = new el, this.attach = new el, this.detach = new el, this.overlayKeydown = new el, this.overlayOutsideClick = new el, this._templatePortal = new qy(e, n), this._scrollStrategyFactory = s, this.scrollStrategy = this._scrollStrategyFactory()
                }

                get offsetX() {
                    return this._offsetX
                }

                set offsetX(t) {
                    this._offsetX = t, this._position && this._updatePositionStrategy(this._position)
                }

                get offsetY() {
                    return this._offsetY
                }

                set offsetY(t) {
                    this._offsetY = t, this._position && this._updatePositionStrategy(this._position)
                }

                get hasBackdrop() {
                    return this._hasBackdrop
                }

                set hasBackdrop(t) {
                    this._hasBackdrop = Cf(t)
                }

                get lockPosition() {
                    return this._lockPosition
                }

                set lockPosition(t) {
                    this._lockPosition = Cf(t)
                }

                get flexibleDimensions() {
                    return this._flexibleDimensions
                }

                set flexibleDimensions(t) {
                    this._flexibleDimensions = Cf(t)
                }

                get growAfterOpen() {
                    return this._growAfterOpen
                }

                set growAfterOpen(t) {
                    this._growAfterOpen = Cf(t)
                }

                get push() {
                    return this._push
                }

                set push(t) {
                    this._push = Cf(t)
                }

                get overlayRef() {
                    return this._overlayRef
                }

                get dir() {
                    return this._dir ? this._dir.value : "ltr"
                }

                ngOnDestroy() {
                    this._attachSubscription.unsubscribe(), this._detachSubscription.unsubscribe(), this._backdropSubscription.unsubscribe(), this._positionSubscription.unsubscribe(), this._overlayRef && this._overlayRef.dispose()
                }

                ngOnChanges(t) {
                    this._position && (this._updatePositionStrategy(this._position), this._overlayRef.updateSize({
                        width: this.width,
                        minWidth: this.minWidth,
                        height: this.height,
                        minHeight: this.minHeight
                    }), t.origin && this.open && this._position.apply()), t.open && (this.open ? this._attachOverlay() : this._detachOverlay())
                }

                _createOverlay() {
                    this.positions && this.positions.length || (this.positions = xb);
                    const t = this._overlayRef = this._overlay.create(this._buildConfig());
                    this._attachSubscription = t.attachments().subscribe(() => this.attach.emit()), this._detachSubscription = t.detachments().subscribe(() => this.detach.emit()), t.keydownEvents().subscribe(t => {
                        this.overlayKeydown.next(t), 27 !== t.keyCode || this.disableClose || df(t) || (t.preventDefault(), this._detachOverlay())
                    }), this._overlayRef.outsidePointerEvents().subscribe(t => {
                        this.overlayOutsideClick.next(t)
                    })
                }

                _buildConfig() {
                    const t = this._position = this.positionStrategy || this._createPositionStrategy(), e = new rb({
                        direction: this._dir,
                        positionStrategy: t,
                        scrollStrategy: this.scrollStrategy,
                        hasBackdrop: this.hasBackdrop
                    });
                    return (this.width || 0 === this.width) && (e.width = this.width), (this.height || 0 === this.height) && (e.height = this.height), (this.minWidth || 0 === this.minWidth) && (e.minWidth = this.minWidth), (this.minHeight || 0 === this.minHeight) && (e.minHeight = this.minHeight), this.backdropClass && (e.backdropClass = this.backdropClass), this.panelClass && (e.panelClass = this.panelClass), e
                }

                _updatePositionStrategy(t) {
                    const e = this.positions.map(t => ({
                        originX: t.originX,
                        originY: t.originY,
                        overlayX: t.overlayX,
                        overlayY: t.overlayY,
                        offsetX: t.offsetX || this.offsetX,
                        offsetY: t.offsetY || this.offsetY,
                        panelClass: t.panelClass || void 0
                    }));
                    return t.setOrigin(this.origin.elementRef).withPositions(e).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector)
                }

                _createPositionStrategy() {
                    const t = this._overlay.position().flexibleConnectedTo(this.origin.elementRef);
                    return this._updatePositionStrategy(t), t
                }

                _attachOverlay() {
                    this._overlayRef ? this._overlayRef.getConfig().hasBackdrop = this.hasBackdrop : this._createOverlay(), this._overlayRef.hasAttached() || this._overlayRef.attach(this._templatePortal), this.hasBackdrop ? this._backdropSubscription = this._overlayRef.backdropClick().subscribe(t => {
                        this.backdropClick.emit(t)
                    }) : this._backdropSubscription.unsubscribe(), this._positionSubscription.unsubscribe(), this.positionChange.observers.length > 0 && (this._positionSubscription = this._position.positionChanges.pipe(function (t, e = !1) {
                        return n => n.lift(new Zy(t, e))
                    }(() => this.positionChange.observers.length > 0)).subscribe(t => {
                        this.positionChange.emit(t), 0 === this.positionChange.observers.length && this._positionSubscription.unsubscribe()
                    }))
                }

                _detachOverlay() {
                    this._overlayRef && this._overlayRef.detach(), this._backdropSubscription.unsubscribe(), this._positionSubscription.unsubscribe()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Sb), Vr(Oa), Vr(Na), Vr(kb), Vr(am, 8))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "cdk-connected-overlay", ""], ["", "connected-overlay", ""], ["", "cdkConnectedOverlay", ""]],
                inputs: {
                    viewportMargin: ["cdkConnectedOverlayViewportMargin", "viewportMargin"],
                    open: ["cdkConnectedOverlayOpen", "open"],
                    disableClose: ["cdkConnectedOverlayDisableClose", "disableClose"],
                    scrollStrategy: ["cdkConnectedOverlayScrollStrategy", "scrollStrategy"],
                    offsetX: ["cdkConnectedOverlayOffsetX", "offsetX"],
                    offsetY: ["cdkConnectedOverlayOffsetY", "offsetY"],
                    hasBackdrop: ["cdkConnectedOverlayHasBackdrop", "hasBackdrop"],
                    lockPosition: ["cdkConnectedOverlayLockPosition", "lockPosition"],
                    flexibleDimensions: ["cdkConnectedOverlayFlexibleDimensions", "flexibleDimensions"],
                    growAfterOpen: ["cdkConnectedOverlayGrowAfterOpen", "growAfterOpen"],
                    push: ["cdkConnectedOverlayPush", "push"],
                    positions: ["cdkConnectedOverlayPositions", "positions"],
                    origin: ["cdkConnectedOverlayOrigin", "origin"],
                    positionStrategy: ["cdkConnectedOverlayPositionStrategy", "positionStrategy"],
                    width: ["cdkConnectedOverlayWidth", "width"],
                    height: ["cdkConnectedOverlayHeight", "height"],
                    minWidth: ["cdkConnectedOverlayMinWidth", "minWidth"],
                    minHeight: ["cdkConnectedOverlayMinHeight", "minHeight"],
                    backdropClass: ["cdkConnectedOverlayBackdropClass", "backdropClass"],
                    panelClass: ["cdkConnectedOverlayPanelClass", "panelClass"],
                    transformOriginSelector: ["cdkConnectedOverlayTransformOriginOn", "transformOriginSelector"]
                },
                outputs: {
                    backdropClick: "backdropClick",
                    positionChange: "positionChange",
                    attach: "attach",
                    detach: "detach",
                    overlayKeydown: "overlayKeydown",
                    overlayOutsideClick: "overlayOutsideClick"
                },
                exportAs: ["cdkConnectedOverlay"],
                features: [ae]
            }), t
        })();
        const Rb = {
            provide: kb, deps: [Sb], useFactory: function (t) {
                return () => t.scrollStrategies.reposition()
            }
        };
        let Tb = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({providers: [Sb, Rb], imports: [[lm, Ky, Hy], Hy]}), t
        })();
        const Ab = ["underline"], Db = ["connectionContainer"], Ib = ["inputContainer"], Pb = ["label"];

        function Nb(t, e) {
            1 & t && ($r(0), Br(1, "div", 14), Ur(2, "div", 15), Ur(3, "div", 16), Ur(4, "div", 17), Hr(), Br(5, "div", 18), Ur(6, "div", 15), Ur(7, "div", 16), Ur(8, "div", 17), Hr(), qr())
        }

        function Fb(t, e) {
            1 & t && (Br(0, "div", 19), so(1, 1), Hr())
        }

        function Lb(t, e) {
            if (1 & t && ($r(0), so(1, 2), Br(2, "span"), ko(3), Hr(), qr()), 2 & t) {
                const t = to(2);
                ui(3), Eo(t._control.placeholder)
            }
        }

        function Mb(t, e) {
            1 & t && so(0, 3, ["*ngSwitchCase", "true"])
        }

        function Vb(t, e) {
            1 & t && (Br(0, "span", 23), ko(1, " *"), Hr())
        }

        function jb(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "label", 20, 21), Yr("cdkObserveContent", (function () {
                    return De(t), to().updateOutlineGap()
                })), Mr(2, Lb, 4, 1, "ng-container", 12), Mr(3, Mb, 1, 0, "ng-content", 12), Mr(4, Vb, 2, 0, "span", 22), Hr()
            }
            if (2 & t) {
                const t = to();
                fo("mat-empty", t._control.empty && !t._shouldAlwaysFloat())("mat-form-field-empty", t._control.empty && !t._shouldAlwaysFloat())("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color), jr("cdkObserveContentDisabled", "outline" != t.appearance)("id", t._labelId)("ngSwitch", t._hasLabel()), Fr("for", t._control.id)("aria-owns", t._control.id), ui(2), jr("ngSwitchCase", !1), ui(1), jr("ngSwitchCase", !0), ui(1), jr("ngIf", !t.hideRequiredMarker && t._control.required && !t._control.disabled)
            }
        }

        function zb(t, e) {
            1 & t && (Br(0, "div", 24), so(1, 4), Hr())
        }

        function Bb(t, e) {
            if (1 & t && (Br(0, "div", 25, 26), Ur(2, "span", 27), Hr()), 2 & t) {
                const t = to();
                ui(2), fo("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color)
            }
        }

        function Hb(t, e) {
            1 & t && (Br(0, "div"), so(1, 5), Hr()), 2 & t && jr("@transitionMessages", to()._subscriptAnimationState)
        }

        function Ub(t, e) {
            if (1 & t && (Br(0, "div", 31), ko(1), Hr()), 2 & t) {
                const t = to(2);
                jr("id", t._hintLabelId), ui(1), Eo(t.hintLabel)
            }
        }

        function $b(t, e) {
            if (1 & t && (Br(0, "div", 28), Mr(1, Ub, 2, 2, "div", 29), so(2, 6), Ur(3, "div", 30), so(4, 7), Hr()), 2 & t) {
                const t = to();
                jr("@transitionMessages", t._subscriptAnimationState), ui(1), jr("ngIf", t.hintLabel)
            }
        }

        const qb = ["*", [["", "matPrefix", ""]], [["mat-placeholder"]], [["mat-label"]], [["", "matSuffix", ""]], [["mat-error"]], [["mat-hint", 3, "align", "end"]], [["mat-hint", "align", "end"]]],
            Wb = ["*", "[matPrefix]", "mat-placeholder", "mat-label", "[matSuffix]", "mat-error", "mat-hint:not([align='end'])", "mat-hint[align='end']"],
            Gb = new $n("MatError"), Kb = {
                transitionMessages: um("transitionMessages", [mm("enter", fm({
                    opacity: 1,
                    transform: "translateY(0%)"
                })), _m("void => enter", [fm({
                    opacity: 0,
                    transform: "translateY(-5px)"
                }), dm("300ms cubic-bezier(0.55, 0, 0.55, 0.2)")])])
            };
        let Zb = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275dir = Zt({type: t}), t
        })();
        const Qb = new $n("MatHint");
        let Yb = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275dir = Zt({type: t, selectors: [["mat-label"]]}), t
        })(), Xb = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275dir = Zt({type: t, selectors: [["mat-placeholder"]]}), t
        })();
        const Jb = new $n("MatPrefix"), tv = new $n("MatSuffix");
        let ev = 0;

        class nv {
            constructor(t) {
                this._elementRef = t
            }
        }

        const sv = H_(nv, "primary"), iv = new $n("MAT_FORM_FIELD_DEFAULT_OPTIONS"), rv = new $n("MatFormField");
        let ov = (() => {
            class t extends sv {
                constructor(t, e, n, s, i, r, o, a) {
                    super(t), this._elementRef = t, this._changeDetectorRef = e, this._dir = s, this._defaults = i, this._platform = r, this._ngZone = o, this._outlineGapCalculationNeededImmediately = !1, this._outlineGapCalculationNeededOnStable = !1, this._destroyed = new S, this._showAlwaysAnimate = !1, this._subscriptAnimationState = "", this._hintLabel = "", this._hintLabelId = "mat-hint-" + ev++, this._labelId = "mat-form-field-label-" + ev++, this.floatLabel = this._getDefaultFloatLabelState(), this._animationsEnabled = "NoopAnimations" !== a, this.appearance = i && i.appearance ? i.appearance : "legacy", this._hideRequiredMarker = !(!i || null == i.hideRequiredMarker) && i.hideRequiredMarker
                }

                get appearance() {
                    return this._appearance
                }

                set appearance(t) {
                    const e = this._appearance;
                    this._appearance = t || this._defaults && this._defaults.appearance || "legacy", "outline" === this._appearance && e !== t && (this._outlineGapCalculationNeededOnStable = !0)
                }

                get hideRequiredMarker() {
                    return this._hideRequiredMarker
                }

                set hideRequiredMarker(t) {
                    this._hideRequiredMarker = Cf(t)
                }

                _shouldAlwaysFloat() {
                    return "always" === this.floatLabel && !this._showAlwaysAnimate
                }

                _canLabelFloat() {
                    return "never" !== this.floatLabel
                }

                get hintLabel() {
                    return this._hintLabel
                }

                set hintLabel(t) {
                    this._hintLabel = t, this._processHints()
                }

                get floatLabel() {
                    return "legacy" !== this.appearance && "never" === this._floatLabel ? "auto" : this._floatLabel
                }

                set floatLabel(t) {
                    t !== this._floatLabel && (this._floatLabel = t || this._getDefaultFloatLabelState(), this._changeDetectorRef.markForCheck())
                }

                get _control() {
                    return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic
                }

                set _control(t) {
                    this._explicitFormFieldControl = t
                }

                getLabelId() {
                    return this._hasFloatingLabel() ? this._labelId : null
                }

                getConnectedOverlayOrigin() {
                    return this._connectionContainerRef || this._elementRef
                }

                ngAfterContentInit() {
                    this._validateControlChild();
                    const t = this._control;
                    t.controlType && this._elementRef.nativeElement.classList.add("mat-form-field-type-" + t.controlType), t.stateChanges.pipe(tu(null)).subscribe(() => {
                        this._validatePlaceholders(), this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
                    }), t.ngControl && t.ngControl.valueChanges && t.ngControl.valueChanges.pipe(Iy(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck()), this._ngZone.runOutsideAngular(() => {
                        this._ngZone.onStable.pipe(Iy(this._destroyed)).subscribe(() => {
                            this._outlineGapCalculationNeededOnStable && this.updateOutlineGap()
                        })
                    }), q(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
                        this._outlineGapCalculationNeededOnStable = !0, this._changeDetectorRef.markForCheck()
                    }), this._hintChildren.changes.pipe(tu(null)).subscribe(() => {
                        this._processHints(), this._changeDetectorRef.markForCheck()
                    }), this._errorChildren.changes.pipe(tu(null)).subscribe(() => {
                        this._syncDescribedByIds(), this._changeDetectorRef.markForCheck()
                    }), this._dir && this._dir.change.pipe(Iy(this._destroyed)).subscribe(() => {
                        "function" == typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(() => {
                            requestAnimationFrame(() => this.updateOutlineGap())
                        }) : this.updateOutlineGap()
                    })
                }

                ngAfterContentChecked() {
                    this._validateControlChild(), this._outlineGapCalculationNeededImmediately && this.updateOutlineGap()
                }

                ngAfterViewInit() {
                    this._subscriptAnimationState = "enter", this._changeDetectorRef.detectChanges()
                }

                ngOnDestroy() {
                    this._destroyed.next(), this._destroyed.complete()
                }

                _shouldForward(t) {
                    const e = this._control ? this._control.ngControl : null;
                    return e && e[t]
                }

                _hasPlaceholder() {
                    return !!(this._control && this._control.placeholder || this._placeholderChild)
                }

                _hasLabel() {
                    return !(!this._labelChildNonStatic && !this._labelChildStatic)
                }

                _shouldLabelFloat() {
                    return this._canLabelFloat() && (this._control && this._control.shouldLabelFloat || this._shouldAlwaysFloat())
                }

                _hideControlPlaceholder() {
                    return "legacy" === this.appearance && !this._hasLabel() || this._hasLabel() && !this._shouldLabelFloat()
                }

                _hasFloatingLabel() {
                    return this._hasLabel() || "legacy" === this.appearance && this._hasPlaceholder()
                }

                _getDisplayedMessages() {
                    return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint"
                }

                _animateAndLockLabel() {
                    this._hasFloatingLabel() && this._canLabelFloat() && (this._animationsEnabled && this._label && (this._showAlwaysAnimate = !0, xy(this._label.nativeElement, "transitionend").pipe(Yh(1)).subscribe(() => {
                        this._showAlwaysAnimate = !1
                    })), this.floatLabel = "always", this._changeDetectorRef.markForCheck())
                }

                _validatePlaceholders() {
                }

                _processHints() {
                    this._validateHints(), this._syncDescribedByIds()
                }

                _validateHints() {
                }

                _getDefaultFloatLabelState() {
                    return this._defaults && this._defaults.floatLabel || "auto"
                }

                _syncDescribedByIds() {
                    if (this._control) {
                        let t = [];
                        if (this._control.userAriaDescribedBy && "string" == typeof this._control.userAriaDescribedBy && t.push(...this._control.userAriaDescribedBy.split(" ")), "hint" === this._getDisplayedMessages()) {
                            const e = this._hintChildren ? this._hintChildren.find(t => "start" === t.align) : null,
                                n = this._hintChildren ? this._hintChildren.find(t => "end" === t.align) : null;
                            e ? t.push(e.id) : this._hintLabel && t.push(this._hintLabelId), n && t.push(n.id)
                        } else this._errorChildren && t.push(...this._errorChildren.map(t => t.id));
                        this._control.setDescribedByIds(t)
                    }
                }

                _validateControlChild() {
                }

                updateOutlineGap() {
                    const t = this._label ? this._label.nativeElement : null;
                    if ("outline" !== this.appearance || !t || !t.children.length || !t.textContent.trim()) return;
                    if (!this._platform.isBrowser) return;
                    if (!this._isAttachedToDOM()) return void (this._outlineGapCalculationNeededImmediately = !0);
                    let e = 0, n = 0;
                    const s = this._connectionContainerRef.nativeElement,
                        i = s.querySelectorAll(".mat-form-field-outline-start"),
                        r = s.querySelectorAll(".mat-form-field-outline-gap");
                    if (this._label && this._label.nativeElement.children.length) {
                        const i = s.getBoundingClientRect();
                        if (0 === i.width && 0 === i.height) return this._outlineGapCalculationNeededOnStable = !0, void (this._outlineGapCalculationNeededImmediately = !1);
                        const r = this._getStartEnd(i), o = t.children,
                            a = this._getStartEnd(o[0].getBoundingClientRect());
                        let l = 0;
                        for (let t = 0; t < o.length; t++) l += o[t].offsetWidth;
                        e = Math.abs(a - r) - 5, n = l > 0 ? .75 * l + 10 : 0
                    }
                    for (let o = 0; o < i.length; o++) i[o].style.width = e + "px";
                    for (let o = 0; o < r.length; o++) r[o].style.width = n + "px";
                    this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = !1
                }

                _getStartEnd(t) {
                    return this._dir && "rtl" === this._dir.value ? t.right : t.left
                }

                _isAttachedToDOM() {
                    const t = this._elementRef.nativeElement;
                    if (t.getRootNode) {
                        const e = t.getRootNode();
                        return e && e !== t
                    }
                    return document.documentElement.contains(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Qo), Vr(wa), Vr(Qo), Vr(am, 8), Vr(iv, 8), Vr(If), Vr(zl), Vr(D_, 8))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-form-field"]],
                contentQueries: function (t, e, n) {
                    if (1 & t && (fl(n, Zb, 1), fl(n, Zb, 3), fl(n, Yb, 1), fl(n, Yb, 3), fl(n, Xb, 1), fl(n, Gb, 1), fl(n, Qb, 1), fl(n, Jb, 1), fl(n, tv, 1)), 2 & t) {
                        let t;
                        dl(t = ml()) && (e._controlNonStatic = t.first), dl(t = ml()) && (e._controlStatic = t.first), dl(t = ml()) && (e._labelChildNonStatic = t.first), dl(t = ml()) && (e._labelChildStatic = t.first), dl(t = ml()) && (e._placeholderChild = t.first), dl(t = ml()) && (e._errorChildren = t), dl(t = ml()) && (e._hintChildren = t), dl(t = ml()) && (e._prefixChildren = t), dl(t = ml()) && (e._suffixChildren = t)
                    }
                },
                viewQuery: function (t, e) {
                    if (1 & t && (pl(Ab, 1), pl(Db, 3), pl(Ib, 1), pl(Pb, 1)), 2 & t) {
                        let t;
                        dl(t = ml()) && (e.underlineRef = t.first), dl(t = ml()) && (e._connectionContainerRef = t.first), dl(t = ml()) && (e._inputContainerRef = t.first), dl(t = ml()) && (e._label = t.first)
                    }
                },
                hostAttrs: [1, "mat-form-field"],
                hostVars: 44,
                hostBindings: function (t, e) {
                    2 & t && fo("mat-form-field-appearance-standard", "standard" == e.appearance)("mat-form-field-appearance-fill", "fill" == e.appearance)("mat-form-field-appearance-outline", "outline" == e.appearance)("mat-form-field-appearance-legacy", "legacy" == e.appearance)("mat-form-field-invalid", e._control.errorState)("mat-form-field-can-float", e._canLabelFloat())("mat-form-field-should-float", e._shouldLabelFloat())("mat-form-field-has-label", e._hasFloatingLabel())("mat-form-field-hide-placeholder", e._hideControlPlaceholder())("mat-form-field-disabled", e._control.disabled)("mat-form-field-autofilled", e._control.autofilled)("mat-focused", e._control.focused)("mat-accent", "accent" == e.color)("mat-warn", "warn" == e.color)("ng-untouched", e._shouldForward("untouched"))("ng-touched", e._shouldForward("touched"))("ng-pristine", e._shouldForward("pristine"))("ng-dirty", e._shouldForward("dirty"))("ng-valid", e._shouldForward("valid"))("ng-invalid", e._shouldForward("invalid"))("ng-pending", e._shouldForward("pending"))("_mat-animation-noopable", !e._animationsEnabled)
                },
                inputs: {
                    color: "color",
                    floatLabel: "floatLabel",
                    appearance: "appearance",
                    hideRequiredMarker: "hideRequiredMarker",
                    hintLabel: "hintLabel"
                },
                exportAs: ["matFormField"],
                features: [Uo([{provide: rv, useExisting: t}]), Sr],
                ngContentSelectors: Wb,
                decls: 15,
                vars: 8,
                consts: [[1, "mat-form-field-wrapper"], [1, "mat-form-field-flex", 3, "click"], ["connectionContainer", ""], [4, "ngIf"], ["class", "mat-form-field-prefix", 4, "ngIf"], [1, "mat-form-field-infix"], ["inputContainer", ""], [1, "mat-form-field-label-wrapper"], ["class", "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "mat-empty", "mat-form-field-empty", "mat-accent", "mat-warn", "ngSwitch", "cdkObserveContent", 4, "ngIf"], ["class", "mat-form-field-suffix", 4, "ngIf"], ["class", "mat-form-field-underline", 4, "ngIf"], [1, "mat-form-field-subscript-wrapper", 3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "mat-form-field-hint-wrapper", 4, "ngSwitchCase"], [1, "mat-form-field-outline"], [1, "mat-form-field-outline-start"], [1, "mat-form-field-outline-gap"], [1, "mat-form-field-outline-end"], [1, "mat-form-field-outline", "mat-form-field-outline-thick"], [1, "mat-form-field-prefix"], [1, "mat-form-field-label", 3, "cdkObserveContentDisabled", "id", "ngSwitch", "cdkObserveContent"], ["label", ""], ["class", "mat-placeholder-required mat-form-field-required-marker", "aria-hidden", "true", 4, "ngIf"], ["aria-hidden", "true", 1, "mat-placeholder-required", "mat-form-field-required-marker"], [1, "mat-form-field-suffix"], [1, "mat-form-field-underline"], ["underline", ""], [1, "mat-form-field-ripple"], [1, "mat-form-field-hint-wrapper"], ["class", "mat-hint", 3, "id", 4, "ngIf"], [1, "mat-form-field-hint-spacer"], [1, "mat-hint", 3, "id"]],
                template: function (t, e) {
                    1 & t && (no(qb), Br(0, "div", 0), Br(1, "div", 1, 2), Yr("click", (function (t) {
                        return e._control.onContainerClick && e._control.onContainerClick(t)
                    })), Mr(3, Nb, 9, 0, "ng-container", 3), Mr(4, Fb, 2, 0, "div", 4), Br(5, "div", 5, 6), so(7), Br(8, "span", 7), Mr(9, jb, 5, 16, "label", 8), Hr(), Hr(), Mr(10, zb, 2, 0, "div", 9), Hr(), Mr(11, Bb, 3, 4, "div", 10), Br(12, "div", 11), Mr(13, Hb, 2, 1, "div", 12), Mr(14, $b, 5, 2, "div", 13), Hr(), Hr()), 2 & t && (ui(3), jr("ngIf", "outline" == e.appearance), ui(1), jr("ngIf", e._prefixChildren.length), ui(5), jr("ngIf", e._hasFloatingLabel()), ui(1), jr("ngIf", e._suffixChildren.length), ui(1), jr("ngIf", "outline" != e.appearance), ui(1), jr("ngSwitch", e._getDisplayedMessages()), ui(1), jr("ngSwitchCase", "error"), ui(1), jr("ngSwitchCase", "hint"))
                },
                directives: [qc, Zc, Qc, jf],
                styles: [".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:none;transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field-hint-end{order:1}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}\n", '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}\n', '.mat-input-element{font:inherit;background:transparent;color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit;box-sizing:content-box}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::-ms-clear,.mat-input-element::-ms-reveal{display:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-moz-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:transparent;display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-ms-expand{display:none}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}select.mat-input-element::-ms-value{color:inherit;background:none}.mat-focused .cdk-high-contrast-active select.mat-input-element::-ms-value{color:inherit}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}\n', ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px);-ms-transform:none}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}\n", ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}\n", ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}\n"],
                encapsulation: 2,
                data: {animation: [Kb.transitionMessages]},
                changeDetection: 0
            }), t
        })(), av = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[sh, z_, zf], z_]}), t
        })();

        function lv(t, e) {
            return new y(n => {
                const s = t.length;
                if (0 === s) return void n.complete();
                const i = new Array(s);
                let r = 0, o = 0;
                for (let a = 0; a < s; a++) {
                    const l = j(t[a]);
                    let c = !1;
                    n.add(l.subscribe({
                        next: t => {
                            c || (c = !0, o++), i[a] = t
                        }, error: t => n.error(t), complete: () => {
                            r++, r !== s && c || (o === s && n.next(e ? e.reduce((t, e, n) => (t[e] = i[n], t), {}) : i), n.complete())
                        }
                    }))
                }
            })
        }

        const cv = new $n("NgValidators"), hv = new $n("NgAsyncValidators");

        function uv(t) {
            return null != t
        }

        function dv(t) {
            const e = Kr(t) ? j(t) : t;
            return Qr(e), e
        }

        function pv(t) {
            let e = {};
            return t.forEach(t => {
                e = null != t ? Object.assign(Object.assign({}, e), t) : e
            }), 0 === Object.keys(e).length ? null : e
        }

        function fv(t, e) {
            return e.map(e => e(t))
        }

        function mv(t) {
            return t.map(t => function (t) {
                return !t.validate
            }(t) ? t : e => t.validate(e))
        }

        function gv(t) {
            return null != t ? function (t) {
                if (!t) return null;
                const e = t.filter(uv);
                return 0 == e.length ? null : function (t) {
                    return pv(fv(t, e))
                }
            }(mv(t)) : null
        }

        function _v(t) {
            return null != t ? function (t) {
                if (!t) return null;
                const e = t.filter(uv);
                return 0 == e.length ? null : function (t) {
                    return function (...t) {
                        if (1 === t.length) {
                            const e = t[0];
                            if (l(e)) return lv(e, null);
                            if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
                                const t = Object.keys(e);
                                return lv(t.map(t => e[t]), t)
                            }
                        }
                        if ("function" == typeof t[t.length - 1]) {
                            const e = t.pop();
                            return lv(t = 1 === t.length && l(t[0]) ? t[0] : t, null).pipe(F(t => e(...t)))
                        }
                        return lv(t, null)
                    }(fv(t, e).map(dv)).pipe(F(pv))
                }
            }(mv(t)) : null
        }

        function yv(t, e) {
            return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e]
        }

        function bv(t) {
            return t._rawValidators
        }

        function vv(t) {
            return t._rawAsyncValidators
        }

        let wv = (() => {
            class t {
                constructor() {
                    this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
                }

                get value() {
                    return this.control ? this.control.value : null
                }

                get valid() {
                    return this.control ? this.control.valid : null
                }

                get invalid() {
                    return this.control ? this.control.invalid : null
                }

                get pending() {
                    return this.control ? this.control.pending : null
                }

                get disabled() {
                    return this.control ? this.control.disabled : null
                }

                get enabled() {
                    return this.control ? this.control.enabled : null
                }

                get errors() {
                    return this.control ? this.control.errors : null
                }

                get pristine() {
                    return this.control ? this.control.pristine : null
                }

                get dirty() {
                    return this.control ? this.control.dirty : null
                }

                get touched() {
                    return this.control ? this.control.touched : null
                }

                get status() {
                    return this.control ? this.control.status : null
                }

                get untouched() {
                    return this.control ? this.control.untouched : null
                }

                get statusChanges() {
                    return this.control ? this.control.statusChanges : null
                }

                get valueChanges() {
                    return this.control ? this.control.valueChanges : null
                }

                get path() {
                    return null
                }

                _setValidators(t) {
                    this._rawValidators = t || [], this._composedValidatorFn = gv(this._rawValidators)
                }

                _setAsyncValidators(t) {
                    this._rawAsyncValidators = t || [], this._composedAsyncValidatorFn = _v(this._rawAsyncValidators)
                }

                get validator() {
                    return this._composedValidatorFn || null
                }

                get asyncValidator() {
                    return this._composedAsyncValidatorFn || null
                }

                _registerOnDestroy(t) {
                    this._onDestroyCallbacks.push(t)
                }

                _invokeOnDestroyCallbacks() {
                    this._onDestroyCallbacks.forEach(t => t()), this._onDestroyCallbacks = []
                }

                reset(t) {
                    this.control && this.control.reset(t)
                }

                hasError(t, e) {
                    return !!this.control && this.control.hasError(t, e)
                }

                getError(t, e) {
                    return this.control ? this.control.getError(t, e) : null
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275dir = Zt({type: t}), t
        })(), Cv = (() => {
            class t extends wv {
                get formDirective() {
                    return null
                }

                get path() {
                    return null
                }
            }

            return t.\u0275fac = function (e) {
                return Sv(e || t)
            }, t.\u0275dir = Zt({type: t, features: [Sr]}), t
        })();
        const Sv = zn(Cv);

        class xv extends wv {
            constructor() {
                super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
            }
        }

        function kv(t, e) {
            Rv(t, e, !0), e.valueAccessor.writeValue(t.value), function (t, e) {
                e.valueAccessor.registerOnChange(n => {
                    t._pendingValue = n, t._pendingChange = !0, t._pendingDirty = !0, "change" === t.updateOn && Av(t, e)
                })
            }(t, e), function (t, e) {
                const n = (t, n) => {
                    e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t)
                };
                t.registerOnChange(n), e._registerOnDestroy(() => {
                    t._unregisterOnChange(n)
                })
            }(t, e), function (t, e) {
                e.valueAccessor.registerOnTouched(() => {
                    t._pendingTouched = !0, "blur" === t.updateOn && t._pendingChange && Av(t, e), "submit" !== t.updateOn && t.markAsTouched()
                })
            }(t, e), function (t, e) {
                if (e.valueAccessor.setDisabledState) {
                    const n = t => {
                        e.valueAccessor.setDisabledState(t)
                    };
                    t.registerOnDisabledChange(n), e._registerOnDestroy(() => {
                        t._unregisterOnDisabledChange(n)
                    })
                }
            }(t, e)
        }

        function Ev(t, e, n = !0) {
            const s = () => {
            };
            e.valueAccessor && (e.valueAccessor.registerOnChange(s), e.valueAccessor.registerOnTouched(s)), Tv(t, e, !0), t && (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {
            }))
        }

        function Ov(t, e) {
            t.forEach(t => {
                t.registerOnValidatorChange && t.registerOnValidatorChange(e)
            })
        }

        function Rv(t, e, n) {
            const s = bv(t);
            null !== e.validator ? t.setValidators(yv(s, e.validator)) : "function" == typeof s && t.setValidators([s]);
            const i = vv(t);
            if (null !== e.asyncValidator ? t.setAsyncValidators(yv(i, e.asyncValidator)) : "function" == typeof i && t.setAsyncValidators([i]), n) {
                const n = () => t.updateValueAndValidity();
                Ov(e._rawValidators, n), Ov(e._rawAsyncValidators, n)
            }
        }

        function Tv(t, e, n) {
            let s = !1;
            if (null !== t) {
                if (null !== e.validator) {
                    const n = bv(t);
                    if (Array.isArray(n) && n.length > 0) {
                        const i = n.filter(t => t !== e.validator);
                        i.length !== n.length && (s = !0, t.setValidators(i))
                    }
                }
                if (null !== e.asyncValidator) {
                    const n = vv(t);
                    if (Array.isArray(n) && n.length > 0) {
                        const i = n.filter(t => t !== e.asyncValidator);
                        i.length !== n.length && (s = !0, t.setAsyncValidators(i))
                    }
                }
            }
            if (n) {
                const t = () => {
                };
                Ov(e._rawValidators, t), Ov(e._rawAsyncValidators, t)
            }
            return s
        }

        function Av(t, e) {
            t._pendingDirty && t.markAsDirty(), t.setValue(t._pendingValue, {emitModelToViewChange: !1}), e.viewToModelUpdate(t._pendingValue), t._pendingChange = !1
        }

        function Dv(t, e) {
            Rv(t, e, !1)
        }

        function Iv(t, e) {
            t._syncPendingControls(), e.forEach(t => {
                const e = t.control;
                "submit" === e.updateOn && e._pendingChange && (t.viewToModelUpdate(e._pendingValue), e._pendingChange = !1)
            })
        }

        function Pv(t, e) {
            const n = t.indexOf(e);
            n > -1 && t.splice(n, 1)
        }

        function Nv(t) {
            return (Vv(t) ? t.validators : t) || null
        }

        function Fv(t) {
            return Array.isArray(t) ? gv(t) : t || null
        }

        function Lv(t, e) {
            return (Vv(e) ? e.asyncValidators : t) || null
        }

        function Mv(t) {
            return Array.isArray(t) ? _v(t) : t || null
        }

        function Vv(t) {
            return null != t && !Array.isArray(t) && "object" == typeof t
        }

        class jv {
            constructor(t, e) {
                this._hasOwnPendingAsyncValidator = !1, this._onCollectionChange = () => {
                }, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._rawValidators = t, this._rawAsyncValidators = e, this._composedValidatorFn = Fv(this._rawValidators), this._composedAsyncValidatorFn = Mv(this._rawAsyncValidators)
            }

            get validator() {
                return this._composedValidatorFn
            }

            set validator(t) {
                this._rawValidators = this._composedValidatorFn = t
            }

            get asyncValidator() {
                return this._composedAsyncValidatorFn
            }

            set asyncValidator(t) {
                this._rawAsyncValidators = this._composedAsyncValidatorFn = t
            }

            get parent() {
                return this._parent
            }

            get valid() {
                return "VALID" === this.status
            }

            get invalid() {
                return "INVALID" === this.status
            }

            get pending() {
                return "PENDING" == this.status
            }

            get disabled() {
                return "DISABLED" === this.status
            }

            get enabled() {
                return "DISABLED" !== this.status
            }

            get dirty() {
                return !this.pristine
            }

            get untouched() {
                return !this.touched
            }

            get updateOn() {
                return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
            }

            setValidators(t) {
                this._rawValidators = t, this._composedValidatorFn = Fv(t)
            }

            setAsyncValidators(t) {
                this._rawAsyncValidators = t, this._composedAsyncValidatorFn = Mv(t)
            }

            clearValidators() {
                this.validator = null
            }

            clearAsyncValidators() {
                this.asyncValidator = null
            }

            markAsTouched(t = {}) {
                this.touched = !0, this._parent && !t.onlySelf && this._parent.markAsTouched(t)
            }

            markAllAsTouched() {
                this.markAsTouched({onlySelf: !0}), this._forEachChild(t => t.markAllAsTouched())
            }

            markAsUntouched(t = {}) {
                this.touched = !1, this._pendingTouched = !1, this._forEachChild(t => {
                    t.markAsUntouched({onlySelf: !0})
                }), this._parent && !t.onlySelf && this._parent._updateTouched(t)
            }

            markAsDirty(t = {}) {
                this.pristine = !1, this._parent && !t.onlySelf && this._parent.markAsDirty(t)
            }

            markAsPristine(t = {}) {
                this.pristine = !0, this._pendingDirty = !1, this._forEachChild(t => {
                    t.markAsPristine({onlySelf: !0})
                }), this._parent && !t.onlySelf && this._parent._updatePristine(t)
            }

            markAsPending(t = {}) {
                this.status = "PENDING", !1 !== t.emitEvent && this.statusChanges.emit(this.status), this._parent && !t.onlySelf && this._parent.markAsPending(t)
            }

            disable(t = {}) {
                const e = this._parentMarkedDirty(t.onlySelf);
                this.status = "DISABLED", this.errors = null, this._forEachChild(e => {
                    e.disable(Object.assign(Object.assign({}, t), {onlySelf: !0}))
                }), this._updateValue(), !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors(Object.assign(Object.assign({}, t), {skipPristineCheck: e})), this._onDisabledChange.forEach(t => t(!0))
            }

            enable(t = {}) {
                const e = this._parentMarkedDirty(t.onlySelf);
                this.status = "VALID", this._forEachChild(e => {
                    e.enable(Object.assign(Object.assign({}, t), {onlySelf: !0}))
                }), this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: t.emitEvent
                }), this._updateAncestors(Object.assign(Object.assign({}, t), {skipPristineCheck: e})), this._onDisabledChange.forEach(t => t(!1))
            }

            _updateAncestors(t) {
                this._parent && !t.onlySelf && (this._parent.updateValueAndValidity(t), t.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
            }

            setParent(t) {
                this._parent = t
            }

            updateValueAndValidity(t = {}) {
                this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), "VALID" !== this.status && "PENDING" !== this.status || this._runAsyncValidator(t.emitEvent)), !1 !== t.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t)
            }

            _updateTreeValidity(t = {emitEvent: !0}) {
                this._forEachChild(e => e._updateTreeValidity(t)), this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: t.emitEvent
                })
            }

            _setInitialStatus() {
                this.status = this._allControlsDisabled() ? "DISABLED" : "VALID"
            }

            _runValidator() {
                return this.validator ? this.validator(this) : null
            }

            _runAsyncValidator(t) {
                if (this.asyncValidator) {
                    this.status = "PENDING", this._hasOwnPendingAsyncValidator = !0;
                    const e = dv(this.asyncValidator(this));
                    this._asyncValidationSubscription = e.subscribe(e => {
                        this._hasOwnPendingAsyncValidator = !1, this.setErrors(e, {emitEvent: t})
                    })
                }
            }

            _cancelExistingSubscription() {
                this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
            }

            setErrors(t, e = {}) {
                this.errors = t, this._updateControlsErrors(!1 !== e.emitEvent)
            }

            get(t) {
                return function (t, e, n) {
                    if (null == e) return null;
                    if (Array.isArray(e) || (e = e.split(".")), Array.isArray(e) && 0 === e.length) return null;
                    let s = t;
                    return e.forEach(t => {
                        s = s instanceof Bv ? s.controls.hasOwnProperty(t) ? s.controls[t] : null : s instanceof Hv && s.at(t) || null
                    }), s
                }(this, t)
            }

            getError(t, e) {
                const n = e ? this.get(e) : this;
                return n && n.errors ? n.errors[t] : null
            }

            hasError(t, e) {
                return !!this.getError(t, e)
            }

            get root() {
                let t = this;
                for (; t._parent;) t = t._parent;
                return t
            }

            _updateControlsErrors(t) {
                this.status = this._calculateStatus(), t && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(t)
            }

            _initObservables() {
                this.valueChanges = new el, this.statusChanges = new el
            }

            _calculateStatus() {
                return this._allControlsDisabled() ? "DISABLED" : this.errors ? "INVALID" : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus("PENDING") ? "PENDING" : this._anyControlsHaveStatus("INVALID") ? "INVALID" : "VALID"
            }

            _anyControlsHaveStatus(t) {
                return this._anyControls(e => e.status === t)
            }

            _anyControlsDirty() {
                return this._anyControls(t => t.dirty)
            }

            _anyControlsTouched() {
                return this._anyControls(t => t.touched)
            }

            _updatePristine(t = {}) {
                this.pristine = !this._anyControlsDirty(), this._parent && !t.onlySelf && this._parent._updatePristine(t)
            }

            _updateTouched(t = {}) {
                this.touched = this._anyControlsTouched(), this._parent && !t.onlySelf && this._parent._updateTouched(t)
            }

            _isBoxedValue(t) {
                return "object" == typeof t && null !== t && 2 === Object.keys(t).length && "value" in t && "disabled" in t
            }

            _registerOnCollectionChange(t) {
                this._onCollectionChange = t
            }

            _setUpdateStrategy(t) {
                Vv(t) && null != t.updateOn && (this._updateOn = t.updateOn)
            }

            _parentMarkedDirty(t) {
                return !t && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
            }
        }

        class zv extends jv {
            constructor(t = null, e, n) {
                super(Nv(e), Lv(n, e)), this._onChange = [], this._applyFormState(t), this._setUpdateStrategy(e), this._initObservables(), this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!n
                })
            }

            setValue(t, e = {}) {
                this.value = this._pendingValue = t, this._onChange.length && !1 !== e.emitModelToViewChange && this._onChange.forEach(t => t(this.value, !1 !== e.emitViewToModelChange)), this.updateValueAndValidity(e)
            }

            patchValue(t, e = {}) {
                this.setValue(t, e)
            }

            reset(t = null, e = {}) {
                this._applyFormState(t), this.markAsPristine(e), this.markAsUntouched(e), this.setValue(this.value, e), this._pendingChange = !1
            }

            _updateValue() {
            }

            _anyControls(t) {
                return !1
            }

            _allControlsDisabled() {
                return this.disabled
            }

            registerOnChange(t) {
                this._onChange.push(t)
            }

            _unregisterOnChange(t) {
                Pv(this._onChange, t)
            }

            registerOnDisabledChange(t) {
                this._onDisabledChange.push(t)
            }

            _unregisterOnDisabledChange(t) {
                Pv(this._onDisabledChange, t)
            }

            _forEachChild(t) {
            }

            _syncPendingControls() {
                return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                    onlySelf: !0,
                    emitModelToViewChange: !1
                }), 0))
            }

            _applyFormState(t) {
                this._isBoxedValue(t) ? (this.value = this._pendingValue = t.value, t.disabled ? this.disable({
                    onlySelf: !0,
                    emitEvent: !1
                }) : this.enable({onlySelf: !0, emitEvent: !1})) : this.value = this._pendingValue = t
            }
        }

        class Bv extends jv {
            constructor(t, e, n) {
                super(Nv(e), Lv(n, e)), this.controls = t, this._initObservables(), this._setUpdateStrategy(e), this._setUpControls(), this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!n
                })
            }

            registerControl(t, e) {
                return this.controls[t] ? this.controls[t] : (this.controls[t] = e, e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange), e)
            }

            addControl(t, e) {
                this.registerControl(t, e), this.updateValueAndValidity(), this._onCollectionChange()
            }

            removeControl(t) {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {
                }), delete this.controls[t], this.updateValueAndValidity(), this._onCollectionChange()
            }

            setControl(t, e) {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {
                }), delete this.controls[t], e && this.registerControl(t, e), this.updateValueAndValidity(), this._onCollectionChange()
            }

            contains(t) {
                return this.controls.hasOwnProperty(t) && this.controls[t].enabled
            }

            setValue(t, e = {}) {
                this._checkAllValuesPresent(t), Object.keys(t).forEach(n => {
                    this._throwIfControlMissing(n), this.controls[n].setValue(t[n], {
                        onlySelf: !0,
                        emitEvent: e.emitEvent
                    })
                }), this.updateValueAndValidity(e)
            }

            patchValue(t, e = {}) {
                null != t && (Object.keys(t).forEach(n => {
                    this.controls[n] && this.controls[n].patchValue(t[n], {onlySelf: !0, emitEvent: e.emitEvent})
                }), this.updateValueAndValidity(e))
            }

            reset(t = {}, e = {}) {
                this._forEachChild((n, s) => {
                    n.reset(t[s], {onlySelf: !0, emitEvent: e.emitEvent})
                }), this._updatePristine(e), this._updateTouched(e), this.updateValueAndValidity(e)
            }

            getRawValue() {
                return this._reduceChildren({}, (t, e, n) => (t[n] = e instanceof zv ? e.value : e.getRawValue(), t))
            }

            _syncPendingControls() {
                let t = this._reduceChildren(!1, (t, e) => !!e._syncPendingControls() || t);
                return t && this.updateValueAndValidity({onlySelf: !0}), t
            }

            _throwIfControlMissing(t) {
                if (!Object.keys(this.controls).length) throw new Error("\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                if (!this.controls[t]) throw new Error(`Cannot find form control with name: ${t}.`)
            }

            _forEachChild(t) {
                Object.keys(this.controls).forEach(e => {
                    const n = this.controls[e];
                    n && t(n, e)
                })
            }

            _setUpControls() {
                this._forEachChild(t => {
                    t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
                })
            }

            _updateValue() {
                this.value = this._reduceValue()
            }

            _anyControls(t) {
                for (const e of Object.keys(this.controls)) {
                    const n = this.controls[e];
                    if (this.contains(e) && t(n)) return !0
                }
                return !1
            }

            _reduceValue() {
                return this._reduceChildren({}, (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t))
            }

            _reduceChildren(t, e) {
                let n = t;
                return this._forEachChild((t, s) => {
                    n = e(n, t, s)
                }), n
            }

            _allControlsDisabled() {
                for (const t of Object.keys(this.controls)) if (this.controls[t].enabled) return !1;
                return Object.keys(this.controls).length > 0 || this.disabled
            }

            _checkAllValuesPresent(t) {
                this._forEachChild((e, n) => {
                    if (void 0 === t[n]) throw new Error(`Must supply a value for form control with name: '${n}'.`)
                })
            }
        }

        class Hv extends jv {
            constructor(t, e, n) {
                super(Nv(e), Lv(n, e)), this.controls = t, this._initObservables(), this._setUpdateStrategy(e), this._setUpControls(), this.updateValueAndValidity({
                    onlySelf: !0,
                    emitEvent: !!n
                })
            }

            at(t) {
                return this.controls[t]
            }

            push(t) {
                this.controls.push(t), this._registerControl(t), this.updateValueAndValidity(), this._onCollectionChange()
            }

            insert(t, e) {
                this.controls.splice(t, 0, e), this._registerControl(e), this.updateValueAndValidity()
            }

            removeAt(t) {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {
                }), this.controls.splice(t, 1), this.updateValueAndValidity()
            }

            setControl(t, e) {
                this.controls[t] && this.controls[t]._registerOnCollectionChange(() => {
                }), this.controls.splice(t, 1), e && (this.controls.splice(t, 0, e), this._registerControl(e)), this.updateValueAndValidity(), this._onCollectionChange()
            }

            get length() {
                return this.controls.length
            }

            setValue(t, e = {}) {
                this._checkAllValuesPresent(t), t.forEach((t, n) => {
                    this._throwIfControlMissing(n), this.at(n).setValue(t, {onlySelf: !0, emitEvent: e.emitEvent})
                }), this.updateValueAndValidity(e)
            }

            patchValue(t, e = {}) {
                null != t && (t.forEach((t, n) => {
                    this.at(n) && this.at(n).patchValue(t, {onlySelf: !0, emitEvent: e.emitEvent})
                }), this.updateValueAndValidity(e))
            }

            reset(t = [], e = {}) {
                this._forEachChild((n, s) => {
                    n.reset(t[s], {onlySelf: !0, emitEvent: e.emitEvent})
                }), this._updatePristine(e), this._updateTouched(e), this.updateValueAndValidity(e)
            }

            getRawValue() {
                return this.controls.map(t => t instanceof zv ? t.value : t.getRawValue())
            }

            clear() {
                this.controls.length < 1 || (this._forEachChild(t => t._registerOnCollectionChange(() => {
                })), this.controls.splice(0), this.updateValueAndValidity())
            }

            _syncPendingControls() {
                let t = this.controls.reduce((t, e) => !!e._syncPendingControls() || t, !1);
                return t && this.updateValueAndValidity({onlySelf: !0}), t
            }

            _throwIfControlMissing(t) {
                if (!this.controls.length) throw new Error("\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");
                if (!this.at(t)) throw new Error("Cannot find form control at index " + t)
            }

            _forEachChild(t) {
                this.controls.forEach((e, n) => {
                    t(e, n)
                })
            }

            _updateValue() {
                this.value = this.controls.filter(t => t.enabled || this.disabled).map(t => t.value)
            }

            _anyControls(t) {
                return this.controls.some(e => e.enabled && t(e))
            }

            _setUpControls() {
                this._forEachChild(t => this._registerControl(t))
            }

            _checkAllValuesPresent(t) {
                this._forEachChild((e, n) => {
                    if (void 0 === t[n]) throw new Error(`Must supply a value for form control at index: ${n}.`)
                })
            }

            _allControlsDisabled() {
                for (const t of this.controls) if (t.enabled) return !1;
                return this.controls.length > 0 || this.disabled
            }

            _registerControl(t) {
                t.setParent(this), t._registerOnCollectionChange(this._onCollectionChange)
            }
        }

        const Uv = {provide: Cv, useExisting: it(() => qv)}, $v = (() => Promise.resolve(null))();
        let qv = (() => {
            class t extends Cv {
                constructor(t, e) {
                    super(), this.submitted = !1, this._directives = [], this.ngSubmit = new el, this.form = new Bv({}, gv(t), _v(e))
                }

                ngAfterViewInit() {
                    this._setUpdateStrategy()
                }

                get formDirective() {
                    return this
                }

                get control() {
                    return this.form
                }

                get path() {
                    return []
                }

                get controls() {
                    return this.form.controls
                }

                addControl(t) {
                    $v.then(() => {
                        const e = this._findContainer(t.path);
                        t.control = e.registerControl(t.name, t.control), kv(t.control, t), t.control.updateValueAndValidity({emitEvent: !1}), this._directives.push(t)
                    })
                }

                getControl(t) {
                    return this.form.get(t.path)
                }

                removeControl(t) {
                    $v.then(() => {
                        const e = this._findContainer(t.path);
                        e && e.removeControl(t.name), Pv(this._directives, t)
                    })
                }

                addFormGroup(t) {
                    $v.then(() => {
                        const e = this._findContainer(t.path), n = new Bv({});
                        Dv(n, t), e.registerControl(t.name, n), n.updateValueAndValidity({emitEvent: !1})
                    })
                }

                removeFormGroup(t) {
                    $v.then(() => {
                        const e = this._findContainer(t.path);
                        e && e.removeControl(t.name)
                    })
                }

                getFormGroup(t) {
                    return this.form.get(t.path)
                }

                updateModel(t, e) {
                    $v.then(() => {
                        this.form.get(t.path).setValue(e)
                    })
                }

                setValue(t) {
                    this.control.setValue(t)
                }

                onSubmit(t) {
                    return this.submitted = !0, Iv(this.form, this._directives), this.ngSubmit.emit(t), !1
                }

                onReset() {
                    this.resetForm()
                }

                resetForm(t) {
                    this.form.reset(t), this.submitted = !1
                }

                _setUpdateStrategy() {
                    this.options && null != this.options.updateOn && (this.form._updateOn = this.options.updateOn)
                }

                _findContainer(t) {
                    return t.pop(), t.length ? this.form.get(t) : this.form
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(cv, 10), Vr(hv, 10))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", ""], ["ng-form"], ["", "ngForm", ""]],
                hostBindings: function (t, e) {
                    1 & t && Yr("submit", (function (t) {
                        return e.onSubmit(t)
                    }))("reset", (function () {
                        return e.onReset()
                    }))
                },
                inputs: {options: ["ngFormOptions", "options"]},
                outputs: {ngSubmit: "ngSubmit"},
                exportAs: ["ngForm"],
                features: [Uo([Uv]), Sr]
            }), t
        })();
        const Wv = {provide: Cv, useExisting: it(() => Gv)};
        let Gv = (() => {
            class t extends Cv {
                constructor(t, e) {
                    super(), this.validators = t, this.asyncValidators = e, this.submitted = !1, this._onCollectionChange = () => this._updateDomValue(), this.directives = [], this.form = null, this.ngSubmit = new el, this._setValidators(t), this._setAsyncValidators(e)
                }

                ngOnChanges(t) {
                    this._checkFormPresent(), t.hasOwnProperty("form") && (this._updateValidators(), this._updateDomValue(), this._updateRegistrations(), this._oldForm = this.form)
                }

                ngOnDestroy() {
                    this.form && (Tv(this.form, this, !1), this.form._onCollectionChange === this._onCollectionChange && this.form._registerOnCollectionChange(() => {
                    }))
                }

                get formDirective() {
                    return this
                }

                get control() {
                    return this.form
                }

                get path() {
                    return []
                }

                addControl(t) {
                    const e = this.form.get(t.path);
                    return kv(e, t), e.updateValueAndValidity({emitEvent: !1}), this.directives.push(t), e
                }

                getControl(t) {
                    return this.form.get(t.path)
                }

                removeControl(t) {
                    Ev(t.control || null, t, !1), Pv(this.directives, t)
                }

                addFormGroup(t) {
                    this._setUpFormContainer(t)
                }

                removeFormGroup(t) {
                    this._cleanUpFormContainer(t)
                }

                getFormGroup(t) {
                    return this.form.get(t.path)
                }

                addFormArray(t) {
                    this._setUpFormContainer(t)
                }

                removeFormArray(t) {
                    this._cleanUpFormContainer(t)
                }

                getFormArray(t) {
                    return this.form.get(t.path)
                }

                updateModel(t, e) {
                    this.form.get(t.path).setValue(e)
                }

                onSubmit(t) {
                    return this.submitted = !0, Iv(this.form, this.directives), this.ngSubmit.emit(t), !1
                }

                onReset() {
                    this.resetForm()
                }

                resetForm(t) {
                    this.form.reset(t), this.submitted = !1
                }

                _updateDomValue() {
                    this.directives.forEach(t => {
                        const e = t.control, n = this.form.get(t.path);
                        e !== n && (Ev(e || null, t), n instanceof zv && (kv(n, t), t.control = n))
                    }), this.form._updateTreeValidity({emitEvent: !1})
                }

                _setUpFormContainer(t) {
                    const e = this.form.get(t.path);
                    Dv(e, t), e.updateValueAndValidity({emitEvent: !1})
                }

                _cleanUpFormContainer(t) {
                    if (this.form) {
                        const e = this.form.get(t.path);
                        e && function (t, e) {
                            return Tv(t, e, !1)
                        }(e, t) && e.updateValueAndValidity({emitEvent: !1})
                    }
                }

                _updateRegistrations() {
                    this.form._registerOnCollectionChange(this._onCollectionChange), this._oldForm && this._oldForm._registerOnCollectionChange(() => {
                    })
                }

                _updateValidators() {
                    Rv(this.form, this, !1), this._oldForm && Tv(this._oldForm, this, !1)
                }

                _checkFormPresent() {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(cv, 10), Vr(hv, 10))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "formGroup", ""]],
                hostBindings: function (t, e) {
                    1 & t && Yr("submit", (function (t) {
                        return e.onSubmit(t)
                    }))("reset", (function () {
                        return e.onReset()
                    }))
                },
                inputs: {form: ["formGroup", "form"]},
                outputs: {ngSubmit: "ngSubmit"},
                exportAs: ["ngForm"],
                features: [Uo([Wv]), Sr, ae]
            }), t
        })();
        const Kv = ["trigger"], Zv = ["panel"];

        function Qv(t, e) {
            if (1 & t && (Br(0, "span", 8), ko(1), Hr()), 2 & t) {
                const t = to();
                ui(1), Eo(t.placeholder)
            }
        }

        function Yv(t, e) {
            if (1 & t && (Br(0, "span", 12), ko(1), Hr()), 2 & t) {
                const t = to(2);
                ui(1), Eo(t.triggerValue)
            }
        }

        function Xv(t, e) {
            1 & t && so(0, 0, ["*ngSwitchCase", "true"])
        }

        function Jv(t, e) {
            1 & t && (Br(0, "span", 9), Mr(1, Yv, 2, 1, "span", 10), Mr(2, Xv, 1, 0, "ng-content", 11), Hr()), 2 & t && (jr("ngSwitch", !!to().customTrigger), ui(2), jr("ngSwitchCase", !0))
        }

        function tw(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "div", 13), Br(1, "div", 14, 15), Yr("@transformPanel.done", (function (e) {
                    return De(t), to()._panelDoneAnimatingStream.next(e.toState)
                }))("keydown", (function (e) {
                    return De(t), to()._handleKeydown(e)
                })), so(3, 1), Hr(), Hr()
            }
            if (2 & t) {
                const t = to();
                jr("@transformPanelWrap", void 0), ui(1), n = "mat-select-panel ", s = t._getPanelTheme(), i = "", function (t, e, n, s) {
                    const i = Ae(), r = Be(2);
                    i.firstUpdatePass && yo(i, null, r, !0);
                    const o = Te();
                    if (n !== hi && Nr(o, r, n)) {
                        const s = i.data[tn()];
                        if (xo(s, !0) && !_o(i, r)) {
                            let t = s.classesWithoutHost;
                            null !== t && (n = nt(t, n || "")), zr(i, s, o, n, !0)
                        } else !function (t, e, n, s, i, r, o, a) {
                            i === hi && (i = Pt);
                            let l = 0, c = 0, h = 0 < i.length ? i[0] : null, u = 0 < r.length ? r[0] : null;
                            for (; null !== h || null !== u;) {
                                const o = l < i.length ? i[l + 1] : void 0, d = c < r.length ? r[c + 1] : void 0;
                                let p = null, f = void 0;
                                h === u ? (l += 2, c += 2, o !== d && (p = u, f = d)) : null === u || null !== h && h < u ? (l += 2, p = h) : (c += 2, p = u, f = d), null !== p && wo(t, e, n, s, p, f, !0, a), h = l < i.length ? i[l] : null, u = c < r.length ? r[c] : null
                            }
                        }(i, s, o, o[11], o[r + 1], o[r + 1] = function (t, e, n) {
                            if (null == n || "" === n) return Pt;
                            const s = [], i = fs(n);
                            if (Array.isArray(i)) for (let r = 0; r < i.length; r++) t(s, i[r], !0); else if ("object" == typeof i) for (const r in i) i.hasOwnProperty(r) && t(s, r, i[r]); else "string" == typeof i && e(s, i);
                            return s
                        }(t, e, n), 0, r)
                    }
                }(Yn, mo, Lr(Te(), n, s, i)), po("transform-origin", t._transformOrigin)("font-size", t._triggerFontSize, "px"), jr("ngClass", t.panelClass)("@transformPanel", t.multiple ? "showing-multiple" : "showing"), Fr("id", t.id + "-panel")("aria-multiselectable", t.multiple)("aria-label", t.ariaLabel || null)("aria-labelledby", t._getPanelAriaLabelledby())
            }
            var n, s, i
        }

        const ew = [[["mat-select-trigger"]], "*"], nw = ["mat-select-trigger", "*"], sw = {
            transformPanelWrap: um("transformPanelWrap", [_m("* => void", bm("@transformPanel", [ym()], {optional: !0}))]),
            transformPanel: um("transformPanel", [mm("void", fm({
                transform: "scaleY(0.8)",
                minWidth: "100%",
                opacity: 0
            })), mm("showing", fm({
                opacity: 1,
                minWidth: "calc(100% + 32px)",
                transform: "scaleY(1)"
            })), mm("showing-multiple", fm({
                opacity: 1,
                minWidth: "calc(100% + 64px)",
                transform: "scaleY(1)"
            })), _m("void => *", dm("120ms cubic-bezier(0, 0, 0.2, 1)")), _m("* => void", dm("100ms 25ms linear", fm({opacity: 0})))])
        };
        let iw = 0;
        const rw = new $n("mat-select-scroll-strategy"), ow = new $n("MAT_SELECT_CONFIG"), aw = {
            provide: rw, deps: [Sb], useFactory: function (t) {
                return () => t.scrollStrategies.reposition()
            }
        };

        class lw {
            constructor(t, e) {
                this.source = t, this.value = e
            }
        }

        class cw {
            constructor(t, e, n, s, i) {
                this._elementRef = t, this._defaultErrorStateMatcher = e, this._parentForm = n, this._parentFormGroup = s, this.ngControl = i
            }
        }

        const hw = U_($_(B_(q_(cw)))), uw = new $n("MatSelectTrigger");
        let dw = (() => {
            class t extends hw {
                constructor(t, e, n, s, i, r, o, a, l, c, h, u, d, p) {
                    var f, m, g;
                    super(i, s, o, a, c), this._viewportRuler = t, this._changeDetectorRef = e, this._ngZone = n, this._dir = r, this._parentFormField = l, this.ngControl = c, this._liveAnnouncer = d, this._defaultOptions = p, this._panelOpen = !1, this._compareWith = (t, e) => t === e, this._uid = "mat-select-" + iw++, this._triggerAriaLabelledBy = null, this._destroy = new S, this._onChange = () => {
                    }, this._onTouched = () => {
                    }, this._valueId = "mat-select-value-" + iw++, this._panelDoneAnimatingStream = new S, this._overlayPanelClass = (null === (f = this._defaultOptions) || void 0 === f ? void 0 : f.overlayPanelClass) || "", this._focused = !1, this.controlType = "mat-select", this._required = !1, this._multiple = !1, this._disableOptionCentering = null !== (g = null === (m = this._defaultOptions) || void 0 === m ? void 0 : m.disableOptionCentering) && void 0 !== g && g, this.ariaLabel = "", this.optionSelectionChanges = Wh(() => {
                        const t = this.options;
                        return t ? t.changes.pipe(tu(t), Gh(() => q(...t.map(t => t.onSelectionChange)))) : this._ngZone.onStable.pipe(Yh(1), Gh(() => this.optionSelectionChanges))
                    }), this.openedChange = new el, this._openedStream = this.openedChange.pipe(iu(t => t), F(() => {
                    })), this._closedStream = this.openedChange.pipe(iu(t => !t), F(() => {
                    })), this.selectionChange = new el, this.valueChange = new el, this.ngControl && (this.ngControl.valueAccessor = this), null != (null == p ? void 0 : p.typeaheadDebounceInterval) && (this._typeaheadDebounceInterval = p.typeaheadDebounceInterval), this._scrollStrategyFactory = u, this._scrollStrategy = this._scrollStrategyFactory(), this.tabIndex = parseInt(h) || 0, this.id = this.id
                }

                get focused() {
                    return this._focused || this._panelOpen
                }

                get placeholder() {
                    return this._placeholder
                }

                set placeholder(t) {
                    this._placeholder = t, this.stateChanges.next()
                }

                get required() {
                    return this._required
                }

                set required(t) {
                    this._required = Cf(t), this.stateChanges.next()
                }

                get multiple() {
                    return this._multiple
                }

                set multiple(t) {
                    this._multiple = Cf(t)
                }

                get disableOptionCentering() {
                    return this._disableOptionCentering
                }

                set disableOptionCentering(t) {
                    this._disableOptionCentering = Cf(t)
                }

                get compareWith() {
                    return this._compareWith
                }

                set compareWith(t) {
                    this._compareWith = t, this._selectionModel && this._initializeSelection()
                }

                get value() {
                    return this._value
                }

                set value(t) {
                    (t !== this._value || this._multiple && Array.isArray(t)) && (this.options && this._setSelectionByValue(t), this._value = t)
                }

                get typeaheadDebounceInterval() {
                    return this._typeaheadDebounceInterval
                }

                set typeaheadDebounceInterval(t) {
                    this._typeaheadDebounceInterval = Sf(t)
                }

                get id() {
                    return this._id
                }

                set id(t) {
                    this._id = t || this._uid, this.stateChanges.next()
                }

                ngOnInit() {
                    this._selectionModel = new My(this.multiple), this.stateChanges.next(), this._panelDoneAnimatingStream.pipe(t => t.lift(new ky(void 0, void 0)), Iy(this._destroy)).subscribe(() => this._panelDoneAnimating(this.panelOpen))
                }

                ngAfterContentInit() {
                    this._initKeyManager(), this._selectionModel.changed.pipe(Iy(this._destroy)).subscribe(t => {
                        t.added.forEach(t => t.select()), t.removed.forEach(t => t.deselect())
                    }), this.options.changes.pipe(tu(null), Iy(this._destroy)).subscribe(() => {
                        this._resetOptions(), this._initializeSelection()
                    })
                }

                ngDoCheck() {
                    const t = this._getTriggerAriaLabelledby();
                    if (t !== this._triggerAriaLabelledBy) {
                        const e = this._elementRef.nativeElement;
                        this._triggerAriaLabelledBy = t, t ? e.setAttribute("aria-labelledby", t) : e.removeAttribute("aria-labelledby")
                    }
                    this.ngControl && this.updateErrorState()
                }

                ngOnChanges(t) {
                    t.disabled && this.stateChanges.next(), t.typeaheadDebounceInterval && this._keyManager && this._keyManager.withTypeAhead(this._typeaheadDebounceInterval)
                }

                ngOnDestroy() {
                    this._destroy.next(), this._destroy.complete(), this.stateChanges.complete()
                }

                toggle() {
                    this.panelOpen ? this.close() : this.open()
                }

                open() {
                    this._canOpen() && (this._panelOpen = !0, this._keyManager.withHorizontalOrientation(null), this._highlightCorrectOption(), this._changeDetectorRef.markForCheck())
                }

                close() {
                    this._panelOpen && (this._panelOpen = !1, this._keyManager.withHorizontalOrientation(this._isRtl() ? "rtl" : "ltr"), this._changeDetectorRef.markForCheck(), this._onTouched())
                }

                writeValue(t) {
                    this.value = t
                }

                registerOnChange(t) {
                    this._onChange = t
                }

                registerOnTouched(t) {
                    this._onTouched = t
                }

                setDisabledState(t) {
                    this.disabled = t, this._changeDetectorRef.markForCheck(), this.stateChanges.next()
                }

                get panelOpen() {
                    return this._panelOpen
                }

                get selected() {
                    return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0]
                }

                get triggerValue() {
                    if (this.empty) return "";
                    if (this._multiple) {
                        const t = this._selectionModel.selected.map(t => t.viewValue);
                        return this._isRtl() && t.reverse(), t.join(", ")
                    }
                    return this._selectionModel.selected[0].viewValue
                }

                _isRtl() {
                    return !!this._dir && "rtl" === this._dir.value
                }

                _handleKeydown(t) {
                    this.disabled || (this.panelOpen ? this._handleOpenKeydown(t) : this._handleClosedKeydown(t))
                }

                _handleClosedKeydown(t) {
                    const e = t.keyCode, n = 40 === e || 38 === e || 37 === e || 39 === e, s = 13 === e || 32 === e,
                        i = this._keyManager;
                    if (!i.isTyping() && s && !df(t) || (this.multiple || t.altKey) && n) t.preventDefault(), this.open(); else if (!this.multiple) {
                        const e = this.selected;
                        i.onKeydown(t);
                        const n = this.selected;
                        n && e !== n && this._liveAnnouncer.announce(n.viewValue, 1e4)
                    }
                }

                _handleOpenKeydown(t) {
                    const e = this._keyManager, n = t.keyCode, s = 40 === n || 38 === n, i = e.isTyping();
                    if (s && t.altKey) t.preventDefault(), this.close(); else if (i || 13 !== n && 32 !== n || !e.activeItem || df(t)) if (!i && this._multiple && 65 === n && t.ctrlKey) {
                        t.preventDefault();
                        const e = this.options.some(t => !t.disabled && !t.selected);
                        this.options.forEach(t => {
                            t.disabled || (e ? t.select() : t.deselect())
                        })
                    } else {
                        const n = e.activeItemIndex;
                        e.onKeydown(t), this._multiple && s && t.shiftKey && e.activeItem && e.activeItemIndex !== n && e.activeItem._selectViaInteraction()
                    } else t.preventDefault(), e.activeItem._selectViaInteraction()
                }

                _onFocus() {
                    this.disabled || (this._focused = !0, this.stateChanges.next())
                }

                _onBlur() {
                    this._focused = !1, this.disabled || this.panelOpen || (this._onTouched(), this._changeDetectorRef.markForCheck(), this.stateChanges.next())
                }

                _onAttached() {
                    this.overlayDir.positionChange.pipe(Yh(1)).subscribe(() => {
                        this._changeDetectorRef.detectChanges(), this._positioningSettled()
                    })
                }

                _getPanelTheme() {
                    return this._parentFormField ? "mat-" + this._parentFormField.color : ""
                }

                get empty() {
                    return !this._selectionModel || this._selectionModel.isEmpty()
                }

                _initializeSelection() {
                    Promise.resolve().then(() => {
                        this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value), this.stateChanges.next()
                    })
                }

                _setSelectionByValue(t) {
                    if (this._selectionModel.selected.forEach(t => t.setInactiveStyles()), this._selectionModel.clear(), this.multiple && t) Array.isArray(t), t.forEach(t => this._selectValue(t)), this._sortValues(); else {
                        const e = this._selectValue(t);
                        e ? this._keyManager.updateActiveItem(e) : this.panelOpen || this._keyManager.updateActiveItem(-1)
                    }
                    this._changeDetectorRef.markForCheck()
                }

                _selectValue(t) {
                    const e = this.options.find(e => {
                        if (this._selectionModel.isSelected(e)) return !1;
                        try {
                            return null != e.value && this._compareWith(e.value, t)
                        } catch (n) {
                            return !1
                        }
                    });
                    return e && this._selectionModel.select(e), e
                }

                _initKeyManager() {
                    this._keyManager = new Kf(this.options).withTypeAhead(this._typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl() ? "rtl" : "ltr").withHomeAndEnd().withAllowedModifierKeys(["shiftKey"]), this._keyManager.tabOut.pipe(Iy(this._destroy)).subscribe(() => {
                        this.panelOpen && (!this.multiple && this._keyManager.activeItem && this._keyManager.activeItem._selectViaInteraction(), this.focus(), this.close())
                    }), this._keyManager.change.pipe(Iy(this._destroy)).subscribe(() => {
                        this._panelOpen && this.panel ? this._scrollOptionIntoView(this._keyManager.activeItemIndex || 0) : this._panelOpen || this.multiple || !this._keyManager.activeItem || this._keyManager.activeItem._selectViaInteraction()
                    })
                }

                _resetOptions() {
                    const t = q(this.options.changes, this._destroy);
                    this.optionSelectionChanges.pipe(Iy(t)).subscribe(t => {
                        this._onSelect(t.source, t.isUserInput), t.isUserInput && !this.multiple && this._panelOpen && (this.close(), this.focus())
                    }), q(...this.options.map(t => t._stateChanges)).pipe(Iy(t)).subscribe(() => {
                        this._changeDetectorRef.markForCheck(), this.stateChanges.next()
                    })
                }

                _onSelect(t, e) {
                    const n = this._selectionModel.isSelected(t);
                    null != t.value || this._multiple ? (n !== t.selected && (t.selected ? this._selectionModel.select(t) : this._selectionModel.deselect(t)), e && this._keyManager.setActiveItem(t), this.multiple && (this._sortValues(), e && this.focus())) : (t.deselect(), this._selectionModel.clear(), null != this.value && this._propagateChanges(t.value)), n !== this._selectionModel.isSelected(t) && this._propagateChanges(), this.stateChanges.next()
                }

                _sortValues() {
                    if (this.multiple) {
                        const t = this.options.toArray();
                        this._selectionModel.sort((e, n) => this.sortComparator ? this.sortComparator(e, n, t) : t.indexOf(e) - t.indexOf(n)), this.stateChanges.next()
                    }
                }

                _propagateChanges(t) {
                    let e = null;
                    e = this.multiple ? this.selected.map(t => t.value) : this.selected ? this.selected.value : t, this._value = e, this.valueChange.emit(e), this._onChange(e), this.selectionChange.emit(this._getChangeEvent(e)), this._changeDetectorRef.markForCheck()
                }

                _highlightCorrectOption() {
                    this._keyManager && (this.empty ? this._keyManager.setFirstItemActive() : this._keyManager.setActiveItem(this._selectionModel.selected[0]))
                }

                _canOpen() {
                    var t;
                    return !this._panelOpen && !this.disabled && (null === (t = this.options) || void 0 === t ? void 0 : t.length) > 0
                }

                focus(t) {
                    this._elementRef.nativeElement.focus(t)
                }

                _getPanelAriaLabelledby() {
                    if (this.ariaLabel) return null;
                    const t = this._getLabelId();
                    return this.ariaLabelledby ? t + " " + this.ariaLabelledby : t
                }

                _getAriaActiveDescendant() {
                    return this.panelOpen && this._keyManager && this._keyManager.activeItem ? this._keyManager.activeItem.id : null
                }

                _getLabelId() {
                    var t;
                    return (null === (t = this._parentFormField) || void 0 === t ? void 0 : t.getLabelId()) || ""
                }

                _getTriggerAriaLabelledby() {
                    if (this.ariaLabel) return null;
                    let t = this._getLabelId() + " " + this._valueId;
                    return this.ariaLabelledby && (t += " " + this.ariaLabelledby), t
                }

                _panelDoneAnimating(t) {
                    this.openedChange.emit(t)
                }

                setDescribedByIds(t) {
                    this._ariaDescribedby = t.join(" ")
                }

                onContainerClick() {
                    this.focus(), this.open()
                }

                get shouldLabelFloat() {
                    return this._panelOpen || !this.empty || this._focused && !!this._placeholder
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(zy), Vr(wa), Vr(zl), Vr(G_), Vr(Qo), Vr(am, 8), Vr(qv, 8), Vr(Gv, 8), Vr(rv, 8), Vr(xv, 10), Hn("tabindex"), Vr(rw), Vr(Yf), Vr(ow, 8))
            }, t.\u0275dir = Zt({
                type: t,
                viewQuery: function (t, e) {
                    if (1 & t && (pl(Kv, 1), pl(Zv, 1), pl(Ob, 1)), 2 & t) {
                        let t;
                        dl(t = ml()) && (e.trigger = t.first), dl(t = ml()) && (e.panel = t.first), dl(t = ml()) && (e.overlayDir = t.first)
                    }
                },
                inputs: {
                    ariaLabel: ["aria-label", "ariaLabel"],
                    id: "id",
                    placeholder: "placeholder",
                    required: "required",
                    multiple: "multiple",
                    disableOptionCentering: "disableOptionCentering",
                    compareWith: "compareWith",
                    value: "value",
                    typeaheadDebounceInterval: "typeaheadDebounceInterval",
                    panelClass: "panelClass",
                    ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
                    errorStateMatcher: "errorStateMatcher",
                    sortComparator: "sortComparator"
                },
                outputs: {
                    openedChange: "openedChange",
                    _openedStream: "opened",
                    _closedStream: "closed",
                    selectionChange: "selectionChange",
                    valueChange: "valueChange"
                },
                features: [Sr, ae]
            }), t
        })(), pw = (() => {
            class t extends dw {
                constructor() {
                    super(...arguments), this._scrollTop = 0, this._triggerFontSize = 0, this._transformOrigin = "top", this._offsetY = 0, this._positions = [{
                        originX: "start",
                        originY: "top",
                        overlayX: "start",
                        overlayY: "top"
                    }, {originX: "start", originY: "bottom", overlayX: "start", overlayY: "bottom"}]
                }

                _calculateOverlayScroll(t, e, n) {
                    const s = this._getItemHeight();
                    return Math.min(Math.max(0, s * t - e + s / 2), n)
                }

                ngOnInit() {
                    super.ngOnInit(), this._viewportRuler.change().pipe(Iy(this._destroy)).subscribe(() => {
                        this.panelOpen && (this._triggerRect = this.trigger.nativeElement.getBoundingClientRect(), this._changeDetectorRef.markForCheck())
                    })
                }

                open() {
                    super._canOpen() && (super.open(), this._triggerRect = this.trigger.nativeElement.getBoundingClientRect(), this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement).fontSize || "0"), this._calculateOverlayPosition(), this._ngZone.onStable.pipe(Yh(1)).subscribe(() => {
                        this._triggerFontSize && this.overlayDir.overlayRef && this.overlayDir.overlayRef.overlayElement && (this.overlayDir.overlayRef.overlayElement.style.fontSize = this._triggerFontSize + "px")
                    }))
                }

                _scrollOptionIntoView(t) {
                    const e = my(t, this.options, this.optionGroups), n = this._getItemHeight();
                    var s, i, r;
                    this.panel.nativeElement.scrollTop = (i = n, (s = (t + e) * n) < (r = this.panel.nativeElement.scrollTop) ? s : s + i > r + 256 ? Math.max(0, s - 256 + i) : r)
                }

                _positioningSettled() {
                    this._calculateOverlayOffsetX(), this.panel.nativeElement.scrollTop = this._scrollTop
                }

                _panelDoneAnimating(t) {
                    this.panelOpen ? this._scrollTop = 0 : (this.overlayDir.offsetX = 0, this._changeDetectorRef.markForCheck()), super._panelDoneAnimating(t)
                }

                _getChangeEvent(t) {
                    return new lw(this, t)
                }

                _calculateOverlayOffsetX() {
                    const t = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect(),
                        e = this._viewportRuler.getViewportSize(), n = this._isRtl(), s = this.multiple ? 56 : 32;
                    let i;
                    if (this.multiple) i = 40; else if (this.disableOptionCentering) i = 16; else {
                        let t = this._selectionModel.selected[0] || this.options.first;
                        i = t && t.group ? 32 : 16
                    }
                    n || (i *= -1);
                    const r = 0 - (t.left + i - (n ? s : 0)), o = t.right + i - e.width + (n ? 0 : s);
                    r > 0 ? i += r + 8 : o > 0 && (i -= o + 8), this.overlayDir.offsetX = Math.round(i), this.overlayDir.overlayRef.updatePosition()
                }

                _calculateOverlayOffsetY(t, e, n) {
                    const s = this._getItemHeight(), i = (s - this._triggerRect.height) / 2, r = Math.floor(256 / s);
                    let o;
                    return this.disableOptionCentering ? 0 : (o = 0 === this._scrollTop ? t * s : this._scrollTop === n ? (t - (this._getItemCount() - r)) * s + (s - (this._getItemCount() * s - 256) % s) : e - s / 2, Math.round(-1 * o - i))
                }

                _checkOverlayWithinViewport(t) {
                    const e = this._getItemHeight(), n = this._viewportRuler.getViewportSize(),
                        s = this._triggerRect.top - 8, i = n.height - this._triggerRect.bottom - 8,
                        r = Math.abs(this._offsetY),
                        o = Math.min(this._getItemCount() * e, 256) - r - this._triggerRect.height;
                    o > i ? this._adjustPanelUp(o, i) : r > s ? this._adjustPanelDown(r, s, t) : this._transformOrigin = this._getOriginBasedOnOption()
                }

                _adjustPanelUp(t, e) {
                    const n = Math.round(t - e);
                    this._scrollTop -= n, this._offsetY -= n, this._transformOrigin = this._getOriginBasedOnOption(), this._scrollTop <= 0 && (this._scrollTop = 0, this._offsetY = 0, this._transformOrigin = "50% bottom 0px")
                }

                _adjustPanelDown(t, e, n) {
                    const s = Math.round(t - e);
                    if (this._scrollTop += s, this._offsetY += s, this._transformOrigin = this._getOriginBasedOnOption(), this._scrollTop >= n) return this._scrollTop = n, this._offsetY = 0, void (this._transformOrigin = "50% top 0px")
                }

                _calculateOverlayPosition() {
                    const t = this._getItemHeight(), e = this._getItemCount(), n = Math.min(e * t, 256), s = e * t - n;
                    let i;
                    i = this.empty ? 0 : Math.max(this.options.toArray().indexOf(this._selectionModel.selected[0]), 0), i += my(i, this.options, this.optionGroups);
                    const r = n / 2;
                    this._scrollTop = this._calculateOverlayScroll(i, r, s), this._offsetY = this._calculateOverlayOffsetY(i, r, s), this._checkOverlayWithinViewport(s)
                }

                _getOriginBasedOnOption() {
                    const t = this._getItemHeight(), e = (t - this._triggerRect.height) / 2;
                    return `50% ${Math.abs(this._offsetY) - e + t / 2}px 0px`
                }

                _getItemHeight() {
                    return 3 * this._triggerFontSize
                }

                _getItemCount() {
                    return this.options.length + this.optionGroups.length
                }
            }

            return t.\u0275fac = function (e) {
                return fw(e || t)
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-select"]],
                contentQueries: function (t, e, n) {
                    if (1 & t && (fl(n, uw, 1), fl(n, fy, 1), fl(n, hy, 1)), 2 & t) {
                        let t;
                        dl(t = ml()) && (e.customTrigger = t.first), dl(t = ml()) && (e.options = t), dl(t = ml()) && (e.optionGroups = t)
                    }
                },
                hostAttrs: ["role", "combobox", "aria-autocomplete", "none", "aria-haspopup", "true", 1, "mat-select"],
                hostVars: 20,
                hostBindings: function (t, e) {
                    1 & t && Yr("keydown", (function (t) {
                        return e._handleKeydown(t)
                    }))("focus", (function () {
                        return e._onFocus()
                    }))("blur", (function () {
                        return e._onBlur()
                    })), 2 & t && (Fr("id", e.id)("tabindex", e.tabIndex)("aria-controls", e.panelOpen ? e.id + "-panel" : null)("aria-expanded", e.panelOpen)("aria-label", e.ariaLabel || null)("aria-required", e.required.toString())("aria-disabled", e.disabled.toString())("aria-invalid", e.errorState)("aria-describedby", e._ariaDescribedby || null)("aria-activedescendant", e._getAriaActiveDescendant()), fo("mat-select-disabled", e.disabled)("mat-select-invalid", e.errorState)("mat-select-required", e.required)("mat-select-empty", e.empty)("mat-select-multiple", e.multiple))
                },
                inputs: {disabled: "disabled", disableRipple: "disableRipple", tabIndex: "tabIndex"},
                exportAs: ["matSelect"],
                features: [Uo([{provide: Zb, useExisting: t}, {provide: ry, useExisting: t}]), Sr],
                ngContentSelectors: nw,
                decls: 9,
                vars: 12,
                consts: [["cdk-overlay-origin", "", 1, "mat-select-trigger", 3, "click"], ["origin", "cdkOverlayOrigin", "trigger", ""], [1, "mat-select-value", 3, "ngSwitch"], ["class", "mat-select-placeholder mat-select-min-line", 4, "ngSwitchCase"], ["class", "mat-select-value-text", 3, "ngSwitch", 4, "ngSwitchCase"], [1, "mat-select-arrow-wrapper"], [1, "mat-select-arrow"], ["cdk-connected-overlay", "", "cdkConnectedOverlayLockPosition", "", "cdkConnectedOverlayHasBackdrop", "", "cdkConnectedOverlayBackdropClass", "cdk-overlay-transparent-backdrop", 3, "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayOffsetY", "backdropClick", "attach", "detach"], [1, "mat-select-placeholder", "mat-select-min-line"], [1, "mat-select-value-text", 3, "ngSwitch"], ["class", "mat-select-min-line", 4, "ngSwitchDefault"], [4, "ngSwitchCase"], [1, "mat-select-min-line"], [1, "mat-select-panel-wrap"], ["role", "listbox", "tabindex", "-1", 3, "ngClass", "keydown"], ["panel", ""]],
                template: function (t, e) {
                    if (1 & t && (no(ew), Br(0, "div", 0, 1), Yr("click", (function () {
                        return e.toggle()
                    })), Br(3, "div", 2), Mr(4, Qv, 2, 1, "span", 3), Mr(5, Jv, 3, 2, "span", 4), Hr(), Br(6, "div", 5), Ur(7, "div", 6), Hr(), Hr(), Mr(8, tw, 4, 14, "ng-template", 7), Yr("backdropClick", (function () {
                        return e.close()
                    }))("attach", (function () {
                        return e._onAttached()
                    }))("detach", (function () {
                        return e.close()
                    }))), 2 & t) {
                        const t = be(Oe.lFrame.contextLView, 21);
                        Fr("aria-owns", e.panelOpen ? e.id + "-panel" : null), ui(3), jr("ngSwitch", e.empty), Fr("id", e._valueId), ui(1), jr("ngSwitchCase", !0), ui(1), jr("ngSwitchCase", !1), ui(3), jr("cdkConnectedOverlayPanelClass", e._overlayPanelClass)("cdkConnectedOverlayScrollStrategy", e._scrollStrategy)("cdkConnectedOverlayOrigin", t)("cdkConnectedOverlayOpen", e.panelOpen)("cdkConnectedOverlayPositions", e._positions)("cdkConnectedOverlayMinWidth", null == e._triggerRect ? null : e._triggerRect.width)("cdkConnectedOverlayOffsetY", e._offsetY)
                    }
                },
                directives: [Eb, Zc, Qc, Ob, Yc, Bc],
                styles: ['.mat-select{display:inline-block;width:100%;outline:none}.mat-select-trigger{display:inline-table;cursor:pointer;position:relative;box-sizing:border-box}.mat-select-disabled .mat-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-select-value{display:table-cell;max-width:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-select-arrow-wrapper{display:table-cell;vertical-align:middle}.mat-form-field-appearance-fill .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-outline .mat-select-arrow-wrapper{transform:translateY(-25%)}.mat-form-field-appearance-standard.mat-form-field-has-label .mat-select:not(.mat-select-empty) .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable.mat-form-field-appearance-standard .mat-select.mat-select-empty .mat-select-arrow-wrapper{transition:none}.mat-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-select-panel-wrap{flex-basis:100%}.mat-select-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%;border-radius:4px;outline:0}.cdk-high-contrast-active .mat-select-panel{outline:solid 1px}.mat-select-panel .mat-optgroup-label,.mat-select-panel .mat-option{font-size:inherit;line-height:3em;height:3em}.mat-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-form-field-flex{cursor:pointer}.mat-form-field-type-mat-select .mat-form-field-label{width:calc(100% - 18px)}.mat-select-placeholder{transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}._mat-animation-noopable .mat-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-select-placeholder{color:transparent;-webkit-text-fill-color:transparent;transition:none;display:block}.mat-select-min-line:empty::before{content:" ";white-space:pre;width:1px}\n'],
                encapsulation: 2,
                data: {animation: [sw.transformPanelWrap, sw.transformPanel]},
                changeDetection: 0
            }), t
        })();
        const fw = zn(pw);
        let mw = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({
                providers: [aw],
                imports: [[sh, Tb, gy, z_], By, av, gy, z_]
            }), t
        })();

        class gw {
            constructor(t) {
                this.total = t
            }

            call(t, e) {
                return e.subscribe(new _w(t, this.total))
            }
        }

        class _w extends f {
            constructor(t, e) {
                super(t), this.total = e, this.count = 0
            }

            _next(t) {
                ++this.count > this.total && this.destination.next(t)
            }
        }

        const yw = new Set;
        let bw, vw = (() => {
            class t {
                constructor(t) {
                    this._platform = t, this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : ww
                }

                matchMedia(t) {
                    return this._platform.WEBKIT && function (t) {
                        if (!yw.has(t)) try {
                            bw || (bw = document.createElement("style"), bw.setAttribute("type", "text/css"), document.head.appendChild(bw)), bw.sheet && (bw.sheet.insertRule(`@media ${t} {.fx-query-test{ }}`, 0), yw.add(t))
                        } catch (e) {
                            console.error(e)
                        }
                    }(t), this._matchMedia(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(If))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(If))
                }, token: t, providedIn: "root"
            }), t
        })();

        function ww(t) {
            return {
                matches: "all" === t || "" === t, media: t, addListener: () => {
                }, removeListener: () => {
                }
            }
        }

        let Cw = (() => {
            class t {
                constructor(t, e) {
                    this._mediaMatcher = t, this._zone = e, this._queries = new Map, this._destroySubject = new S
                }

                ngOnDestroy() {
                    this._destroySubject.next(), this._destroySubject.complete()
                }

                isMatched(t) {
                    return Sw(kf(t)).some(t => this._registerQuery(t).mql.matches)
                }

                observe(t) {
                    let e = jh(Sw(kf(t)).map(t => this._registerQuery(t).observable));
                    return e = Uh(e.pipe(Yh(1)), e.pipe(t => t.lift(new gw(1)), yf(0))), e.pipe(F(t => {
                        const e = {matches: !1, breakpoints: {}};
                        return t.forEach(({matches: t, query: n}) => {
                            e.matches = e.matches || t, e.breakpoints[n] = t
                        }), e
                    }))
                }

                _registerQuery(t) {
                    if (this._queries.has(t)) return this._queries.get(t);
                    const e = this._mediaMatcher.matchMedia(t), n = {
                        observable: new y(t => {
                            const n = e => this._zone.run(() => t.next(e));
                            return e.addListener(n), () => {
                                e.removeListener(n)
                            }
                        }).pipe(tu(e), F(({matches: e}) => ({query: t, matches: e})), Iy(this._destroySubject)), mql: e
                    };
                    return this._queries.set(t, n), n
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(vw), os(zl))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(vw), os(zl))
                }, token: t, providedIn: "root"
            }), t
        })();

        function Sw(t) {
            return t.map(t => t.split(",")).reduce((t, e) => t.concat(e)).map(t => t.trim())
        }

        const xw = {
            tooltipState: um("state", [mm("initial, void, hidden", fm({
                opacity: 0,
                transform: "scale(0)"
            })), mm("visible", fm({transform: "scale(1)"})), _m("* => visible", dm("200ms cubic-bezier(0, 0, 0.2, 1)", gm([fm({
                opacity: 0,
                transform: "scale(0)",
                offset: 0
            }), fm({opacity: .5, transform: "scale(0.99)", offset: .5}), fm({
                opacity: 1,
                transform: "scale(1)",
                offset: 1
            })]))), _m("* => hidden", dm("100ms cubic-bezier(0, 0, 0.2, 1)", fm({opacity: 0})))])
        }, kw = Nf({passive: !0}), Ew = new $n("mat-tooltip-scroll-strategy"), Ow = {
            provide: Ew, deps: [Sb], useFactory: function (t) {
                return () => t.scrollStrategies.reposition({scrollThrottle: 20})
            }
        }, Rw = new $n("mat-tooltip-default-options", {
            providedIn: "root", factory: function () {
                return {showDelay: 0, hideDelay: 0, touchendHideDelay: 1500}
            }
        });
        let Tw = (() => {
            class t {
                constructor(t, e, n, s, i, r, o, a, l, c, h, u) {
                    this._overlay = t, this._elementRef = e, this._scrollDispatcher = n, this._viewContainerRef = s, this._ngZone = i, this._platform = r, this._ariaDescriber = o, this._focusMonitor = a, this._dir = c, this._defaultOptions = h, this._position = "below", this._disabled = !1, this._viewInitialized = !1, this._pointerExitEventsInitialized = !1, this.showDelay = this._defaultOptions.showDelay, this.hideDelay = this._defaultOptions.hideDelay, this.touchGestures = "auto", this._message = "", this._passiveListeners = [], this._destroyed = new S, this._handleKeydown = t => {
                        this._isTooltipVisible() && 27 === t.keyCode && !df(t) && (t.preventDefault(), t.stopPropagation(), this._ngZone.run(() => this.hide(0)))
                    }, this._scrollStrategy = l, h && (h.position && (this.position = h.position), h.touchGestures && (this.touchGestures = h.touchGestures)), i.runOutsideAngular(() => {
                        e.nativeElement.addEventListener("keydown", this._handleKeydown)
                    })
                }

                get position() {
                    return this._position
                }

                set position(t) {
                    t !== this._position && (this._position = t, this._overlayRef && (this._updatePosition(), this._tooltipInstance && this._tooltipInstance.show(0), this._overlayRef.updatePosition()))
                }

                get disabled() {
                    return this._disabled
                }

                set disabled(t) {
                    this._disabled = Cf(t), this._disabled ? this.hide(0) : this._setupPointerEnterEventsIfNeeded()
                }

                get message() {
                    return this._message
                }

                set message(t) {
                    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message, "tooltip"), this._message = null != t ? String(t).trim() : "", !this._message && this._isTooltipVisible() ? this.hide(0) : (this._setupPointerEnterEventsIfNeeded(), this._updateTooltipMessage(), this._ngZone.runOutsideAngular(() => {
                        Promise.resolve().then(() => {
                            this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, "tooltip")
                        })
                    }))
                }

                get tooltipClass() {
                    return this._tooltipClass
                }

                set tooltipClass(t) {
                    this._tooltipClass = t, this._tooltipInstance && this._setTooltipClass(this._tooltipClass)
                }

                ngAfterViewInit() {
                    this._viewInitialized = !0, this._setupPointerEnterEventsIfNeeded(), this._focusMonitor.monitor(this._elementRef).pipe(Iy(this._destroyed)).subscribe(t => {
                        t ? "keyboard" === t && this._ngZone.run(() => this.show()) : this._ngZone.run(() => this.hide(0))
                    })
                }

                ngOnDestroy() {
                    const t = this._elementRef.nativeElement;
                    clearTimeout(this._touchstartTimeout), this._overlayRef && (this._overlayRef.dispose(), this._tooltipInstance = null), t.removeEventListener("keydown", this._handleKeydown), this._passiveListeners.forEach(([e, n]) => {
                        t.removeEventListener(e, n, kw)
                    }), this._passiveListeners.length = 0, this._destroyed.next(), this._destroyed.complete(), this._ariaDescriber.removeDescription(t, this.message, "tooltip"), this._focusMonitor.stopMonitoring(t)
                }

                show(t = this.showDelay) {
                    if (this.disabled || !this.message || this._isTooltipVisible() && !this._tooltipInstance._showTimeoutId && !this._tooltipInstance._hideTimeoutId) return;
                    const e = this._createOverlay();
                    this._detach(), this._portal = this._portal || new $y(Aw, this._viewContainerRef), this._tooltipInstance = e.attach(this._portal).instance, this._tooltipInstance.afterHidden().pipe(Iy(this._destroyed)).subscribe(() => this._detach()), this._setTooltipClass(this._tooltipClass), this._updateTooltipMessage(), this._tooltipInstance.show(t)
                }

                hide(t = this.hideDelay) {
                    this._tooltipInstance && this._tooltipInstance.hide(t)
                }

                toggle() {
                    this._isTooltipVisible() ? this.hide() : this.show()
                }

                _isTooltipVisible() {
                    return !!this._tooltipInstance && this._tooltipInstance.isVisible()
                }

                _createOverlay() {
                    if (this._overlayRef) return this._overlayRef;
                    const t = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef),
                        e = this._overlay.position().flexibleConnectedTo(this._elementRef).withTransformOriginOn(".mat-tooltip").withFlexibleDimensions(!1).withViewportMargin(8).withScrollableContainers(t);
                    return e.positionChanges.pipe(Iy(this._destroyed)).subscribe(t => {
                        this._tooltipInstance && t.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible() && this._ngZone.run(() => this.hide(0))
                    }), this._overlayRef = this._overlay.create({
                        direction: this._dir,
                        positionStrategy: e,
                        panelClass: "mat-tooltip-panel",
                        scrollStrategy: this._scrollStrategy()
                    }), this._updatePosition(), this._overlayRef.detachments().pipe(Iy(this._destroyed)).subscribe(() => this._detach()), this._overlayRef
                }

                _detach() {
                    this._overlayRef && this._overlayRef.hasAttached() && this._overlayRef.detach(), this._tooltipInstance = null
                }

                _updatePosition() {
                    const t = this._overlayRef.getConfig().positionStrategy, e = this._getOrigin(),
                        n = this._getOverlayPosition();
                    t.withPositions([Object.assign(Object.assign({}, e.main), n.main), Object.assign(Object.assign({}, e.fallback), n.fallback)])
                }

                _getOrigin() {
                    const t = !this._dir || "ltr" == this._dir.value, e = this.position;
                    let n;
                    "above" == e || "below" == e ? n = {
                        originX: "center",
                        originY: "above" == e ? "top" : "bottom"
                    } : "before" == e || "left" == e && t || "right" == e && !t ? n = {
                        originX: "start",
                        originY: "center"
                    } : ("after" == e || "right" == e && t || "left" == e && !t) && (n = {
                        originX: "end",
                        originY: "center"
                    });
                    const {x: s, y: i} = this._invertPosition(n.originX, n.originY);
                    return {main: n, fallback: {originX: s, originY: i}}
                }

                _getOverlayPosition() {
                    const t = !this._dir || "ltr" == this._dir.value, e = this.position;
                    let n;
                    "above" == e ? n = {
                        overlayX: "center",
                        overlayY: "bottom"
                    } : "below" == e ? n = {
                        overlayX: "center",
                        overlayY: "top"
                    } : "before" == e || "left" == e && t || "right" == e && !t ? n = {
                        overlayX: "end",
                        overlayY: "center"
                    } : ("after" == e || "right" == e && t || "left" == e && !t) && (n = {
                        overlayX: "start",
                        overlayY: "center"
                    });
                    const {x: s, y: i} = this._invertPosition(n.overlayX, n.overlayY);
                    return {main: n, fallback: {overlayX: s, overlayY: i}}
                }

                _updateTooltipMessage() {
                    this._tooltipInstance && (this._tooltipInstance.message = this.message, this._tooltipInstance._markForCheck(), this._ngZone.onMicrotaskEmpty.pipe(Yh(1), Iy(this._destroyed)).subscribe(() => {
                        this._tooltipInstance && this._overlayRef.updatePosition()
                    }))
                }

                _setTooltipClass(t) {
                    this._tooltipInstance && (this._tooltipInstance.tooltipClass = t, this._tooltipInstance._markForCheck())
                }

                _invertPosition(t, e) {
                    return "above" === this.position || "below" === this.position ? "top" === e ? e = "bottom" : "bottom" === e && (e = "top") : "end" === t ? t = "start" : "start" === t && (t = "end"), {
                        x: t,
                        y: e
                    }
                }

                _setupPointerEnterEventsIfNeeded() {
                    !this._disabled && this.message && this._viewInitialized && !this._passiveListeners.length && (this._platformSupportsMouseEvents() ? this._passiveListeners.push(["mouseenter", () => {
                        this._setupPointerExitEventsIfNeeded(), this.show()
                    }]) : "off" !== this.touchGestures && (this._disableNativeGesturesIfNecessary(), this._passiveListeners.push(["touchstart", () => {
                        this._setupPointerExitEventsIfNeeded(), clearTimeout(this._touchstartTimeout), this._touchstartTimeout = setTimeout(() => this.show(), 500)
                    }])), this._addListeners(this._passiveListeners))
                }

                _setupPointerExitEventsIfNeeded() {
                    if (this._pointerExitEventsInitialized) return;
                    this._pointerExitEventsInitialized = !0;
                    const t = [];
                    if (this._platformSupportsMouseEvents()) t.push(["mouseleave", () => this.hide()], ["wheel", t => this._wheelListener(t)]); else if ("off" !== this.touchGestures) {
                        this._disableNativeGesturesIfNecessary();
                        const e = () => {
                            clearTimeout(this._touchstartTimeout), this.hide(this._defaultOptions.touchendHideDelay)
                        };
                        t.push(["touchend", e], ["touchcancel", e])
                    }
                    this._addListeners(t), this._passiveListeners.push(...t)
                }

                _addListeners(t) {
                    t.forEach(([t, e]) => {
                        this._elementRef.nativeElement.addEventListener(t, e, kw)
                    })
                }

                _platformSupportsMouseEvents() {
                    return !this._platform.IOS && !this._platform.ANDROID
                }

                _wheelListener(t) {
                    if (this._isTooltipVisible()) {
                        const e = (this._document || document).elementFromPoint(t.clientX, t.clientY),
                            n = this._elementRef.nativeElement;
                        e === n || n.contains(e) || this.hide()
                    }
                }

                _disableNativeGesturesIfNecessary() {
                    const t = this.touchGestures;
                    if ("off" !== t) {
                        const e = this._elementRef.nativeElement, n = e.style;
                        ("on" === t || "INPUT" !== e.nodeName && "TEXTAREA" !== e.nodeName) && (n.userSelect = n.msUserSelect = n.webkitUserSelect = n.MozUserSelect = "none"), "on" !== t && e.draggable || (n.webkitUserDrag = "none"), n.touchAction = "none", n.webkitTapHighlightColor = "transparent"
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Sb), Vr(Qo), Vr(jy), Vr(Na), Vr(zl), Vr(If), Vr(qf), Vr(nm), Vr(Ew), Vr(am, 8), Vr(Rw, 8), Vr(bc))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "matTooltip", ""]],
                hostAttrs: [1, "mat-tooltip-trigger"],
                inputs: {
                    showDelay: ["matTooltipShowDelay", "showDelay"],
                    hideDelay: ["matTooltipHideDelay", "hideDelay"],
                    touchGestures: ["matTooltipTouchGestures", "touchGestures"],
                    position: ["matTooltipPosition", "position"],
                    disabled: ["matTooltipDisabled", "disabled"],
                    message: ["matTooltip", "message"],
                    tooltipClass: ["matTooltipClass", "tooltipClass"]
                },
                exportAs: ["matTooltip"]
            }), t
        })(), Aw = (() => {
            class t {
                constructor(t, e) {
                    this._changeDetectorRef = t, this._breakpointObserver = e, this._visibility = "initial", this._closeOnInteraction = !1, this._onHide = new S, this._isHandset = this._breakpointObserver.observe("(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)")
                }

                show(t) {
                    this._hideTimeoutId && (clearTimeout(this._hideTimeoutId), this._hideTimeoutId = null), this._closeOnInteraction = !0, this._showTimeoutId = setTimeout(() => {
                        this._visibility = "visible", this._showTimeoutId = null, this._markForCheck()
                    }, t)
                }

                hide(t) {
                    this._showTimeoutId && (clearTimeout(this._showTimeoutId), this._showTimeoutId = null), this._hideTimeoutId = setTimeout(() => {
                        this._visibility = "hidden", this._hideTimeoutId = null, this._markForCheck()
                    }, t)
                }

                afterHidden() {
                    return this._onHide
                }

                isVisible() {
                    return "visible" === this._visibility
                }

                ngOnDestroy() {
                    this._onHide.complete()
                }

                _animationStart() {
                    this._closeOnInteraction = !1
                }

                _animationDone(t) {
                    const e = t.toState;
                    "hidden" !== e || this.isVisible() || this._onHide.next(), "visible" !== e && "hidden" !== e || (this._closeOnInteraction = !0)
                }

                _handleBodyInteraction() {
                    this._closeOnInteraction && this.hide(0)
                }

                _markForCheck() {
                    this._changeDetectorRef.markForCheck()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(wa), Vr(Cw))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-tooltip-component"]],
                hostAttrs: ["aria-hidden", "true"],
                hostVars: 2,
                hostBindings: function (t, e) {
                    1 & t && Yr("click", (function () {
                        return e._handleBodyInteraction()
                    }), !1, ks)("auxclick", (function () {
                        return e._handleBodyInteraction()
                    }), !1, ks), 2 & t && po("zoom", "visible" === e._visibility ? 1 : null)
                },
                decls: 3,
                vars: 7,
                consts: [[1, "mat-tooltip", 3, "ngClass"]],
                template: function (t, e) {
                    if (1 & t && (Br(0, "div", 0), Yr("@state.start", (function () {
                        return e._animationStart()
                    }))("@state.done", (function (t) {
                        return e._animationDone(t)
                    })), Qa(1, "async"), ko(2), Hr()), 2 & t) {
                        let t = null;
                        fo("mat-tooltip-handset", null == (t = Ya(1, 5, e._isHandset)) ? null : t.matches), jr("ngClass", e.tooltipClass)("@state", e._visibility), ui(2), Eo(e.message)
                    }
                },
                directives: [Bc],
                pipes: [nh],
                styles: [".mat-tooltip-panel{pointer-events:none !important}.mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}\n"],
                encapsulation: 2,
                data: {animation: [xw.tooltipState]},
                changeDetection: 0
            }), t
        })(), Dw = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({providers: [Ow], imports: [[rm, sh, Tb, z_], z_, By]}), t
        })();

        function Iw(t, e) {
            if (1 & t && (Br(0, "mat-option", 19), ko(1), Hr()), 2 & t) {
                const t = e.$implicit;
                jr("value", t), ui(1), Oo(" ", t, " ")
            }
        }

        function Pw(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "mat-form-field", 16), Br(1, "mat-select", 17), Yr("selectionChange", (function (e) {
                    return De(t), to(2)._changePageSize(e.value)
                })), Mr(2, Iw, 2, 2, "mat-option", 18), Hr(), Hr()
            }
            if (2 & t) {
                const t = to(2);
                jr("appearance", t._formFieldAppearance)("color", t.color), ui(1), jr("value", t.pageSize)("disabled", t.disabled)("aria-label", t._intl.itemsPerPageLabel), ui(1), jr("ngForOf", t._displayedPageSizeOptions)
            }
        }

        function Nw(t, e) {
            if (1 & t && (Br(0, "div", 20), ko(1), Hr()), 2 & t) {
                const t = to(2);
                ui(1), Eo(t.pageSize)
            }
        }

        function Fw(t, e) {
            if (1 & t && (Br(0, "div", 12), Br(1, "div", 13), ko(2), Hr(), Mr(3, Pw, 3, 6, "mat-form-field", 14), Mr(4, Nw, 2, 1, "div", 15), Hr()), 2 & t) {
                const t = to();
                ui(2), Oo(" ", t._intl.itemsPerPageLabel, " "), ui(1), jr("ngIf", t._displayedPageSizeOptions.length > 1), ui(1), jr("ngIf", t._displayedPageSizeOptions.length <= 1)
            }
        }

        function Lw(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "button", 21), Yr("click", (function () {
                    return De(t), to().firstPage()
                })), sn(), Br(1, "svg", 7), Ur(2, "path", 22), Hr(), Hr()
            }
            if (2 & t) {
                const t = to();
                jr("matTooltip", t._intl.firstPageLabel)("matTooltipDisabled", t._previousButtonsDisabled())("matTooltipPosition", "above")("disabled", t._previousButtonsDisabled()), Fr("aria-label", t._intl.firstPageLabel)
            }
        }

        function Mw(t, e) {
            if (1 & t) {
                const t = Gr();
                sn(), rn(), Br(0, "button", 23), Yr("click", (function () {
                    return De(t), to().lastPage()
                })), sn(), Br(1, "svg", 7), Ur(2, "path", 24), Hr(), Hr()
            }
            if (2 & t) {
                const t = to();
                jr("matTooltip", t._intl.lastPageLabel)("matTooltipDisabled", t._nextButtonsDisabled())("matTooltipPosition", "above")("disabled", t._nextButtonsDisabled()), Fr("aria-label", t._intl.lastPageLabel)
            }
        }

        let Vw = (() => {
            class t {
                constructor() {
                    this.changes = new S, this.itemsPerPageLabel = "Items per page:", this.nextPageLabel = "Next page", this.previousPageLabel = "Previous page", this.firstPageLabel = "First page", this.lastPageLabel = "Last page", this.getRangeLabel = (t, e, n) => {
                        if (0 == n || 0 == e) return "0 of " + n;
                        const s = t * e;
                        return `${s + 1} \u2013 ${s < (n = Math.max(n, 0)) ? Math.min(s + e, n) : s + e} of ${n}`
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t
                }, token: t, providedIn: "root"
            }), t
        })();
        const jw = {
            provide: Vw, deps: [[new us, new ds, Vw]], useFactory: function (t) {
                return t || new Vw
            }
        }, zw = new $n("MAT_PAGINATOR_DEFAULT_OPTIONS");

        class Bw {
        }

        const Hw = B_(W_(Bw));
        let Uw = (() => {
            class t extends Hw {
                constructor(t, e, n) {
                    if (super(), this._intl = t, this._changeDetectorRef = e, this._pageIndex = 0, this._length = 0, this._pageSizeOptions = [], this._hidePageSize = !1, this._showFirstLastButtons = !1, this.page = new el, this._intlChanges = t.changes.subscribe(() => this._changeDetectorRef.markForCheck()), n) {
                        const {pageSize: t, pageSizeOptions: e, hidePageSize: s, showFirstLastButtons: i} = n;
                        null != t && (this._pageSize = t), null != e && (this._pageSizeOptions = e), null != s && (this._hidePageSize = s), null != i && (this._showFirstLastButtons = i)
                    }
                }

                get pageIndex() {
                    return this._pageIndex
                }

                set pageIndex(t) {
                    this._pageIndex = Math.max(Sf(t), 0), this._changeDetectorRef.markForCheck()
                }

                get length() {
                    return this._length
                }

                set length(t) {
                    this._length = Sf(t), this._changeDetectorRef.markForCheck()
                }

                get pageSize() {
                    return this._pageSize
                }

                set pageSize(t) {
                    this._pageSize = Math.max(Sf(t), 0), this._updateDisplayedPageSizeOptions()
                }

                get pageSizeOptions() {
                    return this._pageSizeOptions
                }

                set pageSizeOptions(t) {
                    this._pageSizeOptions = (t || []).map(t => Sf(t)), this._updateDisplayedPageSizeOptions()
                }

                get hidePageSize() {
                    return this._hidePageSize
                }

                set hidePageSize(t) {
                    this._hidePageSize = Cf(t)
                }

                get showFirstLastButtons() {
                    return this._showFirstLastButtons
                }

                set showFirstLastButtons(t) {
                    this._showFirstLastButtons = Cf(t)
                }

                ngOnInit() {
                    this._initialized = !0, this._updateDisplayedPageSizeOptions(), this._markInitialized()
                }

                ngOnDestroy() {
                    this._intlChanges.unsubscribe()
                }

                nextPage() {
                    if (!this.hasNextPage()) return;
                    const t = this.pageIndex;
                    this.pageIndex++, this._emitPageEvent(t)
                }

                previousPage() {
                    if (!this.hasPreviousPage()) return;
                    const t = this.pageIndex;
                    this.pageIndex--, this._emitPageEvent(t)
                }

                firstPage() {
                    if (!this.hasPreviousPage()) return;
                    const t = this.pageIndex;
                    this.pageIndex = 0, this._emitPageEvent(t)
                }

                lastPage() {
                    if (!this.hasNextPage()) return;
                    const t = this.pageIndex;
                    this.pageIndex = this.getNumberOfPages() - 1, this._emitPageEvent(t)
                }

                hasPreviousPage() {
                    return this.pageIndex >= 1 && 0 != this.pageSize
                }

                hasNextPage() {
                    const t = this.getNumberOfPages() - 1;
                    return this.pageIndex < t && 0 != this.pageSize
                }

                getNumberOfPages() {
                    return this.pageSize ? Math.ceil(this.length / this.pageSize) : 0
                }

                _changePageSize(t) {
                    const e = this.pageIndex;
                    this.pageIndex = Math.floor(this.pageIndex * this.pageSize / t) || 0, this.pageSize = t, this._emitPageEvent(e)
                }

                _nextButtonsDisabled() {
                    return this.disabled || !this.hasNextPage()
                }

                _previousButtonsDisabled() {
                    return this.disabled || !this.hasPreviousPage()
                }

                _updateDisplayedPageSizeOptions() {
                    this._initialized && (this.pageSize || (this._pageSize = 0 != this.pageSizeOptions.length ? this.pageSizeOptions[0] : 50), this._displayedPageSizeOptions = this.pageSizeOptions.slice(), -1 === this._displayedPageSizeOptions.indexOf(this.pageSize) && this._displayedPageSizeOptions.push(this.pageSize), this._displayedPageSizeOptions.sort((t, e) => t - e), this._changeDetectorRef.markForCheck())
                }

                _emitPageEvent(t) {
                    this.page.emit({
                        previousPageIndex: t,
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize,
                        length: this.length
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Vw), Vr(wa), Vr(void 0))
            }, t.\u0275dir = Zt({
                type: t,
                inputs: {
                    pageIndex: "pageIndex",
                    length: "length",
                    pageSize: "pageSize",
                    pageSizeOptions: "pageSizeOptions",
                    hidePageSize: "hidePageSize",
                    showFirstLastButtons: "showFirstLastButtons",
                    color: "color"
                },
                outputs: {page: "page"},
                features: [Sr]
            }), t
        })(), $w = (() => {
            class t extends Uw {
                constructor(t, e, n) {
                    super(t, e, n), n && null != n.formFieldAppearance && (this._formFieldAppearance = n.formFieldAppearance)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Vw), Vr(wa), Vr(zw, 8))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-paginator"]],
                hostAttrs: [1, "mat-paginator"],
                inputs: {disabled: "disabled"},
                exportAs: ["matPaginator"],
                features: [Sr],
                decls: 14,
                vars: 14,
                consts: [[1, "mat-paginator-outer-container"], [1, "mat-paginator-container"], ["class", "mat-paginator-page-size", 4, "ngIf"], [1, "mat-paginator-range-actions"], [1, "mat-paginator-range-label"], ["mat-icon-button", "", "type", "button", "class", "mat-paginator-navigation-first", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click", 4, "ngIf"], ["mat-icon-button", "", "type", "button", 1, "mat-paginator-navigation-previous", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click"], ["viewBox", "0 0 24 24", "focusable", "false", 1, "mat-paginator-icon"], ["d", "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"], ["mat-icon-button", "", "type", "button", 1, "mat-paginator-navigation-next", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click"], ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"], ["mat-icon-button", "", "type", "button", "class", "mat-paginator-navigation-last", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click", 4, "ngIf"], [1, "mat-paginator-page-size"], [1, "mat-paginator-page-size-label"], ["class", "mat-paginator-page-size-select", 3, "appearance", "color", 4, "ngIf"], ["class", "mat-paginator-page-size-value", 4, "ngIf"], [1, "mat-paginator-page-size-select", 3, "appearance", "color"], [3, "value", "disabled", "aria-label", "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "mat-paginator-page-size-value"], ["mat-icon-button", "", "type", "button", 1, "mat-paginator-navigation-first", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click"], ["d", "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"], ["mat-icon-button", "", "type", "button", 1, "mat-paginator-navigation-last", 3, "matTooltip", "matTooltipDisabled", "matTooltipPosition", "disabled", "click"], ["d", "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"]],
                template: function (t, e) {
                    1 & t && (Br(0, "div", 0), Br(1, "div", 1), Mr(2, Fw, 5, 3, "div", 2), Br(3, "div", 3), Br(4, "div", 4), ko(5), Hr(), Mr(6, Lw, 3, 5, "button", 5), Br(7, "button", 6), Yr("click", (function () {
                        return e.previousPage()
                    })), sn(), Br(8, "svg", 7), Ur(9, "path", 8), Hr(), Hr(), rn(), Br(10, "button", 9), Yr("click", (function () {
                        return e.nextPage()
                    })), sn(), Br(11, "svg", 7), Ur(12, "path", 10), Hr(), Hr(), Mr(13, Mw, 3, 5, "button", 11), Hr(), Hr(), Hr()), 2 & t && (ui(2), jr("ngIf", !e.hidePageSize), ui(3), Oo(" ", e._intl.getRangeLabel(e.pageIndex, e.pageSize, e.length), " "), ui(1), jr("ngIf", e.showFirstLastButtons), ui(1), jr("matTooltip", e._intl.previousPageLabel)("matTooltipDisabled", e._previousButtonsDisabled())("matTooltipPosition", "above")("disabled", e._previousButtonsDisabled()), Fr("aria-label", e._intl.previousPageLabel), ui(3), jr("matTooltip", e._intl.nextPageLabel)("matTooltipDisabled", e._nextButtonsDisabled())("matTooltipPosition", "above")("disabled", e._nextButtonsDisabled()), Fr("aria-label", e._intl.nextPageLabel), ui(3), jr("ngIf", e.showFirstLastButtons))
                },
                directives: [qc, Cy, Tw, ov, pw, Uc, fy],
                styles: [".mat-paginator{display:block}.mat-paginator-outer-container{display:flex}.mat-paginator-container{display:flex;align-items:center;justify-content:flex-end;padding:0 8px;flex-wrap:wrap-reverse;width:100%}.mat-paginator-page-size{display:flex;align-items:baseline;margin-right:8px}[dir=rtl] .mat-paginator-page-size{margin-right:0;margin-left:8px}.mat-paginator-page-size-label{margin:0 4px}.mat-paginator-page-size-select{margin:6px 4px 0 4px;width:56px}.mat-paginator-page-size-select.mat-form-field-appearance-outline{width:64px}.mat-paginator-page-size-select.mat-form-field-appearance-fill{width:64px}.mat-paginator-range-label{margin:0 32px 0 24px}.mat-paginator-range-actions{display:flex;align-items:center}.mat-paginator-icon{width:28px;fill:currentColor}[dir=rtl] .mat-paginator-icon{transform:rotate(180deg)}\n"],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })(), qw = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({providers: [jw], imports: [[sh, Sy, mw, Dw, z_]]}), t
        })();

        function Ww(t, e) {
            if (1 & t && (sn(), Ur(0, "circle", 3)), 2 & t) {
                const t = to();
                po("animation-name", "mat-progress-spinner-stroke-rotate-" + t._spinnerAnimationLabel)("stroke-dashoffset", t._getStrokeDashOffset(), "px")("stroke-dasharray", t._getStrokeCircumference(), "px")("stroke-width", t._getCircleStrokeWidth(), "%"), Fr("r", t._getCircleRadius())
            }
        }

        function Gw(t, e) {
            if (1 & t && (sn(), Ur(0, "circle", 3)), 2 & t) {
                const t = to();
                po("stroke-dashoffset", t._getStrokeDashOffset(), "px")("stroke-dasharray", t._getStrokeCircumference(), "px")("stroke-width", t._getCircleStrokeWidth(), "%"), Fr("r", t._getCircleRadius())
            }
        }

        function Kw(t, e) {
            if (1 & t && (sn(), Ur(0, "circle", 3)), 2 & t) {
                const t = to();
                po("animation-name", "mat-progress-spinner-stroke-rotate-" + t._spinnerAnimationLabel)("stroke-dashoffset", t._getStrokeDashOffset(), "px")("stroke-dasharray", t._getStrokeCircumference(), "px")("stroke-width", t._getCircleStrokeWidth(), "%"), Fr("r", t._getCircleRadius())
            }
        }

        function Zw(t, e) {
            if (1 & t && (sn(), Ur(0, "circle", 3)), 2 & t) {
                const t = to();
                po("stroke-dashoffset", t._getStrokeDashOffset(), "px")("stroke-dasharray", t._getStrokeCircumference(), "px")("stroke-width", t._getCircleStrokeWidth(), "%"), Fr("r", t._getCircleRadius())
            }
        }

        const Qw = ".mat-progress-spinner{display:block;position:relative;overflow:hidden}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:currentColor}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] svg{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] svg{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] svg{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] svg{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n";

        class Yw {
            constructor(t) {
                this._elementRef = t
            }
        }

        const Xw = H_(Yw, "primary"), Jw = new $n("mat-progress-spinner-default-options", {
            providedIn: "root", factory: function () {
                return {diameter: 100}
            }
        });
        let tC = (() => {
            class t extends Xw {
                constructor(e, n, s, i, r) {
                    super(e), this._elementRef = e, this._document = s, this._diameter = 100, this._value = 0, this._fallbackAnimation = !1, this.mode = "determinate";
                    const o = t._diameters;
                    this._spinnerAnimationLabel = this._getSpinnerAnimationLabel(), o.has(s.head) || o.set(s.head, new Set([100])), this._fallbackAnimation = n.EDGE || n.TRIDENT, this._noopAnimations = "NoopAnimations" === i && !!r && !r._forceAnimations, r && (r.diameter && (this.diameter = r.diameter), r.strokeWidth && (this.strokeWidth = r.strokeWidth))
                }

                get diameter() {
                    return this._diameter
                }

                set diameter(t) {
                    this._diameter = Sf(t), this._spinnerAnimationLabel = this._getSpinnerAnimationLabel(), !this._fallbackAnimation && this._styleRoot && this._attachStyleNode()
                }

                get strokeWidth() {
                    return this._strokeWidth || this.diameter / 10
                }

                set strokeWidth(t) {
                    this._strokeWidth = Sf(t)
                }

                get value() {
                    return "determinate" === this.mode ? this._value : 0
                }

                set value(t) {
                    this._value = Math.max(0, Math.min(100, Sf(t)))
                }

                ngOnInit() {
                    const t = this._elementRef.nativeElement;
                    this._styleRoot = Lf(t) || this._document.head, this._attachStyleNode(), t.classList.add(`mat-progress-spinner-indeterminate${this._fallbackAnimation ? "-fallback" : ""}-animation`)
                }

                _getCircleRadius() {
                    return (this.diameter - 10) / 2
                }

                _getViewBox() {
                    const t = 2 * this._getCircleRadius() + this.strokeWidth;
                    return `0 0 ${t} ${t}`
                }

                _getStrokeCircumference() {
                    return 2 * Math.PI * this._getCircleRadius()
                }

                _getStrokeDashOffset() {
                    return "determinate" === this.mode ? this._getStrokeCircumference() * (100 - this._value) / 100 : this._fallbackAnimation && "indeterminate" === this.mode ? .2 * this._getStrokeCircumference() : null
                }

                _getCircleStrokeWidth() {
                    return this.strokeWidth / this.diameter * 100
                }

                _attachStyleNode() {
                    const e = this._styleRoot, n = this._diameter, s = t._diameters;
                    let i = s.get(e);
                    if (!i || !i.has(n)) {
                        const t = this._document.createElement("style");
                        t.setAttribute("mat-spinner-animation", this._spinnerAnimationLabel), t.textContent = this._getAnimationText(), e.appendChild(t), i || (i = new Set, s.set(e, i)), i.add(n)
                    }
                }

                _getAnimationText() {
                    const t = this._getStrokeCircumference();
                    return "\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n".replace(/START_VALUE/g, "" + .95 * t).replace(/END_VALUE/g, "" + .2 * t).replace(/DIAMETER/g, "" + this._spinnerAnimationLabel)
                }

                _getSpinnerAnimationLabel() {
                    return this.diameter.toString().replace(".", "_")
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Qo), Vr(If), Vr(bc, 8), Vr(D_, 8), Vr(Jw))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-progress-spinner"]],
                hostAttrs: ["role", "progressbar", 1, "mat-progress-spinner"],
                hostVars: 10,
                hostBindings: function (t, e) {
                    2 & t && (Fr("aria-valuemin", "determinate" === e.mode ? 0 : null)("aria-valuemax", "determinate" === e.mode ? 100 : null)("aria-valuenow", "determinate" === e.mode ? e.value : null)("mode", e.mode), po("width", e.diameter, "px")("height", e.diameter, "px"), fo("_mat-animation-noopable", e._noopAnimations))
                },
                inputs: {
                    color: "color",
                    mode: "mode",
                    diameter: "diameter",
                    strokeWidth: "strokeWidth",
                    value: "value"
                },
                exportAs: ["matProgressSpinner"],
                features: [Sr],
                decls: 3,
                vars: 8,
                consts: [["preserveAspectRatio", "xMidYMid meet", "focusable", "false", 3, "ngSwitch"], ["cx", "50%", "cy", "50%", 3, "animation-name", "stroke-dashoffset", "stroke-dasharray", "stroke-width", 4, "ngSwitchCase"], ["cx", "50%", "cy", "50%", 3, "stroke-dashoffset", "stroke-dasharray", "stroke-width", 4, "ngSwitchCase"], ["cx", "50%", "cy", "50%"]],
                template: function (t, e) {
                    1 & t && (sn(), Br(0, "svg", 0), Mr(1, Ww, 1, 9, "circle", 1), Mr(2, Gw, 1, 7, "circle", 2), Hr()), 2 & t && (po("width", e.diameter, "px")("height", e.diameter, "px"), jr("ngSwitch", "indeterminate" === e.mode), Fr("viewBox", e._getViewBox()), ui(1), jr("ngSwitchCase", !0), ui(1), jr("ngSwitchCase", !1))
                },
                directives: [Zc, Qc],
                styles: [Qw],
                encapsulation: 2,
                changeDetection: 0
            }), t._diameters = new WeakMap, t
        })(), eC = (() => {
            class t extends tC {
                constructor(t, e, n, s, i) {
                    super(t, e, n, s, i), this.mode = "indeterminate"
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Qo), Vr(If), Vr(bc, 8), Vr(D_, 8), Vr(Jw))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-spinner"]],
                hostAttrs: ["role", "progressbar", "mode", "indeterminate", 1, "mat-spinner", "mat-progress-spinner"],
                hostVars: 6,
                hostBindings: function (t, e) {
                    2 & t && (po("width", e.diameter, "px")("height", e.diameter, "px"), fo("_mat-animation-noopable", e._noopAnimations))
                },
                inputs: {color: "color"},
                features: [Sr],
                decls: 3,
                vars: 8,
                consts: [["preserveAspectRatio", "xMidYMid meet", "focusable", "false", 3, "ngSwitch"], ["cx", "50%", "cy", "50%", 3, "animation-name", "stroke-dashoffset", "stroke-dasharray", "stroke-width", 4, "ngSwitchCase"], ["cx", "50%", "cy", "50%", 3, "stroke-dashoffset", "stroke-dasharray", "stroke-width", 4, "ngSwitchCase"], ["cx", "50%", "cy", "50%"]],
                template: function (t, e) {
                    1 & t && (sn(), Br(0, "svg", 0), Mr(1, Kw, 1, 9, "circle", 1), Mr(2, Zw, 1, 7, "circle", 2), Hr()), 2 & t && (po("width", e.diameter, "px")("height", e.diameter, "px"), jr("ngSwitch", "indeterminate" === e.mode), Fr("viewBox", e._getViewBox()), ui(1), jr("ngSwitchCase", !0), ui(1), jr("ngSwitchCase", !1))
                },
                directives: [Zc, Qc],
                styles: [Qw],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })(), nC = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[z_, sh], z_]}), t
        })();

        class sC {
        }

        class iC {
        }

        class rC {
            constructor(t) {
                this.normalizedNames = new Map, this.lazyUpdate = null, t ? this.lazyInit = "string" == typeof t ? () => {
                    this.headers = new Map, t.split("\n").forEach(t => {
                        const e = t.indexOf(":");
                        if (e > 0) {
                            const n = t.slice(0, e), s = n.toLowerCase(), i = t.slice(e + 1).trim();
                            this.maybeSetNormalizedName(n, s), this.headers.has(s) ? this.headers.get(s).push(i) : this.headers.set(s, [i])
                        }
                    })
                } : () => {
                    this.headers = new Map, Object.keys(t).forEach(e => {
                        let n = t[e];
                        const s = e.toLowerCase();
                        "string" == typeof n && (n = [n]), n.length > 0 && (this.headers.set(s, n), this.maybeSetNormalizedName(e, s))
                    })
                } : this.headers = new Map
            }

            has(t) {
                return this.init(), this.headers.has(t.toLowerCase())
            }

            get(t) {
                this.init();
                const e = this.headers.get(t.toLowerCase());
                return e && e.length > 0 ? e[0] : null
            }

            keys() {
                return this.init(), Array.from(this.normalizedNames.values())
            }

            getAll(t) {
                return this.init(), this.headers.get(t.toLowerCase()) || null
            }

            append(t, e) {
                return this.clone({name: t, value: e, op: "a"})
            }

            set(t, e) {
                return this.clone({name: t, value: e, op: "s"})
            }

            delete(t, e) {
                return this.clone({name: t, value: e, op: "d"})
            }

            maybeSetNormalizedName(t, e) {
                this.normalizedNames.has(e) || this.normalizedNames.set(e, t)
            }

            init() {
                this.lazyInit && (this.lazyInit instanceof rC ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(t => this.applyUpdate(t)), this.lazyUpdate = null))
            }

            copyFrom(t) {
                t.init(), Array.from(t.headers.keys()).forEach(e => {
                    this.headers.set(e, t.headers.get(e)), this.normalizedNames.set(e, t.normalizedNames.get(e))
                })
            }

            clone(t) {
                const e = new rC;
                return e.lazyInit = this.lazyInit && this.lazyInit instanceof rC ? this.lazyInit : this, e.lazyUpdate = (this.lazyUpdate || []).concat([t]), e
            }

            applyUpdate(t) {
                const e = t.name.toLowerCase();
                switch (t.op) {
                    case"a":
                    case"s":
                        let n = t.value;
                        if ("string" == typeof n && (n = [n]), 0 === n.length) return;
                        this.maybeSetNormalizedName(t.name, e);
                        const s = ("a" === t.op ? this.headers.get(e) : void 0) || [];
                        s.push(...n), this.headers.set(e, s);
                        break;
                    case"d":
                        const i = t.value;
                        if (i) {
                            let t = this.headers.get(e);
                            if (!t) return;
                            t = t.filter(t => -1 === i.indexOf(t)), 0 === t.length ? (this.headers.delete(e), this.normalizedNames.delete(e)) : this.headers.set(e, t)
                        } else this.headers.delete(e), this.normalizedNames.delete(e)
                }
            }

            forEach(t) {
                this.init(), Array.from(this.normalizedNames.keys()).forEach(e => t(this.normalizedNames.get(e), this.headers.get(e)))
            }
        }

        class oC {
            encodeKey(t) {
                return aC(t)
            }

            encodeValue(t) {
                return aC(t)
            }

            decodeKey(t) {
                return decodeURIComponent(t)
            }

            decodeValue(t) {
                return decodeURIComponent(t)
            }
        }

        function aC(t) {
            return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/gi, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%3F/gi, "?").replace(/%2F/gi, "/")
        }

        class lC {
            constructor(t = {}) {
                if (this.updates = null, this.cloneFrom = null, this.encoder = t.encoder || new oC, t.fromString) {
                    if (t.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                    this.map = function (t, e) {
                        const n = new Map;
                        return t.length > 0 && t.replace(/^\?/, "").split("&").forEach(t => {
                            const s = t.indexOf("="), [i, r] = -1 == s ? [e.decodeKey(t), ""] : [e.decodeKey(t.slice(0, s)), e.decodeValue(t.slice(s + 1))],
                                o = n.get(i) || [];
                            o.push(r), n.set(i, o)
                        }), n
                    }(t.fromString, this.encoder)
                } else t.fromObject ? (this.map = new Map, Object.keys(t.fromObject).forEach(e => {
                    const n = t.fromObject[e];
                    this.map.set(e, Array.isArray(n) ? n : [n])
                })) : this.map = null
            }

            has(t) {
                return this.init(), this.map.has(t)
            }

            get(t) {
                this.init();
                const e = this.map.get(t);
                return e ? e[0] : null
            }

            getAll(t) {
                return this.init(), this.map.get(t) || null
            }

            keys() {
                return this.init(), Array.from(this.map.keys())
            }

            append(t, e) {
                return this.clone({param: t, value: e, op: "a"})
            }

            appendAll(t) {
                const e = [];
                return Object.keys(t).forEach(n => {
                    const s = t[n];
                    Array.isArray(s) ? s.forEach(t => {
                        e.push({param: n, value: t, op: "a"})
                    }) : e.push({param: n, value: s, op: "a"})
                }), this.clone(e)
            }

            set(t, e) {
                return this.clone({param: t, value: e, op: "s"})
            }

            delete(t, e) {
                return this.clone({param: t, value: e, op: "d"})
            }

            toString() {
                return this.init(), this.keys().map(t => {
                    const e = this.encoder.encodeKey(t);
                    return this.map.get(t).map(t => e + "=" + this.encoder.encodeValue(t)).join("&")
                }).filter(t => "" !== t).join("&")
            }

            clone(t) {
                const e = new lC({encoder: this.encoder});
                return e.cloneFrom = this.cloneFrom || this, e.updates = (this.updates || []).concat(t), e
            }

            init() {
                null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(t => this.map.set(t, this.cloneFrom.map.get(t))), this.updates.forEach(t => {
                    switch (t.op) {
                        case"a":
                        case"s":
                            const e = ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                            e.push(t.value), this.map.set(t.param, e);
                            break;
                        case"d":
                            if (void 0 === t.value) {
                                this.map.delete(t.param);
                                break
                            }
                        {
                            let e = this.map.get(t.param) || [];
                            const n = e.indexOf(t.value);
                            -1 !== n && e.splice(n, 1), e.length > 0 ? this.map.set(t.param, e) : this.map.delete(t.param)
                        }
                    }
                }), this.cloneFrom = this.updates = null)
            }
        }

        function cC(t) {
            return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
        }

        function hC(t) {
            return "undefined" != typeof Blob && t instanceof Blob
        }

        function uC(t) {
            return "undefined" != typeof FormData && t instanceof FormData
        }

        class dC {
            constructor(t, e, n, s) {
                let i;
                if (this.url = e, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = t.toUpperCase(), function (t) {
                    switch (t) {
                        case"DELETE":
                        case"GET":
                        case"HEAD":
                        case"OPTIONS":
                        case"JSONP":
                            return !1;
                        default:
                            return !0
                    }
                }(this.method) || s ? (this.body = void 0 !== n ? n : null, i = s) : i = n, i && (this.reportProgress = !!i.reportProgress, this.withCredentials = !!i.withCredentials, i.responseType && (this.responseType = i.responseType), i.headers && (this.headers = i.headers), i.params && (this.params = i.params)), this.headers || (this.headers = new rC), this.params) {
                    const t = this.params.toString();
                    if (0 === t.length) this.urlWithParams = e; else {
                        const n = e.indexOf("?");
                        this.urlWithParams = e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t
                    }
                } else this.params = new lC, this.urlWithParams = e
            }

            serializeBody() {
                return null === this.body ? null : cC(this.body) || hC(this.body) || uC(this.body) || "string" == typeof this.body ? this.body : this.body instanceof lC ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
            }

            detectContentTypeHeader() {
                return null === this.body || uC(this.body) ? null : hC(this.body) ? this.body.type || null : cC(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof lC ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || Array.isArray(this.body) ? "application/json" : null
            }

            clone(t = {}) {
                const e = t.method || this.method, n = t.url || this.url, s = t.responseType || this.responseType,
                    i = void 0 !== t.body ? t.body : this.body,
                    r = void 0 !== t.withCredentials ? t.withCredentials : this.withCredentials,
                    o = void 0 !== t.reportProgress ? t.reportProgress : this.reportProgress;
                let a = t.headers || this.headers, l = t.params || this.params;
                return void 0 !== t.setHeaders && (a = Object.keys(t.setHeaders).reduce((e, n) => e.set(n, t.setHeaders[n]), a)), t.setParams && (l = Object.keys(t.setParams).reduce((e, n) => e.set(n, t.setParams[n]), l)), new dC(e, n, i, {
                    params: l,
                    headers: a,
                    reportProgress: o,
                    responseType: s,
                    withCredentials: r
                })
            }
        }

        var pC = function (t) {
            return t[t.Sent = 0] = "Sent", t[t.UploadProgress = 1] = "UploadProgress", t[t.ResponseHeader = 2] = "ResponseHeader", t[t.DownloadProgress = 3] = "DownloadProgress", t[t.Response = 4] = "Response", t[t.User = 5] = "User", t
        }({});

        class fC {
            constructor(t, e = 200, n = "OK") {
                this.headers = t.headers || new rC, this.status = void 0 !== t.status ? t.status : e, this.statusText = t.statusText || n, this.url = t.url || null, this.ok = this.status >= 200 && this.status < 300
            }
        }

        class mC extends fC {
            constructor(t = {}) {
                super(t), this.type = pC.ResponseHeader
            }

            clone(t = {}) {
                return new mC({
                    headers: t.headers || this.headers,
                    status: void 0 !== t.status ? t.status : this.status,
                    statusText: t.statusText || this.statusText,
                    url: t.url || this.url || void 0
                })
            }
        }

        class gC extends fC {
            constructor(t = {}) {
                super(t), this.type = pC.Response, this.body = void 0 !== t.body ? t.body : null
            }

            clone(t = {}) {
                return new gC({
                    body: void 0 !== t.body ? t.body : this.body,
                    headers: t.headers || this.headers,
                    status: void 0 !== t.status ? t.status : this.status,
                    statusText: t.statusText || this.statusText,
                    url: t.url || this.url || void 0
                })
            }
        }

        class _C extends fC {
            constructor(t) {
                super(t, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? "Http failure during parsing for " + (t.url || "(unknown url)") : `Http failure response for ${t.url || "(unknown url)"}: ${t.status} ${t.statusText}`, this.error = t.error || null
            }
        }

        function yC(t, e) {
            return {
                body: e,
                headers: t.headers,
                observe: t.observe,
                params: t.params,
                reportProgress: t.reportProgress,
                responseType: t.responseType,
                withCredentials: t.withCredentials
            }
        }

        let bC = (() => {
            class t {
                constructor(t) {
                    this.handler = t
                }

                request(t, e, n = {}) {
                    let s;
                    if (t instanceof dC) s = t; else {
                        let i = void 0;
                        i = n.headers instanceof rC ? n.headers : new rC(n.headers);
                        let r = void 0;
                        n.params && (r = n.params instanceof lC ? n.params : new lC({fromObject: n.params})), s = new dC(t, e, void 0 !== n.body ? n.body : null, {
                            headers: i,
                            params: r,
                            reportProgress: n.reportProgress,
                            responseType: n.responseType || "json",
                            withCredentials: n.withCredentials
                        })
                    }
                    const i = Lh(s).pipe(hu(t => this.handler.handle(t)));
                    if (t instanceof dC || "events" === n.observe) return i;
                    const r = i.pipe(iu(t => t instanceof gC));
                    switch (n.observe || "body") {
                        case"body":
                            switch (s.responseType) {
                                case"arraybuffer":
                                    return r.pipe(F(t => {
                                        if (null !== t.body && !(t.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                        return t.body
                                    }));
                                case"blob":
                                    return r.pipe(F(t => {
                                        if (null !== t.body && !(t.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                        return t.body
                                    }));
                                case"text":
                                    return r.pipe(F(t => {
                                        if (null !== t.body && "string" != typeof t.body) throw new Error("Response is not a string.");
                                        return t.body
                                    }));
                                case"json":
                                default:
                                    return r.pipe(F(t => t.body))
                            }
                        case"response":
                            return r;
                        default:
                            throw new Error(`Unreachable: unhandled observe type ${n.observe}}`)
                    }
                }

                delete(t, e = {}) {
                    return this.request("DELETE", t, e)
                }

                get(t, e = {}) {
                    return this.request("GET", t, e)
                }

                head(t, e = {}) {
                    return this.request("HEAD", t, e)
                }

                jsonp(t, e) {
                    return this.request("JSONP", t, {
                        params: (new lC).append(e, "JSONP_CALLBACK"),
                        observe: "body",
                        responseType: "json"
                    })
                }

                options(t, e = {}) {
                    return this.request("OPTIONS", t, e)
                }

                patch(t, e, n = {}) {
                    return this.request("PATCH", t, yC(n, e))
                }

                post(t, e, n = {}) {
                    return this.request("POST", t, yC(n, e))
                }

                put(t, e, n = {}) {
                    return this.request("PUT", t, yC(n, e))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(sC))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class vC {
            constructor(t, e) {
                this.next = t, this.interceptor = e
            }

            handle(t) {
                return this.interceptor.intercept(t, this.next)
            }
        }

        const wC = new $n("HTTP_INTERCEPTORS");
        let CC = (() => {
            class t {
                intercept(t, e) {
                    return e.handle(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const SC = /^\)\]\}',?\n/;

        class xC {
        }

        let kC = (() => {
            class t {
                constructor() {
                }

                build() {
                    return new XMLHttpRequest
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), EC = (() => {
            class t {
                constructor(t) {
                    this.xhrFactory = t
                }

                handle(t) {
                    if ("JSONP" === t.method) throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");
                    return new y(e => {
                        const n = this.xhrFactory.build();
                        if (n.open(t.method, t.urlWithParams), t.withCredentials && (n.withCredentials = !0), t.headers.forEach((t, e) => n.setRequestHeader(t, e.join(","))), t.headers.has("Accept") || n.setRequestHeader("Accept", "application/json, text/plain, */*"), !t.headers.has("Content-Type")) {
                            const e = t.detectContentTypeHeader();
                            null !== e && n.setRequestHeader("Content-Type", e)
                        }
                        if (t.responseType) {
                            const e = t.responseType.toLowerCase();
                            n.responseType = "json" !== e ? e : "text"
                        }
                        const s = t.serializeBody();
                        let i = null;
                        const r = () => {
                            if (null !== i) return i;
                            const e = 1223 === n.status ? 204 : n.status, s = n.statusText || "OK",
                                r = new rC(n.getAllResponseHeaders()), o = function (t) {
                                    return "responseURL" in t && t.responseURL ? t.responseURL : /^X-Request-URL:/m.test(t.getAllResponseHeaders()) ? t.getResponseHeader("X-Request-URL") : null
                                }(n) || t.url;
                            return i = new mC({headers: r, status: e, statusText: s, url: o}), i
                        }, o = () => {
                            let {headers: s, status: i, statusText: o, url: a} = r(), l = null;
                            204 !== i && (l = void 0 === n.response ? n.responseText : n.response), 0 === i && (i = l ? 200 : 0);
                            let c = i >= 200 && i < 300;
                            if ("json" === t.responseType && "string" == typeof l) {
                                const t = l;
                                l = l.replace(SC, "");
                                try {
                                    l = "" !== l ? JSON.parse(l) : null
                                } catch (h) {
                                    l = t, c && (c = !1, l = {error: h, text: l})
                                }
                            }
                            c ? (e.next(new gC({
                                body: l,
                                headers: s,
                                status: i,
                                statusText: o,
                                url: a || void 0
                            })), e.complete()) : e.error(new _C({
                                error: l,
                                headers: s,
                                status: i,
                                statusText: o,
                                url: a || void 0
                            }))
                        }, a = t => {
                            const {url: s} = r(), i = new _C({
                                error: t,
                                status: n.status || 0,
                                statusText: n.statusText || "Unknown Error",
                                url: s || void 0
                            });
                            e.error(i)
                        };
                        let l = !1;
                        const c = s => {
                            l || (e.next(r()), l = !0);
                            let i = {type: pC.DownloadProgress, loaded: s.loaded};
                            s.lengthComputable && (i.total = s.total), "text" === t.responseType && n.responseText && (i.partialText = n.responseText), e.next(i)
                        }, h = t => {
                            let n = {type: pC.UploadProgress, loaded: t.loaded};
                            t.lengthComputable && (n.total = t.total), e.next(n)
                        };
                        return n.addEventListener("load", o), n.addEventListener("error", a), n.addEventListener("timeout", a), n.addEventListener("abort", a), t.reportProgress && (n.addEventListener("progress", c), null !== s && n.upload && n.upload.addEventListener("progress", h)), n.send(s), e.next({type: pC.Sent}), () => {
                            n.removeEventListener("error", a), n.removeEventListener("abort", a), n.removeEventListener("load", o), n.removeEventListener("timeout", a), t.reportProgress && (n.removeEventListener("progress", c), null !== s && n.upload && n.upload.removeEventListener("progress", h)), n.readyState !== n.DONE && n.abort()
                        }
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(xC))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const OC = new $n("XSRF_COOKIE_NAME"), RC = new $n("XSRF_HEADER_NAME");

        class TC {
        }

        let AC = (() => {
            class t {
                constructor(t, e, n) {
                    this.doc = t, this.platform = e, this.cookieName = n, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
                }

                getToken() {
                    if ("server" === this.platform) return null;
                    const t = this.doc.cookie || "";
                    return t !== this.lastCookieString && (this.parseCount++, this.lastToken = zc(t, this.cookieName), this.lastCookieString = t), this.lastToken
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc), os(kl), os(OC))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), DC = (() => {
            class t {
                constructor(t, e) {
                    this.tokenService = t, this.headerName = e
                }

                intercept(t, e) {
                    const n = t.url.toLowerCase();
                    if ("GET" === t.method || "HEAD" === t.method || n.startsWith("http://") || n.startsWith("https://")) return e.handle(t);
                    const s = this.tokenService.getToken();
                    return null === s || t.headers.has(this.headerName) || (t = t.clone({headers: t.headers.set(this.headerName, s)})), e.handle(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(TC), os(RC))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), IC = (() => {
            class t {
                constructor(t, e) {
                    this.backend = t, this.injector = e, this.chain = null
                }

                handle(t) {
                    if (null === this.chain) {
                        const t = this.injector.get(wC, []);
                        this.chain = t.reduceRight((t, e) => new vC(t, e), this.backend)
                    }
                    return this.chain.handle(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(iC), os(wr))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), PC = (() => {
            class t {
                static disable() {
                    return {ngModule: t, providers: [{provide: DC, useClass: CC}]}
                }

                static withOptions(e = {}) {
                    return {
                        ngModule: t,
                        providers: [e.cookieName ? {
                            provide: OC,
                            useValue: e.cookieName
                        } : [], e.headerName ? {provide: RC, useValue: e.headerName} : []]
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({
                providers: [DC, {
                    provide: wC,
                    useExisting: DC,
                    multi: !0
                }, {provide: TC, useClass: AC}, {provide: OC, useValue: "XSRF-TOKEN"}, {
                    provide: RC,
                    useValue: "X-XSRF-TOKEN"
                }]
            }), t
        })(), NC = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({
                providers: [bC, {
                    provide: sC,
                    useClass: IC
                }, EC, {provide: iC, useExisting: EC}, kC, {provide: xC, useExisting: kC}],
                imports: [[PC.withOptions({cookieName: "XSRF-TOKEN", headerName: "X-XSRF-TOKEN"})]]
            }), t
        })();
        const FC = [[["caption"]], [["colgroup"], ["col"]]], LC = ["caption", "colgroup, col"];

        function MC(t) {
            return class extends t {
                constructor(...t) {
                    super(...t), this._sticky = !1, this._hasStickyChanged = !1
                }

                get sticky() {
                    return this._sticky
                }

                set sticky(t) {
                    const e = this._sticky;
                    this._sticky = Cf(t), this._hasStickyChanged = e !== this._sticky
                }

                hasStickyChanged() {
                    const t = this._hasStickyChanged;
                    return this._hasStickyChanged = !1, t
                }

                resetStickyChanged() {
                    this._hasStickyChanged = !1
                }
            }
        }

        const VC = new $n("CDK_TABLE");
        let jC = (() => {
            class t {
                constructor(t) {
                    this.template = t
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Oa))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "cdkCellDef", ""]]}), t
        })(), zC = (() => {
            class t {
                constructor(t) {
                    this.template = t
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Oa))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "cdkHeaderCellDef", ""]]}), t
        })(), BC = (() => {
            class t {
                constructor(t) {
                    this.template = t
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Oa))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "cdkFooterCellDef", ""]]}), t
        })();

        class HC {
        }

        const UC = MC(HC);
        let $C = (() => {
            class t extends UC {
                constructor(t) {
                    super(), this._table = t, this._stickyEnd = !1
                }

                get name() {
                    return this._name
                }

                set name(t) {
                    this._setNameInput(t)
                }

                get stickyEnd() {
                    return this._stickyEnd
                }

                set stickyEnd(t) {
                    const e = this._stickyEnd;
                    this._stickyEnd = Cf(t), this._hasStickyChanged = e !== this._stickyEnd
                }

                _updateColumnCssClassName() {
                    this._columnCssClassName = ["cdk-column-" + this.cssClassFriendlyName]
                }

                _setNameInput(t) {
                    t && (this._name = t, this.cssClassFriendlyName = t.replace(/[^a-z0-9_-]/gi, "-"), this._updateColumnCssClassName())
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(VC, 8))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "cdkColumnDef", ""]],
                contentQueries: function (t, e, n) {
                    if (1 & t && (fl(n, jC, 1), fl(n, zC, 1), fl(n, BC, 1)), 2 & t) {
                        let t;
                        dl(t = ml()) && (e.cell = t.first), dl(t = ml()) && (e.headerCell = t.first), dl(t = ml()) && (e.footerCell = t.first)
                    }
                },
                inputs: {sticky: "sticky", name: ["cdkColumnDef", "name"], stickyEnd: "stickyEnd"},
                features: [Uo([{provide: "MAT_SORT_HEADER_COLUMN_DEF", useExisting: t}]), Sr]
            }), t
        })();

        class qC {
            constructor(t, e) {
                const n = e.nativeElement.classList;
                for (const s of t._columnCssClassName) n.add(s)
            }
        }

        let WC = (() => {
            class t extends qC {
                constructor(t, e) {
                    super(t, e)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr($C), Vr(Qo))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["cdk-header-cell"], ["th", "cdk-header-cell", ""]],
                hostAttrs: ["role", "columnheader", 1, "cdk-header-cell"],
                features: [Sr]
            }), t
        })(), GC = (() => {
            class t extends qC {
                constructor(t, e) {
                    super(t, e)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr($C), Vr(Qo))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["cdk-cell"], ["td", "cdk-cell", ""]],
                hostAttrs: ["role", "gridcell", 1, "cdk-cell"],
                features: [Sr]
            }), t
        })();

        class KC {
            constructor() {
                this.tasks = [], this.endTasks = []
            }
        }

        const ZC = new $n("_COALESCED_STYLE_SCHEDULER");
        let QC = (() => {
            class t {
                constructor(t) {
                    this._ngZone = t, this._currentSchedule = null, this._destroyed = new S
                }

                schedule(t) {
                    this._createScheduleIfNeeded(), this._currentSchedule.tasks.push(t)
                }

                scheduleEnd(t) {
                    this._createScheduleIfNeeded(), this._currentSchedule.endTasks.push(t)
                }

                ngOnDestroy() {
                    this._destroyed.next(), this._destroyed.complete()
                }

                _createScheduleIfNeeded() {
                    this._currentSchedule || (this._currentSchedule = new KC, this._getScheduleObservable().pipe(Iy(this._destroyed)).subscribe(() => {
                        for (; this._currentSchedule.tasks.length || this._currentSchedule.endTasks.length;) {
                            const t = this._currentSchedule;
                            this._currentSchedule = new KC;
                            for (const e of t.tasks) e();
                            for (const e of t.endTasks) e()
                        }
                        this._currentSchedule = null
                    }))
                }

                _getScheduleObservable() {
                    return this._ngZone.isStable ? j(Promise.resolve(void 0)) : this._ngZone.onStable.pipe(Yh(1))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(zl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), YC = (() => {
            class t {
                constructor(t, e) {
                    this.template = t, this._differs = e
                }

                ngOnChanges(t) {
                    if (!this._columnsDiffer) {
                        const e = t.columns && t.columns.currentValue || [];
                        this._columnsDiffer = this._differs.find(e).create(), this._columnsDiffer.diff(e)
                    }
                }

                getColumnsDiff() {
                    return this._columnsDiffer.diff(this.columns)
                }

                extractCellTemplate(t) {
                    return this instanceof tS ? t.headerCell.template : this instanceof sS ? t.footerCell.template : t.cell.template
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Oa), Vr(ma))
            }, t.\u0275dir = Zt({type: t, features: [ae]}), t
        })();

        class XC extends YC {
        }

        const JC = MC(XC);
        let tS = (() => {
            class t extends JC {
                constructor(t, e, n) {
                    super(t, e), this._table = n
                }

                ngOnChanges(t) {
                    super.ngOnChanges(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Oa), Vr(ma), Vr(VC, 8))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "cdkHeaderRowDef", ""]],
                inputs: {columns: ["cdkHeaderRowDef", "columns"], sticky: ["cdkHeaderRowDefSticky", "sticky"]},
                features: [Sr, ae]
            }), t
        })();

        class eS extends YC {
        }

        const nS = MC(eS);
        let sS = (() => {
            class t extends nS {
                constructor(t, e, n) {
                    super(t, e), this._table = n
                }

                ngOnChanges(t) {
                    super.ngOnChanges(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Oa), Vr(ma), Vr(VC, 8))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "cdkFooterRowDef", ""]],
                inputs: {columns: ["cdkFooterRowDef", "columns"], sticky: ["cdkFooterRowDefSticky", "sticky"]},
                features: [Sr, ae]
            }), t
        })(), iS = (() => {
            class t extends YC {
                constructor(t, e, n) {
                    super(t, e), this._table = n
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Oa), Vr(ma), Vr(VC, 8))
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "cdkRowDef", ""]],
                inputs: {columns: ["cdkRowDefColumns", "columns"], when: ["cdkRowDefWhen", "when"]},
                features: [Sr]
            }), t
        })(), rS = (() => {
            class t {
                constructor(e) {
                    this._viewContainer = e, t.mostRecentCellOutlet = this
                }

                ngOnDestroy() {
                    t.mostRecentCellOutlet === this && (t.mostRecentCellOutlet = null)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "cdkCellOutlet", ""]]}), t.mostRecentCellOutlet = null, t
        })(), oS = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["cdk-header-row"], ["tr", "cdk-header-row", ""]],
                hostAttrs: ["role", "row", 1, "cdk-header-row"],
                decls: 1,
                vars: 0,
                consts: [["cdkCellOutlet", ""]],
                template: function (t, e) {
                    1 & t && Wr(0, 0)
                },
                directives: [rS],
                encapsulation: 2
            }), t
        })(), aS = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["cdk-row"], ["tr", "cdk-row", ""]],
                hostAttrs: ["role", "row", 1, "cdk-row"],
                decls: 1,
                vars: 0,
                consts: [["cdkCellOutlet", ""]],
                template: function (t, e) {
                    1 & t && Wr(0, 0)
                },
                directives: [rS],
                encapsulation: 2
            }), t
        })(), lS = (() => {
            class t {
                constructor(t) {
                    this.templateRef = t
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Oa))
            }, t.\u0275dir = Zt({type: t, selectors: [["ng-template", "cdkNoDataRow", ""]]}), t
        })();
        const cS = ["top", "bottom", "left", "right"];

        class hS {
            constructor(t, e, n, s, i = !0, r = !0, o) {
                this._isNativeHtmlTable = t, this._stickCellCss = e, this.direction = n, this._coalescedStyleScheduler = s, this._isBrowser = i, this._needsPositionStickyOnElement = r, this._positionListener = o, this._cachedCellWidths = [], this._borderCellCss = {
                    top: e + "-border-elem-top",
                    bottom: e + "-border-elem-bottom",
                    left: e + "-border-elem-left",
                    right: e + "-border-elem-right"
                }
            }

            clearStickyPositioning(t, e) {
                const n = [];
                for (const s of t) if (s.nodeType === s.ELEMENT_NODE) {
                    n.push(s);
                    for (let t = 0; t < s.children.length; t++) n.push(s.children[t])
                }
                this._scheduleStyleChanges(() => {
                    for (const t of n) this._removeStickyStyle(t, e)
                })
            }

            updateStickyColumns(t, e, n, s = !0) {
                if (!t.length || !this._isBrowser || !e.some(t => t) && !n.some(t => t)) return void (this._positionListener && (this._positionListener.stickyColumnsUpdated({sizes: []}), this._positionListener.stickyEndColumnsUpdated({sizes: []})));
                const i = t[0], r = i.children.length, o = this._getCellWidths(i, s),
                    a = this._getStickyStartColumnPositions(o, e), l = this._getStickyEndColumnPositions(o, n),
                    c = e.lastIndexOf(!0), h = n.indexOf(!0);
                this._scheduleStyleChanges(() => {
                    const s = "rtl" === this.direction, i = s ? "right" : "left", u = s ? "left" : "right";
                    for (const o of t) for (let t = 0; t < r; t++) {
                        const s = o.children[t];
                        e[t] && this._addStickyStyle(s, i, a[t], t === c), n[t] && this._addStickyStyle(s, u, l[t], t === h)
                    }
                    this._positionListener && (this._positionListener.stickyColumnsUpdated({sizes: -1 === c ? [] : o.slice(0, c + 1).map((t, n) => e[n] ? t : null)}), this._positionListener.stickyEndColumnsUpdated({sizes: -1 === h ? [] : o.slice(h).map((t, e) => n[e + h] ? t : null).reverse()}))
                })
            }

            stickRows(t, e, n) {
                if (!this._isBrowser) return;
                const s = "bottom" === n ? t.slice().reverse() : t, i = "bottom" === n ? e.slice().reverse() : e,
                    r = [], o = [], a = [];
                for (let c = 0, h = 0; c < s.length; c++) {
                    if (r[c] = h, !i[c]) continue;
                    const t = s[c];
                    a[c] = this._isNativeHtmlTable ? Array.from(t.children) : [t];
                    const e = t.getBoundingClientRect().height;
                    h += e, o[c] = e
                }
                const l = i.lastIndexOf(!0);
                this._scheduleStyleChanges(() => {
                    var t, e;
                    for (let o = 0; o < s.length; o++) {
                        if (!i[o]) continue;
                        const t = r[o], e = o === l;
                        for (const s of a[o]) this._addStickyStyle(s, n, t, e)
                    }
                    "top" === n ? null === (t = this._positionListener) || void 0 === t || t.stickyHeaderRowsUpdated({
                        sizes: o,
                        elements: a
                    }) : null === (e = this._positionListener) || void 0 === e || e.stickyFooterRowsUpdated({
                        sizes: o,
                        elements: a
                    })
                })
            }

            updateStickyFooterContainer(t, e) {
                if (!this._isNativeHtmlTable) return;
                const n = t.querySelector("tfoot");
                this._scheduleStyleChanges(() => {
                    e.some(t => !t) ? this._removeStickyStyle(n, ["bottom"]) : this._addStickyStyle(n, "bottom", 0, !1)
                })
            }

            _removeStickyStyle(t, e) {
                for (const n of e) t.style[n] = "", t.classList.remove(this._borderCellCss[n]);
                cS.some(n => -1 === e.indexOf(n) && t.style[n]) ? t.style.zIndex = this._getCalculatedZIndex(t) : (t.style.zIndex = "", this._needsPositionStickyOnElement && (t.style.position = ""), t.classList.remove(this._stickCellCss))
            }

            _addStickyStyle(t, e, n, s) {
                t.classList.add(this._stickCellCss), s && t.classList.add(this._borderCellCss[e]), t.style[e] = n + "px", t.style.zIndex = this._getCalculatedZIndex(t), this._needsPositionStickyOnElement && (t.style.cssText += "position: -webkit-sticky; position: sticky; ")
            }

            _getCalculatedZIndex(t) {
                const e = {top: 100, bottom: 10, left: 1, right: 1};
                let n = 0;
                for (const s of cS) t.style[s] && (n += e[s]);
                return n ? "" + n : ""
            }

            _getCellWidths(t, e = !0) {
                if (!e && this._cachedCellWidths.length) return this._cachedCellWidths;
                const n = [], s = t.children;
                for (let i = 0; i < s.length; i++) n.push(s[i].getBoundingClientRect().width);
                return this._cachedCellWidths = n, n
            }

            _getStickyStartColumnPositions(t, e) {
                const n = [];
                let s = 0;
                for (let i = 0; i < t.length; i++) e[i] && (n[i] = s, s += t[i]);
                return n
            }

            _getStickyEndColumnPositions(t, e) {
                const n = [];
                let s = 0;
                for (let i = t.length; i > 0; i--) e[i] && (n[i] = s, s += t[i]);
                return n
            }

            _scheduleStyleChanges(t) {
                this._coalescedStyleScheduler ? this._coalescedStyleScheduler.schedule(t) : t()
            }
        }

        const uS = new $n("CDK_SPL");
        let dS = (() => {
            class t {
                constructor(t, e) {
                    this.viewContainer = t, this.elementRef = e
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na), Vr(Qo))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "rowOutlet", ""]]}), t
        })(), pS = (() => {
            class t {
                constructor(t, e) {
                    this.viewContainer = t, this.elementRef = e
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na), Vr(Qo))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "headerRowOutlet", ""]]}), t
        })(), fS = (() => {
            class t {
                constructor(t, e) {
                    this.viewContainer = t, this.elementRef = e
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na), Vr(Qo))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "footerRowOutlet", ""]]}), t
        })(), mS = (() => {
            class t {
                constructor(t, e) {
                    this.viewContainer = t, this.elementRef = e
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(Na), Vr(Qo))
            }, t.\u0275dir = Zt({type: t, selectors: [["", "noDataRowOutlet", ""]]}), t
        })(), gS = (() => {
            class t {
                constructor(t, e, n, s, i, r, o, a, l, c, h) {
                    this._differs = t, this._changeDetectorRef = e, this._elementRef = n, this._dir = i, this._platform = o, this._viewRepeater = a, this._coalescedStyleScheduler = l, this._stickyPositioningListener = c, this._viewportRuler = h, this._onDestroy = new S, this._columnDefsByName = new Map, this._customColumnDefs = new Set, this._customRowDefs = new Set, this._customHeaderRowDefs = new Set, this._customFooterRowDefs = new Set, this._headerRowDefChanged = !0, this._footerRowDefChanged = !0, this._stickyColumnStylesNeedReset = !0, this._forceRecalculateCellWidths = !0, this._cachedRenderRowsMap = new Map, this.stickyCssClass = "cdk-table-sticky", this.needsPositionStickyOnElement = !0, this._isShowingNoDataRow = !1, this._multiTemplateDataRows = !1, this._fixedLayout = !1, this.viewChange = new Mh({
                        start: 0,
                        end: Number.MAX_VALUE
                    }), s || this._elementRef.nativeElement.setAttribute("role", "grid"), this._document = r, this._isNativeHtmlTable = "TABLE" === this._elementRef.nativeElement.nodeName
                }

                get trackBy() {
                    return this._trackByFn
                }

                set trackBy(t) {
                    this._trackByFn = t
                }

                get dataSource() {
                    return this._dataSource
                }

                set dataSource(t) {
                    this._dataSource !== t && this._switchDataSource(t)
                }

                get multiTemplateDataRows() {
                    return this._multiTemplateDataRows
                }

                set multiTemplateDataRows(t) {
                    this._multiTemplateDataRows = Cf(t), this._rowOutlet && this._rowOutlet.viewContainer.length && (this._forceRenderDataRows(), this.updateStickyColumnStyles())
                }

                get fixedLayout() {
                    return this._fixedLayout
                }

                set fixedLayout(t) {
                    this._fixedLayout = Cf(t), this._forceRecalculateCellWidths = !0, this._stickyColumnStylesNeedReset = !0
                }

                ngOnInit() {
                    this._setupStickyStyler(), this._isNativeHtmlTable && this._applyNativeTableSections(), this._dataDiffer = this._differs.find([]).create((t, e) => this.trackBy ? this.trackBy(e.dataIndex, e.data) : e), this._viewportRuler && this._viewportRuler.change().pipe(Iy(this._onDestroy)).subscribe(() => {
                        this._forceRecalculateCellWidths = !0
                    })
                }

                ngAfterContentChecked() {
                    this._cacheRowDefs(), this._cacheColumnDefs();
                    const t = this._renderUpdatedColumns() || this._headerRowDefChanged || this._footerRowDefChanged;
                    this._stickyColumnStylesNeedReset = this._stickyColumnStylesNeedReset || t, this._forceRecalculateCellWidths = t, this._headerRowDefChanged && (this._forceRenderHeaderRows(), this._headerRowDefChanged = !1), this._footerRowDefChanged && (this._forceRenderFooterRows(), this._footerRowDefChanged = !1), this.dataSource && this._rowDefs.length > 0 && !this._renderChangeSubscription ? this._observeRenderChanges() : this._stickyColumnStylesNeedReset && this.updateStickyColumnStyles(), this._checkStickyStates()
                }

                ngOnDestroy() {
                    this._rowOutlet.viewContainer.clear(), this._noDataRowOutlet.viewContainer.clear(), this._headerRowOutlet.viewContainer.clear(), this._footerRowOutlet.viewContainer.clear(), this._cachedRenderRowsMap.clear(), this._onDestroy.next(), this._onDestroy.complete(), Fy(this.dataSource) && this.dataSource.disconnect(this)
                }

                renderRows() {
                    this._renderRows = this._getAllRenderRows();
                    const t = this._dataDiffer.diff(this._renderRows);
                    if (!t) return void this._updateNoDataRow();
                    const e = this._rowOutlet.viewContainer;
                    this._viewRepeater ? this._viewRepeater.applyChanges(t, e, (t, e, n) => this._getEmbeddedViewArgs(t.item, n), t => t.item.data, t => {
                        1 === t.operation && t.context && this._renderCellTemplateForItem(t.record.item.rowDef, t.context)
                    }) : t.forEachOperation((t, n, s) => {
                        if (null == t.previousIndex) {
                            const e = t.item;
                            this._renderRow(this._rowOutlet, e.rowDef, s, {$implicit: e.data})
                        } else if (null == s) e.remove(n); else {
                            const t = e.get(n);
                            e.move(t, s)
                        }
                    }), this._updateRowIndexContext(), t.forEachIdentityChange(t => {
                        e.get(t.currentIndex).context.$implicit = t.item.data
                    }), this._updateNoDataRow(), this.updateStickyColumnStyles()
                }

                addColumnDef(t) {
                    this._customColumnDefs.add(t)
                }

                removeColumnDef(t) {
                    this._customColumnDefs.delete(t)
                }

                addRowDef(t) {
                    this._customRowDefs.add(t)
                }

                removeRowDef(t) {
                    this._customRowDefs.delete(t)
                }

                addHeaderRowDef(t) {
                    this._customHeaderRowDefs.add(t), this._headerRowDefChanged = !0
                }

                removeHeaderRowDef(t) {
                    this._customHeaderRowDefs.delete(t), this._headerRowDefChanged = !0
                }

                addFooterRowDef(t) {
                    this._customFooterRowDefs.add(t), this._footerRowDefChanged = !0
                }

                removeFooterRowDef(t) {
                    this._customFooterRowDefs.delete(t), this._footerRowDefChanged = !0
                }

                setNoDataRow(t) {
                    this._customNoDataRow = t
                }

                updateStickyHeaderRowStyles() {
                    const t = this._getRenderedRows(this._headerRowOutlet),
                        e = this._elementRef.nativeElement.querySelector("thead");
                    e && (e.style.display = t.length ? "" : "none");
                    const n = this._headerRowDefs.map(t => t.sticky);
                    this._stickyStyler.clearStickyPositioning(t, ["top"]), this._stickyStyler.stickRows(t, n, "top"), this._headerRowDefs.forEach(t => t.resetStickyChanged())
                }

                updateStickyFooterRowStyles() {
                    const t = this._getRenderedRows(this._footerRowOutlet),
                        e = this._elementRef.nativeElement.querySelector("tfoot");
                    e && (e.style.display = t.length ? "" : "none");
                    const n = this._footerRowDefs.map(t => t.sticky);
                    this._stickyStyler.clearStickyPositioning(t, ["bottom"]), this._stickyStyler.stickRows(t, n, "bottom"), this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement, n), this._footerRowDefs.forEach(t => t.resetStickyChanged())
                }

                updateStickyColumnStyles() {
                    const t = this._getRenderedRows(this._headerRowOutlet), e = this._getRenderedRows(this._rowOutlet),
                        n = this._getRenderedRows(this._footerRowOutlet);
                    (this._isNativeHtmlTable && !this._fixedLayout || this._stickyColumnStylesNeedReset) && (this._stickyStyler.clearStickyPositioning([...t, ...e, ...n], ["left", "right"]), this._stickyColumnStylesNeedReset = !1), t.forEach((t, e) => {
                        this._addStickyColumnStyles([t], this._headerRowDefs[e])
                    }), this._rowDefs.forEach(t => {
                        const n = [];
                        for (let s = 0; s < e.length; s++) this._renderRows[s].rowDef === t && n.push(e[s]);
                        this._addStickyColumnStyles(n, t)
                    }), n.forEach((t, e) => {
                        this._addStickyColumnStyles([t], this._footerRowDefs[e])
                    }), Array.from(this._columnDefsByName.values()).forEach(t => t.resetStickyChanged())
                }

                _getAllRenderRows() {
                    const t = [], e = this._cachedRenderRowsMap;
                    this._cachedRenderRowsMap = new Map;
                    for (let n = 0; n < this._data.length; n++) {
                        let s = this._data[n];
                        const i = this._getRenderRowsForData(s, n, e.get(s));
                        this._cachedRenderRowsMap.has(s) || this._cachedRenderRowsMap.set(s, new WeakMap);
                        for (let e = 0; e < i.length; e++) {
                            let n = i[e];
                            const s = this._cachedRenderRowsMap.get(n.data);
                            s.has(n.rowDef) ? s.get(n.rowDef).push(n) : s.set(n.rowDef, [n]), t.push(n)
                        }
                    }
                    return t
                }

                _getRenderRowsForData(t, e, n) {
                    return this._getRowDefs(t, e).map(s => {
                        const i = n && n.has(s) ? n.get(s) : [];
                        if (i.length) {
                            const t = i.shift();
                            return t.dataIndex = e, t
                        }
                        return {data: t, rowDef: s, dataIndex: e}
                    })
                }

                _cacheColumnDefs() {
                    this._columnDefsByName.clear(), _S(this._getOwnDefs(this._contentColumnDefs), this._customColumnDefs).forEach(t => {
                        this._columnDefsByName.has(t.name), this._columnDefsByName.set(t.name, t)
                    })
                }

                _cacheRowDefs() {
                    this._headerRowDefs = _S(this._getOwnDefs(this._contentHeaderRowDefs), this._customHeaderRowDefs), this._footerRowDefs = _S(this._getOwnDefs(this._contentFooterRowDefs), this._customFooterRowDefs), this._rowDefs = _S(this._getOwnDefs(this._contentRowDefs), this._customRowDefs);
                    const t = this._rowDefs.filter(t => !t.when);
                    this._defaultRowDef = t[0]
                }

                _renderUpdatedColumns() {
                    const t = (t, e) => t || !!e.getColumnsDiff(), e = this._rowDefs.reduce(t, !1);
                    e && this._forceRenderDataRows();
                    const n = this._headerRowDefs.reduce(t, !1);
                    n && this._forceRenderHeaderRows();
                    const s = this._footerRowDefs.reduce(t, !1);
                    return s && this._forceRenderFooterRows(), e || n || s
                }

                _switchDataSource(t) {
                    this._data = [], Fy(this.dataSource) && this.dataSource.disconnect(this), this._renderChangeSubscription && (this._renderChangeSubscription.unsubscribe(), this._renderChangeSubscription = null), t || (this._dataDiffer && this._dataDiffer.diff([]), this._rowOutlet.viewContainer.clear()), this._dataSource = t
                }

                _observeRenderChanges() {
                    if (!this.dataSource) return;
                    let t;
                    var e;
                    Fy(this.dataSource) ? t = this.dataSource.connect(this) : (e = this.dataSource) && (e instanceof y || "function" == typeof e.lift && "function" == typeof e.subscribe) ? t = this.dataSource : Array.isArray(this.dataSource) && (t = Lh(this.dataSource)), this._renderChangeSubscription = t.pipe(Iy(this._onDestroy)).subscribe(t => {
                        this._data = t || [], this.renderRows()
                    })
                }

                _forceRenderHeaderRows() {
                    this._headerRowOutlet.viewContainer.length > 0 && this._headerRowOutlet.viewContainer.clear(), this._headerRowDefs.forEach((t, e) => this._renderRow(this._headerRowOutlet, t, e)), this.updateStickyHeaderRowStyles()
                }

                _forceRenderFooterRows() {
                    this._footerRowOutlet.viewContainer.length > 0 && this._footerRowOutlet.viewContainer.clear(), this._footerRowDefs.forEach((t, e) => this._renderRow(this._footerRowOutlet, t, e)), this.updateStickyFooterRowStyles()
                }

                _addStickyColumnStyles(t, e) {
                    const n = Array.from(e.columns || []).map(t => this._columnDefsByName.get(t)),
                        s = n.map(t => t.sticky), i = n.map(t => t.stickyEnd);
                    this._stickyStyler.updateStickyColumns(t, s, i, !this._fixedLayout || this._forceRecalculateCellWidths)
                }

                _getRenderedRows(t) {
                    const e = [];
                    for (let n = 0; n < t.viewContainer.length; n++) {
                        const s = t.viewContainer.get(n);
                        e.push(s.rootNodes[0])
                    }
                    return e
                }

                _getRowDefs(t, e) {
                    if (1 == this._rowDefs.length) return [this._rowDefs[0]];
                    let n = [];
                    if (this.multiTemplateDataRows) n = this._rowDefs.filter(n => !n.when || n.when(e, t)); else {
                        let s = this._rowDefs.find(n => n.when && n.when(e, t)) || this._defaultRowDef;
                        s && n.push(s)
                    }
                    return n
                }

                _getEmbeddedViewArgs(t, e) {
                    return {templateRef: t.rowDef.template, context: {$implicit: t.data}, index: e}
                }

                _renderRow(t, e, n, s = {}) {
                    const i = t.viewContainer.createEmbeddedView(e.template, s, n);
                    return this._renderCellTemplateForItem(e, s), i
                }

                _renderCellTemplateForItem(t, e) {
                    for (let n of this._getCellTemplates(t)) rS.mostRecentCellOutlet && rS.mostRecentCellOutlet._viewContainer.createEmbeddedView(n, e);
                    this._changeDetectorRef.markForCheck()
                }

                _updateRowIndexContext() {
                    const t = this._rowOutlet.viewContainer;
                    for (let e = 0, n = t.length; e < n; e++) {
                        const s = t.get(e).context;
                        s.count = n, s.first = 0 === e, s.last = e === n - 1, s.even = e % 2 == 0, s.odd = !s.even, this.multiTemplateDataRows ? (s.dataIndex = this._renderRows[e].dataIndex, s.renderIndex = e) : s.index = this._renderRows[e].dataIndex
                    }
                }

                _getCellTemplates(t) {
                    return t && t.columns ? Array.from(t.columns, e => {
                        const n = this._columnDefsByName.get(e);
                        return t.extractCellTemplate(n)
                    }) : []
                }

                _applyNativeTableSections() {
                    const t = this._document.createDocumentFragment(),
                        e = [{tag: "thead", outlets: [this._headerRowOutlet]}, {
                            tag: "tbody",
                            outlets: [this._rowOutlet, this._noDataRowOutlet]
                        }, {tag: "tfoot", outlets: [this._footerRowOutlet]}];
                    for (const n of e) {
                        const e = this._document.createElement(n.tag);
                        e.setAttribute("role", "rowgroup");
                        for (const t of n.outlets) e.appendChild(t.elementRef.nativeElement);
                        t.appendChild(e)
                    }
                    this._elementRef.nativeElement.appendChild(t)
                }

                _forceRenderDataRows() {
                    this._dataDiffer.diff([]), this._rowOutlet.viewContainer.clear(), this.renderRows()
                }

                _checkStickyStates() {
                    const t = (t, e) => t || e.hasStickyChanged();
                    this._headerRowDefs.reduce(t, !1) && this.updateStickyHeaderRowStyles(), this._footerRowDefs.reduce(t, !1) && this.updateStickyFooterRowStyles(), Array.from(this._columnDefsByName.values()).reduce(t, !1) && (this._stickyColumnStylesNeedReset = !0, this.updateStickyColumnStyles())
                }

                _setupStickyStyler() {
                    this._stickyStyler = new hS(this._isNativeHtmlTable, this.stickyCssClass, this._dir ? this._dir.value : "ltr", this._coalescedStyleScheduler, this._platform.isBrowser, this.needsPositionStickyOnElement, this._stickyPositioningListener), (this._dir ? this._dir.change : Lh()).pipe(Iy(this._onDestroy)).subscribe(t => {
                        this._stickyStyler.direction = t, this.updateStickyColumnStyles()
                    })
                }

                _getOwnDefs(t) {
                    return t.filter(t => !t._table || t._table === this)
                }

                _updateNoDataRow() {
                    const t = this._customNoDataRow || this._noDataRow;
                    if (t) {
                        const e = 0 === this._rowOutlet.viewContainer.length;
                        if (e !== this._isShowingNoDataRow) {
                            const n = this._noDataRowOutlet.viewContainer;
                            e ? n.createEmbeddedView(t.templateRef) : n.clear(), this._isShowingNoDataRow = e
                        }
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(ma), Vr(wa), Vr(Qo), Hn("role"), Vr(am, 8), Vr(bc), Vr(If), Vr(Vy, 8), Vr(ZC, 8), Vr(uS, 12), Vr(zy, 8))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["cdk-table"], ["table", "cdk-table", ""]],
                contentQueries: function (t, e, n) {
                    if (1 & t && (fl(n, lS, 1), fl(n, $C, 1), fl(n, iS, 1), fl(n, tS, 1), fl(n, sS, 1)), 2 & t) {
                        let t;
                        dl(t = ml()) && (e._noDataRow = t.first), dl(t = ml()) && (e._contentColumnDefs = t), dl(t = ml()) && (e._contentRowDefs = t), dl(t = ml()) && (e._contentHeaderRowDefs = t), dl(t = ml()) && (e._contentFooterRowDefs = t)
                    }
                },
                viewQuery: function (t, e) {
                    if (1 & t && (pl(dS, 3), pl(pS, 3), pl(fS, 3), pl(mS, 3)), 2 & t) {
                        let t;
                        dl(t = ml()) && (e._rowOutlet = t.first), dl(t = ml()) && (e._headerRowOutlet = t.first), dl(t = ml()) && (e._footerRowOutlet = t.first), dl(t = ml()) && (e._noDataRowOutlet = t.first)
                    }
                },
                hostAttrs: [1, "cdk-table"],
                hostVars: 2,
                hostBindings: function (t, e) {
                    2 & t && fo("cdk-table-fixed-layout", e.fixedLayout)
                },
                inputs: {
                    trackBy: "trackBy",
                    dataSource: "dataSource",
                    multiTemplateDataRows: "multiTemplateDataRows",
                    fixedLayout: "fixedLayout"
                },
                exportAs: ["cdkTable"],
                features: [Uo([{provide: VC, useExisting: t}, {provide: Vy, useClass: Ly}, {
                    provide: ZC,
                    useClass: QC
                }, {provide: uS, useValue: null}])],
                ngContentSelectors: LC,
                decls: 6,
                vars: 0,
                consts: [["headerRowOutlet", ""], ["rowOutlet", ""], ["noDataRowOutlet", ""], ["footerRowOutlet", ""]],
                template: function (t, e) {
                    1 & t && (no(FC), so(0), so(1, 1), Wr(2, 0), Wr(3, 1), Wr(4, 2), Wr(5, 3))
                },
                directives: [pS, dS, mS, fS],
                styles: [".cdk-table-fixed-layout{table-layout:fixed}\n"],
                encapsulation: 2
            }), t
        })();

        function _S(t, e) {
            return t.concat(Array.from(e))
        }

        let yS = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[Hy]]}), t
        })();
        const bS = [[["caption"]], [["colgroup"], ["col"]]], vS = ["caption", "colgroup, col"];
        let wS = (() => {
            class t extends gS {
                constructor() {
                    super(...arguments), this.stickyCssClass = "mat-table-sticky", this.needsPositionStickyOnElement = !1
                }
            }

            return t.\u0275fac = function (e) {
                return CS(e || t)
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-table"], ["table", "mat-table", ""]],
                hostAttrs: [1, "mat-table"],
                hostVars: 2,
                hostBindings: function (t, e) {
                    2 & t && fo("mat-table-fixed-layout", e.fixedLayout)
                },
                exportAs: ["matTable"],
                features: [Uo([{provide: Vy, useClass: Ly}, {provide: gS, useExisting: t}, {
                    provide: VC,
                    useExisting: t
                }, {provide: ZC, useClass: QC}]), Sr],
                ngContentSelectors: vS,
                decls: 6,
                vars: 0,
                consts: [["headerRowOutlet", ""], ["rowOutlet", ""], ["noDataRowOutlet", ""], ["footerRowOutlet", ""]],
                template: function (t, e) {
                    1 & t && (no(bS), so(0), so(1, 1), Wr(2, 0), Wr(3, 1), Wr(4, 2), Wr(5, 3))
                },
                directives: [pS, dS, mS, fS],
                styles: ['mat-table{display:block}mat-header-row{min-height:56px}mat-row,mat-footer-row{min-height:48px}mat-row,mat-header-row,mat-footer-row{display:flex;border-width:0;border-bottom-width:1px;border-style:solid;align-items:center;box-sizing:border-box}mat-row::after,mat-header-row::after,mat-footer-row::after{display:inline-block;min-height:inherit;content:""}mat-cell:first-of-type,mat-header-cell:first-of-type,mat-footer-cell:first-of-type{padding-left:24px}[dir=rtl] mat-cell:first-of-type:not(:only-of-type),[dir=rtl] mat-header-cell:first-of-type:not(:only-of-type),[dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}mat-cell:last-of-type,mat-header-cell:last-of-type,mat-footer-cell:last-of-type{padding-right:24px}[dir=rtl] mat-cell:last-of-type:not(:only-of-type),[dir=rtl] mat-header-cell:last-of-type:not(:only-of-type),[dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}mat-cell,mat-header-cell,mat-footer-cell{flex:1;display:flex;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}table.mat-table{border-spacing:0}tr.mat-header-row{height:56px}tr.mat-row,tr.mat-footer-row{height:48px}th.mat-header-cell{text-align:left}[dir=rtl] th.mat-header-cell{text-align:right}th.mat-header-cell,td.mat-cell,td.mat-footer-cell{padding:0;border-bottom-width:1px;border-bottom-style:solid}th.mat-header-cell:first-of-type,td.mat-cell:first-of-type,td.mat-footer-cell:first-of-type{padding-left:24px}[dir=rtl] th.mat-header-cell:first-of-type:not(:only-of-type),[dir=rtl] td.mat-cell:first-of-type:not(:only-of-type),[dir=rtl] td.mat-footer-cell:first-of-type:not(:only-of-type){padding-left:0;padding-right:24px}th.mat-header-cell:last-of-type,td.mat-cell:last-of-type,td.mat-footer-cell:last-of-type{padding-right:24px}[dir=rtl] th.mat-header-cell:last-of-type:not(:only-of-type),[dir=rtl] td.mat-cell:last-of-type:not(:only-of-type),[dir=rtl] td.mat-footer-cell:last-of-type:not(:only-of-type){padding-right:0;padding-left:24px}.mat-table-sticky{position:-webkit-sticky !important;position:sticky !important}.mat-table-fixed-layout{table-layout:fixed}\n'],
                encapsulation: 2
            }), t
        })();
        const CS = zn(wS);
        let SS = (() => {
            class t extends jC {
            }

            return t.\u0275fac = function (e) {
                return xS(e || t)
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "matCellDef", ""]],
                features: [Uo([{provide: jC, useExisting: t}]), Sr]
            }), t
        })();
        const xS = zn(SS);
        let kS = (() => {
            class t extends zC {
            }

            return t.\u0275fac = function (e) {
                return ES(e || t)
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "matHeaderCellDef", ""]],
                features: [Uo([{provide: zC, useExisting: t}]), Sr]
            }), t
        })();
        const ES = zn(kS);
        let OS = (() => {
            class t extends $C {
                get name() {
                    return this._name
                }

                set name(t) {
                    this._setNameInput(t)
                }

                _updateColumnCssClassName() {
                    super._updateColumnCssClassName(), this._columnCssClassName.push("mat-column-" + this.cssClassFriendlyName)
                }
            }

            return t.\u0275fac = function (e) {
                return RS(e || t)
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "matColumnDef", ""]],
                inputs: {sticky: "sticky", name: ["matColumnDef", "name"]},
                features: [Uo([{provide: $C, useExisting: t}, {
                    provide: "MAT_SORT_HEADER_COLUMN_DEF",
                    useExisting: t
                }]), Sr]
            }), t
        })();
        const RS = zn(OS);
        let TS = (() => {
            class t extends WC {
            }

            return t.\u0275fac = function (e) {
                return AS(e || t)
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["mat-header-cell"], ["th", "mat-header-cell", ""]],
                hostAttrs: ["role", "columnheader", 1, "mat-header-cell"],
                features: [Sr]
            }), t
        })();
        const AS = zn(TS);
        let DS = (() => {
            class t extends GC {
            }

            return t.\u0275fac = function (e) {
                return IS(e || t)
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["mat-cell"], ["td", "mat-cell", ""]],
                hostAttrs: ["role", "gridcell", 1, "mat-cell"],
                features: [Sr]
            }), t
        })();
        const IS = zn(DS);
        let PS = (() => {
            class t extends tS {
            }

            return t.\u0275fac = function (e) {
                return NS(e || t)
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "matHeaderRowDef", ""]],
                inputs: {columns: ["matHeaderRowDef", "columns"], sticky: ["matHeaderRowDefSticky", "sticky"]},
                features: [Uo([{provide: tS, useExisting: t}]), Sr]
            }), t
        })();
        const NS = zn(PS);
        let FS = (() => {
            class t extends iS {
            }

            return t.\u0275fac = function (e) {
                return LS(e || t)
            }, t.\u0275dir = Zt({
                type: t,
                selectors: [["", "matRowDef", ""]],
                inputs: {columns: ["matRowDefColumns", "columns"], when: ["matRowDefWhen", "when"]},
                features: [Uo([{provide: iS, useExisting: t}]), Sr]
            }), t
        })();
        const LS = zn(FS);
        let MS = (() => {
            class t extends oS {
            }

            return t.\u0275fac = function (e) {
                return VS(e || t)
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-header-row"], ["tr", "mat-header-row", ""]],
                hostAttrs: ["role", "row", 1, "mat-header-row"],
                exportAs: ["matHeaderRow"],
                features: [Uo([{provide: oS, useExisting: t}]), Sr],
                decls: 1,
                vars: 0,
                consts: [["cdkCellOutlet", ""]],
                template: function (t, e) {
                    1 & t && Wr(0, 0)
                },
                directives: [rS],
                encapsulation: 2
            }), t
        })();
        const VS = zn(MS);
        let jS = (() => {
            class t extends aS {
            }

            return t.\u0275fac = function (e) {
                return zS(e || t)
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["mat-row"], ["tr", "mat-row", ""]],
                hostAttrs: ["role", "row", 1, "mat-row"],
                exportAs: ["matRow"],
                features: [Uo([{provide: aS, useExisting: t}]), Sr],
                decls: 1,
                vars: 0,
                consts: [["cdkCellOutlet", ""]],
                template: function (t, e) {
                    1 & t && Wr(0, 0)
                },
                directives: [rS],
                encapsulation: 2
            }), t
        })();
        const zS = zn(jS);
        let BS = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[yS, z_], z_]}), t
        })(), HS = (() => {
            class t extends class extends class extends class {
            } {
                constructor(t = []) {
                    super(), this._renderData = new Mh([]), this._filter = new Mh(""), this._internalPageChanges = new S, this._renderChangesSubscription = null, this.sortingDataAccessor = (t, e) => {
                        const n = t[e];
                        if (xf(n)) {
                            const t = Number(n);
                            return t < 9007199254740991 ? t : n
                        }
                        return n
                    }, this.sortData = (t, e) => {
                        const n = e.active, s = e.direction;
                        return n && "" != s ? t.sort((t, e) => {
                            let i = this.sortingDataAccessor(t, n), r = this.sortingDataAccessor(e, n);
                            const o = typeof i, a = typeof r;
                            o !== a && ("number" === o && (i += ""), "number" === a && (r += ""));
                            let l = 0;
                            return null != i && null != r ? i > r ? l = 1 : i < r && (l = -1) : null != i ? l = 1 : null != r && (l = -1), l * ("asc" == s ? 1 : -1)
                        }) : t
                    }, this.filterPredicate = (t, e) => {
                        const n = Object.keys(t).reduce((e, n) => e + t[n] + "\u25ec", "").toLowerCase(),
                            s = e.trim().toLowerCase();
                        return -1 != n.indexOf(s)
                    }, this._data = new Mh(t), this._updateChangeSubscription()
                }

                get data() {
                    return this._data.value
                }

                set data(t) {
                    this._data.next(t), this._renderChangesSubscription || this._filterData(t)
                }

                get filter() {
                    return this._filter.value
                }

                set filter(t) {
                    this._filter.next(t), this._renderChangesSubscription || this._filterData(this.data)
                }

                get sort() {
                    return this._sort
                }

                set sort(t) {
                    this._sort = t, this._updateChangeSubscription()
                }

                get paginator() {
                    return this._paginator
                }

                set paginator(t) {
                    this._paginator = t, this._updateChangeSubscription()
                }

                _updateChangeSubscription() {
                    var t;
                    const e = this._sort ? q(this._sort.sortChange, this._sort.initialized) : Lh(null),
                        n = this._paginator ? q(this._paginator.page, this._internalPageChanges, this._paginator.initialized) : Lh(null),
                        s = jh([this._data, this._filter]).pipe(F(([t]) => this._filterData(t))),
                        i = jh([s, e]).pipe(F(([t]) => this._orderData(t))),
                        r = jh([i, n]).pipe(F(([t]) => this._pageData(t)));
                    null === (t = this._renderChangesSubscription) || void 0 === t || t.unsubscribe(), this._renderChangesSubscription = r.subscribe(t => this._renderData.next(t))
                }

                _filterData(t) {
                    return this.filteredData = null == this.filter || "" === this.filter ? t : t.filter(t => this.filterPredicate(t, this.filter)), this.paginator && this._updatePaginator(this.filteredData.length), this.filteredData
                }

                _orderData(t) {
                    return this.sort ? this.sortData(t.slice(), this.sort) : t
                }

                _pageData(t) {
                    if (!this.paginator) return t;
                    const e = this.paginator.pageIndex * this.paginator.pageSize;
                    return t.slice(e, e + this.paginator.pageSize)
                }

                _updatePaginator(t) {
                    Promise.resolve().then(() => {
                        const e = this.paginator;
                        if (e && (e.length = t, e.pageIndex > 0)) {
                            const t = Math.ceil(e.length / e.pageSize) - 1 || 0, n = Math.min(e.pageIndex, t);
                            n !== e.pageIndex && (e.pageIndex = n, this._internalPageChanges.next())
                        }
                    })
                }

                connect() {
                    return this._renderChangesSubscription || this._updateChangeSubscription(), this._renderData
                }

                disconnect() {
                    var t;
                    null === (t = this._renderChangesSubscription) || void 0 === t || t.unsubscribe(), this._renderChangesSubscription = null
                }
            } {
            } {
                constructor(t) {
                    super(), this.http = t, this.fepmap = new Map([["Strength +1", "str"], ["Strength +2", "str2"], ["Agility +1", "agi"], ["Agility +2", "agi2"], ["Intelligence +1", "int"], ["Intelligence +2", "int2"], ["Constitution +1", "con"], ["Constitution +2", "con2"], ["Perception +1", "per"], ["Perception +2", "per2"], ["Charisma +1", "cha"], ["Charisma +2", "cha2"], ["Dexterity +1", "dex"], ["Dexterity +2", "dex2"], ["Will +1", "wil"], ["Will +2", "wil2"], ["Psyche +1", "psy"], ["Psyche +2", "psy2"]]), this.foodDataProgress = new Mh(0), this.foodDataS = new S, this.excludedFoodNames = new Set, this.excludedIngredientNames = new Set, this.lastFepSort = "", this.sortedAscBy = "", this.filterPredicate = (t, e) => {
                        e = e.toLowerCase(), e += ";";
                        let n = "", s = "pred", i = "", r = "", o = !1, a = "", l = !1;
                        if (this.excludedFoodNames.has(t.name)) return !1;
                        for (let c of t.ingredients) if (this.excludedIngredientNames.has(c.name)) return !1;
                        for (let c = 0; c < e.length; c++) if ("-" == e[c] && 0 == n.length) o = !0; else if (";" == e[c]) {
                            if (l && '"' == a[a.length - 1] && (a = a.substr(0, a.length - 1)), "fep" == s) if ("%" == a[a.length - 1]) {
                                const e = Number.parseFloat(a.substr(0, a.length - 1));
                                if (0 == e) continue;
                                if (NaN != e) if (">" == r) {
                                    if (null == t.fepPer.get(n) || t.fepPer.get(n) < e) return !1
                                } else if ("<" == r) {
                                    if (null != t.fepPer.get(n) && t.fepPer.get(n) > e) return !1
                                } else if ("=" == r && (null == t.fepPer.get(n) || t.fepPer.get(n) != e)) return !1
                            } else {
                                const e = Number.parseFloat(a);
                                if (0 == e) continue;
                                if (NaN != e) if (">" == r) {
                                    if (null == t.feps.get(n) || t.feps.get(n) < e) return !1
                                } else if ("<" == r) {
                                    if (null == t.feps.get(n) || t.feps.get(n) > e) return !1
                                } else if ("=" == r && (null == t.feps.get(n) || t.feps.get(n) != e)) return !1
                            } else if ("name" == s) {
                                if (o) {
                                    if (l ? t.name.toLowerCase() == a : t.name.toLowerCase().includes(a)) return !1
                                } else if (!(l ? t.name.toLowerCase() == a : t.name.toLowerCase().includes(a))) return !1
                            } else if ("from" == s) if (o) {
                                for (let e of t.ingredients) if (l ? e.name.toLowerCase() == a : e.name.toLowerCase().includes(a)) return !1
                            } else {
                                let e = !1;
                                for (let n of t.ingredients) (l ? n.name.toLowerCase() == a : n.name.toLowerCase().includes(a)) && (e = !0);
                                if (!e) return !1
                            }
                            n = "", s = "pred", o = !1, a = "", l = !1
                        } else ":" == e[c] ? "from" == n ? s = "from" : "name" == n && (s = "name") : ">" == e[c] || "<" == e[c] || "=" == e[c] ? (s = "fep", i = n, r = e[c]) : "pred" == s ? n += e[c] : "fep" == s ? a += e[c] : "name" != s && "from" != s || (0 == a.length && '"' == e[c] ? l = !0 : a += e[c]);
                        return !0
                    }, t.get("api/data/food-info2.json", {
                        reportProgress: !0,
                        observe: "events"
                    }).pipe().subscribe(t => {
                        null != t.type && 3 == t.type && this.foodDataProgress.next(t.loaded / t.total), t instanceof gC && (t.ok ? this.processData(t.body) : console.error("Error while loading the food data!"))
                    });
                    const e = localStorage.getItem("excludedIngredientNames");
                    null != e && e.length > 0 && (this.excludedIngredientNames = new Set(JSON.parse(e)));
                    const n = localStorage.getItem("excludedFoodNames");
                    null != n && n.length > 0 && (this.excludedFoodNames = new Set(JSON.parse(n)))
                }

                refresh() {
                    this.data = [...this.foodData], this.filter += ";"
                }

                processData(t) {
                    this.filter = ";", this.foodData = [];
                    for (let e of t) {
                        let t = {};
                        t.name = e.itemName, t.energy = e.energy, t.hunger = e.hunger, t.total_fep = 0, t.ingredients = e.ingredients, t.resourceName = e.resourceName, t.feps = new Map;
                        for (let n of e.feps) t.total_fep += n.value, t.feps.set(this.fepmap.get(n.name), n.value);
                        t.fepPer = new Map;
                        for (let n of e.feps) t.fepPer.set(this.fepmap.get(n.name), n.value / t.total_fep * 100);
                        t.hungerfep = t.total_fep / t.hunger, this.foodData.push(t)
                    }
                    this.data = this.shuffle(this.foodData), this.foodDataS.next(this.foodData)
                }

                shuffle(t) {
                    for (let e = t.length - 1; e > 0; e--) {
                        const n = Math.floor(Math.random() * (e + 1));
                        [t[e], t[n]] = [t[n], t[e]]
                    }
                    return this.foodData
                }

                sortByFep(t) {
                    this.lastFepSort == t && (t += "2"), this.lastFepSort = t, this.foodData = this.foodData.sort((e, n) => e.feps.get(t) === n.feps.get(t) ? 0 : null == e.feps.get(t) ? 1 : null == n.feps.get(t) ? -1 : e.feps.get(t) < n.feps.get(t) ? 1 : -1), this.data = this.foodData
                }

                sortByString(t) {
                    let e = !1;
                    this.sortedAscBy === t ? (this.sortedAscBy = "", e = !0) : this.sortedAscBy = t, this.foodData = this.foodData.sort((n, s) => n[t] === s[t] ? 0 : n[t] < s[t] ? e ? 1 : -1 : e ? -1 : 1), this.data = this.foodData
                }

                sortByNumber(t) {
                    let e = !1;
                    this.sortedAscBy === t ? (this.sortedAscBy = "", e = !0) : this.sortedAscBy = t, this.foodData = this.foodData.sort((n, s) => Number.parseFloat(n[t]) === Number.parseFloat(s[t]) ? 0 : Number.parseFloat(n[t]) < Number.parseFloat(s[t]) ? e ? 1 : -1 : e ? -1 : 1), this.data = this.foodData
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bC))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })(), US = (() => {
            class t {
                constructor(t, e) {
                    this.document = t, this.platformId = e, this.documentIsAccessible = ih(this.platformId)
                }

                check(t) {
                    return !!this.documentIsAccessible && (t = encodeURIComponent(t), this.getCookieRegExp(t).test(this.document.cookie))
                }

                get(t) {
                    if (this.documentIsAccessible && this.check(t)) {
                        t = encodeURIComponent(t);
                        const e = this.getCookieRegExp(t).exec(this.document.cookie);
                        return this.safeDecodeURIComponent(e[1])
                    }
                    return ""
                }

                getAll() {
                    if (!this.documentIsAccessible) return {};
                    const t = {}, e = this.document;
                    return e.cookie && "" !== e.cookie && e.cookie.split(";").forEach(e => {
                        const [n, s] = e.split("=");
                        t[this.safeDecodeURIComponent(n.replace(/^ /, ""))] = this.safeDecodeURIComponent(s)
                    }), t
                }

                set(t, e, n, s, i, r, o) {
                    if (!this.documentIsAccessible) return;
                    if ("number" == typeof n || n instanceof Date || s || i || r || o) return void this.set(t, e, {
                        expires: n,
                        path: s,
                        domain: i,
                        secure: r,
                        sameSite: o || "Lax"
                    });
                    let a = encodeURIComponent(t) + "=" + encodeURIComponent(e) + ";";
                    const l = n || {};
                    l.expires && (a += "number" == typeof l.expires ? "expires=" + new Date((new Date).getTime() + 1e3 * l.expires * 60 * 60 * 24).toUTCString() + ";" : "expires=" + l.expires.toUTCString() + ";"), l.path && (a += "path=" + l.path + ";"), l.domain && (a += "domain=" + l.domain + ";"), !1 === l.secure && "None" === l.sameSite && (l.secure = !0, console.warn(`[ngx-cookie-service] Cookie ${t} was forced with secure flag because sameSite=None.More details : https://github.com/stevermeister/ngx-cookie-service/issues/86#issuecomment-597720130`)), l.secure && (a += "secure;"), l.sameSite || (l.sameSite = "Lax"), a += "sameSite=" + l.sameSite + ";", this.document.cookie = a
                }

                delete(t, e, n, s, i = "Lax") {
                    if (!this.documentIsAccessible) return;
                    const r = new Date("Thu, 01 Jan 1970 00:00:01 GMT");
                    this.set(t, "", {expires: r, path: e, domain: n, secure: s, sameSite: i})
                }

                deleteAll(t, e, n, s = "Lax") {
                    if (!this.documentIsAccessible) return;
                    const i = this.getAll();
                    for (const r in i) i.hasOwnProperty(r) && this.delete(r, t, e, n, s)
                }

                getCookieRegExp(t) {
                    const e = t.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, "\\$1");
                    return new RegExp("(?:^" + e + "|;\\s*" + e + ")=(.*?)(?:;|$)", "g")
                }

                safeDecodeURIComponent(t) {
                    try {
                        return decodeURIComponent(t)
                    } catch (Ax) {
                        return t
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(os(bc), os(kl))
            }, t.\u0275prov = ut({
                factory: function () {
                    return new t(os(bc), os(kl))
                }, token: t, providedIn: "root"
            }), t
        })(), $S = (() => {
            class t {
                constructor() {
                    this.hidden = !0
                }

                ngOnInit() {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["app-search-help"]],
                decls: 56,
                vars: 1,
                consts: [["id", "helptext", 3, "click"], ["id", "search-help-wrapper", 3, "hidden", "click"], ["id", "search-help", 3, "click"], ["href", "https://discord.gg/XEAdJnD"]],
                template: function (t, e) {
                    1 & t && (Br(0, "span", 0), Yr("click", (function () {
                        return e.hidden = !1
                    })), ko(1, "How-to"), Hr(), Br(2, "div", 1), Yr("click", (function () {
                        return e.hidden = !0
                    })), Br(3, "div", 2), Yr("click", (function () {
                        return e.hidden = !0
                    })), Br(4, "h1"), ko(5, "Tips"), Hr(), Br(6, "p"), ko(7, "Syntax for using the the filtering is the following:"), Hr(), Br(8, "p"), ko(9, "; is used to separate filter conditions"), Hr(), Br(10, "p"), ko(11, "name:name, to limit by name of the food "), Hr(), Br(12, "p"), ko(13, "from:ingredient, = to limit by ingredient"), Hr(), Br(14, "p"), ko(15, "- as a prefix for the two previous queries to exclude"), Hr(), Br(16, "p"), ko(17, '"" for exact match, example: from:"ant" filters only foods that contain ingredient that is named exactly "ant" (for example, not chanterelle)"'), Hr(), Br(18, "p"), ko(19, "To filter by FEP, use:"), Hr(), Br(20, "p"), ko(21, "str/str2/agi etc. (%) > < = number"), Hr(), Br(22, "p"), ko(23, "Examples:"), Hr(), Br(24, "ul"), Br(25, "li"), ko(26, "str>50 = at least 50 str +1 fep"), Hr(), Br(27, "li"), ko(28, "str2>50 = at least 50 str +2 fep"), Hr(), Br(29, "li"), ko(30, "str>50% = at least 50% str +1 fep"), Hr(), Br(31, "li"), ko(32, "int2<50% = no more than 50% int +2 fep"), Hr(), Br(33, "li"), ko(34, "psy2=50% = exactly 50% psy +2 fep"), Hr(), Br(35, "li"), ko(36, "name:roasted - Name should contain the word roasted"), Hr(), Br(37, "li"), ko(38, "-name:roasted - Name should not contain the word roasted"), Hr(), Br(39, "li"), ko(40, 'name:"blueberry" - Name should be exactly the word blueberry'), Hr(), Br(41, "li"), ko(42, 'from:pork - At least one of the ingredients should contain the word "pork"'), Hr(), Br(43, "li"), ko(44, 'from:"ant" - At least one of the ingredients should be exactly the word "ant"'), Hr(), Br(45, "li"), ko(46, '-from:troll - Exclude foods that have an ingredient that contains the word "troll"'), Hr(), Br(47, "li"), ko(48, '-from:"troll" - Exclude foods that have an ingredient that is exactly the word "troll"'), Hr(), Br(49, "li"), ko(50, 'name:Autumn steak;per2>50%;-from:"deer" - Show only foods that have autumn steak in their name AND have more than 50% of the FEP consisting of perception +2 AND exclude matches that contain deer as an ingredient.'), Hr(), Hr(), Br(51, "span"), ko(52, ""), Hr(), Br(53, "a", 3), ko(54, ""), Hr(), Ur(55, "ul"), Hr(), Hr()), 2 & t && (ui(2), jr("hidden", e.hidden))
                },
                styles: ["#search-help-wrapper[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;width:100%;height:100%;background-color:rgba(0,0,0,.1)}#search-help[_ngcontent-%COMP%]{position:absolute;display:block;margin:auto;top:5%;left:50%;transform:translate(-50%);border:.1em solid #000;border-radius:.5em;background-color:#fff;padding:1em}#helptext[_ngcontent-%COMP%]{color:#00f}"]
            }), t
        })();

        function qS(t, e) {
            if (1 & t && Ur(0, "div", 2), 2 & t) {
                const t = e.$implicit;
                po("width", t[1], "%"), jr("title", t[0]), Fr("fep", t[0])
            }
        }

        let WS = (() => {
            class t {
                constructor() {
                    this.fepPer = []
                }

                ngOnInit() {
                    this.fepPer = [...this.fepPerIn.entries()].sort((t, e) => e[1] - t[1]).map(t => [t[0], Math.fround(t[1])])
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["app-fep-bar"]],
                inputs: {fepPerIn: "fepPerIn"},
                decls: 2,
                vars: 1,
                consts: [["id", "fep-bar"], ["class", "fep-bar-elem", 3, "title", "width", 4, "ngFor", "ngForOf"], [1, "fep-bar-elem", 3, "title"]],
                template: function (t, e) {
                    1 & t && (Br(0, "div", 0), Mr(1, qS, 1, 4, "div", 1), Hr()), 2 & t && (ui(1), jr("ngForOf", e.fepPer))
                },
                directives: [Uc],
                styles: ["#fep-bar[_ngcontent-%COMP%]{width:10em;height:1.5em;background-color:#d3d3d3;overflow:hidden;border:1px solid #000;display:flex;flex-direction:row;align-items:stretch}.fep-bar-elem[_ngcontent-%COMP%]{height:100%;margin:0}div[fep=str][_ngcontent-%COMP%]{background-color:#bf9794}div[fep=str2][_ngcontent-%COMP%]{background-color:#df958f}div[fep=agi][_ngcontent-%COMP%]{background-color:#9995b8}div[fep=agi2][_ngcontent-%COMP%]{background-color:#9991dc}div[fep=int][_ngcontent-%COMP%]{background-color:#9db7b9}div[fep=int2][_ngcontent-%COMP%]{background-color:#97d6dc}div[fep=con][_ngcontent-%COMP%]{background-color:#c29ab4}div[fep=con2][_ngcontent-%COMP%]{background-color:#e193c5}div[fep=per][_ngcontent-%COMP%]{background-color:#e4bf98}div[fep=per2][_ngcontent-%COMP%]{background-color:#f2c28d}div[fep=cha][_ngcontent-%COMP%]{background-color:#9beeb1}div[fep=cha2][_ngcontent-%COMP%]{background-color:#8ef7aa}div[fep=dex][_ngcontent-%COMP%]{background-color:#fefdcc}div[fep=dex2][_ngcontent-%COMP%]{background-color:#fffea6}div[fep=wil][_ngcontent-%COMP%]{background-color:#e4f38f}div[fep=wil2][_ngcontent-%COMP%]{background-color:#eeff9e}div[fep=psy][_ngcontent-%COMP%]{background-color:#c48dfd}div[fep=psy2][_ngcontent-%COMP%]{background-color:#c286fe}"]
            }), t
        })(), GS = (() => {
            class t {
                transform(t, e) {
                    const n = new Set;
                    for (let s of t) s.toLowerCase().includes(e.toLowerCase()) && n.add(s);
                    return n
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275pipe = Qt({name: "setFilter", type: t, pure: !1}), t
        })(), KS = (() => {
            class t {
                transform(t) {
                    return t.map(t => t.name + ": " + t.percentage.toFixed(0) + "%").sort().join(" ")
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275pipe = Qt({name: "ingredients", type: t, pure: !0}), t
        })();

        function ZS(t, e) {
            1 & t && (Br(0, "div", 19), Br(1, "h1"), ko(2, "Loading..."), Hr(), Hr())
        }

        function QS(t, e) {
            1 & t && (Br(0, "h2"), ko(1, "No results."), Hr())
        }

        function YS(t, e) {
            1 & t && (Br(0, "th", 42), ko(1, "Icon"), Hr())
        }

        function XS(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "td", 43), Br(1, "img", 44), Yr("error", (function (n) {
                    De(t);
                    const s = e.$implicit;
                    return to(2).fallbackImg(n.target, s)
                })), Hr(), Hr()
            }
            if (2 & t) {
                const t = e.$implicit;
                ui(1), ro("src", "api/icons/", t.name, ".png", ys)
            }
        }

        function JS(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "th", 45), Yr("click", (function () {
                    return De(t), to(2).foodData.sortByString("name")
                })), ko(1, "Name"), Hr()
            }
        }

        function tx(t, e) {
            if (1 & t && (Br(0, "td", 46), ko(1), Hr()), 2 & t) {
                const t = e.$implicit;
                ui(1), Eo(t.name)
            }
        }

        function ex(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "th", 45), Yr("click", (function () {
                    De(t);
                    const e = to().$implicit;
                    return to(2).foodData.sortByFep(e)
                })), ko(1), Hr()
            }
            if (2 & t) {
                const t = to().$implicit;
                ui(1), Eo(t)
            }
        }

        function nx(t, e) {
            if (1 & t && (Br(0, "td", 49), Br(1, "span", 50), ko(2), Hr(), Ur(3, "br"), Br(4, "span", 51), ko(5), Hr(), Hr()), 2 & t) {
                const t = e.$implicit, n = to().$implicit;
                Fr("fepname", n), ui(1), ro("title", "", n, " +1"), ui(1), Eo(t.feps.get(n) || "\xa0"), ui(2), ro("title", "", n, " +2"), ui(1), Eo(t.feps.get(n + "2") || "\xa0")
            }
        }

        function sx(t, e) {
            1 & t && ($r(0, 47), Mr(1, ex, 2, 1, "th", 25), Mr(2, nx, 6, 5, "td", 48), qr()), 2 & t && io("matColumnDef", e.$implicit)
        }

        function ix(t, e) {
            1 & t && (Br(0, "th", 42), ko(1, "Ingredients"), Hr())
        }

        function rx(t, e) {
            if (1 & t && (Br(0, "td", 52), ko(1), Qa(2, "ingredients"), Hr()), 2 & t) {
                const t = e.$implicit;
                ui(1), Eo(Ya(2, 1, t.ingredients))
            }
        }

        function ox(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "th", 45), Yr("click", (function () {
                    return De(t), to(2).foodData.sortByNumber("hungerfep")
                })), ko(1, "FEP/Hunger"), Hr()
            }
        }

        function ax(t, e) {
            if (1 & t && (Br(0, "td", 53), ko(1), Hr()), 2 & t) {
                const t = e.$implicit;
                ui(1), Eo(t.hungerfep.toFixed(2))
            }
        }

        function lx(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "th", 45), Yr("click", (function () {
                    return De(t), to(2).foodData.sortByNumber("total_fep")
                })), ko(1, "Total FEP"), Hr()
            }
        }

        function cx(t, e) {
            if (1 & t && (Br(0, "td", 54), ko(1), Hr()), 2 & t) {
                const t = e.$implicit;
                ui(1), Eo(t.total_fep.toFixed(2))
            }
        }

        function hx(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "th", 45), Yr("click", (function () {
                    return De(t), to(2).foodData.sortByNumber("hunger")
                })), ko(1, "Hunger"), Hr()
            }
        }

        function ux(t, e) {
            if (1 & t && (Br(0, "td", 55), ko(1), Hr()), 2 & t) {
                const t = e.$implicit;
                ui(1), Eo(t.hunger.toFixed(2))
            }
        }

        function dx(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "th", 45), Yr("click", (function () {
                    return De(t), to(2).foodData.sortByNumber("energy")
                })), ko(1, "Energy"), Hr()
            }
        }

        function px(t, e) {
            if (1 & t && (Br(0, "td", 56), ko(1), Hr()), 2 & t) {
                const t = e.$implicit;
                ui(1), Oo("", t.energy.toFixed(0), "%")
            }
        }

        function fx(t, e) {
            1 & t && (Br(0, "th", 42), ko(1, "Fep bar"), Hr())
        }

        function mx(t, e) {
            if (1 & t && (Br(0, "td", 57), Ur(1, "app-fep-bar", 58), Hr()), 2 & t) {
                const t = e.$implicit;
                ui(1), jr("fepPerIn", t.fepPer)
            }
        }

        function gx(t, e) {
            1 & t && Ur(0, "tr", 59)
        }

        function _x(t, e) {
            1 & t && Ur(0, "tr", 60)
        }

        function yx(t, e) {
            if (1 & t && (Br(0, "table", 20), $r(1, 21), Mr(2, YS, 2, 0, "th", 22), Mr(3, XS, 2, 1, "td", 23), qr(), $r(4, 24), Mr(5, JS, 2, 0, "th", 25), Mr(6, tx, 2, 1, "td", 26), qr(), Mr(7, sx, 3, 1, "ng-container", 27), $r(8, 28), Mr(9, ix, 2, 0, "th", 22), Mr(10, rx, 3, 3, "td", 29), qr(), $r(11, 30), Mr(12, ox, 2, 0, "th", 25), Mr(13, ax, 2, 1, "td", 31), qr(), $r(14, 32), Mr(15, lx, 2, 0, "th", 25), Mr(16, cx, 2, 1, "td", 33), qr(), $r(17, 34), Mr(18, hx, 2, 0, "th", 25), Mr(19, ux, 2, 1, "td", 35), qr(), $r(20, 36), Mr(21, dx, 2, 0, "th", 25), Mr(22, px, 2, 1, "td", 37), qr(), $r(23, 38), Mr(24, fx, 2, 0, "th", 22), Mr(25, mx, 2, 1, "td", 39), qr(), Mr(26, gx, 1, 0, "tr", 40), Mr(27, _x, 1, 0, "tr", 41), Hr()), 2 & t) {
                const t = to();
                jr("dataSource", t.dataSource), ui(7), jr("ngForOf", t.fepAttrs), ui(19), jr("matHeaderRowDef", t.displayedColumns), ui(1), jr("matRowDefColumns", t.displayedColumns)
            }
        }

        function bx(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "li", 61), Yr("click", (function () {
                    De(t);
                    const n = e.$implicit;
                    return to().excludeIngredient(n)
                })), ko(1), Hr()
            }
            if (2 & t) {
                const t = e.$implicit, n = e.index;
                fo("list-every", n % 2 == 0)("list-other", n % 2 == 1), ui(1), Eo(t)
            }
        }

        function vx(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "li", 61), Yr("click", (function () {
                    De(t);
                    const n = e.$implicit;
                    return to().includeIngredient(n)
                })), ko(1), Hr()
            }
            if (2 & t) {
                const t = e.$implicit, n = e.index;
                fo("list-every", n % 2 == 0)("list-other", n % 2 == 1), ui(1), Eo(t)
            }
        }

        function wx(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "li", 61), Yr("click", (function () {
                    De(t);
                    const n = e.$implicit;
                    return to().excludeName(n)
                })), ko(1), Hr()
            }
            if (2 & t) {
                const t = e.$implicit, n = e.index;
                fo("list-every", n % 2 == 0)("list-other", n % 2 == 1), ui(1), Eo(t)
            }
        }

        function Cx(t, e) {
            if (1 & t) {
                const t = Gr();
                Br(0, "li", 61), Yr("click", (function () {
                    De(t);
                    const n = e.$implicit;
                    return to().includeName(n)
                })), ko(1), Hr()
            }
            if (2 & t) {
                const t = e.$implicit, n = e.index;
                fo("list-every", n % 2 == 0)("list-other", n % 2 == 1), ui(1), Eo(t)
            }
        }

        const Sx = function () {
                return [5, 10, 25, 50, 500]
            },
            xx = "img[icon][_ngcontent-%COMP%]{width:2.5em;height:2.5em;display:block;margin:0 auto}input[_ngcontent-%COMP%]{font-size:1em}  .mat-icon-button{margin:0 1em!important}  .mat-icon-button,   .mat-paginator-icon{height:3em!important;width:3em!important}svg[_ngcontent-%COMP%]{height:40px;width:40px}.margin-sides[_ngcontent-%COMP%]{margin:1% 0}.text-center[_ngcontent-%COMP%]{text-align:center}#energy-cell[_ngcontent-%COMP%], #fepHunger-cell[_ngcontent-%COMP%], #hunger-cell[_ngcontent-%COMP%], #totalFep-cell[_ngcontent-%COMP%]{width:6em}tr.mat-header-row[_ngcontent-%COMP%]{height:0}mat-paginator[_ngcontent-%COMP%]{display:inline-block;font-family:UnifrakturCook,cursive}[mat-header-cell][_ngcontent-%COMP%]{font-size:1.1em;text-align:center;color:#000;-webkit-user-select:none;-moz-user-select:none;user-select:none}[mat-cell][_ngcontent-%COMP%], span[_ngcontent-%COMP%], td[fepname][_ngcontent-%COMP%]{font-size:1em}td[fepname][_ngcontent-%COMP%]{height:4em;width:4em;text-align:center}td[fepname=str][_ngcontent-%COMP%]{background-color:#bf9794}td[fepname=agi][_ngcontent-%COMP%]{background-color:#9995b8}td[fepname=int][_ngcontent-%COMP%]{background-color:#9db7b9}td[fepname=con][_ngcontent-%COMP%]{background-color:#c29ab4}td[fepname=per][_ngcontent-%COMP%]{background-color:#e4bf98}td[fepname=cha][_ngcontent-%COMP%]{background-color:#9beeb1}td[fepname=dex][_ngcontent-%COMP%]{background-color:#fefdcc}td[fepname=wil][_ngcontent-%COMP%]{background-color:#e4f38f}td[fepname=psy][_ngcontent-%COMP%]{background-color:#c48dfd}span[fep1][_ngcontent-%COMP%]{color:#000}span[fep2][_ngcontent-%COMP%]{color:#006400}.foodtable[_ngcontent-%COMP%]{margin:0;padding:0;border-collapse:collapse}.mat-row[_ngcontent-%COMP%]{height:4em}#name-cell[_ngcontent-%COMP%]{margin:0;font-size:1.1em;width:15em}#ingredients-cell[_ngcontent-%COMP%]{margin:0;font-size:.9em}mat-spinner[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}#searchinput[_ngcontent-%COMP%]{width:90%}#spinnerWrapper[_ngcontent-%COMP%]{display:flex;position:absolute;margin:auto;height:100vh;width:100vw;background:hsla(0,0%,100%,.8);z-index:9000;-webkit-user-select:none;-moz-user-select:none;user-select:none}#spinnerWrapper[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{display:block;margin:auto}.filters[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.filters[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:none;padding:0;height:10em;width:25em;overflow-y:scroll;overflow-x:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none}.filters[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:10em;height:1.5em;margin:auto 1em 0 auto}.filters[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{color:orange}.filters[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:active{color:red}.filters.div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.filters[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{display:inline-block;margin:auto 0}.list-every[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.2)}.list-other[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.1)}.filter-top-wrap[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}#donation-form[_ngcontent-%COMP%]{display:inline-block;margin-right:5em;margin-top:2em;float:right}";
        let kx = (() => {
            class t {
                constructor(t, e) {
                    this.foodData = t, this.cookieService = e, this.fepAttrs = ["str", "agi", "int", "con", "per", "cha", "dex", "wil", "psy"], this.includeExcludeSearch = "", this.ingredientNames = new Set, this.foodNames = new Set, this.progressVal = 0, this.progressMode = "indeterminate", this.dataSource = t, this.displayedColumns = ["icon", "name"].concat(this.fepAttrs).concat(["ingredients", "fepHunger", "totalFep", "hunger", "energy", "fepbar"])
                }

                fallbackImg(t, e) {
                    t.src != "http://www.havenandhearth.com/mt/r/" + e.resourceName && (t.src = "http://www.havenandhearth.com/mt/r/" + e.resourceName)
                }

                excludeAllIngredients() {
                    this.ingredientNames.forEach(t => this.dataSource.excludedIngredientNames.add(t)), this.ingredientNames.clear(), this.dataSource.refresh(), localStorage.setItem("excludedIngredientNames", JSON.stringify(Array.from(this.dataSource.excludedIngredientNames)))
                }

                includeAllIngredients() {
                    this.dataSource.excludedIngredientNames.forEach(t => this.ingredientNames.add(t)), this.dataSource.excludedIngredientNames.clear(), this.dataSource.refresh(), localStorage.setItem("excludedIngredientNames", JSON.stringify(Array.from(this.dataSource.excludedIngredientNames)))
                }

                includeIngredient(t) {
                    this.dataSource.excludedIngredientNames.delete(t), this.ingredientNames.add(t), this.dataSource.refresh(), localStorage.setItem("excludedIngredientNames", JSON.stringify(Array.from(this.dataSource.excludedIngredientNames)))
                }

                excludeIngredient(t) {
                    this.ingredientNames.delete(t), this.dataSource.excludedIngredientNames.add(t), this.dataSource.refresh(), localStorage.setItem("excludedIngredientNames", JSON.stringify(Array.from(this.dataSource.excludedIngredientNames)))
                }

                excludeAllNames() {
                    this.foodNames.forEach(t => this.dataSource.excludedFoodNames.add(t)), this.foodNames.clear(), this.dataSource.refresh(), localStorage.setItem("excludedFoodNames", JSON.stringify(Array.from(this.dataSource.excludedFoodNames)))
                }

                includeAllNames() {
                    this.dataSource.excludedFoodNames.forEach(t => this.foodNames.add(t)), this.dataSource.excludedFoodNames.clear(), this.dataSource.refresh(), localStorage.setItem("excludedFoodNames", JSON.stringify(Array.from(this.dataSource.excludedFoodNames)))
                }

                excludeName(t) {
                    this.foodNames.delete(t), this.dataSource.excludedFoodNames.add(t), this.dataSource.refresh(), localStorage.setItem("excludedFoodNames", JSON.stringify(Array.from(this.dataSource.excludedFoodNames)))
                }

                includeName(t) {
                    this.dataSource.excludedFoodNames.delete(t), this.foodNames.add(t), this.dataSource.refresh(), localStorage.setItem("excludedFoodNames", JSON.stringify(Array.from(this.dataSource.excludedFoodNames)))
                }

                ngOnInit() {
                    this.dataSource.paginator = this.paginator, this.foodData.foodDataProgress.getValue() > 0 && (this.progressMode = "determinate", this.progressVal = 100 * this.foodData.foodDataProgress.getValue()), this.foodData.foodDataProgress.subscribe(t => {
                        this.progressMode = "determinate", this.progressVal = 100 * t
                    }), this.foodData.foodDataS.subscribe(t => {
                        const e = [], n = [];
                        for (let i of t) {
                            e.push(i.name);
                            for (let t of i.ingredients) n.push(t.name)
                        }
                        this.foodNames = new Set, this.ingredientNames = new Set, e.sort(), n.sort();
                        let s = void 0;
                        for (let i of e) i != s && (this.dataSource.excludedFoodNames.has(i) || this.foodNames.add(i), s = i);
                        s = void 0;
                        for (let i of n) i != s && (this.dataSource.excludedIngredientNames.has(i) || this.ingredientNames.add(i), s = i);
                        console.log(this.foodNames)
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(Vr(HS), Vr(US))
            }, t.\u0275cmp = Ut({
                type: t,
                selectors: [["app-foodtable"]],
                viewQuery: function (t, e) {
                    if (1 & t && (pl($w, 3), pl(eC, 3)), 2 & t) {
                        let t;
                        dl(t = ml()) && (e.paginator = t.first), dl(t = ml()) && (e.progressSpinner = t.first)
                    }
                },
                decls: 64,
                vars: 53,
                consts: [["id", "spinnerWrapper", 4, "ngIf"], ["pageSize", "10", "showFirstLastButtons", "", 3, "pageSizeOptions"], ["id", "donation-form", "action", "", "method", "post", "target", "_top"], ["type", "hidden", "name", "hosted_button_id", "value", ""], ["type", "image", "src", "", "border", "0", "name", "submit", "title", "", "alt", ""], ["alt", "", "border", "0", "src", "", "width", "1", "height", "1"], [1, "foodtable"], ["placeholder", "Filter foods by name, ingredients or FEP", "type", "text", "id", "searchinput", 3, "input"], [4, "ngIf"], ["class", "foodtable", "mat-table", "", 3, "dataSource", 4, "ngIf"], ["href", "api/data/food-info2.json"], [1, "filters"], [1, "filter-top-wrap"], ["title", "Exclude all ingredients", 3, "click"], ["type", "text", "placeholder", "Search", 3, "value", "input"], [3, "list-every", "list-other", "click", 4, "ngFor", "ngForOf"], ["title", "Include all ingredients", 3, "click"], ["title", "Exclude all foods", 3, "click"], ["title", "Include all foods", 3, "click"], ["id", "spinnerWrapper"], ["mat-table", "", 1, "foodtable", 3, "dataSource"], ["matColumnDef", "icon"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["id", "icon-cell", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["mat-header-cell", "", 3, "click", 4, "matHeaderCellDef"], ["id", "name-cell", "mat-cell", "", "class", "margin-sides", 4, "matCellDef"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["matColumnDef", "ingredients"], ["mat-cell", "", "id", "ingredients-cell", "class", "margin-sides", 4, "matCellDef"], ["matColumnDef", "fepHunger"], ["id", "fepHunger-cell", "class", "text-center", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "totalFep"], ["id", "totalFep-cell", "class", "text-center", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "hunger"], ["id", "hunger-cell", "class", "text-center", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "energy"], ["id", "energy-cell", "class", "text-center", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "fepbar"], ["id", "fepbar-cell", "class", "text-center", "mat-cell", "", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["id", "icon-cell", "mat-cell", ""], ["icon", "", 3, "src", "error"], ["mat-header-cell", "", 3, "click"], ["id", "name-cell", "mat-cell", "", 1, "margin-sides"], [3, "matColumnDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-cell", ""], ["fep1", "", 3, "title"], ["fep2", "", 3, "title"], ["mat-cell", "", "id", "ingredients-cell", 1, "margin-sides"], ["id", "fepHunger-cell", "mat-cell", "", 1, "text-center"], ["id", "totalFep-cell", "mat-cell", "", 1, "text-center"], ["id", "hunger-cell", "mat-cell", "", 1, "text-center"], ["id", "energy-cell", "mat-cell", "", 1, "text-center"], ["id", "fepbar-cell", "mat-cell", "", 1, "text-center"], [3, "fepPerIn"], ["mat-header-row", ""], ["mat-row", ""], [3, "click"]],
                template: function (t, e) {
                    1 & t && (Mr(0, ZS, 3, 0, "div", 0), Ur(1, "mat-paginator", 1), Br(2, "form", 2), Ur(3, "input", 3), Ur(4, "input", 4), Ur(5, "img", 5), Hr(), Br(6, "div", 6), Br(7, "input", 7), Yr("input", (function (t) {
                        return e.dataSource.filter = t.target.value
                    })), Hr(), Br(8, "span"), ko(9, "\xa0"), Hr(), Ur(10, "app-search-help"), Mr(11, QS, 2, 0, "h2", 8), Mr(12, yx, 28, 4, "table", 9), Hr(), Br(13, "a", 10), ko(14, "food-info2.json"), Hr(), Br(15, "div", 11), Br(16, "div"), Br(17, "div", 12), Br(18, "h3"), ko(19), Qa(20, "setFilter"), Qa(21, "setFilter"), Hr(), Br(22, "button", 13), Yr("click", (function () {
                        return e.excludeAllIngredients()
                    })), ko(23, "->"), Hr(), Br(24, "input", 14), Yr("input", (function (t) {
                        return e.includeExcludeSearch = t.target.value
                    })), Hr(), Hr(), Br(25, "ul"), Mr(26, bx, 2, 5, "li", 15), Qa(27, "setFilter"), Hr(), Hr(), Br(28, "div"), Br(29, "div", 12), Br(30, "h3"), ko(31), Qa(32, "setFilter"), Qa(33, "setFilter"), Hr(), Br(34, "button", 16), Yr("click", (function () {
                        return e.includeAllIngredients()
                    })), ko(35, "<-"), Hr(), Br(36, "input", 14), Yr("input", (function (t) {
                        return e.includeExcludeSearch = t.target.value
                    })), Hr(), Hr(), Br(37, "ul"), Mr(38, vx, 2, 5, "li", 15), Qa(39, "setFilter"), Hr(), Hr(), Br(40, "div"), Br(41, "div", 12), Br(42, "h3"), ko(43), Qa(44, "setFilter"), Qa(45, "setFilter"), Hr(), Br(46, "button", 17), Yr("click", (function () {
                        return e.excludeAllNames()
                    })), ko(47, "->"), Hr(), Br(48, "input", 14), Yr("input", (function (t) {
                        return e.includeExcludeSearch = t.target.value
                    })), Hr(), Hr(), Br(49, "ul"), Mr(50, wx, 2, 5, "li", 15), Qa(51, "setFilter"), Hr(), Hr(), Br(52, "div"), Br(53, "div", 12), Br(54, "h3"), ko(55), Qa(56, "setFilter"), Qa(57, "setFilter"), Hr(), Br(58, "button", 18), Yr("click", (function () {
                        return e.includeAllNames()
                    })), ko(59, "<-"), Hr(), Br(60, "input", 14), Yr("input", (function (t) {
                        return e.includeExcludeSearch = t.target.value
                    })), Hr(), Hr(), Br(61, "ul"), Mr(62, Cx, 2, 5, "li", 15), Qa(63, "setFilter"), Hr(),Hr(),Hr()), 2 & t && (jr("ngIf", 0 == e.dataSource.data.length), ui(1), jr("pageSizeOptions", function (t, e, n) {
                        const s = je() + 52, i = Te();
                        return i[s] === hi ? Pr(i, s, e()) : function (t, e) {
                            return t[e]
                        }(i, s)
                    }(0, Sx)), ui(10), jr("ngIf", 0 == e.dataSource.filteredData.length), ui(1), jr("ngIf", 0 != e.dataSource.filteredData.length), ui(7), Oo("Ingredients (", (Xa(20, 16, e.ingredientNames, e.includeExcludeSearch).size != e.ingredientNames.size ? Xa(21, 19, e.ingredientNames, e.includeExcludeSearch).size + "/" : "") + e.ingredientNames.size, ")"), ui(5), jr("value", e.includeExcludeSearch), ui(2), jr("ngForOf", Xa(27, 22, e.ingredientNames, e.includeExcludeSearch)), ui(5), Oo("Excluded (", (Xa(32, 25, e.dataSource.excludedIngredientNames, e.includeExcludeSearch).size != e.dataSource.excludedIngredientNames.size ? Xa(33, 28, e.dataSource.excludedIngredientNames, e.includeExcludeSearch).size + "/" : "") + e.dataSource.excludedIngredientNames.size, ")"), ui(5), jr("value", e.includeExcludeSearch), ui(2), jr("ngForOf", Xa(39, 31, e.dataSource.excludedIngredientNames, e.includeExcludeSearch)), ui(5), Oo("Foods (", (Xa(44, 34, e.foodNames, e.includeExcludeSearch).size != e.foodNames.size ? Xa(45, 37, e.foodNames, e.includeExcludeSearch).size + "/" : "") + e.foodNames.size, ")"), ui(5), jr("value", e.includeExcludeSearch), ui(2), jr("ngForOf", Xa(51, 40, e.foodNames, e.includeExcludeSearch)), ui(5), Oo("Excluded (", (Xa(56, 43, e.dataSource.excludedFoodNames, e.includeExcludeSearch).size != e.dataSource.excludedFoodNames.size ? Xa(57, 46, e.dataSource.excludedFoodNames, e.includeExcludeSearch).size + "/" : "") + e.dataSource.excludedFoodNames.size, ")"), ui(5), jr("value", e.includeExcludeSearch), ui(2), jr("ngForOf", Xa(63, 49, e.dataSource.excludedFoodNames, e.includeExcludeSearch)))
                },
                directives: [qc, $w, $S, Uc, wS, OS, kS, SS, PS, FS, TS, DS, WS, MS, jS],
                pipes: [GS, KS],
                styles: [xx, xx]
            }), t
        })(), Ex = (() => {
            class t {
                constructor() {
                    this.title = "front"
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = Ut({
                type: t, selectors: [["app-root"]], decls: 1, vars: 0, template: function (t, e) {
                    1 & t && Ur(0, "app-foodtable")
                }, directives: [kx], styles: [""]
            }), t
        })(), Ox = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({}), t
        })(), Rx = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t}), t.\u0275inj = dt({imports: [[ny, z_, zf, Ox], z_, Ox]}), t
        })(), Tx = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Gt({type: t, bootstrap: [Ex]}), t.\u0275inj = dt({
                providers: [US],
                imports: [[Fh, uf, NC, BS, qw, P_, nC, Rx]]
            }), t
        })();
        (function () {
            if (Jl) throw new Error("Cannot enable prod mode after platform setup.");
            Xl = !1
        })(), Ph().bootstrapModule(Tx).catch(t => console.error(t))
    }, zn8P: function (t, e) {
        function n(t) {
            return Promise.resolve().then((function () {
                var e = new Error("Cannot find module '" + t + "'");
                throw e.code = "MODULE_NOT_FOUND", e
            }))
        }

        n.keys = function () {
            return []
        }, n.resolve = n, t.exports = n, n.id = "zn8P"
    }
}, [[0, 0]]]);