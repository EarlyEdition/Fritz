function cbPreInit() {}

var fnHandle = null;
function cbPreRun() {
    fnHandle = Module.cwrap("oncommand", "number", ["string"]);
}

function cbInput() {
    return null;
}

function cbOnMessage(_msg) {
    if (!_msg.data)
        return;
    if (!inited)
        queue.push(_msg.data);
    else
        fnHandle(_msg.data);
}

var inited = false;
var queue = [];
function cbPostRun() {
    inited = true;
    queue.forEach(fnHandle);
    queue = null;
}

function oninfo(_msg) {
    self.postMessage(_msg);
}

self.addEventListener('message', cbOnMessage, false);

Module = {
    preRun: [cbPreRun],
    preInit: cbPreInit,
    postRun: cbPostRun,
    noExitRuntime: true
};
var Module;
Module || (Module = eval("(function() { try { return Fritz || {} } catch(e) { return {} } })()"));
var aa = {}, k;
for (k in Module)
    Module.hasOwnProperty(k) && (aa[k] = Module[k]);
var l = !1
  , m = !1
  , p = !1
  , ba = !1;
if (Module.ENVIRONMENT)
    if ("WEB" === Module.ENVIRONMENT)
        l = !0;
    else if ("WORKER" === Module.ENVIRONMENT)
        m = !0;
    else if ("NODE" === Module.ENVIRONMENT)
        p = !0;
    else if ("SHELL" === Module.ENVIRONMENT)
        ba = !0;
    else
        throw Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");
else
    l = "object" === typeof window,
    m = "function" === typeof importScripts,
    p = "object" === typeof process && "function" === typeof require && !l && !m,
    ba = !l && !p && !m;
if (p) {
    Module.print || (Module.print = console.log);
    Module.printErr || (Module.printErr = console.warn);
    var ca, da;
    Module.read = function(a, b) {
        ca || (ca = require("fs"));
        da || (da = require("path"));
        a = da.normalize(a);
        a = ca.readFileSync(a);
        return b ? a : a.toString()
    }
    ;
    Module.readBinary = function(a) {
        a = Module.read(a, !0);
        a.buffer || (a = new Uint8Array(a));
        assert(a.buffer);
        return a
    }
    ;
    Module.load = function(a) {
        ea(read(a))
    }
    ;
    Module.thisProgram || (Module.thisProgram = 1 < process.argv.length ? process.argv[1].replace(/\\/g, "/") : "unknown-program");
    Module.arguments = process.argv.slice(2);
    "undefined" !== typeof module && (module.exports = Module);
    process.on("uncaughtException", function(a) {
        if (!(a instanceof fa))
            throw a;
    });
    Module.inspect = function() {
        return "[Emscripten Module object]"
    }
} else if (ba)
    Module.print || (Module.print = print),
    "undefined" != typeof printErr && (Module.printErr = printErr),
    Module.read = "undefined" != typeof read ? function(a) {
        return read(a)
    }
    : function() {
        throw "no read() available";
    }
    ,
    Module.readBinary = function(a) {
        if ("function" === typeof readbuffer)
            return new Uint8Array(readbuffer(a));
        a = read(a, "binary");
        assert("object" === typeof a);
        return a
    }
    ,
    "undefined" != typeof scriptArgs ? Module.arguments = scriptArgs : "undefined" != typeof arguments && (Module.arguments = arguments),
    "function" === typeof quit && (Module.quit = function(a) {
        quit(a)
    }
    );
else if (l || m)
    Module.read = function(a) {
        var b = new XMLHttpRequest;
        b.open("GET", a, !1);
        b.send(null);
        return b.responseText
    }
    ,
    m && (Module.readBinary = function(a) {
        var b = new XMLHttpRequest;
        b.open("GET", a, !1);
        b.responseType = "arraybuffer";
        b.send(null);
        return new Uint8Array(b.response)
    }
    ),
    Module.readAsync = function(a, b, c) {
        var d = new XMLHttpRequest;
        d.open("GET", a, !0);
        d.responseType = "arraybuffer";
        d.onload = function() {
            200 == d.status || 0 == d.status && d.response ? b(d.response) : c()
        }
        ;
        d.onerror = c;
        d.send(null)
    }
    ,
    "undefined" != typeof arguments && (Module.arguments = arguments),
    "undefined" !== typeof console ? (Module.print || (Module.print = function(a) {
        console.log(a)
    }
    ),
    Module.printErr || (Module.printErr = function(a) {
        console.warn(a)
    }
    )) : Module.print || (Module.print = function() {}
    ),
    m && (Module.load = importScripts),
    "undefined" === typeof Module.setWindowTitle && (Module.setWindowTitle = function(a) {
        document.title = a
    }
    );
else
    throw Error("Unknown runtime environment. Where are we?");
function ea(a) {
    eval.call(null, a)
}
!Module.load && Module.read && (Module.load = function(a) {
    ea(Module.read(a))
}
);
Module.print || (Module.print = function() {}
);
Module.printErr || (Module.printErr = Module.print);
Module.arguments || (Module.arguments = []);
Module.thisProgram || (Module.thisProgram = "./this.program");
Module.quit || (Module.quit = function(a, b) {
    throw b;
}
);
Module.print = Module.print;
Module.printErr = Module.printErr;
Module.preRun = [];
Module.postRun = [];
for (k in aa)
    aa.hasOwnProperty(k) && (Module[k] = aa[k]);
aa = void 0;
var u = {
    O: function(a) {
        return tempRet0 = a
    },
    hb: function() {
        return tempRet0
    },
    ua: function() {
        return q
    },
    ta: function(a) {
        q = a
    },
    Na: function(a) {
        switch (a) {
        case "i1":
        case "i8":
            return 1;
        case "i16":
            return 2;
        case "i32":
            return 4;
        case "i64":
            return 8;
        case "float":
            return 4;
        case "double":
            return 8;
        default:
            return "*" === a[a.length - 1] ? u.G : "i" === a[0] ? (a = parseInt(a.substr(1)),
            assert(0 === a % 8),
            a / 8) : 0
        }
    },
    gb: function(a) {
        return Math.max(u.Na(a), u.G)
    },
    Dd: 16,
    Vd: function(a, b) {
        "double" === b || "i64" === b ? a & 7 && (assert(4 === (a & 7)),
        a += 4) : assert(0 === (a & 3));
        return a
    },
    Ld: function(a, b, c) {
        return c || "i64" != a && "double" != a ? a ? Math.min(b || (a ? u.gb(a) : 0), u.G) : Math.min(b, 8) : 8
    },
    ka: function(a, b, c) {
        return c && c.length ? Module["dynCall_" + a].apply(null, [b].concat(c)) : Module["dynCall_" + a].call(null, b)
    },
    h: [null],
    Za: function(a) {
        for (var b = 0; b < u.h.length; b++)
            if (!u.h[b])
                return u.h[b] = a,
                2 * (1 + b);
        throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
    },
    rb: function(a) {
        u.h[(a - 2) / 2] = null
    },
    K: function(a) {
        u.K.sa || (u.K.sa = {});
        u.K.sa[a] || (u.K.sa[a] = 1,
        Module.printErr(a))
    },
    ma: {},
    Od: function(a, b) {
        if (a) {
            assert(b);
            u.ma[b] || (u.ma[b] = {});
            var c = u.ma[b];
            c[a] || (c[a] = 1 === b.length ? function() {
                return u.ka(b, a)
            }
            : 2 === b.length ? function(c) {
                return u.ka(b, a, [c])
            }
            : function() {
                return u.ka(b, a, Array.prototype.slice.call(arguments))
            }
            );
            return c[a]
        }
    },
    Md: function() {
        throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
    },
    aa: function(a) {
        var b = q;
        q = q + a | 0;
        q = q + 15 & -16;
        return b
    },
    va: function(a) {
        var b = w;
        w = w + a | 0;
        w = w + 15 & -16;
        return b
    },
    Ia: function(a) {
        var b = x[y >> 2];
        a = (b + a + 15 | 0) & -16;
        x[y >> 2] = a;
        return a >= z && !ha() ? (x[y >> 2] = b,
        0) : b
    },
    Da: function(a, b) {
        return Math.ceil(a / (b ? b : 16)) * (b ? b : 16)
    },
    Rd: function(a, b, c) {
        return c ? +(a >>> 0) + 4294967296 * +(b >>> 0) : +(a >>> 0) + 4294967296 * +(b | 0)
    },
    ia: 1024,
    G: 4,
    Ed: 0
};
Module.Runtime = u;
u.addFunction = u.Za;
u.removeFunction = u.rb;
var A = 0;
function assert(a, b) {
    a || B("Assertion failed: " + b)
}
function ja(a) {
    var b = Module["_" + a];
    if (!b)
        try {
            b = eval("_" + a)
        } catch (c) {}
    assert(b, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)");
    return b
}
var ka, la;
(function() {
    function a(a) {
        a = a.toString().match(e).slice(1);
        return {
            arguments: a[0],
            body: a[1],
            returnValue: a[2]
        }
    }
    function b() {
        if (!f) {
            f = {};
            for (var b in c)
                c.hasOwnProperty(b) && (f[b] = a(c[b]))
        }
    }
    var c = {
        stackSave: function() {
            u.ua()
        },
        stackRestore: function() {
            u.ta()
        },
        arrayToC: function(a) {
            var b = u.aa(a.length);
            ma(a, b);
            return b
        },
        stringToC: function(a) {
            var b = 0;
            if (null !== a && void 0 !== a && 0 !== a) {
                var c = (a.length << 2) + 1;
                b = u.aa(c);
                na(a, b, c)
            }
            return b
        }
    }
      , d = {
        string: c.stringToC,
        array: c.arrayToC
    };
    la = function(a, b, c, e) {
        var f = ja(a)
          , g = [];
        a = 0;
        if (e)
            for (var h = 0; h < e.length; h++) {
                var H = d[c[h]];
                H ? (0 === a && (a = u.ua()),
                g[h] = H(e[h])) : g[h] = e[h]
            }
        c = f.apply(null, g);
        "string" === b && (c = C(c));
        0 !== a && u.ta(a);
        return c
    }
    ;
    var e = /^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/
      , f = null;
    ka = function(c, d, e) {
        e = e || [];
        var g = ja(c);
        c = e.every(function(a) {
            return "number" === a
        });
        var h = "string" !== d;
        if (h && c)
            return g;
        var v = e.map(function(a, b) {
            return "$" + b
        });
        d = "(function(" + v.join(",") + ") {";
        var n = e.length;
        if (!c) {
            b();
            d += "var stack = " + f.stackSave.body + ";";
            for (var H = 0; H < n; H++) {
                var L = v[H]
                  , M = e[H];
                "number" !== M && (M = f[M + "ToC"],
                d += "var " + M.arguments + " = " + L + ";",
                d += M.body + ";",
                d += L + "=(" + M.returnValue + ");")
            }
        }
        e = a(function() {
            return g
        }).returnValue;
        d += "var ret = " + e + "(" + v.join(",") + ");";
        h || (e = a(function() {
            return C
        }).returnValue,
        d += "ret = " + e + "(ret);");
        c || (b(),
        d += f.stackRestore.body.replace("()", "(stack)") + ";");
        return eval(d + "return ret})")
    }
}
)();
Module.ccall = la;
Module.cwrap = ka;
function oa(a, b, c) {
    c = c || "i8";
    "*" === c.charAt(c.length - 1) && (c = "i32");
    switch (c) {
    case "i1":
        D[a >> 0] = b;
        break;
    case "i8":
        D[a >> 0] = b;
        break;
    case "i16":
        pa[a >> 1] = b;
        break;
    case "i32":
        x[a >> 2] = b;
        break;
    case "i64":
        tempI64 = [b >>> 0, (tempDouble = b,
        1 <= +qa(tempDouble) ? 0 < tempDouble ? (ra(+sa(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+ta((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)];
        x[a >> 2] = tempI64[0];
        x[a + 4 >> 2] = tempI64[1];
        break;
    case "float":
        ua[a >> 2] = b;
        break;
    case "double":
        va[a >> 3] = b;
        break;
    default:
        B("invalid type for setValue: " + c)
    }
}
Module.setValue = oa;
function wa(a, b) {
    b = b || "i8";
    "*" === b.charAt(b.length - 1) && (b = "i32");
    switch (b) {
    case "i1":
        return D[a >> 0];
    case "i8":
        return D[a >> 0];
    case "i16":
        return pa[a >> 1];
    case "i32":
        return x[a >> 2];
    case "i64":
        return x[a >> 2];
    case "float":
        return ua[a >> 2];
    case "double":
        return va[a >> 3];
    default:
        B("invalid type for getValue: " + b)
    }
    return null
}
Module.getValue = wa;
Module.ALLOC_NORMAL = 0;
Module.ALLOC_STACK = 1;
Module.ALLOC_STATIC = 2;
Module.ALLOC_DYNAMIC = 3;
Module.ALLOC_NONE = 4;
function E(a, b, c, d) {
    if ("number" === typeof a) {
        var e = !0;
        var f = a
    } else
        e = !1,
        f = a.length;
    var g = "string" === typeof b ? b : null, h;
    4 == c ? h = d : h = ["function" === typeof F ? F : u.va, u.aa, u.va, u.Ia][void 0 === c ? 2 : c](Math.max(f, g ? 1 : b.length));
    if (e) {
        d = h;
        assert(0 == (h & 3));
        for (a = h + (f & -4); d < a; d += 4)
            x[d >> 2] = 0;
        for (a = h + f; d < a; )
            D[d++ >> 0] = 0;
        return h
    }
    if ("i8" === g)
        return a.subarray || a.slice ? G.set(a, h) : G.set(new Uint8Array(a), h),
        h;
    d = 0;
    for (var n, r; d < f; )
        e = a[d],
        "function" === typeof e && (e = u.Pd(e)),
        c = g || b[d],
        0 === c ? d++ : ("i64" == c && (c = "i32"),
        oa(h + d, e, c),
        r !== c && (n = u.Na(c),
        r = c),
        d += n);
    return h
}
Module.allocate = E;
Module.getMemory = function(a) {
    return xa ? ya ? F(a) : u.Ia(a) : u.va(a)
}
;
function C(a, b) {
    if (0 === b || !a)
        return "";
    for (var c = 0, d, e = 0; ; ) {
        d = G[a + e >> 0];
        c |= d;
        if (0 == d && !b)
            break;
        e++;
        if (b && e == b)
            break
    }
    b || (b = e);
    d = "";
    if (128 > c) {
        for (; 0 < b; )
            c = String.fromCharCode.apply(String, G.subarray(a, a + Math.min(b, 1024))),
            d = d ? d + c : c,
            a += 1024,
            b -= 1024;
        return d
    }
    return Module.UTF8ToString(a)
}
Module.Pointer_stringify = C;
Module.AsciiToString = function(a) {
    for (var b = ""; ; ) {
        var c = D[a++ >> 0];
        if (!c)
            return b;
        b += String.fromCharCode(c)
    }
}
;
Module.stringToAscii = function(a, b) {
    return za(a, b, !1)
}
;
var Aa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function Ba(a, b) {
    for (var c = b; a[c]; )
        ++c;
    if (16 < c - b && a.subarray && Aa)
        return Aa.decode(a.subarray(b, c));
    for (c = ""; ; ) {
        var d = a[b++];
        if (!d)
            return c;
        if (d & 128) {
            var e = a[b++] & 63;
            if (192 == (d & 224))
                c += String.fromCharCode((d & 31) << 6 | e);
            else {
                var f = a[b++] & 63;
                if (224 == (d & 240))
                    d = (d & 15) << 12 | e << 6 | f;
                else {
                    var g = a[b++] & 63;
                    if (240 == (d & 248))
                        d = (d & 7) << 18 | e << 12 | f << 6 | g;
                    else {
                        var h = a[b++] & 63;
                        if (248 == (d & 252))
                            d = (d & 3) << 24 | e << 18 | f << 12 | g << 6 | h;
                        else {
                            var n = a[b++] & 63;
                            d = (d & 1) << 30 | e << 24 | f << 18 | g << 12 | h << 6 | n
                        }
                    }
                }
                65536 > d ? c += String.fromCharCode(d) : (d -= 65536,
                c += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023))
            }
        } else
            c += String.fromCharCode(d)
    }
}
Module.UTF8ArrayToString = Ba;
Module.UTF8ToString = function(a) {
    return Ba(G, a)
}
;
function Ca(a, b, c, d) {
    if (!(0 < d))
        return 0;
    var e = c;
    d = c + d - 1;
    for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);
        55296 <= g && 57343 >= g && (g = 65536 + ((g & 1023) << 10) | a.charCodeAt(++f) & 1023);
        if (127 >= g) {
            if (c >= d)
                break;
            b[c++] = g
        } else {
            if (2047 >= g) {
                if (c + 1 >= d)
                    break;
                b[c++] = 192 | g >> 6
            } else {
                if (65535 >= g) {
                    if (c + 2 >= d)
                        break;
                    b[c++] = 224 | g >> 12
                } else {
                    if (2097151 >= g) {
                        if (c + 3 >= d)
                            break;
                        b[c++] = 240 | g >> 18
                    } else {
                        if (67108863 >= g) {
                            if (c + 4 >= d)
                                break;
                            b[c++] = 248 | g >> 24
                        } else {
                            if (c + 5 >= d)
                                break;
                            b[c++] = 252 | g >> 30;
                            b[c++] = 128 | g >> 24 & 63
                        }
                        b[c++] = 128 | g >> 18 & 63
                    }
                    b[c++] = 128 | g >> 12 & 63
                }
                b[c++] = 128 | g >> 6 & 63
            }
            b[c++] = 128 | g & 63
        }
    }
    b[c] = 0;
    return c - e
}
Module.stringToUTF8Array = Ca;
function na(a, b, c) {
    return Ca(a, G, b, c)
}
Module.stringToUTF8 = na;
function Da(a) {
    for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && (d = 65536 + ((d & 1023) << 10) | a.charCodeAt(++c) & 1023);
        127 >= d ? ++b : b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : 2097151 >= d ? b + 4 : 67108863 >= d ? b + 5 : b + 6
    }
    return b
}
Module.lengthBytesUTF8 = Da;
"undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
function Ea(a) {
    return a.replace(/__Z[\w\d_]+/g, function(a) {
        a: {
            var b = Module.___cxa_demangle || Module.__cxa_demangle;
            if (b)
                try {
                    var d = a.substr(1)
                      , e = Da(d) + 1
                      , f = F(e);
                    na(d, f, e);
                    var g = F(4)
                      , h = b(f, 0, 0, g);
                    if (0 === wa(g, "i32") && h) {
                        var n = C(h);
                        break a
                    }
                } catch (r) {} finally {
                    f && Fa(f),
                    g && Fa(g),
                    h && Fa(h)
                }
            else
                u.K("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
            n = a
        }
        return a === n ? a : a + " [" + n + "]"
    })
}
function Ga() {
    a: {
        var a = Error();
        if (!a.stack) {
            try {
                throw Error(0);
            } catch (b) {
                a = b
            }
            if (!a.stack) {
                a = "(no stack trace available)";
                break a
            }
        }
        a = a.stack.toString()
    }
    Module.extraStackTrace && (a += "\n" + Module.extraStackTrace());
    return Ea(a)
}
Module.stackTrace = Ga;
var Ha = 65536
  , Ia = 16777216
  , Ja = 16777216;
function Ka(a, b) {
    0 < a % b && (a += b - a % b);
    return a
}
var buffer, D, G, pa, La, x, Ma, ua, va;
function Na() {
    Module.HEAP8 = D = new Int8Array(buffer);
    Module.HEAP16 = pa = new Int16Array(buffer);
    Module.HEAP32 = x = new Int32Array(buffer);
    Module.HEAPU8 = G = new Uint8Array(buffer);
    Module.HEAPU16 = La = new Uint16Array(buffer);
    Module.HEAPU32 = Ma = new Uint32Array(buffer);
    Module.HEAPF32 = ua = new Float32Array(buffer);
    Module.HEAPF64 = va = new Float64Array(buffer)
}
var Oa, w, xa, Pa, q, Qa, Ra, y;
Oa = w = Pa = q = Qa = Ra = y = 0;
xa = !1;
Module.reallocBuffer || (Module.reallocBuffer = function(a) {
    try {
        if (ArrayBuffer.Bb)
            var b = ArrayBuffer.Bb(buffer, a);
        else {
            var c = D;
            b = new ArrayBuffer(a);
            (new Int8Array(b)).set(c)
        }
    } catch (d) {
        return !1
    }
    return Sa(b) ? b : !1
}
);
function ha() {
    var a = Module.usingWasm ? Ha : Ia
      , b = 2147483648 - a;
    if (x[y >> 2] > b)
        return !1;
    var c = z;
    for (z = Math.max(z, Ja); z < x[y >> 2]; )
        536870912 >= z ? z = Ka(2 * z, a) : z = Math.min(Ka((3 * z + 2147483648) / 4, a), b);
    a = Module.reallocBuffer(z);
    if (!a || a.byteLength != z)
        return z = c,
        !1;
    Module.buffer = buffer = a;
    Na();
    return !0
}
var Ta;
try {
    Ta = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get),
    Ta(new ArrayBuffer(4))
} catch (a) {
    Ta = function(b) {
        return b.byteLength
    }
}
var Ua = Module.TOTAL_STACK || 5242880
  , z = Module.TOTAL_MEMORY || 16777216;
z < Ua && Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + z + "! (TOTAL_STACK=" + Ua + ")");
Module.buffer ? buffer = Module.buffer : "object" === typeof WebAssembly && "function" === typeof WebAssembly.Memory ? (Module.wasmMemory = new WebAssembly.Memory({
    initial: z / Ha
}),
buffer = Module.wasmMemory.buffer) : buffer = new ArrayBuffer(z);
Na();
x[0] = 1668509029;
pa[1] = 25459;
if (115 !== G[2] || 99 !== G[3])
    throw "Runtime error: expected the system to be little-endian!";
