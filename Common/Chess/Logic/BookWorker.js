var CBDebug = CBDebug || {};
CBDebug.assert = function() {}
;
"use strict";
var CB = {
    V0: function(a) {
        a = a.split(".");
        var c = CB;
        "CB" === a[0] && (a = a.slice(1));
        for (var b = 0; b < a.length; b += 1)
            "undefined" === typeof c[a[b]] && (c[a[b]] = {}),
            c = c[a[b]]
    },
    inherit: function(a, c) {
        var b = a.prototype;
        a.prototype = new c;
        for (var d in b)
            b.hasOwnProperty(d) && (a.prototype[d] = b[d]);
        a.superClass = c;
        a.prototype.superClass = c.prototype;
        return a
    },
    V1: function(a, c) {
        for (var b in c)
            c.hasOwnProperty(b) && (a.prototype[b] = c[b])
    },
    V2: function(a, c) {
        return ObjUtil.copyTo(c, a, !0)
    },
    V3: function(a, c) {
        Object.defineProperty(a, c, {
            writable: !1
        })
    },
    V4: function(a, c, b, d) {
        Object.defineProperty(a, c, {
            get: b,
            set: d
        })
    },
    V5: function(a, c, b, d) {
        Object.defineProperty(a.prototype, c, {
            get: b,
            set: d
        })
    }
};
function getCtxFunction(a, c) {
    return function() {
        return c.apply(a, arguments)
    }
}
Function.prototype.bind || (Function.prototype.bind = function(a) {
    return getCtxFunction(a, this)
}
);
var ListenersUtil = {
    initInstForListeners: function(a) {
        a.addListener = ListenersUtil.addListener;
        a.removeListener = ListenersUtil.removeListener;
        a.fireEvent = ListenersUtil.fireEvent;
        a.getListeners = ListenersUtil.getListeners;
        a.enableEvents = ListenersUtil.enableEvents;
        a.eventsEnabled = !0;
        a.idLstnr = 0
    },
    initForListeners: function(a) {
        ListenersUtil.initInstForListeners(a.prototype)
    },
    enableEvents: function(a) {
        this.eventsEnabled = a
    },
    getListeners: function(a) {
        a = "m_lstOn" + a;
        var c = this[a];
        c || (c = {},
        this[a] = c);
        return c
    },
    addListener: function(a, c) {
        this.getListeners(a)[this.idLstnr] = c;
        return this.idLstnr++
    },
    removeListener: function(a, c) {
        delete this.getListeners(a)[c]
    },
    fireEvent: function(a, c) {
        if (this.eventsEnabled) {
            var b = this.getListeners(a), d;
            for (d in b)
                b.hasOwnProperty(d) && b[d].apply(this, c)
        }
    },
    addInstEvent: function(a, c, b) {
        a[String.formatEx("addOn{0}Listener", c)] = function(d) {
            return this.addListener(c, d)
        }
        ;
        a[String.formatEx("removeOn{0}Listener", c)] = function(d) {
            this.removeListener(c, d)
        }
        ;
        a[String.formatEx("fireOn{0}", c)] = function() {
            var d = arguments || [];
            b && (d = b.call(this));
            this.fireEvent(c, d)
        }
    },
    addEvent: function(a, c, b) {
        ListenersUtil.addInstEvent(a.prototype, c, b)
    }
};
function NOT(a) {
    return function() {
        return !a.apply(this, arguments)
    }
}
function TRUE() {
    return function() {
        return !0
    }
}
function FALSE() {
    return function() {
        return !1
    }
}
function EqualsFilter(a) {
    return function(c) {
        return ObjUtil.equals(c, a)
    }
}
"use strict";
var ObjUtil = {
    clone: function(a, c) {
        c || (c = new HashTable);
        var b = c.getItem(a);
        if (b)
            return b;
        b = null;
        a.clone ? b = a.clone(c) : (b = ObjUtil.isArray(a) ? [] : new a.constructor,
        c.setItem(a, b),
        ObjUtil.copyTo(a, b, !1, c));
        c.setItem(a, b);
        return b
    },
    clone2: function(a) {
        return ObjUtil.copyTo2(a, new a.constructor)
    },
    cloneNoFunc: function(a) {
        a = JSON.stringify(a);
        return JSON.parse(a)
    },
    copyTo: function(a, c, b, d) {
        for (var e in a)
            if (!(b && e in c)) {
                var g = a[e]
                  , f = g;
                null != g && "object" === typeof g && (f = ObjUtil.clone(g, d));
                c[e] = f
            }
        a.toString !== c.toString && (c.toString = a.toString);
        return c
    },
    copyTo2: function(a, c) {
        for (var b in a) {
            var d = a[b]
              , e = d;
            null != d && "object" === typeof d && (e = ObjUtil.clone2(d));
            c[b] = e
        }
        return c
    }
};
function _CMP(a, c) {
    if (void 0 === a !== (void 0 === c))
        return !1;
    if (void 0 === a && void 0 === c)
        return !0;
    if (null === a !== (null === c))
        return !1;
    if (null === a && null === c)
        return !0;
    var b = typeof a
      , d = typeof c;
    return "object" === b !== ("object" === d) ? !1 : "object" === b && "object" === d ? ObjUtil.equals(a, c) : a == c
}
ObjUtil.equals = function(a, c) {
    if (a.equals)
        return a.equals(c);
    for (var b in a)
        if (!_CMP(a[b], c[b]))
            return !1;
    return !0
}
;
ObjUtil.isEmpty = function(a) {
    return !Object.keys(a).length
}
;
ObjUtil.isFunction = function(a) {
    return !(!a || !a.constructor || !a.call || !a.apply)
}
;
ObjUtil.isArray = function(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
}
;
function djb2(a) {
    for (var c = 5381, b, d = 0; d < a.length; ++d)
        b = a.charCodeAt(d) & 255,
        c = 4294967295 & (c << 5) + c + b;
    return c
}
function StringHash(a) {
    return djb2(typeof a + a.constructor.toString())
}
ObjUtil.hashCode = function(a) {
    return a.hashCode ? a.hashCode() : "object" === typeof a ? StringHash(a) : djb2(a.toString())
}
;
function EnumToString(a, c) {
    for (var b in a)
        if (a[b] === c)
            return b;
    return ""
}
function StringToEnum(a, c) {
    if (c in a)
        return a[c]
}
function StringToEnumFlags(a, c) {
    for (var b = c.split("|"), d = 0, e = 0, g = b.length; e < g; ++e) {
        var f = StringToEnum(a, b[e]);
        f && (d |= f)
    }
    return d
}
function evalObj(a) {
    var c = {}, b;
    for (b in a) {
        var d = a[b];
        c[b] = d;
        "string" === typeof d && (0 > d.indexOf("{") || (c[b] = eval("(" + d + ")")))
    }
    return c
}
function minusToCamel(a) {
    for (var c = a.indexOf("-"); 0 <= c; c = a.indexOf("-")) {
        var b = a.substring(0, c);
        a = a.substring(c + 1);
        0 < a.length && (a = a.charAt(0).toUpperCase() + (1 < a.length ? a.substring(1) : ""));
        a = b + a
    }
    return a
}
(function() {
    function a(d) {
        for (var c = "", a = b.lastIndex = 0; ; ) {
            var f = b.exec(d);
            if (!f)
                break;
            var h = f.index;
            h > a && (a = d.substring(a, h).quote(),
            c && (c += "+"),
            c += a);
            f = f[1];
            a = parseInt(f);
            h = "nz(";
            h = isNaN(a) ? h + ("(_a." + f + ")") : h + ("(_a[" + (a + 1) + "])");
            h += ")";
            c && (c += "+");
            c += h;
            a = b.lastIndex
        }
        d.length > a && (d = d.substring(a).quote(),
        c && (c += "+"),
        c += d);
        return new Function("_a","var nz = function(_v){if(_v === undefined || _v === null)return ''; return _v.toString()};return " + c + ";")
    }
    var c = {}
      , b = /{(\w+(\.\w+)*(\[\d+\])?)}/g;
    String.formatEx || (String.formatEx = function(d) {
        var b = c[d];
        b || (b = a(d),
        c[d] = b);
        var g = arguments;
        2 === arguments.length && ("object" === typeof arguments[1] && 0 > d.indexOf("{0}")) && (g = arguments[1]);
        return b(g)
    }
    );
    String.f = String.formatEx;
    String.vformatEx || (String.vformatEx = function(d, c) {
        return a(d)(c)
    }
    )
}
)();
CB.V7 = {
    V8: function(a, c) {
        a.charAt(0) == c && (a = a.slice(1, a.length - 1));
        2 < a.length && a.charAt(a.length - 1) == c && (a = a.slice(0, a.length - 1));
        return a
    }
};
function Char() {}
Char.IsDigit = function(a) {
    return "9" >= a && "0" <= a
}
;
Char.IsLetter = function(a) {
    return "z" >= a && "a" <= a || "Z" >= a && "A" <= a
}
;
Char.IsUpperCaseLetter = function(a) {
    return "Z" >= a && "A" <= a
}
;
Char.IsLetterOrDigit = function(a) {
    return Char.IsLetter(a) || Char.IsDigit(a)
}
;
Char.IsWhiteSpace = function(a) {
    return "\r" === a || "\n" === a || " " === a || "\t" === a
}
;
Char.getIsChar = function(a) {
    return function(c) {
        return c === a
    }
}
;
Char.getIsNotChar = function(a) {
    return function(c) {
        return c !== a
    }
}
;
function StringIterator(a) {
    this.m_str = a;
    this.m_len = a.length
}
StringIterator.prototype.m_str = null;
StringIterator.prototype.m_inx = -1;
StringIterator.g_hasIndex = function() {
    return "a" === "ab"[0]
}();
StringIterator.g_hasIndex ? (StringIterator.prototype.Current = function() {
    return this.m_str[this.m_inx]
}
,
StringIterator.prototype.Peek = function() {
    return this.m_inx >= this.m_len - 1 ? 0 : this.m_str[this.m_inx + 1]
}
,
StringIterator.prototype.Next = function() {
    ++this.m_inx;
    return this.m_inx === this.m_len ? 0 : this.m_str[this.m_inx]
}
) : (StringIterator.prototype.Current = function() {
    return this.m_str.charAt(this.m_inx)
}
,
StringIterator.prototype.Peek = function() {
    return this.m_inx >= this.m_len - 1 ? 0 : this.m_str.charAt(this.m_inx + 1)
}
,
StringIterator.prototype.Next = function() {
    ++this.m_inx;
    return this.m_inx === this.m_len ? 0 : this.m_str.charAt(this.m_inx)
}
);
StringIterator.prototype.CurrentString = function(a) {
    return this.SubString(this.m_inx, a)
}
;
StringIterator.prototype.NextString = function(a) {
    return this.SubString(this.m_inx + 1, a)
}
;
StringIterator.prototype.SubString = function(a, c) {
    var b = this.m_len - a;
    if (!c || c > b)
        c = b;
    return this.m_str.substring(a, a + c)
}
;
StringIterator.prototype.getPosition = function() {
    return this.m_inx
}
;
StringIterator.prototype.setPosition = function(a) {
    this.m_inx = a
}
;
StringIterator.prototype.skip = function(a) {
    this.m_inx += a
}
;
StringIterator.prototype.isEOF = function() {
    return this.m_inx === this.m_len
}
;
StringIterator.prototype.AcceptWhile = function(a, c) {
    var b = "";
    if (c) {
        var d = this.Current();
        if (!a(d))
            return b;
        b = d
    }
    for (d = this.Next(); 0 !== d && a(d); d = this.Next())
        b += d;
    return b
}
;
StringIterator.prototype.AcceptUntil = function(a, c) {
    return this.AcceptWhile(NOT(a), c)
}
;
StringIterator.prototype.AcceptStr = function(a, c) {
    var b = a.length;
    return (c ? this.CurrentString(b) : this.NextString(b)) === a ? (c || ++b,
    this.skip(b),
    !0) : !1
}
;
StringIterator.prototype.AcceptChar = function(a, c) {
    if (c) {
        if (this.Current() === a)
            return this.skip(1),
            !0
    } else if (this.Peek() === a)
        return this.skip(2),
        !0;
    return !1
}
;
StringIterator.prototype.skipWhile = function(a, c) {
    if (!c || a(this.Current()))
        for (var b = this.Next(); 0 !== b && a(b); b = this.Next())
            ;
}
;
StringIterator.prototype.skipUntil = function(a) {
    return this.skipWhite(NOT(a))
}
;
String.prototype.trim || (String.prototype.trim = function() {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}
);
String.quote || (String.prototype.quote = function() {
    return '"' + this.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'
}
);
String.startsWith || (String.prototype.startsWith = function(a) {
    return this.indexOf ? 0 === this.indexOf(a) : !1
}
);
String.capitalize || (String.capitalize = function() {
    return !this.length ? this : this[0].toUpperCase() + this.substring(1, this.length).toLowerCase()
}
);
"use strict";
CB.V9 = function() {
    var a = function() {
        this.nSize = this.Va = 0;
        this.Vb = new ArrayBuffer(188);
        this.viewBuf = new DataView(this.Vb);
        this.Vc = [];
        this.Vd = []
    };
    a.prototype.Ve = function() {
        this.nSize = this.Va = 0;
        this.Vc = [];
        this.Vd = []
    }
    ;
    a.prototype.Vf = function() {
        this.Va = 0;
        this.Vc = [];
        this.Vd = []
    }
    ;
    a.prototype.Vg = function() {
        return this.Va
    }
    ;
    a.prototype.Vh = function(c) {
        if (c <= this.nSize && c <= this.Vb.byteLength)
            this.Va = c;
        else
            throw "Error: SetPos exceeds DataBuffer size";
    }
    ;
    a.prototype.getSize = function() {
        return this.nSize
    }
    ;
    a.prototype.Vi = function(c) {
        if (c >= this.Vb.byteLength)
            throw "DBuf setSize illegal";
        this.nSize = c
    }
    ;
    a.prototype.Vj = function() {
        return this.nSize + 4
    }
    ;
    a.prototype.Vk = function(c, a) {
        c.setInt32(a, this.nSize);
        this.Vl(c, a, 4);
        a += 4;
        for (var d = 0; d < this.nSize; d++)
            c.setUint8(d + a, this.viewBuf.getUint8(d))
    }
    ;
    a.prototype.Vm = function(c, a) {
        this.Vl(c, a, 4);
        var d = c.getInt32(a);
        if (35E4 > d && 0 <= d) {
            this.Vn(d);
            a += 4;
            for (var e = 0; e < d; e++) {
                var g = c.getUint8(e + a);
                this.viewBuf.setUint8(e, g)
            }
            this.Vo(d)
        }
    }
    ;
    a.prototype.Vp = function(c) {
        c = CB.Vq.Vr(c);
        this.Vs(c)
    }
    ;
    a.prototype.Vs = function(c) {
        this.Vn(c.length + 4);
        this.Vt(c.length);
        for (var a = 0; a < c.length; a++) {
            var d = c.charCodeAt(a);
            this.viewBuf.setUint8(this.Va + a, d)
        }
        this.Vo(c.length)
    }
    ;
    a.prototype.Vu = function(c) {
        var a = this.Vv();
        if (a <= c && 25E4 > a) {
            c = "";
            for (var d = 0; d < a; d++) {
                var e = this.viewBuf.getUint8(this.Va + d);
                c += String.fromCharCode(e)
            }
            c = CB.Vq.Vw(c);
            this.Va += a
        } else
            throw Error("Data Error: Read String");
        return c
    }
    ;
    a.prototype.Vx = function(c) {
        this.Vn(c.length + 4);
        this.Vt(c.length);
        for (var a = 0; a < c.length; a++) {
            var d = c.charCodeAt(a);
            this.viewBuf.setUint8(this.Va + a, d)
        }
        this.Vo(c.length)
    }
    ;
    a.prototype.Vy = function(c) {
        var a = ""
          , d = this.Vv();
        if (d <= c && 25E4 > d) {
            for (c = 0; c < d; c++)
                var e = this.viewBuf.getUint8(this.Va + c)
                  , a = a + String.fromCharCode(e);
            this.Va += d
        } else
            throw Error("Data Error: Read String, maxLen=" + c);
        return a
    }
    ;
    a.prototype.Vz = function(c) {
        this.Vn(c.length + 2);
        this.writeUint8(c.length + 1);
        for (var a = 0; a < c.length; a++) {
            var d = c.charCodeAt(a);
            this.viewBuf.setUint8(this.Va + a, d)
        }
        this.viewBuf.setUint8(this.Va + c.length, 0);
        this.Vo(c.length + 1)
    }
    ;
    a.prototype.V10 = function(c) {
        var a = ""
          , d = this.V11();
        0 < d && (d -= 1);
        if (d <= c && 254 > d) {
            for (c = 0; c < d; c++)
                var e = this.viewBuf.getUint8(this.Va + c)
                  , a = a + String.fromCharCode(e);
            this.Va += d + 1
        } else
            throw Error("Data Error: Read ByteLenString, maxLen=" + c);
        return a
    }
    ;
    a.prototype.V12 = function(c) {
        var a = "";
        if (25E4 > c) {
            for (var d = 0; d < c; d++)
                var e = this.viewBuf.getUint8(this.Va + d)
                  , a = a + String.fromCharCode(e);
            this.Va += c
        } else
            throw Error("Data Error: Read SizedString, max=" + c);
        return a
    }
    ;
    a.prototype.V13 = function(a) {
        var b = a.length;
        this.Vn(b);
        for (var d = 0; d < b; d++) {
            var e = a.charCodeAt(d);
            this.viewBuf.setUint8(this.Va + d, e)
        }
        this.Vo(b)
    }
    ;
    a.prototype.V14 = function(a) {
        var b;
        if (25E4 > a) {
            b = "";
            for (var d = 0; d < a; d++) {
                var e = this.viewBuf.getUint8(this.Va + d);
                b += String.fromCharCode(e)
            }
            b = CB.Vq.Vw(b);
            this.Va += a
        } else
            throw Error("Data Error: Read UTF8String, len=" + a);
        return b
    }
    ;
    a.prototype.readByteArray = function(a) {
        for (var b = [], d = 0; d < a && this.Va + d < this.nSize; d++)
            b.push(this.viewBuf.getUint8(this.Va + d));
        this.Va += a;
        return b
    }
    ;
    a.prototype.writeByteArray = function(a, b) {
        for (var d = 0; d < a.length && d < b; d++)
            this.writeByte(a[d])
    }
    ;
    a.prototype.V15 = function(a) {
        this.Vt(a.getSize());
        this.Vn(a.getSize());
        for (var b = 0; b < a.getSize(); b++)
            this.viewBuf.setUint8(this.Va + b, a.viewBuf.getUint8(b));
        this.Vo(a.getSize())
    }
    ;
    a.prototype.V16 = function() {
        var a = new CB.V9
          , b = this.Vv();
        a.Vn(b);
        for (var d = 0; d < b; d++)
            a.viewBuf.setUint8(d, this.viewBuf.getUint8(this.Va + d));
        this.Va += b;
        a.Vo(b);
        a.Va = 0;
        return a
    }
    ;
    a.prototype.V17 = function(a) {
        this.Vn(a.getSize());
        for (var b = 0; b < a.getSize(); b++)
            this.viewBuf.setUint8(this.Va + b, a.viewBuf.getUint8(b));
        this.Vo(a.getSize())
    }
    ;
    a.prototype.V18 = function(a) {
        if (void 0 === a)
            throw Error("writeBool, value undefined");
        this.Vn(1);
        a ? this.viewBuf.setUint8(this.Va, 1) : this.viewBuf.setUint8(this.Va, 0);
        this.Vo(1)
    }
    ;
    a.prototype.V19 = function(a) {
        a = this.viewBuf.getUint8(this.Va);
        this.Va += 1;
        return 0 != a
    }
    ;
    a.prototype.writeUint8 = function(a) {
        if (void 0 === a)
            throw Error("writeUint8, value undefined");
        this.Vn(1);
        this.viewBuf.setUint8(this.Va, a);
        this.Vo(1)
    }
    ;
    a.prototype.V11 = function() {
        var a = this.viewBuf.getUint8(this.Va);
        this.Va += 1;
        return a
    }
    ;
    a.prototype.readByte = a.prototype.V11;
    a.prototype.writeByte = a.prototype.writeUint8;
    a.prototype.V1a = function(a) {
        if (void 0 === a)
            throw Error("writeInt16, value undefined");
        this.Vn(2);
        this.viewBuf.setInt16(this.Va, a);
        this.Vl(this.viewBuf, this.Va, 2);
        this.Vo(2)
    }
    ;
    a.prototype.V1b = function() {
        var a = 0;
        this.Va <= this.viewBuf.byteLength - 2 && (this.Vl(this.viewBuf, this.Va, 2),
        a = this.viewBuf.getInt16(this.Va),
        this.Vl(this.viewBuf, this.Va, 2),
        this.Va += 2);
        return a
    }
    ;
    a.prototype.V1c = a.prototype.V1b;
    a.prototype.V1d = a.prototype.V1a;
    a.prototype.V1e = function(a) {
        if (void 0 === a)
            throw Error("writeUint16, value undefined");
        this.Vn(2);
        this.viewBuf.setUint16(this.Va, a);
        this.Vl(this.viewBuf, this.Va, 2);
        this.Vo(2)
    }
    ;
    a.prototype.V1f = function() {
        var a = 0;
        this.Va <= this.viewBuf.byteLength - 2 && (this.Vl(this.viewBuf, this.Va, 2),
        a = this.viewBuf.getUint16(this.Va),
        this.Vl(this.viewBuf, this.Va, 2),
        this.Va += 2);
        return a
    }
    ;
    a.prototype.Vt = function(a) {
        if (void 0 === a)
            throw Error("writeInt32, value undefined");
        this.Vn(4);
        this.viewBuf.setInt32(this.Va, a);
        this.Vl(this.viewBuf, this.Va, 4);
        this.Vo(4)
    }
    ;
    a.prototype.V1g = function(a) {
        this.Vt(a);
        this.Vt(0)
    }
    ;
    a.prototype.V1h = function() {
        var a = this.Vv();
        this.Vv();
        return a
    }
    ;
    a.prototype.Vv = function() {
        var a = 0;
        this.Va <= this.viewBuf.byteLength - 4 && (this.Vl(this.viewBuf, this.Va, 4),
        a = this.viewBuf.getInt32(this.Va),
        this.Vl(this.viewBuf, this.Va, 4),
        this.Va += 4);
        return a
    }
    ;
    a.prototype.writeInt = a.prototype.Vt;
    a.prototype.readInt = a.prototype.Vv;
    a.prototype.V1i = function(a) {
        this.Vn(4);
        this.viewBuf.setUint32(this.Va, a);
        this.Vl(this.viewBuf, this.Va, 4);
        this.Vo(4)
    }
    ;
    a.prototype.V1j = function() {
        var a = 0;
        this.Va <= this.viewBuf.byteLength - 4 && (this.Vl(this.viewBuf, this.Va, 4),
        a = this.viewBuf.getUint32(this.Va),
        this.Vl(this.viewBuf, this.Va, 4),
        this.Va += 4);
        return a
    }
    ;
    a.prototype.V1k = function(a) {
        a = a.getYear() << 9 | a.getMonth() << 5 | a.getDay();
        this.V1i(a)
    }
    ;
    a.prototype.V1l = function() {
        var a = new CB.V1m
          , b = this.V1j();
        a.setYear(b >> 9);
        a.setMonth(b >> 5 & 15);
        a.setDay(b & 31);
        return a
    }
    ;
    a.prototype.V1n = function() {
        var a = this.V1j();
        return new CB.V1o(a)
    }
    ;
    a.prototype.V1p = function(a) {
        if (void 0 === a)
            throw Error("writeInt64, value undefined");
        var b = Math.floor(a / 4294967296);
        this.Vt(a - b);
        this.Vt(b)
    }
    ;
    a.prototype.V1q = function() {
        if (this.Va <= this.viewBuf.byteLength - 8) {
            this.Vl(this.viewBuf, this.Va, 8);
            var a = this.viewBuf.getUint32(this.Va);
            this.Va += 4;
            var b = this.viewBuf.getUint32(this.Va);
            this.Va += 4;
            return 4294967296 * a + b
        }
        return 0
    }
    ;
    a.prototype.V1r = function() {
        if (this.Va <= this.viewBuf.byteLength - 8) {
            this.Vl(this.viewBuf, this.Va, 8);
            var a = this.viewBuf.getInt32(this.Va);
            this.Va += 4;
            var b = this.viewBuf.getUint32(this.Va);
            this.Va += 4;
            return 4294967296 * a + b
        }
        return 0
    }
    ;
    a.prototype.V1s = function(a) {
        this.Vn(4);
        this.viewBuf.setFloat32(this.Va, a);
        this.Vl(this.viewBuf, this.Va, 4);
        this.Vo(4)
    }
    ;
    a.prototype.V1t = function() {
        this.Vl(this.viewBuf, this.Va, 4);
        var a = this.viewBuf.getFloat32(this.Va);
        this.Va += 4;
        return a
    }
    ;
    a.prototype.V1u = function(a) {
        this.Vn(8);
        this.viewBuf.setFloat64(this.Va, a);
        this.Vl(this.viewBuf, this.Va, 8);
        this.Vo(8)
    }
    ;
    a.prototype.V1v = function() {
        this.Vl(this.viewBuf, this.Va, 8);
        var a = this.viewBuf.getFloat64(this.Va);
        this.Va += 8;
        return a
    }
    ;
    a.prototype.V1w = function() {
        for (var a = this.getSize(), b = "", b = [], d = 0; d < a; d++) {
            var e = this.viewBuf.getUint8(d);
            b[d] = e
        }
        return b = CB.V1x.V1y(b, a)
    }
    ;
    a.prototype.V1z = function(a, b) {
        this.Ve();
        if (b) {
            var d = []
              , e = CB.V1x.V20(d, a);
            if (0 < e)
                for (var g = 0; g < e; g++)
                    this.writeByte(d[g])
        } else {
            d = 0;
            10 < a.length && (d = parseInt(a.substr(0, 10), 10));
            0 > d && (d = 0);
            for (e = 0; e < d; e++)
                g = a.substr(10 + 2 * e, 2),
                g = parseInt(g, 16),
                this.writeByte(g)
        }
    }
    ;
    a.prototype.V21 = function() {
        var a = this.V11()
          , b = this.V11()
          , d = this.V11()
          , e = this.V11();
        return a << 24 | b << 16 | d << 8 | e
    }
    ;
    a.prototype.V22 = function(a) {
        if (void 0 === a)
            throw Error("writeInt32, value undefined");
        this.Vn(4);
        this.viewBuf.setInt32(this.Va, a);
        this.Vo(4)
    }
    ;
    a.prototype.V23 = function() {
        var a = this.V11()
          , b = this.V11()
          , d = this.V11();
        return a << 16 | b << 8 | d
    }
    ;
    a.prototype.V24 = function() {
        var a = this.V11()
          , b = this.V11();
        return 256 * a + b
    }
    ;
    a.prototype.V25 = function(a) {
        var b = a >> 8
          , d = a & 255;
        this.writeUint8(a >> 16);
        this.writeUint8(b);
        this.writeUint8(d)
    }
    ;
    a.prototype.V26 = function(a) {
        var b = a & 255;
        this.writeUint8(a >> 8);
        this.writeUint8(b)
    }
    ;
    a.prototype.V27 = function(a) {
        var b = a.length;
        this.Vt(b);
        for (var d = 0; d < b; ++d)
            a[d].write(this)
    }
    ;
    a.prototype.V28 = function(a) {
        var b = a.length;
        this.V1a(b);
        for (var d = 0; d < b; ++d)
            a[d].write(this)
    }
    ;
    a.prototype.V29 = function(a, b) {
        var d = this.Vv();
        65534 < d && CBDebug.assert(65535 > d);
        a.length = d;
        for (var e = 0; e < d; ++e) {
            var g = b(this);
            a[e] = g
        }
    }
    ;
    a.prototype.V2a = function(a, b) {
        var d = this.V1b();
        a.length = d;
        for (var e = 0; e < d; ++e) {
            var g = b(this);
            a[e] = g
        }
    }
    ;
    a.prototype.V2b = function() {
        this.Vc.push(this.Vg());
        this.Vt(0)
    }
    ;
    a.prototype.V2c = function() {
        var a = this.Vg();
        if (0 < this.Vc.length) {
            this.Vh(this.Vc[this.Vc.length - 1]);
            var b = this.nSize;
            this.Vt(a - this.Vc[this.Vc.length - 1] - 4);
            this.nSize = b;
            this.Vh(a);
            this.Vc.pop()
        } else
            throw Error("DB::EndWrite");
    }
    ;
    a.prototype.V2d = function() {
        this.Vc.push(this.Vg());
        this.Vd.push(this.Vv())
    }
    ;
    a.prototype.V2e = function() {
        if (0 < this.Vc.length && 0 < this.Vd.length) {
            var a = this.Vg() - this.Vc[this.Vc.length - 1] - 4;
            this.skip(this.Vd[this.Vd.length - 1] - a);
            this.Vc.pop();
            this.Vd.pop()
        } else
            throw Error("DB::EndRead");
    }
    ;
    a.prototype.V2f = function() {
        var a = this.Vv();
        this.skip(a)
    }
    ;
    a.prototype.skip = function(a) {
        if (this.Va + a <= this.nSize)
            this.Va += a;
        else
            throw Error("DB::Skip");
    }
    ;
    a.prototype.Vn = function(a) {
        if (this.Va + a >= this.Vb.byteLength || this.nSize + a >= this.Vb.byteLength) {
            var b = Math.max(this.Va, this.nSize)
              , d = 8 * Math.floor(3 * (b + a) / 16 + 1);
            if (d < a + b)
                throw "DataBuffer Size";
            a = new ArrayBuffer(d);
            b = new DataView(a);
            for (d = 0; d < this.Vb.byteLength / 4; d++)
                b.setUint32(4 * d, this.viewBuf.getUint32(4 * d));
            this.Vb = a;
            this.viewBuf = b
        }
    }
    ;
    a.prototype.Vo = function(a) {
        if (this.Va + a >= this.Vb.byteLength)
            throw "DataBuffer overrun";
        this.Va += a;
        this.nSize += a;
        if (this.nSize >= this.Vb.byteLength)
            throw "DataBuffer Size Limit exc.";
    }
    ;
    a.prototype.Vl = function(a, b, d) {
        for (var e = [], g = 0; g < d; g++)
            e.push(a.getUint8(b + g));
        for (g = 0; g < d; g++)
            a.setUint8(b + g, e[d - g - 1])
    }
    ;
    return a
}();
function createReadFactory(a) {
    return function(c) {
        var b = new a;
        b.V2g(c);
        return b
    }
}
function createReadFactory2(a) {
    return function(c) {
        var b = new a;
        b.V2h(c);
        return b
    }
}
"use strict";
CB.V2i = {
    V2j: 0,
    V2k: 1,
    V2l: 3
};
CB.V2i.V2m = 8;
CB.V2i.other = function(a) {
    return a ^ CB.V2i.V2k
}
;
CB.V2i.V2n = function(a) {
    return "w" === a ? CB.V2i.V2j : CB.V2i.V2k
}
;
CB.V2i.toString = function(a) {
    return a === CB.V2i.V2j ? "w" : "b"
}
;
CB.Piece = {
    V2o: 0,
    KING: 1,
    QUEEN: 2,
    KNIGHT: 3,
    BISHOP: 4,
    ROOK: 5,
    PAWN: 6,
    V2p: 1,
    V2q: 2,
    V2r: 3,
    V2s: 4,
    V2t: 5,
    V2u: 6,
    V2v: 9,
    V2w: 10,
    V2x: 11,
    V2y: 12,
    V2z: 13,
    V30: 14,
    V31: 8
};
CB.Piece.V32 = 7;
CB.Piece.V33 = function(a) {
    return a & CB.Piece.V32
}
;
CB.Piece.V34 = function(a) {
    return (a & CB.V2i.V2m) / 8
}
;
CB.Piece.V35 = function(a) {
    return a ^ CB.V2i.V2m
}
;
CB.Piece.V36 = function(a, c) {
    return a | 8 * c
}
;
CB.Piece.V37 = " KQNBRP  kqnbrp".split("");
CB.Piece.toString = function(a) {
    return CB.Piece.V37[a]
}
;
CB.Piece.V2n = function(a) {
    a = CB.Piece.V37.indexOf(a);
    return 0 > a ? CB.Piece.V2o : a
}
;
CB.V38 = {
    V2o: 0,
    V39: 1,
    V3a: 2,
    V3b: 4,
    V3c: 8
};
CB.V38.V3d = CB.V38.V3a | CB.V38.V39;
CB.V38.V3e = CB.V38.V3c | CB.V38.V3b;
CB.V38.V3f = CB.V38.V3d | CB.V38.V3e;
CB.V38.toString = function(a) {
    if (a === CB.V38.V2o)
        return "-";
    var c = "";
    a & CB.V38.V3a && (c += "K");
    a & CB.V38.V39 && (c += "Q");
    a & CB.V38.V3c && (c += "k");
    a & CB.V38.V3b && (c += "q");
    return c
}
;
CB.V38.V2n = function(a) {
    var c = CB.V38.V2o;
    a = new StringIterator(a);
    for (var b = a.Next(); 0 !== b; b = a.Next())
        switch (b) {
        case "K":
            c |= CB.V38.V3a;
            break;
        case "Q":
            c |= CB.V38.V39;
            break;
        case "k":
            c |= CB.V38.V3c;
            break;
        case "q":
            c |= CB.V38.V3b
        }
    return c
}
;
CB.V3g = {
    V3h: 0,
    V3i: 7,
    V3j: 3,
    V3k: 56,
    V3l: 0,
    V3m: 1,
    V3n: 2,
    V3o: 3,
    V3p: 4,
    V3q: 5,
    V3r: 6,
    V3s: 7,
    V3t: 8,
    V3u: 9,
    V3v: 10,
    V3w: 11,
    V3x: 12,
    V3y: 13,
    V3z: 14,
    V40: 15,
    V41: 16,
    V42: 17,
    V43: 18,
    V44: 19,
    V45: 20,
    V46: 21,
    V47: 22,
    V48: 23,
    V49: 24,
    V4a: 25,
    V4b: 26,
    V4c: 27,
    V4d: 28,
    V4e: 29,
    V4f: 30,
    V4g: 31,
    V4h: 32,
    V4i: 33,
    V4j: 34,
    V4k: 35,
    V4l: 36,
    V4m: 37,
    V4n: 38,
    V4o: 39,
    V4p: 40,
    V4q: 41,
    V4r: 42,
    V4s: 43,
    V4t: 44,
    V4u: 45,
    V4v: 46,
    V4w: 47,
    V4x: 48,
    V4y: 49,
    V4z: 50,
    V50: 51,
    V51: 52,
    V52: 53,
    V53: 54,
    V54: 55,
    V55: 56,
    V56: 57,
    V57: 58,
    V58: 59,
    V59: 60,
    V5a: 61,
    V5b: 62,
    V5c: 63,
    V5d: 0,
    V5e: 1,
    V5f: 2,
    V5g: 3,
    V5h: 4,
    V5i: 5,
    V5j: 6,
    V5k: 7,
    V5l: 0,
    V5m: 1,
    V5n: 2,
    V5o: 3,
    V5p: 4,
    V5q: 5,
    V5r: 6,
    V5s: 7
};
CB.V3g.g_arrSquareStrs = "a1 a2 a3 a4 a5 a6 a7 a8 b1 b2 b3 b4 b5 b6 b7 b8 c1 c2 c3 c4 c5 c6 c7 c8 d1 d2 d3 d4 d5 d6 d7 d8 e1 e2 e3 e4 e5 e6 e7 e8 f1 f2 f3 f4 f5 f6 f7 f8 g1 g2 g3 g4 g5 g6 g7 g8 h1 h2 h3 h4 h5 h6 h7 h8".split(" ");
CB.V3g.toString = function(a) {
    return this.g_arrSquareStrs[a]
}
;
CB.V3g.V5t = CB.V3g.toString;
CB.V3g.V5u = function(a, c) {
    return CB.V3g.V5t(CB.V3g.V5v(a, c))
}
;
CB.V3g.V5w = function(a) {
    return String.fromCharCode("a".charCodeAt() + a)
}
;
CB.V3g.V5x = function(a) {
    return a + 1
}
;
CB.V3g.V5y = function(a) {
    return a.charCodeAt(0) - "a".charCodeAt()
}
;
CB.V3g.V5z = function(a) {
    return a.charCodeAt(0) - "1".charCodeAt()
}
;
CB.V3g.V2n = function(a) {
    if (a && 2 === a.length) {
        var c = CB.V3g.V5y(a.charAt(0));
        a = CB.V3g.V5z(a.charAt(1));
        return CB.V3g.V60(c, a)
    }
}
;
CB.V3g.V61 = function(a) {
    return (a & CB.V3g.V3i) >> CB.V3g.V3h
}
;
CB.V3g.V62 = function(a) {
    return (a & CB.V3g.V3k) >> CB.V3g.V3j
}
;
CB.V3g.V63 = CB.V3g.V61;
CB.V3g.V64 = CB.V3g.V62;
CB.V3g.V65 = function(a, c) {
    var b = CB.V3g.V61(a) - CB.V3g.V61(c)
      , d = CB.V3g.V62(a) - CB.V3g.V62(c);
    return Math.sqrt(b * b + d * d)
}
;
CB.V3g.V60 = function(a, c) {
    return 8 * a + c
}
;
CB.V3g.V5v = CB.V3g.V60;
CB.V3g.V66 = function(a, c) {
    return a <= CB.V3g.V5k && a >= CB.V3g.V5d && c <= CB.V3g.V5s && c >= CB.V3g.V5l
}
;
CB.V3g.V67 = function(a) {
    var c = CB.V3g.V62(a);
    a = CB.V3g.V61(a);
    return !((c + a) % 2)
}
;
CB.V3g.V68 = function(a) {
    return !CB.V3g.V67(a)
}
;
CB.V3g.V69 = function(a, c) {
    var b = CB.V3g.V64(a) - CB.V3g.V64(c)
      , d = CB.V3g.V63(a) - CB.V3g.V63(c);
    return Math.sqrt(b * b + d * d)
}
;
CB.V3g.V6a = function(a) {
    return a === CB.V2i.V2j ? CB.V3g.V5s : CB.V3g.V5l
}
;
"use strict";
CB.Move = function() {
    var a = function(a, b, d) {
        this.to = this.from = 0;
        this.prom = CB.Piece.V2o;
        a && (this.from = a);
        b && (this.to = b);
        d && (this.prom = d)
    };
    a.V6b = new a(CB.V3g.V4h,CB.V3g.V4x);
    a.V6c = new a(CB.V3g.V4h,CB.V3g.V41);
    a.V6d = new a(CB.V3g.V4o,CB.V3g.V54);
    a.V6e = new a(CB.V3g.V4o,CB.V3g.V48);
    a.prototype.V6f = !1;
    a.prototype.V6g = !1;
    a.prototype.needCol = !1;
    a.prototype.needRow = !1;
    a.prototype.mvd = CB.Piece.V2o;
    a.prototype.vct = CB.Piece.V2o;
    a.prototype.piece = a.prototype.mvd;
    a.prototype.V6h = a.prototype.vct;
    a.prototype.V6i = !1;
    a.prototype.V6j = !1;
    a.prototype.isNullMove = function() {
        return this.from === this.to && !this.from
    }
    ;
    a.prototype.V6k = function() {
        return this.V6l() || this.V6m()
    }
    ;
    a.prototype.equals = function(a) {
        return this.from === a.from && this.to === a.to && this.prom === a.prom
    }
    ;
    a.prototype.V6n = function() {
        return this.from != this.to
    }
    ;
    a.prototype.V6o = function() {
        return this.equals(CB.Move.V6b) && this.mvd === CB.Piece.V2p || this.equals(CB.Move.V6d) && this.mvd === CB.Piece.V2v
    }
    ;
    a.prototype.V6l = function() {
        return this.V6i
    }
    ;
    a.prototype.V6p = function() {
        return this.equals(CB.Move.V6c) && this.mvd === CB.Piece.V2p || this.equals(CB.Move.V6e) && this.mvd === CB.Piece.V2v
    }
    ;
    a.prototype.V6m = function() {
        return this.V6j
    }
    ;
    a.prototype.setIsCastling = function() {
        this.V6i = this.V6o();
        this.V6j = this.V6p()
    }
    ;
    a.prototype.subLines = null;
    a.prototype.V6q = null;
    a.prototype.V6r = function() {
        return this.V6f
    }
    ;
    a.prototype.setCheck = function(a) {
        this.V6f = a
    }
    ;
    a.prototype.V6s = function() {
        return this.V6g
    }
    ;
    a.prototype.setMate = function(a) {
        this.V6g = a
    }
    ;
    a.prototype.V6t = function() {
        return this.vct != CB.Piece.V2o
    }
    ;
    a.prototype.getMoved = function() {
        return this.mvd
    }
    ;
    a.prototype.setMoved = function(a) {
        this.mvd = a
    }
    ;
    a.prototype.getVictim = function() {
        return this.vct
    }
    ;
    a.prototype.setVictim = function(a) {
        this.vct = a
    }
    ;
    a.prototype.getPiece = a.prototype.getMoved;
    a.prototype.V6u = function() {
        return this.prom != CB.Piece.V2o
    }
    ;
    a.prototype.V6v = function() {
        return this.mvd && (this.mvd & 7) == CB.Piece.PAWN
    }
    ;
    a.prototype.V6w = function() {
        return CB.Piece.V34(this.mvd)
    }
    ;
    a.prototype.V6x = function() {
        return this.needCol
    }
    ;
    a.prototype.setNeedCol = function(a) {
        this.needCol = a
    }
    ;
    a.prototype.V6y = function() {
        return this.needRow
    }
    ;
    a.prototype.setNeedRow = function(a) {
        this.needRow = a
    }
    ;
    a.prototype.getTreeMoveCount = function() {
        var a = 1;
        this.subLines && (a = this.subLines.V6z(function(a, d) {
            return a + d.getTreeMoveCount()
        }, a));
        return a
    }
    ;
    a.prototype.V70 = function(a) {
        return this.subLines ? this.subLines.indexOf(a) : -1
    }
    ;
    a.prototype.V71 = function(a) {
        if (this.subLines)
            for (var b = 0; b < this.subLines.length; ++b) {
                var d = this.subLines[b];
                if (d[0].equals(a))
                    return d
            }
        return null
    }
    ;
    a.prototype.V72 = function(a) {
        this.subLines && (a = this.subLines.indexOf(a),
        0 > a || this.subLines.splice(a, 1))
    }
    ;
    a.prototype.V73 = function() {
        this.subLines = null
    }
    ;
    a.prototype.getLine = function(a) {
        return this.subLines[a]
    }
    ;
    a.prototype.V74 = function() {
        return this.subLines
    }
    ;
    a.prototype.getSubLinesCount = function() {
        return !this.subLines ? 0 : this.subLines.length
    }
    ;
    a.prototype.hasLines = function() {
        return null != this.subLines && 0 < this.subLines.length
    }
    ;
    a.prototype.V75 = function(a, b) {
        this.subLines || (this.subLines = []);
        var d = new CB.V76(a,b);
        this.subLines.push(d);
        return d
    }
    ;
    a.prototype.V77 = function(a) {
        this.subLines || (this.subLines = []);
        this.subLines.push(a)
    }
    ;
    a.prototype.V78 = function(a, b) {
        this.subLines || (this.subLines = []);
        this.subLines.splice(a, 0, b)
    }
    ;
    a.prototype.V79 = function(a, b) {
        if (this.subLines) {
            var d = this.subLines[a];
            this.subLines[a] = this.subLines[b];
            this.subLines[b] = d
        }
    }
    ;
    a.prototype.write = function(a) {
        if (this.prom) {
            var b = this.to | this.prom - CB.Piece.QUEEN << 6;
            a.writeByte(this.from | 64);
            a.writeByte(b)
        } else
            a.writeByte(this.from),
            a.writeByte(this.to);
        this.V7b(a);
        this.V7c(a)
    }
    ;
    a.prototype.write2 = function(a) {
        if (this.prom) {
            var b = this.to | this.prom - CB.Piece.QUEEN << 6;
            a.writeByte(this.from | 64);
            a.writeByte(b)
        } else
            a.writeByte(this.from),
            a.writeByte(this.to);
        b = 0;
        this.V6q && this.V6q.V7d() && (b |= 1);
        this.getSubLinesCount() && (b |= 2);
        a.writeUint8(b);
        b & 1 && this.V7e(a);
        b & 2 && this.V7f(a)
    }
    ;
    a.prototype.V2g = function(a) {
        this.from = a.readByte();
        this.to = a.readByte();
        64 == (this.from & 192) && (this.prom = CB.Piece.QUEEN + (this.to >> 6));
        this.from &= 63;
        this.to &= 63;
        this.V7g(a);
        this.V7h(a)
    }
    ;
    a.prototype.V2h = function(a) {
        this.from = a.readByte();
        this.to = a.readByte();
        64 == (this.from & 192) && (this.prom = CB.Piece.QUEEN + (this.to >> 6));
        this.from &= 63;
        this.to &= 63;
        var b = a.readByte();
        b & 1 && this.V7i(a);
        b & 2 && this.V7j(a)
    }
    ;
    a.prototype.V7g = function(a) {
        this.V6q = CB.V7k.V7l(a)
    }
    ;
    a.prototype.V7i = function(a) {
        this.V6q = CB.V7k.V7m(a)
    }
    ;
    a.prototype.V7b = function(a) {
        CB.V7k.write(a, this.V6q)
    }
    ;
    a.prototype.V7e = function(a) {
        CB.V7k.write2(a, this.V6q)
    }
    ;
    a.prototype.V7h = function(a) {
        var b = a.readByte();
        if (127 >= b) {
            this.subLines = Array(b);
            for (var d = 0; d < b; ++d)
                this.subLines[d] = CB.V76.V7l(a)
        }
    }
    ;
    a.prototype.V7j = function(a) {
        var b = a.readByte();
        if (127 >= b) {
            this.subLines = Array(b);
            for (var d = 0; d < b; ++d)
                this.subLines[d] = CB.V76.V7m(a)
        }
    }
    ;
    a.prototype.V7c = function(a) {
        var b = this.getSubLinesCount();
        a.writeByte(b);
        if (b)
            for (var d = 0; d < b; ++d)
                this.subLines[d].write(a)
    }
    ;
    a.prototype.V7f = function(a) {
        var b = this.getSubLinesCount();
        a.writeByte(b);
        if (b)
            for (var d = 0; d < b; ++d)
                this.subLines[d].write2(a)
    }
    ;
    a.V7l = createReadFactory(a);
    a.V7m = createReadFactory2(a);
    a.prototype.V7n = function(a) {
        a.subLines = this.subLines;
        this.subLines = null
    }
    ;
    a.prototype.toString = function() {
        var a = CB.V3g.toString(this.from) + CB.V3g.toString(this.to);
        this.prom != CB.Piece.V2o && (a += CB.Piece.toString(this.prom).toLowerCase());
        return a
    }
    ;
    a.V7o = /^[a-h][1-8][a-h][1-8]([NBRQ])?$/i;
    a.V7p = function(c) {
        return a.V7o.test(c)
    }
    ;
    a.V2n = function(a) {
        var b = a.substring(0, 2)
          , d = a.substring(2, 4)
          , b = CB.V3g.V2n(b)
          , d = CB.V3g.V2n(d)
          , e = void 0;
        4 < a.length && (a = a.charAt(4),
        e = CB.Piece.V33(CB.Piece.V2n(a)));
        return new CB.Move(b,d,e)
    }
    ;
    a.prototype.V7q = function() {
        return {
            from: CB.V3g.toString(this.from),
            to: CB.V3g.toString(this.to),
            prom: "  Q N B R  ".split(" ")[this.prom % 8]
        }
    }
    ;
    a.prototype.V7r = function(a) {
        this.from = CB.V3g.V2n(a.from);
        this.to = CB.V3g.V2n(a.to);
        a = " KQNBR".search(RegExp(a.prom, "i"));
        this.prom = 0 < a ? a : 0;
        return {
            from: CB.V3g.toString(this.from),
            to: CB.V3g.toString(this.to),
            prom: "  Q N B R  ".split(" ")[this.prom % 8]
        }
    }
    ;
    a.prototype.setSubParentData = function(a, b, d) {
        if (this.subLines)
            for (var e = 0; e < this.subLines.length; ++e) {
                var g = this.subLines[e];
                g.setParentMoveIndex(b);
                g.setParentLine(a);
                d && g.setSubParentData(!0)
            }
    }
    ;
    a.prototype.V7s = function() {
        return this.V6q
    }
    ;
    a.prototype.V7t = function() {
        return null != this.V6q
    }
    ;
    a.prototype.V7u = function(a, b) {
        this.V6q || (this.V6q = new CB.V7k);
        this.V6q.setItem(a, b)
    }
    ;
    a.prototype.V7v = function(a) {
        this.V6q = a
    }
    ;
    a.prototype.V7w = function(a) {
        return !this.V6q ? null : this.V6q.getItem(a)
    }
    ;
    a.prototype.V7x = function(a) {
        this.V6q && this.V6q.V7y(a)
    }
    ;
    a.prototype.V7z = function() {
        this.V6q = null
    }
    ;
    a.prototype.V80 = function() {
        this.V7z();
        this.V73()
    }
    ;
    return a
}();
"use strict";
CB.V81 = function() {
    var a = function(a, b) {
        void 0 !== a ? (this.cr = a.cr,
        this.ep = a.ep,
        this.mvd = a.board[b.from],
        this.vct = a.board[b.to]) : (this.cr = CB.V38.V2o,
        this.ep = 0,
        this.mvd = this.vct = CB.Piece.V2o);
        void 0 !== b && (this.fldVct = b.to);
        this.from2 = this.to2 = 0
    };
    a.prototype.V82 = function(a, b) {
        this.fldVct = b;
        this.vct = a
    }
    ;
    a.prototype.V83 = function(a, b) {
        this.from2 = a;
        this.to2 = b
    }
    ;
    return a
}();
"use strict";
CB.V84 = function() {
    var a = function(a) {
        this.sqs = [];
        for (var b = 0; 64 > b; b++)
            this.sqs.push(0);
        a && this.V85()
    };
    a.V86 = 64;
    a.prototype.V85 = function() {
        this.sqs = [CB.Piece.V2t, CB.Piece.V2u, 0, 0, 0, 0, CB.Piece.V30, CB.Piece.V2z, CB.Piece.V2r, CB.Piece.V2u, 0, 0, 0, 0, CB.Piece.V30, CB.Piece.V2x, CB.Piece.V2s, CB.Piece.V2u, 0, 0, 0, 0, CB.Piece.V30, CB.Piece.V2y, CB.Piece.V2q, CB.Piece.V2u, 0, 0, 0, 0, CB.Piece.V30, CB.Piece.V2w, CB.Piece.V2p, CB.Piece.V2u, 0, 0, 0, 0, CB.Piece.V30, CB.Piece.V2v, CB.Piece.V2s, CB.Piece.V2u, 0, 0, 0, 0, CB.Piece.V30, CB.Piece.V2y, CB.Piece.V2r, CB.Piece.V2u, 0, 0, 0, 0, CB.Piece.V30, CB.Piece.V2x, CB.Piece.V2t, CB.Piece.V2u, 0, 0, 0, 0, CB.Piece.V30, CB.Piece.V2z]
    }
    ;
    a.prototype.Ve = function() {
        this.sqs.forEach(function(a, b, d) {
            d[index] = 0
        })
    }
    ;
    a.prototype.V87 = function(a) {
        for (var b = CB.V2i.V2j, d = CB.Piece.KING, e = 0; e < a.length; e++)
            switch (a[e]) {
            case "K":
                d = CB.Piece.KING;
                break;
            case "Q":
                d = CB.Piece.QUEEN;
                break;
            case "R":
                d = CB.Piece.ROOK;
                break;
            case "B":
                d = CB.Piece.BISHOP;
                break;
            case "N":
                d = CB.Piece.KNIGHT;
                break;
            case "P":
                d = CB.Piece.PAWN;
                break;
            case "a":
            case "b":
            case "c":
            case "d":
            case "e":
            case "f":
            case "g":
            case "h":
                var g = a.charCodeAt(e)
                  , f = a.charCodeAt(e + 1);
                49 <= f && 56 >= f ? this.sqs[(g - 97 << 3) + f - 49] = d | b : 98 == g && (b = CB.V2i.V2m);
                break;
            case "w":
                b = CB.V2i.V2j
            }
    }
    ;
    a.prototype.V88 = function(a) {
        for (var b = 0; b < a.length; b++)
            this.sqs[b] = a[b]
    }
    ;
    a.prototype.copyTo = function(a) {
        for (var b = 0; 64 > b; b++)
            a[b] = this.sqs[b]
    }
    ;
    a.prototype.set = function(a, b) {
        this.sqs[a] = b
    }
    ;
    a.prototype.get = function(a) {
        return this.sqs[a]
    }
    ;
    a.prototype.V89 = function(a, b) {
        this.sqs[b] = this.sqs[a];
        this.sqs[a] = 0
    }
    ;
    a.prototype.V8a = function(a, b, d) {
        this.sqs[b] = d;
        this.sqs[a] = 0
    }
    ;
    a.prototype.V8b = function(a, b, d) {
        this.sqs[b] = this.sqs[a];
        this.sqs[a] = 0;
        this.sqs[d] = 0
    }
    ;
    a.prototype.V8c = function(a) {
        for (var b = 0; 64 > b; b++)
            a.writeByte(this.sqs[b])
    }
    ;
    a.prototype.V8d = function() {
        for (var a = [], b = 7; 0 <= b; b--) {
            for (var d = "", e = 0; 8 > e; e++)
                var g = this.get(8 * e + b)
                  , d = g ? d + CB.Piece.V37[g] : CB.V3g.V67(8 * e + b) ? d + "." : d + " ";
            a.push(d)
        }
        return a
    }
    ;
    a.prototype.V8e = function(a, b, d, e) {
        for (b = 0; 64 > b; b++)
            if ((void 0 === e || !e[b]) && d[b] == a)
                return b;
        return -1
    }
    ;
    a.prototype.test = function() {
        var a = new CB.V84;
        a.V85();
        a.V8d().forEach(function(a) {
            CB.V8f(a)
        })
    }
    ;
    return a
}();
"use strict";
CB.V8g = function() {
    function a(a, b) {
        this.piece = a;
        this.field = b
    }
    function c(a, b) {
        return function(c) {
            return c === a || b && c === b
        }
    }
    var b = function(a) {
        this.V8h();
        a ? this.V8j(a) : this.V8i()
    };
    b.V8k = -1;
    b.prototype.V6 = function(a) {
        for (var b = 0; b < this.board.length; ++b)
            this.board[b] = a.board[b];
        this.sd = a.sd;
        this.ep = a.ep;
        this.cr = a.cr;
        this.V8l = a;
        this.numPly = a.numPly
    }
    ;
    b.prototype.equals = function(a) {
        if (this.sd != a.sd || this.ep != a.ep || this.cr != a.cr)
            return !1;
        for (var b = 0; b < this.board.length; ++b)
            if (this.board[b] !== a.board[b])
                return !1;
        return !0
    }
    ;
    b.prototype.V8m = function(a) {
        return idiv(a, 2) + 1
    }
    ;
    b.V8n = function(a, b) {
        return 2 * (a - 1) + b
    }
    ;
    b.prototype.V8o = function() {
        return this.V8m(this.numPly, this.sd)
    }
    ;
    b.prototype.V8p = function(a) {
        this.numPly = b.V8n(a, this.sd)
    }
    ;
    b.prototype.V8q = function() {
        return this.numPly
    }
    ;
    b.prototype.V8i = function() {
        this.sd = CB.V2i.V2j;
        for (var a = CB.V3g.V5d; a <= CB.V3g.V5k; ++a)
            this.board[CB.V3g.V60(a, CB.V3g.V5m)] = CB.Piece.V2u,
            this.board[CB.V3g.V60(a, CB.V3g.V5r)] = CB.Piece.V30;
        this.board[CB.V3g.V3l] = this.board[CB.V3g.V55] = CB.Piece.V2t;
        this.board[CB.V3g.V3t] = this.board[CB.V3g.V4x] = CB.Piece.V2r;
        this.board[CB.V3g.V41] = this.board[CB.V3g.V4p] = CB.Piece.V2s;
        this.board[CB.V3g.V49] = CB.Piece.V2q;
        this.board[CB.V3g.V4h] = CB.Piece.V2p;
        this.board[CB.V3g.V3s] = this.board[CB.V3g.V5c] = CB.Piece.V2z;
        this.board[CB.V3g.V40] = this.board[CB.V3g.V54] = CB.Piece.V2x;
        this.board[CB.V3g.V48] = this.board[CB.V3g.V4w] = CB.Piece.V2y;
        this.board[CB.V3g.V4g] = CB.Piece.V2w;
        this.board[CB.V3g.V4o] = CB.Piece.V2v;
        this.cr = CB.V38.V3f;
        this.numPly = this.V8l = 0
    }
    ;
    b.prototype.V8r = function() {
        for (var a = 0; 64 > a; a++)
            this.board[a] = 0;
        this.sd = CB.V2i.V2j;
        this.ep = b.V8k;
        this.numPly = this.V8l = this.cr = 0
    }
    ;
    b.prototype.V8s = function(a) {
        for (var b = 0; 64 > b; b++)
            if (this.board[b] != a[b])
                return !1;
        return !0
    }
    ;
    b.prototype.V8j = function(a) {
        a = new StringIterator(a);
        var e = CB.V3g.V5s, c = CB.V3g.V5d, f;
        for (f = a.Next(); 0 !== f && !Char.IsWhiteSpace(f); f = a.Next())
            if ("/" === f)
                --e,
                c = CB.V3g.V5d;
            else if (Char.IsDigit(f))
                c += Number(f);
            else {
                var h = CB.V3g.V60(c, e);
                f = CB.Piece.V2n(f);
                CBDebug.assert(f !== CB.Piece.V2o);
                this.board[h] = f;
                c++
            }
        a.isEOF() || (a.skipWhile(Char.IsWhiteSpace),
        a.isEOF() || (this.sd = CB.V2i.V2n(a.Current()),
        a.skipWhile(Char.IsWhiteSpace),
        a.isEOF() || (e = a.AcceptUntil(Char.IsWhiteSpace, !0),
        this.cr = CB.V38.V2n(e),
        a.isEOF() || (a.skipWhile(Char.IsWhiteSpace),
        e = a.AcceptUntil(Char.IsWhiteSpace, !0),
        "-" === e ? this.ep = b.V8k : (e = CB.V3g.V2n(e),
        this.ep = CB.V3g.V62(e)),
        a.skipWhile(Char.IsWhiteSpace),
        e = a.AcceptUntil(Char.IsWhiteSpace, !0),
        this.V8l = Number(e),
        a.skipWhile(Char.IsWhiteSpace),
        a = a.AcceptUntil(Char.IsWhiteSpace, !0),
        (a = Number(a)) || (a = 1),
        this.numPly = b.V8n(a, this.sd)))))
    }
    ;
    b.prototype.V8t = function() {
        return this.makeMove(new CB.Move(0,0))
    }
    ;
    b.prototype.V8u = function() {
        return this.unmakeMove(new CB.Move(0,0))
    }
    ;
    b.prototype.makeMove = function(a) {
        if (a) {
            var e = new CB.V81(this,a);
            ++this.numPly;
            this.sd = CB.V2i.other(this.sd);
            var c = this.ep;
            this.ep = b.V8k;
            if (a.isNullMove())
                return e;
            var f = this.board[a.from]
              , h = this.board[a.to];
            this.board[a.to] = this.board[a.from];
            this.board[a.from] = CB.Piece.V2o;
            var k = CB.V3g.V61(a.from)
              , j = CB.V3g.V61(a.to)
              , p = CB.V3g.V62(a.from)
              , l = CB.V3g.V62(a.to);
            CB.Piece.V33(f) === CB.Piece.PAWN && (l !== p && (l === c && h === CB.Piece.V2o) && (h = CB.Piece.V35(f),
            c = CB.V3g.V60(l, k),
            this.board[c] = CB.Piece.V2o,
            e.V82(h, c)),
            a.prom !== CB.Piece.V2o && (h = CB.Piece.V36(a.prom, CB.Piece.V34(f)),
            this.board[a.to] = h),
            2 === Math.abs(k - j) && (this.ep = p));
            CB.Piece.V33(f) === CB.Piece.KING && 2 === Math.abs(l - p) && (j = f = null,
            l === CB.V3g.V5j ? (f = CB.V3g.V60(CB.V3g.V5k, k),
            j = CB.V3g.V60(CB.V3g.V5i, k)) : (f = CB.V3g.V60(CB.V3g.V5d, k),
            j = CB.V3g.V60(CB.V3g.V5g, k)),
            this.board[j] = this.board[f],
            this.board[f] = CB.Piece.V2o,
            e.V83(f, j));
            if (this.cr) {
                if (this.cr & CB.V38.V3d)
                    if (a.from === CB.V3g.V4h)
                        this.cr &= ~CB.V38.V3d;
                    else if (a.from === CB.V3g.V3l || a.to === CB.V3g.V3l)
                        this.cr &= ~CB.V38.V39;
                    else if (a.from === CB.V3g.V55 || a.to === CB.V3g.V55)
                        this.cr &= ~CB.V38.V3a;
                if (this.cr & CB.V38.V3e)
                    if (a.from === CB.V3g.V4o)
                        this.cr &= ~CB.V38.V3e;
                    else if (a.from === CB.V3g.V3s || a.to === CB.V3g.V3s)
                        this.cr &= ~CB.V38.V3b;
                    else if (a.from === CB.V3g.V5c || a.to === CB.V3g.V5c)
                        this.cr &= ~CB.V38.V3c
            }
            return e
        }
    }
    ;
    b.prototype.unmakeMove = function(a, b) {
        if (!a.isNullMove() && (this.board[a.from] = b.mvd,
        this.board[a.to] = CB.Piece.V2o,
        this.board[b.fldVct] = b.vct,
        b.to2 || b.from2))
            this.board[b.from2] = this.board[b.to2],
            this.board[b.to2] = CB.Piece.V2o;
        this.cr = b.cr;
        this.ep = b.ep;
        --this.numPly;
        this.sd = CB.V2i.other(this.sd)
    }
    ;
    b.prototype.V8v = function() {
        var a = this.V8w();
        return this.V8x(a)
    }
    ;
    b.prototype.V8w = function(a) {
        for (var b = [], c = 0; c < this.board.length; ++c) {
            var f = this.board[c];
            f !== CB.Piece.V2o && (a && f !== a || CB.Piece.V34(f) === this.sd && this.V8y(c, f, b))
        }
        return b
    }
    ;
    b.prototype.V8z = function(a, b) {
        b || (b = this.board[a]);
        var c = [];
        this.V8y(a, b, c);
        return c
    }
    ;
    b.prototype.V90 = function(a, b) {
        var c = this.V8z(a, b);
        return this.V8x(c)
    }
    ;
    b.prototype.V8y = function(a, b, c) {
        switch (b) {
        case CB.Piece.V2u:
        case CB.Piece.V30:
            this.V91(b, a, c);
            break;
        case CB.Piece.V2r:
        case CB.Piece.V2x:
            this.V92(b, a, c);
            break;
        case CB.Piece.V2s:
        case CB.Piece.V2y:
            this.V93(b, a, c);
            break;
        case CB.Piece.V2t:
        case CB.Piece.V2z:
            this.V94(b, a, c);
            break;
        case CB.Piece.V2q:
        case CB.Piece.V2w:
            this.V95(b, a, c);
            break;
        case CB.Piece.V2p:
        case CB.Piece.V2v:
            this.V96(b, a, c)
        }
    }
    ;
    b.prototype.V97 = function(a, b) {
        return this.V8w(b).filter(function(b) {
            return b.to === a
        })
    }
    ;
    b.V98 = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];
    b.V99 = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    b.V9a = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
    b.V9b = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    b.prototype.V92 = function(a, c, g) {
        this.V9c(a, c, b.V98, !1, g)
    }
    ;
    b.prototype.V96 = function(a, c, g) {
        this.V9c(a, c, b.V99, !1, g);
        if (a === CB.Piece.V2p) {
            if (!(this.cr & CB.V38.V3d) || this.V9d(CB.V3g.V4h, CB.V2i.V2k))
                return;
            this.cr & CB.V38.V3a && this.board[CB.V3g.V4p] === CB.Piece.V2o && this.board[CB.V3g.V4x] === CB.Piece.V2o && !this.V9d(CB.V3g.V4p, CB.V2i.V2k) && !this.V9d(CB.V3g.V4x, CB.V2i.V2k) && g.push(CB.Move.V6b);
            this.cr & CB.V38.V39 && this.board[CB.V3g.V49] === CB.Piece.V2o && this.board[CB.V3g.V41] === CB.Piece.V2o && this.board[CB.V3g.V3t] === CB.Piece.V2o && !this.V9d(CB.V3g.V49, CB.V2i.V2k) && !this.V9d(CB.V3g.V41, CB.V2i.V2k) && g.push(CB.Move.V6c)
        }
        a === CB.Piece.V2v && this.cr & CB.V38.V3e && !this.V9d(CB.V3g.V4o, CB.V2i.V2j) && (this.cr & CB.V38.V3c && this.board[CB.V3g.V4w] === CB.Piece.V2o && this.board[CB.V3g.V54] === CB.Piece.V2o && !this.V9d(CB.V3g.V4w, CB.V2i.V2j) && !this.V9d(CB.V3g.V54, CB.V2i.V2j) && g.push(CB.Move.V6d),
        this.cr & CB.V38.V3b && this.board[CB.V3g.V4g] === CB.Piece.V2o && this.board[CB.V3g.V48] === CB.Piece.V2o && this.board[CB.V3g.V40] === CB.Piece.V2o && !this.V9d(CB.V3g.V4g, CB.V2i.V2j) && !this.V9d(CB.V3g.V48, CB.V2i.V2j) && g.push(CB.Move.V6e))
    }
    ;
    b.prototype.V94 = function(a, c, g) {
        this.V9c(a, c, b.V9b, !0, g)
    }
    ;
    b.prototype.V93 = function(a, c, g) {
        this.V9c(a, c, b.V9a, !0, g)
    }
    ;
    b.prototype.V95 = function(a, b, c) {
        this.V94(a, b, c);
        this.V93(a, b, c)
    }
    ;
    b.prototype.V91 = function(a, b, c) {
        var f = a === CB.Piece.V2u ? 1 : -1
          , h = a === CB.Piece.V2u ? CB.V3g.V5s : CB.V3g.V5l
          , k = CB.V3g.V62(b)
          , j = CB.V3g.V61(b)
          , p = CB.Piece.V34(a)
          , l = j + f
          , m = CB.V3g.V60(k, l)
          , h = l === h;
        if (this.board[m] === CB.Piece.V2o && (h ? (c.push(new CB.Move(b,m,CB.Piece.QUEEN)),
        c.push(new CB.Move(b,m,CB.Piece.ROOK)),
        c.push(new CB.Move(b,m,CB.Piece.BISHOP)),
        c.push(new CB.Move(b,m,CB.Piece.KNIGHT))) : (m = new CB.Move(b,m),
        c.push(m)),
        a === CB.Piece.V2u && j === CB.V3g.V5m || a === CB.Piece.V30 && j === CB.V3g.V5r))
            m = CB.V3g.V60(k, j + 2 * f),
            this.board[m] === CB.Piece.V2o && (m = new CB.Move(b,m),
            c.push(m));
        for (m = -1; 1 >= m; m += 2) {
            var n = k + m
              , l = j + f;
            if (CB.V3g.V66(n, l)) {
                var l = CB.V3g.V60(n, l)
                  , q = this.board[l];
                if (q !== CB.Piece.V2o && CB.Piece.V34(q) !== p)
                    if (h)
                        c.push(new CB.Move(b,l,CB.Piece.QUEEN)),
                        c.push(new CB.Move(b,l,CB.Piece.ROOK)),
                        c.push(new CB.Move(b,l,CB.Piece.BISHOP)),
                        c.push(new CB.Move(b,l,CB.Piece.KNIGHT));
                    else {
                        var r = new CB.Move(b,l);
                        c.push(r)
                    }
                q === CB.Piece.V2o && n === this.ep && (q = p === CB.V2i.V2j ? CB.V3g.V5p : CB.V3g.V5o,
                n = CB.V3g.V60(n, q),
                n = this.board[n],
                j === q && n === CB.Piece.V35(a) && (l = new CB.Move(b,l),
                c.push(l)))
            }
        }
    }
    ;
    b.prototype.V9c = function(a, b, c, f, h) {
        a = CB.Piece.V34(a);
        for (var k = CB.V3g.V61(b), j = CB.V3g.V62(b), p = 0, l = c.length; p < l; ++p) {
            var m = c[p]
              , n = j
              , q = k
              , r = f;
            do {
                n += m[0];
                q += m[1];
                if (!CB.V3g.V66(n, q))
                    break;
                var s = CB.V3g.V60(n, q)
                  , t = this.board[s];
                if (t !== CB.Piece.V2o)
                    if (CB.Piece.V34(t) === a)
                        break;
                    else
                        r = !1;
                s = new CB.Move(b,s);
                h.push(s)
            } while (r)
        }
    }
    ;
    b.prototype.V8x = function(a) {
        var b = this;
        return a.filter(function(a) {
            return !b.isSuicideMove(a)
        })
    }
    ;
    b.prototype.V6u = function(a, b) {
        var c = this.sd;
        return this.board[a] == CB.Piece.V36(CB.Piece.PAWN, c) && CB.V3g.V61(b) == CB.V3g.V6a(c)
    }
    ;
    b.prototype.V9e = function(a, b) {
        var c = new CB.Move(a,b);
        this.V6u(a, b) && (c.prom = CB.Piece.QUEEN);
        return this.V9f(c)
    }
    ;
    b.prototype.V9f = function(a) {
        return null != a && (a.isNullMove() || this.V9g(a)) && !this.isSuicideMove(a)
    }
    ;
    b.prototype.V9g = function(a) {
        if (null == a)
            return !1;
        var b = a.from
          , c = a.to;
        if (b === c)
            return !1;
        var f = this.board[b];
        if (f === CB.Piece.V2o || CB.Piece.V34(f) !== this.sd)
            return !1;
        c = this.board[c];
        return c !== CB.Piece.V2o && CB.Piece.V34(f) === CB.Piece.V34(c) ? !1 : this.V8z(b, f).some(a.equals.bind(a))
    }
    ;
    b.prototype.isSuicideMove = function(a) {
        var b = this.makeMove(a)
          , c = this.V9h();
        this.unmakeMove(a, b);
        return c
    }
    ;
    b.prototype.V8h = function() {
        this.sd = 0;
        this.board = Array(CB.V84.V86);
        for (var a = 0; a < this.board.length; ++a)
            this.board[a] = CB.Piece.V2o;
        this.cr = 0;
        this.ep = b.V8k;
        this.numPly = this.V8l = 0
    }
    ;
    b.prototype.V9i = function() {
        for (var a = "", c = CB.V3g.V5s; c >= CB.V3g.V5l; --c) {
            for (var g = 0, f = CB.V3g.V5d; f <= CB.V3g.V5k; ++f) {
                var h = CB.V3g.V60(f, c)
                  , h = this.board[h];
                h === CB.Piece.V2o ? ++g : (0 < g && (a += g),
                g = 0,
                a += CB.Piece.toString(h))
            }
            0 < g && (a += g);
            c > CB.V3g.V5l && (a += "/")
        }
        a = a + " " + CB.V2i.toString(this.sd);
        a += " ";
        a += CB.V38.toString(this.cr);
        a += " ";
        this.ep === b.V8k ? a += "-" : (c = this.V9j(),
        a += CB.V3g.toString(c));
        a += " 0 ";
        c = this.V8o();
        return a += c
    }
    ;
    b.prototype.toString = b.prototype.V9i;
    b.prototype.getPiece = function(a) {
        return this.board[a]
    }
    ;
    b.prototype.V9k = function() {
        for (var b = [], c = 0; c < this.board.length; ++c) {
            var g = this.board[c];
            g !== CB.Piece.V2o && (g = new a(g,c),
            b.push(g))
        }
        return b
    }
    ;
    a.prototype.toString = function() {
        var a = CB.Piece.V33(this.piece);
        return CB.Piece.toString(a) + CB.V3g.toString(this.field)
    }
    ;
    a.prototype.equals = function(a) {
        return this.piece === a.piece && this.field === a.field
    }
    ;
    b.prototype.V9l = function() {
        return this.sd
    }
    ;
    b.prototype.V9m = function() {
        return this.sd === CB.V2i.V2j
    }
    ;
    b.prototype.V9n = function() {
        return this.sd === CB.V2i.V2k
    }
    ;
    b.prototype.V9o = function(a) {
        this.sd = a ? CB.V2i.V2k : CB.V2i.V2j
    }
    ;
    b.prototype.V9p = b.prototype.V9n;
    b.prototype.V9q = function(a) {
        this.cr = a
    }
    ;
    b.prototype.V9r = function() {
        return this.ep === b.V8k ? -1 : this.ep % 8
    }
    ;
    b.prototype.V9s = function() {
        return this.ep === b.V8k ? 0 : this.ep % 8 + 1
    }
    ;
    b.prototype.V9t = function(a) {
        this.ep = 0 >= a ? b.V8k : a - 1
    }
    ;
    b.prototype.V9j = function() {
        return this.ep === b.V8k ? -1 : CB.V3g.V60(this.ep, this.sd === CB.V2i.V2j ? CB.V3g.V5q : CB.V3g.V5n)
    }
    ;
    b.prototype.V9u = function() {
        return this.ep
    }
    ;
    b.prototype.V9v = function() {
        return this.ep === b.V8k ? -1 : CB.V3g.V60(this.ep, this.sd === CB.V2i.V2j ? CB.V3g.V5p : CB.V3g.V5o)
    }
    ;
    b.prototype.V9w = function() {
        return this.cr
    }
    ;
    b.prototype.V9x = function() {
        var a = 0;
        this.board[CB.V3g.V4h] === CB.Piece.V2p && (this.board[CB.V3g.V3l] === CB.Piece.V2t && (a |= CB.V38.V39),
        this.board[CB.V3g.V55] === CB.Piece.V2t && (a |= CB.V38.V3a));
        this.board[CB.V3g.V4o] === CB.Piece.V2v && (this.board[CB.V3g.V3s] === CB.Piece.V2z && (a |= CB.V38.V3b),
        this.board[CB.V3g.V5c] === CB.Piece.V2z && (a |= CB.V38.V3c));
        return a
    }
    ;
    b.prototype.V9y = function() {
        for (var a = [], b = this.sd == CB.V2i.V2j ? CB.V3g.V5p : CB.V3g.V5o, c = CB.Piece.V36(CB.Piece.PAWN, this.sd), f = CB.Piece.V35(c), h = CB.V3g.V5d; h <= CB.V3g.V5k; ++h) {
            var k = CB.V3g.V60(h, b);
            this.board[k] === f && (h > CB.V3g.V5d && this.board[CB.V3g.V60(h - 1, b)] === c || h < CB.V3g.V5k && this.board[CB.V3g.V60(h + 1, b)] === c) && a.push(h)
        }
        return a
    }
    ;
    b.prototype.V9d = function(a, b) {
        return 0 < this.V9z(a, b).length
    }
    ;
    b.prototype.V9z = function(a, b) {
        var c = [];
        this.Va0(a, b, c);
        return c
    }
    ;
    b.prototype.Va0 = function(a, b, c) {
        this.Va1(a, b, c);
        this.Va2(a, b, c);
        this.Va3(a, b, c);
        this.Va4(a, b, c)
    }
    ;
    b.prototype.Va2 = function(a, e, g) {
        this.Va5(a, e, b.V98, c(CB.Piece.V36(CB.Piece.KNIGHT, e)), !1, g)
    }
    ;
    b.prototype.Va3 = function(a, e, g) {
        this.Va5(a, e, b.V99, c(CB.Piece.V36(CB.Piece.KING, e)), !1, g)
    }
    ;
    b.prototype.Va6 = function(a, e, g) {
        this.Va5(a, e, b.V9a, c(CB.Piece.V36(CB.Piece.QUEEN, e)), !0, g);
        this.Va5(a, e, b.V9b, c(CB.Piece.V36(CB.Piece.QUEEN, e)), !0, g)
    }
    ;
    b.prototype.Va7 = function(a, b, c) {
        if (this.board[a] === CB.Piece.V2o) {
            var f = CB.V3g.V61(a)
              , h = CB.V3g.V62(a);
            if (!(b === CB.V2i.V2j && (f === CB.V3g.V5l || f === CB.V3g.V5m)))
                if (!(b === CB.V2i.V2k && (f === CB.V3g.V5s || f === CB.V3g.V5r))) {
                    var k = b === CB.V2i.V2j ? -1 : 1;
                    a = CB.Piece.V36(CB.Piece.PAWN, b);
                    b = b === CB.V2i.V2j ? CB.V3g.V5o : CB.V3g.V5p;
                    var j = CB.V3g.V60(h, f + k);
                    this.board[j] === a ? c.push(j) : f === b && this.board[j] === CB.Piece.V2o && (f = CB.V3g.V60(h, f + 2 * k),
                    this.board[f] === a && c.push(f))
                }
        }
    }
    ;
    b.prototype.Va8 = function(a, e, g) {
        this.Va5(a, e, b.V9a, c(CB.Piece.V36(CB.Piece.BISHOP, e)), !0, g)
    }
    ;
    b.prototype.Va9 = function(a, e, g) {
        this.Va5(a, e, b.V9b, c(CB.Piece.V36(CB.Piece.ROOK, e)), !0, g)
    }
    ;
    b.prototype.Va4 = function(a, e, g) {
        this.Va5(a, e, b.V9b, c(CB.Piece.V36(CB.Piece.ROOK, e), CB.Piece.V36(CB.Piece.QUEEN, e)), !0, g);
        this.Va5(a, e, b.V9a, c(CB.Piece.V36(CB.Piece.BISHOP, e), CB.Piece.V36(CB.Piece.QUEEN, e)), !0, g)
    }
    ;
    b.Vaa = [[1, 1], [-1, 1]];
    b.Vab = [[1, -1], [-1, -1]];
    b.prototype.Va1 = function(a, e, g) {
        e === CB.V2i.V2j ? this.Va5(a, e, b.Vaa, c(CB.Piece.V2u), !1, g) : this.Va5(a, e, b.Vab, c(CB.Piece.V30), !1, g)
    }
    ;
    b.prototype.Va5 = function(a, b, c, f, h, k) {
        var j = CB.V3g.V61(a);
        a = CB.V3g.V62(a);
        for (var p = 0, l = c.length; p < l; ++p) {
            var m = c[p]
              , n = a
              , q = j
              , r = h;
            do {
                n -= m[0];
                q -= m[1];
                if (!CB.V3g.V66(n, q))
                    break;
                var s = CB.V3g.V60(n, q)
                  , t = this.board[s];
                if (t !== CB.Piece.V2o) {
                    if (CB.Piece.V34(t) !== b)
                        break;
                    else
                        r = !1;
                    f(t) && k.push(s)
                }
            } while (r)
        }
    }
    ;
    b.prototype.Vac = function(a) {
        a = CB.Piece.V36(CB.Piece.KING, a);
        return this.board.indexOf(a)
    }
    ;
    b.prototype.V6r = function() {
        var a = this.Vac(this.sd)
          , b = CB.V2i.other(this.sd);
        return this.V9d(a, b)
    }
    ;
    b.prototype.V9h = function() {
        var a = CB.V2i.other(this.sd)
          , a = this.Vac(a);
        return this.V9d(a, this.sd)
    }
    ;
    b.prototype.V6s = function() {
        return !this.V6r() ? !1 : !this.Vad()
    }
    ;
    b.prototype.Vae = function() {
        return this.V6r() ? !1 : !this.Vad()
    }
    ;
    b.prototype.Vad = function() {
        return 0 < this.V8v().length
    }
    ;
    b.prototype.getVictim = function(a) {
        var b = this.board[a.to];
        return b !== CB.Piece.V2o ? b : CB.Piece.V33(this.board[a.from]) === CB.Piece.PAWN && CB.V3g.V62(a.from) !== CB.V3g.V62(a.to) ? (a = CB.V3g.V60(CB.V3g.V62(a.to), CB.V3g.V61(a.from)),
        this.board[a]) : CB.Piece.V2o
    }
    ;
    b.prototype.V6t = function(a) {
        return tgis.getVictim(a) !== CB.Piece.V2o
    }
    ;
    b.prototype.Vaf = function(a) {
        var b = a.from
          , c = this.board[b]
          , f = {
            needCol: !1,
            needRow: !1
        }
          , h = CB.Piece.V33(c);
        if (h === CB.Piece.PAWN || h === CB.Piece.KING)
            return f;
        for (var k = [], j = 0; j < CB.V84.V86; ++j)
            this.board[j] === c && j !== b && k.push(j);
        if (!k.length || h === CB.Piece.BISHOP && k.every(function(a) {
            return CB.V3g.V67(a) !== CB.V3g.V67(b)
        }))
            return f;
        for (var j = h = !0, p = !1, l = 0, m = k.length; l < m; ++l) {
            var n = k[l];
            this.V8z(n, c).some(function(b) {
                return b.to === a.to
            }) && (p = !0,
            h &= CB.V3g.V62(n) !== CB.V3g.V62(b),
            j &= CB.V3g.V61(n) !== CB.V3g.V61(b))
        }
        p && (f.needCol = h || !j,
        f.needRow = !h);
        return f
    }
    ;
    b.prototype.Vag = function(a) {
        this.preSetMinCtx(a);
        if (!a.isNullMove()) {
            var b = this.Vaf(a);
            a.setNeedCol(b.needCol);
            a.setNeedRow(b.needRow)
        }
    }
    ;
    b.prototype.preSetMinCtx = function(a) {
        if (a.isNullMove())
            a.setMoved(CB.Piece.V36(CB.Piece.PAWN, this.sd)),
            a.setVictim(CB.Piece.V2o);
        else {
            a.setMoved(this.board[a.from]);
            var b = this.getVictim(a);
            a.setVictim(b);
            a.setIsCastling()
        }
    }
    ;
    b.prototype.Vah = function(a, b) {
        if (a.isNullMove())
            a.setCheck(!1);
        else {
            var c = this.V6r();
            a.setCheck(c);
            c && b && a.setMate(!this.Vad())
        }
    }
    ;
    b.prototype.V2g = function(a) {
        this.board = a.readByteArray(CB.V84.V86);
        this.sd = a.readInt();
        this.ep = a.readByte() - 1;
        this.cr = a.readByte();
        this.numPly = 0
    }
    ;
    b.prototype.write = function(a) {
        a.writeByteArray(this.board, CB.V84.V86);
        a.writeInt(this.sd);
        a.writeByte(this.ep + 1);
        a.writeByte(this.cr)
    }
    ;
    b.prototype.copyTo = function(a) {
        a.sd = this.sd;
        a.ep = this.ep;
        a.cr = this.cr;
        for (var b = 0; 64 > b; b++)
            a.board[b] = this.board[b]
    }
    ;
    b.Vai = function(a) {
        for (var b = Array(32), c = 0, f = b.length; c < f; ++c)
            b[c] = a[2 * c] | a[2 * c + 1] << 4;
        return b
    }
    ;
    b.Vaj = function(a) {
        for (var b = Array(2 * a.length), c = 0, f = a.length; c < f; ++c)
            b[2 * c] = a[c] & 15,
            b[2 * c + 1] = a[c] >> 4;
        return b
    }
    ;
    b.prototype.Vak = function(a, b) {
        for (var c = 0; c < this.board.length; c++)
            CB.Piece.V34(this.board[c]) == b && (a[c] = this.board[c])
    }
    ;
    b.prototype.Val = function(a) {
        for (var b = 0; b < this.board.length; b++)
            if (this.board[b] != a.board[b])
                return !1;
        return this.sd != a.sd || this.ep != a.ep || this.cr != a.cr ? !1 : !0
    }
    ;
    b.prototype.Vam = function(a) {
        for (var b = 0; b < this.board.length; b++)
            if (this.board[b] != a.board[b])
                return this.board[b] > a.board[b];
        return this.sd != a.sd ? this.sd > a.sd : this.ep != a.ep ? this.ep > a.ep : this.cr != a.cr ? this.cr > a.cr : !1
    }
    ;
    b.prototype.Van = function(a) {
        var b = new CB.V84;
        b.V88(this.board);
        b.V8d().forEach(void 0 !== a ? a : function(a) {
            CB.V8f(a)
        }
        );
        b = "s=" + this.sd + ", ep=" + this.ep + ", cr=" + this.cr;
        void 0 !== a ? a(b) : CB.V8f(b)
    }
    ;
    b.prototype.V66 = function() {
        var a = this.V9k();
        if (32 < a.length || 2 > a.length)
            return !1;
        for (var b = Array(CB.Piece.V30 + 1), c = 0; c < b.length; ++c)
            b[c] = 0;
        for (c = 0; c < a.length; ++c) {
            var f = a[c];
            ++b[f.piece];
            if (CB.Piece.V33(f.piece) === CB.Piece.PAWN && (f = CB.V3g.V61(f.field),
            f == CB.V3g.V5l || f == CB.V3g.V5s))
                return !1
        }
        return 1 !== b[CB.Piece.V2p] || 1 !== b[CB.Piece.V2v] || 8 < b[CB.Piece.V2u] || 8 < b[CB.Piece.V30] ? !1 : !0
    }
    ;
    b.prototype.Vao = function(a) {
        if (a.length != this.board.length)
            return !1;
        for (var b = 0; b < this.board.length; b++)
            if (this.board[b] != a[b])
                return !1;
        return !0
    }
    ;
    b.prototype.Vap = function(a) {
        for (var b = [], c = 0; c < this.board.length; c++)
            this.board[c] == a && b.push(c);
        return b
    }
    ;
    return b
}();
"use strict";
CB.Vaq = function() {
    return {
        GET: "GET",
        POST: "POST",
        Var: function(a, c, b) {
            b = b || {};
            c = c || b.success || null;
            var d = b.data || void 0
              , e = void 0 === b.async ? !0 : b.async
              , g = b.responseType || "text"
              , f = new XMLHttpRequest;
            f.open(b.method || "GET", a, e);
            f.responseType = g;
            a = function() {
                c && c(f.response)
            }
            ;
            e && (f.onload = a);
            f.send(d);
            return !e ? f.response : null
        }
    }
}();
"use strict";
CB.Game = CB.Game || function() {}
;
(function(a) {
    function c(b, d, e, g) {
        if (e.isMainLine() && ObjUtil.equals(b, d))
            return g.push(new CB.Vas(e)),
            !0;
        d = ObjUtil.clone(d);
        for (var f = 0; f < e.length; ++f) {
            var h = e[f];
            if (h.hasLines())
                for (var k = h.getSubLinesCount() - 1; 0 <= k; --k) {
                    var j = h.getLine(k);
                    g.push(new CB.Vas(e,f));
                    if (c(b, d, j, g))
                        return !0;
                    g.pop()
                }
            if (a.canCut(h, b, d))
                break;
            else if (d.makeMove(h),
            ObjUtil.equals(b, d))
                return g.push(new CB.Vas(e,f + 1)),
                !0
        }
        return !1
    }
    a.canCut = function(a, c, e) {
        e.preSetMinCtx(a);
        var g = e.sd
          , f = a.getMoved();
        e.getPiece(a.to);
        var h = a.from;
        a = a.to;
        var k = CB.V3g.V61(h);
        e = CB.V3g.V61(a);
        var j = CB.Piece.V36(CB.Piece.PAWN, g)
          , p = g === CB.V2i.V2j ? CB.V3g.V5m : CB.V3g.V5r;
        if (f === j && k === p && c.getPiece(h) === j)
            return !0;
        h = CB.Piece.V35(j);
        g = g === CB.V2i.V2j ? CB.V3g.V5r : CB.V3g.V5m;
        return f === h && e === g && c.getPiece(a) === h || c.cr & CB.V38.V3d && f === CB.Piece.V2p || c.cr & CB.V38.V3e && f === CB.Piece.V2v ? !0 : !1
    }
    ;
    a.prototype.hasPos = function(a) {
        return this._findPos(a)
    }
    ;
    a.prototype._findPos = function(a) {
        var d = this.getStartPos()
          , e = new CB.Vat;
        return c(a, d, this.mainLine, e) ? e : null
    }
    ;
    a.prototype.gotoPos = function(a) {
        var c = this._findPos(a);
        if (!c)
            return !1;
        this.gotoStack(c);
        CBDebug.call(this, this.selfTest);
        CBDebug.assert(this.cur.equals(a));
        return !0
    }
}
)(CB.Game);
"use strict";
CB.Vau = {
    Vav: 5,
    Vaw: 3,
    Vax: 2,
    Vay: 1,
    Vaz: 0.7,
    Vb0: 0.5,
    V2o: 0
};
CB.Vb1 = function() {
    var a = function(a) {
        this.Vb2 = !1;
        a && this.init(a)
    };
    a.prototype.init = function() {}
    ;
    a.prototype.getMoves = function() {}
    ;
    a.prototype.Vb3 = function() {
        this.Vb2 = !0;
        this.fireOnReady(this)
    }
    ;
    a.prototype.Vb4 = function() {
        return this.Vb2
    }
    ;
    a.selectMove = function(a, b) {
        if (0 == a.length)
            return null;
        b = b || CB.Vau.Vax;
        return a.pickRandom(function(a) {
            return Math.pow(a.weight, b)
        }).mv
    }
    ;
    a.getTournMoves = function(a) {
        return a.filter(function(a) {
            return a.tourn
        }).map(function(a) {
            return a.mv
        })
    }
    ;
    ListenersUtil.initForListeners(a);
    ListenersUtil.addEvent(a, "Ready");
    return a
}();
CB.FBKBook = function() {
    function a(a) {
        this.Vb5 = a || this.Vb5
    }
    CB.inherit(a, CB.Vb1);
    a.prototype.Vb5 = [];
    a.prototype.init = function(a) {
        CB.Vaq.Var(a, this.Vb6.bind(this), {
            responseType: "arraybuffer"
        })
    }
    ;
    a.prototype.Vb6 = function(a) {
        this.Vb5 = new Uint8Array(a);
        this.Vb3()
    }
    ;
    a.prototype.getMoves = function(a) {
        var c = []
          , e = new CB.V8g;
        this.Vb7(a, e, 0, c);
        return c
    }
    ;
    a.prototype.V7a = {};
    a.canCut = CB.Game.canCut;
    a.Vb8 = function(a) {
        switch (a) {
        case c.GOOD_MV:
            return 10;
        case c.PLAYABLE_MV:
            return 3;
        case c.GAMBIT_MV:
            return 1;
        default:
            return 0
        }
    }
    ;
    a.Vb9 = function(a) {
        return a == c.GOOD_MV
    }
    ;
    a.prototype.Vb7 = function(b, c, e, g) {
        for (var f = b.equals(c), h = !0; h && e < this.Vb5.length; ) {
            e = this.V2g(e, this.V7a);
            var k = this.V7a.endOfLine
              , h = this.V7a.hasSiblings
              , j = new CB.Move(this.V7a.from,this.V7a.to);
            f && g.push({
                mv: j,
                weight: a.Vb8(this.V7a.type),
                tourn: a.Vb9(this.V7a.type)
            });
            k || (f || a.canCut(j, b, c) ? e = this.Vba(e) : (k = c.makeMove(j),
            e = this.Vb7(b, c, e, g),
            c.unmakeMove(j, k)))
        }
        return e
    }
    ;
    a.prototype.Vba = function(a) {
        for (var c = 1; c && a < this.Vb5.length; )
            a = this.skip(a, this.V7a),
            this.V7a.hasSiblings && ++c,
            this.V7a.endOfLine && --c;
        return a
    }
    ;
    var c = {
        GOOD_MV: 0,
        PLAYABLE_MV: 1,
        GAMBIT_MV: 2,
        BAD_MV: 3
    };
    a.Vbb = function(a) {
        return CB.V3g.V60(CB.V3g.V61(a), CB.V3g.V62(a))
    }
    ;
    a.prototype.skip = function(a, c) {
        var e = this.Vb5[a++]
          , g = this.Vb5[a++];
        c.hasSiblings = !(e & 64);
        c.endOfLine = !!(e & 128);
        c.type = g >> 6;
        return a
    }
    ;
    a.prototype.V2g = function(b, c) {
        var e = this.Vb5[b++]
          , g = this.Vb5[b++];
        c.from = a.Vbb(e & 63);
        c.to = a.Vbb(g & 63);
        c.hasSiblings = !(e & 64);
        c.endOfLine = !!(e & 128);
        c.type = g >> 6;
        return b
    }
    ;
    return a
}();
function onReady() {
    self.postMessage({
        cmd: "ready"
    })
}
var bk = null;
function onInit(a, c) {
    var b = String.formatEx("(new {0}())", a);
    bk = eval(b);
    bk.init(c);
    bk.addOnReadyListener(onReady.bind(this))
}
function onReq(a, c) {
    var b = new CB.V8g(a)
      , b = bk.getMoves(b);
    self.postMessage({
        cmd: "resp",
        res: b,
        id: c
    })
}
function onMessage(a) {
    switch (a.data.cmd) {
    case "init":
        onInit(a.data.type, a.data.path);
        break;
    case "req":
        onReq(a.data.pos, a.data.id)
    }
}
self.onmessage = onMessage;
