var M = function() {
    function C(c) {
        return "abcdefgh".split("")[(c & 15) - 4] + (9 - (c >> 4) + 1)
    }
    function va(c, b, a) {
        if (0 != b)
            if (0 == c)
                a.end = z ? "Mate" : "Stalemate";
            else {
                var d;
                var f = c & 255
                  , g = c >> 8 & 255;
                if (c & 262144)
                    d = "O-O";
                else if (c & 524288)
                    d = "O-O-O";
                else {
                    var k = e[f] & 7
                      , h = "  N B R Q K ".split(" ")[k]
                      , l = !1
                      , q = !0
                      , n = !0;
                    null == d && (d = fa());
                    for (var r = 0; r < d.length; r++) {
                        var t = d[r] & 255
                          , p = d[r] >> 8 & 255;
                        t != f && p == g && (e[t] & 7) == k && (l = !0,
                        (t & 240) == (f & 240) && (q = !1),
                        (t & 15) == (f & 15) && (n = !1))
                    }
                    l ? h = n ? h + C(f).charAt(0) : q ? h + C(f).charAt(1) : h + C(f) : k == x && (0 != e[g] || c & 131072) && (h += C(f).charAt(0));
                    if (0 != e[g] || c & 131072)
                        h += "x";
                    h += C(g);
                    c & 1048576 && (h = c & 8388608 ? h + "=B" : c & 2097152 ? h + "=N" : c & 4194304 ? h + "=Q" : h + "=R");
                    m.m(c);
                    z && (h += 0 == fa().length ? "#" : "+");
                    S(c);
                    d = h
                }
                d = " " + d;
                m.m(c);
                a.moves.push(na(c));
                a.lineStr += d;
                d = W[y & 4194303];
                null != d && d.lock == A && null != d.u && va(d.u, b - 1, a);
                S(c)
            }
    }
    function wa(c) {
        var b, a, d, f, g, k = 8 == c ? 16 : 8, h = 8 == c ? u[0] : u[1];
        f = -3;
        g = (c | 2) << 4;
        for (a = l[g++]; 0 != a; )
            f += h[e[a + 31]],
            f += h[e[a + 33]],
            f += h[e[a + 14]],
            f += h[e[a - 14]],
            f += h[e[a - 31]],
            f += h[e[a - 33]],
            f += h[e[a + 18]],
            f += h[e[a - 18]],
            a = l[g++];
        b = 0 + 65 * f;
        f = -4;
        g = (c | 3) << 4;
        for (a = l[g++]; 0 != a; ) {
            for (d = a - 15; 0 == e[d]; )
                d -= 15,
                f++;
            if (e[d] & k && (f++,
            !(e[d] & x))) {
                for (d -= 15; 0 == e[d]; )
                    d -= 15;
                f += h[e[d]] << 2
            }
            for (d = a - 17; 0 == e[d]; )
                d -= 17,
                f++;
            if (e[d] & k && (f++,
            !(e[d] & x))) {
                for (d -= 17; 0 == e[d]; )
                    d -= 17;
                f += h[e[d]] << 2
            }
            for (d = a + 15; 0 == e[d]; )
                d += 15,
                f++;
            if (e[d] & k && (f++,
            !(e[d] & x))) {
                for (d += 15; 0 == e[d]; )
                    d += 15;
                f += h[e[d]] << 2
            }
            for (d = a + 17; 0 == e[d]; )
                d += 17,
                f++;
            if (e[d] & k && (f++,
            !(e[d] & x))) {
                for (d += 17; 0 == e[d]; )
                    d += 17;
                f += h[e[d]] << 2
            }
            a = l[g++]
        }
        b += 44 * f;
        f = -4;
        g = (c | 4) << 4;
        for (a = l[g++]; 0 != a; ) {
            for (d = a - 1; 0 == e[d]; )
                d--,
                f++;
            e[d] & k && f++;
            for (d = a + 1; 0 == e[d]; )
                d++,
                f++;
            e[d] & k && f++;
            for (d = a + 16; 0 == e[d]; )
                d += 16,
                f++;
            e[d] & k && f++;
            for (d = a - 16; 0 == e[d]; )
                d -= 16,
                f++;
            e[d] & k && f++;
            a = l[g++]
        }
        b += 25 * f;
        f = -2;
        g = (c | 5) << 4;
        for (a = l[g++]; 0 != a; ) {
            for (d = a - 15; 0 == e[d]; )
                d -= 15,
                f++;
            e[d] & k && f++;
            for (d = a - 17; 0 == e[d]; )
                d -= 17,
                f++;
            e[d] & k && f++;
            for (d = a + 15; 0 == e[d]; )
                d += 15,
                f++;
            e[d] & k && f++;
            for (d = a + 17; 0 == e[d]; )
                d += 17,
                f++;
            e[d] & k && f++;
            for (d = a - 1; 0 == e[d]; )
                d--,
                f++;
            e[d] & k && f++;
            for (d = a + 1; 0 == e[d]; )
                d++,
                f++;
            e[d] & k && f++;
            for (d = a + 16; 0 == e[d]; )
                d += 16,
                f++;
            e[d] & k && f++;
            for (d = a - 16; 0 == e[d]; )
                d -= 16,
                f++;
            e[d] & k && f++;
            a = l[g++]
        }
        return b + 22 * f
    }
    function oa(c) {
        var b = c >> 8 & 255
          , a = e[b] & 7;
        c = e[c & 255];
        return 0 != a ? (a << 5) - (c & 7) : I[c & 15][b]
    }
    function ga(c, b, a) {
        pa++;
        var d;
        if (z)
            d = -1999999;
        else {
            d = r;
            var f = 0;
            0 == l[N << 4] && (f -= B[v][l[(8 | v) << 4]]);
            0 == l[(8 | N) << 4] && (f += B[v][O[l[v << 4]]]);
            2 <= w[P] && (f -= 500);
            2 <= w[P | 8] && (f += 500);
            var g = wa(8) - wa(0);
            d = 0 == n ? d - g - f : d + g + f
        }
        if (d >= b)
            return d;
        d > c && (c = d);
        var f = []
          , g = []
          , k = z;
        if (k) {
            ha(f);
            qa(f);
            for (var h = 0; h < f.length; h++)
                g[h] = oa(f[h])
        } else
            for (ha(f),
            h = 0; h < f.length; h++)
                g[h] = ((e[f[h] >> 8 & 255] & 7) << 5) - (e[f[h] & 255] & 7);
        for (h = 0; h < f.length && !m.B; h++) {
            for (var H = h, q = f.length - 1; q > h; q--)
                g[q] > g[H] && (H = q);
            q = f[h];
            f[h] = f[H];
            f[H] = q;
            q = g[h];
            g[h] = g[H];
            g[H] = q;
            if ((k || xa(f[h])) && m.m(f[h]) && (H = -ga(-b, -c, a - 1),
            S(f[h]),
            H > d)) {
                if (H >= b)
                    return H;
                H > c && (c = H);
                d = H
            }
        }
        return d
    }
    function ia(c, b, a, d, f) {
        1998E3 <= c ? c += f : -1998E3 >= c && (c -= f);
        W[y & 4194303] = new Ga(A,c,b,a,d)
    }
    function ra(c) {
        var b = c & 255
          , a = c >> 8 & 255
          , d = e[b]
          , f = d & 7;
        if (f < x || f > v || n != (d & 8) || 0 != e[a] && n == (e[a] & 8))
            return !1;
        if (f == x) {
            if (c & 131072)
                return !1;
            d = a - b;
            if (8 == n != 0 > d)
                return !1;
            f = a & 240;
            if ((144 == f && !n || 32 == f && n) != (c & 1048576))
                return !1;
            if (-16 == d || 16 == d)
                return 0 == e[a];
            if (-15 == d || -17 == d || 15 == d || 17 == d)
                return 0 != e[a];
            if (-32 == d) {
                if (96 != f || 0 != e[a] || 0 != e[b - 16])
                    return !1
            } else if (32 == d) {
                if (80 != f || 0 != e[a] || 0 != e[b + 16])
                    return !1
            } else
                return !1;
            return !0
        }
        return c >> 16 ? !1 : ja(a, b)
    }
    function ya() {
        for (var c = D - 1 - X, c = 0 > c ? 0 : c, b = D - 5; b >= c; b -= 2)
            if (za[b] == y)
                return !0;
        return !1
    }
    function Aa(c, b, a, d) {
        this.v = c;
        this.depth = b;
        this.w = a;
        this.A = d;
        this.b = [];
        this.s = null;
        this.h = 0;
        this.f = -1;
        this.j = null;
        this.c = 0;
        this.D = function() {
            if (++this.f == this.h) {
                this.c++;
                1 == this.c && (null != this.v && ra(c) && (this.b[0] = c,
                this.h = 1),
                1 != this.h && (this.v = null,
                this.c++));
                if (2 == this.c) {
                    ha(this.b);
                    this.h = this.b.length;
                    this.j = Array(this.h);
                    for (var a = this.f; a < this.h; a++)
                        this.j[a] = ((e[this.b[a] >> 8 & 255] & 7) << 5) - (e[this.b[a] & 255] & 7);
                    this.f == this.h && this.c++
                }
                3 == this.c && (ra(this.w) && this.w != this.v ? (this.b[this.b.length] = this.w,
                this.h = this.b.length) : (this.w = 0,
                this.c++));
                4 == this.c && (ra(this.A) && this.A != this.v ? (this.b[this.b.length] = this.A,
                this.h = this.b.length) : (this.A = 0,
                this.c++));
                if (5 == this.c) {
                    qa(this.b);
                    this.h = this.b.length;
                    for (a = this.f; a < this.h; a++)
                        this.j[a] = oa(this.b[a]);
                    this.f == this.h && this.c++
                }
                if (6 == this.c) {
                    if (null != this.s) {
                        for (a = 0; a < this.s.length; a++)
                            this.b[this.b.length] = this.s[a];
                        for (a = this.f; a < this.h; a++)
                            this.j[a] = oa(this.b[a]);
                        this.h = this.b.length
                    }
                    this.f == this.h && this.c++
                }
                if (7 == this.c)
                    return 0
            }
            for (var a = this.f, b = this.f + 1; b < this.h; b++)
                this.j[b] > this.j[a] && (a = b);
            a != this.f && (b = this.b[this.f],
            this.b[this.f] = this.b[a],
            this.b[a] = b,
            b = this.j[this.f],
            this.j[this.f] = this.j[a],
            this.j[a] = b);
            a = this.b[this.f];
            return 1 < this.c && a == this.v || 3 < this.c && a == this.w || 4 < this.c && a == this.A ? this.D() : 2 != this.c || xa(a) ? this.b[this.f] : (null == this.s && (this.s = []),
            this.s[this.s.length] = a,
            this.D())
        }
    }
    function ka(c, b, a, d) {
        if (0 >= c)
            return ga(a - 1, a, 0);
        if (127 == (ba & 127) && (new Date).getTime() - la > m.H)
            return Y = !1,
            a - 1;
        ba++;
        Z < b && (Z = b);
        if (ya())
            return 0;
        if (-2E6 + b >= a)
            return a;
        if (2E6 - (b + 1) < a)
            return a - 1;
        var f = null
          , g = W[y & 4194303];
        if (null != g && g.lock == A && (f = g.u,
        g.T >= c)) {
            var k = g.value;
            1998E3 <= k ? k -= b : -1998E3 >= k && (k += b);
            if (3 == g.F || 1 == g.F && k < a || 2 == g.F && k >= a)
                return k
        }
        if (!z && d && -1998E3 < a && 1998E3 > a) {
            if (null == f && 4 > c && (d = 2500 + 200 * c,
            r < a - d && (d = a - d,
            g = ga(d - 1, d, 0),
            g < d)))
                return g;
            if (1 < c && r >= a - (4 <= c ? 2500 : 0) && (0 != w[P | n] || 0 != w[Q | n] || 0 != w[R | n] || 0 != w[N | n])) {
                var h = 3 + (5 <= c ? 1 : c / 4);
                1500 < r - a && h++;
                n = 8 - n;
                r = -r;
                y ^= ca;
                A ^= da;
                h = -ka(c - h, b + 1, -(a - 1), !1);
                y ^= ca;
                A ^= da;
                n = 8 - n;
                r = -r;
                if (h >= a)
                    return a
            }
        }
        for (var l = !1, g = -2000001, k = new Aa(f,b,E[b][0],E[b][1]); ; ) {
            d = k.D();
            if (0 == d)
                break;
            var q = c - 1;
            if (m.m(d)) {
                l = !0;
                if (z)
                    q++;
                else {
                    var t = q - (14 < k.f ? 2 : 1);
                    5 == k.c && 5 < k.f && 3 <= c && (h = -ka(t, b + 1, -(a - 1), !0),
                    l = h >= a)
                }
                l && (h = -ka(q, b + 1, -(a - 1), !0));
                l = !0;
                S(d);
                if (!Y)
                    return a - 1;
                if (h > g) {
                    if (h >= a)
                        return a = d >> 8 & 255,
                        0 == e[a] && (f = e[d & 255] & 15,
                        I[f][a] += c * c,
                        32767 < I[f][a] && (I[f][a] >>= 1),
                        E[b][0] != d && (E[b][1] = E[b][0],
                        E[b][0] = d)),
                        ia(h, 2, c, d, b),
                        h;
                    g = h;
                    f = d
                }
            }
        }
        if (!l)
            return z ? -2E6 + b : 0;
        ia(g, 1, c, f, b);
        return g
    }
    function sa(c, b, a, d) {
        if (0 >= c)
            return ga(a, d, 0);
        ba++;
        Z < b && (Z = b);
        if (0 < b && ya())
            return 0;
        var f = a;
        a = a < -2E6 + b ? a : -2E6 + b;
        d = d > 2E6 - (b + 1) ? d : 2E6 - (b + 1);
        if (a >= d)
            return a;
        var g = null
          , k = 1
          , h = W[y & 4194303];
        null != h && h.lock == A && (g = h.u);
        for (var l = z, q = !1, n = -2E6, r = new Aa(g,b,E[b][0],E[b][1]); ; ) {
            h = r.D();
            if (0 == h)
                break;
            var t = c - 1;
            if (m.m(h)) {
                z && t++;
                var p;
                q ? (p = -ka(t, b + 1, -a, !0),
                p > a && (p = -sa(t, b + 1, -d, -a))) : p = -sa(t, b + 1, -d, -a);
                q = !0;
                S(h);
                if (!Y)
                    return a;
                if (p > n) {
                    if (p >= d)
                        return a = h >> 8 & 255,
                        0 == e[a] && (d = e[h & 255] & 15,
                        I[d][a] += c * c,
                        32767 < I[d][a] && (I[d][a] >>= 1),
                        E[b][0] != h && (E[b][1] = E[b][0],
                        E[b][0] = h)),
                        ia(p, 2, c, h, b),
                        p;
                    p > f && (k = 3,
                    a = p);
                    n = p;
                    g = h
                }
            }
        }
        if (!q)
            return l ? -2E6 + b : 0;
        ia(n, k, c, g, b);
        return n
    }
    function Ha() {
        var c = [0, 2567483615];
        this.a = Array(624);
        this.C = 625;
        this.G = function() {
            var b = arguments;
            switch (b.length) {
            case 1:
                if (b[0].constructor === Number) {
                    this.a[0] = b[0];
                    for (var a = 1; 624 > a; ++a) {
                        var c = this.a[a - 1] ^ this.a[a - 1] >>> 30;
                        this.a[a] = (1812433253 * ((c & 4294901760) >>> 16) << 16) + 1812433253 * (c & 65535) + a
                    }
                    this.C = 624;
                    break
                }
                this.G(19650218);
                for (var f = b[0].length, a = 1, e = 0, k = 624 > f ? 624 : f; 0 != k; --k)
                    c = this.a[a - 1] ^ this.a[a - 1] >>> 30,
                    this.a[a] = (this.a[a] ^ (1664525 * ((c & 4294901760) >>> 16) << 16) + 1664525 * (c & 65535)) + b[0][e] + e,
                    624 <= ++a && (this.a[0] = this.a[623],
                    a = 1),
                    ++e >= f && (e = 0);
                for (k = 623; 0 != k; --k)
                    c = this.a[a - 1] ^ this.a[a - 1] >>> 30,
                    this.a[a] = (this.a[a] ^ (1566083941 * ((c & 4294901760) >>> 16) << 16) + 1566083941 * (c & 65535)) - a,
                    624 <= ++a && (this.a[0] = this.a[623],
                    a = 1);
                this.a[0] = 2147483648;
                break;
            default:
                c = [];
                for (a = 0; a < b.length; ++a)
                    c.push(b[a]);
                this.G(c)
            }
        }
        ;
        this.G(464384013);
        this.next = function(b) {
            if (624 <= this.C) {
                for (var a, d = 0; 227 > d; ++d)
                    a = this.a[d] & 2147483648 | this.a[d + 1] & 2147483647,
                    this.a[d] = this.a[d + 397] ^ a >>> 1 ^ c[a & 1];
                for (d = 227; 623 > d; ++d)
                    a = this.a[d] & 2147483648 | this.a[d + 1] & 2147483647,
                    this.a[d] = this.a[d + -227] ^ a >>> 1 ^ c[a & 1];
                a = this.a[623] & 2147483648 | this.a[0] & 2147483647;
                this.a[623] = this.a[396] ^ a >>> 1 ^ c[a & 1];
                this.C = 0
            }
            a = this.a[this.C++];
            a ^= a >>> 11;
            a ^= a << 7 & 2636928640;
            a ^= a << 15 & 4022730752;
            return (a ^ a >>> 18) >>> 32 - b & 4294967295
        }
    }
    function Ga(c, b, a, d, f) {
        this.lock = c;
        this.value = b;
        this.F = a;
        this.T = d;
        this.u = f
    }
    function F(c, b) {
        return c + 2 << 4 | b + 4
    }
    function U(c) {
        for (var b = Array(256), a = 0; 256 > a; a++)
            b[a] = 0;
        for (a = 0; 8 > a; a++)
            for (var d = 0; 8 > d; d++)
                b[F(a, d)] = c[8 * a + d];
        return b
    }
    function Ia() {
        for (var c = Array(256), b = 0; 256 > b; b++)
            c[b] = 0;
        return c
    }
    function S(c) {
        n = 8 - n;
        r = -r;
        D--;
        J = T[D].S;
        G = T[D].R;
        z = T[D].W;
        r = T[D].O;
        y = T[D].V;
        A = T[D].U;
        X = T[D].X;
        var b = c & 16711680
          , a = T[D].P
          , d = c >> 8 & 255;
        c &= 255;
        var f = e[d];
        if (b)
            if (b & 262144) {
                var g = e[d - 1];
                e[d + 1] = g;
                e[d - 1] = 0;
                var k = t[d - 1];
                t[d + 1] = k;
                l[(g & 15) << 4 | k] = d + 1
            } else
                b & 524288 && (g = e[d + 1],
                e[d - 2] = g,
                e[d + 1] = 0,
                k = t[d + 1],
                t[d - 2] = k,
                l[(g & 15) << 4 | k] = d - 2);
        if (b & 1048576) {
            f = e[d] & -8 | x;
            e[c] = f;
            g = e[c] & 15;
            k = e[d] & 15;
            w[k]--;
            var h = l[k << 4 | w[k]];
            t[h] = t[d];
            l[k << 4 | t[h]] = h;
            l[k << 4 | w[k]] = 0;
            t[d] = w[g];
            l[g << 4 | t[d]] = d;
            w[g]++
        } else
            e[c] = e[d];
        g = d;
        b & 131072 && (g = 8 == n ? d + 16 : d - 16,
        e[d] = 0);
        e[g] = a;
        t[c] = t[d];
        l[(f & 15) << 4 | t[c]] = c;
        a && (b = a & 15,
        t[g] = w[b],
        l[b << 4 | w[b]] = g,
        w[b]++)
    }
    function ma(c, b) {
        var a = b - c + 128;
        if (0 != (p[a].g[0] & 1 << N)) {
            for (var d = p[a].o, a = b + d; 0 == e[a]; )
                a += d;
            d = e[a];
            return 0 == (d & (e[b] ^ 24) & 24) ? !1 : 0 != (p[a - b + 128].g[d >> 3 & 1] & 1 << (d & 7))
        }
        return !1
    }
    function Ba(c, b) {
        var a = e[b];
        return p[b - c + 128].g[a >> 3 & 1] & 1 << (a & 7) ? !0 : !1
    }
    function ja(c, b) {
        var a = b - c + 128
          , d = e[b];
        if (p[a].g[d >> 3 & 1] & 1 << (d & 7)) {
            a = p[a].o;
            do
                if (b += a,
                b == c)
                    return !0;
            while (0 == e[b])
        }
        return !1
    }
    function V(c, b) {
        var a = b ? -16 : 16
          , d = (b ? 8 : 16) | 1;
        if (e[c - (a - 1)] == d || e[c - (a + 1)] == d)
            return !0;
        for (a = 2; 6 >= a; a++)
            for (var d = (b | a) << 4, f = l[d]; 0 != f; ) {
                if (ja(c, f))
                    return !0;
                f = l[++d]
            }
        return !1
    }
    function fa() {
        var c = []
          , b = [];
        ha(b);
        qa(b);
        for (var a = b.length - 1; 0 <= a; a--)
            m.m(b[a]) && (c[c.length] = b[a],
            S(b[a]));
        return c
    }
    function qa(c) {
        var b, a, d;
        d = (n | 1) << 4;
        for (b = l[d++]; 0 != b; ) {
            a = c;
            var f = e[b] & 8
              , g = 8 == f ? -16 : 16
              , k = b + g;
            0 == e[k] && (ta(a, b, k),
            48 == (b & 240) && 8 != f || 128 == (b & 240) && 8 == f) && (k += g,
            0 == e[k] && (a[a.length] = b | k << 8 | NaN));
            b = l[d++]
        }
        d = (n | 2) << 4;
        for (b = l[d++]; 0 != b; )
            a = b + 31,
            0 == e[a] && (c[c.length] = b | a << 8 | NaN),
            a = b + 33,
            0 == e[a] && (c[c.length] = b | a << 8 | NaN),
            a = b + 14,
            0 == e[a] && (c[c.length] = b | a << 8 | NaN),
            a = b - 14,
            0 == e[a] && (c[c.length] = b | a << 8 | NaN),
            a = b - 31,
            0 == e[a] && (c[c.length] = b | a << 8 | NaN),
            a = b - 33,
            0 == e[a] && (c[c.length] = b | a << 8 | NaN),
            a = b + 18,
            0 == e[a] && (c[c.length] = b | a << 8 | NaN),
            a = b - 18,
            0 == e[a] && (c[c.length] = b | a << 8 | NaN),
            b = l[d++];
        d = (n | 3) << 4;
        for (b = l[d++]; 0 != b; ) {
            for (a = b - 15; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a -= 15;
            for (a = b - 17; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a -= 17;
            for (a = b + 15; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a += 15;
            for (a = b + 17; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a += 17;
            b = l[d++]
        }
        d = (n | 4) << 4;
        for (b = l[d++]; 0 != b; ) {
            for (a = b - 1; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a--;
            for (a = b + 1; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a++;
            for (a = b + 16; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a += 16;
            for (a = b - 16; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a -= 16;
            b = l[d++]
        }
        d = (n | 5) << 4;
        for (b = l[d++]; 0 != b; ) {
            for (a = b - 15; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a -= 15;
            for (a = b - 17; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a -= 17;
            for (a = b + 15; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a += 15;
            for (a = b + 17; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a += 17;
            for (a = b - 1; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a--;
            for (a = b + 1; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a++;
            for (a = b + 16; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a += 16;
            for (a = b - 16; 0 == e[a]; )
                c[c.length] = b | a << 8 | NaN,
                a -= 16;
            b = l[d++]
        }
        d = (n | 6) << 4;
        b = l[d];
        a = b - 15;
        0 == e[a] && (c[c.length] = b | a << 8 | NaN);
        a = b - 17;
        0 == e[a] && (c[c.length] = b | a << 8 | NaN);
        a = b + 15;
        0 == e[a] && (c[c.length] = b | a << 8 | NaN);
        a = b + 17;
        0 == e[a] && (c[c.length] = b | a << 8 | NaN);
        a = b - 1;
        0 == e[a] && (c[c.length] = b | a << 8 | NaN);
        a = b + 1;
        0 == e[a] && (c[c.length] = b | a << 8 | NaN);
        a = b - 16;
        0 == e[a] && (c[c.length] = b | a << 8 | NaN);
        a = b + 16;
        0 == e[a] && (c[c.length] = b | a << 8 | NaN);
        z || (d = G,
        n || (d >>= 2),
        d & 1 && 0 == e[b + 1] && 0 == e[b + 2] && (c[c.length] = b | b + 2 << 8 | 262144),
        d & 2 && 0 == e[b - 1] && 0 == e[b - 2] && 0 == e[b - 3] && (c[c.length] = b | b - 2 << 8 | 524288))
    }
    function ha(c) {
        var b, a, d, f = 8 == n ? -16 : 16, g = 8 == n ? 16 : 8;
        d = (n | 1) << 4;
        for (b = l[d++]; 0 != b; )
            a = b + f - 1,
            e[a] & g && ta(c, b, a),
            a = b + f + 1,
            e[a] & g && ta(c, b, a),
            b = l[d++];
        -1 != J && (f = 8 == n ? -16 : 16,
        a = n | x,
        b = J - (f + 1),
        (e[b] & 15) == a && (c[c.length] = b | J << 8 | 131072),
        b = J - (f - 1),
        (e[b] & 15) == a && (c[c.length] = b | J << 8 | 131072));
        d = (n | 2) << 4;
        for (b = l[d++]; 0 != b; )
            a = b + 31,
            e[a] & g && (c[c.length] = b | a << 8 | NaN),
            a = b + 33,
            e[a] & g && (c[c.length] = b | a << 8 | NaN),
            a = b + 14,
            e[a] & g && (c[c.length] = b | a << 8 | NaN),
            a = b - 14,
            e[a] & g && (c[c.length] = b | a << 8 | NaN),
            a = b - 31,
            e[a] & g && (c[c.length] = b | a << 8 | NaN),
            a = b - 33,
            e[a] & g && (c[c.length] = b | a << 8 | NaN),
            a = b + 18,
            e[a] & g && (c[c.length] = b | a << 8 | NaN),
            a = b - 18,
            e[a] & g && (c[c.length] = b | a << 8 | NaN),
            b = l[d++];
        d = (n | 3) << 4;
        for (b = l[d++]; 0 != b; ) {
            a = b;
            do
                a -= 15;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a -= 17;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a += 15;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a += 17;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            b = l[d++]
        }
        d = (n | 4) << 4;
        for (b = l[d++]; 0 != b; ) {
            a = b;
            do
                a--;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a++;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a -= 16;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a += 16;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            b = l[d++]
        }
        d = (n | 5) << 4;
        for (b = l[d++]; 0 != b; ) {
            a = b;
            do
                a -= 15;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a -= 17;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a += 15;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a += 17;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a--;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a++;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a -= 16;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            a = b;
            do
                a += 16;
            while (0 == e[a]);
            e[a] & g && (c[c.length] = b | a << 8 | NaN);
            b = l[d++]
        }
        d = (n | 6) << 4;
        b = l[d];
        a = b - 15;
        e[a] & g && (c[c.length] = b | a << 8 | NaN);
        a = b - 17;
        e[a] & g && (c[c.length] = b | a << 8 | NaN);
        a = b + 15;
        e[a] & g && (c[c.length] = b | a << 8 | NaN);
        a = b + 17;
        e[a] & g && (c[c.length] = b | a << 8 | NaN);
        a = b - 1;
        e[a] & g && (c[c.length] = b | a << 8 | NaN);
        a = b + 1;
        e[a] & g && (c[c.length] = b | a << 8 | NaN);
        a = b - 16;
        e[a] & g && (c[c.length] = b | a << 8 | NaN);
        a = b + 16;
        e[a] & g && (c[c.length] = b | a << 8 | NaN)
    }
    function ta(c, b, a) {
        var d = a & 240;
        144 == d || 32 == d ? (c[c.length] = b | a << 8 | 5242880,
        c[c.length] = b | a << 8 | 3145728,
        c[c.length] = b | a << 8 | 9437184,
        c[c.length] = b | a << 8 | 1048576) : c[c.length] = b | a << 8 | 0
    }
    function Ja(c, b, a, d, f, e, k, h) {
        this.S = c;
        this.R = b;
        this.W = a;
        this.O = d;
        this.V = f;
        this.U = e;
        this.X = k;
        this.P = h
    }
    function xa(c) {
        var b = c & 255
          , a = c >> 8 & 255
          , d = e[b]
          , f = aa[d & 15]
          , g = aa[e[a] & 15];
        if (f <= g || c >> 16)
            return !0;
        c = d & 8 ? 8 : 0;
        var k = 8 - c
          , h = d & 8 ? -16 : 16;
        if ((e[a + h + 1] & 15) == (x | k) || (e[a + h - 1] & 15) == (x | k))
            return !1;
        var l = []
          , n = f - g;
        Ca(a, k, l);
        if (0 != l.length && n > aa[Q])
            return !1;
        e[b] = 0;
        for (var m = P; m <= N; m++)
            if (ua(a, k, l, m) && n > aa[m])
                return e[b] = d,
                !1;
        if ((e[a - h + 1] & 15) == (x | c) || (e[a - h - 1] & 15) == (x | c))
            return e[b] = d,
            !0;
        ua(a, k, l, v);
        k = [];
        Ca(a, c, k);
        for (m = P; m <= v; m++)
            ua(a, c, k, m);
        e[b] = d;
        for (b = g - f; ; ) {
            f = 1E3;
            d = -1;
            for (g = 0; g < l.length; g++)
                0 != l[g] && (m = aa[e[l[g]] & 7],
                m < f && (f = m,
                d = g));
            if (-1 == d)
                return !0;
            b += f;
            if (0 > b)
                return !1;
            f = l[d];
            l[d] = 0;
            Da(a, f, c, k, l);
            f = 1E3;
            d = -1;
            for (g = 0; g < k.length; g++)
                0 != k[g] && (m = aa[e[k[g]] & 7],
                m < f && (f = m,
                d = g));
            if (-1 == d)
                return !1;
            b -= f;
            if (0 <= b)
                return !0;
            f = k[d];
            k[d] = 0;
            Da(a, f, c, k, l)
        }
    }
    function Da(c, b, a, d, f) {
        var g = -p[b - c + 128].o;
        if (0 != g) {
            for (b += g; 0 == e[b]; )
                b += g;
            e[b] & 24 && Ba(c, b) && ((e[b] & 8) == a ? d[d.length] = b : f[f.length] = b)
        }
    }
    function Ca(c, b, a) {
        b = (b | Q) << 4;
        for (var d = l[b++]; 0 != d; )
            Ba(c, d) && (a[a.length] = d),
            d = l[b++]
    }
    function ua(c, b, a, d) {
        b = (b | d) << 4;
        d = l[b++];
        for (var f = !1; 0 != d; )
            ja(c, d) && (a[a.length] = d,
            f = !0),
            d = l[b++];
        return f
    }
    function na(c) {
        var b = {
            from: C(c & 255),
            to: C(c >> 8 & 255),
            prom: 0
        };
        c & 1048576 && (b.prom = c & 8388608 ? "B" : c & 2097152 ? "N" : c & 4194304 ? "Q" : "R");
        return b
    }
    var m = {
        H: 40,
        Z: null
    };
    m.i = Array(8);
    m.l = Array(8);
    m.L = function(c) {
        for (var b = "KQRBNP".split(""), a = [v, N, R, P, Q, x], d = 0; 6 > d; d++) {
            var f = "b" + b[d] + "Table"
              , e = !1;
            c[f] && (m.l[a[d]] = U(eval(c[f])),
            e = !0);
            f = "w" + b[d] + "Table";
            c[f] && (m.i[a[d]] = U(eval(c[f])),
            e = !0);
            e && a[d] == v && (B[a[d]] = Ia())
        }
    }
    ;
    var x = 1, Q = 2, P = 3, R = 4, N = 5, v = 6, p = Array(256), Ka = [-15, -17, 15, 17], La = [31, 33, 14, -14, -31, -33, 18, -18], Ma = [-1, 1, -16, 16], Ea = [-1, 1, -15, 15, -17, 17, -16, 16], Fa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 15, 15, 15, 3, 15, 15, 11, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 13, 15, 15, 15, 12, 15, 15, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = Array(256), n, G, J, r, y, A, z, D = 0, T = [], X = 0, za = [], W, E, I = Array(32), K, L, ca, da, u, la, ba, pa, Y, Na = 0, Z, t = Array(256), l = Array(256), w = Array(16);
    m.B = !1;
    m.J = function(c, b) {
        var a = M.N;
        m.B = !1;
        var d = -2E6
          , f = 2E6;
        Na++;
        pa = ba = Z = 0;
        Y = !0;
        var e = 0
          , k = -2E6;
        la = (new Date).getTime();
        var h;
        for (h = 1; h <= b && Y; h++) {
            var l = sa(h, 0, d, f);
            if (!Y)
                break;
            k = l;
            k > d && k < f ? (d = k - 500,
            f = k + 500,
            -2E6 > d && (d = -2E6),
            2E6 < f && (f = 2E6)) : -2E6 != d && (d = -2E6,
            f = 2E6,
            h--);
            null != W[y & 4194303] && (e = W[y & 4194303].u);
            null != a && a(e, k, (new Date).getTime() - la, h);
            if (-1998E3 > k || 1998E3 < k)
                break
        }
        null != c && c(e, k, (new Date).getTime() - la, h - 1)
    }
    ;
    var ea = [0, 800, 3350, 3450, 5E3, 9750, 6E5]
      , Oa = [0, 0, 0, 0, 0, 0, 0, 0, -25, 105, 135, 270, 270, 135, 105, -25, -80, 0, 30, 176, 176, 30, 0, -80, -85, -5, 25, 175, 175, 25, -5, -85, -90, -10, 20, 125, 125, 20, -10, -90, -95, -15, 15, 75, 75, 15, -15, -95, -100, -20, 10, 70, 70, 10, -20, -100, 0, 0, 0, 0, 0, 0, 0, 0]
      , Pa = [-200, -100, -50, -50, -50, -50, -100, -200, -100, 0, 0, 0, 0, 0, 0, -100, -50, 0, 60, 60, 60, 60, 0, -50, -50, 0, 30, 60, 60, 30, 0, -50, -50, 0, 30, 60, 60, 30, 0, -50, -50, 0, 30, 30, 30, 30, 0, -50, -100, 0, 0, 0, 0, 0, 0, -100, -200, -50, -25, -25, -25, -25, -50, -200]
      , Qa = [-50, -50, -25, -10, -10, -25, -50, -50, -50, -25, -10, 0, 0, -10, -25, -50, -25, -10, 0, 25, 25, 0, -10, -25, -10, 0, 25, 40, 40, 25, 0, -10, -10, 0, 25, 40, 40, 25, 0, -10, -25, -10, 0, 25, 25, 0, -10, -25, -50, -25, -10, 0, 0, -10, -25, -50, -50, -50, -25, -10, -10, -25, -50, -50]
      , Ra = [-60, -30, -10, 20, 20, -10, -30, -60, 40, 70, 90, 120, 120, 90, 70, 40, -60, -30, -10, 20, 20, -10, -30, -60, -60, -30, -10, 20, 20, -10, -30, -60, -60, -30, -10, 20, 20, -10, -30, -60, -60, -30, -10, 20, 20, -10, -30, -60, -60, -30, -10, 20, 20, -10, -30, -60, -60, -30, -10, 20, 20, -10, -30, -60]
      , Sa = [50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125, -25, 150, 50, 50, 150, -25, -125, -125, -25, 150, 50, 150, 250, 75, -25, -25, 75, 250, 150]
      , Ta = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      , B = Array(8)
      , O = Array(256);
    m.I = function() {
        m.B = !1;
        E = Array(128);
        for (var c = 0; 128 > c; c++)
            E[c] = [0, 0];
        W = Array(4194304);
        for (c = 0; 32 > c; c++) {
            I[c] = Array(256);
            for (var b = 0; 256 > b; b++)
                I[c][b] = 0
        }
        var a = new Ha;
        K = Array(256);
        L = Array(256);
        for (c = 0; 256 > c; c++)
            for (K[c] = Array(16),
            L[c] = Array(16),
            b = 0; 16 > b; b++)
                K[c][b] = a.next(32),
                L[c][b] = a.next(32);
        ca = a.next(32);
        da = a.next(32);
        for (b = 0; 8 > b; b++)
            for (a = 0; 8 > a; a++) {
                var d = F(b, a);
                O[d] = F(7 - b, a)
            }
        B[x] = U(Oa);
        B[Q] = U(Pa);
        B[P] = U(Qa);
        B[R] = U(Ra);
        B[N] = U(Ta);
        B[v] = U(Sa);
        for (var f = [[], [], La, Ka, Ma, Ea, Ea], c = 0; 256 > c; c++)
            p[c] = {},
            p[c].o = 0,
            p[c].g = Array(2),
            p[c].g[0] = 0,
            p[c].g[1] = 0;
        for (b = 0; 128 > b; b += 16)
            for (a = 0; 8 > a; a++) {
                var d = b | a
                  , e = d - (d - 17) + 128;
                p[e].g[1] |= 1 << x;
                e = d - (d - 15) + 128;
                p[e].g[1] |= 1 << x;
                e = d - (d + 17) + 128;
                p[e].g[0] |= 1 << x;
                e = d - (d + 15) + 128;
                p[e].g[0] |= 1 << x;
                for (c = Q; c <= v; c++)
                    for (var k = 0; k < f[c].length; k++)
                        for (var h = d + f[c][k]; !(h & 136); ) {
                            e = d - h + 128;
                            p[e].g[1] |= 1 << c;
                            p[e].g[0] |= 1 << c;
                            var l = -1;
                            d < h && (l = 1);
                            (d & 240) == (h & 240) ? p[e].o = 1 * l : (d & 15) == (h & 15) ? p[e].o = 16 * l : d % 15 == h % 15 ? p[e].o = 15 * l : d % 17 == h % 17 && (p[e].o = 17 * l);
                            if (c == Q) {
                                p[e].o = f[c][k];
                                break
                            }
                            if (c == v)
                                break;
                            h += f[c][k]
                        }
            }
        u = Array(2);
        for (c = 0; 2 > c; c++)
            u[c] = [],
            b = 0 == c ? 16 : 8,
            a = 0 == c ? 8 : 16,
            u[c][0] = 1,
            u[c][128] = 0,
            u[c][b | x] = 1,
            u[c][b | P] = 2,
            u[c][b | Q] = 2,
            u[c][b | R] = 4,
            u[c][b | N] = 6,
            u[c][b | v] = 6,
            u[c][a | x] = 0,
            u[c][a | P] = 0,
            u[c][a | Q] = 0,
            u[c][a | R] = 0,
            u[c][a | N] = 0,
            u[c][a | v] = 0;
        m.K("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    }
    ;
    m.K = function(c) {
        c = c.split(" ");
        for (var b = 0; 256 > b; b++)
            e[b] = 128;
        for (var a = 0, d = 0, f = c[0], b = 0; b < f.length; b++) {
            var g = f.charAt(b);
            if ("/" == g)
                a++,
                d = 0;
            else if ("0" <= g && "9" >= g)
                for (var k = 0; k < parseInt(g); k++)
                    e[F(a, d)] = 0,
                    d++;
            else {
                var h = (k = "a" <= g && "z" >= g) ? 16 : 8;
                k || (g = f.toLowerCase().charAt(b));
                switch (g) {
                case "p":
                    h |= x;
                    break;
                case "b":
                    h |= P;
                    break;
                case "n":
                    h |= Q;
                    break;
                case "r":
                    h |= R;
                    break;
                case "q":
                    h |= N;
                    break;
                case "k":
                    h |= v
                }
                e[F(a, d)] = h;
                d++
            }
        }
        for (b = 0; 16 > b; b++)
            for (a = w[b] = 0; 16 > a; a++)
                l[b << 4 | a] = 0;
        for (b = 0; 256 > b; b++)
            t[b] = 0,
            e[b] & 24 && (a = e[b] & 15,
            l[a << 4 | w[a]] = b,
            t[b] = w[a],
            w[a]++);
        n = "w" == c[1].charAt(0) ? 8 : 0;
        f = 8 - n;
        G = 0;
        if (-1 != c[2].indexOf("K")) {
            if (e[F(7, 4)] != (v | 8) || e[F(7, 7)] != (R | 8))
                return;
            G |= 1
        }
        if (-1 != c[2].indexOf("Q")) {
            if (e[F(7, 4)] != (v | 8) || e[F(7, 0)] != (R | 8))
                return;
            G |= 2
        }
        if (-1 != c[2].indexOf("k")) {
            if (e[F(0, 4)] != (v | 16) || e[F(0, 7)] != (R | 16))
                return;
            G |= 4
        }
        if (-1 != c[2].indexOf("q")) {
            if (e[F(0, 4)] != (v | 16) || e[F(0, 0)] != (R | 16))
                return;
            G |= 8
        }
        J = -1;
        -1 == c[3].indexOf("-") && (d = c[3].charAt(0).charCodeAt() - "a".charCodeAt(),
        a = 8 - (c[3].charAt(1).charCodeAt() - "0".charCodeAt()),
        J = F(a, d));
        for (a = b = c = 0; 256 > a; a++)
            d = e[a],
            d & 24 && (c ^= K[a][d & 15],
            b ^= L[a][d & 15]);
        n || (c ^= ca,
        b ^= da);
        y = c;
        A = b;
        for (b = r = 0; 256 > b; b++)
            c = e[b] & 7,
            e[b] & 8 ? (r += B[c][b],
            r += ea[c],
            m.i[c] && m.i[c].length && (r += m.i[c][b])) : e[b] & 16 && (r -= B[c][O[b]],
            r -= ea[c],
            m.l[c] && m.l[c].length && (r -= m.l[c][b]));
        n || (r = -r);
        X = 0;
        z = V(l[(n | v) << 4], f);
        V(l[(f | v) << 4], n) || fa()
    }
    ;
    m.m = function(c) {
        var b = n >> 3
          , a = 8 - n
          , d = c & 16711680
          , f = c >> 8 & 255
          , g = c & 255
          , k = e[f]
          , h = e[g]
          , p = f;
        d & 131072 && (p = b ? f + 16 : f - 16,
        k = e[p],
        e[p] = 0);
        T[D] = new Ja(J,G,z,r,y,A,X,k);
        D++;
        J = -1;
        if (d)
            if (d & 262144) {
                if (V(g + 1, a) || V(g + 2, a))
                    return D--,
                    !1;
                var q = e[f + 1];
                y ^= K[f + 1][q & 15];
                A ^= L[f + 1][q & 15];
                y ^= K[f - 1][q & 15];
                A ^= L[f - 1][q & 15];
                e[f - 1] = q;
                e[f + 1] = 0;
                r -= B[q & 7][0 == b ? O[f + 1] : f + 1];
                r += B[q & 7][0 == b ? O[f - 1] : f - 1];
                var u = t[f + 1];
                t[f - 1] = u;
                l[(q & 15) << 4 | u] = f - 1
            } else if (d & 524288) {
                if (V(g - 1, a) || V(g - 2, a))
                    return D--,
                    !1;
                q = e[f - 2];
                y ^= K[f - 2][q & 15];
                A ^= L[f - 2][q & 15];
                y ^= K[f + 1][q & 15];
                A ^= L[f + 1][q & 15];
                e[f + 1] = q;
                e[f - 2] = 0;
                r -= B[q & 7][0 == b ? O[f - 2] : f - 2];
                r += B[q & 7][0 == b ? O[f + 1] : f + 1];
                u = t[f - 2];
                t[f + 1] = u;
                l[(q & 15) << 4 | u] = f + 1
            }
        k ? (q = k & 15,
        w[q]--,
        u = l[q << 4 | w[q]],
        t[u] = t[p],
        l[q << 4 | t[u]] = u,
        l[q << 4 | w[q]] = 0,
        r += ea[k & 7],
        r += B[k & 7][b ? O[p] : p],
        y ^= K[p][q],
        A ^= L[p][q],
        X = 0) : (h & 7) == x && (k = f - g,
        0 > k && (k = -k),
        16 < k && (J = b ? f + 16 : f - 16),
        X = 0);
        y ^= K[g][h & 15];
        A ^= L[g][h & 15];
        y ^= K[f][h & 15];
        A ^= L[f][h & 15];
        y ^= ca;
        A ^= da;
        G &= Fa[g] & Fa[f];
        r -= B[h & 7][0 == b ? O[g] : g];
        h & 8 ? m.i[h & 7] && m.i[h & 7].length && (r -= m.i[h & 7][g]) : h & 16 && m.l[h & 7] && m.l[h & 7].length && (r -= m.l[h & 7][g]);
        t[f] = t[g];
        l[(h & 15) << 4 | t[f]] = f;
        d & 1048576 ? (k = h & -8,
        k = d & 2097152 ? k | Q : d & 4194304 ? k | N : d & 8388608 ? k | P : k | R,
        y ^= K[f][h & 15],
        A ^= L[f][h & 15],
        e[f] = k,
        y ^= K[f][k & 15],
        A ^= L[f][k & 15],
        r += B[k & 7][0 == b ? O[f] : f],
        r -= ea[x],
        r += ea[k & 7],
        b = h & 15,
        k &= 15,
        w[b]--,
        q = l[b << 4 | w[b]],
        t[q] = t[f],
        l[b << 4 | t[q]] = q,
        l[b << 4 | w[b]] = 0,
        t[f] = w[k],
        l[k << 4 | t[f]] = f,
        w[k]++) : (e[f] = e[g],
        r += B[h & 7][0 == b ? O[f] : f],
        h & 8 ? m.i[h & 7] && m.i[h & 7].length && m.i[h & 7][f] && (r += m.i[h & 7][f]) : h & 16 && m.l[h & 7] && m.l[h & 7].length && (b = m.l[h & 7][f]) && (r += b));
        e[g] = 0;
        n = a;
        r = -r;
        if ((h & 7) == v || z) {
            if (V(l[(v | 8 - n) << 4], a))
                return S(c),
                !1
        } else if (a = l[(v | 8 - n) << 4],
        ma(g, a) || p != f && ma(p, a))
            return S(c),
            !1;
        z = !1;
        131072 >= d ? (c = l[(v | n) << 4],
        z = ja(c, f),
        z || (z = ma(g, c)) || p != f && (z = ma(p, c))) : z = V(l[(v | n) << 4], 8 - n);
        za[D - 1] = y;
        X++;
        return !0
    }
    ;
    var aa = [0, 1, 3, 3, 5, 9, 900, 0, 0, 1, 3, 3, 5, 9, 900, 0];
    m.Y = function(c) {
        var b = c.from + c.to;
        c.prom && (b += c.prom);
        a: {
            c = b;
            for (var b = fa(), a = 0; a < b.length; a++) {
                var d = b[a]
                  , f = C(d & 255) + C(d >> 8 & 255);
                d & 1048576 && (f = d & 8388608 ? f + "B" : d & 2097152 ? f + "N" : d & 4194304 ? f + "Q" : f + "R");
                if (f == c) {
                    c = b[a];
                    break a
                }
            }
            b = "";
            for (a = 0; 8 > a; a++) {
                0 != a && (b += "/");
                for (f = d = 0; 8 > f; f++) {
                    var g = e[(a + 2 << 4) + f + 4];
                    if (0 == g)
                        d++;
                    else {
                        0 != d && (b += d);
                        var d = 0
                          , k = " pnbrqk ".split("")[g & 7]
                          , b = b + (0 != (g & 8) ? k.toUpperCase() : k)
                    }
                }
                0 != d && (b += d)
            }
            b += 8 == n ? " w" : " b";
            b += " ";
            0 == G ? b += "-" : (0 != (G & 1) && (b += "K"),
            0 != (G & 2) && (b += "Q"),
            0 != (G & 4) && (b += "k"),
            0 != (G & 8) && (b += "q"));
            b += " ";
            b = -1 == J ? b + "-" : b + C(J);
            throw Error("Sorry, cannot parse: " + c + " in " + b);
        }
        return c
    }
    ;
    m.N = function(c, b, a, d) {
        var e = postMessage
          , g = ba + pa
          , k = {
            lineStr: "",
            moves: [],
            end: ""
        };
        va(c, 10, k);
        e({
            id: "pv",
            ply: d,
            maxDepth: Z,
            eval: Math.round(b / 10),
            nodes: g,
            nps: g / (a / 1E3) | 0,
            pv: k,
            bestMove: na(c),
            totalTime: a
        })
    }
    ;
    m.M = function(c, b, a, d) {
        null != c && 0 != c && (m.m(c),
        postMessage({
            id: "move",
            move: na(c),
            eval: Math.round(b / 10),
            ply: d,
            totalTime: a
        }))
    }
    ;
    return m
}();
onmessage = function(C) {
    switch (C.data.cmd) {
    case "reset":
        M.I();
        break;
    case "position":
        M.I();
        M.L(C.data);
        M.K(C.data.fen);
        break;
    case "search":
        M.H = C.data.timeout;
        M.J(M.M, C.data.maxdepth || 99);
        break;
    case "analyze":
        M.H = 99999999999;
        M.J(null, 99);
        break;
    case "move":
        M.B = !1,
        M.m(M.Y(C.data.move))
    }
}
;