Module.HEAP = void 0;
Module.buffer = buffer;
Module.HEAP8 = D;
Module.HEAP16 = pa;
Module.HEAP32 = x;
Module.HEAPU8 = G;
Module.HEAPU16 = La;
Module.HEAPU32 = Ma;
Module.HEAPF32 = ua;
Module.HEAPF64 = va;
function Va(a) {
    for (; 0 < a.length; ) {
        var b = a.shift();
        if ("function" == typeof b)
            b();
        else {
            var c = b.R;
            "number" === typeof c ? void 0 === b.X ? Module.dynCall_v(c) : Module.dynCall_vi(c, b.X) : c(void 0 === b.X ? null : b.X)
        }
    }
}
var Wa = []
  , Xa = []
  , Ya = []
  , Za = []
  , $a = []
  , ya = !1;
function ab(a) {
    Wa.unshift(a)
}
Module.addOnPreRun = ab;
Module.addOnInit = function(a) {
    Xa.unshift(a)
}
;
Module.addOnPreMain = function(a) {
    Ya.unshift(a)
}
;
Module.addOnExit = function(a) {
    Za.unshift(a)
}
;
function bb(a) {
    $a.unshift(a)
}
Module.addOnPostRun = bb;
Module.writeStringToMemory = function(a, b, c) {
    u.K("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");
    if (c) {
        var d = b + Da(a);
        var e = D[d]
    }
    na(a, b, Infinity);
    c && (D[d] = e)
}
;
function ma(a, b) {
    D.set(a, b)
}
Module.writeArrayToMemory = ma;
function za(a, b, c) {
    for (var d = 0; d < a.length; ++d)
        D[b++ >> 0] = a.charCodeAt(d);
    c || (D[b >> 0] = 0)
}
Module.writeAsciiToMemory = za;
Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function(a, b) {
    var c = a & 65535
      , d = b & 65535;
    return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16) | 0
}
);
Math.imul = Math.imul;
if (!Math.fround) {
    var cb = new Float32Array(1);
    Math.fround = function(a) {
        cb[0] = a;
        return cb[0]
    }
}
Math.Kd = Math.fround;
Math.clz32 || (Math.clz32 = function(a) {
    a >>>= 0;
    for (var b = 0; 32 > b; b++)
        if (a & 1 << 31 - b)
            return b;
    return 32
}
);
Math.clz32 = Math.clz32;
Math.trunc || (Math.trunc = function(a) {
    return 0 > a ? Math.ceil(a) : Math.floor(a)
}
);
Math.trunc = Math.trunc;
var qa = Math.abs
  , ta = Math.ceil
  , sa = Math.floor
  , ra = Math.min
  , db = 0
  , eb = null
  , fb = null;
