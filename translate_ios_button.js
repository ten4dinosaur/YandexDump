(function() {
    (function() {
        var TranslateButtonAPI = function(t) {
            "use strict";
            var e, n, i;
            t.DetectError = void 0, (e = t.DetectError || (t.DetectError = {})).UNKNOWN_RESOURCE = "resource is unknown", e.NO_VIDEO = "video element not found", e.CANCELED = "detecting canceled", e.NO_CAPTIONS = "no captions", e.NO_ID = "could not parse id", e.NOT_IMPLEMENTED = "method not implemented", e.MAX_DURATION_EXCEEDED = "video duration exceeds maximum", e.IS_STREAM = "can't translate streams yet", e.IS_STREAM_NO_SEEK = "seek is unavailable for this stream",
                function(t) {
                    t[t.NO_SETTINGS_SUPPORT = 1] = "NO_SETTINGS_SUPPORT", t[t.SEMANTICS_SETTINGS_SUPPORT = 2] = "SEMANTICS_SETTINGS_SUPPORT", t[t.SEMANTICS_AND_UI_SETTINGS_SUPPORT = 3] = "SEMANTICS_AND_UI_SETTINGS_SUPPORT"
                }(n || (n = {})),
                function(t) {
                    t.COURSERA = "coursera", t.TIKTOK = "tiktok", t.TWITTER = "twitter", t.TWITCH = "twitch", t.YOUTUBE = "youtube", t.FACEBOOK = "facebook", t.VIMEO = "vimeo", t.VK = "vk", t.NINE_GAG = "nine_gag", t.UDEMY = "udemy", t.PORNHUB = "pornhub", t.XVIDEOS = "xvideos", t.UNKNOWN = "unknown"
                }(i || (i = {}));
            const o = {
                    "^www.coursera.org$": i.COURSERA,
                    "^(www.|m.)facebook.com$": i.FACEBOOK,
                    "^9gag.com$": i.NINE_GAG,
                    "^www.tiktok.com$": i.TIKTOK,
                    "^(www.|m.)?twitch.tv$": i.TWITCH,
                    "^(mobile.)?twitter.com$": i.TWITTER,
                    "^(player.)?vimeo.com$": i.VIMEO,
                    "^(m.)?vk.com$": i.VK,
                    "^www.udemy.com$": i.UDEMY,
                    "^(www.|m.)?youtube(-nocookie)?.com$": i.YOUTUBE,
                    "^(www.|rt.)?pornhub.com$": i.PORNHUB,
                    "^www.xvideos.com$": i.XVIDEOS
                },
                r = {
                    getLocation: () => window.location,
                    getHostname: () => window.location.hostname,
                    getHref: () => window.location.href,
                    getPathname: () => window.location.pathname,
                    getOrigin: () => window.location.origin
                },
                s = () => {
                    const t = r.getHostname();
                    for (const e in o)
                        if (Object.prototype.hasOwnProperty.call(o, e)) {
                            if (new RegExp(e).test(t)) return o[e]
                        } return i.UNKNOWN
                },
                a = async (t, e = "json") => {
                    const n = await fetch(t);
                    try {
                        const t = await n[e]();
                        if (!n.ok) throw t;
                        return t
                    } catch (t) {
                        throw new Error(`Could not parse response body ${await n.text()}.`)
                    }
                }, l = t => t.toLowerCase().split(";")[0].trim().split(/-|_/)[0], u = "https://www.coursera.org", c = /\/lecture\/(\d+|\w+)/;
            class d {
                async getCourseData(t) {
                    const e = `${u}/api/onDemandCourses.v1/${t}`;
                    let n;
                    try {
                        n = await a(e)
                    } catch (t) {
                        return {
                            coursePath: void 0,
                            language: void 0
                        }
                    }
                    return function(t) {
                        var e, n;
                        const i = null === (e = t.elements) || void 0 === e ? void 0 : e[0],
                            o = null === (n = null == i ? void 0 : i.primaryLanguageCodes) || void 0 === n ? void 0 : n[0],
                            r = o ? l(o) : void 0;
                        return {
                            coursePath: null == i ? void 0 : i.slug,
                            language: r
                        }
                    }(n)
                }
                async getDownloadLinks(t, e, n) {
                    const i = function(t, e) {
                        return `${u}/api/onDemandLectureVideos.v1/${t}~${e}?includes=video&fields=onDemandVideos.v1(sources,subtitlesVtt)`
                    }(t, e);
                    let o;
                    try {
                        o = await a(i)
                    } catch (t) {
                        return {
                            videoDownloadLink: void 0,
                            subtitlesDownloadLink: void 0
                        }
                    }
                    return function(t, e) {
                        var n, i, o, r, s;
                        const a = null === (i = null === (n = null == t ? void 0 : t.linked) || void 0 === n ? void 0 : n["onDemandVideos.v1"]) || void 0 === i ? void 0 : i[0],
                            l = null === (o = null == a ? void 0 : a.sources) || void 0 === o ? void 0 : o.byResolution,
                            c = l && Object.keys(l),
                            d = (null == c ? void 0 : c.length) ? null === (r = null == l ? void 0 : l[c[0]]) || void 0 === r ? void 0 : r.mp4VideoUrl : void 0,
                            h = e && (null === (s = null == a ? void 0 : a.subtitlesVtt) || void 0 === s ? void 0 : s[e]);
                        return {
                            videoDownloadLink: d,
                            subtitlesDownloadLink: h && `${u}${h}`
                        }
                    }(o, n)
                }
            }
            var h = {
                    languages: ["it", "en", "es", "fr", "de"]
                },
                v = ["ru"];
            const f = /(https?:\/\/[^\s]+)/gi,
                g = /[\u0430-\u044f]+/i;
            class p {
                constructor(t) {
                    this.canShowSubtitles = !1, this.canTranslateStream = !1, this.enableOverVideoPositioning = !1, this.shouldCheckCLD = !1, this.shouldWaitForLoading = !1, this.predefinedLanguages = {}, this.targetLanguages = h.languages, this.blockedLanguages = v, this.errors = [], this.forceLanguageSelect = !1, void 0 !== (null == t ? void 0 : t.forceLanguageSelect) && (this.forceLanguageSelect = t.forceLanguageSelect)
                }
                async checkIsStreamWhitelisted() {
                    return !0
                }
                async getChannelId() {
                    return ""
                }
                getLanguageFromLocalFeatures(t) {}
                async videoDataHasCyrillicCharacters(t) {
                    const [e, n] = await Promise.all([this.getTitle(t), this.getDescription(t)]);
                    return this.hasCyrillicSymbols(e) || this.hasCyrillicSymbols(n)
                }
                getTitle(t) {
                    return ""
                }
                getDescription(t) {
                    return ""
                }
                isAnAd(t) {
                    return !1
                }
                containerPositionIsStatic(t) {
                    return !1
                }
                getSubtitles(t) {
                    return []
                }
                videoIsStream(t) {
                    return !Number.isFinite(t.duration)
                }
                getAbsoluteTime(t) {}
                videoIsSeekable() {
                    return !0
                }
                async getVideoIdString(t) {
                    return ""
                }
                getVideo() {
                    if (s() === i.UNKNOWN) return !1;
                    const t = document.querySelector("video");
                    return t || !1
                }
                processResult(t) {
                    const {
                        sourceLanguage: e,
                        translationError: n
                    } = t;
                    n && this.errors.push(n);
                    const i = Boolean(e && this.targetLanguages.includes(e));
                    return {
                        sourceLanguage: e,
                        canTranslate: i,
                        translationError: i ? void 0 : this.errors.join("\n")
                    }
                }
                getCheckStages() {
                    return [{
                        check: t => this.getPredefinedLanguageResult(t)
                    }, {
                        check: t => this.getLocalApiLanguageResult(t)
                    }, {
                        check: t => this.getCyrillicLanguageResult(t)
                    }, {
                        check: t => this.getCLDLanguageResult(t),
                        shouldSkip: !this.shouldCheckCLD,
                        isFinal: this.shouldCheckCLD
                    }]
                }
                async getSourceLanguage(t) {
                    let e;
                    this.errors = [];
                    const n = this.getCheckStages();
                    for (const i of n) {
                        if (i.shouldSkip) continue;
                        const n = await i.check(t);
                        if (e = this.processResult(n), e.sourceLanguage || i.isFinal) return e
                    }
                    return this.forceLanguageSelect ? this.processResult({
                        sourceLanguage: void 0
                    }) : (e = this.processResult({
                        sourceLanguage: "en",
                        translationError: "Can not detect language, returning default"
                    }), e)
                }
                getLocalAPIError(t) {
                    return t ? `Language from local API is "${t}"` : "No language from local API"
                }
                async getLocalApiLanguageResult(t) {
                    try {
                        const e = await this.getLanguageFromLocalFeatures(t);
                        if (!e) return {
                            translationError: this.getLocalAPIError()
                        };
                        if (this.blockedLanguages.includes(e)) return {
                            sourceLanguage: e,
                            translationError: this.getLocalAPIError(e)
                        };
                        return this.targetLanguages.find((t => t === e)) ? {
                            sourceLanguage: e
                        } : {
                            sourceLanguage: e,
                            translationError: this.getLocalAPIError(e)
                        }
                    } catch (t) {
                        return {
                            translationError: String(t)
                        }
                    }
                }
                removeLinks(t) {
                    return t.replace(f, "")
                }
                hasCyrillicSymbols(t) {
                    return g.test(t)
                }
                async getCyrillicLanguageResult(t) {
                    return await this.videoDataHasCyrillicCharacters(t) ? {
                        sourceLanguage: "ru",
                        translationError: "Video data includes cyrillic characters"
                    } : {}
                }
                async getLanguageGuess(t, e = !0) {
                    var n, i, o;
                    const r = null !== (i = null === (n = window.yandex) || void 0 === n ? void 0 : n.i18n) && void 0 !== i ? i : null === (o = window.chrome) || void 0 === o ? void 0 : o.i18n;
                    if (!(null == r ? void 0 : r.detectLanguage)) return;
                    const s = await new Promise((e => r.detectLanguage(t, (t => e(t)))));
                    if (e && !s.isReliable) return;
                    if (!s.languages.length) return;
                    const a = s.languages[0];
                    return a.percentage >= 80 ? a.language : void 0
                }
                async getCLDLanguageResult(t) {
                    const e = await this.getTitle(t),
                        n = await this.getDescription(t),
                        i = await this.getLanguageGuess(e, !1),
                        o = n && n.length > 4;
                    let r;
                    if (o) {
                        const t = this.removeLinks(n);
                        r = await this.getLanguageGuess(t, !1)
                    }
                    for (const t of this.targetLanguages) {
                        const e = o && t === r;
                        if (t === i || e) return {
                            sourceLanguage: t,
                            translationError: this.getCLDError(i, r, t)
                        }
                    }
                    return {
                        sourceLanguage: i,
                        translationError: this.getCLDError(i, r, i)
                    }
                }
                getCLDError(t, e, n) {
                    const i = `Languages from CLD: title is "${t}", description is "${e}"`;
                    return n ? `${i}, detecting video language as "${n}"` : `${i}, could not detect language`
                }
                async getPredefinedLanguageResult(t) {
                    var e;
                    const n = await this.getVideoIdString(t);
                    if (!n) return {
                        translationError: "Could not retrieve video id for predefined language check"
                    };
                    for (const t in this.predefinedLanguages)
                        if (null === (e = this.predefinedLanguages[t]) || void 0 === e ? void 0 : e.includes(n)) return {
                            sourceLanguage: t,
                            translationError: "Returned predefined language"
                        };
                    return {}
                }
            }
            class m extends p {
                constructor() {
                    super(...arguments), this.currentCache = null, this.currentCacheKey = ""
                }
                async getVideoId(t) {
                    throw new Error('"getVideoId" should be implemented in derived class')
                }
                getPlayerContainer(t) {
                    throw new Error('"getPlayerContainer" should be implemented in derived class')
                }
                get newCacheKey() {
                    throw new Error('"newCacheKey" should be implemented in derived class')
                }
                async getCache() {
                    return this.currentCacheKey !== this.newCacheKey && await this.updateCache(), this.currentCache
                }
                async updateCache() {
                    throw new Error('"updateCache" should be implemented in derived class')
                }
                async getDownloadLinks() {
                    const t = await this.getCache();
                    if (!t) return {
                        videoDownloadLink: void 0,
                        subtitlesDownloadLink: void 0
                    };
                    const {
                        videoDownloadLink: e,
                        subtitlesDownloadLink: n
                    } = t;
                    return {
                        videoDownloadLink: e,
                        subtitlesDownloadLink: n
                    }
                }
            }
            const b = (t, e) => {
                let n = t,
                    i = e;
                for (; i;) {
                    if (n = n.parentElement, !n) return null;
                    i--
                }
                return n
            };
            const _ = t => new Promise((e => window.setTimeout(e, t))),
                y = async (t, e, n = !1) => {
                    let i = !1;
                    return Promise.race([new Promise((async e => {
                        for (; !t() && !i;) await _(100);
                        e()
                    })), new Promise(((t, o) => {
                        window.setTimeout((() => {
                            i = !0, n ? o(new Error(`Wait for condition reached timeout of ${e}`)) : t()
                        }), e)
                    }))])
                }, w = {
                    delay: t => ({
                        run: e => window.setTimeout(e, t),
                        cancel: t => window.clearTimeout(t)
                    }),
                    run: (t, e) => window.setTimeout(t, e),
                    cancel(t) {
                        window.clearTimeout(t)
                    }
                };
            class T {
                constructor() {
                    this.async_ = null, this.callback_ = null, this.handle_ = null
                }
                isActive() {
                    return null != this.handle_
                }
                clear_() {
                    this.async_ = null, this.callback_ = null, this.handle_ = null
                }
                setConfig_(t, e) {
                    this.async_ = t, this.callback_ = e, this.handle_ = this.async_.run((() => {
                        this.callback_ && this.callback_.call(null), this.clear_()
                    }))
                }
                flush() {
                    var t, e;
                    this.isActive() || (null !== this.handle_ && (null === (t = this.async_) || void 0 === t || t.cancel(this.handle_)), null === (e = this.callback_) || void 0 === e || e.call(null), this.clear_())
                }
                cancel() {
                    var t;
                    this.isActive() && (null !== this.handle_ && (null === (t = this.async_) || void 0 === t || t.cancel(this.handle_)), this.clear_())
                }
                static debounce(t, e, n) {
                    return t instanceof T ? t.cancel() : t = new T, t.setConfig_(e, n), t
                }
                static wrap(t, e) {
                    let n;
                    return (...i) => {
                        n = T.debounce(n, t, e.bind(this, ...i))
                    }
                }
            }
            const S = {
                Debouncer: T,
                timeOut: w
            };
            var E = {
                    getYoutubeData: async function() {
                        var t, e, n, i;

                        function o(t) {
                            if (!t) return;
                            return t.toLowerCase().split(";")[0].trim().split("-")[0]
                        }
                        async function r(t) {
                            return new Promise((e => window.setTimeout(e, t)))
                        }
                        async function s(t, e) {
                            let n = !1;
                            return Promise.race([new Promise((async e => {
                                for (; !t() && !n;) await r(100);
                                e()
                            })), new Promise((t => {
                                window.setTimeout((() => {
                                    n = !0, t()
                                }), e)
                            }))])
                        }

                        function a() {
                            return /^m\.youtube\.com$/.test(window.location.hostname)
                        }

                        function l() {
                            return document.querySelector("#movie_player")
                        }

                        function u() {
                            return a() ? document.querySelector("#app") : l()
                        }

                        function c() {
                            var t, e;
                            return Boolean(null === (e = null === (t = l()) || void 0 === t ? void 0 : t.getOptions) || void 0 === e ? void 0 : e.call(t).includes("captions"))
                        }

                        function d() {
                            var t, e, n, i;
                            return a() ? null === (e = null === (t = u()) || void 0 === t ? void 0 : t.data) || void 0 === e ? void 0 : e.playerResponse : null === (i = null === (n = u()) || void 0 === n ? void 0 : n.getPlayerResponse) || void 0 === i ? void 0 : i.call(n)
                        }

                        function h() {
                            var t;
                            return null === (t = d()) || void 0 === t ? void 0 : t.videoDetails
                        }

                        function v() {
                            var t;
                            return Boolean(null === (t = h()) || void 0 === t ? void 0 : t.isLive)
                        }

                        function f() {
                            var t, e, n, i;
                            return window.self !== window.top ? null === (e = null === (t = l()) || void 0 === t ? void 0 : t.getMediaReferenceTime) || void 0 === e ? void 0 : e.call(t) : null === (i = null === (n = l()) || void 0 === n ? void 0 : n.getProgressState) || void 0 === i ? void 0 : i.call(n).ingestionTime
                        }

                        function g(t) {
                            if (void 0 === t || !Number.isFinite(t) || t <= 0) return !1;
                            return Math.abs(Date.now() - 1e3 * t) < 864e5
                        }
                        async function p() {
                            await async function() {
                                return await s((() => c()), 100), c()
                            }() && await s((() => b().length > 0), 5e3)
                        }

                        function m(t) {
                            return "languageCode" in t
                        }

                        function b() {
                            var t, e;
                            return null !== (e = null === (t = l()) || void 0 === t ? void 0 : t.getOption("captions", "tracklist", {
                                includeAsr: !0
                            })) && void 0 !== e ? e : []
                        }
                        await async function() {
                            await s((() => Boolean(d())), 5e3)
                        }();
                        const _ = d(),
                            y = function() {
                                var t, e, n, i;
                                return null !== (i = null === (n = null === (e = null === (t = d()) || void 0 === t ? void 0 : t.captions) || void 0 === e ? void 0 : e.playerCaptionsTracklistRenderer) || void 0 === n ? void 0 : n.captionTracks) && void 0 !== i ? i : []
                            }().reduce(((t, e) => {
                                if (m(e)) {
                                    const n = o(e.languageCode),
                                        i = function(t) {
                                            const e = (null == t ? void 0 : t.url) || (null == t ? void 0 : t.baseUrl);
                                            if (e && "string" == typeof e) return function(t) {
                                                return `${t.startsWith("http")?t:`${window.location.origin}/${t}`}&fmt=json3`
                                            }(e)
                                        }(e),
                                        r = function(t) {
                                            var e, n, i;
                                            const o = (null === (e = t.name) || void 0 === e ? void 0 : e.simpleText) || (null === (i = null === (n = t.name) || void 0 === n ? void 0 : n.runs) || void 0 === i ? void 0 : i[0].text) || t.displayName || t.languageName;
                                            if (o && "string" == typeof o) return `${o}, ${window.location.hostname}`
                                        }(e);
                                    n && i && r && t.push({
                                        languageCode: n,
                                        isAutoGenerated: "asr" === (null == e ? void 0 : e.kind),
                                        title: r,
                                        url: i
                                    })
                                }
                                return t
                            }), []),
                            [w, T] = await Promise.all([async function() {
                                if (!v()) return;
                                await s((() => g(f())), 5e3);
                                const t = f();
                                return g(t) ? t : void 0
                            }(), async function(t) {
                                let e;
                                return v() ? (await p(), e = b()) : e = t, e.reduce(((t, e) => {
                                    if (m(e)) {
                                        const n = o(e.languageCode);
                                        n && t.push({
                                            languageCode: n,
                                            isAutoGenerated: (null == e ? void 0 : e.isAutoGenerated) || "asr" === (null == e ? void 0 : e.kind)
                                        })
                                    }
                                    return t
                                }), [])
                            }(y)]);
                        return {
                            videoId: null === (t = null == _ ? void 0 : _.videoDetails) || void 0 === t ? void 0 : t.videoId,
                            title: null === (e = null == _ ? void 0 : _.videoDetails) || void 0 === e ? void 0 : e.title,
                            description: null === (n = null == _ ? void 0 : _.videoDetails) || void 0 === n ? void 0 : n.shortDescription,
                            tracks: y,
                            tracksInfo: T,
                            isStream: v(),
                            absoluteTime: w,
                            isLiveDvrEnabled: function() {
                                var t;
                                return Boolean(null === (t = h()) || void 0 === t ? void 0 : t.isLiveDvrEnabled)
                            }(),
                            channelId: null === (i = null == _ ? void 0 : _.videoDetails) || void 0 === i ? void 0 : i.channelId
                        }
                    }
                },
                A = {
                    ru: ["1nAvQa5zbIc", "QkZJ9X0UJQs", "TYP72BKy8UI", "PXrZ4X9834Q", "lTKoaY9H_Yw", "udF9dUmwZMU"],
                    en: ["itcMLwMEeMQ", "Fz9pNRmPmUs"],
                    fr: ["gh6nK1MFo0I", "_-y_sAlWSC4"],
                    de: ["Xww_oaafCBA"]
                };
            const C = [{
                id: "UCjXIw1GlwaY1IzpW_jN9iCQ",
                name: "The Overlap"
            }, {
                id: "UCt15-P7HWMVXImmysnse6HQ",
                name: "PlanesTV"
            }, {
                id: "UCAuUUnT6oDeKwE6v1NGQxug",
                name: "TED"
            }, {
                id: "UCsT0YIqwnpJCM-mx7-gSA4Q",
                name: "TEDx Talks"
            }, {
                id: "UCLyr-hfWVCKHcZjV5fg3jbw",
                name: "English Speeches"
            }, {
                id: "UCEh_IoMVGA7NPsx6-2H8Bqw",
                name: "Pixologic ZBrush"
            }, {
                id: "UCLA_DiR1FfKNvjuUpBHmylQ",
                name: "NASA"
            }, {
                id: "UCtI0Hodo5o5dUb67FeUjDeA",
                name: "SpaceX"
            }, {
                id: "UCcyq283he07B7_KUX07mmtA",
                name: "Business Insider"
            }, {
                id: "UCN-qfPKTQ_Wxr8vZLVfM95w",
                name: "FREENVESTING"
            }, {
                id: "UCUMZ7gohGI9HcU9VNsr2FJQ",
                name: "Bloomberg Quicktake: Originals"
            }, {
                id: "UCCjyq_K1Xwfg8Lndy7lKMpA",
                name: "TechCrunch"
            }, {
                id: "UCK8sQmJBp8GCxrOtXWBpyEA",
                name: "Google"
            }, {
                id: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
                name: "Google Developers"
            }, {
                id: "UCE_M8A5yxnLfW0KghEeajjw",
                name: "Apple"
            }, {
                id: "UCmKtn_HvpfbTu3QV4lhJIMw",
                name: "CNET Highlights"
            }, {
                id: "UCFtEEv80fQVKkD4h1PF-Xqw",
                name: "Microsoft"
            }, {
                id: "UCWwgaK7x0_FR1goeSRazfsQ",
                name: "Samsung"
            }, {
                id: "UCjBp_7RuDBUYbd1LegWEJ8g",
                name: "Xbox"
            }, {
                id: "UCc3pNIRzIZ8ynI38GO6H01Q",
                name: "Microsoft 365"
            }, {
                id: "UCE5_hf5ONW6_qy9ShfYfB4w",
                name: "Apple Canada"
            }, {
                id: "UCfJcxY7o1UjUQE4oObwritw",
                name: "Apple UK"
            }, {
                id: "UCCspJ6mFfCwOV4qFjZWi2wg",
                name: "Xiaomi Launch October 2022"
            }, {
                id: "UCIG1k8umaCIIrujZPzZPIMA",
                name: "Made by Google"
            }, {
                id: "UCKy1dAqELo0zrOtPkf0eTMw",
                name: "IGN"
            }, {
                id: "UCqDS7KWjAPKv-7ZSlro9OiQ",
                name: "thegameawards"
            }, {
                id: "UC-2Y8dQb0S6DtpxNgAKoJKA",
                name: "PlayStation"
            }, {
                id: "UCIHBybdoneVVpaQK7xMz1ww",
                name: "Electronic Arts"
            }, {
                id: "UCiAInBL9kUzz1XRxk66v-gw",
                name: "Overwatch League"
            }, {
                id: "UC_2ssfYkqHtK0lEr8UE9lOA",
                name: "Overwatch 2 Pro Spotlight"
            }, {
                id: "UC5jpxDZx4yoBo324pMQ91Ww",
                name: "PGL"
            }, {
                id: "UCTQKT5QqO3h7y32G8VzuySQ",
                name: "dota2"
            }].map((({
                id: t
            }) => t));
            const I = "https://www.udemy.com",
                L = /\/lecture\/(\d+|\w+)/;
            class O {
                async getCourseData(t) {
                    const e = `${I}/api-2.0/courses/${t}?fields[course]=title,locale,url`;
                    let n;
                    try {
                        n = await a(e)
                    } catch (t) {
                        return {
                            coursePath: void 0,
                            language: void 0
                        }
                    }
                    return function(t) {
                        var e;
                        const n = null === (e = t.locale) || void 0 === e ? void 0 : e.locale,
                            i = n ? l(n) : void 0;
                        return {
                            coursePath: t.url,
                            language: i
                        }
                    }(n)
                }
                async getDownloadLinks(t, e, n) {
                    const i = function(t, e) {
                        return `${I}/api-2.0/users/me/subscribed-courses/${t}/lectures/${e}?fields[lecture]=asset&fields[asset]=media_sources,captions,download_urls`
                    }(t, e);
                    let o;
                    try {
                        o = await a(i)
                    } catch (t) {
                        return {
                            videoDownloadLink: void 0,
                            subtitlesDownloadLink: void 0
                        }
                    }
                    return function(t, e) {
                        var n, i, o, r;
                        const s = t.asset,
                            a = null === (n = null == s ? void 0 : s.download_urls) || void 0 === n ? void 0 : n.Video,
                            u = null !== (o = null === (i = null == a ? void 0 : a[0]) || void 0 === i ? void 0 : i.file) && void 0 !== o ? o : void 0;
                        let c;
                        if (e) {
                            const t = null === (r = null == s ? void 0 : s.captions) || void 0 === r ? void 0 : r.find((t => ((null == t ? void 0 : t.locale_id) && l(null == t ? void 0 : t.locale_id)) === e));
                            c = null == t ? void 0 : t.url
                        }
                        return {
                            videoDownloadLink: u,
                            subtitlesDownloadLink: c
                        }
                    }(o, n)
                }
            }
            const P = {
                    [i.YOUTUBE]: class extends p {
                        constructor() {
                            super(...arguments), this.canShowSubtitles = !0, this.canTranslateStream = !0, this.enableOverVideoPositioning = this.isEmbedded(), this.shouldCheckCLD = !0, this.shouldWaitForLoading = !0, this.predefinedLanguages = A, this.youtubeData = E.getYoutubeData()
                        }
                        async checkIsStreamWhitelisted() {
                            if (!await this.videoIsStream()) return !1;
                            const {
                                channelId: t
                            } = await this.youtubeData;
                            return !!t && C.includes(t)
                        }
                        async getChannelId() {
                            return (await this.youtubeData).channelId || ""
                        }
                        async getVideoId(t) {
                            const e = await this.getVideoIdString();
                            return !!e && `https://youtu.be/${e}`
                        }
                        isMobile() {
                            return /^m\.youtube\.com$/.test(r.getHostname())
                        }
                        getAutoGeneratedCaptions(t) {
                            if (null == t ? void 0 : t.length) return t.find((t => t.isAutoGenerated))
                        }
                        normalizeLanguage(t) {
                            if (!t) return;
                            const e = t.indexOf(".");
                            return -1 === e ? t : t.substring(e + 1)
                        }
                        async getLanguageFromLocalFeatures() {
                            const t = await this.getTracksInfo(),
                                e = this.getAutoGeneratedCaptions(t);
                            return this.normalizeLanguage(null == e ? void 0 : e.languageCode)
                        }
                        isAnAd(t) {
                            const e = this.getPlayer(t);
                            return !!e && e.classList.contains("ad-showing")
                        }
                        async videoIsSeekable() {
                            return (await this.youtubeData).isLiveDvrEnabled
                        }
                        getPlayer(t) {
                            return t.closest(".html5-video-player")
                        }
                        getPlayerContainer(t) {
                            return this.isMobile() ? t.closest("#player-container-id") : this.isEmbedded() ? t.closest("#movie_player") : t.closest("#player-container")
                        }
                        getAdContainer() {
                            return document.querySelector("ytm-companion-ad-renderer")
                        }
                        isEmbedded() {
                            return window.self !== window.top
                        }
                        async getTitle() {
                            var t;
                            return null !== (t = (await this.youtubeData).title) && void 0 !== t ? t : ""
                        }
                        async getDescription() {
                            var t;
                            return null !== (t = (await this.youtubeData).description) && void 0 !== t ? t : ""
                        }
                        async getTracksInfo() {
                            return (await this.youtubeData).tracksInfo
                        }
                        async getSubtitles() {
                            return (await this.youtubeData).tracks
                        }
                        async videoIsStream() {
                            return (await this.youtubeData).isStream
                        }
                        async getAbsoluteTime() {
                            return (await this.youtubeData).absoluteTime
                        }
                        async getVideoIdString() {
                            return (await this.youtubeData).videoId
                        }
                    },
                    [i.TWITTER]: class extends p {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = !0
                        }
                        getVideoId(t) {
                            const e = this.getTweetPath(t);
                            return e || !1
                        }
                        getPlayerContainer(t) {
                            return t.closest("div")
                        }
                        getTweet(t) {
                            return t.closest("article")
                        }
                        getTweetPath(t) {
                            var e;
                            const n = this.getTweet(t),
                                i = null == n ? void 0 : n.querySelector('a[href*="/status/"]');
                            return null !== (e = null == i ? void 0 : i.href) && void 0 !== e ? e : ""
                        }
                    },
                    [i.TWITCH]: class extends p {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = !this.isMobile(), this.twitchTargetLanguages = {
                                English: "en",
                                \u0410\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439: "en",
                                Espaсol: "es",
                                Spanish: "es",
                                \u0418\u0441\u043f\u0430\u043d\u0441\u043a\u0438\u0439: "es",
                                Franзais: "fr",
                                French: "fr",
                                \u0424\u0440\u0430\u043d\u0446\u0443\u0437\u0441\u043a\u0438\u0439: "fr",
                                Deutsch: "de",
                                German: "de",
                                \u041d\u0435\u043c\u0435\u0446\u043a\u0438\u0439: "de",
                                Italiano: "it",
                                Italian: "it",
                                \u0418\u0442\u0430\u043b\u044c\u044f\u043d\u0441\u043a\u0438\u0439: "it"
                            }, this.twitchBlockedLanguages = {
                                Russian: "ru",
                                \u0420\u0443\u0441\u0441\u043a\u0438\u0439: "ru",
                                Russo: "ru",
                                Russe: "ru",
                                Russisch: "ru"
                            }
                        }
                        getVideoId(t) {
                            const e = this.getIdFormLink();
                            return e || !1
                        }
                        async getLanguageFromLocalFeatures(t) {
                            const e = this.getTags();
                            for (const t of e) {
                                for (const e of Object.keys(this.twitchBlockedLanguages))
                                    if (t === e) return this.twitchBlockedLanguages[e];
                                for (const e of Object.keys(this.twitchTargetLanguages))
                                    if (t === e) return this.twitchTargetLanguages[e]
                            }
                        }
                        getPlayerContainer(t) {
                            return this.isMobile() ? t.closest("section") : t.closest(".video-ref")
                        }
                        isMobile() {
                            return /^m\.twitch\.tv$/.test(r.getHostname())
                        }
                        getTags() {
                            return [...document.body.querySelectorAll('div[class^="ScTag"]')].map((t => {
                                var e;
                                return null !== (e = t.textContent) && void 0 !== e ? e : ""
                            }))
                        }
                        async getTitle(t) {
                            const e = this.isMobile() ? "p[title]" : '[data-a-target="stream-title"]';
                            let n = document.querySelector(e);
                            return n || await y((() => null !== document.querySelector(e)), 1e4), n = document.querySelector(e), (null == n ? void 0 : n.textContent) ? n.textContent : ""
                        }
                        getIdFormLink() {
                            if (this.isMobile()) {
                                const t = document.head.querySelector('link[rel="canonical"');
                                return t && t.href.includes("/videos/") ? t.href : ""
                            }
                            const t = document.querySelector('a[href*="#sideNav"]');
                            return t && t.href.includes("/videos/") ? t.href.replace("#sideNav", "") : ""
                        }
                        containerPositionIsStatic(t) {
                            const e = this.getPlayerContainer(t);
                            return !!e && "static" === getComputedStyle(e).position
                        }
                    },
                    [i.TIKTOK]: class extends p {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = !0
                        }
                        getVideoId(t) {
                            const e = this.getVideoIdFromLink(t);
                            return e || !1
                        }
                        async videoDataHasCyrillicCharacters(t) {
                            const e = this.getDescriptionElement(t),
                                n = this.getDescriptionText(e),
                                i = this.getTagsText(e);
                            return this.hasCyrillicSymbols(n) || this.hasCyrillicSymbols(i)
                        }
                        getPlayerContainer(t) {
                            return t.closest("section")
                        }
                        getPost(t) {
                            return t.closest("\n      .feed-item-content,\n      .video-card-big,\n      .home\n    ")
                        }
                        getDescriptionElement(t) {
                            const e = this.getPost(t);
                            return e ? e.querySelector("\n      h1.bottom-desc,\n      h1.video-meta-title,\n      div.tt-video-meta-caption\n    ") : null
                        }
                        getDescriptionText(t) {
                            var e;
                            if (!t) return "";
                            const n = [...t.children].find((t => "A" !== t.tagName));
                            return null !== (e = null == n ? void 0 : n.textContent) && void 0 !== e ? e : ""
                        }
                        getTagsText(t) {
                            if (!t) return "";
                            return [...t.children].filter((t => "A" === t.tagName)).map((t => {
                                var e;
                                return (null !== (e = t.textContent) && void 0 !== e ? e : "").replace("#", "")
                            })).join(" ")
                        }
                        getVideoIdFromLink(t) {
                            const e = this.getPost(t),
                                n = null == e ? void 0 : e.querySelector(".item-video-card-wrapper");
                            return n ? n.href : r.getPathname().includes("/video/") ? `${r.getOrigin()}${r.getPathname()}` : ""
                        }
                    },
                    [i.FACEBOOK]: class extends p {
                        getVideoId(t) {
                            const e = this.getPostId(t);
                            return !!e && `https://www.facebook.com/watch/?v=${e}`
                        }
                        getPlayerContainer(t) {
                            var e;
                            return null !== (e = b(t, 2)) && void 0 !== e ? e : null
                        }
                        isMobile() {
                            return /^m\.facebook\.com$/.test(r.getHostname())
                        }
                        getPost(t) {
                            return this.isMobile() ? b(t, 6) : b(t, 12)
                        }
                        getPostId(t) {
                            var e;
                            const n = new URL(r.getHref());
                            if ("/watch/" === n.pathname && n.searchParams.has("v") && t === document.querySelector("video")) return null !== (e = n.searchParams.get("v")) && void 0 !== e ? e : "";
                            const i = this.getPost(t);
                            if (!i) return "";
                            const o = i.getAttribute("data-store");
                            if (o) try {
                                const t = JSON.parse(o).share_id;
                                if (t) return t
                            } catch (t) {}
                            const s = i.querySelector('a[href*="/videos/"]');
                            if (s) {
                                const t = s.href.match(/www\.facebook\.com\/[^/]+\/videos\/[a-zA-Z\d]+/);
                                if (!t) return "";
                                const e = t[0].split("/");
                                return e[e.length - 1]
                            }
                            return ""
                        }
                    },
                    [i.NINE_GAG]: class extends p {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = !0
                        }
                        getVideoId(t) {
                            const e = this.getPostLink(t);
                            return !!e && `https://9gag.com/gag/${e}`
                        }
                        getPlayerContainer(t) {
                            return t.closest("div")
                        }
                        getPost(t) {
                            return t.closest("article")
                        }
                        getTitle(t) {
                            var e;
                            const n = this.getPost(t),
                                i = null == n ? void 0 : n.querySelector("header h1, header h3");
                            return i && null !== (e = i.textContent) && void 0 !== e ? e : ""
                        }
                        getPostLink(t) {
                            const e = t.getAttribute("poster");
                            if (!e) return "";
                            const n = e.match(/img-9gag-fun\.9cache\.com\/photo\/[a-zA-Z\d]+/);
                            if (!n) return "";
                            const i = n[0].split("/");
                            return i[i.length - 1]
                        }
                    },
                    [i.VIMEO]: class extends p {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = this.isEmbedded() || !this.isMobile(), this.shouldCheckCLD = !0, this.getConfigUrl = t => `https://player.vimeo.com/video/${t}/config`, this.getOembedDataUrl = t => `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${t}`
                        }
                        isEmbedded() {
                            return /^player\.vimeo\.com$/.test(r.getHostname())
                        }
                        isMobile() {
                            var t;
                            return null === (t = window.vimeo) || void 0 === t ? void 0 : t.is_mobile
                        }
                        getVideoIdNumber(t) {
                            return this.isEmbedded() ? this.getIdFromEmbed() : this.getIdFromPlayer(t)
                        }
                        getVideoId(t) {
                            const e = this.getVideoIdNumber(t);
                            return !!e && `https://vimeo.com/${e}`
                        }
                        getIdFromPlayer(t) {
                            const e = this.getPlayerContainer(t),
                                n = (null == e ? void 0 : e.hasAttribute("data-clip-id")) ? e.getAttribute("data-clip-id") : null == e ? void 0 : e.id;
                            return null != n ? n : ""
                        }
                        getIdFromEmbed() {
                            const t = new URL(r.getHref()).pathname.split("/"),
                                e = t[t.length - 1];
                            return null != e ? e : ""
                        }
                        getPlayerContainer(t) {
                            return t.closest(".player")
                        }
                        getAdContainer() {
                            return null
                        }
                        async getTitle(t) {
                            var e, n, i;
                            const o = this.getVideoIdNumber(t);
                            if (!o) return "";
                            const r = await this.getVideoData(o);
                            if (null == r ? void 0 : r.title) return r.title;
                            const s = '\n      #main h1,\n      h1.js-title.title a.title_text,\n      [class^="VideoName__ViewTitle"]\n    ';
                            return await y((() => Boolean(document.querySelector(s))), 5e3), null !== (i = null === (n = null === (e = document.querySelector(s)) || void 0 === e ? void 0 : e.textContent) || void 0 === n ? void 0 : n.trim()) && void 0 !== i ? i : ""
                        }
                        async getDescription(t) {
                            var e;
                            const n = this.getVideoIdNumber(t);
                            try {
                                return null !== (e = (await (await fetch(this.getOembedDataUrl(n))).json()).description) && void 0 !== e ? e : ""
                            } catch (t) {
                                return ""
                            }
                        }
                        hasReferenceLanguage(t, e) {
                            if (!t) return !1;
                            const n = l(t);
                            return e.some((t => n === t))
                        }
                        getReferenceCaptionsLanguage(t, e) {
                            var n;
                            if (null == t ? void 0 : t.length)
                                for (const i of t) {
                                    let t = null !== (n = i.lang) && void 0 !== n ? n : i.language;
                                    if (t && (t = l(t), ("subtitles" === i.kind || "captions" === i.kind) && e.includes(t))) return t
                                }
                        }
                        async getLanguageFromLocalFeatures(t) {
                            const e = this.getVideoIdNumber(t);
                            if (!e) return;
                            const n = await this.getVideoData(e),
                                i = null == n ? void 0 : n.lang;
                            if (i) return i;
                            const o = this.getReferenceCaptionsLanguage(null == n ? void 0 : n.captions, this.targetLanguages);
                            return o || void 0
                        }
                        async videoDataHasCyrillicCharacters(t) {
                            const e = await this.getTitle(t),
                                n = await this.getDescription(t);
                            return this.hasCyrillicSymbols(e) || this.hasCyrillicSymbols(n)
                        }
                        async requestVideoData(t) {
                            try {
                                const e = this.getConfigUrl(t),
                                    n = await (await fetch(e)).json();
                                return {
                                    id: n.video.id,
                                    lang: n.video.lang,
                                    title: n.video.title,
                                    captions: n.request.text_tracks
                                }
                            } catch (t) {
                                return
                            }
                        }
                        getVideoDataFromInlineScript(t) {
                            var e, n, i;
                            const o = document.body.querySelector("script");
                            if (o) try {
                                let r = o.innerText;
                                r = r.substring(r.indexOf("{") + 1, r.lastIndexOf("}") - 1), r = r.substring(r.indexOf("{")), r = r.substr(0, r.indexOf("; if (!config.request)"));
                                const s = JSON.parse(r);
                                if (!s) return;
                                return {
                                    id: parseInt(t, 10),
                                    lang: null === (e = s.video) || void 0 === e ? void 0 : e.lang,
                                    title: null === (n = s.video) || void 0 === n ? void 0 : n.title,
                                    captions: null === (i = s.request) || void 0 === i ? void 0 : i.text_tracks
                                }
                            } catch (t) {
                                return
                            }
                        }
                        async getVideoDataFromWindowApiMobile(t) {
                            Object.keys(window.vimeo.mobile.player_objects).length || await y((() => Object.keys(window.vimeo.mobile.player_objects).length > 0), 2e4);
                            const e = window.vimeo.mobile.player_objects;
                            return Object.keys(e).map((t => {
                                const n = e[t];
                                return {
                                    id: n.videoId,
                                    lang: n.config.video.lang,
                                    title: n.videoTitle,
                                    captions: n.textTracks
                                }
                            })).find((e => String(e.id) === t))
                        }
                        async getVideoDataFromWindowApiDesktop(t) {
                            Object.keys(window.vimeo.clips).length || await y((() => Object.keys(window.vimeo.clips).length > 0), 2e4);
                            const e = window.vimeo.clips;
                            return Object.keys(e).map((t => {
                                const n = e[t];
                                return {
                                    id: n.video.id,
                                    lang: n.video.lang,
                                    title: n.video.title,
                                    captions: n.request.text_tracks
                                }
                            })).find((e => String(e.id) === t))
                        }
                        async getVideoDataFromWindowApi(t) {
                            return this.isMobile() ? this.getVideoDataFromWindowApiMobile(t) : this.getVideoDataFromWindowApiDesktop(t)
                        }
                        async getVideoData(t) {
                            const e = await this.requestVideoData(t);
                            return e || (this.isEmbedded() ? this.getVideoDataFromInlineScript(t) : this.getVideoDataFromWindowApi(t))
                        }
                    },
                    [i.COURSERA]: class extends m {
                        constructor() {
                            super(...arguments), this.currentCache = null, this.service = new d
                        }
                        async getVideoId(t) {
                            const e = await this.getCache();
                            return !(!(null == e ? void 0 : e.coursePath) || !this.itemId) && `${u}/learn/${e.coursePath}/lecture/${this.itemId}`
                        }
                        getPlayerContainer(t) {
                            const e = t.closest(".video-main-player-container");
                            if (e) {
                                const t = e.firstElementChild;
                                if (t) return t
                            }
                            return null
                        }
                        async getLanguageFromLocalFeatures(t) {
                            const e = await this.getCache();
                            if (e) return e.language
                        }
                        get courseId() {
                            var t;
                            return null === (t = window.coursera) || void 0 === t ? void 0 : t.courseId
                        }
                        get itemId() {
                            var t;
                            return null === (t = r.getHref().match(c)) || void 0 === t ? void 0 : t[1]
                        }
                        get newCacheKey() {
                            return `${this.courseId}_${this.itemId}`
                        }
                        async updateCache() {
                            if (!this.courseId || !this.itemId) return;
                            this.currentCacheKey = this.newCacheKey;
                            const t = await this.service.getCourseData(this.courseId),
                                e = await this.service.getDownloadLinks(this.courseId, this.itemId, t.language);
                            this.currentCache = Object.assign(Object.assign({}, t), e)
                        }
                    },
                    [i.UDEMY]: class extends m {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = !0, this.currentCache = null, this.service = new O
                        }
                        async getVideoId(t) {
                            const e = await this.getCache();
                            return !(!(null == e ? void 0 : e.coursePath) || !this.itemId) && `${I}${e.coursePath}/learn/lecture/${this.itemId}`
                        }
                        getPlayerContainer(t) {
                            var e;
                            return null !== (e = t.closest("div")) && void 0 !== e ? e : null
                        }
                        async getLanguageFromLocalFeatures(t) {
                            const e = await this.getCache();
                            if (e) return e.language
                        }
                        get courseId() {
                            var t;
                            const e = document.querySelector('[data-module-id="course-taking"]'),
                                n = null === (t = null == e ? void 0 : e.dataset) || void 0 === t ? void 0 : t.moduleArgs;
                            if (n) try {
                                return JSON.parse(n).courseId
                            } catch (t) {
                                return
                            }
                        }
                        get itemId() {
                            var t;
                            return null === (t = r.getHref().match(L)) || void 0 === t ? void 0 : t[1]
                        }
                        get newCacheKey() {
                            return `${this.courseId}_${this.itemId}`
                        }
                        async updateCache() {
                            if (!this.courseId || !this.itemId) return;
                            this.currentCacheKey = this.newCacheKey;
                            const t = await this.service.getCourseData(this.courseId),
                                e = await this.service.getDownloadLinks(this.courseId, this.itemId, t.language);
                            this.currentCache = Object.assign(Object.assign({}, t), e)
                        }
                    },
                    [i.VK]: class extends p {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = !0, this.shouldCheckCLD = !0
                        }
                        getVideoId(t) {
                            const e = this.getDataCanonical(t);
                            if (e) return e;
                            const n = this.getVideoIdFromDOM(t);
                            return !!n && `https://vk.com/video?z=video${n}`
                        }
                        getPlayerContainer(t) {
                            return t.closest("div")
                        }
                        getDataCanonical(t) {
                            const e = t.closest("[data-canonical]"),
                                n = null == e ? void 0 : e.getAttribute("data-canonical");
                            return null != n ? n : ""
                        }
                        getVideoIdFromDOM(t) {
                            var e;
                            const n = t.closest("#video_player"),
                                i = null === (e = null == n ? void 0 : n.parentElement) || void 0 === e ? void 0 : e.id;
                            return i ? i.replace("video_box_wrap", "") : ""
                        }
                        getPost(t) {
                            return t.closest("#mv_box, #mcont")
                        }
                        getTitle(t) {
                            var e;
                            const n = this.getPost(t),
                                i = null == n ? void 0 : n.querySelector("#mv_title, .VideoPageInfoRow__title");
                            return i && null !== (e = i.textContent) && void 0 !== e ? e : ""
                        }
                        containerPositionIsStatic(t) {
                            const e = this.getPlayerContainer(t);
                            return !!e && "static" === getComputedStyle(e).position
                        }
                    },
                    [i.PORNHUB]: class extends p {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = !0
                        }
                        getVideoId(t) {
                            var e;
                            const n = null === (e = document.querySelector('link[rel="canonical"]')) || void 0 === e ? void 0 : e.href,
                                i = n && new URL(n),
                                o = null == i ? void 0 : i.search;
                            return !!o && `https://www.pornhub.com/view_video.php${o}`
                        }
                        getPlayerContainer(t) {
                            return t.closest("div")
                        }
                        getTitle(t) {
                            var e, n;
                            return (null === (e = window.VIDEO_SHOW) || void 0 === e ? void 0 : e.videoTitleOriginal) || (null === (n = window.flashvars) || void 0 === n ? void 0 : n.video_title) || ""
                        }
                    },
                    [i.XVIDEOS]: class extends p {
                        constructor() {
                            super(...arguments), this.enableOverVideoPositioning = !0
                        }
                        getVideoId(t) {
                            var e;
                            const n = r.getHref().includes("embedframe") ? /\/embedframe\/(\d+)/ : /\/video(\d+)\//,
                                i = null === (e = r.getPathname().match(n)) || void 0 === e ? void 0 : e[1];
                            return !!i && `https://www.xvideos.com/video${i}/_`
                        }
                        getPlayerContainer(t) {
                            return t.closest("div")
                        }
                        getTitle(t) {
                            var e, n, i;
                            const o = null === (i = null === (n = null === (e = window.xv) || void 0 === e ? void 0 : e.conf) || void 0 === n ? void 0 : n.dyn) || void 0 === i ? void 0 : i.video_title_ori;
                            return o ? function(t) {
                                const e = document.createElement("div");
                                return e.innerHTML = t, e.textContent
                            }(o) : ""
                        }
                    },
                    [i.UNKNOWN]: null
                },
                x = t => {
                    const e = P[s()];
                    return e ? new e(t) : null
                };
            class k extends Error {
                constructor(t = "Assertion failed") {
                    super(t)
                }
            }
            var N;
            ! function(t) {
                t.SNAKE = "snake", t.CAMEL = "camel"
            }(N || (N = {}));
            const D = t => t.replace(/[A-Z]/g, (t => `_${t.toLowerCase()}`));
            class R {
                constructor(t) {
                    this.format = t
                }
                getError(t) {
                    return ((t, e) => {
                        for (const n in t)
                            if (Object.prototype.hasOwnProperty.call(t, n)) {
                                let i;
                                switch (e) {
                                    case N.CAMEL:
                                        i = n.replace(/_[a-z]/g, (t => `${t[1].toUpperCase()}`));
                                        break;
                                    case N.SNAKE:
                                        i = D(n);
                                        break;
                                    default:
                                        i = n
                                }
                                n !== i && (t[i] = t[n], delete t[n])
                            } return t
                    })("string" == typeof t ? {
                        error: t,
                        subtitlesError: t,
                        translationError: t
                    } : t, this.format)
                }
            }
            const M = t => t instanceof HTMLVideoElement && "VIDEO" === t.tagName;

            function H() {
                return document.querySelector("#movie_player")
            }

            function V() {
                return /^m\.youtube\.com$/.test(window.location.hostname)
            }

            function B() {
                return V() ? document.querySelector("#app") : H()
            }
            const $ = async t => {
                var e;
                const n = H();
                if (!t || !n) return !1;
                const i = function() {
                        var t, e, n, i;
                        return V() ? null === (e = null === (t = B()) || void 0 === t ? void 0 : t.data) || void 0 === e ? void 0 : e.playerResponse : null === (i = null === (n = B()) || void 0 === n ? void 0 : n.getPlayerResponse) || void 0 === i ? void 0 : i.call(n)
                    }(),
                    o = null == i ? void 0 : i.videoDetails,
                    r = null == o ? void 0 : o.isLive,
                    s = null == o ? void 0 : o.isLiveDvrEnabled,
                    a = () => {
                        var e;
                        return Boolean((null === (e = n.getCurrentTime) || void 0 === e ? void 0 : e.call(n)) && t.currentTime)
                    };
                if (i && o && r && !s && a()) {
                    o.isLiveDvrEnabled = !0;
                    try {
                        null === (e = n.loadVideoByPlayerVars) || void 0 === e || e.call(n, {
                            raw_player_response: i
                        }, 1)
                    } catch (t) {}
                    await y(a, 1e4)
                }
                return !0
            }, U = t => t.canTranslate && (!t.stream || t.streamWhitelisted);
            var F, j, W, G, z, q, Z;
            ! function(t) {
                t.HIDDEN = "hidden", t.AVAILABLE = "available", t.ACTIVATED = "activated"
            }(F || (F = {})),
            function(t) {
                t.MINIMIZING = "minimizing"
            }(j || (j = {})),
            function(t) {
                t.DIRECTION = "--minimizing-animation-direction", t.MAX_WIDTH = "--minimizing-max-width", t.PADDING_RIGHT = "--minimizing-padding-right"
            }(W || (W = {})),
            function(t) {
                t.ANIMATE_STATE_CHANGE_FINAL_TEXT = "animate-state-change-final-text", t.ANIMATE_STATE_CHANGE_INITIAL_TEXT = "animate-state-change-initial-text"
            }(G || (G = {})),
            function(t) {
                t.PROCESSING = "processing"
            }(z || (z = {})),
            function(t) {
                t.IN_QUEUE = "in_queue"
            }(q || (q = {})),
            function(t) {
                t.FORCED_PROCESSING = "forced_processing"
            }(Z || (Z = {}));
            const X = Object.freeze(Object.assign(Object.assign({}, z), q)),
                K = Object.freeze(Object.assign(Object.assign({}, z), Z)),
                Q = Object.freeze(Object.assign(Object.assign(Object.assign({}, z), q), Z));
            var Y;
            ! function(t) {
                t.STREAM_AVAILABLE = "stream_available"
            }(Y || (Y = {}));
            const J = Object.freeze(Object.assign(Object.assign(Object.assign({}, F), Q), Y));
            var tt, et, nt, it;
            ! function(t) {
                t.TRANSLATION_LABEL_WIDTH = "--translation-label-width"
            }(tt || (tt = {})),
            function(t) {
                t.LOGO_CONTAINER_PADDING_LEFT = "--minimizing-logo-container-padding-left", t.LOGO_CONTAINER_MAX_WIDTH = "--minimizing-logo-container-max-width"
            }(et || (et = {})),
            function(t) {
                t.ANIMATE_MINIMIZING_LOGO_CONTAINER = "animate-minimizing-logo-container"
            }(nt || (nt = {})),
            function(t) {
                t.N_MINUTES = "n_minutes", t.MORE_THAN_HOUR = "more_than_hour"
            }(it || (it = {}));
            const ot = () => window.self !== window.top;
            const rt = (t, e, n) => {
                    if (!t) return null;
                    const i = (o = t) && Boolean(o.host && o.mode) ? t.host : t;
                    var o;
                    const r = `${`${i.tagName}_${i.id}_${i.className}`}_${e}`;
                    return n[r] || (n[r] = t.querySelector(e)), n[r]
                },
                st = t => (e, n) => rt(e, n, t),
                at = t => +(1 * t).toFixed(2);
            var lt, ut;
            t.TranslationState = void 0, (lt = t.TranslationState || (t.TranslationState = {})).HIDDEN = "hidden", lt.AVAILABLE = "available", lt.PROCESSING = "processing", lt.FORCED_PROCESSING = "forced_processing", lt.ACTIVATED = "activated", lt.ERROR = "error", lt.NO_TRANSLATION = "no_translation", lt.IN_QUEUE = "in_queue", lt.OTHER_ERROR = "other_error",
                function(t) {
                    t.PORTRAIT = "portrait", t.LANDSCAPE = "landscape"
                }(ut || (ut = {}));
            const ct = at(18),
                dt = {
                    translation: t.TranslationState.HIDDEN,
                    subtitles: t.TranslationState.HIDDEN,
                    settings: t.TranslationState.HIDDEN
                };
            class ht {
                constructor(t) {
                    this.cssText = t
                }
                toString() {
                    return this.cssText
                }
            }
            const vt = t => new ht(String(t)),
                ft = (t, ...e) => {
                    const n = e.reduce(((e, n, i) => {
                        return e + ((o = n) instanceof ht ? o.cssText : "number" == typeof o ? o : "") + t[i + 1];
                        var o
                    }), t[0]);
                    return new ht(n).toString()
                };
            var gt, pt, mt;
            ! function(t) {
                t.SUBTITLES_LABEL_WIDTH = "--subtitles-label-width"
            }(gt || (gt = {})),
            function(t) {
                t.LEFT = "left", t.CENTER = "center", t.RIGHT = "right"
            }(pt || (pt = {})),
            function(t) {
                t.MOVEMENT_TO_POINTER = "movement-to-pointer", t.MOVEMENT_TO_SNAPPOINT = "movement-to-snappoint", t.STATE_CHANGE = "state-change"
            }(mt || (mt = {}));
            const bt = Object.freeze(Object.assign(Object.assign({}, mt), j)),
                _t = Object.freeze(Object.assign(Object.assign({}, G), nt));
            var yt;
            ! function(t) {
                t.INITIAL_TRANSFORM = "--state-change-initial-transform", t.FINAL_TRANSFORM = "--state-change-final-transform"
            }(yt || (yt = {}));
            const wt = Object.freeze(Object.assign(Object.assign(Object.assign({}, yt), tt), gt)),
                Tt = Object.freeze(Object.assign(Object.assign({}, W), et));
            var St, Et, At;
            ! function(t) {
                t.LEFT = "--movement-to-pointer-left"
            }(St || (St = {})),
            function(t) {
                t.DURATION = "--movement-to-snappoint-duration", t.TRANSFORM_START = "--movement-to-snappoint-transform-start", t.TRANSFORM_END = "--movement-to-snappoint-transform-end"
            }(Et || (Et = {})),
            function(t) {
                t.TRANSLATION = "translation", t.SUBTITLES = "subtitles"
            }(At || (At = {}));
            const Ct = at(12),
                It = ft`:host{${vt(`${Tt.DIRECTION}: normal;`)}${vt(`${Tt.MAX_WIDTH}: 0;`)}${vt(`${Tt.PADDING_RIGHT}: ${Ct}px;`)}}.ya-video-button-icon-container{box-sizing:content-box;display:flex;justify-content:center;transition:fill .5s,color .5s}.ya-video-button-label,.ya-video-button-label-layer{font-family:YS Text,"Segoe UI",BlinkMacSystemFont,Arial,sans-serif;font-style:normal;font-weight:400;font-size:${vt(`${at(15)}px`)};line-height:${vt(`${at(16)}px`)};min-height:16px;letter-spacing:0;text-align:left;hyphens:manual;overflow:hidden;user-select:none;white-space:nowrap}.ya-video-button-label-layer{position:absolute;top:0;left:0}.ya-video-button-label-container{max-width:100%;padding-right:${vt(`${Ct}px`)};position:relative}#ya-video-ui .ya-video-button-label-container{transition:width .5s}${vt(`.${_t.ANIMATE_STATE_CHANGE_INITIAL_TEXT} {\n  opacity: 0;\n  animation: 250ms linear state-change-initial-text;\n}\n\n@keyframes state-change-initial-text {\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n  }\n}`)}${vt(`.${_t.ANIMATE_STATE_CHANGE_FINAL_TEXT} {\n  opacity: 0;\n  animation: 250ms linear state-change-final-text;\n  animation-delay: 250ms;\n}\n\n@keyframes state-change-final-text {\n  from {\n    opacity: 0;\n  }\n\n  to {\n    opacity: 1;\n  }\n}`)}${vt(`.animate-${bt.MINIMIZING} {\n  animation: 250ms ease-in forwards ${bt.MINIMIZING};\n  animation-direction: var(${vt(Tt.DIRECTION)});\n}\n\n@keyframes ${bt.MINIMIZING} {\n  from {\n    opacity: 1;\n    max-width: var(${vt(Tt.MAX_WIDTH)});\n    padding-right: var(${vt(Tt.PADDING_RIGHT)});\n  }\n\n  to {\n    opacity: 0;\n    max-width: 0;\n    padding-right: 0;\n  }\n}`)}`,
                Lt = at(24),
                Ot = at(6),
                Pt = ft`:host{${vt(`${Tt.LOGO_CONTAINER_PADDING_LEFT}: ${Ot}px;`)}${vt(`${Tt.LOGO_CONTAINER_MAX_WIDTH}: ${Lt}px;`)}${vt(`${wt.TRANSLATION_LABEL_WIDTH}: unset;`)}}.ya-video-translation-button-alice-icon-container{padding-left:${vt(`${at(6)}px`)};overflow:hidden}.ya-video-translation-button-translator-icon-container{min-width:${vt(`${at(32)}px`)}}.ya-video-translation-button-alice-icon{min-height:${vt(`${at(24)}px`)};min-width:${vt(`${at(24)}px`)};max-width:${vt(`${at(24)}px`)};max-height:${vt(`${at(24)}px`)}}#ya-video-ui .ya-video-translation-button-label-container{width:var(${vt(wt.TRANSLATION_LABEL_WIDTH)})}:host([active-label-name=subtitles]) .ya-video-translation-button-label-container{padding-right:0;padding-left:0}:host([translation-state=hidden]) .ya-video-translation-button{display:none}:host([translation-state=activated]) .ya-video-translation-button-flickering{color:#a36eff;fill:#a36eff}${vt(`\n:host([translation-state="${vt(Q.FORCED_PROCESSING)}"]) .ya-video-translation-button-flickering,\n:host([translation-state="${vt(Q.IN_QUEUE)}"]) .ya-video-translation-button-flickering,\n:host([translation-state="${vt(Q.PROCESSING)}"]) .ya-video-translation-button-flickering {\n  animation: 2s ease-in-out infinite alternate processing;\n}\n`)}@keyframes processing{from{fill:#d9c3ff;color:#d9c3ff}to{fill:#a36eff;color:#a36eff}}${vt(`.${_t.ANIMATE_MINIMIZING_LOGO_CONTAINER} {\n  animation: 250ms ease-in forwards minimizing-logo-container;\n  animation-direction: var(${vt(Tt.DIRECTION)});\n}`)}@keyframes minimizing-logo-container{from{opacity:1;padding-left:var(${vt(Tt.LOGO_CONTAINER_PADDING_LEFT)});min-width:var(${vt(Tt.LOGO_CONTAINER_MAX_WIDTH)})}to{opacity:0;padding-left:0;min-width:0}}`,
                xt = ft`:host{${vt(`${wt.SUBTITLES_LABEL_WIDTH}: unset;`)}}.ya-video-subtitles-button-icon-container{padding:0 6px}#ya-video-ui .ya-video-subtitles-button-label-container{width:var(${vt(wt.SUBTITLES_LABEL_WIDTH)})}:host([active-label-name=translation]) .ya-video-subtitles-button-label-container{padding-right:0;padding-left:0}:host([subtitles-state=hidden]) .ya-video-subtitles-button{display:none}:host([subtitles-state=activated]) .ya-video-subtitles-button-flickering{color:#a36eff;fill:#a36eff}.ya-video-subtitles-button-label-container{padding-right:${vt(Ct/2+"px")};position:relative}`,
                kt = ft`.ya-video-settings-button-icon-container{padding:0 13px}:host([settings-state=hidden]) .ya-video-settings-button{display:none}:host([settings-state=activated]) .ya-video-settings-button{color:#a36eff;fill:#a36eff}`,
                Nt = ft`:host{${vt(`${St.LEFT}: 0;`)}${vt(`${Et.DURATION}: 250ms;`)}${vt(`${Et.TRANSFORM_START}: translateX(0px);`)}${vt(`${Et.TRANSFORM_END}: translateX(0px);`)}${vt(`${wt.INITIAL_TRANSFORM}: -10px;`)}${vt(`${wt.FINAL_TRANSFORM}: 0px;`)}--button-background-color:#2E2F34}:host{touch-action:none;z-index:1000;display:block;position:absolute;left:50%;top:100%;transform:translateX(-50%);pointer-events:none;width:max-content;height:max-content}:host([ya-overvideo]){top:50%;transform:${vt("translate(-50%, -50%)")}}:host([ya-top-mode]){top:${vt(`${at(28)}px`)}}:host #ya-video-ui{position:absolute;height:max-content;cursor:grab;pointer-events:auto;display:flex;justify-content:center;align-items:center;flex-flow:row nowrap;transform:${vt("translate(-10px)")};padding:${vt(`${at(12)}px 10px`)};will-change:transform,left}#ya-video-ui[ya-hidden]{pointer-events:none}#ya-video-ui-clone,.ya-video-ui-inner{display:block;height:max-content;color:#fff;opacity:1}#ya-video-ui[ya-hidden] .ya-video-ui-inner{opacity:0;transition:opacity .7s ease}#ya-video-ui-clone{position:relative;visibility:hidden;padding:${vt(`${at(12)}px 10px`)}}#ya-video-ui[ya-shrunk] .can-shrunk{max-width:0;padding:0}.ya-video-ui-buttons{display:flex;justify-content:center;align-items:stretch;flex-flow:row nowrap;height:max-content;min-height:32px;box-shadow:${vt(`0px ${at(4)}px ${at(6)}px rgba(0, 0, 0, 0.25)`)};border-radius:${vt(`${at(12)}px`)};overflow:hidden}.ya-video-ui-buttons>*{display:flex;justify-content:center;align-items:center;fill:#fff;padding:4px 0;background-color:var(--button-background-color)}.ya-video-ui-buttons>:not(.last-visible){border-right:1px solid rgba(255,255,255,.2)}.ya-video-ui-buttons>:nth-child(2){z-index:2}.ya-video-ui-buttons>:nth-child(3){z-index:3}.ya-video-ui-buttons>:last-child{border-top-right-radius:${vt(`${at(12)}px`)};border-bottom-right-radius:${vt(`${at(12)}px`)}}${vt(`.animate-${bt.MOVEMENT_TO_POINTER} {\n    animation: 150ms linear ${bt.MOVEMENT_TO_POINTER};\n  }\n\n  @keyframes ${bt.MOVEMENT_TO_POINTER} {\n    from {\n      left: 0;\n    }\n\n    to {\n      left: var(${vt(St.LEFT)});\n    }\n  }`)}${vt(`.animate-${bt.MOVEMENT_TO_SNAPPOINT} {\n    animation: var(${vt(Et.DURATION)}, 250ms) ease-out forwards ${bt.MOVEMENT_TO_SNAPPOINT};\n  }\n\n  @keyframes ${bt.MOVEMENT_TO_SNAPPOINT} {\n    from {\n      transform: var(${vt(Et.TRANSFORM_START)});\n    }\n\n    to {\n      transform: var(${vt(Et.TRANSFORM_END)});\n    }\n  }`)}${vt(`.animate-${bt.STATE_CHANGE} {\n    animation: 500ms linear ${bt.STATE_CHANGE};\n  }\n\n  @keyframes ${bt.STATE_CHANGE} {\n    from {\n      transform: translate(var(${vt(wt.INITIAL_TRANSFORM)}));\n    }\n\n    to {\n      transform: translate(var(${vt(wt.FINAL_TRANSFORM)}));\n    }\n  }`)}${vt(It)}${vt(Pt)}${vt(xt)}${vt(kt)}`,
                Dt = (t, ...e) => e.reduce(((e, n, i) => e + n + t[i + 1]), t[0]),
                Rt = (t, e) => `\n  <div id=${e?"ya-video-ui-clone":"ya-video-ui"}>\n    <div class="ya-video-ui-inner">\n      <div class="ya-video-ui-buttons">\n        ${t.map((t=>t.getTemplateString(e))).join("\n")}\n      </div>\n    </div>\n  </div>\n  `,
                Mt = e => {
                    switch (e) {
                        case t.TranslationState.HIDDEN:
                            return F.HIDDEN;
                        case t.TranslationState.ACTIVATED:
                            return F.ACTIVATED;
                        case t.TranslationState.AVAILABLE:
                        case t.TranslationState.ERROR:
                        case t.TranslationState.OTHER_ERROR:
                        default:
                            return F.AVAILABLE
                    }
                },
                Ht = e => {
                    const n = Bt(e) ? e.state : e;
                    switch (n) {
                        case t.TranslationState.IN_QUEUE:
                            return J.IN_QUEUE;
                        case t.TranslationState.PROCESSING:
                            return J.PROCESSING;
                        case t.TranslationState.NO_TRANSLATION:
                            return J.AVAILABLE;
                        default:
                            return Mt(n)
                    }
                },
                Vt = e => Boolean(e) && "string" == typeof e && Object.values(t.TranslationState).includes(e),
                Bt = e => "object" == typeof e && null !== e && "state" in e && Object.values(t.TranslationState).includes(e.state),
                $t = t => {
                    var e, n, i;
                    const o = null !== (n = null === (e = window.yandex) || void 0 === e ? void 0 : e.i18n) && void 0 !== n ? n : null === (i = window.chrome) || void 0 === i ? void 0 : i.i18n,
                        r = (null == o ? void 0 : o.getUILanguage) ? o.getUILanguage() : navigator.language;
                    if (!r) return "en";
                    const s = l(r);
                    for (const e of t)
                        if (!e.has(s)) return "en";
                    return s
                },
                Ut = new Map([
                    ["ru", Object.freeze({
                        [J.HIDDEN]: "",
                        [J.AVAILABLE]: "\u041f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u0432\u0438\u0434\u0435\u043e",
                        [J.STREAM_AVAILABLE]: "\u041f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0438\u044e \u03b2eta",
                        [J.FORCED_PROCESSING]: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434\u0438\u0442\u0441\u044f",
                        [J.PROCESSING]: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434\u0438\u0442\u0441\u044f",
                        [J.ACTIVATED]: "\u0412\u044b\u043a\u043b\u044e\u0447\u0438\u0442\u044c",
                        [J.IN_QUEUE]: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434\u0438\u0442\u0441\u044f"
                    })],
                    ["en", Object.freeze({
                        [J.HIDDEN]: "",
                        [J.AVAILABLE]: "Translate",
                        [J.STREAM_AVAILABLE]: "Translate stream \u03b2eta",
                        [J.FORCED_PROCESSING]: "Translating",
                        [J.PROCESSING]: "Translating",
                        [J.ACTIVATED]: "Disable",
                        [J.IN_QUEUE]: "Time remaining"
                    })],
                    ["kk", Object.freeze({
                        [J.HIDDEN]: "",
                        [J.AVAILABLE]: "\u0412\u0438\u0434\u0435\u043e\u043d\u044b \u0430\u0443\u0434\u0430\u0440\u0443",
                        [J.STREAM_AVAILABLE]: "\u0422\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0438\u044f\u043d\u044b \u0430\u0443\u0434\u0430\u0440\u0443 \u03b2eta",
                        [J.FORCED_PROCESSING]: "\u0410\u0443\u0434\u0430\u0440\u044b\u043b\u044b\u043f \u0436\u0430\u0442\u044b\u0440",
                        [J.PROCESSING]: "\u0410\u0443\u0434\u0430\u0440\u044b\u043b\u044b\u043f \u0436\u0430\u0442\u044b\u0440",
                        [J.ACTIVATED]: "\u04e8\u0448\u0456\u0440\u0443",
                        [J.IN_QUEUE]: "\u0410\u0443\u0434\u0430\u0440\u044b\u043b\u0443\u0434\u0430"
                    })],
                    ["uk", Object.freeze({
                        [J.HIDDEN]: "",
                        [J.AVAILABLE]: "\u041f\u0435\u0440\u0435\u043a\u043b\u0430\u0441\u0442\u0438 \u0432\u0456\u0434\u0435\u043e",
                        [J.STREAM_AVAILABLE]: "\u041f\u0435\u0440\u0435\u043a\u043b\u0430\u0441\u0442\u0438 \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u044e \u03b2eta",
                        [J.FORCED_PROCESSING]: "\u041f\u0435\u0440\u0435\u043a\u043b\u0430\u0434\u0430\u0454\u0442\u044c\u0441\u044f",
                        [J.PROCESSING]: "\u041f\u0435\u0440\u0435\u043a\u043b\u0430\u0434\u0430\u0454\u0442\u044c\u0441\u044f",
                        [J.ACTIVATED]: "\u0412\u0438\u043c\u043a\u043d\u0443\u0442\u0438",
                        [J.IN_QUEUE]: "\u041f\u0435\u0440\u0435\u043a\u043b\u0430\u0434\u0430\u0454\u0442\u044c\u0441\u044f"
                    })]
                ]),
                Ft = new Map([
                    ["ru", Object.freeze({
                        [it.N_MINUTES]: t => `: \u0435\u0449\u0435 ${t} \u043c\u0438\u043d`,
                        [it.MORE_THAN_HOUR]: ": \u0431\u043e\u043b\u044c\u0448\u0435 \u0447\u0430\u0441\u0430"
                    })],
                    ["en", Object.freeze({
                        [it.N_MINUTES]: t => `: ${t} min`,
                        [it.MORE_THAN_HOUR]: ": over an hour"
                    })],
                    ["kk", Object.freeze({
                        [it.N_MINUTES]: t => `: \u0442\u0430\u0493\u044b ${t} \u043c\u0438\u043d`,
                        [it.MORE_THAN_HOUR]: ": \u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442\u0442\u0430\u043d \u043a\u04e9\u043f"
                    })],
                    ["uk", Object.freeze({
                        [it.N_MINUTES]: t => `: \u0449\u0435 ${t} \u0445\u0432`,
                        [it.MORE_THAN_HOUR]: ": \u0431\u0456\u043b\u044c\u0448\u0435 \u0433\u043e\u0434\u0438\u043d\u0438"
                    })]
                ]),
                jt = $t([Ut, Ft]),
                Wt = Ut.get(jt),
                Gt = Ft.get(jt);
            class zt {
                constructor(t) {
                    this.queryCache = {}, this.query = st(this.queryCache), this.controller = t
                }
                get visible() {
                    return this.state !== F.HIDDEN
                }
                get parentElement() {
                    return this.controller.button
                }
                get invisibleParentElement() {
                    return this.controller.invisibleButton
                }
                setState(t, e) {
                    let n;
                    if ("string" == typeof(i = t) && Object.values(F).includes(i)) n = t;
                    else {
                        if (!Vt(t)) return;
                        n = Mt(t)
                    }
                    var i;
                    n !== this.getState() && (this.state = n, this.renderState(n, e))
                }
                addTextChangeAnimation(t) {
                    this.labelText !== t && this.labelLayer && this.labelContainer && this.label && (this.labelLayer.innerText = t, this.labelLayer.classList.add(_t.ANIMATE_STATE_CHANGE_INITIAL_TEXT), this.label.classList.add(_t.ANIMATE_STATE_CHANGE_FINAL_TEXT))
                }
                removeTextChangeAnimation() {
                    this.labelLayer && this.label && this.labelContainer && (this.labelLayer.innerText = "", this.labelLayer.classList.remove(_t.ANIMATE_STATE_CHANGE_INITIAL_TEXT), this.label.classList.remove(_t.ANIMATE_STATE_CHANGE_FINAL_TEXT))
                }
                shouldHandleClick(t) {
                    return this.hostElement && t.composedPath().includes(this.hostElement)
                }
                setLabelText(t) {
                    this.labelRecord && this.label && this.invisibleLabel && (this.labelText = this.isActiveLabel() ? this.getActiveLabelText(t) : "", this.label.innerText = this.labelText, this.invisibleLabel.innerText = this.labelText)
                }
                getInvisibleIconContainerBcr() {
                    var t;
                    return null === (t = this.invisibleIconContainer) || void 0 === t ? void 0 : t.getBoundingClientRect()
                }
                getInvisibleLabelBcr() {
                    var t;
                    return null === (t = this.invisibleLabel) || void 0 === t ? void 0 : t.getBoundingClientRect()
                }
                async renderState(t, e = !0) {
                    await this.controller.updateControllerState(this.stateAttributeName, t, e)
                }
            }
            class qt extends zt {
                constructor(t, e, n) {
                    super(t), this.labelText = "", this.stateAttributeName = "translation-state", this.state = J.HIDDEN, this.defaultLabelText = Wt[J.AVAILABLE], this.labelRecord = Object.assign(Object.assign({}, Gt), Wt), this.seconds = -1, this.setStateDebouncer = new T, this.streamWaitStateValues = Object.values(K), this.isStream = n, this.setState(e, !1)
                }
                getTemplateString(t) {
                    return (t => {
                        return `\n  <div class="ya-video-translation-button">\n    <div class="ya-video-button-icon-container ya-video-translation-button-alice-icon-container can-shrunk">\n      ${e="ya-video-translation-button-alice-icon",n="mask-"+(t?"clone":"main"),i="gradient-"+(t?"clone":"main"),`\n  <svg class="${e}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <mask id="${n}" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">\n      <circle cx="12" cy="12" r="12" fill="#fff"/>\n    </mask>\n    <g mask="url(#${n})">\n      <path transform="translate(0 .028)" fill="url(#${i})" d="M0 0h24v24H0z"/>\n      <path fill="#7626FF" d="M0 .028h24v24H0z"/>\n      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.283 16.193c.9.888 3.297 1.42 5.74 1.43 2.444-.01 4.841-.542 5.74-1.43 2.236-2.204-3.199-10.653-5.737-10.665-2.544.012-7.979 8.461-5.743 10.665" fill="#fff"/>\n    </g>\n    <defs>\n      <linearGradient id="${i}" x1="19.778" y1="30.357" x2="30.132" y2="4.5" gradientUnits="userSpaceOnUse">\n        <stop stop-color="#C826FF"/>\n        <stop offset="1" stop-color="#5426FF"/>\n      </linearGradient>\n    </defs>\n  </svg>\n`}\n    </div>\n    <div class="ya-video-button-icon-container ya-video-translation-button-translator-icon-container">\n      \n  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path class="ya-video-translation-button-flickering" fill-rule="evenodd" clip-rule="evenodd" d="M17.605 19.703c.794-.13 1.647-.476 2.47-.983.695 1.013 1.255 1.546 1.306 1.593l1.166-1.207c-.011-.01-.504-.48-1.124-1.401.277-.25.547-.512.797-.798a12.1 12.1 0 0 0 2.268-3.826c.383.216.761.541.96 1.027.68 1.649-.301 3.557-1.215 4.385l1.152 1.22c1.52-1.378 2.571-3.959 1.638-6.227-.368-.892-1.077-1.59-2.064-2.037.162-.763.216-1.38.233-1.785h-1.698c-.017.307-.06.762-.173 1.323-1.325-.187-2.818-.006-4.248.508a25.994 25.994 0 0 1-.313-2.547c5.092-.287 8.098-1.488 8.237-1.546l-.654-1.533c-.03.013-2.875 1.14-7.65 1.418-.001-.405-.008-.666-.012-.85-.008-.339-.01-.423.03-.67L17.01 5.75c-.026.283-.024.573-.018 1.278l.002.318c-.026 0-.051 0-.077.002l-.08.001a39.286 39.286 0 0 1-3.27-.14L13.25 8.89c.5.043 2.023.122 3.397.122h.1a19.457 19.457 0 0 1 .208-.003l.106-.002c.067.948.196 2.034.421 3.22a8.05 8.05 0 0 0-2.267 1.963l.811 1.871c.327-.732.995-1.51 1.856-2.111a16.762 16.762 0 0 0 1.33 3.346c-.811.514-1.64.818-2.301.804l.694 1.603Zm2.953-3.488a8.18 8.18 0 0 0 .374-.389 10.465 10.465 0 0 0 1.927-3.224c-.198-.021-.4-.031-.606-.031-.907 0-1.885.199-2.834.574.31 1.209.718 2.23 1.14 3.07ZM9.769 11.688 4.25 24.438h2.259l1.357-3.407h5.582l1.357 3.407h2.258l-5.52-12.75H9.77Zm.887 2.624 2.056 5H8.6l2.056-5Z" fill="#fff"/>\n  </svg>\n\n    </div>\n    <div class="ya-video-button-label-container ya-video-translation-button-label-container can-shrunk">\n      <div class="ya-video-translation-button-flickering">\n        <div class="ya-video-button-label-layer ya-video-translation-button-label-layer"></div>\n        <div class="ya-video-button-label ya-video-translation-button-label"></div>\n      </div>\n    </div>\n  </div>`;
                        var e, n, i
                    })(t)
                }
                getState() {
                    return this.state
                }
                checkIsStillStreamWaitState(t) {
                    return this.streamWaitStateValues.includes(t) && this.streamWaitStateValues.includes(this.state)
                }
                setState(t, e) {
                    let n;
                    if ("string" == typeof(i = t) && Object.values(J).includes(i)) n = t;
                    else {
                        if (!(t => Vt(t) || Bt(t))(t)) return;
                        n = Ht(t)
                    }
                    var i;
                    n === this.state || this.checkIsStillStreamWaitState(n) || (this.state = n, n === J.PROCESSING ? this.setStateDebouncer = T.debounce(this.setStateDebouncer, S.timeOut.delay(80), (() => this.renderState(n, e))) : (this.setStateDebouncer.cancel(), this.renderState(n, e)))
                }
                isActiveLabel() {
                    return this.controller.translationLabelIsActive()
                }
                getActiveLabelText(t) {
                    var e;
                    if (t === J.IN_QUEUE) {
                        return `${this.labelRecord[J.IN_QUEUE]}${this.getWaitingTimeString(this.seconds)}`
                    }
                    return t === J.AVAILABLE && this.isStream ? this.labelRecord[J.STREAM_AVAILABLE] : null !== (e = this.labelRecord[t]) && void 0 !== e ? e : this.defaultLabelText
                }
                setTranslationWaitingTime(t) {
                    this.seconds = t, this.getState() === J.IN_QUEUE && (this.controller.setLabelTextsAndMaybeAnimate(!0), this.controller.calculateLimitsAndSnapPoints())
                }
                getWaitingTimeString(t) {
                    if (t < 0) return "";
                    if (t > 3600) return this.labelRecord[it.MORE_THAN_HOUR];
                    return (0, this.labelRecord[it.N_MINUTES])(Math.max(1, Math.round(t / 60)))
                }
                get hostElement() {
                    return this.query(this.parentElement, ".ya-video-translation-button")
                }
                get label() {
                    return this.query(this.parentElement, ".ya-video-translation-button-label")
                }
                get labelContainer() {
                    return this.query(this.parentElement, ".ya-video-translation-button-label-container")
                }
                get labelLayer() {
                    return this.query(this.parentElement, ".ya-video-translation-button-label-layer")
                }
                get aliceIconContainer() {
                    return this.query(this.parentElement, ".ya-video-translation-button-alice-icon-container")
                }
                get invisibleLabel() {
                    return this.query(this.invisibleParentElement, ".ya-video-translation-button-label")
                }
                get invisibleIconContainer() {
                    return this.query(this.invisibleParentElement, ".ya-video-translation-button-translator-icon-container")
                }
            }
            const Zt = new Map([
                    ["ru", Object.freeze({
                        [F.HIDDEN]: "",
                        [F.AVAILABLE]: "\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044b",
                        [F.ACTIVATED]: "\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044b"
                    })],
                    ["en", Object.freeze({
                        [F.HIDDEN]: "",
                        [F.AVAILABLE]: "Subtitles",
                        [F.ACTIVATED]: "Subtitles"
                    })],
                    ["kk", Object.freeze({
                        [F.HIDDEN]: "",
                        [F.AVAILABLE]: "\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u043b\u0435\u0440",
                        [F.ACTIVATED]: "\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u043b\u0435\u0440"
                    })],
                    ["uk", Object.freeze({
                        [F.HIDDEN]: "",
                        [F.AVAILABLE]: "\u0421\u0443\u0431\u0442\u0438\u0442\u0440",
                        [F.ACTIVATED]: "\u0421\u0443\u0431\u0442\u0438\u0442\u0440"
                    })]
                ]),
                Xt = $t([Zt]),
                Kt = Zt.get(Xt);
            class Qt extends zt {
                constructor(t, e) {
                    super(t), this.labelText = "", this.stateAttributeName = "subtitles-state", this.state = F.HIDDEN, this.defaultLabelText = Kt[F.AVAILABLE], this.labelRecord = Kt, this.setState(e, !1)
                }
                getTemplateString() {
                    return '\n  <div class="ya-video-subtitles-button">\n    <div class="ya-video-button-icon-container ya-video-subtitles-button-icon-container">\n      \n<svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">\n  <path class="ya-video-subtitles-button-flickering" d="M16.795 0H3.205C2.09 0 1.686.116 1.279.334a2.272 2.272 0 0 0-.945.945C.116 1.686 0 2.09 0 3.205v10.59c0 1.114.116 1.519.334 1.926.218.407.538.727.945.945.407.218.811.334 1.926.334h13.59c1.114 0 1.519-.116 1.926-.334.407-.218.727-.538.945-.945.218-.407.334-.812.334-1.926V3.205c0-1.115-.116-1.519-.334-1.926a2.272 2.272 0 0 0-.945-.945C18.314.116 17.91 0 16.795 0ZM2.356 2.049c.155-.03.422-.049.849-.049h13.59c.427 0 .694.019.849.049.06.012.074.017.134.049a.275.275 0 0 1 .125.124c.031.06.036.073.048.134.03.155.049.422.049.849v10.59c0 .427-.019.694-.049.849a.353.353 0 0 1-.049.134.275.275 0 0 1-.124.124.353.353 0 0 1-.134.049c-.155.03-.422.049-.849.049H3.205c-.427 0-.694-.019-.849-.049a.353.353 0 0 1-.134-.049.275.275 0 0 1-.124-.124.353.353 0 0 1-.049-.134c-.03-.155-.049-.422-.049-.849V3.205c0-.427.019-.694.049-.849a.353.353 0 0 1 .049-.134.275.275 0 0 1 .124-.124.353.353 0 0 1 .134-.049ZM4 12a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm9-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM4 8a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1Zm5-1a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"/>\n</svg>\n\n    </div>\n    <div class="ya-video-button-label-container ya-video-subtitles-button-label-container can-shrunk">\n      <div class="ya-video-subtitles-button-flickering">\n        <div class="ya-video-button-label-layer ya-video-subtitles-button-label-layer"></div>\n        <div class="ya-video-button-label ya-video-subtitles-button-label"></div>\n      </div>\n    </div>\n  </div>'
                }
                getState() {
                    return this.state
                }
                isActiveLabel() {
                    return this.controller.subtitlesLabelIsActive()
                }
                getActiveLabelText(t) {
                    var e;
                    return null !== (e = this.labelRecord[t]) && void 0 !== e ? e : this.defaultLabelText
                }
                get hostElement() {
                    return this.query(this.parentElement, ".ya-video-subtitles-button")
                }
                get label() {
                    return this.query(this.parentElement, ".ya-video-subtitles-button-label")
                }
                get labelContainer() {
                    return this.query(this.parentElement, ".ya-video-subtitles-button-label-container")
                }
                get labelLayer() {
                    return this.query(this.parentElement, ".ya-video-subtitles-button-label-layer")
                }
                get invisibleLabel() {
                    return this.query(this.invisibleParentElement, ".ya-video-subtitles-button-label")
                }
                get invisibleIconContainer() {
                    return this.query(this.invisibleParentElement, ".ya-video-subtitles-button-icon-container")
                }
            }
            class Yt extends zt {
                constructor(t, e) {
                    super(t), this.labelText = "", this.stateAttributeName = "settings-state", this.state = F.HIDDEN, this.defaultLabelText = "", this.labelRecord = null, this.setState(e, !1)
                }
                getState() {
                    return this.state
                }
                getTemplateString() {
                    return '\n  <div class="ya-video-settings-button">\n    <div class="ya-video-button-icon-container ya-video-settings-button-icon-container">\n      \n<svg width="4" height="15" xmlns="http://www.w3.org/2000/svg">\n  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM3.5 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM3.5 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>\n</svg>\n\n    </div>\n  </div>'
                }
                isActiveLabel() {
                    return !1
                }
                getActiveLabelText(t) {
                    return this.defaultLabelText
                }
                get hostElement() {
                    return this.query(this.parentElement, ".ya-video-settings-button")
                }
                get invisibleIconContainer() {
                    return this.query(this.invisibleParentElement, ".ya-video-settings-button-icon-container")
                }
                get invisibleLabel() {
                    return null
                }
                get label() {
                    return null
                }
                get labelContainer() {
                    return null
                }
                get labelLayer() {
                    return null
                }
            }
            const Jt = t => "touches" in t,
                te = ["fullscreenchange", "webkitfullscreenchange"],
                ee = () => document.fullscreenElement || document.webkitFullscreenElement,
                ne = () => Boolean(ee()),
                ie = t => {
                    var e;
                    return Jt(t) ? null !== (e = t.touches[0]) && void 0 !== e ? e : t.changedTouches[0] : t
                };
            class oe {
                constructor(t) {
                    this.pointerDown = !1, this.movementX = 0, this.pointerOffsetX = 0, this.element = null, this.dragStarted = !1, this.pointerInitialX = 0, this.elementInitialX = 0, this.previousPageX = 0, this.handleContextMenuBound = this.handleContextMenu.bind(this), this.handlePointerDownBound = this.handlePointerDown.bind(this), this.handlePointerMoveBound = this.handlePointerMove.bind(this), this.handlePointerUpBound = this.handlePointerUp.bind(this), this.handlerHost = t
                }
                enable() {
                    window.PointerEvent ? this.subscribeToPointerEvents() : this.subscribeToTouchEvents(), window.addEventListener("contextmenu", this.handleContextMenuBound)
                }
                subscribeToPointerEvents() {
                    var t, e;
                    null === (t = this.element) || void 0 === t || t.addEventListener("pointerdown", this.handlePointerDownBound), null === (e = this.element) || void 0 === e || e.addEventListener("pointermove", this.handlePointerMoveBound), window.addEventListener("pointerup", this.handlePointerUpBound)
                }
                unsubscribeFromPointerEvents() {
                    var t, e;
                    null === (t = this.element) || void 0 === t || t.removeEventListener("pointerdown", this.handlePointerDownBound), null === (e = this.element) || void 0 === e || e.removeEventListener("pointermove", this.handlePointerMoveBound), window.removeEventListener("pointerup", this.handlePointerUpBound)
                }
                subscribeToTouchEvents() {
                    var t, e;
                    null === (t = this.element) || void 0 === t || t.addEventListener("touchstart", this.handlePointerDownBound), null === (e = this.element) || void 0 === e || e.addEventListener("touchmove", this.handlePointerMoveBound), window.addEventListener("touchend", this.handlePointerUpBound)
                }
                unsubscribeFromTouchEvents() {
                    var t, e;
                    null === (t = this.element) || void 0 === t || t.removeEventListener("touchstart", this.handlePointerDownBound), null === (e = this.element) || void 0 === e || e.removeEventListener("touchmove", this.handlePointerMoveBound), window.removeEventListener("touchend", this.handlePointerUpBound)
                }
                disable() {
                    window.PointerEvent ? this.unsubscribeFromPointerEvents() : this.unsubscribeFromTouchEvents(), window.removeEventListener("contextmenu", this.handleContextMenuBound)
                }
                handlePointerDown(t) {
                    if (this.handlerHost.handleUserActivity(), Jt(t) && t.touches.length > 1) return;
                    t.preventDefault(), t.stopPropagation();
                    const e = ie(t);
                    this.handlerHost.positionLocked() || (this.pointerInitialX = e.clientX, this.elementInitialX = this.element.getBoundingClientRect().x, this.pointerOffsetX = this.pointerInitialX - this.elementInitialX), this.pointerDown = !0
                }
                handlePointerUp(t) {
                    if (this.handlerHost.handleUserActivity(), !this.pointerDown) return;
                    this.pointerDown = !1, t.preventDefault(), t.stopPropagation();
                    const e = ie(t);
                    Math.abs(e.clientX - this.pointerInitialX) < 6 || ne() ? this.handlerHost.handleClick(t) : this.dragStarted && !this.handlerHost.positionLocked() && (this.dragStarted = !1, this.handlerHost.handleDragEnd())
                }
                handlePointerMove(t) {
                    if (this.handlerHost.handleUserActivity(), !this.pointerDown || ne() || this.handlerHost.positionLocked()) return;
                    const e = ie(t);
                    if (Math.abs(e.clientX - this.pointerInitialX) < 6) return;
                    t.preventDefault(), t.stopPropagation(), this.movementX = e.pageX - this.previousPageX, this.previousPageX = e.pageX;
                    const n = e.clientX - this.pointerOffsetX - this.elementInitialX + this.handlerHost.elementResultOffset;
                    this.handlerHost.isDragOffLimits(n) || (this.dragStarted = !0, this.handlerHost.handleDragMove(n))
                }
                handleContextMenu(t) {
                    this.pointerDown && (t.preventDefault(), t.stopPropagation())
                }
            }
            class re {
                constructor(t) {
                    this.handleFullscreenChangeBound = this.handleFullscreenChange.bind(this), this.handlerHost = t, this.fullscreenMode = ne()
                }
                enable() {
                    te.forEach((t => {
                        document.addEventListener(t, this.handleFullscreenChangeBound)
                    })), this.fullscreenMode = ne()
                }
                disable() {
                    te.forEach((t => {
                        document.removeEventListener(t, this.handleFullscreenChangeBound)
                    }))
                }
                async handleFullscreenChange() {
                    this.fullscreenMode = ne(), this.handlerHost.handleFullscreenChange()
                }
            }
            const se = () => window.innerWidth < window.innerHeight ? ut.PORTRAIT : ut.LANDSCAPE;
            class ae {
                constructor(t) {
                    this.windowWidth = 0, this.deviceOrientation = se(), this.handleDeviceOrientationChangeBound = this.handleDeviceOrientationChange.bind(this), this.handlerHost = t
                }
                enable() {
                    window.addEventListener("resize", this.handleDeviceOrientationChangeBound), this.setDeviceOrientation()
                }
                disable() {
                    window.removeEventListener("resize", this.handleDeviceOrientationChangeBound)
                }
                async handleDeviceOrientationChange() {
                    window.innerWidth !== this.windowWidth && (this.windowWidth = window.innerWidth, this.handlerHost.handleDeviceOrientationChange())
                }
                setDeviceOrientation() {
                    this.deviceOrientation = se()
                }
                isPortrait() {
                    return this.deviceOrientation === ut.PORTRAIT
                }
                isLandscape() {
                    return this.deviceOrientation === ut.LANDSCAPE
                }
            }
            var le = function() {
                    if ("undefined" != typeof Map) return Map;

                    function t(t, e) {
                        var n = -1;
                        return t.some((function(t, i) {
                            return t[0] === e && (n = i, !0)
                        })), n
                    }
                    return function() {
                        function e() {
                            this.__entries__ = []
                        }
                        return Object.defineProperty(e.prototype, "size", {
                            get: function() {
                                return this.__entries__.length
                            },
                            enumerable: !0,
                            configurable: !0
                        }), e.prototype.get = function(e) {
                            var n = t(this.__entries__, e),
                                i = this.__entries__[n];
                            return i && i[1]
                        }, e.prototype.set = function(e, n) {
                            var i = t(this.__entries__, e);
                            ~i ? this.__entries__[i][1] = n : this.__entries__.push([e, n])
                        }, e.prototype.delete = function(e) {
                            var n = this.__entries__,
                                i = t(n, e);
                            ~i && n.splice(i, 1)
                        }, e.prototype.has = function(e) {
                            return !!~t(this.__entries__, e)
                        }, e.prototype.clear = function() {
                            this.__entries__.splice(0)
                        }, e.prototype.forEach = function(t, e) {
                            void 0 === e && (e = null);
                            for (var n = 0, i = this.__entries__; n < i.length; n++) {
                                var o = i[n];
                                t.call(e, o[1], o[0])
                            }
                        }, e
                    }()
                }(),
                ue = "undefined" != typeof window && "undefined" != typeof document && window.document === document,
                ce = "undefined" != typeof global && global.Math === Math ? global : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(),
                de = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(ce) : function(t) {
                    return setTimeout((function() {
                        return t(Date.now())
                    }), 1e3 / 60)
                };
            var he = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
                ve = "undefined" != typeof MutationObserver,
                fe = function() {
                    function t() {
                        this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = function(t, e) {
                            var n = !1,
                                i = !1,
                                o = 0;

                            function r() {
                                n && (n = !1, t()), i && a()
                            }

                            function s() {
                                de(r)
                            }

                            function a() {
                                var t = Date.now();
                                if (n) {
                                    if (t - o < 2) return;
                                    i = !0
                                } else n = !0, i = !1, setTimeout(s, e);
                                o = t
                            }
                            return a
                        }(this.refresh.bind(this), 20)
                    }
                    return t.prototype.addObserver = function(t) {
                        ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_()
                    }, t.prototype.removeObserver = function(t) {
                        var e = this.observers_,
                            n = e.indexOf(t);
                        ~n && e.splice(n, 1), !e.length && this.connected_ && this.disconnect_()
                    }, t.prototype.refresh = function() {
                        this.updateObservers_() && this.refresh()
                    }, t.prototype.updateObservers_ = function() {
                        var t = this.observers_.filter((function(t) {
                            return t.gatherActive(), t.hasActive()
                        }));
                        return t.forEach((function(t) {
                            return t.broadcastActive()
                        })), t.length > 0
                    }, t.prototype.connect_ = function() {
                        ue && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), ve ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
                            attributes: !0,
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0)
                    }, t.prototype.disconnect_ = function() {
                        ue && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1)
                    }, t.prototype.onTransitionEnd_ = function(t) {
                        var e = t.propertyName,
                            n = void 0 === e ? "" : e;
                        he.some((function(t) {
                            return !!~n.indexOf(t)
                        })) && this.refresh()
                    }, t.getInstance = function() {
                        return this.instance_ || (this.instance_ = new t), this.instance_
                    }, t.instance_ = null, t
                }(),
                ge = function(t, e) {
                    for (var n = 0, i = Object.keys(e); n < i.length; n++) {
                        var o = i[n];
                        Object.defineProperty(t, o, {
                            value: e[o],
                            enumerable: !1,
                            writable: !1,
                            configurable: !0
                        })
                    }
                    return t
                },
                pe = function(t) {
                    return t && t.ownerDocument && t.ownerDocument.defaultView || ce
                },
                me = Se(0, 0, 0, 0);

            function be(t) {
                return parseFloat(t) || 0
            }

            function _e(t) {
                for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                return e.reduce((function(e, n) {
                    return e + be(t["border-" + n + "-width"])
                }), 0)
            }

            function ye(t) {
                var e = t.clientWidth,
                    n = t.clientHeight;
                if (!e && !n) return me;
                var i = pe(t).getComputedStyle(t),
                    o = function(t) {
                        for (var e = {}, n = 0, i = ["top", "right", "bottom", "left"]; n < i.length; n++) {
                            var o = i[n],
                                r = t["padding-" + o];
                            e[o] = be(r)
                        }
                        return e
                    }(i),
                    r = o.left + o.right,
                    s = o.top + o.bottom,
                    a = be(i.width),
                    l = be(i.height);
                if ("border-box" === i.boxSizing && (Math.round(a + r) !== e && (a -= _e(i, "left", "right") + r), Math.round(l + s) !== n && (l -= _e(i, "top", "bottom") + s)), ! function(t) {
                        return t === pe(t).document.documentElement
                    }(t)) {
                    var u = Math.round(a + r) - e,
                        c = Math.round(l + s) - n;
                    1 !== Math.abs(u) && (a -= u), 1 !== Math.abs(c) && (l -= c)
                }
                return Se(o.left, o.top, a, l)
            }
            var we = "undefined" != typeof SVGGraphicsElement ? function(t) {
                return t instanceof pe(t).SVGGraphicsElement
            } : function(t) {
                return t instanceof pe(t).SVGElement && "function" == typeof t.getBBox
            };

            function Te(t) {
                return ue ? we(t) ? function(t) {
                    var e = t.getBBox();
                    return Se(0, 0, e.width, e.height)
                }(t) : ye(t) : me
            }

            function Se(t, e, n, i) {
                return {
                    x: t,
                    y: e,
                    width: n,
                    height: i
                }
            }
            var Ee = function() {
                    function t(t) {
                        this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Se(0, 0, 0, 0), this.target = t
                    }
                    return t.prototype.isActive = function() {
                        var t = Te(this.target);
                        return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight
                    }, t.prototype.broadcastRect = function() {
                        var t = this.contentRect_;
                        return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t
                    }, t
                }(),
                Ae = function(t, e) {
                    var n = function(t) {
                        var e = t.x,
                            n = t.y,
                            i = t.width,
                            o = t.height,
                            r = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
                            s = Object.create(r.prototype);
                        return ge(s, {
                            x: e,
                            y: n,
                            width: i,
                            height: o,
                            top: n,
                            right: e + i,
                            bottom: o + n,
                            left: e
                        }), s
                    }(e);
                    ge(this, {
                        target: t,
                        contentRect: n
                    })
                },
                Ce = function() {
                    function t(t, e, n) {
                        if (this.activeObservations_ = [], this.observations_ = new le, "function" != typeof t) throw new TypeError("The callback provided as parameter 1 is not a function.");
                        this.callback_ = t, this.controller_ = e, this.callbackCtx_ = n
                    }
                    return t.prototype.observe = function(t) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if ("undefined" != typeof Element && Element instanceof Object) {
                            if (!(t instanceof pe(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                            var e = this.observations_;
                            e.has(t) || (e.set(t, new Ee(t)), this.controller_.addObserver(this), this.controller_.refresh())
                        }
                    }, t.prototype.unobserve = function(t) {
                        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                        if ("undefined" != typeof Element && Element instanceof Object) {
                            if (!(t instanceof pe(t).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                            var e = this.observations_;
                            e.has(t) && (e.delete(t), e.size || this.controller_.removeObserver(this))
                        }
                    }, t.prototype.disconnect = function() {
                        this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this)
                    }, t.prototype.gatherActive = function() {
                        var t = this;
                        this.clearActive(), this.observations_.forEach((function(e) {
                            e.isActive() && t.activeObservations_.push(e)
                        }))
                    }, t.prototype.broadcastActive = function() {
                        if (this.hasActive()) {
                            var t = this.callbackCtx_,
                                e = this.activeObservations_.map((function(t) {
                                    return new Ae(t.target, t.broadcastRect())
                                }));
                            this.callback_.call(t, e, t), this.clearActive()
                        }
                    }, t.prototype.clearActive = function() {
                        this.activeObservations_.splice(0)
                    }, t.prototype.hasActive = function() {
                        return this.activeObservations_.length > 0
                    }, t
                }(),
                Ie = "undefined" != typeof WeakMap ? new WeakMap : new le,
                Le = function t(e) {
                    if (!(this instanceof t)) throw new TypeError("Cannot call a class as a function.");
                    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                    var n = fe.getInstance(),
                        i = new Ce(e, n, this);
                    Ie.set(this, i)
                };
            ["observe", "unobserve", "disconnect"].forEach((function(t) {
                Le.prototype[t] = function() {
                    var e;
                    return (e = Ie.get(this))[t].apply(e, arguments)
                }
            }));
            var Oe = void 0 !== ce.ResizeObserver ? ce.ResizeObserver : Le;
            class Pe {
                constructor(t, e) {
                    this.isPaused = !0, this.handleVideoResizeBound = this.handleVideoResize.bind(this), this.handleVideoPlayStatusBound = this.handleVideoPlayStatus.bind(this), this.handlerHost = t, this.video = e, this.isPaused = e.paused, this.handlerHost = t, this.videoResizeObserver = new Oe(this.handleVideoResizeBound), this.video = e
                }
                enable() {
                    this.video.addEventListener("play", this.handleVideoPlayStatusBound), this.video.addEventListener("pause", this.handleVideoPlayStatusBound), this.videoResizeObserver.observe(this.video)
                }
                disable() {
                    this.video.removeEventListener("play", this.handleVideoPlayStatusBound), this.video.removeEventListener("pause", this.handleVideoPlayStatusBound), this.videoResizeObserver.disconnect()
                }
                handleVideoPlayStatus() {
                    this.isPaused = this.video.paused, this.handlerHost.handleUserActivity()
                }
                async handleVideoResize() {
                    this.handlerHost.handleVideoResize()
                }
            }
            class xe {
                constructor() {
                    this.currentSnapPoint = pt.CENTER, this.currentSnapPointPortrait = pt.CENTER, this.currentSnapPointLandscape = pt.CENTER, this.defaultSnapPointLandscapeOverriden = !1, this.defaultSnapPointPortraitOverriden = !1, this.centerToLeftSnapPointZone = 0, this.leftToCenterSnapPointZone = 0, this.centerToRightSnapPointZone = 0, this.rightToCenterSnapPointZone = 0
                }
                calculateSnapPoints(t, e) {
                    const n = Math.min(Math.abs(t / 2), 50);
                    this.centerToLeftSnapPointZone = -n, this.centerToRightSnapPointZone = n, this.leftToCenterSnapPointZone = t + n, this.rightToCenterSnapPointZone = e - n
                }
                getSnapPointOffset(t, e) {
                    switch (this.currentSnapPoint) {
                        case pt.LEFT:
                            return t;
                        case pt.RIGHT:
                            return e;
                        case pt.CENTER:
                        default:
                            return 0
                    }
                }
                calculateCurrentSnapPointOnDnD(t, e, n) {
                    this.overrideDefaultSnapPoint(t), e > 0 ? n < this.leftToCenterSnapPointZone ? this.currentSnapPoint = pt.LEFT : n >= this.leftToCenterSnapPointZone && n <= this.centerToRightSnapPointZone ? this.currentSnapPoint = pt.CENTER : this.currentSnapPoint = pt.RIGHT : n < this.centerToLeftSnapPointZone ? this.currentSnapPoint = pt.LEFT : n >= this.centerToLeftSnapPointZone && n <= this.rightToCenterSnapPointZone ? this.currentSnapPoint = pt.CENTER : this.currentSnapPoint = pt.RIGHT
                }
                calculateCurrentSnapPointOnModeChange(t, e) {
                    this.currentSnapPoint = t ? pt.LEFT : e ? this.currentSnapPointLandscape : this.currentSnapPointPortrait
                }
                saveSnapPointForCurrentOrientation(t) {
                    t ? this.currentSnapPointLandscape = this.currentSnapPoint : this.currentSnapPointPortrait = this.currentSnapPoint
                }
                updateDefaultSnapPointIfNeeded(t, e) {
                    if (ot()) return;
                    const n = t ? pt.CENTER : pt.LEFT;
                    if (e) {
                        if (this.defaultSnapPointLandscapeOverriden) return;
                        this.currentSnapPointLandscape = n
                    } else {
                        if (this.defaultSnapPointPortraitOverriden) return;
                        this.currentSnapPointPortrait = n
                    }
                }
                overrideDefaultSnapPoint(t) {
                    t ? this.defaultSnapPointLandscapeOverriden = !0 : this.defaultSnapPointPortraitOverriden = !0
                }
                isLeftSnappoint() {
                    return this.currentSnapPoint === pt.LEFT
                }
                isRightSnappoint() {
                    return this.currentSnapPoint === pt.RIGHT
                }
                isCenterSnappoint() {
                    return this.currentSnapPoint === pt.CENTER
                }
            }
            class ke {
                constructor() {
                    this.animationsState = {
                        [bt.MINIMIZING]: null,
                        [bt.MOVEMENT_TO_POINTER]: null,
                        [bt.MOVEMENT_TO_SNAPPOINT]: null,
                        [bt.STATE_CHANGE]: null
                    }
                }
                cancelAnimation(t, e) {
                    if (null === this.animationsState[e]) return null;
                    const n = new AnimationEvent("animationend", {
                        animationName: e
                    });
                    return t.dispatchEvent(n), this.animationsState[e]
                }
                async animateAndWaitForCompletion(t, e) {
                    if (null !== this.animationsState[e]) return this.animationsState[e];
                    this.animationsState[e] = this.animate(t, e), await this.animationsState[e], this.animationsState[e] = null
                }
                async animate(t, e) {
                    return new Promise((n => {
                        const i = o => {
                            o.animationName === e && (t.classList.toggle(`animate-${e}`, !1), t.removeEventListener("animationend", i), n())
                        };
                        t.classList.toggle(`animate-${e}`, !0), t.addEventListener("animationend", i)
                    }))
                }
                getOngoingAnimation(t) {
                    return this.animationsState[t]
                }
            }
            class Ne {
                constructor(t, {
                    translation: e,
                    subtitles: n,
                    settings: i,
                    isStream: o = !1
                }, r) {
                    this.resourceAdapter = x(), this.buttonContainer = document.createElement("ya-video-ui-container"), this.style = document.createElement("style"), this.shrunk = !1, this.overVideoModeEnabled = !1, this.insideIframe = ot(), this.hidden = !1, this.streamWaitStateValues = Object.values(K), this.waitStateValues = Object.values(Q), this.leftLimit = 0, this.rightLimit = 0, this.elementResultOffset = 0, this.elementCurrentOffset = 0, this.movementToSnapPointCanceled = !1, this.userActivityTimeout = null, this.queryCache = {}, this.query = st(this.queryCache), this.activeLabelName = At.SUBTITLES, this.buttons = [], this.video = t, this.platformAdapter = r, this.snappointController = new xe, this.animationController = new ke, this.fullscreenHandler = new re(this), this.orientationHandler = new ae(this), this.videoHandler = new Pe(this, t), this.dragAndDropHandler = new oe(this), this.initialTranslationState = Ht(e), this.initialSubtitlesState = Mt(n), this.initialSettingsState = Mt(i), this.isStream = o, this.translationButton = new qt(this, e, o), this.subtitlesButton = new Qt(this, n), this.settingsButton = new Yt(this, i), this.buttons.push(this.translationButton, this.subtitlesButton, this.settingsButton), this.createStyle(), this.createElement(), this.setLabelTextsAndMaybeAnimate(!1), this.unsetLabelWidths(), this.updateBorder(), this.toggleOverVideoMode(), this.toggleTopMode(), this.calculateActiveLabelName()
                }
                get button() {
                    return this.query(this.buttonContainer.shadowRoot, "#ya-video-ui")
                }
                get invisibleButton() {
                    return this.query(this.buttonContainer.shadowRoot, "#ya-video-ui-clone")
                }
                calculateActiveLabelName() {
                    const t = this.getTranslationState(),
                        e = this.getSubtitlesState();
                    this.activeLabelName = e === F.HIDDEN || (this.isStream ? this.streamWaitStateValues.includes(t) : t === X.IN_QUEUE) || t === F.ACTIVATED && e !== F.ACTIVATED ? At.TRANSLATION : At.SUBTITLES, this.buttonContainer.setAttribute("active-label-name", this.activeLabelName)
                }
                translationLabelIsActive() {
                    return this.activeLabelName === At.TRANSLATION
                }
                subtitlesLabelIsActive() {
                    return this.activeLabelName === At.SUBTITLES
                }
                getStateChangeAnimationMeasurements() {
                    var t, e, n, i, o;
                    return {
                        translationLabelWidth: (null === (e = null === (t = this.translationButton) || void 0 === t ? void 0 : t.getInvisibleLabelBcr()) || void 0 === e ? void 0 : e.width) || 0,
                        subtitlesLabelWidth: (null === (i = null === (n = this.subtitlesButton) || void 0 === n ? void 0 : n.getInvisibleLabelBcr()) || void 0 === i ? void 0 : i.width) || 0,
                        buttonLeft: (null === (o = this.invisibleButton) || void 0 === o ? void 0 : o.getBoundingClientRect().left) || 0
                    }
                }
                async updateControllerState(t, e, n) {
                    return this.calculateActiveLabelName(), this.buttonContainer.setAttribute(t, e), this.updateBorder(), this.setLabelTextsAndMaybeAnimate(n)
                }
                updateBorder() {
                    var t, e;
                    let n = !0;
                    for (let i = this.buttons.length - 1; i >= 0; i--) this.buttons[i].visible ? (null === (t = this.buttons[i].hostElement) || void 0 === t || t.classList.toggle("last-visible", n), n = !1) : null === (e = this.buttons[i].hostElement) || void 0 === e || e.classList.remove("last-visible")
                }
                unsetLabelWidths() {
                    this.buttonContainer && (this.buttonContainer.style.setProperty(wt.TRANSLATION_LABEL_WIDTH, "unset"), this.buttonContainer.style.setProperty(wt.SUBTITLES_LABEL_WIDTH, "unset"))
                }
                setLabelWidths(t) {
                    this.buttonContainer && (this.buttonContainer.style.setProperty(wt.TRANSLATION_LABEL_WIDTH, `${t.translationLabelWidth}px`), this.buttonContainer.style.setProperty(wt.SUBTITLES_LABEL_WIDTH, `${t.subtitlesLabelWidth}px`))
                }
                async setLabelTextsAndMaybeAnimate(t) {
                    var e, n, i, o, r, s, a;
                    if (!this.button) return;
                    const l = this.getStateChangeAnimationMeasurements(),
                        u = null !== (n = null === (e = this.translationButton) || void 0 === e ? void 0 : e.labelText) && void 0 !== n ? n : "",
                        c = null !== (o = null === (i = this.subtitlesButton) || void 0 === i ? void 0 : i.labelText) && void 0 !== o ? o : "";
                    null === (r = this.translationButton) || void 0 === r || r.setLabelText(this.getTranslationState()), null === (s = this.subtitlesButton) || void 0 === s || s.setLabelText(this.getSubtitlesState()), this.calculateLimitsAndSnapPoints(), (null === (a = this.dragAndDropHandler) || void 0 === a ? void 0 : a.pointerDown) || this.updatePosition();
                    const d = this.getStateChangeAnimationMeasurements();
                    this.setLabelWidths(d), t && !this.shrunk && (await this.cancelStateChangeAnimation(), this.animateStateChange(l, d, u, c))
                }
                cancelStateChangeAnimation() {
                    return this.button ? (this.translationButton.removeTextChangeAnimation(), this.subtitlesButton.removeTextChangeAnimation(), this.animationController.cancelAnimation(this.button, bt.STATE_CHANGE)) : null
                }
                async animateStateChange(t, e, n, i) {
                    if (!this.button) return;
                    const o = this.snappointController.isCenterSnappoint() ? t.buttonLeft - e.buttonLeft : this.elementResultOffset;
                    this.buttonContainer.style.setProperty(wt.INITIAL_TRANSFORM, `${o}px`), this.buttonContainer.style.setProperty(wt.FINAL_TRANSFORM, `${this.elementResultOffset}px`), this.translationButton.addTextChangeAnimation(n), this.subtitlesButton.addTextChangeAnimation(i), await this.animationController.animateAndWaitForCompletion(this.button, bt.STATE_CHANGE), this.translationButton.removeTextChangeAnimation(), this.subtitlesButton.removeTextChangeAnimation()
                }
                createStyle() {
                    this.style.innerHTML = Nt
                }
                createElement() {
                    this.buttonContainer.setAttribute(this.translationButton.stateAttributeName, this.initialTranslationState), this.buttonContainer.setAttribute(this.subtitlesButton.stateAttributeName, this.initialSubtitlesState), this.buttonContainer.setAttribute(this.settingsButton.stateAttributeName, this.initialSettingsState);
                    const t = this.buttonContainer.attachShadow({
                            mode: "open"
                        }),
                        e = document.createElement("template");
                    var n;
                    e.innerHTML = (n = this.buttons, Dt`${Rt(n,!1)} ${Rt(n,!0)}`), t.appendChild(e.content.cloneNode(!0))
                }
                getShrunkWidth() {
                    var t, e, n;
                    return ((null === (t = this.translationButton.getInvisibleIconContainerBcr()) || void 0 === t ? void 0 : t.width) || 0) + ((null === (e = this.subtitlesButton.getInvisibleIconContainerBcr()) || void 0 === e ? void 0 : e.width) || 0) + ((null === (n = this.settingsButton.getInvisibleIconContainerBcr()) || void 0 === n ? void 0 : n.width) || 0)
                }
                setPosition(t) {
                    this.button && (this.dragAndDropHandler.pointerDown || (this.elementResultOffset = t), this.button.style.transform = `translateX(${t}px)`)
                }
                updatePosition() {
                    this.calculateLimitsAndSnapPoints();
                    const t = this.snappointController.getSnapPointOffset(this.leftLimit, this.rightLimit);
                    return this.setPosition(t), this.toggleShrunk(!1)
                }
                updateAfterOrientationChange() {
                    this.toggleOverVideoMode(), this.snappointController.updateDefaultSnapPointIfNeeded(this.canBePositionedUnderVideo(), this.orientationHandler.isLandscape())
                }
                canBePositionedUnderVideo() {
                    var t, e;
                    if (null === (t = this.resourceAdapter) || void 0 === t ? void 0 : t.enableOverVideoPositioning) return !1;
                    const n = document.documentElement.scrollTop,
                        i = document.documentElement.clientTop || document.body.clientTop || 0,
                        o = this.video.getBoundingClientRect(),
                        r = o.top + n - i + o.height,
                        s = (null === (e = this.invisibleButton) || void 0 === e ? void 0 : e.offsetHeight) || 0;
                    return window.innerHeight - r > s
                }
                toggleOverVideoMode() {
                    if (!this.button) return;
                    const t = this.fullscreenHandler.fullscreenMode || !this.canBePositionedUnderVideo();
                    t !== this.overVideoModeEnabled && (this.overVideoModeEnabled = t, this.buttonContainer.toggleAttribute("ya-overvideo", t), this.snappointController.updateDefaultSnapPointIfNeeded(this.canBePositionedUnderVideo(), this.orientationHandler.isLandscape()))
                }
                toggleTopMode() {
                    this.insideIframe && this.buttonContainer.toggleAttribute("ya-top-mode", !this.fullscreenHandler.fullscreenMode)
                }
                async animateMinimizing(t) {
                    var e;
                    const n = this.translationLabelIsActive() ? this.translationButton.invisibleLabel : this.subtitlesButton.invisibleLabel,
                        i = this.translationLabelIsActive() ? this.translationButton.labelContainer : this.subtitlesButton.labelContainer,
                        o = this.translationButton.aliceIconContainer;
                    if (!n || !i || !o) return;
                    const r = t ? "normal" : "reverse",
                        s = null !== (e = n.getBoundingClientRect().width) && void 0 !== e ? e : 0;
                    this.buttonContainer.style.setProperty(Tt.DIRECTION, r), this.buttonContainer.style.setProperty(Tt.MAX_WIDTH, `${s}px`), o.classList.add(_t.ANIMATE_MINIMIZING_LOGO_CONTAINER), await this.animationController.animateAndWaitForCompletion(i, bt.MINIMIZING), o.classList.remove(_t.ANIMATE_MINIMIZING_LOGO_CONTAINER)
                }
                async animateMovementToPointer() {
                    if (!this.button) return;
                    const t = this.dragAndDropHandler.pointerOffsetX - ct - 10;
                    this.buttonContainer.style.setProperty(St.LEFT, `${t}px`), await this.animationController.animateAndWaitForCompletion(this.button, bt.MOVEMENT_TO_POINTER), this.elementCurrentOffset + t > this.rightLimit ? this.elementCurrentOffset = this.rightLimit : this.elementCurrentOffset += t, this.setPosition(this.elementCurrentOffset), this.dragAndDropHandler.pointerOffsetX = ct
                }
                cancelMovementToSnapPoint() {
                    return this.button ? this.animationController.cancelAnimation(this.button, bt.MOVEMENT_TO_SNAPPOINT) : null
                }
                cancelMovementToSnapPointOnDnD(t) {
                    this.cancelMovementToSnapPoint(), this.elementResultOffset = t, this.movementToSnapPointCanceled = !0
                }
                async animateMovementToSnapPoint(t) {
                    if (!this.button) return;
                    const e = Math.max(Math.abs(5 * (this.elementResultOffset - t)), 150);
                    return this.buttonContainer.style.setProperty(Et.DURATION, `${e}ms`), this.buttonContainer.style.setProperty(Et.TRANSFORM_START, `translateX(${this.elementResultOffset}px)`), this.buttonContainer.style.setProperty(Et.TRANSFORM_END, `translateX(${t}px)`), this.animationController.animateAndWaitForCompletion(this.button, bt.MOVEMENT_TO_SNAPPOINT)
                }
                async moveToSnapPoint() {
                    if (!this.button) return;
                    let t = this.snappointController.getSnapPointOffset(this.leftLimit, this.rightLimit);
                    this.animationController.getOngoingAnimation(bt.MOVEMENT_TO_POINTER) && await this.animationController.animateAndWaitForCompletion(this.button, bt.MOVEMENT_TO_POINTER), await this.animateMovementToSnapPoint(t), this.movementToSnapPointCanceled ? this.movementToSnapPointCanceled = !1 : (t = this.snappointController.getSnapPointOffset(this.leftLimit, this.rightLimit), this.setPosition(t))
                }
                shouldBeShrunk() {
                    return this.fullscreenHandler.fullscreenMode ? this.orientationHandler.isPortrait() : !(!this.snappointController.isLeftSnappoint() && !this.snappointController.isRightSnappoint()) || this.dragAndDropHandler.pointerDown
                }
                async toggleShrunk(t = !0) {
                    const e = this.shouldBeShrunk();
                    if (e !== this.shrunk) return e && t && !this.animationController.getOngoingAnimation(bt.MOVEMENT_TO_POINTER) && this.animateMovementToPointer(), this.shrunk = !this.button.hasAttribute("ya-shrunk"), this.button.toggleAttribute("ya-shrunk", this.shrunk), t ? this.animateMinimizing(e) : void 0
                }
                positionLocked() {
                    return Boolean(this.animationController.getOngoingAnimation(bt.STATE_CHANGE) || this.animationController.getOngoingAnimation(bt.MOVEMENT_TO_SNAPPOINT))
                }
                handleClick(t) {
                    this.settingsButton.shouldHandleClick(t) ? this.handleSettingsClick() : this.subtitlesButton.shouldHandleClick(t) ? this.handleSubtitlesClick() : this.translationButton.shouldHandleClick(t) && this.handleTranslationClick()
                }
                isDragOffLimits(t) {
                    return t < this.leftLimit || t > this.rightLimit
                }
                handleDragEnd() {
                    this.elementResultOffset = this.elementCurrentOffset, this.snappointController.calculateCurrentSnapPointOnDnD(this.orientationHandler.isLandscape(), this.dragAndDropHandler.movementX, this.elementResultOffset), this.toggleShrunk(), this.moveToSnapPoint()
                }
                async handleDragMove(t) {
                    this.animationController.getOngoingAnimation(bt.MOVEMENT_TO_SNAPPOINT) && this.cancelMovementToSnapPointOnDnD(t), this.snappointController.calculateCurrentSnapPointOnDnD(this.orientationHandler.isLandscape(), this.dragAndDropHandler.movementX, t), this.toggleShrunk(), this.setPosition(t), this.elementCurrentOffset = t
                }
                handleDeviceOrientationChange() {
                    this.fullscreenHandler.fullscreenMode || this.snappointController.saveSnapPointForCurrentOrientation(this.orientationHandler.isLandscape()), this.orientationHandler.setDeviceOrientation(), this.cancelMovementToSnapPoint(), this.updateAfterOrientationChange()
                }
                handleTranslationClick() {
                    this.platformAdapter.handleTranslationClick()
                }
                handleSubtitlesClick() {
                    this.platformAdapter.handleSubtitlesClick()
                }
                handleSettingsClick() {
                    this.platformAdapter.handleSettingsClick()
                }
                handleFullscreenChange() {
                    this.button && (this.cancelMovementToSnapPoint(), this.fullscreenHandler.fullscreenMode && this.snappointController.saveSnapPointForCurrentOrientation(this.orientationHandler.isLandscape()), this.toggleOverVideoMode(), this.toggleTopMode(), this.handleVideoResize(), this.handleUserActivity())
                }
                handleUserActivity() {
                    this.show(), this.hideAfterUserAction()
                }
                handleVideoResize() {
                    this.snappointController.calculateCurrentSnapPointOnModeChange(this.fullscreenHandler.fullscreenMode, this.orientationHandler.isLandscape()), this.updatePosition()
                }
                enableHandlers() {
                    this.dragAndDropHandler.element = this.button, this.dragAndDropHandler.enable(), this.fullscreenHandler.enable(), this.orientationHandler.enable(), this.videoHandler.enable()
                }
                disableHandlers() {
                    this.dragAndDropHandler.disable(), this.fullscreenHandler.disable(), this.orientationHandler.disable(), this.videoHandler.disable()
                }
                calculateLimitsAndSnapPoints() {
                    this.calculateLimits(), this.snappointController.calculateSnapPoints(this.leftLimit, this.rightLimit)
                }
                calculateLimits() {
                    if (!this.button || !this.invisibleButton) return;
                    const t = this.invisibleButton.getBoundingClientRect().x,
                        e = this.video.getBoundingClientRect();
                    this.leftLimit = e.left - t, this.rightLimit = e.right - t - this.getShrunkWidth() - 20, this.button.isConnected && (this.elementResultOffset < this.leftLimit ? this.setPosition(this.leftLimit) : this.elementResultOffset > this.rightLimit && this.setPosition(this.rightLimit))
                }
                insert() {
                    var t, e, n;
                    if (!this.video) return;
                    const i = null === (t = this.resourceAdapter) || void 0 === t ? void 0 : t.getPlayerContainer(this.video);
                    i && ((null === (e = this.resourceAdapter) || void 0 === e ? void 0 : e.containerPositionIsStatic(this.video)) && (i.style.position = "relative"), this.buttonContainer.isConnected || (i.appendChild(this.buttonContainer), this.style.isConnected || null === (n = this.buttonContainer.shadowRoot) || void 0 === n || n.appendChild(this.style), this.enableHandlers(), this.updateAfterOrientationChange(), this.setLabelWidths(this.getStateChangeAnimationMeasurements())), this.hideAfterUserAction(!0))
                }
                clearUserActivityTimeout() {
                    this.userActivityTimeout && window.clearTimeout(this.userActivityTimeout)
                }
                remove() {
                    this.clearUserActivityTimeout(), this.buttonContainer.isConnected && (this.disableHandlers(), this.buttonContainer.remove()), this.style.isConnected && this.style.remove()
                }
                toggleHidden(t) {
                    var e;
                    this.hidden = t, null === (e = this.button) || void 0 === e || e.toggleAttribute("ya-hidden", this.hidden)
                }
                hideAfterUserAction(t = !1) {
                    if (this.videoHandler.isPaused) return;
                    let e;
                    e = t ? 1e4 : this.fullscreenHandler.fullscreenMode ? 2e3 : 5e3, this.clearUserActivityTimeout(), this.userActivityTimeout = window.setTimeout((() => {
                        this.waitStateValues.includes(this.translationButton.getState()) ? this.hideAfterUserAction() : this.hide()
                    }), e)
                }
                hide() {
                    this.hidden || this.videoHandler.isPaused || this.toggleHidden(!0)
                }
                show() {
                    this.hidden && (this.clearUserActivityTimeout(), this.toggleHidden(!1))
                }
                setTranslationState(t, e = !0) {
                    this.translationButton.setState(t, e)
                }
                setSettingsState(t, e = !0) {
                    this.settingsButton.setState(t, e)
                }
                setSubtitlesState(t, e = !0) {
                    this.subtitlesButton.setState(t, e)
                }
                getTranslationState() {
                    var t, e;
                    return null !== (e = null === (t = this.translationButton) || void 0 === t ? void 0 : t.getState()) && void 0 !== e ? e : this.initialTranslationState
                }
                getSettingsState() {
                    var t, e;
                    return null !== (e = null === (t = this.settingsButton) || void 0 === t ? void 0 : t.getState()) && void 0 !== e ? e : this.initialSettingsState
                }
                getSubtitlesState() {
                    var t, e;
                    return null !== (e = null === (t = this.subtitlesButton) || void 0 === t ? void 0 : t.getState()) && void 0 !== e ? e : this.initialSubtitlesState
                }
                setTranslationWaitingTime(t) {
                    this.translationButton.setTranslationWaitingTime(t)
                }
            }
            var De, Re, Me, He, Ve, Be, $e, Ue = {},
                Fe = [],
                je = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

            function We(t, e) {
                for (var n in e) t[n] = e[n];
                return t
            }

            function Ge(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            }

            function ze(t, e, n) {
                var i, o, r, s = {};
                for (r in e) "key" == r ? i = e[r] : "ref" == r ? o = e[r] : s[r] = e[r];
                if (arguments.length > 2 && (s.children = arguments.length > 3 ? De.call(arguments, 2) : n), "function" == typeof t && null != t.defaultProps)
                    for (r in t.defaultProps) void 0 === s[r] && (s[r] = t.defaultProps[r]);
                return qe(t, s, i, o, null)
            }

            function qe(t, e, n, i, o) {
                var r = {
                    type: t,
                    props: e,
                    key: n,
                    ref: i,
                    __k: null,
                    __: null,
                    __b: 0,
                    __e: null,
                    __d: void 0,
                    __c: null,
                    __h: null,
                    constructor: void 0,
                    __v: null == o ? ++Me : o
                };
                return null == o && null != Re.vnode && Re.vnode(r), r
            }

            function Ze(t) {
                return t.children
            }

            function Xe(t, e) {
                this.props = t, this.context = e
            }

            function Ke(t, e) {
                if (null == e) return t.__ ? Ke(t.__, t.__.__k.indexOf(t) + 1) : null;
                for (var n; e < t.__k.length; e++)
                    if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
                return "function" == typeof t.type ? Ke(t) : null
            }

            function Qe(t) {
                var e, n;
                if (null != (t = t.__) && null != t.__c) {
                    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
                        if (null != (n = t.__k[e]) && null != n.__e) {
                            t.__e = t.__c.base = n.__e;
                            break
                        } return Qe(t)
                }
            }

            function Ye(t) {
                (!t.__d && (t.__d = !0) && He.push(t) && !Je.__r++ || Be !== Re.debounceRendering) && ((Be = Re.debounceRendering) || Ve)(Je)
            }

            function Je() {
                for (var t; Je.__r = He.length;) t = He.sort((function(t, e) {
                    return t.__v.__b - e.__v.__b
                })), He = [], t.some((function(t) {
                    var e, n, i, o, r, s;
                    t.__d && (r = (o = (e = t).__v).__e, (s = e.__P) && (n = [], (i = We({}, o)).__v = o.__v + 1, un(s, o, i, e.__n, void 0 !== s.ownerSVGElement, null != o.__h ? [r] : null, n, null == r ? Ke(o) : r, o.__h), cn(n, o), o.__e != r && Qe(o)))
                }))
            }

            function tn(t, e, n, i, o, r, s, a, l, u) {
                var c, d, h, v, f, g, p, m = i && i.__k || Fe,
                    b = m.length;
                for (n.__k = [], c = 0; c < e.length; c++)
                    if (null != (v = n.__k[c] = null == (v = e[c]) || "boolean" == typeof v ? null : "string" == typeof v || "number" == typeof v || "bigint" == typeof v ? qe(null, v, null, null, v) : Array.isArray(v) ? qe(Ze, {
                            children: v
                        }, null, null, null) : v.__b > 0 ? qe(v.type, v.props, v.key, null, v.__v) : v)) {
                        if (v.__ = n, v.__b = n.__b + 1, null === (h = m[c]) || h && v.key == h.key && v.type === h.type) m[c] = void 0;
                        else
                            for (d = 0; d < b; d++) {
                                if ((h = m[d]) && v.key == h.key && v.type === h.type) {
                                    m[d] = void 0;
                                    break
                                }
                                h = null
                            }
                        un(t, v, h = h || Ue, o, r, s, a, l, u), f = v.__e, (d = v.ref) && h.ref != d && (p || (p = []), h.ref && p.push(h.ref, null, v), p.push(d, v.__c || f, v)), null != f ? (null == g && (g = f), "function" == typeof v.type && v.__k === h.__k ? v.__d = l = en(v, l, t) : l = on(t, v, h, m, f, l), "function" == typeof n.type && (n.__d = l)) : l && h.__e == l && l.parentNode != t && (l = Ke(h))
                    } for (n.__e = g, c = b; c--;) null != m[c] && ("function" == typeof n.type && null != m[c].__e && m[c].__e == n.__d && (n.__d = Ke(i, c + 1)), vn(m[c], m[c]));
                if (p)
                    for (c = 0; c < p.length; c++) hn(p[c], p[++c], p[++c])
            }

            function en(t, e, n) {
                for (var i, o = t.__k, r = 0; o && r < o.length; r++)(i = o[r]) && (i.__ = t, e = "function" == typeof i.type ? en(i, e, n) : on(n, i, i, o, i.__e, e));
                return e
            }

            function nn(t, e) {
                return e = e || [], null == t || "boolean" == typeof t || (Array.isArray(t) ? t.some((function(t) {
                    nn(t, e)
                })) : e.push(t)), e
            }

            function on(t, e, n, i, o, r) {
                var s, a, l;
                if (void 0 !== e.__d) s = e.__d, e.__d = void 0;
                else if (null == n || o != r || null == o.parentNode) t: if (null == r || r.parentNode !== t) t.appendChild(o), s = null;
                    else {
                        for (a = r, l = 0;
                            (a = a.nextSibling) && l < i.length; l += 2)
                            if (a == o) break t;
                        t.insertBefore(o, r), s = r
                    } return void 0 !== s ? s : o.nextSibling
            }

            function rn(t, e, n) {
                "-" === e[0] ? t.setProperty(e, n) : t[e] = null == n ? "" : "number" != typeof n || je.test(e) ? n : n + "px"
            }

            function sn(t, e, n, i, o) {
                var r;
                t: if ("style" === e)
                    if ("string" == typeof n) t.style.cssText = n;
                    else {
                        if ("string" == typeof i && (t.style.cssText = i = ""), i)
                            for (e in i) n && e in n || rn(t.style, e, "");
                        if (n)
                            for (e in n) i && n[e] === i[e] || rn(t.style, e, n[e])
                    }
                else if ("o" === e[0] && "n" === e[1]) r = e !== (e = e.replace(/Capture$/, "")), e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + r] = n, n ? i || t.addEventListener(e, r ? ln : an, r) : t.removeEventListener(e, r ? ln : an, r);
                else if ("dangerouslySetInnerHTML" !== e) {
                    if (o) e = e.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
                    else if ("href" !== e && "list" !== e && "form" !== e && "tabIndex" !== e && "download" !== e && e in t) try {
                        t[e] = null == n ? "" : n;
                        break t
                    } catch (t) {}
                    "function" == typeof n || (null != n && (!1 !== n || "a" === e[0] && "r" === e[1]) ? t.setAttribute(e, n) : t.removeAttribute(e))
                }
            }

            function an(t) {
                this.l[t.type + !1](Re.event ? Re.event(t) : t)
            }

            function ln(t) {
                this.l[t.type + !0](Re.event ? Re.event(t) : t)
            }

            function un(t, e, n, i, o, r, s, a, l) {
                var u, c, d, h, v, f, g, p, m, b, _, y = e.type;
                if (void 0 !== e.constructor) return null;
                null != n.__h && (l = n.__h, a = e.__e = n.__e, e.__h = null, r = [a]), (u = Re.__b) && u(e);
                try {
                    t: if ("function" == typeof y) {
                        if (p = e.props, m = (u = y.contextType) && i[u.__c], b = u ? m ? m.props.value : u.__ : i, n.__c ? g = (c = e.__c = n.__c).__ = c.__E : ("prototype" in y && y.prototype.render ? e.__c = c = new y(p, b) : (e.__c = c = new Xe(p, b), c.constructor = y, c.render = fn), m && m.sub(c), c.props = p, c.state || (c.state = {}), c.context = b, c.__n = i, d = c.__d = !0, c.__h = []), null == c.__s && (c.__s = c.state), null != y.getDerivedStateFromProps && (c.__s == c.state && (c.__s = We({}, c.__s)), We(c.__s, y.getDerivedStateFromProps(p, c.__s))), h = c.props, v = c.state, d) null == y.getDerivedStateFromProps && null != c.componentWillMount && c.componentWillMount(), null != c.componentDidMount && c.__h.push(c.componentDidMount);
                        else {
                            if (null == y.getDerivedStateFromProps && p !== h && null != c.componentWillReceiveProps && c.componentWillReceiveProps(p, b), !c.__e && null != c.shouldComponentUpdate && !1 === c.shouldComponentUpdate(p, c.__s, b) || e.__v === n.__v) {
                                c.props = p, c.state = c.__s, e.__v !== n.__v && (c.__d = !1), c.__v = e, e.__e = n.__e, e.__k = n.__k, e.__k.forEach((function(t) {
                                    t && (t.__ = e)
                                })), c.__h.length && s.push(c);
                                break t
                            }
                            null != c.componentWillUpdate && c.componentWillUpdate(p, c.__s, b), null != c.componentDidUpdate && c.__h.push((function() {
                                c.componentDidUpdate(h, v, f)
                            }))
                        }
                        c.context = b, c.props = p, c.state = c.__s, (u = Re.__r) && u(e), c.__d = !1, c.__v = e, c.__P = t, u = c.render(c.props, c.state, c.context), c.state = c.__s, null != c.getChildContext && (i = We(We({}, i), c.getChildContext())), d || null == c.getSnapshotBeforeUpdate || (f = c.getSnapshotBeforeUpdate(h, v)), _ = null != u && u.type === Ze && null == u.key ? u.props.children : u, tn(t, Array.isArray(_) ? _ : [_], e, n, i, o, r, s, a, l), c.base = e.__e, e.__h = null, c.__h.length && s.push(c), g && (c.__E = c.__ = null), c.__e = !1
                    } else null == r && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = dn(n.__e, e, n, i, o, r, s, l);
                    (u = Re.diffed) && u(e)
                }
                catch (t) {
                    e.__v = null, (l || null != r) && (e.__e = a, e.__h = !!l, r[r.indexOf(a)] = null), Re.__e(t, e, n)
                }
            }

            function cn(t, e) {
                Re.__c && Re.__c(e, t), t.some((function(e) {
                    try {
                        t = e.__h, e.__h = [], t.some((function(t) {
                            t.call(e)
                        }))
                    } catch (t) {
                        Re.__e(t, e.__v)
                    }
                }))
            }

            function dn(t, e, n, i, o, r, s, a) {
                var l, u, c, d = n.props,
                    h = e.props,
                    v = e.type,
                    f = 0;
                if ("svg" === v && (o = !0), null != r)
                    for (; f < r.length; f++)
                        if ((l = r[f]) && "setAttribute" in l == !!v && (v ? l.localName === v : 3 === l.nodeType)) {
                            t = l, r[f] = null;
                            break
                        } if (null == t) {
                    if (null === v) return document.createTextNode(h);
                    t = o ? document.createElementNS("http://www.w3.org/2000/svg", v) : document.createElement(v, h.is && h), r = null, a = !1
                }
                if (null === v) d === h || a && t.data === h || (t.data = h);
                else {
                    if (r = r && De.call(t.childNodes), u = (d = n.props || Ue).dangerouslySetInnerHTML, c = h.dangerouslySetInnerHTML, !a) {
                        if (null != r)
                            for (d = {}, f = 0; f < t.attributes.length; f++) d[t.attributes[f].name] = t.attributes[f].value;
                        (c || u) && (c && (u && c.__html == u.__html || c.__html === t.innerHTML) || (t.innerHTML = c && c.__html || ""))
                    }
                    if (function(t, e, n, i, o) {
                            var r;
                            for (r in n) "children" === r || "key" === r || r in e || sn(t, r, null, n[r], i);
                            for (r in e) o && "function" != typeof e[r] || "children" === r || "key" === r || "value" === r || "checked" === r || n[r] === e[r] || sn(t, r, e[r], n[r], i)
                        }(t, h, d, o, a), c) e.__k = [];
                    else if (f = e.props.children, tn(t, Array.isArray(f) ? f : [f], e, n, i, o && "foreignObject" !== v, r, s, r ? r[0] : n.__k && Ke(n, 0), a), null != r)
                        for (f = r.length; f--;) null != r[f] && Ge(r[f]);
                    a || ("value" in h && void 0 !== (f = h.value) && (f !== d.value || f !== t.value || "progress" === v && !f) && sn(t, "value", f, d.value, !1), "checked" in h && void 0 !== (f = h.checked) && f !== t.checked && sn(t, "checked", f, d.checked, !1))
                }
                return t
            }

            function hn(t, e, n) {
                try {
                    "function" == typeof t ? t(e) : t.current = e
                } catch (t) {
                    Re.__e(t, n)
                }
            }

            function vn(t, e, n) {
                var i, o;
                if (Re.unmount && Re.unmount(t), (i = t.ref) && (i.current && i.current !== t.__e || hn(i, null, e)), null != (i = t.__c)) {
                    if (i.componentWillUnmount) try {
                        i.componentWillUnmount()
                    } catch (t) {
                        Re.__e(t, e)
                    }
                    i.base = i.__P = null
                }
                if (i = t.__k)
                    for (o = 0; o < i.length; o++) i[o] && vn(i[o], e, "function" != typeof t.type);
                n || null == t.__e || Ge(t.__e), t.__e = t.__d = void 0
            }

            function fn(t, e, n) {
                return this.constructor(t, n)
            }

            function gn(t, e, n) {
                var i, o, r;
                Re.__ && Re.__(t, e), o = (i = "function" == typeof n) ? null : n && n.__k || e.__k, r = [], un(e, t = (!i && n || e).__k = ze(Ze, null, [t]), o || Ue, Ue, void 0 !== e.ownerSVGElement, !i && n ? [n] : o ? null : e.firstChild ? De.call(e.childNodes) : null, r, !i && n ? n : o ? o.__e : e.firstChild, i), cn(r, t)
            }

            function pn(t, e) {
                var n = {
                    __c: e = "__cC" + $e++,
                    __: t,
                    Consumer: function(t, e) {
                        return t.children(e)
                    },
                    Provider: function(t) {
                        var n, i;
                        return this.getChildContext || (n = [], (i = {})[e] = this, this.getChildContext = function() {
                            return i
                        }, this.shouldComponentUpdate = function(t) {
                            this.props.value !== t.value && n.some(Ye)
                        }, this.sub = function(t) {
                            n.push(t);
                            var e = t.componentWillUnmount;
                            t.componentWillUnmount = function() {
                                n.splice(n.indexOf(t), 1), e && e.call(t)
                            }
                        }), t.children
                    }
                };
                return n.Provider.__ = n.Consumer.contextType = n
            }
            De = Fe.slice, Re = {
                __e: function(t, e) {
                    for (var n, i, o; e = e.__;)
                        if ((n = e.__c) && !n.__) try {
                            if ((i = n.constructor) && null != i.getDerivedStateFromError && (n.setState(i.getDerivedStateFromError(t)), o = n.__d), null != n.componentDidCatch && (n.componentDidCatch(t), o = n.__d), o) return n.__E = n
                        } catch (e) {
                            t = e
                        }
                    throw t
                }
            }, Me = 0, Xe.prototype.setState = function(t, e) {
                var n;
                n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = We({}, this.state), "function" == typeof t && (t = t(We({}, n), this.props)), t && We(n, t), null != t && this.__v && (e && this.__h.push(e), Ye(this))
            }, Xe.prototype.forceUpdate = function(t) {
                this.__v && (this.__e = !0, t && this.__h.push(t), Ye(this))
            }, Xe.prototype.render = Ze, He = [], Ve = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Je.__r = 0, $e = 0;
            var mn = 0;

            function bn(t, e, n, i, o) {
                var r, s, a = {};
                for (s in e) "ref" == s ? r = e[s] : a[s] = e[s];
                var l = {
                    type: t,
                    props: a,
                    key: n,
                    ref: r,
                    __k: null,
                    __: null,
                    __b: 0,
                    __e: null,
                    __d: void 0,
                    __c: null,
                    __h: null,
                    constructor: void 0,
                    __v: --mn,
                    __source: i,
                    __self: o
                };
                if ("function" == typeof t && (r = t.defaultProps))
                    for (s in r) void 0 === a[s] && (a[s] = r[s]);
                return Re.vnode && Re.vnode(l), l
            }
            var _n, yn, wn, Tn = 0,
                Sn = [],
                En = Re.__b,
                An = Re.__r,
                Cn = Re.diffed,
                In = Re.__c,
                Ln = Re.unmount;

            function On(t, e) {
                Re.__h && Re.__h(yn, t, Tn || e), Tn = 0;
                var n = yn.__H || (yn.__H = {
                    __: [],
                    __h: []
                });
                return t >= n.__.length && n.__.push({}), n.__[t]
            }

            function Pn(t) {
                return Tn = 1, xn(jn, t)
            }

            function xn(t, e, n) {
                var i = On(_n++, 2);
                return i.t = t, i.__c || (i.__ = [n ? n(e) : jn(void 0, e), function(t) {
                    var e = i.t(i.__[0], t);
                    i.__[0] !== e && (i.__ = [e, i.__[1]], i.__c.setState({}))
                }], i.__c = yn), i.__
            }

            function kn(t, e) {
                var n = On(_n++, 3);
                !Re.__s && Fn(n.__H, e) && (n.__ = t, n.__H = e, yn.__H.__h.push(n))
            }

            function Nn(t, e) {
                var n = On(_n++, 4);
                !Re.__s && Fn(n.__H, e) && (n.__ = t, n.__H = e, yn.__h.push(n))
            }

            function Dn(t) {
                return Tn = 5, Rn((function() {
                    return {
                        current: t
                    }
                }), [])
            }

            function Rn(t, e) {
                var n = On(_n++, 7);
                return Fn(n.__H, e) && (n.__ = t(), n.__H = e, n.__h = t), n.__
            }

            function Mn(t, e) {
                return Tn = 8, Rn((function() {
                    return t
                }), e)
            }

            function Hn(t) {
                var e = yn.context[t.__c],
                    n = On(_n++, 9);
                return n.c = t, e ? (null == n.__ && (n.__ = !0, e.sub(yn)), e.props.value) : t.__
            }

            function Vn() {
                var t;
                for (Sn.sort((function(t, e) {
                        return t.__v.__b - e.__v.__b
                    })); t = Sn.pop();)
                    if (t.__P) try {
                        t.__H.__h.forEach($n), t.__H.__h.forEach(Un), t.__H.__h = []
                    } catch (e) {
                        t.__H.__h = [], Re.__e(e, t.__v)
                    }
            }
            Re.__b = function(t) {
                yn = null, En && En(t)
            }, Re.__r = function(t) {
                An && An(t), _n = 0;
                var e = (yn = t.__c).__H;
                e && (e.__h.forEach($n), e.__h.forEach(Un), e.__h = [])
            }, Re.diffed = function(t) {
                Cn && Cn(t);
                var e = t.__c;
                e && e.__H && e.__H.__h.length && (1 !== Sn.push(e) && wn === Re.requestAnimationFrame || ((wn = Re.requestAnimationFrame) || function(t) {
                    var e, n = function() {
                            clearTimeout(i), Bn && cancelAnimationFrame(e), setTimeout(t)
                        },
                        i = setTimeout(n, 100);
                    Bn && (e = requestAnimationFrame(n))
                })(Vn)), yn = null
            }, Re.__c = function(t, e) {
                e.some((function(t) {
                    try {
                        t.__h.forEach($n), t.__h = t.__h.filter((function(t) {
                            return !t.__ || Un(t)
                        }))
                    } catch (n) {
                        e.some((function(t) {
                            t.__h && (t.__h = [])
                        })), e = [], Re.__e(n, t.__v)
                    }
                })), In && In(t, e)
            }, Re.unmount = function(t) {
                Ln && Ln(t);
                var e, n = t.__c;
                n && n.__H && (n.__H.__.forEach((function(t) {
                    try {
                        $n(t)
                    } catch (t) {
                        e = t
                    }
                })), e && Re.__e(e, n.__v))
            };
            var Bn = "function" == typeof requestAnimationFrame;

            function $n(t) {
                var e = yn,
                    n = t.__c;
                "function" == typeof n && (t.__c = void 0, n()), yn = e
            }

            function Un(t) {
                var e = yn;
                t.__c = t.__(), yn = e
            }

            function Fn(t, e) {
                return !t || t.length !== e.length || e.some((function(e, n) {
                    return e !== t[n]
                }))
            }

            function jn(t, e) {
                return "function" == typeof e ? e(t) : e
            }

            function Wn(t, e) {
                for (var n in t)
                    if ("__source" !== n && !(n in e)) return !0;
                for (var i in e)
                    if ("__source" !== i && t[i] !== e[i]) return !0;
                return !1
            }

            function Gn(t) {
                this.props = t
            }

            function zn(t, e) {
                function n(t) {
                    var n = this.props.ref,
                        i = n == t.ref;
                    return !i && n && (n.call ? n(null) : n.current = null), e ? !e(this.props, t) || !i : Wn(this.props, t)
                }

                function i(e) {
                    return this.shouldComponentUpdate = n, ze(t, e)
                }
                return i.displayName = "Memo(" + (t.displayName || t.name) + ")", i.prototype.isReactComponent = !0, i.__f = !0, i
            }(Gn.prototype = new Xe).isPureReactComponent = !0, Gn.prototype.shouldComponentUpdate = function(t, e) {
                return Wn(this.props, t) || Wn(this.state, e)
            };
            var qn = Re.__b;
            Re.__b = function(t) {
                t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), qn && qn(t)
            };
            var Zn = Re.__e;
            Re.__e = function(t, e, n) {
                if (t.then)
                    for (var i, o = e; o = o.__;)
                        if ((i = o.__c) && i.__c) return null == e.__e && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
                Zn(t, e, n)
            };
            var Xn = Re.unmount;

            function Kn() {
                this.__u = 0, this.t = null, this.__b = null
            }

            function Qn(t) {
                var e = t.__.__c;
                return e && e.__e && e.__e(t)
            }

            function Yn() {
                this.u = null, this.o = null
            }
            Re.unmount = function(t) {
                var e = t.__c;
                e && e.__R && e.__R(), e && !0 === t.__h && (t.type = null), Xn && Xn(t)
            }, (Kn.prototype = new Xe).__c = function(t, e) {
                var n = e.__c,
                    i = this;
                null == i.t && (i.t = []), i.t.push(n);
                var o = Qn(i.__v),
                    r = !1,
                    s = function() {
                        r || (r = !0, n.__R = null, o ? o(a) : a())
                    };
                n.__R = s;
                var a = function() {
                        if (!--i.__u) {
                            if (i.state.__e) {
                                var t = i.state.__e;
                                i.__v.__k[0] = function t(e, n, i) {
                                    return e && (e.__v = null, e.__k = e.__k && e.__k.map((function(e) {
                                        return t(e, n, i)
                                    })), e.__c && e.__c.__P === n && (e.__e && i.insertBefore(e.__e, e.__d), e.__c.__e = !0, e.__c.__P = i)), e
                                }(t, t.__c.__P, t.__c.__O)
                            }
                            var e;
                            for (i.setState({
                                    __e: i.__b = null
                                }); e = i.t.pop();) e.forceUpdate()
                        }
                    },
                    l = !0 === e.__h;
                i.__u++ || l || i.setState({
                    __e: i.__b = i.__v.__k[0]
                }), t.then(s, s)
            }, Kn.prototype.componentWillUnmount = function() {
                this.t = []
            }, Kn.prototype.render = function(t, e) {
                if (this.__b) {
                    if (this.__v.__k) {
                        var n = document.createElement("div"),
                            i = this.__v.__k[0].__c;
                        this.__v.__k[0] = function t(e, n, i) {
                            return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach((function(t) {
                                "function" == typeof t.__c && t.__c()
                            })), e.__c.__H = null), null != (e = function(t, e) {
                                for (var n in e) t[n] = e[n];
                                return t
                            }({}, e)).__c && (e.__c.__P === i && (e.__c.__P = n), e.__c = null), e.__k = e.__k && e.__k.map((function(e) {
                                return t(e, n, i)
                            }))), e
                        }(this.__b, n, i.__O = i.__P)
                    }
                    this.__b = null
                }
                var o = e.__e && ze(Ze, null, t.fallback);
                return o && (o.__h = null), [ze(Ze, null, e.__e ? null : t.children), o]
            };
            var Jn = function(t, e, n) {
                if (++n[1] === n[0] && t.o.delete(e), t.props.revealOrder && ("t" !== t.props.revealOrder[0] || !t.o.size))
                    for (n = t.u; n;) {
                        for (; n.length > 3;) n.pop()();
                        if (n[1] < n[0]) break;
                        t.u = n = n[2]
                    }
            };

            function ti(t) {
                return this.getChildContext = function() {
                    return t.context
                }, t.children
            }

            function ei(t) {
                var e = this,
                    n = t.i;
                e.componentWillUnmount = function() {
                    gn(null, e.l), e.l = null, e.i = null
                }, e.i && e.i !== n && e.componentWillUnmount(), t.__v ? (e.l || (e.i = n, e.l = {
                    nodeType: 1,
                    parentNode: n,
                    childNodes: [],
                    appendChild: function(t) {
                        this.childNodes.push(t), e.i.appendChild(t)
                    },
                    insertBefore: function(t, n) {
                        this.childNodes.push(t), e.i.appendChild(t)
                    },
                    removeChild: function(t) {
                        this.childNodes.splice(this.childNodes.indexOf(t) >>> 1, 1), e.i.removeChild(t)
                    }
                }), gn(ze(ti, {
                    context: e.context
                }, t.__v), e.l)) : e.l && e.componentWillUnmount()
            }

            function ni(t, e) {
                return ze(ei, {
                    __v: t,
                    i: e
                })
            }(Yn.prototype = new Xe).__e = function(t) {
                var e = this,
                    n = Qn(e.__v),
                    i = e.o.get(t);
                return i[0]++,
                    function(o) {
                        var r = function() {
                            e.props.revealOrder ? (i.push(o), Jn(e, t, i)) : o()
                        };
                        n ? n(r) : r()
                    }
            }, Yn.prototype.render = function(t) {
                this.u = null, this.o = new Map;
                var e = nn(t.children);
                t.revealOrder && "b" === t.revealOrder[0] && e.reverse();
                for (var n = e.length; n--;) this.o.set(e[n], this.u = [1, 0, this.u]);
                return t.children
            }, Yn.prototype.componentDidUpdate = Yn.prototype.componentDidMount = function() {
                var t = this;
                this.o.forEach((function(e, n) {
                    Jn(t, n, e)
                }))
            };
            var ii = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
                oi = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
                ri = "undefined" != typeof document,
                si = function(t) {
                    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(t)
                };
            Xe.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach((function(t) {
                Object.defineProperty(Xe.prototype, t, {
                    configurable: !0,
                    get: function() {
                        return this["UNSAFE_" + t]
                    },
                    set: function(e) {
                        Object.defineProperty(this, t, {
                            configurable: !0,
                            writable: !0,
                            value: e
                        })
                    }
                })
            }));
            var ai = Re.event;

            function li() {}

            function ui() {
                return this.cancelBubble
            }

            function ci() {
                return this.defaultPrevented
            }
            Re.event = function(t) {
                return ai && (t = ai(t)), t.persist = li, t.isPropagationStopped = ui, t.isDefaultPrevented = ci, t.nativeEvent = t
            };
            var di = {
                    configurable: !0,
                    get: function() {
                        return this.class
                    }
                },
                hi = Re.vnode;
            Re.vnode = function(t) {
                var e = t.type,
                    n = t.props,
                    i = n;
                if ("string" == typeof e) {
                    var o = -1 === e.indexOf("-");
                    for (var r in i = {}, n) {
                        var s = n[r];
                        ri && "children" === r && "noscript" === e || "value" === r && "defaultValue" in n && null == s || ("defaultValue" === r && "value" in n && null == n.value ? r = "value" : "download" === r && !0 === s ? s = "" : /ondoubleclick/i.test(r) ? r = "ondblclick" : /^onchange(textarea|input)/i.test(r + e) && !si(n.type) ? r = "oninput" : /^onfocus$/i.test(r) ? r = "onfocusin" : /^onblur$/i.test(r) ? r = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp)/.test(r) ? r = r.toLowerCase() : o && oi.test(r) ? r = r.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === s && (s = void 0), i[r] = s)
                    }
                    "select" == e && i.multiple && Array.isArray(i.value) && (i.value = nn(n.children).forEach((function(t) {
                        t.props.selected = -1 != i.value.indexOf(t.props.value)
                    }))), "select" == e && null != i.defaultValue && (i.value = nn(n.children).forEach((function(t) {
                        t.props.selected = i.multiple ? -1 != i.defaultValue.indexOf(t.props.value) : i.defaultValue == t.props.value
                    }))), t.props = i, n.class != n.className && (di.enumerable = "className" in n, null != n.className && (i.class = n.className), Object.defineProperty(i, "className", di))
                }
                t.$$typeof = ii, hi && hi(t)
            };
            var vi = Re.__r;
            Re.__r = function(t) {
                vi && vi(t)
            };
            let fi = pn(),
                gi = "undefined" != typeof window ? Nn : kn,
                pi = (mi = fi, (...t) => {
                    let e = Hn(mi),
                        n = Pn({});
                    return gi((() => e.on("@changed", ((e, i) => {
                        t.some((t => t in i)) && n[1]({})
                    }))), []), Rn((() => {
                        let n = e.get(),
                            i = {};
                        return t.forEach((t => {
                            i[t] = n[t]
                        })), i.dispatch = e.dispatch, i
                    }), [n[0]])
                });
            var mi;
            const bi = async (t, e) => {
                let n, i;
                try {
                    n = await fetch(t)
                } catch (t) {
                    return {
                        error: !0,
                        data: void 0
                    }
                }
                try {
                    return i = e ? await n[e]() : await n.json(), n.ok ? {
                        error: !1,
                        data: i
                    } : {
                        error: !0,
                        data: i
                    }
                } catch (t) {
                    return await n.text(), {
                        error: !0,
                        data: void 0
                    }
                }
            };
            const _i = navigator.language.slice(0, 2);
            class yi {
                constructor() {
                    this.cache = {}, this.fetchQueue = [], this.promiseCallbacks = {}, this.promiseId = 0
                }
                static normalizeTargetLanguage(t, e) {
                    return t !== e ? e : "ru"
                }
                static getCacheKey(t, e) {
                    return `${t}-${e}`
                }
                static getLangPairCode(t, e) {
                    return `${t}-${yi.normalizeTargetLanguage(t,e)}`
                }
                fetch(t, e) {
                    const n = new URL(yi.url);
                    n.searchParams.set("srv", yi.srv), n.searchParams.set("options", yi.options), n.searchParams.set("lang", t);
                    for (const t of e) n.searchParams.append("text", t);
                    return bi(n.toString())
                }
                groupedFetch(t) {
                    0 === this.fetchQueue.length && window.setTimeout((() => {
                        var t, e;
                        Object.entries((t = this.fetchQueue, e = t => t.info.lang, t.reduce(((t, n) => {
                            const i = e(n);
                            return t[i] || (t[i] = []), t[i].push(n), t
                        }), {}))).forEach((async ([t, e]) => {
                            const n = e.map((t => t.info.text)),
                                {
                                    data: i,
                                    error: o
                                } = await this.fetch(t, n);
                            e.forEach((({
                                promiseId: t,
                                queueIndex: e
                            }) => {
                                var n;
                                const {
                                    resolve: r,
                                    reject: s
                                } = this.promiseCallbacks[t];
                                o || !i ? s(i) : r({
                                    text: i.text[e],
                                    align: null === (n = i.align) || void 0 === n ? void 0 : n[e]
                                })
                            }))
                        })), this.fetchQueue = []
                    }), 0);
                    const e = "" + this.promiseId++;
                    return this.fetchQueue.push({
                        info: t,
                        promiseId: e,
                        queueIndex: this.fetchQueue.length
                    }), new Promise(((t, n) => {
                        this.promiseCallbacks[e] = {
                            resolve: t,
                            reject: n
                        }
                    }))
                }
                async translate(t, e, n = _i) {
                    const i = yi.getLangPairCode(e, n),
                        o = yi.getCacheKey(i, t);
                    return this.cache[o] || (this.cache[o] = await this.groupedFetch({
                        lang: i,
                        text: t
                    })), this.cache[o]
                }
                cleanCache() {
                    this.cache = {}
                }
            }
            yi.url = "https://browser.translate.yandex.net/api/v1/tr.json/translate", yi.srv = "yabrowser-subtitles", yi.options = "4";
            const wi = new yi,
                Ti = "ontouchstart" in window || navigator.maxTouchPoints > 0,
                Si = Object.freeze(["ru"]),
                Ei = ["\n", " ", "\t"],
                Ai = new RegExp(`([${Ei.join("")}])`);

            function Ci(t) {
                const [e, n] = t.split(":").map((t => parseInt(t)));
                return {
                    start: e,
                    end: e + n
                }
            }

            function Ii(t) {
                const [e, n] = t.split("-");
                return {
                    source: Ci(e),
                    destination: Ci(n)
                }
            }

            function Li(t, e) {
                return t.start < e.end && t.end > e.start
            }

            function Oi(t, e) {
                return t.start === e.start && t.end === e.end
            }

            function Pi(t, e) {
                const n = function(t) {
                        return t.reduce(((t, e) => (Ei.includes(e.text) || t.push(e.alignRange), t)), [])
                    }(t),
                    i = function(t, e) {
                        const n = [];
                        for (const i of e)
                            for (const e of t)
                                if (Li(i, e.source)) {
                                    const t = {
                                        source: i,
                                        destination: e.destination
                                    };
                                    n.push(t)
                                } return n
                    }(function(t) {
                        return null == t ? void 0 : t.split(",").slice(1).map(Ii)
                    }(e), n);
                return t.map((t => function(t, e, n) {
                    const i = "source" === e ? "destination" : "source",
                        o = [],
                        r = new Set;
                    for (const i of n) Li(t, i[e]) && (r.add(i), o.push(i));
                    let s = 0;
                    for (; s < o.length;) {
                        s = o.length;
                        for (const t of o)
                            for (const s of n) r.has(s) || (Li(t[e], s[e]) || Li(t[i], s[i])) && (r.add(s), o.push(s))
                    }
                    return o
                }(t.alignRange, "source", i)), [])
            }

            function xi(t, e, n) {
                if (!e || !n || !t) return;
                const i = e.findIndex((t => t.id === n.id));
                return void 0 !== i ? t[i] : void 0
            }

            function ki(t, e) {
                if (!t) return;
                const n = [];
                for (const i of t) n.some((t => Oi(i[e], t))) || n.push(i.source);
                return n
            }

            function Ni(...t) {
                return pi(...t)
            }
            const Di = pn({}),
                Ri = Di.Provider;

            function Mi() {
                return Hn(Di)
            }
            const Hi = pn("closed"),
                Vi = Hi.Provider;

            function Bi(t) {
                return t.split("-")[0]
            }

            function $i(t) {
                return t.split("-")[1]
            }

            function Ui(t) {
                return ["top", "bottom"].includes(Bi(t)) ? "x" : "y"
            }

            function Fi(t) {
                return "y" === t ? "height" : "width"
            }

            function ji(t) {
                let {
                    reference: e,
                    floating: n,
                    placement: i
                } = t;
                const o = e.x + e.width / 2 - n.width / 2,
                    r = e.y + e.height / 2 - n.height / 2;
                let s;
                switch (Bi(i)) {
                    case "top":
                        s = {
                            x: o,
                            y: e.y - n.height
                        };
                        break;
                    case "bottom":
                        s = {
                            x: o,
                            y: e.y + e.height
                        };
                        break;
                    case "right":
                        s = {
                            x: e.x + e.width,
                            y: r
                        };
                        break;
                    case "left":
                        s = {
                            x: e.x - n.width,
                            y: r
                        };
                        break;
                    default:
                        s = {
                            x: e.x,
                            y: e.y
                        }
                }
                const a = Ui(i),
                    l = Fi(a);
                switch ($i(i)) {
                    case "start":
                        s[a] = s[a] - (e[l] / 2 - n[l] / 2);
                        break;
                    case "end":
                        s[a] = s[a] + (e[l] / 2 - n[l] / 2)
                }
                return s
            }

            function Wi(t) {
                return {
                    ...t,
                    top: t.y,
                    left: t.x,
                    right: t.x + t.width,
                    bottom: t.y + t.height
                }
            }
            async function Gi(t, e) {
                void 0 === e && (e = {});
                const {
                    x: n,
                    y: i,
                    platform: o,
                    rects: r,
                    elements: s,
                    strategy: a
                } = t, {
                    boundary: l = "clippingParents",
                    rootBoundary: u = "viewport",
                    elementContext: c = "floating",
                    altBoundary: d = !1,
                    padding: h = 0
                } = e, v = function(t) {
                    return "number" != typeof t ? function(t) {
                        return {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            ...t
                        }
                    }(t) : {
                        top: t,
                        right: t,
                        bottom: t,
                        left: t
                    }
                }(h), f = s[d ? "floating" === c ? "reference" : "floating" : c], g = await o.getClippingClientRect({
                    element: await o.isElement(f) ? f : f.contextElement || await o.getDocumentElement({
                        element: s.floating
                    }),
                    boundary: l,
                    rootBoundary: u
                }), p = Wi(await o.convertOffsetParentRelativeRectToViewportRelativeRect({
                    rect: "floating" === c ? {
                        ...r.floating,
                        x: n,
                        y: i
                    } : r.reference,
                    offsetParent: await o.getOffsetParent({
                        element: s.floating
                    }),
                    strategy: a
                }));
                return {
                    top: g.top - p.top + v.top,
                    bottom: p.bottom - g.bottom + v.bottom,
                    left: g.left - p.left + v.left,
                    right: p.right - g.right + v.right
                }
            }
            const zi = Math.min,
                qi = Math.max;

            function Zi(t, e, n) {
                return qi(t, zi(e, n))
            }
            const Xi = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };

            function Ki(t) {
                return t.replace(/left|right|bottom|top/g, (t => Xi[t]))
            }
            const Qi = {
                start: "end",
                end: "start"
            };

            function Yi(t) {
                return t.replace(/start|end/g, (t => Qi[t]))
            }
            const Ji = function(t) {
                return void 0 === t && (t = {}), {
                    name: "flip",
                    options: t,
                    async fn(e) {
                        var n, i;
                        const {
                            placement: o,
                            middlewareData: r,
                            rects: s,
                            initialPlacement: a
                        } = e;
                        if (null != (n = r.flip) && n.skip) return {};
                        const {
                            mainAxis: l = !0,
                            crossAxis: u = !0,
                            fallbackPlacements: c,
                            fallbackStrategy: d = "bestFit",
                            flipAlignment: h = !0,
                            ...v
                        } = t, f = Bi(o), g = [a, ...c || (f === a || !h ? [Ki(a)] : function(t) {
                            const e = Ki(t);
                            return [Yi(t), e, Yi(e)]
                        }(a))], p = await Gi(e, v), m = [];
                        let b = (null == (i = r.flip) ? void 0 : i.overflows) || [];
                        if (l && m.push(p[f]), u) {
                            const {
                                main: t,
                                cross: e
                            } = function(t, e) {
                                const n = "start" === $i(t),
                                    i = Ui(t),
                                    o = Fi(i);
                                let r = "x" === i ? n ? "right" : "left" : n ? "bottom" : "top";
                                return e.reference[o] > e.floating[o] && (r = Ki(r)), {
                                    main: r,
                                    cross: Ki(r)
                                }
                            }(o, s);
                            m.push(p[t], p[e])
                        }
                        if (b = [...b, {
                                placement: o,
                                overflows: m
                            }], !m.every((t => t <= 0))) {
                            var _, y;
                            const t = (null != (_ = null == (y = r.flip) ? void 0 : y.index) ? _ : 0) + 1,
                                e = g[t];
                            if (e) return {
                                data: {
                                    index: t,
                                    overflows: b
                                },
                                reset: {
                                    placement: e
                                }
                            };
                            let n = "bottom";
                            switch (d) {
                                case "bestFit": {
                                    var w;
                                    const t = null == (w = b.slice().sort(((t, e) => t.overflows.filter((t => t > 0)).reduce(((t, e) => t + e), 0) - e.overflows.filter((t => t > 0)).reduce(((t, e) => t + e), 0)))[0]) ? void 0 : w.placement;
                                    t && (n = t);
                                    break
                                }
                                case "initialPlacement":
                                    n = a
                            }
                            return {
                                data: {
                                    skip: !0
                                },
                                reset: {
                                    placement: n
                                }
                            }
                        }
                        return {}
                    }
                }
            };
            const to = function(t) {
                return void 0 === t && (t = 0), {
                    name: "offset",
                    options: t,
                    fn(e) {
                        const {
                            x: n,
                            y: i,
                            placement: o,
                            rects: r
                        } = e, s = function(t) {
                            let {
                                placement: e,
                                rects: n,
                                value: i
                            } = t;
                            const o = Bi(e),
                                r = ["left", "top"].includes(o) ? -1 : 1,
                                s = "function" == typeof i ? i({
                                    ...n,
                                    placement: e
                                }) : i,
                                {
                                    mainAxis: a,
                                    crossAxis: l
                                } = "number" == typeof s ? {
                                    mainAxis: s,
                                    crossAxis: 0
                                } : {
                                    mainAxis: 0,
                                    crossAxis: 0,
                                    ...s
                                };
                            return "x" === Ui(o) ? {
                                x: l,
                                y: a * r
                            } : {
                                x: a * r,
                                y: l
                            }
                        }({
                            placement: o,
                            rects: r,
                            value: t
                        });
                        return {
                            x: n + s.x,
                            y: i + s.y,
                            data: s
                        }
                    }
                }
            };

            function eo(t) {
                return "[object Window]" === (null == t ? void 0 : t.toString())
            }

            function no(t) {
                if (null == t) return window;
                if (!eo(t)) {
                    const e = t.ownerDocument;
                    return e && e.defaultView || window
                }
                return t
            }

            function io(t) {
                return no(t).getComputedStyle(t)
            }

            function oo(t) {
                return eo(t) ? "" : t ? (t.nodeName || "").toLowerCase() : ""
            }

            function ro(t) {
                return t instanceof no(t).HTMLElement
            }

            function so(t) {
                return t instanceof no(t).Element
            }

            function ao(t) {
                return t instanceof no(t).ShadowRoot || t instanceof ShadowRoot
            }

            function lo(t) {
                const {
                    overflow: e,
                    overflowX: n,
                    overflowY: i
                } = io(t);
                return /auto|scroll|overlay|hidden/.test(e + i + n)
            }

            function uo(t) {
                return ["table", "td", "th"].includes(oo(t))
            }

            function co(t) {
                const e = navigator.userAgent.toLowerCase().includes("firefox"),
                    n = io(t);
                return "none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || ["transform", "perspective"].includes(n.willChange) || e && "filter" === n.willChange || e && !!n.filter && "none" !== n.filter
            }
            const ho = Math.min,
                vo = Math.max,
                fo = Math.round;

            function go(t, e) {
                void 0 === e && (e = !1);
                const n = t.getBoundingClientRect();
                let i = 1,
                    o = 1;
                return e && ro(t) && (i = t.offsetWidth > 0 && fo(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && fo(n.height) / t.offsetHeight || 1), {
                    width: n.width / i,
                    height: n.height / o,
                    top: n.top / o,
                    right: n.right / i,
                    bottom: n.bottom / o,
                    left: n.left / i,
                    x: n.left / i,
                    y: n.top / o
                }
            }

            function po(t) {
                return (e = t, (e instanceof no(e).Node ? t.ownerDocument : t.document) || window.document).documentElement;
                var e
            }

            function mo(t) {
                return eo(t) ? {
                    scrollLeft: t.pageXOffset,
                    scrollTop: t.pageYOffset
                } : {
                    scrollLeft: t.scrollLeft,
                    scrollTop: t.scrollTop
                }
            }

            function bo(t) {
                return go(po(t)).left + mo(t).scrollLeft
            }

            function _o(t, e, n) {
                const i = ro(e),
                    o = po(e),
                    r = go(t, i && function(t) {
                        const e = go(t);
                        return fo(e.width) !== t.offsetWidth || fo(e.height) !== t.offsetHeight
                    }(e));
                let s = {
                    scrollLeft: 0,
                    scrollTop: 0
                };
                const a = {
                    x: 0,
                    y: 0
                };
                if (i || !i && "fixed" !== n)
                    if (("body" !== oo(e) || lo(o)) && (s = mo(e)), ro(e)) {
                        const t = go(e, !0);
                        a.x = t.x + e.clientLeft, a.y = t.y + e.clientTop
                    } else o && (a.x = bo(o));
                return {
                    x: r.left + s.scrollLeft - a.x,
                    y: r.top + s.scrollTop - a.y,
                    width: r.width,
                    height: r.height
                }
            }

            function yo(t) {
                return "html" === oo(t) ? t : t.assignedSlot || t.parentNode || (ao(t) ? t.host : null) || po(t)
            }

            function wo(t) {
                return ro(t) && "fixed" !== getComputedStyle(t).position ? t.offsetParent : null
            }

            function To(t) {
                const e = no(t);
                let n = wo(t);
                for (; n && uo(n) && "static" === getComputedStyle(n).position;) n = wo(n);
                return n && ("html" === oo(n) || "body" === oo(n) && "static" === getComputedStyle(n).position && !co(n)) ? e : n || function(t) {
                    let e = yo(t);
                    for (; ro(e) && !["html", "body"].includes(oo(e));) {
                        if (co(e)) return e;
                        e = e.parentNode
                    }
                    return null
                }(t) || e
            }

            function So(t) {
                return {
                    width: t.offsetWidth,
                    height: t.offsetHeight
                }
            }

            function Eo(t) {
                return ["html", "body", "#document"].includes(oo(t)) ? t.ownerDocument.body : ro(t) && lo(t) ? t : Eo(yo(t))
            }

            function Ao(t, e) {
                var n;
                void 0 === e && (e = []);
                const i = Eo(t),
                    o = i === (null == (n = t.ownerDocument) ? void 0 : n.body),
                    r = no(i),
                    s = o ? [r].concat(r.visualViewport || [], lo(i) ? i : []) : i,
                    a = e.concat(s);
                return o ? a : a.concat(Ao(yo(s)))
            }

            function Co(t, e) {
                return "viewport" === e ? Wi(function(t) {
                    const e = no(t),
                        n = po(t),
                        i = e.visualViewport;
                    let o = n.clientWidth,
                        r = n.clientHeight,
                        s = 0,
                        a = 0;
                    return i && (o = i.width, r = i.height, Math.abs(e.innerWidth / i.scale - i.width) < .01 && (s = i.offsetLeft, a = i.offsetTop)), {
                        width: o,
                        height: r,
                        x: s,
                        y: a
                    }
                }(t)) : so(e) ? function(t) {
                    const e = go(t),
                        n = e.top + t.clientTop,
                        i = e.left + t.clientLeft;
                    return {
                        top: n,
                        left: i,
                        x: i,
                        y: n,
                        right: i + t.clientWidth,
                        bottom: n + t.clientHeight,
                        width: t.clientWidth,
                        height: t.clientHeight
                    }
                }(e) : Wi(function(t) {
                    var e;
                    const n = po(t),
                        i = mo(t),
                        o = null == (e = t.ownerDocument) ? void 0 : e.body,
                        r = vo(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
                        s = vo(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0);
                    let a = -i.scrollLeft + bo(t);
                    const l = -i.scrollTop;
                    return "rtl" === io(o || n).direction && (a += vo(n.clientWidth, o ? o.clientWidth : 0) - r), {
                        width: r,
                        height: s,
                        x: a,
                        y: l
                    }
                }(po(t)))
            }

            function Io(t) {
                const e = Ao(yo(t)),
                    n = ["absolute", "fixed"].includes(io(t).position) && ro(t) ? To(t) : t;
                return so(n) ? e.filter((t => so(t) && function(t, e) {
                    const n = null == e.getRootNode ? void 0 : e.getRootNode();
                    if (t.contains(e)) return !0;
                    if (n && ao(n)) {
                        let n = e;
                        do {
                            if (n && t === n) return !0;
                            n = n.parentNode || n.host
                        } while (n)
                    }
                    return !1
                }(t, n) && "body" !== oo(t))) : []
            }
            const Lo = {
                    getElementRects: t => {
                        let {
                            reference: e,
                            floating: n,
                            strategy: i
                        } = t;
                        return {
                            reference: _o(e, To(n), i),
                            floating: {
                                ...So(n),
                                x: 0,
                                y: 0
                            }
                        }
                    },
                    convertOffsetParentRelativeRectToViewportRelativeRect: t => function(t) {
                        let {
                            rect: e,
                            offsetParent: n,
                            strategy: i
                        } = t;
                        const o = ro(n),
                            r = po(n);
                        if (n === r) return e;
                        let s = {
                            scrollLeft: 0,
                            scrollTop: 0
                        };
                        const a = {
                            x: 0,
                            y: 0
                        };
                        if ((o || !o && "fixed" !== i) && (("body" !== oo(n) || lo(r)) && (s = mo(n)), ro(n))) {
                            const t = go(n, !0);
                            a.x = t.x + n.clientLeft, a.y = t.y + n.clientTop
                        }
                        return {
                            ...e,
                            x: e.x - s.scrollLeft + a.x,
                            y: e.y - s.scrollTop + a.y
                        }
                    }(t),
                    getOffsetParent: t => {
                        let {
                            element: e
                        } = t;
                        return To(e)
                    },
                    isElement: t => so(t),
                    getDocumentElement: t => {
                        let {
                            element: e
                        } = t;
                        return po(e)
                    },
                    getClippingClientRect: t => function(t) {
                        let {
                            element: e,
                            boundary: n,
                            rootBoundary: i
                        } = t;
                        const o = [..."clippingParents" === n ? Io(e) : [].concat(n), i],
                            r = o[0],
                            s = o.reduce(((t, n) => {
                                const i = Co(e, n);
                                return t.top = vo(i.top, t.top), t.right = ho(i.right, t.right), t.bottom = ho(i.bottom, t.bottom), t.left = vo(i.left, t.left), t
                            }), Co(e, r));
                        return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s
                    }(t),
                    getDimensions: t => {
                        let {
                            element: e
                        } = t;
                        return So(e)
                    },
                    getClientRects: t => {
                        let {
                            element: e
                        } = t;
                        return e.getClientRects()
                    }
                },
                Oo = (t, e, n) => (async (t, e, n) => {
                    const {
                        placement: i = "bottom",
                        strategy: o = "absolute",
                        middleware: r = [],
                        platform: s
                    } = n;
                    let a = await s.getElementRects({
                            reference: t,
                            floating: e,
                            strategy: o
                        }),
                        {
                            x: l,
                            y: u
                        } = ji({
                            ...a,
                            placement: i
                        }),
                        c = i,
                        d = {};
                    for (let n = 0; n < r.length; n++) {
                        const {
                            name: h,
                            fn: v
                        } = r[n], {
                            x: f,
                            y: g,
                            data: p,
                            reset: m
                        } = await v({
                            x: l,
                            y: u,
                            initialPlacement: i,
                            placement: c,
                            strategy: o,
                            middlewareData: d,
                            rects: a,
                            platform: s,
                            elements: {
                                reference: t,
                                floating: e
                            }
                        });
                        l = null != f ? f : l, u = null != g ? g : u, d = {
                            ...d,
                            [h]: null != p ? p : {}
                        }, m && ("object" == typeof m && (m.placement && (c = m.placement), m.rects && (a = !0 === m.rects ? await s.getElementRects({
                            reference: t,
                            floating: e,
                            strategy: o
                        }) : m.rects), ({
                            x: l,
                            y: u
                        } = ji({
                            ...a,
                            placement: c
                        }))), n = -1)
                    }
                    return {
                        x: l,
                        y: u,
                        placement: c,
                        strategy: o,
                        middlewareData: d
                    }
                })(t, e, {
                    platform: Lo,
                    ...n
                });

            function Po(t, e) {
                const n = t && t.current,
                    i = Dn(null),
                    o = Mn((() => {
                        t && t.current && i.current && i.current.observe(t.current)
                    }), []);
                kn((() => (i && i.current && n && i.current.unobserve(n), i.current = new Oe(e), o(), () => {
                    i && i.current && t && t.current && i.current.unobserve(t.current)
                })), [n, e])
            }

            function xo({
                middleware: t,
                placement: e,
                strategy: n
            } = {}) {
                const i = Dn(null),
                    o = Dn(null),
                    [r, s] = Pn({
                        x: null,
                        y: null,
                        strategy: null != n ? n : "absolute",
                        placement: "bottom",
                        middlewareData: {}
                    }),
                    a = function(t) {
                        const e = Dn(t);
                        return Nn((() => {
                            e.current = t
                        })), e
                    }(t),
                    l = Mn((() => {
                        i.current && o.current && Oo(i.current, o.current, {
                            middleware: a.current,
                            placement: e,
                            strategy: n
                        }).then(s)
                    }), [a, e, n]);
                Nn(l, [l]), Po(o, l);
                const u = Mn((t => {
                        i.current = t, l()
                    }), [l]),
                    c = Mn((t => {
                        o.current = t, l()
                    }), [l]);
                return Rn((() => Object.assign(Object.assign({}, r), {
                    update: l,
                    reference: u,
                    floating: c,
                    refs: {
                        reference: i,
                        floating: o
                    }
                })), [r, l, u, c])
            }

            function ko(t) {
                if (t.length < 3) return t;
                const e = [];
                for (let n = 0; n < t.length - 2; n++) {
                    const i = t[n],
                        o = i.startMs + i.durationMs,
                        r = t[n + 1];
                    r.startMs - o < 500 ? e.push(Object.assign(Object.assign({}, i), {
                        durationMs: r.startMs - i.startMs
                    })) : e.push(i)
                }
                return e
            }

            function No(t) {
                return Boolean(t && "startMs" in t)
            }
            const Do = (t, e) => {
                    const n = No(t[0]);
                    let i = 0;
                    return t.reduce(((o, r, s) => {
                        const a = t[s + 1],
                            l = o[o.length - 1],
                            u = (null == l ? void 0 : l.alignRange.end) || 0,
                            c = u + r.text.length;
                        if (o.push(Object.assign(Object.assign({}, r), {
                                id: i++,
                                alignRange: {
                                    start: u,
                                    end: c
                                }
                            })), n && a) {
                            const t = r,
                                n = a,
                                s = i++,
                                l = t.startMs + t.durationMs,
                                u = n.startMs ? n.startMs - l : e - l;
                            o.push(((t, e, n, i) => ({
                                text: " ",
                                startMs: e,
                                durationMs: n,
                                id: t,
                                alignRange: {
                                    start: i,
                                    end: i + 1
                                }
                            }))(s, l, u, c))
                        }
                        return o
                    }), [])
                },
                Ro = t => {
                    let e = 0;
                    return t.trim().split(Ai).reduce(((t, n) => {
                        if (n.length) {
                            const i = t[t.length - 1],
                                o = (null == i ? void 0 : i.alignRange.end) || 0,
                                r = o + n.length;
                            t.push({
                                text: n,
                                id: e++,
                                alignRange: {
                                    start: o,
                                    end: r
                                }
                            })
                        }
                        return t
                    }), [])
                };

            function Mo(t, e) {
                const n = Math.floor(e.durationMs / t.length),
                    i = e.startMs + e.durationMs;
                return t.map(((o, r) => {
                    const s = r === t.length - 1,
                        a = e.startMs + n * r,
                        l = s ? i - a : n;
                    return Object.assign(Object.assign({}, o), {
                        startMs: a,
                        durationMs: l
                    })
                }))
            }
            const Ho = t => " " === (null == t ? void 0 : t.text) || "\t" === (null == t ? void 0 : t.text);

            function Vo(t) {
                return t.map((t => t.tokens ? Object.assign(Object.assign({}, t), {
                    tokens: t.tokens.filter(((t, e, n) => {
                        if (Ho(t)) {
                            const t = 0 === e,
                                i = e === n.length - 1,
                                o = Ho(n[e - 1]);
                            if (t || i || o) return !1
                        }
                        return !0
                    }))
                }) : t))
            }
            const Bo = async (t, e) => {
                if (t && null !== t.data) {
                    if ("number" == typeof t.data) return (async (t, e) => {
                        let n;
                        try {
                            n = (await e.getLocalTracks())[t]
                        } catch (t) {}
                        if (!n) return;
                        const i = await e.fetchSubtitles(n),
                            o = null == i ? void 0 : i.data;
                        return o ? {
                            subtitlesItems: e.formatSubtitles(o),
                            languageCode: n.languageCode
                        } : void 0
                    })(t.data, e);
                    return {
                        subtitlesItems: (t => {
                            var e;
                            try {
                                const n = JSON.parse(t).subtitles,
                                    i = [];
                                for (const t of n) {
                                    const n = t.startMs + t.durationMs;
                                    let o;
                                    o = (null === (e = t.tokens) || void 0 === e ? void 0 : e.length) ? Do(t.tokens, n) : Mo(Ro(t.text), t), i.push(Object.assign(Object.assign({}, t), {
                                        tokens: o
                                    }))
                                }
                                return i
                            } catch (t) {
                                return
                            }
                        })(t.data),
                        languageCode: t.lang
                    }
                }
            };

            function $o() {
                const t = Mi(),
                    {
                        dispatch: e
                    } = Ni(),
                    n = function() {
                        const t = Mi(),
                            [e, n] = Pn(t.video.subtitlesData);
                        return Nn((() => (t.video.on("subtitlesDataChanged", n), () => {
                            t.video.off("subtitlesDataChanged", n)
                        })), []), e
                    }();
                var i;
                i = async () => {
                    const i = await Bo(n, t.subtitlesService);
                    if (!i) return;
                    const {
                        subtitlesItems: o,
                        languageCode: r
                    } = i;
                    o && r && (e("setSubtitleItems", (t => {
                        let e = t;
                        return [Vo, ko].forEach((t => {
                            e = t(e)
                        })), e
                    })(o)), e("setSelectedSubtitleTrack", {
                        languageCode: r
                    }))
                }, kn((() => {
                    i()
                }), [n])
            }
            var Uo = {
                    exports: {}
                },
                Fo = {};

            function jo(t) {
                function e(e, o, r, s) {
                    var a = o ? n + e + t.e + o : n + e,
                        l = a;
                    if (r) {
                        var u = " " + l + t.m;
                        for (var c in r)
                            if (r.hasOwnProperty(c)) {
                                var d = r[c];
                                !0 === d ? l += u + c : d && (l += u + c + i + d)
                            }
                    }
                    if (void 0 !== s)
                        for (var h = 0, v = s.length; h < v; h++) {
                            var f = s[h];
                            if (f && "string" == typeof f.valueOf())
                                for (var g = f.valueOf().split(" "), p = 0; p < g.length; p++) {
                                    var m = g[p];
                                    m !== a && (l += " " + m)
                                }
                        }
                    return l
                }
                var n = t.n || "",
                    i = t.v || t.m;
                return function(t, n) {
                    return function(i, o, r) {
                        return "string" == typeof i ? Array.isArray(o) ? e(t, i, void 0, o) : e(t, i, o, r) : e(t, n, i, o)
                    }
                }
            }
            Object.defineProperty(Fo, "__esModule", {
                value: !0
            });
            var Wo = jo({
                e: "-",
                m: "_"
            });
            Fo.cn = Wo, Fo.withNaming = jo, Uo.exports = Fo;
            const Go = Uo.exports.cn("DraggablePanel");

            function zo(t, e, n) {
                return t > n ? n : t < e ? e : t
            }

            function qo(t, e) {
                return 0 === t || 0 === e ? 0 : t / e * 100
            }

            function Zo(t, e) {
                return {
                    width: t.offsetWidth - e.offsetWidth,
                    height: t.offsetHeight - e.offsetHeight
                }
            }
            const Xo = zn((t => {
                    const {
                        children: e,
                        limitToBottomBound: n,
                        onPositionChanged: i,
                        onDragStart: o,
                        onDragEnd: r
                    } = t, s = Dn(null), a = Dn(null), l = Dn(null), [u, c] = Pn(!1), [d, h] = Pn({
                        x: 50,
                        y: 100
                    }), [v, f] = Pn({
                        x: 0,
                        y: 0
                    }), g = Dn({
                        x: 0,
                        y: 0
                    }), p = Mn((t => {
                        t.preventDefault();
                        const e = s.current,
                            n = a.current;
                        if (!e || !n) return;
                        const i = e.getBoundingClientRect(),
                            o = Zo(e, n),
                            r = function(t, e, n) {
                                return {
                                    x: t.pageX - e.left - n.x,
                                    y: t.pageY - e.top - n.y
                                }
                            }(t, i, g.current),
                            l = qo(r.x, o.width),
                            u = qo(r.y, o.height);
                        h({
                            x: l,
                            y: u
                        })
                    }), []), m = Mn((() => {
                        const t = s.current,
                            e = a.current;
                        if (!t || !e) return;
                        const i = t.getBoundingClientRect(),
                            o = Zo(t, e),
                            r = o.width / 100 * d.x,
                            l = o.height / 100 * d.y,
                            u = zo(r, 0, o.width),
                            c = window.innerHeight - i.bottom,
                            h = zo(l, 0, n ? t.offsetHeight : t.offsetHeight + c);
                        f({
                            x: Math.round(u),
                            y: Math.round(h)
                        })
                    }), [d.x, d.y]);
                    Nn(m, [m]), Po(s, m), Po(a, m), Nn(i, [v.x, v.y]);
                    const b = Mn((t => {
                            c(!1);
                            const e = t.target;
                            null == r || r(v), e.removeEventListener("pointermove", p), e.releasePointerCapture(t.pointerId)
                        }), [p, r, v]),
                        _ = Mn((t => {
                            const e = a.current,
                                n = t.target;
                            if (!e) return;
                            const i = e.getBoundingClientRect();
                            g.current = {
                                x: t.pageX - i.x,
                                y: t.pageY - i.y
                            }, c(!0), null == o || o(v), n.addEventListener("pointermove", p), n.setPointerCapture(t.pointerId)
                        }), [o, v]);
                    return bn("div", Object.assign({
                        ref: s,
                        className: Go({
                            isDragging: u
                        })
                    }, {
                        children: bn("div", Object.assign({
                            className: Go("Box"),
                            ref: a,
                            style: {
                                transform: `translate3d(${v.x}px, ${v.y}px, 0)`
                            }
                        }, {
                            children: bn("div", Object.assign({
                                ref: l,
                                className: Go("BoxIn"),
                                onPointerDown: _,
                                onPointerUp: b
                            }, {
                                children: e
                            }), void 0)
                        }), void 0)
                    }), void 0)
                })),
                Ko = Uo.exports.cn("Popover"),
                Qo = ({
                    style: t,
                    innerRef: e,
                    children: n
                }) => bn("div", Object.assign({
                    ref: e,
                    className: Ko(),
                    style: t
                }, {
                    children: n
                }), void 0);
            var Yo, Jo;
            ! function(t) {
                t.ABSOLUTE = "absolute", t.FIXED = "fixed"
            }(Yo || (Yo = {})),
            function(t) {
                t.ACTIVE = "active", t.PASSED = "passed", t.UPCOMING = "upcoming"
            }(Jo || (Jo = {}));
            const tr = Uo.exports.cn("Subtitles"),
                er = ({
                    backgroundRef: t,
                    containerRef: e
                }) => {
                    const n = Dn(null),
                        [i, o] = Pn();
                    return Nn((() => {
                        const t = e.current;
                        if (!t) return;
                        const n = () => {
                            const {
                                width: e,
                                height: n
                            } = t.getBoundingClientRect();
                            return {
                                width: e,
                                height: n,
                                top: t.offsetTop,
                                position: "absolute",
                                left: 0,
                                background: "rgba(22, 23, 31)",
                                borderRadius: "0.375em"
                            }
                        };
                        o(n());
                        const i = new Oe((() => {
                            o(n())
                        }));
                        return i.observe(t), () => {
                            i.disconnect()
                        }
                    }), []), t.current ? ni(bn("div", {
                        ref: n,
                        style: i
                    }, void 0), t.current) : null
                };
            const nr = Uo.exports.cn("SubtitlesToken"),
                ir = t => {
                    var {
                        text: e,
                        isSelected: n,
                        isActive: i,
                        isPassed: o,
                        isTranslatable: r,
                        isInSelectedGroup: s,
                        isPrevHighlighted: a,
                        isNextHighlighted: l,
                        isInHoveredGroup: u
                    } = t, c = function(t, e) {
                        var n = {};
                        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (n[i] = t[i]);
                        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                            var o = 0;
                            for (i = Object.getOwnPropertySymbols(t); o < i.length; o++) e.indexOf(i[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[o]) && (n[i[o]] = t[i[o]])
                        }
                        return n
                    }(t, ["text", "isSelected", "isActive", "isPassed", "isTranslatable", "isInSelectedGroup", "isPrevHighlighted", "isNextHighlighted", "isInHoveredGroup"]);
                    return bn("span", Object.assign({
                        className: nr({
                            isSelected: n,
                            isActive: i,
                            isPassed: o,
                            isTranslatable: r,
                            isInSelectedGroup: s,
                            isInHoveredGroup: u,
                            isPrevHighlighted: a,
                            isNextHighlighted: l
                        })
                    }, c, {
                        children: e
                    }), void 0)
                };

            function or(t, e) {
                const {
                    subtitlesBridge: n,
                    subtitleItems: i
                } = e, o = n.video.player.currentTime, r = n.subtitlesService.getCurrentSubtitle(i, o), s = r ? n.subtitlesService.getActiveTokenTime(r, o) : void 0, a = r !== t.currentSubtitle, l = s !== t.activeTokenTime;
                return a || l ? {
                    currentSubtitle: r,
                    activeTokenTime: s
                } : t
            }

            function rr() {
                const t = Mi(),
                    {
                        subtitleItems: e,
                        isPaused: n,
                        seekedTime: i
                    } = Ni("subtitleItems", "isPaused", "seekedTime"),
                    [o, r] = xn(or, {}),
                    {
                        play: s,
                        stop: a
                    } = function(t, e) {
                        const n = Dn(),
                            i = Mn((() => {
                                t(), o()
                            }), e),
                            o = Mn((() => {
                                n.current = requestAnimationFrame(i)
                            }), [i]),
                            r = Mn((() => {
                                n.current && cancelAnimationFrame(n.current)
                            }), []);
                        return Rn((() => ({
                            play: o,
                            stop: r
                        })), [o, r])
                    }((() => {
                        r({
                            subtitlesBridge: t,
                            subtitleItems: e
                        })
                    }), [e]);
                return kn((() => (n ? a() : s(), r({
                    subtitlesBridge: t,
                    subtitleItems: e
                }), () => {
                    a()
                })), [s, a, n, i]), o
            }
            const sr = (t, e) => {
                const n = function() {
                    const t = Dn(!0);
                    return t.current ? (t.current = !1, !0) : t.current
                }();
                Nn((() => {
                    if (!n) return t()
                }), e)
            };
            const ar = document.createElement("canvas").getContext("2d");

            function lr(t, e, n) {
                var i, o;
                if (!t) return;
                const r = function() {
                        const t = Dn({});
                        return Mn((e => {
                            let n = 0;
                            const i = e.text.split("");
                            for (const e of i) t.current[e] || (t.current[e] = (o = e, ar.measureText(o).width / 10)), n += t.current[e];
                            var o;
                            return n
                        }), [])
                    }(),
                    s = function(t, e, n) {
                        return Rn((() => {
                            if (!e) return;
                            const i = [];
                            let o = 0;
                            for (const r of t.tokens) {
                                const t = n(r),
                                    s = o + t <= e;
                                "\n" === r.text ? (i.push([]), o = 0) : s || Ho(r) ? (i.length || i.push([]), i[i.length - 1].push(r), o += t) : (i.push([r]), o = t)
                            }
                            return i
                        }), [t, e])
                    }(t, (null !== (o = null === (i = n.current) || void 0 === i ? void 0 : i.offsetWidth) && void 0 !== o ? o : 0) / Mi().size * .8, r);
                if (!e || !s) return s;
                return function(t, e, n) {
                    return Rn((() => {
                        if (!t) return e;
                        for (const e of t) {
                            const {
                                start: t,
                                end: i
                            } = e;
                            if (void 0 !== t && void 0 !== i && n >= t && n <= i) return e.lines.map((t => t.map((t => Object.assign(Object.assign({}, t), {
                                alignRange: {
                                    start: t.alignRange.start - e.alignStart,
                                    end: t.alignRange.end - e.alignStart
                                }
                            })))))
                        }
                    }), [e, t, n])
                }(function(t, e) {
                    return Rn((() => {
                        const n = e.startMs + e.durationMs,
                            i = [];
                        for (let e = 0; e < t.length; e += 2) {
                            const o = t.slice(e, e + 2),
                                r = o[0],
                                s = null == r ? void 0 : r[0],
                                a = o[o.length - 1],
                                l = null == a ? void 0 : a[a.length - 1];
                            if (!s || !l) return;
                            const u = No(l) ? l.startMs + l.durationMs : void 0,
                                c = No(s) ? s.startMs : void 0,
                                d = e + 2 >= t.length;
                            i.push({
                                lines: o,
                                end: d ? n : u,
                                start: c,
                                alignStart: s.alignRange.start
                            })
                        }
                        return i
                    }), [t])
                }(s, t), s, e)
            }

            function ur(t, e) {
                return !(!t || t.length < 2) && t.some((t => Li(e.alignRange, t)))
            }

            function cr(t, e) {
                return !(!t.isInSelectedGroup || !(null == e ? void 0 : e.isInSelectedGroup)) || !(!t.isInHoveredGroup || !(null == e ? void 0 : e.isInHoveredGroup))
            }
            ar.font = "10px YS Text, sans-serif";
            const dr = zn((({
                    innerRef: t,
                    dragDeltaRef: e
                }) => {
                    const n = Dn(null),
                        i = Dn(null),
                        o = function(t) {
                            const {
                                dispatch: e,
                                selectedData: n,
                                selectedSubtitleTrack: i
                            } = Ni("selectedData", "selectedSubtitleTrack"), o = Mi(), r = Rn((() => Boolean(i && !Si.includes(i.languageCode))), [i]), s = !Ti, a = Dn(), l = Dn();
                            return kn((() => {
                                n || ((a.current || l.current) && o.video.player.play(), a.current = void 0, l.current = void 0)
                            }), [n]), {
                                isTranslatable: r,
                                handleClick: (i, s, u) => {
                                    var c;
                                    r && (t.current && t.current > 20 || ((null == n ? void 0 : n.token.id) === i.id ? e("setSelectedData", void 0) : (void 0 === a.current && (l.current = null !== (c = l.current) && void 0 !== c ? c : o.video.player.isPlaying, o.video.player.pause()), e("setSelectedData", {
                                        token: i,
                                        tokens: s,
                                        fullPhrase: u
                                    }))))
                                },
                                handleMouseEnter: t => {
                                    var n;
                                    e("setHoveredToken", t), s && r && (null !== (n = a.current) && void 0 !== n || (a.current = o.video.player.isPlaying), o.video.player.pause())
                                },
                                handleMouseLeave: () => {
                                    e("setHoveredToken", void 0), r && (n || (a.current && o.video.player.play(), a.current = void 0))
                                }
                            }
                        }(e),
                        r = function() {
                            const t = Mi(),
                                [e, n] = Pn(t.video.karaokeEnabled);
                            return Nn((() => (t.video.on("karaokeEnabledChanged", n), () => {
                                t.video.off("karaokeEnabledChanged", n)
                            })), []), e
                        }(),
                        {
                            selectedData: s,
                            hoveredAligns: a,
                            selectedAligns: l,
                            dispatch: u
                        } = Ni("selectedData", "hoveredAligns", "selectedAligns"),
                        {
                            currentSubtitle: c,
                            activeTokenTime: d
                        } = rr(),
                        h = lr(c, d, i),
                        v = function(t) {
                            return Rn((() => null == t ? void 0 : t.flat()), [t])
                        }(h),
                        f = function(t) {
                            return Rn((() => {
                                const e = null == t ? void 0 : t.map((t => t.map((t => t.text)).join("").trim()));
                                return null == e ? void 0 : e.join("\n")
                            }), [t])
                        }(h);
                    sr((() => {
                        u("setSelectedData", void 0)
                    }), [f]);
                    const g = c && h && v && f;
                    return bn("div", Object.assign({
                        className: tr(),
                        ref: (p = [i, t], function(t) {
                            p.forEach((e => {
                                "function" == typeof e ? e(t) : null != e && (e.current = t)
                            }))
                        })
                    }, {
                        children: bn("div", Object.assign({
                            className: tr("Content")
                        }, {
                            children: [bn("div", {
                                className: tr("Background"),
                                ref: n
                            }, void 0), bn("div", Object.assign({
                                className: tr("Lines")
                            }, {
                                children: g && h.map((t => t.length ? bn(hr, {
                                    visibleLinesTokens: v,
                                    currentLineTokens: t,
                                    tokenHandlers: o,
                                    selectedData: s,
                                    activeTokenTime: d,
                                    fullPhrase: f,
                                    backgroundRef: n,
                                    hoveredAligns: a,
                                    selectedAligns: l,
                                    isKaraokeEnabled: r
                                }, t[0].id) : null))
                            }), void 0)]
                        }), void 0)
                    }), void 0);
                    var p
                })),
                hr = ({
                    currentLineTokens: t,
                    visibleLinesTokens: e,
                    tokenHandlers: n,
                    selectedData: i,
                    activeTokenTime: o,
                    fullPhrase: r,
                    backgroundRef: s,
                    hoveredAligns: a,
                    selectedAligns: l,
                    isKaraokeEnabled: u
                }) => {
                    const c = Dn(null),
                        d = Rn((() => ki(a, "source")), [a]),
                        h = Rn((() => ki(l, "source")), [l]),
                        v = Rn((() => t.map((t => ({
                            token: t,
                            isInSelectedGroup: ur(h, t),
                            isInHoveredGroup: ur(d, t)
                        })))), [t, d, h]);
                    return bn("div", Object.assign({
                        className: tr("Line"),
                        ref: c
                    }, {
                        children: [bn(er, {
                            backgroundRef: s,
                            containerRef: c
                        }, void 0), v.map(((t, s) => {
                            var a, l;
                            const {
                                token: c,
                                isInSelectedGroup: d,
                                isInHoveredGroup: h
                            } = t;
                            if (" " === c.text) return c.text;
                            const f = " " === (null === (a = v[s + 1]) || void 0 === a ? void 0 : a.token.text) ? v[s + 2] : v[s + 1],
                                g = cr(t, " " === (null === (l = v[s - 1]) || void 0 === l ? void 0 : l.token.text) ? v[s - 2] : v[s - 1]),
                                p = cr(t, f),
                                m = No(c),
                                b = u && m && function(t, e) {
                                    if (!t || !e) return;
                                    const n = t.startMs,
                                        i = t.startMs + t.durationMs;
                                    return e >= n && e <= i ? Jo.ACTIVE : e > i ? Jo.PASSED : e < n ? Jo.UPCOMING : void 0
                                }(c, o);
                            return bn(ir, {
                                text: c.text,
                                isTranslatable: n.isTranslatable,
                                onClick: () => {
                                    n.handleClick(c, e, r)
                                },
                                onMouseEnter: () => {
                                    n.handleMouseEnter(c)
                                },
                                onMouseLeave: n.handleMouseLeave,
                                isActive: b === Jo.ACTIVE,
                                isPassed: b === Jo.PASSED,
                                isSelected: (null == i ? void 0 : i.token.id) === c.id,
                                isInSelectedGroup: d,
                                isInHoveredGroup: h,
                                isPrevHighlighted: g,
                                isNextHighlighted: p
                            }, c.id)
                        }))]
                    }), void 0)
                },
                vr = Uo.exports.cn("VideoContainer"),
                fr = Uo.exports.cn("Overlay");
            const gr = ({
                    onClick: t
                }) => {
                    const [e, n] = Rn((() => {
                        const t = Hn(Hi),
                            e = document.createElement("div");
                        e.className = "ya-subtitles-widget-overlay";
                        const n = e.attachShadow({
                                mode: t
                            }),
                            i = document.createElement("div");
                        return n.appendChild(i), [e, i]
                    }), []);
                    return Nn((() => (document.documentElement.append(e), () => {
                        e.remove()
                    })), []), ni(bn(Ze, {
                        children: [bn("style", {
                            children: ".Overlay{bottom:0;left:0;pointer-events:all;position:fixed;right:0;top:0}"
                        }, void 0), bn("div", {
                            className: fr(),
                            onClick: t,
                            style: {
                                zIndex: 2147483646
                            }
                        }, void 0)]
                    }, void 0), n)
                },
                pr = Uo.exports.cn("Translate"),
                mr = Uo.exports.cn("Skeleton"),
                br = t => {
                    const {
                        lines: e
                    } = t, n = Rn((() => null == e ? void 0 : e.reduce(((t, e, n) => {
                        const i = t[n - 1],
                            o = (1.2 - 1) / 2;
                        return t.push({
                            width: 1 * e.length * .5,
                            height: 1,
                            top: i ? i.top + i.height + i.marginBottom + o : o,
                            marginBottom: o
                        }), t
                    }), [])), [e]);
                    if (!n) return null;
                    const i = Math.max(...n.map((t => t.width))),
                        o = 1.2 * n.length;
                    return bn("svg", Object.assign({
                        className: mr(),
                        role: "img",
                        width: `${i}em`,
                        height: `${o}em`,
                        "aria-labelledby": "loading-aria",
                        preserveAspectRatio: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, {
                        children: [bn("rect", {
                            x: "0",
                            y: "0",
                            width: "100%",
                            height: "100%",
                            "clip-path": "url(#phrase-skeleton-clip-path)",
                            style: 'fill: url("#phrase-skeleton-fill");'
                        }, void 0), bn("defs", {
                            children: [bn("clipPath", Object.assign({
                                id: "phrase-skeleton-clip-path"
                            }, {
                                children: n.map((t => bn("rect", {
                                    x: "0",
                                    y: `${t.top}em`,
                                    rx: "6",
                                    ry: "6",
                                    width: `${t.width}em`,
                                    height: `${t.height}em`
                                }, void 0)))
                            }), void 0), bn("linearGradient", Object.assign({
                                id: "phrase-skeleton-fill"
                            }, {
                                children: [bn("stop", Object.assign({
                                    offset: "0.599964",
                                    "stop-color": "#f3f3f3",
                                    "stop-opacity": "1"
                                }, {
                                    children: bn("animate", {
                                        attributeName: "offset",
                                        values: "-2; -2; 1",
                                        keyTimes: "0; 0.25; 1",
                                        dur: "2s",
                                        repeatCount: "indefinite"
                                    }, void 0)
                                }), void 0), bn("stop", Object.assign({
                                    offset: "1.59996",
                                    "stop-color": "#ecebeb",
                                    "stop-opacity": "1"
                                }, {
                                    children: bn("animate", {
                                        attributeName: "offset",
                                        values: "-1; -1; 2",
                                        keyTimes: "0; 0.25; 1",
                                        dur: "2s",
                                        repeatCount: "indefinite"
                                    }, void 0)
                                }), void 0), bn("stop", Object.assign({
                                    offset: "2.59996",
                                    "stop-color": "#f3f3f3",
                                    "stop-opacity": "1"
                                }, {
                                    children: bn("animate", {
                                        attributeName: "offset",
                                        values: "0; 0; 3",
                                        keyTimes: "0; 0.25; 1",
                                        dur: "2s",
                                        repeatCount: "indefinite"
                                    }, void 0)
                                }), void 0)]
                            }), void 0)]
                        }, void 0)]
                    }), void 0)
                },
                _r = t => {
                    const {
                        text: e
                    } = t, n = Rn((() => {
                        if (e) return {
                            width: 1 * e.length * .5,
                            height: 1,
                            top: 0
                        }
                    }), [e]);
                    if (!n) return null;
                    const i = n.width,
                        o = n.height;
                    return bn("svg", Object.assign({
                        className: mr(),
                        role: "img",
                        width: `${i}em`,
                        height: `${o}em`,
                        "aria-labelledby": "loading-aria",
                        preserveAspectRatio: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                    }, {
                        children: [bn("rect", {
                            x: "0",
                            y: "0",
                            width: "100%",
                            height: "100%",
                            "clip-path": "url(#word-skeleton-clip-path)",
                            style: 'fill: url("#word-skeleton-fill");'
                        }, void 0), bn("defs", {
                            children: [bn("clipPath", Object.assign({
                                id: "word-skeleton-clip-path"
                            }, {
                                children: bn("rect", {
                                    x: "0",
                                    y: `${n.top}em`,
                                    rx: "6",
                                    ry: "6",
                                    width: `${n.width}em`,
                                    height: `${n.height}em`
                                }, void 0)
                            }), void 0), bn("linearGradient", Object.assign({
                                id: "word-skeleton-fill"
                            }, {
                                children: [bn("stop", Object.assign({
                                    offset: "0.599964",
                                    "stop-color": "#f3f3f3",
                                    "stop-opacity": "1"
                                }, {
                                    children: bn("animate", {
                                        attributeName: "offset",
                                        values: "-2; -2; 1",
                                        keyTimes: "0; 0.25; 1",
                                        dur: "2s",
                                        repeatCount: "indefinite"
                                    }, void 0)
                                }), void 0), bn("stop", Object.assign({
                                    offset: "1.59996",
                                    "stop-color": "#ecebeb",
                                    "stop-opacity": "1"
                                }, {
                                    children: bn("animate", {
                                        attributeName: "offset",
                                        values: "-1; -1; 2",
                                        keyTimes: "0; 0.25; 1",
                                        dur: "2s",
                                        repeatCount: "indefinite"
                                    }, void 0)
                                }), void 0), bn("stop", Object.assign({
                                    offset: "2.59996",
                                    "stop-color": "#f3f3f3",
                                    "stop-opacity": "1"
                                }, {
                                    children: bn("animate", {
                                        attributeName: "offset",
                                        values: "0; 0; 3",
                                        keyTimes: "0; 0.25; 1",
                                        dur: "2s",
                                        repeatCount: "indefinite"
                                    }, void 0)
                                }), void 0)]
                            }), void 0)]
                        }, void 0)]
                    }), void 0)
                };
            const yr = zn((({
                    text: t,
                    hoveredAligns: e,
                    selectedAligns: n
                }) => {
                    const i = function(t, e) {
                        const n = [];
                        for (const [i, o] of Object.entries(t))
                            if (o)
                                for (const t of o) {
                                    const o = n.find((n => Oi(n.align[e], t[e])));
                                    o ? o.mods[i] = !0 : n.push({
                                        align: t,
                                        mods: {
                                            [i]: !0
                                        }
                                    })
                                }
                        return n.sort(((t, n) => t.align[e].start - n.align[e].start)), n
                    }({
                        hovered: e,
                        selected: n
                    }, "destination");
                    if (!i) return bn(Ze, {
                        children: t
                    }, void 0);
                    const o = [];
                    let r = 0;
                    for (const {
                            align: e,
                            mods: n
                        }
                        of i) o.push(t.slice(r, e.destination.start)), o.push(bn("span", Object.assign({
                        className: pr("Mark", n)
                    }, {
                        children: t.slice(e.destination.start, e.destination.end)
                    }), void 0)), r = e.destination.end;
                    return o.push(t.slice(r, t.length)), bn(Ze, {
                        children: o
                    }, void 0)
                })),
                wr = new Map([
                    ["ru", Object.freeze({
                        translationBubbleCommonError: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u0441\u0435\u0439\u0447\u0430\u0441 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d,<br>\u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435",
                        translationBubbleUnsupportedDirectionError: "\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u043d\u0430 \u0434\u0430\u043d\u043d\u044b\u0439 \u044f\u0437\u044b\u043a \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d",
                        translationBubbleRetry: "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c \u043f\u0435\u0440\u0435\u0432\u043e\u0434"
                    })],
                    ["en", Object.freeze({
                        translationBubbleCommonError: "Translation error,<br>please try again later",
                        translationBubbleUnsupportedDirectionError: "Translation to this language is unavailable",
                        translationBubbleRetry: "Try again"
                    })],
                    ["uk", Object.freeze({
                        translationBubbleCommonError: "\u041f\u0435\u0440\u0435\u043a\u043b\u0430\u0434 \u0437\u0430\u0440\u0430\u0437 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0438\u0439,<br>\u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0456\u0437\u043d\u0456\u0448\u0435",
                        translationBubbleUnsupportedDirectionError: "\u041f\u0435\u0440\u0435\u043a\u043b\u0430\u0434 \u0446\u0456\u0454\u044e \u043c\u043e\u0432\u043e\u044e \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0438\u0439",
                        translationBubbleRetry: "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0438 \u043f\u0435\u0440\u0435\u043a\u043b\u0430\u0434"
                    })],
                    ["kk", Object.freeze({
                        translationBubbleCommonError: "\u0410\u0443\u0434\u0430\u0440\u043c\u0430 \u049b\u0430\u0437\u0456\u0440 \u049b\u043e\u043b\u0436\u0435\u0442\u0456\u043c\u0441\u0456\u0437,<br>\u043a\u0435\u0439\u0456\u043d\u0456\u0440\u0435\u043a \u0431\u0430\u0439\u049b\u0430\u043f \u043a\u04e9\u0440\u0456\u04a3\u0456\u0437",
                        translationBubbleUnsupportedDirectionError: "\u0411\u0435\u0440\u0456\u043b\u0433\u0435\u043d \u0442\u0456\u043b\u0433\u0435 \u0430\u0443\u0434\u0430\u0440\u0443 \u049b\u043e\u043b\u0436\u0435\u0442\u0456\u043c\u0441\u0456\u0437",
                        translationBubbleRetry: "\u0410\u0443\u0434\u0430\u0440\u043c\u0430\u043d\u044b \u049b\u0430\u0439\u0442\u0430\u043b\u0430\u0443"
                    })]
                ]),
                Tr = $t([wr]),
                Sr = wr.get(Tr),
                Er = ({
                    selectedData: t,
                    placement: e
                }) => {
                    const {
                        dispatch: n,
                        wordTranslationResult: i,
                        phraseTranslationResult: o,
                        wordTranslationSource: r,
                        phraseTranslationSource: s,
                        wordTranslationStatus: a,
                        phraseTranslationStatus: l,
                        hoveredAligns: u,
                        selectedAligns: c,
                        selectedSubtitleTrack: d,
                        translationError: h
                    } = Ni("wordTranslationResult", "phraseTranslationResult", "wordTranslationSource", "phraseTranslationSource", "wordTranslationStatus", "phraseTranslationStatus", "hoveredAligns", "selectedAligns", "selectedSubtitleTrack", "translationError"), v = function(t, e) {
                        const [, n] = xn((() => ({})), {}), i = Dn(), o = Dn(t);
                        return t && (o.current = t), kn((() => (t || (i.current = window.setTimeout((() => {
                            o.current = t, n({})
                        }), e)), () => {
                            clearTimeout(i.current)
                        })), [t]), o.current
                    }(i, 300);
                    if (! function(t, e = 300) {
                            const [, n] = xn((() => ({})), {}), i = Dn(), o = Dn(Boolean(t));
                            return t && !o.current && (o.current = !0), kn((() => (o.current || (i.current = window.setTimeout((() => {
                                o.current = !0, n({})
                            }), e)), () => {
                                clearTimeout(i.current)
                            })), []), o.current
                        }(i || o || h, 300)) return null;
                    const f = null == d ? void 0 : d.languageCode,
                        g = f ? `&lang=${yi.getLangPairCode(f,_i)}` : "";
                    return bn("div", Object.assign({
                        className: pr({
                            placement: e
                        })
                    }, {
                        children: [bn("a", {
                            className: pr("Logo"),
                            href: `https://translate.yandex.ru/?text=${t.token.text}${g}`,
                            target: "_blank",
                            rel: "noreferrer"
                        }, void 0), bn("div", Object.assign({
                            className: pr("Body")
                        }, {
                            children: h ? (e => {
                                const i = (t => {
                                    switch (null == t ? void 0 : t.code) {
                                        case 501:
                                            return {
                                                message: Sr.translationBubbleUnsupportedDirectionError, allowRetry: !1
                                            };
                                        case 413:
                                        case 422:
                                            return {
                                                message: Sr.translationBubbleCommonError, allowRetry: !1
                                            };
                                        default:
                                            return {
                                                message: Sr.translationBubbleCommonError, allowRetry: !0
                                            }
                                    }
                                })(e);
                                return bn(Ze, {
                                    children: [bn("p", {
                                        className: pr("ErrorLabel"),
                                        dangerouslySetInnerHTML: {
                                            __html: i.message
                                        }
                                    }, void 0), i.allowRetry ? bn("button", Object.assign({
                                        className: pr("Button"),
                                        onClick: () => {
                                            n("setSelectedData", Object.assign(Object.assign({}, t), {
                                                loadingDelay: 1e3
                                            }))
                                        }
                                    }, {
                                        children: Sr.translationBubbleRetry
                                    }), void 0) : null]
                                }, void 0)
                            })(h) : bn(Ze, {
                                children: [bn("div", Object.assign({
                                    className: pr("Header")
                                }, {
                                    children: "loading" !== a || v ? bn("p", Object.assign({
                                        className: pr("Title")
                                    }, {
                                        children: v
                                    }), void 0) : bn(_r, {
                                        text: r
                                    }, void 0)
                                }), void 0), bn("p", Object.assign({
                                    className: pr("Text")
                                }, {
                                    children: "loading" === l ? bn(br, {
                                        lines: null == s ? void 0 : s.split("\n")
                                    }, void 0) : o ? bn(yr, {
                                        text: o,
                                        hoveredAligns: u,
                                        selectedAligns: c
                                    }, void 0) : null
                                }), void 0)]
                            }, void 0)
                        }), void 0)]
                    }), void 0)
                };

            function Ar() {
                const t = Dn(0),
                    e = Dn({
                        x: 0,
                        y: 0
                    }),
                    n = Mn((t => {
                        e.current = t
                    }), []),
                    i = Mn((n => {
                        t.current = function(t, e) {
                            return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2)
                        }(n, e.current), e.current = n
                    }), []);
                return {
                    ref: t,
                    onDragStart: n,
                    onDragEnd: i
                }
            }
            const Cr = () => ne() || ot() ? "top" : se() === ut.PORTRAIT ? "bottom" : "top";
            const Ir = () => {
                    const t = Mi(),
                        e = Dn(null),
                        n = function() {
                            const [t, e] = Pn(Cr());
                            return kn((() => {
                                const t = () => {
                                    e(Cr())
                                };
                                return te.forEach((e => {
                                    document.addEventListener(e, t)
                                })), window.addEventListener("resize", t), () => {
                                    te.forEach((e => {
                                        document.removeEventListener(e, t)
                                    })), window.removeEventListener("resize", t)
                                }
                            }), []), t
                        }();
                    $o();
                    const i = xo({
                        placement: n,
                        middleware: [(void 0 === o && (o = {}), {
                            name: "shift",
                            options: o,
                            async fn(t) {
                                const {
                                    x: e,
                                    y: n,
                                    placement: i
                                } = t, {
                                    mainAxis: r = !0,
                                    crossAxis: s = !1,
                                    limiter: a = {
                                        fn: t => {
                                            let {
                                                x: e,
                                                y: n
                                            } = t;
                                            return {
                                                x: e,
                                                y: n
                                            }
                                        }
                                    },
                                    ...l
                                } = o, u = {
                                    x: e,
                                    y: n
                                }, c = await Gi(t, l), d = Ui(Bi(i)), h = "x" === d ? "y" : "x";
                                let v = u[d],
                                    f = u[h];
                                if (r) {
                                    const t = "y" === d ? "bottom" : "right";
                                    v = Zi(v + c["y" === d ? "top" : "left"], v, v - c[t])
                                }
                                if (s) {
                                    const t = "y" === h ? "bottom" : "right";
                                    f = Zi(f + c["y" === h ? "top" : "left"], f, f - c[t])
                                }
                                const g = a.fn({
                                    ...t,
                                    [d]: v,
                                    [h]: f
                                });
                                return {
                                    ...g,
                                    data: {
                                        x: g.x - e,
                                        y: g.y - n
                                    }
                                }
                            }
                        }), to(t.styles.popupOffset), Ji({
                            boundary: e.current || void 0,
                            padding: t.styles.popupOverflowPadding
                        })]
                    });
                    var o;
                    const {
                        dispatch: r,
                        selectedData: s
                    } = Ni("selectedData"), a = Mn((() => {
                        r("setSelectedData", void 0)
                    }), []);
                    kn((() => {
                        r("setIsPaused", t.video.player.isPaused);
                        const e = t => {
                            t || r("setSelectedData", void 0), r("setIsPaused", t)
                        };
                        return t.video.player.on("pausedChanged", e), () => {
                            t.video.player.off("pausedChanged", e)
                        }
                    }), []), kn((() => {
                        r("setSeekedTime", t.video.player.currentTime);
                        const e = t => {
                            r("setSeekedTime", t)
                        };
                        return t.video.player.on("seekedToTime", e), () => {
                            t.video.player.off("seekedToTime", e)
                        }
                    }), []);
                    const l = Ar(),
                        u = Rn((() => {
                            if (Ti) return ["touch"]
                        }), []);
                    return bn("div", Object.assign({
                        className: vr(null, u)
                    }, {
                        children: bn("div", Object.assign({
                            ref: e,
                            className: vr("DraggableArea"),
                            style: t.styles.containerOffset
                        }, {
                            children: [s && bn(Ze, {
                                children: [bn(gr, {
                                    onClick: a
                                }, void 0), bn(Qo, Object.assign({
                                    innerRef: i.floating,
                                    style: {
                                        position: i.strategy,
                                        transform: `translate(${Math.round(i.x||-9999)}px, ${Math.round(i.y||-9999)}px)`
                                    }
                                }, {
                                    children: bn(Er, {
                                        selectedData: s,
                                        placement: i.placement
                                    }, void 0)
                                }), void 0)]
                            }, void 0), bn(Xo, Object.assign({
                                onPositionChanged: i.update,
                                limitToBottomBound: "videoContainer" === t.dragArea,
                                onDragStart: l.onDragStart,
                                onDragEnd: l.onDragEnd
                            }, {
                                children: bn(dr, {
                                    innerRef: i.reference,
                                    dragDeltaRef: l.ref
                                }, void 0)
                            }), void 0)]
                        }), void 0)
                    }), void 0)
                },
                Lr = ({
                    subtitlesBridge: t,
                    shadowRootMode: e
                }) => {
                    const n = Rn((() => (t => {
                        let e = {},
                            n = {},
                            i = {
                                dispatch(t, o) {
                                    if ("@dispatch" !== t && i.dispatch("@dispatch", [t, o, e[t]]), e[t]) {
                                        let r;
                                        e[t].forEach((s => {
                                            let a = e[t].includes(s) && s(n, o, i);
                                            a && "function" != typeof a.then && (n = {
                                                ...n,
                                                ...a
                                            }, r = {
                                                ...r,
                                                ...a
                                            })
                                        })), r && i.dispatch("@changed", r)
                                    }
                                },
                                get: () => n,
                                on: (t, n) => ((e[t] || (e[t] = [])).push(n), () => {
                                    e[t] = e[t].filter((t => t !== n))
                                })
                            };
                        return t.forEach((t => {
                            t && t(i)
                        })), i.dispatch("@init"), i
                    })([t => {
                        t.on("@init", (() => ({
                            subtitleItems: []
                        }))), t.on("setSubtitleItems", ((t, e) => ({
                            subtitleItems: e
                        }))), t.on("setSelectedSubtitleTrack", ((t, e) => ({
                            selectedSubtitleTrack: e
                        }))), t.on("setHoveredToken", ((t, e) => ({
                            hoveredToken: e
                        }))), t.on("setSelectedToken", ((t, e) => ({
                            selectedToken: e
                        }))), t.on("setHoveredAligns", ((t, e) => ({
                            hoveredAligns: e
                        }))), t.on("setSelectedAligns", ((t, e) => ({
                            selectedAligns: e
                        }))), t.on("setTranslationError", ((t, e) => ({
                            translationError: e
                        }))), t.on("setWordTranslation", ((t, e) => e)), t.on("setPhraseTranslation", ((t, e) => e)), t.on("setSelectedData", ((e, n) => n ? (t.dispatch("translate", n), {
                            selectedData: n
                        }) : {
                            selectedData: void 0,
                            wordTranslationResult: void 0,
                            wordTranslationSource: void 0,
                            wordTranslationStatus: void 0,
                            phraseTranslationResult: void 0,
                            phraseTranslationSource: void 0,
                            phraseTranslationStatus: void 0,
                            selectedAligns: void 0,
                            hoveredAligns: void 0,
                            tokenAligns: void 0,
                            translationError: void 0
                        })), t.on("translate", (async (e, n) => {
                            if (!e.selectedSubtitleTrack) throw new Error("No subtitle track was provided.");
                            t.dispatch("setTranslationError", void 0);
                            const i = n.token.text,
                                o = e.selectedSubtitleTrack.languageCode,
                                r = n.fullPhrase;
                            t.dispatch("setWordTranslation", {
                                wordTranslationStatus: "loading",
                                wordTranslationSource: i,
                                wordTranslationResult: void 0
                            }), t.dispatch("setSelectedToken", n.token), n.loadingDelay && await _(n.loadingDelay), wi.translate(i, o).then((e => {
                                t.dispatch("setWordTranslation", {
                                    wordTranslationStatus: "success",
                                    wordTranslationResult: e.text
                                })
                            })).catch((e => {
                                t.dispatch("setTranslationError", e)
                            })), e.wordTranslationSource !== r && (t.dispatch("setPhraseTranslation", {
                                phraseTranslationStatus: "loading",
                                phraseTranslationSource: r,
                                phraseTranslationResult: void 0
                            }), wi.translate(r, o).then((e => {
                                const i = e.align ? Pi(n.tokens, e.align) : void 0;
                                t.dispatch("setPhraseTranslation", {
                                    phraseTranslationStatus: "success",
                                    phraseTranslationResult: e.text,
                                    tokensAligns: i
                                })
                            })).catch((e => {
                                t.dispatch("setTranslationError", e)
                            })))
                        })), t.on("@changed", ((e, n) => {
                            var i, o;
                            if ("tokensAligns" in n || "hoveredToken" in n) {
                                const n = xi(e.tokensAligns, null === (i = e.selectedData) || void 0 === i ? void 0 : i.tokens, e.hoveredToken);
                                t.dispatch("setHoveredAligns", n)
                            }
                            if ("tokensAligns" in n || "selectedToken" in n) {
                                const n = xi(e.tokensAligns, null === (o = e.selectedData) || void 0 === o ? void 0 : o.tokens, e.selectedToken);
                                t.dispatch("setSelectedAligns", n)
                            }
                        })), t.on("setIsPaused", ((t, e) => ({
                            isPaused: e
                        }))), t.on("setSeekedTime", ((t, e) => ({
                            seekedTime: e
                        })))
                    }])), []);
                    return bn(Vi, Object.assign({
                        value: e
                    }, {
                        children: bn(Ri, Object.assign({
                            value: t
                        }, {
                            children: bn(fi.Provider, Object.assign({
                                value: n
                            }, {
                                children: bn(Ir, {}, void 0)
                            }), void 0)
                        }), void 0)
                    }), void 0)
                };
            class Or extends class {
                constructor(t) {
                    this.size = 0, this.dragArea = "videoContainer", this.video = t;
                    const {
                        Styles: e,
                        SubtitlesService: n
                    } = this.getComponents();
                    this.styles = new e, this.subtitlesService = new n
                }
            } {}

            function Pr(t) {
                const e = `subtitles-${Date.now()}`;
                return new Promise((n => {
                    const i = function(t, e = document.body) {
                            const n = document.createElement("script");
                            return n.text = t, e.appendChild(n), () => {
                                n.remove()
                            }
                        }(`\n      (function() {\n        const evaluatedScript = (${t})()\n\n        if (evaluatedScript instanceof Promise) {\n          evaluatedScript.then(response => {\n            window.postMessage({\n              messageId: '${e}',\n              response,\n            }, "*");\n          });\n        }\n      })();\n    `),
                        o = t => {
                            if (t.data.messageId === e) {
                                const {
                                    source: e,
                                    data: {
                                        response: r
                                    }
                                } = t;
                                if (e !== window) return;
                                window.removeEventListener("message", o), i(), n(r)
                            }
                        };
                    window.addEventListener("message", o)
                }))
            }

            function xr(t) {
                let e = t;
                for (; e;) {
                    if ("fixed" === getComputedStyle(e).position) return !0;
                    e = e.parentElement
                }
                return !1
            }
            class kr {
                constructor() {
                    this.listeners = new Map
                }
                on(t, e) {
                    const n = this.listeners.get(t);
                    n ? n.push(e) : this.listeners.set(t, [e])
                }
                off(t, e) {
                    const n = this.listeners.get(t);
                    n && n.splice(n.indexOf(e), 1)
                }
                emit(t, e) {
                    const n = this.listeners.get(t);
                    n && n.slice().map((t => {
                        t(e)
                    }))
                }
            }
            class Nr extends kr {
                constructor(t) {
                    super(), this.handleisPausedChange = () => {
                        this.emit("pausedChanged", this.isPaused)
                    }, this.handleSeeked = () => {
                        this.emit("seekedToTime", this.currentTime)
                    }, this.handleContainerResized = () => {
                        this.positionStrategy = xr(this.videoElement) ? Yo.FIXED : Yo.ABSOLUTE, this.handleContainerPositionChange()
                    }, this.handleContainerPositionChange = () => {
                        this.emit("positionChanged", this.getPosition())
                    }, this.videoElement = t, this.resizeObserver = new Oe(this.handleContainerResized), this.positionStrategy = xr(t) ? Yo.FIXED : Yo.ABSOLUTE, this.toggleNativeSubtitlesVisibility("hidden"), this.observePlayStatus(), this.observeSeeked(), this.observeContainerPositionChange()
                }
                destroy() {
                    this.unobserveContainerPositionChange(), this.unobservePlayStatus(), this.unobserveSeeked()
                }
                pause() {
                    this.videoElement.pause()
                }
                play() {
                    this.videoElement.play()
                }
                get isPaused() {
                    return this.videoElement.paused
                }
                get isPlaying() {
                    return !this.isPaused
                }
                get currentTime() {
                    return this.videoElement ? Math.round(1e3 * this.videoElement.currentTime) : 0
                }
                set currentTime(t) {
                    this.videoElement.currentTime = t / 1e3
                }
                observePlayStatus() {
                    this.videoElement.addEventListener("pause", this.handleisPausedChange), this.videoElement.addEventListener("play", this.handleisPausedChange)
                }
                unobservePlayStatus() {
                    this.videoElement.removeEventListener("pause", this.handleisPausedChange), this.videoElement.removeEventListener("play", this.handleisPausedChange)
                }
                observeSeeked() {
                    this.videoElement.addEventListener("seeked", this.handleSeeked)
                }
                unobserveSeeked() {
                    this.videoElement.removeEventListener("seeked", this.handleSeeked)
                }
                async observeContainerPositionChange() {
                    document.addEventListener("scroll", this.handleContainerPositionChange, {
                        passive: !0,
                        capture: !0
                    }), this.resizeObserver.observe(this.getContainer()), this.resizeObserver.observe(document.body)
                }
                unobserveContainerPositionChange() {
                    document.removeEventListener("scroll", this.handleContainerPositionChange, {
                        capture: !0
                    }), this.resizeObserver.disconnect()
                }
                getPosition() {
                    const {
                        top: t,
                        left: e,
                        width: n,
                        height: i
                    } = this.getContainer().getBoundingClientRect();
                    return "fixed" === this.positionStrategy ? {
                        top: t,
                        left: e,
                        width: n,
                        height: i,
                        position: this.positionStrategy
                    } : {
                        top: t + window.scrollY,
                        left: e + window.scrollX,
                        width: n,
                        height: i,
                        position: this.positionStrategy
                    }
                }
            }

            function Dr() {
                return new Promise((t => {
                    const e = document.querySelector("#movie_player");
                    e && e.toggleSubtitles && e.toggleSubtitles(), t(!0)
                }))
            }
            class Rr extends Nr {
                getContainer() {
                    return this.videoElement.closest(".html5-video-player,#player-container,#player")
                }
                toggleNativeSubtitlesVisibility(t) {
                    var e;
                    const n = Boolean(null === (e = document.querySelector("#ytp-caption-window-container")) || void 0 === e ? void 0 : e.childNodes.length);
                    (n && "hidden" === t || !n && "visible" === t) && Pr(Dr)
                }
                isAdvertisement() {
                    const t = this.videoElement.closest(".html5-video-player");
                    return Boolean(null == t ? void 0 : t.classList.contains("ad-showing"))
                }
            }
            class Mr extends Rr {}
            class Hr extends class {
                constructor() {
                    this.popupOverflowPadding = {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }
                }
            } {}
            class Vr extends Hr {
                constructor() {
                    super(...arguments), this.global = "\n    .ytp-subtitles-button,\n    #ytp-caption-window-container {\n      display: none !important;\n    }\n  ", this.containerOffset = {
                        top: 50,
                        left: 0,
                        right: 0,
                        bottom: 65
                    }, this.popupOffset = 3
                }
            }

            function Br(t, e, n) {
                let i, o = 0,
                    r = t.length - 1;
                for (; o <= r;) {
                    i = Math.floor((o + r) / 2);
                    const n = t[i],
                        s = n.startMs,
                        a = n.startMs + n.durationMs;
                    if (s <= e && a >= e) return {
                        value: t[i]
                    };
                    s > e ? r = i - 1 : o = i + 1
                }
                if (null == n ? void 0 : n.closestLower) return {
                    value: t[r],
                    closestLower: !0
                }
            }
            class $r extends class {
                fetchSubtitles(t) {
                    if (t.url) return bi(t.url, "text")
                }
                getCurrentSubtitle(t, e) {
                    var n;
                    return null === (n = Br(t, e)) || void 0 === n ? void 0 : n.value
                }
                getActiveTokenTime(t, e) {
                    if (!(t && t.tokens && t.tokens.length && No(t.tokens[0]))) return;
                    const n = Br(t.tokens, e, {
                        closestLower: !0
                    });
                    return (null == n ? void 0 : n.closestLower) ? n.value.startMs + n.value.durationMs + 1 : n ? n.value.startMs + 1 : void 0
                }
            } {
                async getLocalTracks() {
                    return (await Pr(E.getYoutubeData)).tracks
                }
                formatSubtitles(t) {
                    try {
                        const n = JSON.parse(t);
                        if (function(t) {
                                return "object" == typeof t && null !== t
                            }(e = n) && "events" in e && Array.isArray(e.events) && e.events[0] && "tStartMs" in e.events[0] && "dDurationMs" in e.events[0]) return function(t) {
                            const e = [];
                            for (const n of t.events) {
                                if (!n.segs) continue;
                                const t = n.segs.map((t => t.utf8)).join(" "),
                                    i = Ro(t);
                                e.push({
                                    text: t,
                                    startMs: n.tStartMs,
                                    durationMs: n.dDurationMs,
                                    tokens: i
                                })
                            }
                            return e
                        }(n)
                    } catch (t) {}
                    var e;
                    return []
                }
            }
            class Ur extends $r {}
            class Fr extends Or {
                getComponents() {
                    return {
                        Player: Mr,
                        Styles: Vr,
                        SubtitlesService: Ur
                    }
                }
            }

            function jr(t) {
                const e = t.width / 40,
                    n = t.height / 25;
                return function(t) {
                    return 2 * Math.round(t / 2)
                }(Math.max(18, Math.min(26, e, n)))
            }

            function Wr(t) {
                const e = document.createElement("style");
                return e.innerHTML = t, e
            }
            const Gr = t => {
                    t.stopPropagation(), t.preventDefault()
                },
                zr = ["mousemove", "touchmove", "pointermove"];
            class qr extends kr {
                constructor(t) {
                    super(), this.karaokeEnabled = !1, this.shadowRootMode = "closed", this.handleEnterPictureInPicture = () => {
                        this.disableSubtitles()
                    }, this.handleLeavePictureInPicture = () => {
                        this.enableSubtitles()
                    }, this.handleVisibilityChange = () => {
                        "visible" === document.visibilityState && this.enableSubtitles()
                    }, this.handleSrcChanged = async () => {
                        this.disableSubtitles(), await this.waitForVideoLoading(), this.subscribeToApi()
                    }, this.handleSubtitlesStatusChange = async t => {
                        const e = {
                            data: t.data,
                            lang: t.lang
                        };
                        this.subtitlesData = e, null !== e.data ? (this.emit("subtitlesDataChanged", e), this.enableSubtitles()) : this.disableSubtitles()
                    }, this.handleKaraokeEnabledChange = t => {
                        this.karaokeEnabled = t, this.emit("karaokeEnabledChanged", t)
                    }, this.element = t, this.srcObserver = new MutationObserver(this.handleSrcChanged), this.srcObserver.observe(t, {
                        attributeFilter: ["src", "currentSrc"]
                    }), this.addEventListeners(), this.subscribeToApi()
                }
                isEnteredPictureInPicture() {
                    return !!window.PictureInPictureWindow && this.element === document.pictureInPictureElement
                }
                async waitForVideoLoading() {}
                async subscribeToApi() {
                    var t, e;
                    null === (t = this.element.yandexVideoSubtitles) || void 0 === t || t.observeSubtitlesStatus(this.handleSubtitlesStatusChange), null === (e = this.element.yandexVideoSubtitles) || void 0 === e || e.observeKaraokeStatus(this.handleKaraokeEnabledChange)
                }
                get player() {
                    const {
                        Player: t
                    } = this.getComponents();
                    return this.playerInner = this.playerInner || new t(this.element), this.playerInner
                }
                enableSubtitles() {
                    if (!this.subtitlesBridge && !this.isEnteredPictureInPicture() && !this.player.isAdvertisement()) {
                        const {
                            SubtitlesBridge: t
                        } = this.getComponents();
                        this.subtitlesBridge = new t(this), this.subtitlesWidgetApi = function(t, e) {
                            const n = document.documentElement,
                                i = document.createElement("div");
                            i.className = "ya-subtitles-widget";
                            const o = i.attachShadow({
                                    mode: e
                                }),
                                r = document.createElement("div");
                            i.style.pointerEvents = "none", i.style.willChange = "transform", i.style.zIndex = "2147483647", i.style.top = "0", i.style.left = "0";
                            const s = e => {
                                    const n = jr(e);
                                    t.size = n, i.style.fontSize = `${n}px`, i.style.width = `${Math.round(e.width)}px`, i.style.height = `${Math.round(e.height)}px`, i.style.transform = `translate3d(${e.left}px, ${e.top}px, 0)`, i.style.position = e.position
                                },
                                a = () => {
                                    const t = ee();
                                    if (t) {
                                        if (i.parentElement === t) return;
                                        t.appendChild(i)
                                    } else {
                                        if (i.parentElement === n) return;
                                        n.appendChild(i)
                                    }
                                };
                            return {
                                append: () => {
                                    var l;
                                    return o.append(r), o.append(Wr(".DraggablePanel{bottom:0;left:0;position:absolute;right:0;top:0}.DraggablePanel_isDragging *{cursor:grabbing!important;user-select:none}.DraggablePanel-Box{left:0;position:absolute;top:0;width:80%;will-change:transform}.touch .DraggablePanel-Box{width:100%}.DraggablePanel-BoxIn{backface-visibility:hidden;min-height:30px;position:relative;transition:.15s}.Overlay{bottom:0;position:fixed;right:0}.Overlay,.Popover{left:0;pointer-events:all;top:0}.Popover{background-color:#fff;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.25);box-sizing:border-box;color:#000;max-width:calc(100vw - 10px);z-index:9999}@import-glob \"./**/*.css\";.Subtitles{color:#fff;display:flex;font-size:1em;justify-content:center;line-height:1.35;opacity:1;transition:opacity .1s ease-out;user-select:none}.Subtitles:hover{opacity:1}.Subtitles-Content{position:relative}.Subtitles-Background{opacity:.8}.Subtitles-Lines{align-items:flex-start;display:flex;flex-direction:column;position:relative}.Subtitles-Line{margin-bottom:-.2em;margin-top:-.2em;padding:.2em .3125em;pointer-events:all}.Subtitles-Line_oneLine{border-radius:12px}.Subtitles-Line:first-child{margin-top:0;padding-top:.2em}.Subtitles-Line:last-child{margin-bottom:0;padding-bottom:.2em}.Subtitles-Line:first-child:last-child{margin:0}.SubtitlesToken{display:inline-block;pointer-events:all;position:relative;z-index:1}.SubtitlesToken_isTranslatable{cursor:pointer}.SubtitlesToken:hover{z-index:99}.SubtitlesToken:after{border:2px solid transparent;border-radius:.275em;bottom:0;content:\"\";left:-.125em;position:absolute;right:-.125em;top:0;z-index:-1}.SubtitlesToken_isNextHighlighted:before,.SubtitlesToken_isPrevHighlighted:before{border-bottom:2px solid transparent;border-top:2px solid transparent;bottom:0;content:\"\";pointer-events:none;position:absolute;top:0;width:.5em}.SubtitlesToken_isPrevHighlighted:before{left:-.25em}.SubtitlesToken_isNextHighlighted:before{right:-.25em}.SubtitlesToken_isActive,.SubtitlesToken_isPassed{color:#a36eff}.SubtitlesToken_isSelected{color:#fff;opacity:1}.SubtitlesToken_isInHoveredGroup,.SubtitlesToken_isInSelectedGroup{opacity:1}.SubtitlesToken_isInHoveredGroup:after,.SubtitlesToken_isInHoveredGroup:before{border-color:#32b4ff;opacity:1}.SubtitlesToken_isInSelectedGroup:after,.SubtitlesToken_isInSelectedGroup:before{border-color:#7e33ff;opacity:1}.SubtitlesToken_isTranslatable:hover:after{background-color:hsla(0,0%,100%,.2);opacity:1}.SubtitlesToken_isSelected:after,.SubtitlesToken_isSelected:hover:after{background-color:#532b98;opacity:1}.SubtitlesToken_isPrevHighlighted:after{border-bottom-left-radius:0;border-left:0!important;border-top-left-radius:0}.SubtitlesToken_isNextHighlighted:after{border-bottom-right-radius:0;border-right:0!important;border-top-right-radius:0}.Skeleton{display:block}.Translate{display:flex;font-size:min(max(1em,16px),22px);padding:.5em .625em;position:relative}.Translate_placement_top{flex-direction:column}.Translate_placement_bottom{flex-direction:column-reverse}.Translate-Title{color:#354859;font-family:YS Display,sans-serif;font-size:1em;font-weight:500;line-height:1;margin:0;white-space:nowrap}.Translate-Text{color:#6f7d8b;font-family:YS Text,sans-serif;font-size:.625em;font-weight:400;line-height:1.2;margin:0;white-space:break-spaces}.Translate-Header{display:flex;justify-content:space-between;margin-bottom:.325em}.Translate-Logo{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='99' height='12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.97 10H6.4V1.72H4.3c-2.09 0-3.2 1.08-3.2 2.68 0 1.28.61 2.03 1.7 2.8L.9 10h1.56l2.1-3.13-.73-.5c-.88-.59-1.3-1.05-1.3-2.05 0-.88.61-1.48 1.8-1.48h.64V10Zm18.93-.4V8.43c-.44.3-1.18.56-1.87.56-1.04 0-1.43-.49-1.5-1.49h3.43v-.75c0-2.09-.92-2.87-2.34-2.87-1.72 0-2.55 1.32-2.55 3.13 0 2.09 1.03 3.1 2.84 3.1.9 0 1.57-.24 1.99-.53Zm8.86.52c.66 0 1.12-.12 1.47-.37V8.59c-.36.25-.79.4-1.38.4-1.02 0-1.43-.78-1.43-2.02 0-1.3.5-1.96 1.44-1.96.55 0 1.08.19 1.37.37v-1.2a3.3 3.3 0 0 0-1.53-.3c-1.8 0-2.75 1.3-2.75 3.13 0 2 .92 3.1 2.81 3.1ZM10.91 4v2.37h-1.9V4H7.6v6h1.42V7.5h1.9V10h1.41V4h-1.42Zm7.82 4.87h-.63V4.01h-4.14v.51c0 1.46-.1 3.36-.6 4.36h-.43v2.49h1.3V10h3.19v1.37h1.3V8.88Zm9.7 1.12h1.6l-2.27-3.23 2-2.76h-1.43l-2 2.76V4.01H24.9V10h1.42V7.06l2.1 2.94ZM21.6 5c.7 0 .92.6.92 1.34v.12h-1.98c.03-.95.38-1.45 1.06-1.45Zm-4.92 3.88h-2c.39-.9.5-2.54.5-3.57v-.18h1.5v3.75Zm22.01-7.16V10h1.44V2.84h2.57V10h1.45V1.72h-5.46Zm11.23 7.87V8.44c-.44.3-1.18.56-1.87.56-1.05 0-1.43-.5-1.49-1.5h3.42v-.75c0-2.09-.92-2.87-2.34-2.87-1.72 0-2.55 1.32-2.55 3.13 0 2.09 1.03 3.1 2.84 3.1.9 0 1.57-.24 1.99-.53Zm-2.3-4.58c.7 0 .92.58.92 1.33v.12h-1.98c.04-.95.38-1.45 1.06-1.45Zm4.62-1h-1.31v7.72h1.42V9.3c.35.53.88.82 1.49.82 1.38 0 2.33-1.1 2.33-3.12 0-2-.93-3.11-2.26-3.11-.67 0-1.22.3-1.6.9L52.24 4ZM53.48 9c-.75 0-1.13-.6-1.13-1.99 0-1.4.4-2 1.2-2 .77 0 1.16.6 1.16 1.99 0 1.4-.4 2-1.23 2Zm8.23.6V8.43c-.44.3-1.18.56-1.87.56-1.04 0-1.43-.49-1.5-1.49h3.43v-.75c0-2.09-.92-2.87-2.34-2.87-1.73 0-2.55 1.32-2.55 3.13 0 2.09 1.03 3.1 2.84 3.1.9 0 1.57-.24 1.99-.53ZM59.4 5c.7 0 .91.6.91 1.34v.12h-1.97c.03-.95.38-1.45 1.06-1.45Zm5.66 5c1.41 0 2.24-.6 2.24-1.74 0-.79-.47-1.24-1.27-1.38.64-.18 1.05-.63 1.05-1.35 0-1.02-.68-1.52-2-1.52h-2.37V10h2.35Zm-.17-4.92c.5 0 .8.21.8.67 0 .41-.32.66-.85.66h-.72V5.08h.77Zm.02 2.37c.6 0 .93.21.93.72 0 .54-.36.76-.93.76h-.79V7.45h.79Zm5.65-3.56c-1.56 0-2.65 1.1-2.65 3.12 0 2 1.09 3.1 2.65 3.1 1.56 0 2.64-1.1 2.64-3.11 0-2-1.08-3.11-2.64-3.11Zm0 5.1c-.79 0-1.18-.6-1.18-1.98 0-1.4.4-2 1.18-2 .78 0 1.18.6 1.18 1.99 0 1.4-.4 2-1.18 2Zm8.66-.11h-.63V4.01h-4.13v.51c0 1.46-.1 3.36-.6 4.36h-.44v2.49h1.31V10h3.18v1.37h1.31V8.88Zm-2.05 0h-2c.4-.9.5-2.54.5-3.57v-.18h1.5v3.75Zm4.87-1.95c-.59 0-.86-.31-.86-1.04V4.01h-1.42v1.87c0 1.45.7 2.14 1.93 2.14.51 0 .94-.13 1.27-.33V10h1.42V4h-1.42v2.66c-.25.18-.57.27-.92.27ZM85.58 4v6h1.23L89 6.3V10h1.38V4h-1.23l-2.19 3.71v-3.7h-1.38Zm9.5 5.99h1.61l-2.27-3.23 2-2.76h-1.43l-2 2.76V4.01h-1.42V10h1.42V7.06l2.1 2.94Z' opacity='.8' fill='%23354859'/%3E%3C/svg%3E\");background-position:0 0;background-repeat:no-repeat;background-size:contain;display:block;height:min(12px,.75em);width:min(96px,6em)}.Translate_placement_top .Translate-Logo{margin-bottom:8px}.Translate_placement_bottom .Translate-Logo{margin-top:8px}.Translate-Logo svg{display:block}.Translate-Mark_hovered{background-color:rgba(50,180,255,.25)}.Translate-Mark_selected{color:#000;font-weight:700}.Translate-ErrorLabel{font-size:.625em;margin:0 0 .5em}.Translate-Button{background:#f5f5f5;border:none;border-radius:.5rem;cursor:pointer;font-size:.75em;padding:.825rem 1.25rem}.Translate-Button:hover{background:#e6e6e6}.VideoContainer{bottom:0;font-family:YS Text,sans-serif;left:0;pointer-events:none;right:0;top:0}.VideoContainer,.VideoContainer-DraggableArea{position:absolute}")), i.append(Wr(t.styles.global)), t.video.player.on("positionChanged", s), zr.forEach((t => {
                                        i.addEventListener(t, Gr)
                                    })), te.forEach((t => {
                                        document.addEventListener(t, a)
                                    })), s(t.video.player.getPosition()), gn(bn(Lr, {
                                        subtitlesBridge: t,
                                        shadowRootMode: e
                                    }, void 0), r), (null !== (l = ee()) && void 0 !== l ? l : n).append(i), i
                                },
                                remove: () => {
                                    t.video.player.off("positionChanged", s), zr.forEach((t => {
                                        i.removeEventListener(t, Gr)
                                    })), te.forEach((t => {
                                        document.removeEventListener(t, a)
                                    })), gn(null, r), o.innerHTML = "", i.remove()
                                }
                            }
                        }(this.subtitlesBridge, this.shadowRootMode), this.subtitlesWidgetApi.append()
                    }
                }
                disableSubtitles() {
                    var t, e;
                    this.subtitlesBridge = void 0, null === (t = this.subtitlesWidgetApi) || void 0 === t || t.remove(), this.subtitlesWidgetApi = void 0, null === (e = this.playerInner) || void 0 === e || e.destroy(), this.playerInner = void 0
                }
                addEventListeners() {
                    window.PictureInPictureWindow && (this.element.addEventListener("enterpictureinpicture", this.handleEnterPictureInPicture), this.element.addEventListener("leavepictureinpicture", this.handleLeavePictureInPicture)), document.addEventListener("visibilitychange", this.handleVisibilityChange)
                }
                removeEventListeners() {
                    window.PictureInPictureWindow && (this.element.removeEventListener("enterpictureinpicture", this.handleEnterPictureInPicture), this.element.removeEventListener("leavepictureinpicture", this.handleLeavePictureInPicture)), document.removeEventListener("visibilitychange", this.handleVisibilityChange)
                }
                destroy() {
                    this.disableSubtitles(), this.removeEventListeners(), this.srcObserver.disconnect()
                }
            }
            class Zr extends qr {
                async waitForVideoLoading() {
                    if (!(this.element.readyState >= 1)) return new Promise((t => {
                        this.element.addEventListener("loadedmetadata", (() => {
                            t()
                        }), {
                            once: !0
                        })
                    }))
                }
                get id() {
                    return new URL(window.location.href).searchParams.get("v")
                }
            }
            class Xr extends Zr {
                getComponents() {
                    return {
                        SubtitlesBridge: Fr,
                        Player: Mr
                    }
                }
            }
            class Kr extends Rr {}
            class Qr extends Hr {
                constructor() {
                    super(...arguments), this.global = "\n    .ytp-subtitles-button,\n    #ytp-caption-window-container {\n      display: none !important;\n    }\n  ", this.containerOffset = {
                        top: 7,
                        left: 0,
                        right: 0,
                        bottom: 7
                    }, this.popupOffset = 7, this.popupOverflowPadding = {
                        top: 0,
                        bottom: -200,
                        left: 0,
                        right: 0
                    }
                }
            }
            class Yr extends $r {}
            class Jr extends Or {
                constructor() {
                    super(...arguments), this.dragArea = "fullPage"
                }
                getComponents() {
                    return {
                        Player: Kr,
                        Styles: Qr,
                        SubtitlesService: Yr
                    }
                }
            }
            class ts extends Zr {
                getComponents() {
                    return {
                        SubtitlesBridge: Jr,
                        Player: Kr
                    }
                }
            }
            return t.TranslatableVideoDetector = class extends class {
                constructor(e) {
                    this.format = N.CAMEL, this.shouldWaitForRedirect = !1, this.shouldWaitForAds = !1, this.shouldReturnAds = !1, this.findVideoPromise = null, this.waitForAdPromise = null, this.waitForAdPromiseResolver = null, this.videoLoadedPromise = null, this.videoLoadedSuccessPromiseResolver = null, this.videoLoadedFailPromiseResolver = null;
                    const n = this.createResourceAdapter(e);
                    ! function(t, e) {
                        if (null == t) throw new k(e)
                    }(n, t.DetectError.UNKNOWN_RESOURCE), this.resourceAdapter = n, this.errorFormatter = this.createDetectErrorFormatter()
                }
                createResourceAdapter(t) {
                    return null
                }
                createDetectErrorFormatter() {
                    return new R(this.format)
                }
                async cancel() {
                    this.videoLoadedPromise && (this.videoLoadedSuccessPromiseResolver && this.videoLoadedSuccessPromiseResolver(!1), this.videoLoadedFailPromiseResolver && this.videoLoadedFailPromiseResolver(!1), this.videoLoadedPromise = null), this.waitForAdPromise && (this.waitForAdPromiseResolver && this.waitForAdPromiseResolver(!1), this.waitForAdPromise = null), await this.findVideoPromise
                }
                async waitForAds(t, e) {
                    e && this.shouldWaitForAds && (this.waitForAdPromise = new Promise((e => {
                        this.waitForAdPromiseResolver = e, t.addEventListener("durationchange", (() => {
                            e()
                        }), {
                            once: !0
                        })
                    })), await this.waitForAdPromise, this.waitForAdPromise = null)
                }
                async waitForVideoLoading(t) {
                    if (t.readyState >= 1) return !0;
                    this.videoLoadedPromise = new Promise((e => {
                        this.videoLoadedSuccessPromiseResolver = e, t.addEventListener("loadedmetadata", (() => {
                            e(!0)
                        }), {
                            once: !0
                        })
                    }));
                    const e = await this.videoLoadedPromise;
                    return this.videoLoadedPromise = null, e
                }
                async findVideoAndWaitForLoading(e) {
                    const n = null != e ? e : this.resourceAdapter.getVideo();
                    if (!M(n)) return t.DetectError.NO_VIDEO;
                    if (this.resourceAdapter.shouldWaitForLoading) {
                        if (!await this.waitForVideoLoading(n)) return t.DetectError.CANCELED
                    }
                    return function(t) {
                        return Boolean(t.src || t.querySelector("source"))
                    }(n) ? this.processVideoDuration(n) : t.DetectError.NO_VIDEO
                }
                async waitForFiniteDuration(t) {
                    this.hasFiniteDuration(t) || await y((() => this.hasFiniteDuration(t)), 5e3)
                }
                async processVideoDuration(e) {
                    await this.waitForFiniteDuration(e);
                    if (await this.resourceAdapter.videoIsStream(e)) {
                        if (!this.resourceAdapter.canTranslateStream) return t.DetectError.IS_STREAM
                    } else if (e.duration > 14400) return t.DetectError.MAX_DURATION_EXCEEDED;
                    return e
                }
                async findVideoBase(e) {
                    await this.waitForRedirect();
                    const n = await this.findVideoAndWaitForLoading(e);
                    if (!M(n)) return this.errorFormatter.getError(n);
                    const i = n,
                        o = Boolean(this.resourceAdapter.isAnAd(i));
                    await this.waitForAds(n, o);
                    const r = await this.resourceAdapter.getVideoId(i);
                    return r ? o && this.shouldReturnAds ? {
                        id: r,
                        ad: o
                    } : {
                        id: r,
                        video: i
                    } : this.errorFormatter.getError(t.DetectError.NO_ID)
                }
                async getDownloadlinks() {
                    let t = {};
                    return "function" == typeof this.resourceAdapter.getDownloadLinks && (t = await this.resourceAdapter.getDownloadLinks()), t
                }
                async getSyncAbsoluteAndWebCurrentTimes(t) {
                    return {
                        absoluteTime: await this.resourceAdapter.getAbsoluteTime(t),
                        webCurrentTime: t.currentTime
                    }
                }
                async getVideoData(t) {
                    const {
                        canShowSubtitles: e
                    } = this.resourceAdapter, [{
                        sourceLanguage: n,
                        canTranslate: i,
                        translationError: o
                    }, {
                        subtitlesData: r,
                        subtitlesError: s
                    }, a, l, u, c, {
                        absoluteTime: d,
                        webCurrentTime: v
                    }, {
                        videoDownloadLink: f,
                        subtitlesDownloadLink: g
                    }] = await Promise.all([this.resourceAdapter.getSourceLanguage(t.video), this.getSubtitlesData(t.video), this.resourceAdapter.videoIsSeekable(), this.resourceAdapter.videoIsStream(t.video), this.resourceAdapter.checkIsStreamWhitelisted(), this.resourceAdapter.getChannelId(), this.getSyncAbsoluteAndWebCurrentTimes(t.video), this.getDownloadlinks()]);
                    return {
                        id: t.id,
                        sourceLanguage: n,
                        canTranslate: i,
                        translationError: o,
                        canShowSubtitles: e,
                        subtitlesData: r,
                        subtitlesError: s,
                        seekable: a,
                        stream: l,
                        streamWhitelisted: u,
                        channelId: c,
                        absoluteTime: d,
                        webCurrentTime: v,
                        supportedSourceLangs: h.languages,
                        videoDownloadLink: f,
                        subtitlesDownloadLink: g
                    }
                }
                async findTranslatableVideo(e) {
                    return this.errorFormatter.getError(t.DetectError.NOT_IMPLEMENTED)
                }
                async waitForRedirect() {
                    if (!this.shouldWaitForRedirect) return;
                    const t = new URL(r.getHref()),
                        e = "vtrans" === t.searchParams.get("utm_sup_project"),
                        n = s() === i.YOUTUBE && null !== t.searchParams.get("t");
                    (e || n) && await _(1500)
                }
                hasFiniteDuration(t) {
                    return !Number.isNaN(t.duration) && Number.isFinite(t.duration)
                }
                async getSubtitlesData(t) {
                    try {
                        return this.resourceAdapter ? {
                            subtitlesData: await this.resourceAdapter.getSubtitles(t)
                        } : {
                            subtitlesData: []
                        }
                    } catch (t) {
                        return {
                            subtitlesData: [],
                            subtitlesError: String(t)
                        }
                    }
                }
                resultIsAnError(t) {
                    return void 0 !== t.error
                }
                resultIsDetailedError(t) {
                    return "subtitlesError" in t || "translationError" in t
                }
                resultIsAnAd(t) {
                    return void 0 !== t.ad
                }
            } {
                constructor() {
                    super(...arguments), this.format = N.SNAKE, this.shouldWaitForRedirect = !1, this.shouldWaitForAds = !0, this.shouldReturnAds = !1
                }
                createResourceAdapter(t) {
                    return x(t)
                }
                createDetectErrorFormatter() {
                    return new R(this.format)
                }
                async findTranslatableVideo(e) {
                    const n = await this.findVideoBase(e);
                    if (this.resultIsAnError(n)) return n;
                    if (this.resultIsAnAd(n)) throw Error("Video is an ad. Should never reach this on IOS.");
                    const {
                        sourceLanguage: i,
                        canTranslate: o
                    } = await this.resourceAdapter.getSourceLanguage(n.video);
                    return i && o ? {
                        video_id: n.id,
                        video_element: n.video,
                        video_language: i
                    } : this.errorFormatter.getError(t.DetectError.NO_CAPTIONS)
                }
                async findVideo(e) {
                    if (!this.resourceAdapter) return this.errorFormatter.getError(t.DetectError.UNKNOWN_RESOURCE);
                    let n = await this.findVideoBase(e);
                    if (this.resultIsAnError(n)) return this.errorFormatter.getError(n);
                    if (this.resultIsAnAd(n)) throw Error("Video is an ad. Should never reach this on IOS.");
                    let i = await this.getVideoData(n);
                    if (i.stream && !i.seekable) {
                        if (await $(n.video), n = await this.findVideoBase(e), this.resultIsAnError(n)) return this.errorFormatter.getError(n);
                        if (this.resultIsAnAd(n)) throw Error("Video is an ad. Should never reach this on IOS.");
                        i = await this.getVideoData(n)
                    }
                    return {
                        video_id: i.id,
                        video_element: n.video,
                        video_language: i.sourceLanguage,
                        can_translate: U(i),
                        translation_error: i.translationError,
                        can_subtitles: i.canShowSubtitles,
                        subtitles_error: i.subtitlesError,
                        subtitles_data: i.subtitlesData,
                        seekable: i.seekable,
                        stream: i.stream,
                        stream_whitelisted: i.streamWhitelisted,
                        channel_id: i.channelId,
                        absolute_time: i.absoluteTime,
                        web_current_time: i.webCurrentTime,
                        supported_source_langs: i.supportedSourceLangs,
                        video_download_link: i.videoDownloadLink,
                        subtitles_download_link: i.subtitlesDownloadLink
                    }
                }
            }, t.TranslationButton = class extends class extends class {
                constructor(t, e = dt) {
                    this.videoSettingsUI = new Ne(t, e, this)
                }
                insert() {
                    this.videoSettingsUI.insert()
                }
                remove() {
                    this.videoSettingsUI.remove()
                }
                handleTranslationClick() {}
                handleSubtitlesClick() {}
                handleSettingsClick() {}
                setTranslationState(t, e = !0) {
                    this.videoSettingsUI.setTranslationState(t, e)
                }
                setSubtitlesState(t, e = !0) {
                    this.videoSettingsUI.setSubtitlesState(t, e)
                }
                setSettingsState(t, e = !0) {
                    this.videoSettingsUI.setSettingsState(t, e)
                }
            } {
                show() {
                    this.videoSettingsUI.show()
                }
                setWaitingTime(t) {
                    this.videoSettingsUI.setTranslationWaitingTime(t)
                }
                handleClick() {}
                setButtonState(t) {
                    this.videoSettingsUI.setTranslationState(t)
                }
                setState(t) {
                    this.videoSettingsUI.setTranslationState(t)
                }
            } {}, t.TranslationButtonState = J, t.getVideoContainer = function(t) {
                try {
                    switch (s()) {
                        case "youtube":
                            return new(window.location.host.startsWith("m") ? ts : Xr)(t);
                        default:
                            return null
                    }
                } catch (t) {
                    return null
                }
            }, t.setCurrentTime = (t, e) => {
                const n = H();
                if (!t || !n) return !1;
                if ("function" != typeof n.seekTo) return !1;
                return $(t).then((i => {
                    var o, r;
                    if (!i) return !1;
                    const s = null === (o = n.getCurrentTime) || void 0 === o ? void 0 : o.call(n);
                    if ("number" != typeof s) return !1;
                    const a = s - (t.currentTime - e);
                    return null === (r = n.seekTo) || void 0 === r || r.call(n, a, !0), !0
                })), !0
            }, Object.defineProperty(t, "__esModule", {
                value: !0
            }), t
        }({});
        const features = {
            plays_video_inline: false,
            detection_timeout: 5000,
            force_language_select: false
        };
        __gCrWeb.videoTranslate = {};
        __gCrWeb["videoTranslate"] = __gCrWeb.videoTranslate;
        const e = [TranslateButtonAPI.DetectError.UNKNOWN_RESOURCE, TranslateButtonAPI.DetectError.NO_CAPTIONS, TranslateButtonAPI.DetectError.NO_ID];
        const t = ["abort", "pause", "playing", "timeupdate", "ratechange", "waiting"];

        function n(e) {
            const t = ["paused", "muted", "duration", "currentTime", "playbackRate", "readyState", "seeking"];
            var n = {};
            t.forEach((t => {
                const i = e[t];
                if (typeof i == "number" && (isNaN(i) || !isFinite(i))) {
                    return
                }
                n[t] = i
            }));
            return n
        }

        function i(e) {
            var t = n(e.target);
            if (!t) return;
            t.type = e.type;
            __gCrWeb.message.invokeOnHost({
                command: "video_translate.playback_event",
                args: t
            });
            if ("abort" == e.type) {
                F()
            }
        }

        function r(e) {
            if (!e) {
                return
            }
            e.dispatchEvent(new CustomEvent("__yb_video_translation_start"))
        }

        function o(e) {
            if (!e) {
                return
            }
            var t = new CustomEvent("__yb_video_translation_stop");
            e.dispatchEvent(t)
        }

        function s(e) {
            if (e) {
                t.forEach((t => {
                    e.addEventListener(t, i)
                }));
                r(e)
            }
        }

        function a(e) {
            if (e) {
                t.forEach((t => {
                    e.removeEventListener(t, i)
                }));
                o(e)
            }
        }
        const u = TranslateButtonAPI;
        var l = null;
        var d = false;
        var c = null;
        var _ = null;
        var f = null;
        var v = null;
        var h = null;

        function m(e) {
            __gCrWeb.message.invokeOnHost({
                command: "video_translate.report_detector_error",
                args: {
                    msg: "VideoDetectionError: " + e
                }
            })
        }

        function b(e) {
            let t;
            let n = false;

            function i() {
                if (t) {
                    n = true;
                    return
                }
                e.call(null);
                t = window.requestAnimationFrame((() => {
                    if (n) {
                        n = false;
                        e.call(null)
                    }
                    t = undefined
                }))
            }
            return i
        }
        class g {
            start(e, t) {
                let n = document.querySelector("video");
                if (n) {
                    e(n)
                }
                t()
            }
            teardown() {}
        }
        class T {
            constructor() {
                this.videoMutationObserver = null;
                this.videoMutationObserverTeardownTimeout = null;
                this.mutationsStack = [];
                this.onVideoElementFound = null;
                this.onFinished = null
            }
            processVideosAfterTimeout(e) {
                if (this.processVideoTimeout) {
                    clearTimeout(this.processVideoTimeout)
                }
                this.processVideoTimeout = setTimeout(function() {
                    this.onVideoElementFound(e);
                    this.processVideoTimeout = null
                }.bind(this), 200)
            }
            processMutations_() {
                while (this.mutationsStack.length) {
                    const t = this.mutationsStack.pop();
                    if (t.type !== "childList") {
                        continue
                    }
                    for (let n = 0; n < t.addedNodes.length; n++) {
                        const i = t.addedNodes[n];
                        if (i.nodeType !== Node.ELEMENT_NODE) {
                            continue
                        }
                        var e = null;
                        if (i.tagName == "VIDEO") {
                            e = i
                        } else {
                            e = i.querySelector("video")
                        }
                        if (e) {
                            this.processVideosAfterTimeout(e);
                            return
                        }
                    }
                }
            }
            start(e, t) {
                this.onVideoElementFound = e;
                this.onFinished = t;
                const n = b(this.processMutations_.bind(this));
                this.videoMutationObserver = new MutationObserver(function(e) {
                    this.mutationsStack.push(...e);
                    n()
                }.bind(this));
                this.videoMutationObserver.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                var i = 5e3;
                if (features.detection_timeout) {
                    i = features.detection_timeout
                }
                this.videoMutationObserverTeardownTimeout = setTimeout(function() {
                    this.teardownByTimeout()
                }.bind(this), i)
            }
            teardownByTimeout() {
                this.teardown();
                this.onFinished()
            }
            teardown() {
                if (this.videoMutationObserverTeardownTimeout) {
                    clearTimeout(this.videoMutationObserverTeardownTimeout);
                    this.videoMutationObserverTeardownTimeout = null
                }
                if (this.videoMutationObserver) {
                    this.videoMutationObserver.disconnect();
                    this.videoMutationObserver = null
                }
            }
        }
        class p {
            constructor() {
                this.onVideoElementFound = null;
                this.onFinished = null;
                this.onPlayEvent_ = this.onPlayEvent_.bind(this)
            }
            onPlayEvent_(e) {
                if (e.target.tagName != "VIDEO") {
                    return
                }
                this.onVideoElementFound(e.target)
            }
            start(e, t) {
                this.onVideoElementFound = e;
                this.onFinished = t;
                document.addEventListener("play", this.onPlayEvent_, true)
            }
            teardown() {
                document.removeEventListener("play", this.onPlayEvent_, true)
            }
        }
        class C {
            constructor(e, t) {
                this.finders = e;
                this.onVideoFound = t;
                this.currentFinder = null
            }
            nextFinder() {
                if (!this.currentFinder) {
                    return this.finders[0]
                }
                let e = this.finders.indexOf(this.currentFinder);
                if (e < this.finders.length) {
                    return this.finders[++e]
                }
                return null
            }
            startWithNextFinder() {
                this.currentFinder = this.nextFinder();
                if (!this.currentFinder) {
                    return
                }
                this.currentFinder.start(this.onVideoFound, this.startWithNextFinder.bind(this))
            }
            teardown() {
                if (this.currentFinder) {
                    this.currentFinder.teardown()
                }
            }
        }

        function E(t, n) {
            c = new u.TranslatableVideoDetector({
                forceLanguageSelect: features.force_language_select
            });
            c.findVideo(t).then((t => {
                if (!t) {
                    return
                }
                if (t.video_id) {
                    n(t)
                } else if (t.error && e.includes(t.error)) {
                    m(t.error)
                }
            })).catch((e => {
                m(e.message)
            }))
        }

        function y(e) {
            if (features.plays_video_inline) {
                e.video_element.setAttribute("playsinline", "")
            }
            l = e.video_element;
            l.addEventListener("webkitpresentationmodechanged", V);
            var t = Number.isFinite(l.duration) ? l.duration : 0;
            var n = e.video_language;
            if (!features.force_language_select && n === undefined) {
                n = "en"
            }
            var i = e.can_subtitles === undefined ? true : e.can_subtitles;
            var r = {};
            for (let t = 0; t < e.subtitles_data.length; t++) {
                r[t] = e.subtitles_data[t]
            }
            __gCrWeb.message.invokeOnHost({
                command: "video_translate.video_available",
                args: {
                    video_id: e.video_id,
                    channel_id: e.channel_id,
                    video_length: t,
                    video_language: n,
                    is_stream: e.stream,
                    absolute_time: e.absolute_time,
                    web_current_time: e.web_current_time,
                    can_translate: e.can_translate,
                    can_subtitles: i,
                    subtitles: r,
                    subtitles_size: e.subtitles_data.length,
                    frame_url: document.location.href
                }
            })
        }

        function w() {
            if (h) {
                return
            }
            h = new C([new g, new T, new p], (e => {
                if (e === l) {
                    return
                }
                M();
                E(e, y)
            }));
            h.startWithNextFinder()
        }

        function S() {
            if (!h) {
                return
            }
            h.teardown();
            h = null
        }

        function W() {
            if (c) {
                c.cancel();
                c = null
            }
        }

        function O() {
            if (l) {
                l.removeEventListener("webkitpresentationmodechanged", V);
                a(l);
                l = null
            }
        }

        function F() {
            const e = document.querySelector("video");
            if (e !== l) {
                O()
            }
            W();
            E(e, (e => {
                if (d) {
                    s(e.video_element)
                }
            }))
        }

        function k() {
            N()
        }

        function V(e) {
            if (!l || l != e.target) {
                return
            }
            __gCrWeb.message.invokeOnHost({
                command: "video_translate.presentation_mode_changed",
                args: {
                    mode: l.webkitPresentationMode
                }
            })
        }

        function N() {
            S();
            M()
        }

        function M() {
            O();
            W();
            d = false;
            if (_) {
                _.remove();
                _ = null
            }
            P()
        }

        function P() {
            if (f) {
                f.destroy();
                f = null
            }
        }

        function L() {
            k();
            if (v) {
                clearTimeout(v);
                v = null
            }
            v = setTimeout(w, 100)
        }
        __gCrWeb.videoTranslate["initialize"] = function() {
            k();
            if (document.body == null) {
                window.addEventListener("DOMContentLoaded", (function() {
                    L()
                }));
                return
            }
            L()
        };
        __gCrWeb.videoTranslate["setButtonState"] = function(e, t, n, i) {
            if (!l) return;
            if (!_) {
                _ = new u.TranslationButton(l, {
                    translation: e,
                    subtitles: t,
                    settings: n,
                    isStream: i
                });
                _.insert();
                _.handleTranslationClick = () => {
                    l.muted = false;
                    __gCrWeb.message.invokeOnHost({
                        command: "video_translate.video_click_event"
                    });
                    l.dispatchEvent(new CustomEvent("__yb_video_translation_button_pressed"))
                };
                _.handleSubtitlesClick = () => {
                    __gCrWeb.message.invokeOnHost({
                        command: "video_translate.subtitles_click_event"
                    })
                };
                _.handleSettingsClick = () => {
                    __gCrWeb.message.invokeOnHost({
                        command: "video_translate.settings_click_event"
                    })
                };
                if ("AVAILABLE" === e || "PROCESSING" === e) {
                    l.dispatchEvent(new CustomEvent("__yb_video_translation_button_shown"))
                }
            }
        };
        __gCrWeb.videoTranslate["setTranslationState"] = function(e) {
            if (!_) {
                return
            }
            _.setTranslationState(e)
        };
        __gCrWeb.videoTranslate["setSubtitlesState"] = function(e) {
            if (!_) {
                return
            }
            _.setSubtitlesState(e)
        };
        __gCrWeb.videoTranslate["setSettingsState"] = function(e) {
            if (!_) {
                return
            }
            _.setSettingsState(e)
        };
        __gCrWeb.videoTranslate["reset"] = k;
        __gCrWeb.videoTranslate["observePlaybackEvents"] = function(e) {
            d = e;
            if (e) {
                s(l)
            } else {
                a(l)
            }
        };
        __gCrWeb.videoTranslate["reportButtonClickReaction"] = function(e) {
            var t = new CustomEvent("__yb_video_translation_button_press_result", {
                detail: {
                    state: e
                }
            });
            l.dispatchEvent(t)
        };
        __gCrWeb.videoTranslate["flushStatistics"] = function() {
            o(l)
        };
        __gCrWeb.videoTranslate["setWaitingTime"] = function(e) {
            if (!l) {
                return
            }
            if (_ && _.setWaitingTime !== undefined) {
                _.setWaitingTime(e)
            }
        };
        __gCrWeb.videoTranslate["pausePlayer"] = function() {
            if (!l) return;
            l.pause()
        };
        __gCrWeb.videoTranslate["playPlayer"] = function() {
            if (!l) return;
            l.play()
        };
        __gCrWeb.videoTranslate["setCurrentTimePlayer"] = function(e) {
            if (!l) return;
            u.setCurrentTime(l, e)
        };
        __gCrWeb.videoTranslate["getPlaybackState"] = function() {
            if (!l) return null;
            return n(l)
        };
        __gCrWeb.videoTranslate["showSubtitles"] = function(e, t) {
            P();
            if (!l) {
                return
            }
            f = u.getVideoContainer(l);
            const n = {
                data: e,
                lang: t
            };
            f.handleSubtitlesStatusChange(n)
        };
        __gCrWeb.videoTranslate["hideSubtitles"] = function() {
            P()
        };
        __gCrWeb.videoTranslate["highlightSubtitles"] = function(e) {
            if (f) {
                f.handleKaraokeEnabledChange(e)
            }
        };
        __gCrWeb.videoTranslate["playCurrentVideoAndShowUI"] = function() {
            if (l) {
                l.play();
                if (_) {
                    _.show()
                }
            }
        }
    })()
})();