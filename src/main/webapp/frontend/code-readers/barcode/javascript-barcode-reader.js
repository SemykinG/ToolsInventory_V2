var javascriptBarcodeReader = function(n) {
    "use strict";
    n = n && n.hasOwnProperty("default") ? n.default : n;
    var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function e(n, t) {
        return n(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var r = e(function(n) {
        var t = function(n) {
            var t, e = Object.prototype,
                r = e.hasOwnProperty,
                o = "function" == typeof Symbol ? Symbol : {},
                i = o.iterator || "@@iterator",
                a = o.asyncIterator || "@@asyncIterator",
                u = o.toStringTag || "@@toStringTag";

            function c(n, t, e, r) {
                var o = t && t.prototype instanceof d ? t : d,
                    i = Object.create(o.prototype),
                    a = new O(r || []);
                return i._invoke = function(n, t, e) {
                    var r = f;
                    return function(o, i) {
                        if (r === s) throw new Error("Generator is already running");
                        if (r === h) {
                            if ("throw" === o) throw i;
                            return F()
                        }
                        for (e.method = o, e.arg = i;;) {
                            var a = e.delegate;
                            if (a) {
                                var u = L(a, e);
                                if (u) {
                                    if (u === p) continue;
                                    return u
                                }
                            }
                            if ("next" === e.method) e.sent = e._sent = e.arg;
                            else if ("throw" === e.method) {
                                if (r === f) throw r = h, e.arg;
                                e.dispatchException(e.arg)
                            } else "return" === e.method && e.abrupt("return", e.arg);
                            r = s;
                            var c = w(n, t, e);
                            if ("normal" === c.type) {
                                if (r = e.done ? h : l, c.arg === p) continue;
                                return {
                                    value: c.arg,
                                    done: e.done
                                }
                            }
                            "throw" === c.type && (r = h, e.method = "throw", e.arg = c.arg)
                        }
                    }
                }(n, e, a), i
            }

            function w(n, t, e) {
                try {
                    return {
                        type: "normal",
                        arg: n.call(t, e)
                    }
                } catch (n) {
                    return {
                        type: "throw",
                        arg: n
                    }
                }
            }
            n.wrap = c;
            var f = "suspendedStart",
                l = "suspendedYield",
                s = "executing",
                h = "completed",
                p = {};

            function d() {}

            function v() {}

            function g() {}
            var y = {};
            y[i] = function() {
                return this
            };
            var m = Object.getPrototypeOf,
                b = m && m(m(N([])));
            b && b !== e && r.call(b, i) && (y = b);
            var x = g.prototype = d.prototype = Object.create(y);

            function E(n) {
                ["next", "throw", "return"].forEach(function(t) {
                    n[t] = function(n) {
                        return this._invoke(t, n)
                    }
                })
            }

            function j(n) {
                var t;
                this._invoke = function(e, o) {
                    function i() {
                        return new Promise(function(t, i) {
                            ! function t(e, o, i, a) {
                                var u = w(n[e], n, o);
                                if ("throw" !== u.type) {
                                    var c = u.arg,
                                        f = c.value;
                                    return f && "object" == typeof f && r.call(f, "__await") ? Promise.resolve(f.__await).then(function(n) {
                                        t("next", n, i, a)
                                    }, function(n) {
                                        t("throw", n, i, a)
                                    }) : Promise.resolve(f).then(function(n) {
                                        c.value = n, i(c)
                                    }, function(n) {
                                        return t("throw", n, i, a)
                                    })
                                }
                                a(u.arg)
                            }(e, o, t, i)
                        })
                    }
                    return t = t ? t.then(i, i) : i()
                }
            }

            function L(n, e) {
                var r = n.iterator[e.method];
                if (r === t) {
                    if (e.delegate = null, "throw" === e.method) {
                        if (n.iterator.return && (e.method = "return", e.arg = t, L(n, e), "throw" === e.method)) return p;
                        e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                    }
                    return p
                }
                var o = w(r, n.iterator, e.arg);
                if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, p;
                var i = o.arg;
                return i ? i.done ? (e[n.resultName] = i.value, e.next = n.nextLoc, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, p) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p)
            }

            function S(n) {
                var t = {
                    tryLoc: n[0]
                };
                1 in n && (t.catchLoc = n[1]), 2 in n && (t.finallyLoc = n[2], t.afterLoc = n[3]), this.tryEntries.push(t)
            }

            function C(n) {
                var t = n.completion || {};
                t.type = "normal", delete t.arg, n.completion = t
            }

            function O(n) {
                this.tryEntries = [{
                    tryLoc: "root"
                }], n.forEach(S, this), this.reset(!0)
            }

            function N(n) {
                if (n) {
                    var e = n[i];
                    if (e) return e.call(n);
                    if ("function" == typeof n.next) return n;
                    if (!isNaN(n.length)) {
                        var o = -1,
                            a = function e() {
                                for (; ++o < n.length;)
                                    if (r.call(n, o)) return e.value = n[o], e.done = !1, e;
                                return e.value = t, e.done = !0, e
                            };
                        return a.next = a
                    }
                }
                return {
                    next: F
                }
            }

            function F() {
                return {
                    value: t,
                    done: !0
                }
            }
            return v.prototype = x.constructor = g, g.constructor = v, g[u] = v.displayName = "GeneratorFunction", n.isGeneratorFunction = function(n) {
                var t = "function" == typeof n && n.constructor;
                return !!t && (t === v || "GeneratorFunction" === (t.displayName || t.name))
            }, n.mark = function(n) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(n, g) : (n.__proto__ = g, u in n || (n[u] = "GeneratorFunction")), n.prototype = Object.create(x), n
            }, n.awrap = function(n) {
                return {
                    __await: n
                }
            }, E(j.prototype), j.prototype[a] = function() {
                return this
            }, n.AsyncIterator = j, n.async = function(t, e, r, o) {
                var i = new j(c(t, e, r, o));
                return n.isGeneratorFunction(e) ? i : i.next().then(function(n) {
                    return n.done ? n.value : i.next()
                })
            }, E(x), x[u] = "Generator", x[i] = function() {
                return this
            }, x.toString = function() {
                return "[object Generator]"
            }, n.keys = function(n) {
                var t = [];
                for (var e in n) t.push(e);
                return t.reverse(),
                    function e() {
                        for (; t.length;) {
                            var r = t.pop();
                            if (r in n) return e.value = r, e.done = !1, e
                        }
                        return e.done = !0, e
                    }
            }, n.values = N, O.prototype = {
                constructor: O,
                reset: function(n) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(C), !n)
                        for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t)
                },
                stop: function() {
                    this.done = !0;
                    var n = this.tryEntries[0].completion;
                    if ("throw" === n.type) throw n.arg;
                    return this.rval
                },
                dispatchException: function(n) {
                    if (this.done) throw n;
                    var e = this;

                    function o(r, o) {
                        return u.type = "throw", u.arg = n, e.next = r, o && (e.method = "next", e.arg = t), !!o
                    }
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var a = this.tryEntries[i],
                            u = a.completion;
                        if ("root" === a.tryLoc) return o("end");
                        if (a.tryLoc <= this.prev) {
                            var c = r.call(a, "catchLoc"),
                                w = r.call(a, "finallyLoc");
                            if (c && w) {
                                if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                            } else if (c) {
                                if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                            } else {
                                if (!w) throw new Error("try statement without catch or finally");
                                if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(n, t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var o = this.tryEntries[e];
                        if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                            var i = o;
                            break
                        }
                    }
                    i && ("break" === n || "continue" === n) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                    var a = i ? i.completion : {};
                    return a.type = n, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, p) : this.complete(a)
                },
                complete: function(n, t) {
                    if ("throw" === n.type) throw n.arg;
                    return "break" === n.type || "continue" === n.type ? this.next = n.arg : "return" === n.type ? (this.rval = this.arg = n.arg, this.method = "return", this.next = "end") : "normal" === n.type && t && (this.next = t), p
                },
                finish: function(n) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var e = this.tryEntries[t];
                        if (e.finallyLoc === n) return this.complete(e.completion, e.afterLoc), C(e), p
                    }
                },
                catch: function(n) {
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var e = this.tryEntries[t];
                        if (e.tryLoc === n) {
                            var r = e.completion;
                            if ("throw" === r.type) {
                                var o = r.arg;
                                C(e)
                            }
                            return o
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(n, e, r) {
                    return this.delegate = {
                        iterator: N(n),
                        resultName: e,
                        nextLoc: r
                    }, "next" === this.method && (this.arg = t), p
                }
            }, n
        }(n.exports);
        try {
            regeneratorRuntime = t
        } catch (n) {
            Function("r", "regeneratorRuntime = r")(t)
        }
    });

    function o(n, t, e, r, o, i, a) {
        try {
            var u = n[i](a),
                c = u.value
        } catch (n) {
            return void e(n)
        }
        u.done ? t(c) : Promise.resolve(c).then(r, o)
    }
    var i = function(n) {
            return function() {
                var t = this,
                    e = arguments;
                return new Promise(function(r, i) {
                    var a = n.apply(t, e);

                    function u(n) {
                        o(a, r, i, u, c, "next", n)
                    }

                    function c(n) {
                        o(a, r, i, u, c, "throw", n)
                    }
                    u(void 0)
                })
            }
        },
        a = e(function(n) {
            function t(n) {
                return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
                    return typeof n
                } : function(n) {
                    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
                })(n)
            }

            function e(r) {
                return "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? n.exports = e = function(n) {
                    return t(n)
                } : n.exports = e = function(n) {
                    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : t(n)
                }, e(r)
            }
            n.exports = e
        }),
        u = "object" === ("undefined" == typeof process ? "undefined" : a(process)) && process.release && "node" === process.release.name;

    function c(n) {
        var t = document.createElement("canvas"),
            e = t.getContext("2d"),
            r = n.naturalWidth,
            o = n.naturalHeight;
        return t.width = r, t.height = o, e.drawImage(n, 0, 0), e.getImageData(0, 0, n.naturalWidth, n.naturalHeight)
    }

    function w() {
        return (w = i(r.mark(function t(e) {
            var o, i, a;
            return r.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                    case 0:
                        return i = !!(o = "string" == typeof e) && ("#" === !(r = e)[0] || /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(r)), a = e.tagName, t.abrupt("return", new Promise(function(t, r) {
                            if (o)
                                if (u) n.read(i ? {
                                    url: e,
                                    headers: {}
                                } : e, function(n, e) {
                                    if (n) r(n);
                                    else {
                                        var o = e.bitmap,
                                            i = o.data,
                                            a = o.width,
                                            u = o.height;
                                        t({
                                            data: i.toJSON().data,
                                            width: a,
                                            height: u
                                        })
                                    }
                                });
                                else if (i) {
                                var w = new Image;
                                w.onerror = r, w.onload = function() {
                                    return t(c(w))
                                }, w.src = e
                            } else {
                                var f = document.getElementById(e);
                                f && t(c(f)), r(new Error("Invalid image source specified!"))
                            } else a ? ("IMG" === a ? t(c(e)) : "CANVAS" === a && t(e.getContext("2d").getImageData(0, 0, e.naturalWidth, e.naturalHeight)), r(new Error("Invalid image source specified!"))) : e.data && e.width && e.height ? t(e) : r(new Error("Invalid image source specified!"))
                        }));
                    case 4:
                    case "end":
                        return t.stop()
                }
                var r
            }, t)
        }))).apply(this, arguments)
    }
    var f = {
            getImageDataFromSource: function(n) {
                return w.apply(this, arguments)
            },
            getLines: function(n) {
                for (var t = n.data, e = n.start, r = n.end, o = n.channels, i = n.width, a = t.slice(e, r), u = [], c = [], w = [], f = 1, l = 0, s = 0, h = {
                        left: !0,
                        right: !0
                    }, p = 0; p < 2; p += 1)
                    for (var d = 0; d < i; d += 1) {
                        var v = (p * i + d) * o,
                            g = (3 * a[v] + 4 * a[v + 1] + 2 * a[v + 2]) / 9,
                            y = u[d];
                        a[v] = g, a[v + 1] = g, a[v + 2] = g, u[d] = g + (y || 0)
                    }
                for (var m = 0; m < i; m += 1) {
                    u[m] /= 2;
                    var b = u[m];
                    b < l ? l = b : s = b
                }
                for (var x = l + (s - l) / 2, E = 0; E < i; E += 1) {
                    for (var j = 0, L = void 0, S = 0; S < 2; S += 1)(L = a[(S * i + E) * o]) > x && (j += 1);
                    0 === E && L <= x && (h.left = !1), E === i - 1 && L <= x && (h.right = !1), c.push(j > 1)
                }
                for (var C = c[0], O = 0; O < i; O += 1) c[O] === C ? (f += 1, O === i - 1 && w.push(f)) : (w.push(f), f = 1, C = c[O]);
                return {
                    lines: w,
                    padding: h
                }
            }
        },
        l = ["212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213", "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132", "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211", "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313", "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331", "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111", "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214", "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111", "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141", "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141", "114131", "311141", "411131", "211412", "211214", "211232", "233111", "211133", "2331112"],
        s = [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "BS", "HT", "LF", "VT", "FF", "CR", "SO", "SI", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB", "CAN", "EM", "SUB", "ESC", "FS", "GS", "RS", "US", "FNC 3", "FNC 2", "Shift B", "Code C", "Code B", "FNC 4", "FNC 1"],
        h = [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "DEL", "FNC 3", "FNC 2", "Shift A", "Code C", "FNC 4", "Code A", "FNC 1"],
        p = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "Code B", "Code A", "FNC 1"],
        d = function(n) {
            var t = n.reduce(function(n, t) {
                return n + t
            }, 0) / 11;
            return n.map(function(n) {
                return Math.round(n / t)
            }).join("")
        },
        v = function(n) {
            var t, e, r, o, i, a = [];
            n.pop();
            var u = n.slice(0);
            switch (r = d(u.splice(0, 6))) {
                case "211214":
                    t = h, e = 104;
                    break;
                case "211232":
                    t = p, e = 105;
                    break;
                default:
                    t = s, e = 103
            }
            for (var c = 1; u.length > 12; c += 1) switch (r = d(u.splice(0, 6)), e += c * (i = l.indexOf(r)), o = t[i]) {
                case "Code A":
                    t = s;
                    break;
                case "Code B":
                    t = h;
                    break;
                case "Code C":
                    t = p;
                    break;
                default:
                    a.push(o)
            }
            return r = d(u.splice(0, 6)), e % 103 !== l.indexOf(r) ? null : a.join("")
        },
        g = ["nnwwn", "wnnnw", "nwnnw", "wwnnn", "nnwnw", "wnwnn", "nwwnn", "nnnww", "wnnwn", "nwnwn"],
        y = function(n) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "standard",
                e = [],
                r = Math.ceil(n.reduce(function(n, t) {
                    return (n + t) / 2
                }, 0));
            if ("interleaved" === t) {
                var o = n.splice(0, 4).map(function(n) {
                        return n > r ? "w" : "n"
                    }).join(""),
                    i = n.splice(n.length - 3, 3).map(function(n) {
                        return n > r ? "w" : "n"
                    }).join("");
                if ("nnnn" !== o || "wnn" !== i) return null;
                for (; n.length > 0;) {
                    var a = n.splice(0, 10),
                        u = a.filter(function(n, t) {
                            return t % 2 == 0
                        }).map(function(n) {
                            return n > r ? "w" : "n"
                        }).join("");
                    e.push(g.indexOf(u));
                    var c = a.filter(function(n, t) {
                        return t % 2 != 0
                    }).map(function(n) {
                        return n > r ? "w" : "n"
                    }).join("");
                    e.push(g.indexOf(c))
                }
            } else if ("standard" === t) {
                var w = n.splice(0, 6).filter(function(n, t) {
                        return t % 2 == 0
                    }).map(function(n) {
                        return n > r ? "w" : "n"
                    }).join(""),
                    f = n.splice(n.length - 5, 5).filter(function(n, t) {
                        return t % 2 == 0
                    }).map(function(n) {
                        return n > r ? "w" : "n"
                    }).join("");
                if ("wwn" !== w || "wnw" !== f) return null;
                for (; n.length > 0;) {
                    var l = n.splice(0, 10).filter(function(n, t) {
                        return t % 2 == 0
                    }).map(function(n) {
                        return n > r ? "w" : "n"
                    }).join("");
                    e.push(g.indexOf(l))
                }
            }
            return e.join("")
        },
        m = {
            nnnwwnwnn: "0",
            wnnwnnnnw: "1",
            nnwwnnnnw: "2",
            wnwwnnnnn: "3",
            nnnwwnnnw: "4",
            wnnwwnnnn: "5",
            nnwwwnnnn: "6",
            nnnwnnwnw: "7",
            wnnwnnwnn: "8",
            nnwwnnwnn: "9",
            wnnnnwnnw: "A",
            nnwnnwnnw: "B",
            wnwnnwnnn: "C",
            nnnnwwnnw: "D",
            wnnnwwnnn: "E",
            nnwnwwnnn: "F",
            nnnnnwwnw: "G",
            wnnnnwwnn: "H",
            nnwnnwwnn: "I",
            nnnnwwwnn: "J",
            wnnnnnnww: "K",
            nnwnnnnww: "L",
            wnwnnnnwn: "M",
            nnnnwnnww: "N",
            wnnnwnnwn: "O",
            nnwnwnnwn: "P",
            nnnnnnwww: "Q",
            wnnnnnwwn: "R",
            nnwnnnwwn: "S",
            nnnnwnwwn: "T",
            wwnnnnnnw: "U",
            nwwnnnnnw: "V",
            wwwnnnnnn: "W",
            nwnnwnnnw: "X",
            wwnnwnnnn: "Y",
            nwwnwnnnn: "Z",
            nwnnnnwnw: "-",
            wwnnnnwnn: ".",
            nwwnnnwnn: " ",
            nwnwnwnnn: "$",
            nwnwnnnwn: "/",
            nwnnnwnwn: "+",
            nnnwnwnwn: "%",
            nwnnwnwnn: "*"
        },
        b = function(n) {
            for (var t = [], e = Math.ceil(n.reduce(function(n, t) {
                    return n + t
                }, 0) / n.length); n.length > 0;) {
                var r = n.splice(0, 10).map(function(n) {
                    return n > e ? "w" : "n"
                });
                t.push(m[r.slice(0, 9).join("")])
            }
            return "*" !== t.pop() || "*" !== t.shift() ? null : t.join("")
        },
        x = [{
            100010100: "0"
        }, {
            101001000: "1"
        }, {
            101000100: "2"
        }, {
            101000010: "3"
        }, {
            100101000: "4"
        }, {
            100100100: "5"
        }, {
            100100010: "6"
        }, {
            101010000: "7"
        }, {
            100010010: "8"
        }, {
            100001010: "9"
        }, {
            110101000: "A"
        }, {
            110100100: "B"
        }, {
            110100010: "C"
        }, {
            110010100: "D"
        }, {
            110010010: "E"
        }, {
            110001010: "F"
        }, {
            101101000: "G"
        }, {
            101100100: "H"
        }, {
            101100010: "I"
        }, {
            100110100: "J"
        }, {
            100011010: "K"
        }, {
            101011000: "L"
        }, {
            101001100: "M"
        }, {
            101000110: "N"
        }, {
            100101100: "O"
        }, {
            100010110: "P"
        }, {
            110110100: "Q"
        }, {
            110110010: "R"
        }, {
            110101100: "S"
        }, {
            110100110: "T"
        }, {
            110010110: "U"
        }, {
            110011010: "V"
        }, {
            101101100: "W"
        }, {
            101100110: "X"
        }, {
            100110110: "Y"
        }, {
            100111010: "Z"
        }, {
            100101110: "-"
        }, {
            111010100: "."
        }, {
            111010010: " "
        }, {
            111001010: "$"
        }, {
            101101110: "/"
        }, {
            101110110: "+"
        }, {
            110101110: "%"
        }, {
            100100110: "($)"
        }, {
            111011010: "(%)"
        }, {
            111010110: "(/)"
        }, {
            100110010: "(+)"
        }, {
            101011110: "*"
        }],
        E = function(n) {
            var t = [],
                e = [];
            n.pop();
            for (var r = Math.ceil(n.reduce(function(n, t) {
                    return n + t
                }, 0) / n.length), o = Math.ceil(n.reduce(function(n, t) {
                    return t < r ? (n + t) / 2 : n
                }, 0)), i = 0; i < n.length; i += 1)
                for (var a = n[i]; a > 0;) i % 2 == 0 ? e.push(1) : e.push(0), a -= o;
            for (var u = function(n) {
                    var r = e.slice(n, n + 9).join(""),
                        o = x.filter(function(n) {
                            return Object.keys(n)[0] === r
                        });
                    t.push(o[0][r])
                }, c = 0; c < e.length; c += 9) u(c);
            if ("*" !== t.shift() || "*" !== t.pop()) return null;
            for (var w, f = t.pop(), l = 0, s = function(n) {
                    return Object.values(n)[0] === w
                }, h = t.length - 1; h >= 0; h -= 1) w = t[h], l += x.indexOf(x.filter(s)[0]) * (1 + (t.length - (h + 1)) % 20);
            if (Object.values(x[l % 47])[0] !== f) return null;
            var p = t.pop();
            l = 0;
            for (var d = t.length - 1; d >= 0; d -= 1) w = t[d], l += x.indexOf(x.filter(s)[0]) * (1 + (t.length - (d + 1)) % 20);
            return Object.values(x[l % 47])[0] !== p ? null : t.join("")
        },
        j = {
            3211: "0",
            2221: "1",
            2122: "2",
            1411: "3",
            1132: "4",
            1231: "5",
            1114: "6",
            1312: "7",
            1213: "8",
            3112: "9"
        },
        L = function(n) {
            var t = "";
            n.unshift(0);
            for (var e = ~~((n[1] + n[2] + n[3]) / 3), r = 1; r < n.length; r += 1) {
                var o = void 0;
                o = t.length < 6 ? n.slice(4 * r, 4 * r + 4) : n.slice(4 * r + 5, 4 * r + 9);
                var i = [Math.round(o[0] / e), Math.round(o[1] / e), Math.round(o[2] / e), Math.round(o[3] / e)],
                    a = j[i.join("")] || j[i.reverse().join("")];
                if (a && (t += a), 12 === t.length) break
            }
            return t
        },
        S = {
            3211: "0",
            2221: "1",
            2122: "2",
            1411: "3",
            1132: "4",
            1231: "5",
            1114: "6",
            1312: "7",
            1213: "8",
            3112: "9"
        },
        C = function(n) {
            var t = "";
            n.unshift(0);
            for (var e = ~~((n[1] + n[2] + n[3]) / 3), r = 1; r < n.length; r += 1) {
                var o = void 0;
                o = t.length < 4 ? n.slice(4 * r, 4 * r + 4) : n.slice(4 * r + 5, 4 * r + 9);
                var i = [Math.round(o[0] / e), Math.round(o[1] / e), Math.round(o[2] / e), Math.round(o[3] / e)],
                    a = S[i.join("")] || S[i.reverse().join("")];
                if (a && (t += a), 8 === t.length) break
            }
            return t
        },
        O = {
            nnnnnww: "0",
            nnnnwwn: "1",
            nnnwnnw: "2",
            wwnnnnn: "3",
            nnwnnwn: "4",
            wnnnnwn: "5",
            nwnnnnw: "6",
            nwnnwnn: "7",
            nwwnnnn: "8",
            wnnwnnn: "9",
            nnnwwnn: "-",
            nnwwnnn: "$",
            wnnnwnw: ":",
            wnwnnnw: "/",
            wnwnwnn: ".",
            nnwwwww: "+",
            nnwwnwn: "A",
            nnnwnww: "B",
            nwnwnnw: "C",
            nnnwwwn: "D"
        },
        N = function(n) {
            for (var t = [], e = Math.ceil(n.reduce(function(n, t) {
                    return (n + t) / 2
                }, 0)); n.length > 0;) {
                var r = n.splice(0, 8).splice(0, 7).map(function(n) {
                    return n < e ? "n" : "w"
                }).join("");
                t.push(O[r])
            }
            return t.join("")
        };
    return e(function(n) {
        var e = {
            "code-128": v,
            "code-2of5": y,
            "code-39": b,
            "code-93": E,
            "ean-13": L,
            "ean-8": C,
            codabar: N
        };

        function o(n, t) {
            return a.apply(this, arguments)
        }

        function a() {
            return (a = i(r.mark(function n(t, o) {
                var i, a, u, c, w, l, s, h, p, d, v, g, y, m, b;
                return r.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                        case 0:
                            if (o.barcode = o.barcode.toLowerCase(), -1 !== (i = Object.keys(e)).indexOf(o.barcode)) {
                                n.next = 4;
                                break
                            }
                            throw new Error("Invalid barcode specified. Available decoders: ".concat(i, ". https://github.com/mubaidr/Javascript-Barcode-Reader#available-decoders"));
                        case 4:
                            return n.next = 6, f.getImageDataFromSource(t);
                        case 6:
                            a = n.sent, u = a.data, c = a.width, w = a.height, l = u.length / (c * w), h = (s = [1, 9, 2, 8, 3, 7, 4, 6, 5]).length, p = w / (h + 1);
                        case 14:
                            if (!(h -= 1)) {
                                n.next = 26;
                                break
                            }
                            if (d = l * c * Math.floor(p * s[h]), v = l * c * Math.floor(p * s[h]) + 2 * l * c, g = f.getLines({
                                    data: u,
                                    start: d,
                                    end: v,
                                    width: c,
                                    height: w,
                                    channels: l
                                }), y = g.lines, m = g.padding, !y || 0 === y.length) {
                                n.next = 24;
                                break
                            }
                            if (m.left && y.shift(), m.right && y.pop(), !(b = e[o.barcode](y, o.type))) {
                                n.next = 24;
                                break
                            }
                            return n.abrupt("return", b);
                        case 24:
                            n.next = 14;
                            break;
                        case 26:
                            throw new Error("Failed to extract barcode!");
                        case 27:
                        case "end":
                            return n.stop()
                    }
                }, n)
            }))).apply(this, arguments)
        }
        n && n.exports ? n.exports = o : t.javascriptBarcodeReader = o
    })
}(window.jimp);
//# sourceMappingURL=javascript-barcode-reader.min.js.map