function gb() {
    db++;
    Module.monitorRunDependencies && Module.monitorRunDependencies(db)
}
Module.addRunDependency = gb;
function hb() {
    db--;
    Module.monitorRunDependencies && Module.monitorRunDependencies(db);
    if (0 == db && (null !== eb && (clearInterval(eb),
    eb = null),
    fb)) {
        var a = fb;
        fb = null;
        a()
    }
}
Module.removeRunDependency = hb;
Module.preloadedImages = {};
Module.preloadedAudios = {};
var I = null;
(function() {
    function a(a) {
        a = Ka(a, Module.usingWasm ? Ha : Ia);
        var b = Module.buffer
          , c = b.byteLength;
        if (Module.usingWasm)
            try {
                return -1 !== Module.wasmMemory.grow((a - c) / 65536) ? Module.buffer = Module.wasmMemory.buffer : null
            } catch (L) {
                return null
            }
        else
            return n.__growWasmMemory((a - c) / 65536),
            Module.buffer !== b ? Module.buffer : null
    }
    function b() {
        try {
            if (Module.wasmBinary)
                return new Uint8Array(Module.wasmBinary);
            if (Module.readBinary)
                return Module.readBinary(f);
            throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";
        } catch (v) {
            B(v)
        }
    }
    function c() {
        return Module.wasmBinary || !l && !m || "function" !== typeof fetch ? new Promise(function(a) {
            a(b())
        }
        ) : fetch(f, {
            credentials: "same-origin"
        }).then(function(a) {
            if (!a.ok)
                throw "failed to load wasm binary file at '" + f + "'";
            return a.arrayBuffer()
        }).catch(function() {
            return b()
        })
    }
    function d(a, b) {
        function d(a) {
            n = a.exports;
            if (n.memory) {
                a = n.memory;
                var b = Module.buffer;
                a.byteLength < b.byteLength && Module.printErr("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
                b = new Int8Array(b);
                var c = new Int8Array(a);
                I || b.set(c.subarray(Module.STATIC_BASE, Module.STATIC_BASE + Module.STATIC_BUMP), Module.STATIC_BASE);
                c.set(b);
                Module.buffer = buffer = a;
                Na()
            }
            Module.asm = n;
            Module.usingWasm = !0;
            hb()
        }
        function e(a) {
            d(a.instance)
        }
        function g(a) {
            c().then(function(a) {
                return WebAssembly.instantiate(a, h)
            }).then(a).catch(function(a) {
                Module.printErr("failed to asynchronously prepare wasm: " + a);
                B(a)
            })
        }
        if ("object" !== typeof WebAssembly)
            return Module.printErr("no native wasm support detected"),
            !1;
        if (!(Module.wasmMemory instanceof WebAssembly.Memory))
            return Module.printErr("no native wasm Memory in use"),
            !1;
        b.memory = Module.wasmMemory;
        h.global = {
            NaN: NaN,
            Infinity: Infinity
        };
        h["global.Math"] = a.Math;
        h.env = b;
        gb();
        if (Module.instantiateWasm)
            try {
                return Module.instantiateWasm(h, d)
            } catch ($c) {
                return Module.printErr("Module.instantiateWasm callback failed with error: " + $c),
                !1
            }
        Module.wasmBinary || "function" !== typeof WebAssembly.jb || 0 === f.indexOf("data:") || "function" !== typeof fetch ? g(e) : WebAssembly.jb(fetch(f, {
            credentials: "same-origin"
        }), h).then(e).catch(function(a) {
            Module.printErr("wasm streaming compile failed: " + a);
            Module.printErr("falling back to ArrayBuffer instantiation");
            g(e)
        });
        return {}
    }
    Module.wasmJSMethod = Module.wasmJSMethod || "native-wasm";
    var e = Module.wasmTextFile || "Fritz.wast"
      , f = Module.wasmBinaryFile || "http://127.0.0.1/common/chess/engine/webasm/Fritz3.wasm"
      , g = Module.asmjsCodeFile || "Fritz.temp.asm.js";
    "function" === typeof Module.locateFile && (e = Module.locateFile(e),
    f = Module.locateFile(f),
    g = Module.locateFile(g));
    var h = {
        global: null,
        env: null,
        asm2wasm: {
            "f64-rem": function(a, b) {
                return a % b
            },
            "f64-to-int": function(a) {
                return a | 0
            },
            "i32s-div": function(a, b) {
                return (a | 0) / (b | 0) | 0
            },
            "i32u-div": function(a, b) {
                return (a >>> 0) / (b >>> 0) >>> 0
            },
            "i32s-rem": function(a, b) {
                return (a | 0) % (b | 0) | 0
            },
            "i32u-rem": function(a, b) {
                return (a >>> 0) % (b >>> 0) >>> 0
            },
            "debugger": function() {
                debugger
            }
        },
        parent: Module
    }
      , n = null;
    Module.asmPreload = Module.asm;
    var r = Module.reallocBuffer;
    Module.reallocBuffer = function(b) {
        return "asmjs" === t ? r(b) : a(b)
    }
    ;
    var t = "";
    Module.asm = function(a, b) {
        if (!b.table) {
            var c = Module.wasmTableSize;
            void 0 === c && (c = 1024);
            var e = Module.wasmMaxTableSize;
            b.table = "object" === typeof WebAssembly && "function" === typeof WebAssembly.Table ? void 0 !== e ? new WebAssembly.Table({
                initial: c,
                maximum: e,
                element: "anyfunc"
            }) : new WebAssembly.Table({
                initial: c,
                element: "anyfunc"
            }) : Array(c);
            Module.wasmTable = b.table
        }
        b.memoryBase || (b.memoryBase = Module.STATIC_BASE);
        b.tableBase || (b.tableBase = 0);
        (a = d(a, b)) || B("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods");
        return a
    }
}
)();
Oa = u.ia;
w = Oa + 1599264;
Xa.push({
    R: function() {
        ib()
    }
}, {
    R: function() {
        jb()
    }
}, {
    R: function() {
        kb()
    }
}, {
    R: function() {
        lb()
    }
});
I = null;
Module.STATIC_BASE = Oa;
Module.STATIC_BUMP = 1599264;
var mb = w;
w += 16;
function nb() {
    return !!nb.s
}
var ob = 0
  , pb = []
  , qb = {};
function rb() {
    var a = ob;
    if (!a)
        return (u.O(0),
        0) | 0;
    var b = qb[a]
      , c = b.type;
    if (!c)
        return (u.O(0),
        a) | 0;
    var d = Array.prototype.slice.call(arguments);
    Module.___cxa_is_pointer_type(c);
    rb.buffer || (rb.buffer = F(4));
    x[rb.buffer >> 2] = a;
    a = rb.buffer;
    for (var e = 0; e < d.length; e++)
        if (d[e] && Module.___cxa_can_catch(d[e], c, a))
            return a = x[a >> 2],
            b.Ca = a,
            (u.O(d[e]),
            a) | 0;
    a = x[a >> 2];
    return (u.O(c),
    a) | 0
}
var J = {
    F: 1,
    A: 2,
    qd: 3,
    lc: 4,
    D: 5,
    Ba: 6,
    Eb: 7,
    Jc: 8,
    V: 9,
    Sb: 10,
    wa: 11,
    Ad: 11,
    Wa: 12,
    ea: 13,
    dc: 14,
    Vc: 15,
    fa: 16,
    ya: 17,
    Bd: 18,
    ha: 19,
    za: 20,
    P: 21,
    i: 22,
    Ec: 23,
    Va: 24,
    L: 25,
    xd: 26,
    ec: 27,
    Rc: 28,
    W: 29,
    nd: 30,
    xc: 31,
    ed: 32,
    ac: 33,
    kd: 34,
    Nc: 42,
    ic: 43,
    Tb: 44,
    oc: 45,
    pc: 46,
    qc: 47,
    wc: 48,
    yd: 49,
    Hc: 50,
    nc: 51,
    Yb: 35,
    Kc: 37,
    Kb: 52,
    Nb: 53,
    Cd: 54,
    Fc: 55,
    Ob: 56,
    Pb: 57,
    Zb: 35,
    Qb: 59,
    Tc: 60,
    Ic: 61,
    ud: 62,
    Sc: 63,
    Oc: 64,
    Pc: 65,
    md: 66,
    Lc: 67,
    Hb: 68,
    rd: 69,
    Ub: 70,
    gd: 71,
    zc: 72,
    bc: 73,
    Mb: 74,
    $c: 76,
    Lb: 77,
    ld: 78,
    rc: 79,
    sc: 80,
    vc: 81,
    uc: 82,
    tc: 83,
    Uc: 38,
    Aa: 39,
    Ac: 36,
    ga: 40,
    ad: 95,
    dd: 96,
    Xb: 104,
    Gc: 105,
    Ib: 97,
    jd: 91,
    Yc: 88,
    Qc: 92,
    od: 108,
    Wb: 111,
    Fb: 98,
    Vb: 103,
    Dc: 101,
    Bc: 100,
    vd: 110,
    fc: 112,
    hc: 113,
    kc: 115,
    Jb: 114,
    $b: 89,
    yc: 90,
    hd: 93,
    pd: 94,
    Gb: 99,
    Cc: 102,
    mc: 106,
    Wc: 107,
    wd: 109,
    zd: 87,
    cc: 122,
    sd: 116,
    Zc: 95,
    Mc: 123,
    jc: 84,
    bd: 75,
    Rb: 125,
    Xc: 131,
    cd: 130,
    td: 86
};
function sb(a) {
    Module.___errno_location && (x[Module.___errno_location() >> 2] = a);
    return a
}
var tb = {
    0: "Success",
    1: "Not super-user",
    2: "No such file or directory",
    3: "No such process",
    4: "Interrupted system call",
    5: "I/O error",
    6: "No such device or address",
    7: "Arg list too long",
    8: "Exec format error",
    9: "Bad file number",
    10: "No children",
    11: "No more processes",
    12: "Not enough core",
    13: "Permission denied",
    14: "Bad address",
    15: "Block device required",
    16: "Mount device busy",
    17: "File exists",
    18: "Cross-device link",
    19: "No such device",
    20: "Not a directory",
    21: "Is a directory",
    22: "Invalid argument",
    23: "Too many open files in system",
    24: "Too many open files",
    25: "Not a typewriter",
    26: "Text file busy",
    27: "File too large",
    28: "No space left on device",
    29: "Illegal seek",
    30: "Read only file system",
    31: "Too many links",
    32: "Broken pipe",
    33: "Math arg out of domain of func",
    34: "Math result not representable",
    35: "File locking deadlock error",
    36: "File or path name too long",
    37: "No record locks available",
    38: "Function not implemented",
    39: "Directory not empty",
    40: "Too many symbolic links",
    42: "No message of desired type",
    43: "Identifier removed",
    44: "Channel number out of range",
    45: "Level 2 not synchronized",
    46: "Level 3 halted",
    47: "Level 3 reset",
    48: "Link number out of range",
    49: "Protocol driver not attached",
    50: "No CSI structure available",
    51: "Level 2 halted",
    52: "Invalid exchange",
    53: "Invalid request descriptor",
    54: "Exchange full",
    55: "No anode",
    56: "Invalid request code",
    57: "Invalid slot",
    59: "Bad font file fmt",
    60: "Device not a stream",
    61: "No data (for no delay io)",
    62: "Timer expired",
    63: "Out of streams resources",
    64: "Machine is not on the network",
    65: "Package not installed",
    66: "The object is remote",
    67: "The link has been severed",
    68: "Advertise error",
    69: "Srmount error",
    70: "Communication error on send",
    71: "Protocol error",
    72: "Multihop attempted",
    73: "Cross mount point (not really error)",
    74: "Trying to read unreadable message",
    75: "Value too large for defined data type",
    76: "Given log. name not unique",
    77: "f.d. invalid for this operation",
    78: "Remote address changed",
    79: "Can   access a needed shared lib",
    80: "Accessing a corrupted shared lib",
    81: ".lib section in a.out corrupted",
    82: "Attempting to link in too many libs",
    83: "Attempting to exec a shared library",
    84: "Illegal byte sequence",
    86: "Streams pipe error",
    87: "Too many users",
    88: "Socket operation on non-socket",
    89: "Destination address required",
    90: "Message too long",
    91: "Protocol wrong type for socket",
    92: "Protocol not available",
    93: "Unknown protocol",
    94: "Socket type not supported",
    95: "Not supported",
    96: "Protocol family not supported",
    97: "Address family not supported by protocol family",
    98: "Address already in use",
    99: "Address not available",
    100: "Network interface is not configured",
    101: "Network is unreachable",
    102: "Connection reset by network",
    103: "Connection aborted",
    104: "Connection reset by peer",
    105: "No buffer space available",
    106: "Socket is already connected",
    107: "Socket is not connected",
    108: "Can't send after socket shutdown",
    109: "Too many references",
    110: "Connection timed out",
    111: "Connection refused",
    112: "Host is down",
    113: "Host is unreachable",
    114: "Socket already connected",
    115: "Connection already in progress",
    116: "Stale file handle",
    122: "Quota exceeded",
    123: "No medium (in tape drive)",
    125: "Operation canceled",
    130: "Previous owner died",
    131: "State not recoverable"
};
function ub(a, b) {
    for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var e = a[d];
        "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1),
        c++) : c && (a.splice(d, 1),
        c--)
    }
    if (b)
        for (; c; c--)
            a.unshift("..");
    return a
}
function vb(a) {
    var b = "/" === a.charAt(0)
      , c = "/" === a.substr(-1);
    (a = ub(a.split("/").filter(function(a) {
        return !!a
    }), !b).join("/")) || b || (a = ".");
    a && c && (a += "/");
    return (b ? "/" : "") + a
}
function wb(a) {
    var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
    a = b[0];
    b = b[1];
    if (!a && !b)
        return ".";
    b && (b = b.substr(0, b.length - 1));
    return a + b
}
function xb(a) {
    if ("/" === a)
        return "/";
    var b = a.lastIndexOf("/");
    return -1 === b ? a : a.substr(b + 1)
}
function yb() {
    var a = Array.prototype.slice.call(arguments, 0);
    return vb(a.join("/"))
}
function K(a, b) {
    return vb(a + "/" + b)
}
function zb() {
    for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : "/";
        if ("string" !== typeof b)
            throw new TypeError("Arguments to path.resolve must be strings");
        if (!b)
            return "";
        a = b + "/" + a;
        b = "/" === b.charAt(0)
    }
    a = ub(a.split("/").filter(function(a) {
        return !!a
    }), !b).join("/");
    return (b ? "/" : "") + a || "."
}
var Ab = [];
function Bb(a, b) {
    Ab[a] = {
        input: [],
        output: [],
        N: b
    };
    Cb(a, Db)
}
var Db = {
    open: function(a) {
        var b = Ab[a.node.rdev];
        if (!b)
            throw new N(J.ha);
        a.tty = b;
        a.seekable = !1
    },
    close: function(a) {
        a.tty.N.flush(a.tty)
    },
    flush: function(a) {
        a.tty.N.flush(a.tty)
    },
    read: function(a, b, c, d) {
        if (!a.tty || !a.tty.N.Oa)
            throw new N(J.Ba);
        for (var e = 0, f = 0; f < d; f++) {
            try {
                var g = a.tty.N.Oa(a.tty)
            } catch (h) {
                throw new N(J.D);
            }
            if (void 0 === g && 0 === e)
                throw new N(J.wa);
            if (null === g || void 0 === g)
                break;
            e++;
            b[c + f] = g
        }
        e && (a.node.timestamp = Date.now());
        return e
    },
    write: function(a, b, c, d) {
        if (!a.tty || !a.tty.N.qa)
            throw new N(J.Ba);
        for (var e = 0; e < d; e++)
            try {
                a.tty.N.qa(a.tty, b[c + e])
            } catch (f) {
                throw new N(J.D);
            }
        d && (a.node.timestamp = Date.now());
        return e
    }
}
  , Eb = {
    Oa: function(a) {
        if (!a.input.length) {
            var b = null;
            if (p) {
                var c = new Buffer(256)
                  , d = 0
                  , e = process.stdin.fd;
                if ("win32" != process.platform) {
                    var f = !1;
                    try {
                        e = fs.openSync("/dev/stdin", "r"),
                        f = !0
                    } catch (g) {}
                }
                try {
                    d = fs.readSync(e, c, 0, 256, null)
                } catch (g) {
                    if (-1 != g.toString().indexOf("EOF"))
                        d = 0;
                    else
                        throw g;
                }
                f && fs.closeSync(e);
                0 < d ? b = c.slice(0, d).toString("utf-8") : b = null
            } else
                "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "),
                null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(),
                null !== b && (b += "\n"));
            if (!b)
                return null;
            a.input = O(b, !0)
        }
        return a.input.shift()
    },
    qa: function(a, b) {
        null === b || 10 === b ? (Module.print(Ba(a.output, 0)),
        a.output = []) : 0 != b && a.output.push(b)
    },
    flush: function(a) {
        a.output && 0 < a.output.length && (Module.print(Ba(a.output, 0)),
        a.output = [])
    }
}
  , Fb = {
    qa: function(a, b) {
        null === b || 10 === b ? (Module.printErr(Ba(a.output, 0)),
        a.output = []) : 0 != b && a.output.push(b)
    },
    flush: function(a) {
        a.output && 0 < a.output.length && (Module.printErr(Ba(a.output, 0)),
        a.output = [])
    }
}
  , P = {
    u: null,
    m: function() {
        return P.createNode(null, "/", 16895, 0)
    },
    createNode: function(a, b, c, d) {
        if (24576 === (c & 61440) || 4096 === (c & 61440))
            throw new N(J.F);
        P.u || (P.u = {
            dir: {
                node: {
                    v: P.c.v,
                    l: P.c.l,
                    lookup: P.c.lookup,
                    S: P.c.S,
                    rename: P.c.rename,
                    unlink: P.c.unlink,
                    rmdir: P.c.rmdir,
                    readdir: P.c.readdir,
                    symlink: P.c.symlink
                },
                stream: {
                    B: P.f.B
                }
            },
            file: {
                node: {
                    v: P.c.v,
                    l: P.c.l
                },
                stream: {
                    B: P.f.B,
                    read: P.f.read,
                    write: P.f.write,
                    Ea: P.f.Ea,
                    Ra: P.f.Ra,
                    $: P.f.$
                }
            },
            link: {
                node: {
                    v: P.c.v,
                    l: P.c.l,
                    readlink: P.c.readlink
                },
                stream: {}
            },
            Ha: {
                node: {
                    v: P.c.v,
                    l: P.c.l
                },
                stream: Gb
            }
        });
        c = Hb(a, b, c, d);
        Q(c.mode) ? (c.c = P.u.dir.node,
        c.f = P.u.dir.stream,
        c.b = {}) : 32768 === (c.mode & 61440) ? (c.c = P.u.file.node,
        c.f = P.u.file.stream,
        c.g = 0,
        c.b = null) : 40960 === (c.mode & 61440) ? (c.c = P.u.link.node,
        c.f = P.u.link.stream) : 8192 === (c.mode & 61440) && (c.c = P.u.Ha.node,
        c.f = P.u.Ha.stream);
        c.timestamp = Date.now();
        a && (a.b[b] = c);
        return c
    },
    fb: function(a) {
        if (a.b && a.b.subarray) {
            for (var b = [], c = 0; c < a.g; ++c)
                b.push(a.b[c]);
            return b
        }
        return a.b
    },
    Nd: function(a) {
        return a.b ? a.b.subarray ? a.b.subarray(0, a.g) : new Uint8Array(a.b) : new Uint8Array
    },
    Ja: function(a, b) {
        a.b && a.b.subarray && b > a.b.length && (a.b = P.fb(a),
        a.g = a.b.length);
        if (!a.b || a.b.subarray) {
            var c = a.b ? a.b.length : 0;
            c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) | 0),
            0 != c && (b = Math.max(b, 256)),
            c = a.b,
            a.b = new Uint8Array(b),
            0 < a.g && a.b.set(c.subarray(0, a.g), 0))
        } else
            for (!a.b && 0 < b && (a.b = []); a.b.length < b; )
                a.b.push(0)
    },
    sb: function(a, b) {
        if (a.g != b)
            if (0 == b)
                a.b = null,
                a.g = 0;
            else {
                if (!a.b || a.b.subarray) {
                    var c = a.b;
                    a.b = new Uint8Array(new ArrayBuffer(b));
                    c && a.b.set(c.subarray(0, Math.min(b, a.g)))
                } else if (a.b || (a.b = []),
                a.b.length > b)
                    a.b.length = b;
                else
                    for (; a.b.length < b; )
                        a.b.push(0);
                a.g = b
            }
    },
    c: {
        v: function(a) {
            var b = {};
            b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
            b.ino = a.id;
            b.mode = a.mode;
            b.nlink = 1;
            b.uid = 0;
            b.gid = 0;
            b.rdev = a.rdev;
            Q(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.g : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
            b.atime = new Date(a.timestamp);
            b.mtime = new Date(a.timestamp);
            b.ctime = new Date(a.timestamp);
            b.H = 4096;
            b.blocks = Math.ceil(b.size / b.H);
            return b
        },
        l: function(a, b) {
            void 0 !== b.mode && (a.mode = b.mode);
            void 0 !== b.timestamp && (a.timestamp = b.timestamp);
            void 0 !== b.size && P.sb(a, b.size)
        },
        lookup: function() {
            throw Ib[J.A];
        },
        S: function(a, b, c, d) {
            return P.createNode(a, b, c, d)
        },
        rename: function(a, b, c) {
            if (Q(a.mode)) {
                try {
                    var d = Jb(b, c)
                } catch (f) {}
                if (d)
                    for (var e in d.b)
                        throw new N(J.Aa);
            }
            delete a.parent.b[a.name];
            a.name = c;
            b.b[c] = a;
            a.parent = b
        },
        unlink: function(a, b) {
            delete a.b[b]
        },
        rmdir: function(a, b) {
            var c = Jb(a, b), d;
            for (d in c.b)
                throw new N(J.Aa);
            delete a.b[b]
        },
        readdir: function(a) {
            var b = [".", ".."], c;
            for (c in a.b)
                a.b.hasOwnProperty(c) && b.push(c);
            return b
        },
        symlink: function(a, b, c) {
            a = P.createNode(a, b, 41471, 0);
            a.link = c;
            return a
        },
        readlink: function(a) {
            if (40960 !== (a.mode & 61440))
                throw new N(J.i);
            return a.link
        }
    },
    f: {
        read: function(a, b, c, d, e) {
            var f = a.node.b;
            if (e >= a.node.g)
                return 0;
            a = Math.min(a.node.g - e, d);
            assert(0 <= a);
            if (8 < a && f.subarray)
                b.set(f.subarray(e, e + a), c);
            else
                for (d = 0; d < a; d++)
                    b[c + d] = f[e + d];
            return a
        },
        write: function(a, b, c, d, e, f) {
            if (!d)
                return 0;
            a = a.node;
            a.timestamp = Date.now();
            if (b.subarray && (!a.b || a.b.subarray)) {
                if (f)
                    return a.b = b.subarray(c, c + d),
                    a.g = d;
                if (0 === a.g && 0 === e)
                    return a.b = new Uint8Array(b.subarray(c, c + d)),
                    a.g = d;
                if (e + d <= a.g)
                    return a.b.set(b.subarray(c, c + d), e),
                    d
            }
            P.Ja(a, e + d);
            if (a.b.subarray && b.subarray)
                a.b.set(b.subarray(c, c + d), e);
            else
                for (f = 0; f < d; f++)
                    a.b[e + f] = b[c + f];
            a.g = Math.max(a.g, e + d);
            return d
        },
        B: function(a, b, c) {
            1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.g);
            if (0 > b)
                throw new N(J.i);
            return b
        },
        Ea: function(a, b, c) {
            P.Ja(a.node, b + c);
            a.node.g = Math.max(a.node.g, b + c)
        },
        Ra: function(a, b, c, d, e, f, g) {
            if (32768 !== (a.node.mode & 61440))
                throw new N(J.ha);
            c = a.node.b;
            if (g & 2 || c.buffer !== b && c.buffer !== b.buffer) {
                if (0 < e || e + d < a.node.g)
                    c.subarray ? c = c.subarray(e, e + d) : c = Array.prototype.slice.call(c, e, e + d);
                a = !0;
                d = F(d);
                if (!d)
                    throw new N(J.Wa);
                b.set(c, d)
            } else
                a = !1,
                d = c.byteOffset;
            return {
                ob: d,
                $a: a
            }
        },
        $: function(a, b, c, d, e) {
            if (32768 !== (a.node.mode & 61440))
                throw new N(J.ha);
            if (e & 2)
                return 0;
            P.f.write(a, b, 0, d, c, !1);
            return 0
        }
    }
}
  , R = {
    Z: !1,
    wb: function() {
        R.Z = !!process.platform.match(/^win/)
    },
    m: function(a) {
        assert(p);
        return R.createNode(null, "/", R.Ma(a.pa.root), 0)
    },
    createNode: function(a, b, c) {
        if (!Q(c) && 32768 !== (c & 61440) && 40960 !== (c & 61440))
            throw new N(J.i);
        a = Hb(a, b, c);
        a.c = R.c;
        a.f = R.f;
        return a
    },
    Ma: function(a) {
        try {
            var b = fs.lstatSync(a);
            R.Z && (b.mode = b.mode | (b.mode & 146) >> 1)
        } catch (c) {
            if (!c.code)
                throw c;
            throw new N(J[c.code]);
        }
        return b.mode
    },
    o: function(a) {
        for (var b = []; a.parent !== a; )
            b.push(a.name),
            a = a.parent;
        b.push(a.m.pa.root);
        b.reverse();
        return yb.apply(null, b)
    },
    Ka: {
        0: "r",
        1: "r+",
        2: "r+",
        64: "r",
        65: "r+",
        66: "r+",
        129: "rx+",
        193: "rx+",
        514: "w+",
        577: "w",
        578: "w+",
        705: "wx",
        706: "wx+",
        1024: "a",
        1025: "a",
        1026: "a+",
        1089: "a",
        1090: "a+",
        1153: "ax",
        1154: "ax+",
        1217: "ax",
        1218: "ax+",
        4096: "rs",
        4098: "rs+"
    },
    eb: function(a) {
        a &= -2656257;
        if (a in R.Ka)
            return R.Ka[a];
        throw new N(J.i);
    },
    c: {
        v: function(a) {
            a = R.o(a);
            try {
                var b = fs.lstatSync(a)
            } catch (c) {
                if (!c.code)
                    throw c;
                throw new N(J[c.code]);
            }
            R.Z && !b.H && (b.H = 4096);
            R.Z && !b.blocks && (b.blocks = (b.size + b.H - 1) / b.H | 0);
            return {
                dev: b.dev,
                ino: b.ino,
                mode: b.mode,
                nlink: b.nlink,
                uid: b.uid,
                gid: b.gid,
                rdev: b.rdev,
                size: b.size,
                atime: b.atime,
                mtime: b.mtime,
                ctime: b.ctime,
                H: b.H,
                blocks: b.blocks
            }
        },
        l: function(a, b) {
            var c = R.o(a);
            try {
                void 0 !== b.mode && (fs.chmodSync(c, b.mode),
                a.mode = b.mode),
                void 0 !== b.size && fs.truncateSync(c, b.size)
            } catch (d) {
                if (!d.code)
                    throw d;
                throw new N(J[d.code]);
            }
        },
        lookup: function(a, b) {
            var c = K(R.o(a), b);
            c = R.Ma(c);
            return R.createNode(a, b, c)
        },
        S: function(a, b, c, d) {
            a = R.createNode(a, b, c, d);
            b = R.o(a);
            try {
                Q(a.mode) ? fs.mkdirSync(b, a.mode) : fs.writeFileSync(b, "", {
                    mode: a.mode
                })
            } catch (e) {
                if (!e.code)
                    throw e;
                throw new N(J[e.code]);
            }
            return a
        },
        rename: function(a, b, c) {
            a = R.o(a);
            b = K(R.o(b), c);
            try {
                fs.renameSync(a, b)
            } catch (d) {
                if (!d.code)
                    throw d;
                throw new N(J[d.code]);
            }
        },
        unlink: function(a, b) {
            a = K(R.o(a), b);
            try {
                fs.unlinkSync(a)
            } catch (c) {
                if (!c.code)
                    throw c;
                throw new N(J[c.code]);
            }
        },
        rmdir: function(a, b) {
            a = K(R.o(a), b);
            try {
                fs.rmdirSync(a)
            } catch (c) {
                if (!c.code)
                    throw c;
                throw new N(J[c.code]);
            }
        },
        readdir: function(a) {
            a = R.o(a);
            try {
                return fs.readdirSync(a)
            } catch (b) {
                if (!b.code)
                    throw b;
                throw new N(J[b.code]);
            }
        },
        symlink: function(a, b, c) {
            a = K(R.o(a), b);
            try {
                fs.symlinkSync(c, a)
            } catch (d) {
                if (!d.code)
                    throw d;
                throw new N(J[d.code]);
            }
        },
        readlink: function(a) {
            var b = R.o(a);
            try {
                return b = fs.readlinkSync(b),
                b = Kb.relative(Kb.resolve(a.m.pa.root), b)
            } catch (c) {
                if (!c.code)
                    throw c;
                throw new N(J[c.code]);
            }
        }
    },
    f: {
        open: function(a) {
            var b = R.o(a.node);
            try {
                32768 === (a.node.mode & 61440) && (a.U = fs.openSync(b, R.eb(a.flags)))
            } catch (c) {
                if (!c.code)
                    throw c;
                throw new N(J[c.code]);
            }
        },
        close: function(a) {
            try {
                32768 === (a.node.mode & 61440) && a.U && fs.closeSync(a.U)
            } catch (b) {
                if (!b.code)
                    throw b;
                throw new N(J[b.code]);
            }
        },
        read: function(a, b, c, d, e) {
            if (0 === d)
                return 0;
            var f = new Buffer(d);
            try {
                var g = fs.readSync(a.U, f, 0, d, e)
            } catch (h) {
                throw new N(J[h.code]);
            }
            if (0 < g)
                for (a = 0; a < g; a++)
                    b[c + a] = f[a];
            return g
        },
        write: function(a, b, c, d, e) {
            b = new Buffer(b.subarray(c, c + d));
            try {
                var f = fs.writeSync(a.U, b, 0, d, e)
            } catch (g) {
                throw new N(J[g.code]);
            }
            return f
        },
        B: function(a, b, c) {
            if (1 === c)
                b += a.position;
            else if (2 === c && 32768 === (a.node.mode & 61440))
                try {
                    b += fs.fstatSync(a.U).size
                } catch (d) {
                    throw new N(J[d.code]);
                }
            if (0 > b)
                throw new N(J.i);
            return b
        }
    }
};
w += 16;
w += 16;
w += 16;
var Lb = null
  , Mb = [null]
  , S = []
  , Nb = 1
  , T = null
  , Ob = !0
  , Pb = {}
  , N = null
  , Ib = {};
function U(a, b) {
    a = zb("/", a);
    b = b || {};
    if (!a)
        return {
            path: "",
            node: null
        };
    var c = {
        La: !0,
        ra: 0
    }, d;
    for (d in c)
        void 0 === b[d] && (b[d] = c[d]);
    if (8 < b.ra)
        throw new N(J.ga);
    a = ub(a.split("/").filter(function(a) {
        return !!a
    }), !1);
    var e = Lb;
    c = "/";
    for (d = 0; d < a.length; d++) {
        var f = d === a.length - 1;
        if (f && b.parent)
            break;
        e = Jb(e, a[d]);
        c = K(c, a[d]);
        e.T && (!f || f && b.La) && (e = e.T.root);
        if (!f || b.la)
            for (f = 0; 40960 === (e.mode & 61440); )
                if (e = Qb(c),
                c = zb(wb(c), e),
                e = U(c, {
                    ra: b.ra
                }).node,
                40 < f++)
                    throw new N(J.ga);
    }
    return {
        path: c,
        node: e
    }
}
function Rb(a) {
    for (var b; ; ) {
        if (a === a.parent)
            return a = a.m.Sa,
            b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
        b = b ? a.name + "/" + b : a.name;
        a = a.parent
    }
}
function Sb(a, b) {
    for (var c = 0, d = 0; d < b.length; d++)
        c = (c << 5) - c + b.charCodeAt(d) | 0;
    return (a + c >>> 0) % T.length
}
function Tb(a) {
    var b = Sb(a.parent.id, a.name);
    a.M = T[b];
    T[b] = a
}
function Jb(a, b) {
    var c;
    if (c = (c = Ub(a, "x")) ? c : a.c.lookup ? 0 : J.ea)
        throw new N(c,a);
    for (c = T[Sb(a.id, b)]; c; c = c.M) {
        var d = c.name;
        if (c.parent.id === a.id && d === b)
            return c
    }
    return a.c.lookup(a, b)
}
function Hb(a, b, c, d) {
    Vb || (Vb = function(a, b, c, d) {
        a || (a = this);
        this.parent = a;
        this.m = a.m;
        this.T = null;
        this.id = Nb++;
        this.name = b;
        this.mode = c;
        this.c = {};
        this.f = {};
        this.rdev = d
    }
    ,
    Vb.prototype = {},
    Object.defineProperties(Vb.prototype, {
        read: {
            get: function() {
                return 365 === (this.mode & 365)
            },
            set: function(a) {
                a ? this.mode |= 365 : this.mode &= -366
            }
        },
        write: {
            get: function() {
                return 146 === (this.mode & 146)
            },
            set: function(a) {
                a ? this.mode |= 146 : this.mode &= -147
            }
        },
        mb: {
            get: function() {
                return Q(this.mode)
            }
        },
        lb: {
            get: function() {
                return 8192 === (this.mode & 61440)
            }
        }
    }));
    a = new Vb(a,b,c,d);
    Tb(a);
    return a
}
function Q(a) {
    return 16384 === (a & 61440)
}
var Wb = {
    r: 0,
    rs: 1052672,
    "r+": 2,
    w: 577,
    wx: 705,
    xw: 705,
    "w+": 578,
    "wx+": 706,
    "xw+": 706,
    a: 1089,
    ax: 1217,
    xa: 1217,
    "a+": 1090,
    "ax+": 1218,
    "xa+": 1218
};
function Xb(a) {
    var b = ["r", "w", "rw"][a & 3];
    a & 512 && (b += "w");
    return b
}
function Ub(a, b) {
    if (Ob)
        return 0;
    if (-1 === b.indexOf("r") || a.mode & 292) {
        if (-1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73))
            return J.ea
    } else
        return J.ea;
    return 0
}
function Yb(a, b) {
    try {
        return Jb(a, b),
        J.ya
    } catch (c) {}
    return Ub(a, "wx")
}
function Zb() {
    var a = 4096;
    for (var b = 0; b <= a; b++)
        if (!S[b])
            return b;
    throw new N(J.Va);
}
function $b(a) {
    ac || (ac = function() {}
    ,
    ac.prototype = {},
    Object.defineProperties(ac.prototype, {
        object: {
            get: function() {
                return this.node
            },
            set: function(a) {
                this.node = a
            }
        }
    }));
    var b = new ac, c;
    for (c in a)
        b[c] = a[c];
    a = b;
    b = Zb();
    a.fd = b;
    return S[b] = a
}
var Gb = {
    open: function(a) {
        a.f = Mb[a.node.rdev].f;
        a.f.open && a.f.open(a)
    },
    B: function() {
        throw new N(J.W);
    }
};
function Cb(a, b) {
    Mb[a] = {
        f: b
    }
}
function bc(a, b) {
    var c = "/" === b
      , d = !b;
    if (c && Lb)
        throw new N(J.fa);
    if (!c && !d) {
        var e = U(b, {
            La: !1
        });
        b = e.path;
        e = e.node;
        if (e.T)
            throw new N(J.fa);
        if (!Q(e.mode))
            throw new N(J.za);
    }
    b = {
        type: a,
        pa: {},
        Sa: b,
        nb: []
    };
    a = a.m(b);
    a.m = b;
    b.root = a;
    c ? Lb = a : e && (e.T = b,
    e.m && e.m.nb.push(b))
}
function cc(a, b, c) {
    var d = U(a, {
        parent: !0
    }).node;
    a = xb(a);
    if (!a || "." === a || ".." === a)
        throw new N(J.i);
    var e = Yb(d, a);
    if (e)
        throw new N(e);
    if (!d.c.S)
        throw new N(J.F);
    return d.c.S(d, a, b, c)
}
function V(a, b) {
    return cc(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0)
}
function dc(a, b, c) {
    "undefined" === typeof c && (c = b,
    b = 438);
    return cc(a, b | 8192, c)
}
function ec(a, b) {
    if (!zb(a))
        throw new N(J.A);
    var c = U(b, {
        parent: !0
    }).node;
    if (!c)
        throw new N(J.A);
    b = xb(b);
    var d = Yb(c, b);
    if (d)
        throw new N(d);
    if (!c.c.symlink)
        throw new N(J.F);
    return c.c.symlink(c, b, a)
}
function Qb(a) {
    a = U(a).node;
    if (!a)
        throw new N(J.A);
    if (!a.c.readlink)
        throw new N(J.i);
    return zb(Rb(a.parent), a.c.readlink(a))
}
function fc(a, b) {
    var c;
    "string" === typeof a ? c = U(a, {
        la: !0
    }).node : c = a;
    if (!c.c.l)
        throw new N(J.F);
    c.c.l(c, {
        mode: b & 4095 | c.mode & -4096,
        timestamp: Date.now()
    })
}
function hc(a, b) {
    if ("" === a)
        throw new N(J.A);
    if ("string" === typeof b) {
        var c = Wb[b];
        if ("undefined" === typeof c)
            throw Error("Unknown file open mode: " + b);
        b = c
    }
    var d = b & 64 ? ("undefined" === typeof d ? 438 : d) & 4095 | 32768 : 0;
    if ("object" === typeof a)
        var e = a;
    else {
        a = vb(a);
        try {
            e = U(a, {
                la: !(b & 131072)
            }).node
        } catch (g) {}
    }
    c = !1;
    if (b & 64)
        if (e) {
            if (b & 128)
                throw new N(J.ya);
        } else
            e = cc(a, d, 0),
            c = !0;
    if (!e)
        throw new N(J.A);
    8192 === (e.mode & 61440) && (b &= -513);
    if (b & 65536 && !Q(e.mode))
        throw new N(J.za);
    if (!c && (d = e ? 40960 === (e.mode & 61440) ? J.ga : Q(e.mode) && ("r" !== Xb(b) || b & 512) ? J.P : Ub(e, Xb(b)) : J.A))
        throw new N(d);
    if (b & 512) {
        d = e;
        var f;
        "string" === typeof d ? f = U(d, {
            la: !0
        }).node : f = d;
        if (!f.c.l)
            throw new N(J.F);
        if (Q(f.mode))
            throw new N(J.P);
        if (32768 !== (f.mode & 61440))
            throw new N(J.i);
        if (d = Ub(f, "w"))
            throw new N(d);
        f.c.l(f, {
            size: 0,
            timestamp: Date.now()
        })
    }
    b &= -641;
    e = $b({
        node: e,
        path: Rb(e),
        flags: b,
        seekable: !0,
        position: 0,
        f: e.f,
        Cb: [],
        error: !1
    });
    e.f.open && e.f.open(e);
    !Module.logReadFiles || b & 1 || (ic || (ic = {}),
    a in ic || (ic[a] = 1,
    Module.printErr("read file: " + a)));
    try {
        Pb.onOpenFile && (f = 0,
        1 !== (b & 2097155) && (f |= 1),
        0 !== (b & 2097155) && (f |= 2),
        Pb.onOpenFile(a, f))
    } catch (g) {
        console.log("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + g.message)
    }
    return e
}
function jc(a) {
    a.na && (a.na = null);
    try {
        a.f.close && a.f.close(a)
    } catch (b) {
        throw b;
    } finally {
        S[a.fd] = null
    }
}
function kc(a, b, c) {
    if (!a.seekable || !a.f.B)
        throw new N(J.W);
    a.position = a.f.B(a, b, c);
    a.Cb = []
}
function lc(a, b, c, d, e, f) {
    if (0 > d || 0 > e)
        throw new N(J.i);
    if (0 === (a.flags & 2097155))
        throw new N(J.V);
    if (Q(a.node.mode))
        throw new N(J.P);
    if (!a.f.write)
        throw new N(J.i);
    a.flags & 1024 && kc(a, 0, 2);
    var g = !0;
    if ("undefined" === typeof e)
        e = a.position,
        g = !1;
    else if (!a.seekable)
        throw new N(J.W);
    b = a.f.write(a, b, c, d, e, f);
    g || (a.position += b);
    try {
        if (a.path && Pb.onWriteToFile)
            Pb.onWriteToFile(a.path)
    } catch (h) {
        console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + h.message)
    }
    return b
}
function mc() {
    N || (N = function(a, b) {
        this.node = b;
        this.vb = function(a) {
            this.I = a;
            for (var b in J)
                if (J[b] === a) {
                    this.code = b;
                    break
                }
        }
        ;
        this.vb(a);
        this.message = tb[a]
    }
    ,
    N.prototype = Error(),
    N.prototype.constructor = N,
    [J.A].forEach(function(a) {
        Ib[a] = new N(a);
        Ib[a].stack = "<generic error, no stack>"
    }))
}
var nc;
function oc(a, b) {
    var c = 0;
    a && (c |= 365);
    b && (c |= 146);
    return c
}
function pc(a, b, c, d) {
    a = K("string" === typeof a ? a : Rb(a), b);
    c = oc(c, d);
    return cc(a, (void 0 !== c ? c : 438) & 4095 | 32768, 0)
}
function qc(a, b, c, d, e, f) {
    a = b ? K("string" === typeof a ? a : Rb(a), b) : a;
    d = oc(d, e);
    e = cc(a, (void 0 !== d ? d : 438) & 4095 | 32768, 0);
    if (c) {
        if ("string" === typeof c) {
            a = Array(c.length);
            b = 0;
            for (var g = c.length; b < g; ++b)
                a[b] = c.charCodeAt(b);
            c = a
        }
        fc(e, d | 146);
        a = hc(e, "w");
        lc(a, c, 0, c.length, 0, f);
        jc(a);
        fc(e, d)
    }
    return e
}
function W(a, b, c, d) {
    a = K("string" === typeof a ? a : Rb(a), b);
    b = oc(!!c, !!d);
    W.Qa || (W.Qa = 64);
    var e = W.Qa++ << 8 | 0;
    Cb(e, {
        open: function(a) {
            a.seekable = !1
        },
        close: function() {
            d && d.buffer && d.buffer.length && d(10)
        },
        read: function(a, b, d, e) {
            for (var f = 0, g = 0; g < e; g++) {
                try {
                    var h = c()
                } catch (ia) {
                    throw new N(J.D);
                }
                if (void 0 === h && 0 === f)
                    throw new N(J.wa);
                if (null === h || void 0 === h)
                    break;
                f++;
                b[d + g] = h
            }
            f && (a.node.timestamp = Date.now());
            return f
        },
        write: function(a, b, c, e) {
            for (var f = 0; f < e; f++)
                try {
                    d(b[c + f])
                } catch (t) {
                    throw new N(J.D);
                }
            e && (a.node.timestamp = Date.now());
            return f
        }
    });
    return dc(a, b, e)
}
function rc(a) {
    if (a.lb || a.mb || a.link || a.b)
        return !0;
    var b = !0;
    if ("undefined" !== typeof XMLHttpRequest)
        throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    if (Module.read)
        try {
            a.b = O(Module.read(a.url), !0),
            a.g = a.b.length
        } catch (c) {
            b = !1
        }
    else
        throw Error("Cannot load without read() or XMLHttpRequest.");
    b || sb(J.D);
    return b
}
var FS = {}, Vb, ac, ic, sc = {}, tc = 0;
function X() {
    tc += 4;
    return x[tc - 4 >> 2]
}
function uc() {
    var a = S[X()];
    if (!a)
        throw new N(J.V);
    return a
}
function Y() {
    B()
}
function vc() {
    return p || "undefined" !== typeof dateNow || (l || m) && self.performance && self.performance.now
}
function wc(a, b) {
    xc = a;
    yc = b;
    if (!zc)
        return 1;
    if (0 == a)
        Ac = function() {
            var a = Math.max(0, Bc + b - Y()) | 0;
            setTimeout(Cc, a)
        }
        ,
        Dc = "timeout";
    else if (1 == a)
        Ac = function() {
            Ec(Cc)
        }
        ,
        Dc = "rAF";
    else if (2 == a) {
        if ("undefined" === typeof setImmediate) {
            var c = [];
            addEventListener("message", function(a) {
                if ("setimmediate" === a.data || "setimmediate" === a.data.target)
                    a.stopPropagation(),
                    c.shift()()
            }, !0);
            setImmediate = function(a) {
                c.push(a);
                m ? (void 0 === Module.setImmediates && (Module.setImmediates = []),
                Module.setImmediates.push(a),
                postMessage({
                    target: "setimmediate"
                })) : postMessage("setimmediate", "*")
            }
        }
        Ac = function() {
            setImmediate(Cc)
        }
        ;
        Dc = "immediate"
    }
    return 0
}
function Fc(a, b, c, d, e) {
    Module.noExitRuntime = !0;
    assert(!zc, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
    zc = a;
    Gc = d;
    var f = "undefined" !== typeof d ? function() {
        Module.dynCall_vi(a, d)
    }
    : function() {
        Module.dynCall_v(a)
    }
    ;
    var g = Hc;
    Cc = function() {
        if (!A)
            if (0 < Ic.length) {
                var a = Date.now()
                  , b = Ic.shift();
                b.R(b.X);
                if (Jc) {
                    var c = Jc
                      , d = 0 == c % 1 ? c - 1 : Math.floor(c);
                    Jc = b.Gd ? d : (8 * c + (d + .5)) / 9
                }
                console.log('main loop blocker "' + b.name + '" took ' + (Date.now() - a) + " ms");
                Module.setStatus && (a = Module.statusMessage || "Please wait...",
                b = Jc,
                c = Kc.Jd,
                b ? b < c ? Module.setStatus(a + " (" + (c - b) + "/" + c + ")") : Module.setStatus(a) : Module.setStatus(""));
                g < Hc || setTimeout(Cc, 0)
            } else if (!(g < Hc))
                if (Lc = Lc + 1 | 0,
                1 == xc && 1 < yc && 0 != Lc % yc)
                    Ac();
                else {
                    0 == xc && (Bc = Y());
                    "timeout" === Dc && Module.ja && (Module.printErr("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"),
                    Dc = "");
                    a: if (!(A || Module.preMainLoop && !1 === Module.preMainLoop())) {
                        try {
                            f()
                        } catch (v) {
                            if (v instanceof fa)
                                break a;
                            v && "object" === typeof v && v.stack && Module.printErr("exception thrown: " + [v, v.stack]);
                            throw v;
                        }
                        Module.postMainLoop && Module.postMainLoop()
                    }
                    g < Hc || ("object" === typeof SDL && SDL.audio && SDL.audio.pb && SDL.audio.pb(),
                    Ac())
                }
    }
    ;
    e || (b && 0 < b ? wc(0, 1E3 / b) : wc(1, 1),
    Ac());
    if (c)
        throw "SimulateInfiniteLoop";
}
var Ac = null, Dc = "", Hc = 0, zc = null, Gc = 0, xc = 0, yc = 0, Lc = 0, Ic = [], Kc = {}, Bc, Cc, Jc, Mc = !1, Nc = !1, Oc = [];
function Pc() {
    function a() {
        Nc = document.pointerLockElement === Module.canvas || document.mozPointerLockElement === Module.canvas || document.webkitPointerLockElement === Module.canvas || document.msPointerLockElement === Module.canvas
    }
    Module.preloadPlugins || (Module.preloadPlugins = []);
    if (!Qc) {
        Qc = !0;
        try {
            Rc = !0
        } catch (c) {
            Rc = !1,
            console.log("warning: no blob constructor, cannot create blobs with mimetypes")
        }
        Sc = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Rc ? null : console.log("warning: no BlobBuilder");
        Tc = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0;
        Module.Ta || "undefined" !== typeof Tc || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."),
        Module.Ta = !0);
        Module.preloadPlugins.push({
            canHandle: function(a) {
                return !Module.Ta && /\.(jpg|jpeg|png|bmp)$/i.test(a)
            },
            handle: function(a, b, e, f) {
                var c = null;
                if (Rc)
                    try {
                        c = new Blob([a],{
                            type: Uc(b)
                        }),
                        c.size !== a.length && (c = new Blob([(new Uint8Array(a)).buffer],{
                            type: Uc(b)
                        }))
                    } catch (r) {
                        u.K("Blob constructor present but fails: " + r + "; falling back to blob builder")
                    }
                c || (c = new Sc,
                c.append((new Uint8Array(a)).buffer),
                c = c.getBlob());
                var d = Tc.createObjectURL(c)
                  , n = new Image;
                n.onload = function() {
                    assert(n.complete, "Image " + b + " could not be decoded");
                    var c = document.createElement("canvas");
                    c.width = n.width;
                    c.height = n.height;
                    c.getContext("2d").drawImage(n, 0, 0);
                    Module.preloadedImages[b] = c;
                    Tc.revokeObjectURL(d);
                    e && e(a)
                }
                ;
                n.onerror = function() {
                    console.log("Image " + d + " could not be decoded");
                    f && f()
                }
                ;
                n.src = d
            }
        });
        Module.preloadPlugins.push({
            canHandle: function(a) {
                return !Module.Ud && a.substr(-4)in {
                    ".ogg": 1,
                    ".wav": 1,
                    ".mp3": 1
                }
            },
            handle: function(a, b, e, f) {
                function c(c) {
                    n || (n = !0,
                    Module.preloadedAudios[b] = c,
                    e && e(a))
                }
                function d() {
                    n || (n = !0,
                    Module.preloadedAudios[b] = new Audio,
                    f && f())
                }
                var n = !1;
                if (Rc) {
                    try {
                        var r = new Blob([a],{
                            type: Uc(b)
                        })
                    } catch (v) {
                        return d()
                    }
                    r = Tc.createObjectURL(r);
                    var t = new Audio;
                    t.addEventListener("canplaythrough", function() {
                        c(t)
                    }, !1);
                    t.onerror = function() {
                        if (!n) {
                            console.log("warning: browser could not fully decode audio " + b + ", trying slower base64 approach");
                            for (var d = "", e = 0, f = 0, g = 0; g < a.length; g++)
                                for (e = e << 8 | a[g],
                                f += 8; 6 <= f; ) {
                                    var h = e >> f - 6 & 63;
                                    f -= 6;
                                    d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[h]
                                }
                            2 == f ? (d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(e & 3) << 4],
                            d += "==") : 4 == f && (d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(e & 15) << 2],
                            d += "=");
                            t.src = "data:audio/x-" + b.substr(-3) + ";base64," + d;
                            c(t)
                        }
                    }
                    ;
                    t.src = r;
                    Vc(function() {
                        c(t)
                    })
                } else
                    return d()
            }
        });
        var b = Module.canvas;
        b && (b.requestPointerLock = b.requestPointerLock || b.mozRequestPointerLock || b.webkitRequestPointerLock || b.msRequestPointerLock || function() {}
        ,
        b.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function() {}
        ,
        b.exitPointerLock = b.exitPointerLock.bind(document),
        document.addEventListener("pointerlockchange", a, !1),
        document.addEventListener("mozpointerlockchange", a, !1),
        document.addEventListener("webkitpointerlockchange", a, !1),
        document.addEventListener("mspointerlockchange", a, !1),
        Module.elementPointerLock && b.addEventListener("click", function(a) {
            !Nc && Module.canvas.requestPointerLock && (Module.canvas.requestPointerLock(),
            a.preventDefault())
        }, !1))
    }
}
function Wc(a, b, c, d) {
    if (b && Module.ja && a == Module.canvas)
        return Module.ja;
    if (b) {
        var e = {
            antialias: !1,
            alpha: !1
        };
        if (d)
            for (var f in d)
                e[f] = d[f];
        if (e = GL.createContext(a, e))
            var g = GL.getContext(e).GLctx
    } else
        g = a.getContext("2d");
    if (!g)
        return null;
    c && (b || assert("undefined" === typeof GLctx, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"),
    Module.ja = g,
    b && GL.Sd(e),
    Module.Xd = b,
    Oc.forEach(function(a) {
        a()
    }),
    Pc());
    return g
}
var Xc = !1
  , Yc = void 0
  , Zc = void 0;
function ad(a, b, c) {
    function d() {
        Mc = !1;
        var a = e.parentNode;
        (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a ? (e.exitFullscreen = document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function() {}
        ,
        e.exitFullscreen = e.exitFullscreen.bind(document),
        Yc && e.requestPointerLock(),
        Mc = !0,
        Zc && ("undefined" != typeof SDL && (x[SDL.screen + 0 * u.G >> 2] = Ma[SDL.screen + 0 * u.G >> 2] | 8388608),
        bd())) : (a.parentNode.insertBefore(e, a),
        a.parentNode.removeChild(a),
        Zc && ("undefined" != typeof SDL && (x[SDL.screen + 0 * u.G >> 2] = Ma[SDL.screen + 0 * u.G >> 2] & -8388609),
        bd()));
        if (Module.onFullScreen)
            Module.onFullScreen(Mc);
        if (Module.onFullscreen)
            Module.onFullscreen(Mc);
        cd(e)
    }
    Yc = a;
    Zc = b;
    dd = c;
    "undefined" === typeof Yc && (Yc = !0);
    "undefined" === typeof Zc && (Zc = !1);
    "undefined" === typeof dd && (dd = null);
    var e = Module.canvas;
    Xc || (Xc = !0,
    document.addEventListener("fullscreenchange", d, !1),
    document.addEventListener("mozfullscreenchange", d, !1),
    document.addEventListener("webkitfullscreenchange", d, !1),
    document.addEventListener("MSFullscreenChange", d, !1));
    var f = document.createElement("div");
    e.parentNode.insertBefore(f, e);
    f.appendChild(e);
    f.requestFullscreen = f.requestFullscreen || f.mozRequestFullScreen || f.msRequestFullscreen || (f.webkitRequestFullscreen ? function() {
        f.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }
    : null) || (f.webkitRequestFullScreen ? function() {
        f.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    }
    : null);
    c ? f.requestFullscreen({
        Yd: c
    }) : f.requestFullscreen()
}
function ed(a, b, c) {
    Module.printErr("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
    ed = function(a, b, c) {
        return ad(a, b, c)
    }
    ;
    return ad(a, b, c)
}
var fd = 0;
function gd(a) {
    var b = Date.now();
    if (0 === fd)
        fd = b + 1E3 / 60;
    else
        for (; b + 2 >= fd; )
            fd += 1E3 / 60;
    setTimeout(a, Math.max(fd - b, 0))
}
function Ec(a) {
    "undefined" === typeof window ? gd(a) : (window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || gd),
    window.requestAnimationFrame(a))
}
function Vc(a) {
    Module.noExitRuntime = !0;
    setTimeout(function() {
        A || a()
    }, 1E4)
}
function Uc(a) {
    return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg"
    }[a.substr(a.lastIndexOf(".") + 1)]
}
function hd(a, b, c) {
    var d = "al " + a;
    Module.readAsync(a, function(c) {
        assert(c, 'Loading data file "' + a + '" failed (no arrayBuffer).');
        b(new Uint8Array(c));
        d && hb()
    }, function() {
        if (c)
            c();
        else
            throw 'Loading data file "' + a + '" failed.';
    });
    d && gb()
}
var id = [];
function bd() {
    var a = Module.canvas;
    id.forEach(function(b) {
        b(a.width, a.height)
    })
}
function cd(a, b, c) {
    b && c ? (a.Db = b,
    a.ib = c) : (b = a.Db,
    c = a.ib);
    var d = b
      , e = c;
    Module.forcedAspectRatio && 0 < Module.forcedAspectRatio && (d / e < Module.forcedAspectRatio ? d = Math.round(e * Module.forcedAspectRatio) : e = Math.round(d / Module.forcedAspectRatio));
    if ((document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen) {
        var f = Math.min(screen.width / d, screen.height / e);
        d = Math.round(d * f);
        e = Math.round(e * f)
    }
    Zc ? (a.width != d && (a.width = d),
    a.height != e && (a.height = e),
    "undefined" != typeof a.style && (a.style.removeProperty("width"),
    a.style.removeProperty("height"))) : (a.width != b && (a.width = b),
    a.height != c && (a.height = c),
    "undefined" != typeof a.style && (d != b || e != c ? (a.style.setProperty("width", d + "px", "important"),
    a.style.setProperty("height", e + "px", "important")) : (a.style.removeProperty("width"),
    a.style.removeProperty("height"))))
}
var Qc, Rc, Sc, Tc, dd;
function jd(a) {
    Module.exit(a)
}
var kd = w;
w += 16;
function ld(a) {
    if (ld.cb) {
        var b = x[kd >> 2];
        var c = x[b >> 2]
    } else
        ld.cb = !0,
        Z.USER = Z.LOGNAME = "web_user",
        Z.PATH = "/",
        Z.PWD = "/",
        Z.HOME = "/home/web_user",
        Z.LANG = "C.UTF-8",
        Z._ = Module.thisProgram,
        c = E(1024, "i8", 2),
        b = E(256, "i8*", 2),
        x[b >> 2] = c,
        x[kd >> 2] = b;
    var d = [], e = 0, f;
    for (f in a)
        if ("string" === typeof a[f]) {
            var g = f + "=" + a[f];
            d.push(g);
            e += g.length
        }
    if (1024 < e)
        throw Error("Environment size exceeded TOTAL_ENV_SIZE!");
    for (a = 0; a < d.length; a++)
        g = d[a],
        za(g, c),
        x[b + 4 * a >> 2] = c,
        c += g.length + 1;
    x[b + 4 * d.length >> 2] = 0
}
var Z = {};
function md(a) {
    if (0 === a)
        return 0;
    a = C(a);
    if (!Z.hasOwnProperty(a))
        return 0;
    md.s && Fa(md.s);
    md.s = E(O(Z[a]), "i8", 0);
    return md.s
}
var nd = E([8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0], "i8", 2);
function od(a) {
    a |= 0;
    var b = D[nd + (a & 255) >> 0] | 0;
    if (8 > (b | 0))
        return b | 0;
    b = D[nd + (a >> 8 & 255) >> 0] | 0;
    if (8 > (b | 0))
        return b + 8 | 0;
    b = D[nd + (a >> 16 & 255) >> 0] | 0;
    return 8 > (b | 0) ? b + 16 | 0 : (D[nd + (a >>> 24) >> 0] | 0) + 24 | 0
}
var pd = {}
  , qd = 1;
function rd(a, b) {
    rd.s || (rd.s = {});
    a in rd.s || (Module.dynCall_v(b),
    rd.s[a] = 1)
}
function sd(a) {
    return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
}
function td(a, b) {
    for (var c = 0, d = 0; d <= b; c += a[d++])
        ;
    return c
}
var ud = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  , vd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function wd(a, b) {
    for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth()
          , d = (sd(a.getFullYear()) ? ud : vd)[c];
        if (b > d - a.getDate())
            b -= d - a.getDate() + 1,
            a.setDate(1),
            11 > c ? a.setMonth(c + 1) : (a.setMonth(0),
            a.setFullYear(a.getFullYear() + 1));
        else {
            a.setDate(a.getDate() + b);
            break
        }
    }
    return a
}
function xd(a, b, c, d) {
    function e(a, b, c) {
        for (a = "number" === typeof a ? a.toString() : a || ""; a.length < b; )
            a = c[0] + a;
        return a
    }
    function f(a, b) {
        return e(a, b, "0")
    }
    function g(a, b) {
        function c(a) {
            return 0 > a ? -1 : 0 < a ? 1 : 0
        }
        var d;
        0 === (d = c(a.getFullYear() - b.getFullYear())) && 0 === (d = c(a.getMonth() - b.getMonth())) && (d = c(a.getDate() - b.getDate()));
        return d
    }
    function h(a) {
        switch (a.getDay()) {
        case 0:
            return new Date(a.getFullYear() - 1,11,29);
        case 1:
            return a;
        case 2:
            return new Date(a.getFullYear(),0,3);
        case 3:
            return new Date(a.getFullYear(),0,2);
        case 4:
            return new Date(a.getFullYear(),0,1);
        case 5:
            return new Date(a.getFullYear() - 1,11,31);
        case 6:
            return new Date(a.getFullYear() - 1,11,30)
        }
    }
    function n(a) {
        a = wd(new Date(a.j + 1900,0,1), a.da);
        var b = h(new Date(a.getFullYear() + 1,0,4));
        return 0 >= g(h(new Date(a.getFullYear(),0,4)), a) ? 0 >= g(b, a) ? a.getFullYear() + 1 : a.getFullYear() : a.getFullYear() - 1
    }
    var r = x[d + 40 >> 2];
    d = {
        zb: x[d >> 2],
        yb: x[d + 4 >> 2],
        ba: x[d + 8 >> 2],
        J: x[d + 12 >> 2],
        C: x[d + 16 >> 2],
        j: x[d + 20 >> 2],
        Ua: x[d + 24 >> 2],
        da: x[d + 28 >> 2],
        Wd: x[d + 32 >> 2],
        xb: x[d + 36 >> 2],
        Ab: r ? C(r) : ""
    };
    c = C(c);
    r = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S"
    };
    for (var t in r)
        c = c.replace(new RegExp(t,"g"), r[t]);
    var v = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
      , ia = "January February March April May June July August September October November December".split(" ");
    r = {
        "%a": function(a) {
            return v[a.Ua].substring(0, 3)
        },
        "%A": function(a) {
            return v[a.Ua]
        },
        "%b": function(a) {
            return ia[a.C].substring(0, 3)
        },
        "%B": function(a) {
            return ia[a.C]
        },
        "%C": function(a) {
            return f((a.j + 1900) / 100 | 0, 2)
        },
        "%d": function(a) {
            return f(a.J, 2)
        },
        "%e": function(a) {
            return e(a.J, 2, " ")
        },
        "%g": function(a) {
            return n(a).toString().substring(2)
        },
        "%G": function(a) {
            return n(a)
        },
        "%H": function(a) {
            return f(a.ba, 2)
        },
        "%I": function(a) {
            a = a.ba;
            0 == a ? a = 12 : 12 < a && (a -= 12);
            return f(a, 2)
        },
        "%j": function(a) {
            return f(a.J + td(sd(a.j + 1900) ? ud : vd, a.C - 1), 3)
        },
        "%m": function(a) {
            return f(a.C + 1, 2)
        },
        "%M": function(a) {
            return f(a.yb, 2)
        },
        "%n": function() {
            return "\n"
        },
        "%p": function(a) {
            return 0 <= a.ba && 12 > a.ba ? "AM" : "PM"
        },
        "%S": function(a) {
            return f(a.zb, 2)
        },
        "%t": function() {
            return "\t"
        },
        "%u": function(a) {
            return (new Date(a.j + 1900,a.C + 1,a.J,0,0,0,0)).getDay() || 7
        },
        "%U": function(a) {
            var b = new Date(a.j + 1900,0,1)
              , c = 0 === b.getDay() ? b : wd(b, 7 - b.getDay());
            a = new Date(a.j + 1900,a.C,a.J);
            return 0 > g(c, a) ? f(Math.ceil((31 - c.getDate() + (td(sd(a.getFullYear()) ? ud : vd, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === g(c, b) ? "01" : "00"
        },
        "%V": function(a) {
            var b = h(new Date(a.j + 1900,0,4))
              , c = h(new Date(a.j + 1901,0,4))
              , d = wd(new Date(a.j + 1900,0,1), a.da);
            return 0 > g(d, b) ? "53" : 0 >= g(c, d) ? "01" : f(Math.ceil((b.getFullYear() < a.j + 1900 ? a.da + 32 - b.getDate() : a.da + 1 - b.getDate()) / 7), 2)
        },
        "%w": function(a) {
            return (new Date(a.j + 1900,a.C + 1,a.J,0,0,0,0)).getDay()
        },
        "%W": function(a) {
            var b = new Date(a.j,0,1)
              , c = 1 === b.getDay() ? b : wd(b, 0 === b.getDay() ? 1 : 7 - b.getDay() + 1);
            a = new Date(a.j + 1900,a.C,a.J);
            return 0 > g(c, a) ? f(Math.ceil((31 - c.getDate() + (td(sd(a.getFullYear()) ? ud : vd, a.getMonth() - 1) - 31) + a.getDate()) / 7), 2) : 0 === g(c, b) ? "01" : "00"
        },
        "%y": function(a) {
            return (a.j + 1900).toString().substring(2)
        },
        "%Y": function(a) {
            return a.j + 1900
        },
        "%z": function(a) {
            a = a.xb;
            var b = 0 <= a;
            a = Math.abs(a) / 60;
            return (b ? "+" : "-") + String("0000" + (a / 60 * 100 + a % 60)).slice(-4)
        },
        "%Z": function(a) {
            return a.Ab
        },
        "%%": function() {
            return "%"
        }
    };
    for (t in r)
        0 <= c.indexOf(t) && (c = c.replace(new RegExp(t,"g"), r[t](d)));
    t = O(c, !1);
    if (t.length > b)
        return 0;
    ma(t, a);
    return t.length - 1
}
mc();
T = Array(4096);
bc(P, "/");
V("/tmp");
V("/home");
V("/home/web_user");
(function() {
    V("/dev");
    Cb(259, {
        read: function() {
            return 0
        },
        write: function(a, b, e, f) {
            return f
        }
    });
    dc("/dev/null", 259);
    Bb(1280, Eb);
    Bb(1536, Fb);
    dc("/dev/tty", 1280);
    dc("/dev/tty1", 1536);
    if ("undefined" !== typeof crypto) {
        var a = new Uint8Array(1);
        var b = function() {
            crypto.getRandomValues(a);
            return a[0]
        }
    } else
        b = p ? function() {
            return require("crypto").randomBytes(1)[0]
        }
        : function() {
            return 256 * Math.random() | 0
        }
        ;
    W("/dev", "random", b);
    W("/dev", "urandom", b);
    V("/dev/shm");
    V("/dev/shm/tmp")
}
)();
V("/proc");
V("/proc/self");
V("/proc/self/fd");
bc({
    m: function() {
        var a = Hb("/proc/self", "fd", 16895, 73);
        a.c = {
            lookup: function(a, c) {
                var b = S[+c];
                if (!b)
                    throw new N(J.V);
                a = {
                    parent: null,
                    m: {
                        Sa: "fake"
                    },
                    c: {
                        readlink: function() {
                            return b.path
                        }
                    }
                };
                return a.parent = a
            }
        };
        return a
    }
}, "/proc/self/fd");
Xa.unshift(function() {
    if (!Module.noFSInit && !nc) {
        assert(!nc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        nc = !0;
        mc();
        Module.stdin = Module.stdin;
        Module.stdout = Module.stdout;
        Module.stderr = Module.stderr;
        Module.stdin ? W("/dev", "stdin", Module.stdin) : ec("/dev/tty", "/dev/stdin");
        Module.stdout ? W("/dev", "stdout", null, Module.stdout) : ec("/dev/tty", "/dev/stdout");
        Module.stderr ? W("/dev", "stderr", null, Module.stderr) : ec("/dev/tty1", "/dev/stderr");
        var a = hc("/dev/stdin", "r");
        assert(0 === a.fd, "invalid handle for stdin (" + a.fd + ")");
        a = hc("/dev/stdout", "w");
        assert(1 === a.fd, "invalid handle for stdout (" + a.fd + ")");
        a = hc("/dev/stderr", "w");
        assert(2 === a.fd, "invalid handle for stderr (" + a.fd + ")")
    }
});
Ya.push(function() {
    Ob = !1
});
Za.push(function() {
    nc = !1;
    var a = Module._fflush;
    a && a(0);
    for (a = 0; a < S.length; a++) {
        var b = S[a];
        b && jc(b)
    }
});
Module.FS_createFolder = function(a, b, c, d) {
    a = K("string" === typeof a ? a : Rb(a), b);
    return V(a, oc(c, d))
}
;
Module.FS_createPath = function(a, b) {
    a = "string" === typeof a ? a : Rb(a);
    for (b = b.split("/").reverse(); b.length; ) {
        var c = b.pop();
        if (c) {
            var d = K(a, c);
            try {
                V(d)
            } catch (e) {}
            a = d
        }
    }
    return d
}
;
Module.FS_createDataFile = qc;
Module.FS_createPreloadedFile = function(a, b, c, d, e, f, g, h, n, r) {
    function t(c) {
        function t(c) {
            r && r();
            h || qc(a, b, c, d, e, n);
            f && f();
            hb()
        }
        var L = !1;
        Module.preloadPlugins.forEach(function(a) {
            !L && a.canHandle(v) && (a.handle(c, v, t, function() {
                g && g();
                hb()
            }),
            L = !0)
        });
        L || t(c)
    }
    Pc();
    var v = b ? zb(K(a, b)) : a;
    gb();
    "string" == typeof c ? hd(c, function(a) {
        t(a)
    }, g) : t(c)
}
;
Module.FS_createLazyFile = function(a, b, c, d, e) {
    function f() {
        this.oa = !1;
        this.Y = []
    }
    f.prototype.get = function(a) {
        if (!(a > this.length - 1 || 0 > a)) {
            var b = a % this.chunkSize;
            return this.Pa(a / this.chunkSize | 0)[b]
        }
    }
    ;
    f.prototype.ub = function(a) {
        this.Pa = a
    }
    ;
    f.prototype.Fa = function() {
        var a = new XMLHttpRequest;
        a.open("HEAD", c, !1);
        a.send(null);
        if (!(200 <= a.status && 300 > a.status || 304 === a.status))
            throw Error("Couldn't load " + c + ". Status: " + a.status);
        var b = Number(a.getResponseHeader("Content-length")), d, e = (d = a.getResponseHeader("Accept-Ranges")) && "bytes" === d;
        a = (d = a.getResponseHeader("Content-Encoding")) && "gzip" === d;
        var f = 1048576;
        e || (f = b);
        var g = this;
        g.ub(function(a) {
            var d = a * f
              , e = (a + 1) * f - 1;
            e = Math.min(e, b - 1);
            if ("undefined" === typeof g.Y[a]) {
                var h = g.Y;
                if (d > e)
                    throw Error("invalid range (" + d + ", " + e + ") or no bytes requested!");
                if (e > b - 1)
                    throw Error("only " + b + " bytes available! programmer error!");
                var n = new XMLHttpRequest;
                n.open("GET", c, !1);
                b !== f && n.setRequestHeader("Range", "bytes=" + d + "-" + e);
                "undefined" != typeof Uint8Array && (n.responseType = "arraybuffer");
                n.overrideMimeType && n.overrideMimeType("text/plain; charset=x-user-defined");
                n.send(null);
                if (!(200 <= n.status && 300 > n.status || 304 === n.status))
                    throw Error("Couldn't load " + c + ". Status: " + n.status);
                d = void 0 !== n.response ? new Uint8Array(n.response || []) : O(n.responseText || "", !0);
                h[a] = d
            }
            if ("undefined" === typeof g.Y[a])
                throw Error("doXHR failed!");
            return g.Y[a]
        });
        if (a || !b)
            f = b = 1,
            f = b = this.Pa(0).length,
            console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
        this.Ya = b;
        this.Xa = f;
        this.oa = !0
    }
    ;
    if ("undefined" !== typeof XMLHttpRequest) {
        if (!m)
            throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        var g = new f;
        Object.defineProperties(g, {
            length: {
                get: function() {
                    this.oa || this.Fa();
                    return this.Ya
                }
            },
            chunkSize: {
                get: function() {
                    this.oa || this.Fa();
                    return this.Xa
                }
            }
        });
        var h = void 0
    } else
        h = c,
        g = void 0;
    var n = pc(a, b, d, e);
    g ? n.b = g : h && (n.b = null,
    n.url = h);
    Object.defineProperties(n, {
        g: {
            get: function() {
                return this.b.length
            }
        }
    });
    var r = {};
    Object.keys(n.f).forEach(function(a) {
        var b = n.f[a];
        r[a] = function() {
            if (!rc(n))
                throw new N(J.D);
            return b.apply(null, arguments)
        }
    });
    r.read = function(a, b, c, d, e) {
        if (!rc(n))
            throw new N(J.D);
        a = a.node.b;
        if (e >= a.length)
            return 0;
        d = Math.min(a.length - e, d);
        assert(0 <= d);
        if (a.slice)
            for (var f = 0; f < d; f++)
                b[c + f] = a[e + f];
        else
            for (f = 0; f < d; f++)
                b[c + f] = a.get(e + f);
        return d
    }
    ;
    n.f = r;
    return n
}
;
Module.FS_createLink = function(a, b, c) {
    a = K("string" === typeof a ? a : Rb(a), b);
    return ec(c, a)
}
;
Module.FS_createDevice = W;
Module.FS_unlink = function(a) {
    var b = U(a, {
        parent: !0
    }).node
      , c = xb(a)
      , d = Jb(b, c);
    a: {
        try {
            var e = Jb(b, c)
        } catch (g) {
            e = g.I;
            break a
        }
        var f = Ub(b, "wx");
        e = f ? f : Q(e.mode) ? J.P : 0
    }
    if (e)
        throw new N(e);
    if (!b.c.unlink)
        throw new N(J.F);
    if (d.T)
        throw new N(J.fa);
    try {
        Pb.willDeletePath && Pb.willDeletePath(a)
    } catch (g) {
        console.log("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message)
    }
    b.c.unlink(b, c);
    b = Sb(d.parent.id, d.name);
    if (T[b] === d)
        T[b] = d.M;
    else
        for (b = T[b]; b; ) {
            if (b.M === d) {
                b.M = d.M;
                break
            }
            b = b.M
        }
    try {
        if (Pb.onDeletePath)
            Pb.onDeletePath(a)
    } catch (g) {
        console.log("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message)
    }
}
;
Xa.unshift(function() {});
Za.push(function() {});
if (p) {
    var fs = require("fs")
      , Kb = require("path");
    R.wb()
}
p ? Y = function() {
    var a = process.hrtime();
    return 1E3 * a[0] + a[1] / 1E6
}
: "undefined" !== typeof dateNow ? Y = dateNow : "object" === typeof self && self.performance && "function" === typeof self.performance.now ? Y = function() {
    return self.performance.now()
}
: "object" === typeof performance && "function" === typeof performance.now ? Y = function() {
    return performance.now()
}
: Y = Date.now;
Module.requestFullScreen = function(a, b, c) {
    Module.printErr("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");
    Module.requestFullScreen = Module.requestFullscreen;
    ed(a, b, c)
}
;
Module.requestFullscreen = function(a, b, c) {
    ad(a, b, c)
}
;
Module.requestAnimationFrame = function(a) {
    Ec(a)
}
;
Module.setCanvasSize = function(a, b, c) {
    cd(Module.canvas, a, b);
    c || bd()
}
;
Module.pauseMainLoop = function() {
    Ac = null;
    Hc++
}
;
Module.resumeMainLoop = function() {
    Hc++;
    var a = xc
      , b = yc
      , c = zc;
    zc = null;
    Fc(c, 0, !1, Gc, !0);
    wc(a, b);
    Ac()
}
;
Module.getUserMedia = function() {
    window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia);
    window.getUserMedia(void 0)
}
;
Module.createContext = function(a, b, c, d) {
    return Wc(a, b, c, d)
}
;
ld(Z);
y = E(1, "i32", 2);
Pa = q = u.Da(w);
Qa = Pa + Ua;
Ra = u.Da(Qa);
x[y >> 2] = Ra;
xa = !0;
function O(a, b, c) {
    c = Array(0 < c ? c : Da(a) + 1);
    a = Ca(a, c, 0, c.length);
    b && (c.length = a);
    return c
}
Module.intArrayFromString = O;
Module.intArrayToString = function(a) {
    for (var b = [], c = 0; c < a.length; c++) {
        var d = a[c];
        255 < d && (d &= 255);
        b.push(String.fromCharCode(d))
    }
    return b.join("")
}
;
Module.wasmTableSize = 772;
Module.wasmMaxTableSize = 772;
Module.ab = {
    Math: Math,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    NaN: NaN,
    Infinity: Infinity,
    byteLength: Ta
};
Module.bb = {
    abort: B,
    assert: assert,
    enlargeMemory: ha,
    getTotalMemory: function() {
        return z
    },
    abortOnCannotGrowMemory: function() {
        B("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + z + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
    },
    invoke_ii: function(a, b) {
        try {
            return Module.dynCall_ii(a, b)
        } catch (c) {
            if ("number" !== typeof c && "longjmp" !== c)
                throw c;
            Module.setThrew(1, 0)
        }
    },
    jsCall_ii: function(a, b) {
        return u.h[a](b)
    },
    invoke_iii: function(a, b, c) {
        try {
            return Module.dynCall_iii(a, b, c)
        } catch (d) {
            if ("number" !== typeof d && "longjmp" !== d)
                throw d;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iii: function(a, b, c) {
        return u.h[a](b, c)
    },
    invoke_iiii: function(a, b, c, d) {
        try {
            return Module.dynCall_iiii(a, b, c, d)
        } catch (e) {
            if ("number" !== typeof e && "longjmp" !== e)
                throw e;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiii: function(a, b, c, d) {
        return u.h[a](b, c, d)
    },
    invoke_iiiii: function(a, b, c, d, e) {
        try {
            return Module.dynCall_iiiii(a, b, c, d, e)
        } catch (f) {
            if ("number" !== typeof f && "longjmp" !== f)
                throw f;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiiii: function(a, b, c, d, e) {
        return u.h[a](b, c, d, e)
    },
    invoke_iiiiid: function(a, b, c, d, e, f) {
        try {
            return Module.dynCall_iiiiid(a, b, c, d, e, f)
        } catch (g) {
            if ("number" !== typeof g && "longjmp" !== g)
                throw g;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiiiid: function(a, b, c, d, e, f) {
        return u.h[a](b, c, d, e, f)
    },
    invoke_iiiiii: function(a, b, c, d, e, f) {
        try {
            return Module.dynCall_iiiiii(a, b, c, d, e, f)
        } catch (g) {
            if ("number" !== typeof g && "longjmp" !== g)
                throw g;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiiiii: function(a, b, c, d, e, f) {
        return u.h[a](b, c, d, e, f)
    },
    invoke_iiiiiid: function(a, b, c, d, e, f, g) {
        try {
            return Module.dynCall_iiiiiid(a, b, c, d, e, f, g)
        } catch (h) {
            if ("number" !== typeof h && "longjmp" !== h)
                throw h;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiiiiid: function(a, b, c, d, e, f, g) {
        return u.h[a](b, c, d, e, f, g)
    },
    invoke_iiiiiii: function(a, b, c, d, e, f, g) {
        try {
            return Module.dynCall_iiiiiii(a, b, c, d, e, f, g)
        } catch (h) {
            if ("number" !== typeof h && "longjmp" !== h)
                throw h;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiiiiii: function(a, b, c, d, e, f, g) {
        return u.h[a](b, c, d, e, f, g)
    },
    invoke_iiiiiiii: function(a, b, c, d, e, f, g, h) {
        try {
            return Module.dynCall_iiiiiiii(a, b, c, d, e, f, g, h)
        } catch (n) {
            if ("number" !== typeof n && "longjmp" !== n)
                throw n;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiiiiiii: function(a, b, c, d, e, f, g, h) {
        return u.h[a](b, c, d, e, f, g, h)
    },
    invoke_iiiiiiiii: function(a, b, c, d, e, f, g, h, n) {
        try {
            return Module.dynCall_iiiiiiiii(a, b, c, d, e, f, g, h, n)
        } catch (r) {
            if ("number" !== typeof r && "longjmp" !== r)
                throw r;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiiiiiiii: function(a, b, c, d, e, f, g, h, n) {
        return u.h[a](b, c, d, e, f, g, h, n)
    },
    invoke_iiiiij: function(a, b, c, d, e, f, g) {
        try {
            return Module.dynCall_iiiiij(a, b, c, d, e, f, g)
        } catch (h) {
            if ("number" !== typeof h && "longjmp" !== h)
                throw h;
            Module.setThrew(1, 0)
        }
    },
    jsCall_iiiiij: function(a, b, c, d, e, f) {
        return u.h[a](b, c, d, e, f)
    },
    invoke_v: function(a) {
        try {
            Module.dynCall_v(a)
        } catch (b) {
            if ("number" !== typeof b && "longjmp" !== b)
                throw b;
            Module.setThrew(1, 0)
        }
    },
    jsCall_v: function(a) {
        u.h[a]()
    },
    invoke_vi: function(a, b) {
        try {
            Module.dynCall_vi(a, b)
        } catch (c) {
            if ("number" !== typeof c && "longjmp" !== c)
                throw c;
            Module.setThrew(1, 0)
        }
    },
    jsCall_vi: function(a, b) {
        u.h[a](b)
    },
    invoke_vii: function(a, b, c) {
        try {
            Module.dynCall_vii(a, b, c)
        } catch (d) {
            if ("number" !== typeof d && "longjmp" !== d)
                throw d;
            Module.setThrew(1, 0)
        }
    },
    jsCall_vii: function(a, b, c) {
        u.h[a](b, c)
    },
    invoke_viii: function(a, b, c, d) {
        try {
            Module.dynCall_viii(a, b, c, d)
        } catch (e) {
            if ("number" !== typeof e && "longjmp" !== e)
                throw e;
            Module.setThrew(1, 0)
        }
    },
    jsCall_viii: function(a, b, c, d) {
        u.h[a](b, c, d)
    },
    invoke_viiii: function(a, b, c, d, e) {
        try {
            Module.dynCall_viiii(a, b, c, d, e)
        } catch (f) {
            if ("number" !== typeof f && "longjmp" !== f)
                throw f;
            Module.setThrew(1, 0)
        }
    },
    jsCall_viiii: function(a, b, c, d, e) {
        u.h[a](b, c, d, e)
    },
    invoke_viiiii: function(a, b, c, d, e, f) {
        try {
            Module.dynCall_viiiii(a, b, c, d, e, f)
        } catch (g) {
            if ("number" !== typeof g && "longjmp" !== g)
                throw g;
            Module.setThrew(1, 0)
        }
    },
    jsCall_viiiii: function(a, b, c, d, e, f) {
        u.h[a](b, c, d, e, f)
    },
    invoke_viiiiii: function(a, b, c, d, e, f, g) {
        try {
            Module.dynCall_viiiiii(a, b, c, d, e, f, g)
        } catch (h) {
            if ("number" !== typeof h && "longjmp" !== h)
                throw h;
            Module.setThrew(1, 0)
        }
    },
    jsCall_viiiiii: function(a, b, c, d, e, f, g) {
        u.h[a](b, c, d, e, f, g)
    },
    invoke_viijii: function(a, b, c, d, e, f, g) {
        try {
            Module.dynCall_viijii(a, b, c, d, e, f, g)
        } catch (h) {
            if ("number" !== typeof h && "longjmp" !== h)
                throw h;
            Module.setThrew(1, 0)
        }
    },
    jsCall_viijii: function(a, b, c, d, e, f) {
        u.h[a](b, c, d, e, f)
    },
    __ZSt18uncaught_exceptionv: nb,
    ___assert_fail: function(a, b, c, d) {
        A = !0;
        throw "Assertion failed: " + C(a) + ", at: " + [b ? C(b) : "unknown filename", c, d ? C(d) : "unknown function"] + " at " + Ga();
    },
    ___buildEnvironment: ld,
    ___cxa_allocate_exception: function(a) {
        return F(a)
    },
    ___cxa_begin_catch: function(a) {
        var b = qb[a];
        b && !b.Ga && (b.Ga = !0,
        nb.s--);
        b && (b.tb = !1);
        pb.push(a);
        a: {
            if (a && !qb[a])
                for (var c in qb)
                    if (qb[c].Ca === a) {
                        b = c;
                        break a
                    }
            b = a
        }
        b && qb[b].qb++;
        return a
    },
    ___cxa_find_matching_catch: rb,
    ___cxa_throw: function(a, b, c) {
        qb[a] = {
            ob: a,
            Ca: a,
            type: b,
            Hd: c,
            qb: 0,
            Ga: !1,
            tb: !1
        };
        ob = a;
        "uncaught_exception"in nb ? nb.s++ : nb.s = 1;
        throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    },
    ___gxx_personality_v0: function() {},
    ___lock: function() {},
    ___map_file: function() {
        sb(J.F);
        return -1
    },
    ___resumeException: function(a) {
        ob || (ob = a);
        throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    },
    ___setErrNo: sb,
    ___syscall140: function(a, b) {
        tc = b;
        try {
            var c = uc();
            X();
            var d = X()
              , e = X()
              , f = X();
            kc(c, d, f);
            x[e >> 2] = c.position;
            c.na && 0 === d && 0 === f && (c.na = null);
            return 0
        } catch (g) {
            return "undefined" !== typeof FS && g instanceof N || B(g),
            -g.I
        }
    },
    ___syscall145: function(a, b) {
        tc = b;
        try {
            var c = uc()
              , d = X();
            a: {
                var e = X();
                for (b = a = 0; b < e; b++) {
                    var f = x[d + (8 * b + 4) >> 2]
                      , g = c
                      , h = x[d + 8 * b >> 2]
                      , n = f
                      , r = void 0
                      , t = D;
                    if (0 > n || 0 > r)
                        throw new N(J.i);
                    if (1 === (g.flags & 2097155))
                        throw new N(J.V);
                    if (Q(g.node.mode))
                        throw new N(J.P);
                    if (!g.f.read)
                        throw new N(J.i);
                    var v = !0;
                    if ("undefined" === typeof r)
                        r = g.position,
                        v = !1;
                    else if (!g.seekable)
                        throw new N(J.W);
                    var ia = g.f.read(g, t, h, n, r);
                    v || (g.position += ia);
                    var H = ia;
                    if (0 > H) {
                        var L = -1;
                        break a
                    }
                    a += H;
                    if (H < f)
                        break
                }
                L = a
            }
            return L
        } catch (M) {
            return "undefined" !== typeof FS && M instanceof N || B(M),
            -M.I
        }
    },
    ___syscall146: function(a, b) {
        tc = b;
        try {
            var c = uc()
              , d = X();
            a: {
                var e = X();
                for (b = a = 0; b < e; b++) {
                    var f = lc(c, D, x[d + 8 * b >> 2], x[d + (8 * b + 4) >> 2], void 0);
                    if (0 > f) {
                        var g = -1;
                        break a
                    }
                    a += f
                }
                g = a
            }
            return g
        } catch (h) {
            return "undefined" !== typeof FS && h instanceof N || B(h),
            -h.I
        }
    },
    ___syscall54: function(a, b) {
        tc = b;
        try {
            var c = uc()
              , d = X();
            switch (d) {
            case 21505:
                return c.tty ? 0 : -J.L;
            case 21506:
                return c.tty ? 0 : -J.L;
            case 21519:
                if (!c.tty)
                    return -J.L;
                var e = X();
                return x[e >> 2] = 0;
            case 21520:
                return c.tty ? -J.i : -J.L;
            case 21531:
                a = e = X();
                if (!c.f.kb)
                    throw new N(J.L);
                return c.f.kb(c, d, a);
            case 21523:
                return c.tty ? 0 : -J.L;
            default:
                B("bad ioctl syscall " + d)
            }
        } catch (f) {
            return "undefined" !== typeof FS && f instanceof N || B(f),
            -f.I
        }
    },
    ___syscall6: function(a, b) {
        tc = b;
        try {
            var c = uc();
            jc(c);
            return 0
        } catch (d) {
            return "undefined" !== typeof FS && d instanceof N || B(d),
            -d.I
        }
    },
    ___syscall91: function(a, b) {
        tc = b;
        try {
            var c = X()
              , d = X()
              , e = sc[c];
            if (!e)
                return 0;
            if (d === e.Qd) {
                var f = S[e.fd]
                  , g = e.flags
                  , h = new Uint8Array(G.subarray(c, c + d));
                f && f.f.$ && f.f.$(f, h, 0, d, g);
                sc[c] = null;
                e.$a && Fa(e.Td)
            }
            return 0
        } catch (n) {
            return "undefined" !== typeof FS && n instanceof N || B(n),
            -n.I
        }
    },
    ___unlock: function() {},
    __addDays: wd,
    __arraySum: td,
    __exit: jd,
    __isLeapYear: sd,
    _abort: function() {
        Module.abort()
    },
    _clock_gettime: function(a, b) {
        if (0 === a)
            a = Date.now();
        else if (1 === a && vc())
            a = Y();
        else
            return sb(J.i),
            -1;
        x[b >> 2] = a / 1E3 | 0;
        x[b + 4 >> 2] = a % 1E3 * 1E6 | 0;
        return 0
    },
    _emscripten_force_exit: function(a) {
        Module.noExitRuntime = !1;
        Module.exit(a)
    },
    _emscripten_get_now: Y,
    _emscripten_get_now_is_monotonic: vc,
    _emscripten_memcpy_big: function(a, b, c) {
        G.set(G.subarray(b, b + c), a);
        return a
    },
    _emscripten_run_script: function(a) {
        eval(C(a))
    },
    _emscripten_set_main_loop: Fc,
    _emscripten_set_main_loop_timing: wc,
    _exit: function(a) {
        jd(a)
    },
    _getenv: md,
    _llvm_cttz_i32: od,
    _llvm_cttz_i64: function(a, b) {
        a = od(a);
        32 == a && (a += od(b));
        return (u.O(0),
        a) | 0
    },
    _pthread_cond_signal: function() {
        return 0
    },
    _pthread_cond_wait: function() {
        return 0
    },
    _pthread_getspecific: function(a) {
        return pd[a] || 0
    },
    _pthread_key_create: function(a) {
        if (0 == a)
            return J.i;
        x[a >> 2] = qd;
        pd[qd] = 0;
        qd++;
        return 0
    },
    _pthread_once: rd,
    _pthread_setspecific: function(a, b) {
        if (!(a in pd))
            return J.i;
        pd[a] = b;
        return 0
    },
    _strftime: xd,
    _strftime_l: function(a, b, c, d) {
        return xd(a, b, c, d)
    },
    _usleep: function(a) {
        a /= 1E3;
        if ((l || m) && self.performance && self.performance.now)
            for (var b = self.performance.now(); self.performance.now() - b < a; )
                ;
        else
            for (b = Date.now(); Date.now() - b < a; )
                ;
        return 0
    },
    DYNAMICTOP_PTR: y,
    tempDoublePtr: mb,
    ABORT: A,
    STACKTOP: q,
    STACK_MAX: Qa,
    cttz_i8: nd
};
var yd = Module.asm(Module.ab, Module.bb, buffer);
Module.asm = yd;
var ib = Module.__GLOBAL__I_000101 = function() {
    return Module.asm.__GLOBAL__I_000101.apply(null, arguments)
}
  , jb = Module.__GLOBAL__sub_I_eval_cpp = function() {
    return Module.asm.__GLOBAL__sub_I_eval_cpp.apply(null, arguments)
}
  , lb = Module.__GLOBAL__sub_I_iostream_cpp = function() {
    return Module.asm.__GLOBAL__sub_I_iostream_cpp.apply(null, arguments)
}
  , kb = Module.__GLOBAL__sub_I_uci_cpp = function() {
    return Module.asm.__GLOBAL__sub_I_uci_cpp.apply(null, arguments)
}
;
Module.___cxa_can_catch = function() {
    return Module.asm.___cxa_can_catch.apply(null, arguments)
}
;
Module.___cxa_is_pointer_type = function() {
    return Module.asm.___cxa_is_pointer_type.apply(null, arguments)
}
;
Module.___errno_location = function() {
    return Module.asm.___errno_location.apply(null, arguments)
}
;
Module._emscripten_get_global_libc = function() {
    return Module.asm._emscripten_get_global_libc.apply(null, arguments)
}
;
var Sa = Module._emscripten_replace_memory = function() {
    return Module.asm._emscripten_replace_memory.apply(null, arguments)
}
  , Fa = Module._free = function() {
    return Module.asm._free.apply(null, arguments)
}
;
Module._llvm_bswap_i32 = function() {
    return Module.asm._llvm_bswap_i32.apply(null, arguments)
}
;
Module._llvm_ctlz_i64 = function() {
    return Module.asm._llvm_ctlz_i64.apply(null, arguments)
}
;
Module._llvm_ctpop_i64 = function() {
    return Module.asm._llvm_ctpop_i64.apply(null, arguments)
}
;
Module._main = function() {
    return Module.asm._main.apply(null, arguments)
}
;
var F = Module._malloc = function() {
    return Module.asm._malloc.apply(null, arguments)
}
;
Module._memcpy = function() {
    return Module.asm._memcpy.apply(null, arguments)
}
;
Module._memmove = function() {
    return Module.asm._memmove.apply(null, arguments)
}
;
Module._memset = function() {
    return Module.asm._memset.apply(null, arguments)
}
;
Module._oncommand = function() {
    return Module.asm._oncommand.apply(null, arguments)
}
;
Module._pthread_cond_broadcast = function() {
    return Module.asm._pthread_cond_broadcast.apply(null, arguments)
}
;
Module._pthread_mutex_lock = function() {
    return Module.asm._pthread_mutex_lock.apply(null, arguments)
}
;
Module._pthread_mutex_unlock = function() {
    return Module.asm._pthread_mutex_unlock.apply(null, arguments)
}
;
Module._sbrk = function() {
    return Module.asm._sbrk.apply(null, arguments)
}
;
Module.establishStackSpace = function() {
    return Module.asm.establishStackSpace.apply(null, arguments)
}
;
Module.getTempRet0 = function() {
    return Module.asm.getTempRet0.apply(null, arguments)
}
;
Module.runPostSets = function() {
    return Module.asm.runPostSets.apply(null, arguments)
}
;
Module.setTempRet0 = function() {
    return Module.asm.setTempRet0.apply(null, arguments)
}
;
Module.setThrew = function() {
    return Module.asm.setThrew.apply(null, arguments)
}
;
Module.stackAlloc = function() {
    return Module.asm.stackAlloc.apply(null, arguments)
}
;
Module.stackRestore = function() {
    return Module.asm.stackRestore.apply(null, arguments)
}
;
Module.stackSave = function() {
    return Module.asm.stackSave.apply(null, arguments)
}
;
Module.dynCall_ii = function() {
    return Module.asm.dynCall_ii.apply(null, arguments)
}
;
Module.dynCall_iii = function() {
    return Module.asm.dynCall_iii.apply(null, arguments)
}
;
Module.dynCall_iiii = function() {
    return Module.asm.dynCall_iiii.apply(null, arguments)
}
;
Module.dynCall_iiiii = function() {
    return Module.asm.dynCall_iiiii.apply(null, arguments)
}
;
Module.dynCall_iiiiid = function() {
    return Module.asm.dynCall_iiiiid.apply(null, arguments)
}
;
Module.dynCall_iiiiii = function() {
    return Module.asm.dynCall_iiiiii.apply(null, arguments)
}
;
Module.dynCall_iiiiiid = function() {
    return Module.asm.dynCall_iiiiiid.apply(null, arguments)
}
;
Module.dynCall_iiiiiii = function() {
    return Module.asm.dynCall_iiiiiii.apply(null, arguments)
}
;
Module.dynCall_iiiiiiii = function() {
    return Module.asm.dynCall_iiiiiiii.apply(null, arguments)
}
;
Module.dynCall_iiiiiiiii = function() {
    return Module.asm.dynCall_iiiiiiiii.apply(null, arguments)
}
;
Module.dynCall_iiiiij = function() {
    return Module.asm.dynCall_iiiiij.apply(null, arguments)
}
;
Module.dynCall_v = function() {
    return Module.asm.dynCall_v.apply(null, arguments)
}
;
Module.dynCall_vi = function() {
    return Module.asm.dynCall_vi.apply(null, arguments)
}
;
Module.dynCall_vii = function() {
    return Module.asm.dynCall_vii.apply(null, arguments)
}
;
Module.dynCall_viii = function() {
    return Module.asm.dynCall_viii.apply(null, arguments)
}
;
Module.dynCall_viiii = function() {
    return Module.asm.dynCall_viiii.apply(null, arguments)
}
;
Module.dynCall_viiiii = function() {
    return Module.asm.dynCall_viiiii.apply(null, arguments)
}
;
Module.dynCall_viiiiii = function() {
    return Module.asm.dynCall_viiiiii.apply(null, arguments)
}
;
Module.dynCall_viijii = function() {
    return Module.asm.dynCall_viijii.apply(null, arguments)
}
;
u.aa = Module.stackAlloc;
u.ua = Module.stackSave;
u.ta = Module.stackRestore;
u.Id = Module.establishStackSpace;
u.O = Module.setTempRet0;
u.hb = Module.getTempRet0;
Module.asm = yd;
if (I)
    if ("function" === typeof Module.locateFile ? I = Module.locateFile(I) : Module.memoryInitializerPrefixURL && (I = Module.memoryInitializerPrefixURL + I),
    p || ba) {
        var zd = Module.readBinary(I);
        G.set(zd, u.ia)
    } else {
        var Bd = function() {
            Module.readAsync(I, Ad, function() {
                throw "could not load memory initializer " + I;
            })
        };
        gb();
        var Ad = function(a) {
            a.byteLength && (a = new Uint8Array(a));
            G.set(a, u.ia);
            Module.memoryInitializerRequest && delete Module.memoryInitializerRequest.response;
            hb()
        };
        if (Module.memoryInitializerRequest) {
            var Cd = function() {
                var a = Module.memoryInitializerRequest
                  , b = a.response;
                200 !== a.status && 0 !== a.status ? (console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + a.status + ", retrying " + I),
                Bd()) : Ad(b)
            };
            Module.memoryInitializerRequest.response ? setTimeout(Cd, 0) : Module.memoryInitializerRequest.addEventListener("load", Cd)
        } else
            Bd()
    }
function fa(a) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + a + ")";
    this.status = a
}
fa.prototype = Error();
fa.prototype.constructor = fa;
var Dd = null;
fb = function Ed() {
    Module.calledRun || Fd();
    Module.calledRun || (fb = Ed)
}
;
Module.callMain = Module.Fd = function(a) {
    function b() {
        for (var a = 0; 3 > a; a++)
            d.push(0)
    }
    a = a || [];
    ya || (ya = !0,
    Va(Xa));
    var c = a.length + 1
      , d = [E(O(Module.thisProgram), "i8", 0)];
    b();
    for (var e = 0; e < c - 1; e += 1)
        d.push(E(O(a[e]), "i8", 0)),
        b();
    d.push(0);
    d = E(d, "i32", 0);
    try {
        var f = Module._main(c, d, 0);
        Gd(f, !0)
    } catch (g) {
        g instanceof fa || ("SimulateInfiniteLoop" == g ? Module.noExitRuntime = !0 : ((a = g) && "object" === typeof g && g.stack && (a = [g, g.stack]),
        Module.printErr("exception thrown: " + a),
        Module.quit(1, g)))
    } finally {}
}
;
function Fd(a) {
    function b() {
        if (!Module.calledRun && (Module.calledRun = !0,
        !A)) {
            ya || (ya = !0,
            Va(Xa));
            Va(Ya);
            if (Module.onRuntimeInitialized)
                Module.onRuntimeInitialized();
            Module._main && Hd && Module.callMain(a);
            if (Module.postRun)
                for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length; )
                    bb(Module.postRun.shift());
            Va($a)
        }
    }
    a = a || Module.arguments;
    null === Dd && (Dd = Date.now());
    if (!(0 < db)) {
        if (Module.preRun)
            for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length; )
                ab(Module.preRun.shift());
        Va(Wa);
        0 < db || Module.calledRun || (Module.setStatus ? (Module.setStatus("Running..."),
        setTimeout(function() {
            setTimeout(function() {
                Module.setStatus("")
            }, 1);
            b()
        }, 1)) : b())
    }
}
Module.run = Module.run = Fd;
function Gd(a, b) {
    if (!b || !Module.noExitRuntime) {
        if (!Module.noExitRuntime && (A = !0,
        q = void 0,
        Va(Za),
        Module.onExit))
            Module.onExit(a);
        p && process.exit(a);
        Module.quit(a, new fa(a))
    }
}
Module.exit = Module.exit = Gd;
var Id = [];
function B(a) {
    if (Module.onAbort)
        Module.onAbort(a);
    void 0 !== a ? (Module.print(a),
    Module.printErr(a),
    a = JSON.stringify(a)) : a = "";
    A = !0;
    var b = "abort(" + a + ") at " + Ga() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
    Id && Id.forEach(function(c) {
        b = c(b, a)
    });
    throw b;
}
Module.abort = Module.abort = B;
if (Module.preInit)
    for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); 0 < Module.preInit.length; )
        Module.preInit.pop()();
var Hd = !0;
Module.noInitialRun && (Hd = !1);
Module.noExitRuntime = !0;
Fd();