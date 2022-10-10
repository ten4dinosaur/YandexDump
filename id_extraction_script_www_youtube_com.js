(function (video,config){var TranslatableVideoDetectorAPI = function(e) {
    "use strict";
    var t, r;
    !function(e) {
        e.UNKNOWN_RESOURCE = "resource is unknown", e.NO_VIDEO = "video element not found", 
        e.CANCELED = "detecting canceled", e.NO_CAPTIONS = "no captions", e.NO_ID = "could not parse id", 
        e.NOT_IMPLEMENTED = "method not implemented", e.MAX_DURATION_EXCEEDED = "video duration exceeds maximum", 
        e.IS_STREAM = "can't translate streams yet", e.IS_STREAM_NO_SEEK = "seek is unavailable for this stream";
    }(t || (t = {})), function(e) {
        e[e.NO_SETTINGS_SUPPORT = 1] = "NO_SETTINGS_SUPPORT", e[e.SEMANTICS_SETTINGS_SUPPORT = 2] = "SEMANTICS_SETTINGS_SUPPORT", 
        e[e.SEMANTICS_AND_UI_SETTINGS_SUPPORT = 3] = "SEMANTICS_AND_UI_SETTINGS_SUPPORT";
    }(r || (r = {}));
    class i extends Error {
        constructor(e = "Assertion failed") {
            super(e);
        }
    }
    const o = e => new Promise((t => window.setTimeout(t, e)));
    var a;
    !function(e) {
        e.COURSERA = "coursera", e.TIKTOK = "tiktok", e.TWITTER = "twitter", e.TWITCH = "twitch", 
        e.YOUTUBE = "youtube", e.FACEBOOK = "facebook", e.VIMEO = "vimeo", e.VK = "vk", 
        e.NINE_GAG = "nine_gag", e.UDEMY = "udemy", e.PORNHUB = "pornhub", e.XVIDEOS = "xvideos", 
        e.UNKNOWN = "unknown";
    }(a || (a = {}));
    const n = {
        "^www.coursera.org$": a.COURSERA,
        "^(www.|m.)facebook.com$": a.FACEBOOK,
        "^9gag.com$": a.NINE_GAG,
        "^www.tiktok.com$": a.TIKTOK,
        "^(www.|m.)?twitch.tv$": a.TWITCH,
        "^(mobile.)?twitter.com$": a.TWITTER,
        "^(player.)?vimeo.com$": a.VIMEO,
        "^(m.)?vk.com$": a.VK,
        "^www.udemy.com$": a.UDEMY,
        "^(www.|m.)?youtube(-nocookie)?.com$": a.YOUTUBE,
        "^(www.|rt.)?pornhub.com$": a.PORNHUB,
        "^www.xvideos.com$": a.XVIDEOS
    }, s = {
        getLocation: () => window.location,
        getHostname: () => window.location.hostname,
        getHref: () => window.location.href,
        getPathname: () => window.location.pathname,
        getOrigin: () => window.location.origin
    }, u = () => {
        const e = s.getHostname();
        for (const t in n) if (Object.prototype.hasOwnProperty.call(n, t)) {
            if (new RegExp(t).test(e)) return n[t];
        }
        return a.UNKNOWN;
    };
    var d;
    !function(e) {
        e.SNAKE = "snake", e.CAMEL = "camel";
    }(d || (d = {}));
    const l = e => e.replace(/[A-Z]/g, (e => `_${e.toLowerCase()}`));
    class c {
        constructor(e) {
            this.format = e;
        }
        getError(e) {
            return ((e, t) => {
                for (const r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
                    let i;
                    switch (t) {
                      case d.CAMEL:
                        i = r.replace(/_[a-z]/g, (e => `${e[1].toUpperCase()}`));
                        break;

                      case d.SNAKE:
                        i = l(r);
                        break;

                      default:
                        i = r;
                    }
                    r !== i && (e[i] = e[r], delete e[r]);
                }
                return e;
            })("string" == typeof e ? {
                error: e,
                subtitlesError: e,
                translationError: e
            } : e, this.format);
        }
    }
    const g = e => e instanceof HTMLVideoElement && "VIDEO" === e.tagName;
    var h = {
        languages: [ "it", "en", "es", "fr", "de" ]
    };
    var m = {
        getYoutubeData: async function() {
            var e, t, r, i;
            function o(e) {
                if (!e) return;
                return e.toLowerCase().split(";")[0].trim().split("-")[0];
            }
            async function a(e) {
                return new Promise((t => window.setTimeout(t, e)));
            }
            async function n(e, t) {
                let r = !1;
                return Promise.race([ new Promise((async t => {
                    for (;!e() && !r; ) await a(100);
                    t();
                })), new Promise((e => {
                    window.setTimeout((() => {
                        r = !0, e();
                    }), t);
                })) ]);
            }
            function s() {
                return /^m\.youtube\.com$/.test(window.location.hostname);
            }
            function u() {
                return document.querySelector("#movie_player");
            }
            function d() {
                return s() ? document.querySelector("#app") : u();
            }
            function l() {
                var e, t;
                return Boolean(null === (t = null === (e = u()) || void 0 === e ? void 0 : e.getOptions) || void 0 === t ? void 0 : t.call(e).includes("captions"));
            }
            function c() {
                var e, t, r, i;
                return s() ? null === (t = null === (e = d()) || void 0 === e ? void 0 : e.data) || void 0 === t ? void 0 : t.playerResponse : null === (i = null === (r = d()) || void 0 === r ? void 0 : r.getPlayerResponse) || void 0 === i ? void 0 : i.call(r);
            }
            function g() {
                var e;
                return null === (e = c()) || void 0 === e ? void 0 : e.videoDetails;
            }
            function h() {
                var e;
                return Boolean(null === (e = g()) || void 0 === e ? void 0 : e.isLive);
            }
            function m() {
                var e, t, r, i;
                return window.self !== window.top ? null === (t = null === (e = u()) || void 0 === e ? void 0 : e.getMediaReferenceTime) || void 0 === t ? void 0 : t.call(e) : null === (i = null === (r = u()) || void 0 === r ? void 0 : r.getProgressState) || void 0 === i ? void 0 : i.call(r).ingestionTime;
            }
            function v(e) {
                if (void 0 === e || !Number.isFinite(e) || e <= 0) return !1;
                return Math.abs(Date.now() - 1e3 * e) < 864e5;
            }
            async function w() {
                await async function() {
                    return await n((() => l()), 100), l();
                }() && await n((() => E().length > 0), 5e3);
            }
            function f(e) {
                return "languageCode" in e;
            }
            function E() {
                var e, t;
                return null !== (t = null === (e = u()) || void 0 === e ? void 0 : e.getOption("captions", "tracklist", {
                    includeAsr: !0
                })) && void 0 !== t ? t : [];
            }
            await async function() {
                await n((() => Boolean(c())), 5e3);
            }();
            const L = c(), p = function() {
                var e, t, r, i;
                return null !== (i = null === (r = null === (t = null === (e = c()) || void 0 === e ? void 0 : e.captions) || void 0 === t ? void 0 : t.playerCaptionsTracklistRenderer) || void 0 === r ? void 0 : r.captionTracks) && void 0 !== i ? i : [];
            }().reduce(((e, t) => {
                if (f(t)) {
                    const r = o(t.languageCode), i = function(e) {
                        const t = (null == e ? void 0 : e.url) || (null == e ? void 0 : e.baseUrl);
                        if (t && "string" == typeof t) return function(e) {
                            return `${e.startsWith("http") ? e : `${window.location.origin}/${e}`}&fmt=json3`;
                        }(t);
                    }(t), a = function(e) {
                        var t, r, i;
                        const o = (null === (t = e.name) || void 0 === t ? void 0 : t.simpleText) || (null === (i = null === (r = e.name) || void 0 === r ? void 0 : r.runs) || void 0 === i ? void 0 : i[0].text) || e.displayName || e.languageName;
                        if (o && "string" == typeof o) return `${o}, ${window.location.hostname}`;
                    }(t);
                    r && i && a && e.push({
                        languageCode: r,
                        isAutoGenerated: "asr" === (null == t ? void 0 : t.kind),
                        title: a,
                        url: i
                    });
                }
                return e;
            }), []), [A, S] = await Promise.all([ async function() {
                if (!h()) return;
                await n((() => v(m())), 5e3);
                const e = m();
                return v(e) ? e : void 0;
            }(), async function(e) {
                let t;
                return h() ? (await w(), t = E()) : t = e, t.reduce(((e, t) => {
                    if (f(t)) {
                        const r = o(t.languageCode);
                        r && e.push({
                            languageCode: r,
                            isAutoGenerated: (null == t ? void 0 : t.isAutoGenerated) || "asr" === (null == t ? void 0 : t.kind)
                        });
                    }
                    return e;
                }), []);
            }(p) ]);
            return {
                videoId: null === (e = null == L ? void 0 : L.videoDetails) || void 0 === e ? void 0 : e.videoId,
                title: null === (t = null == L ? void 0 : L.videoDetails) || void 0 === t ? void 0 : t.title,
                description: null === (r = null == L ? void 0 : L.videoDetails) || void 0 === r ? void 0 : r.shortDescription,
                tracks: p,
                tracksInfo: S,
                isStream: h(),
                absoluteTime: A,
                isLiveDvrEnabled: function() {
                    var e;
                    return Boolean(null === (e = g()) || void 0 === e ? void 0 : e.isLiveDvrEnabled);
                }(),
                channelId: null === (i = null == L ? void 0 : L.videoDetails) || void 0 === i ? void 0 : i.channelId
            };
        }
    }, v = [ "ru" ];
    const w = /(https?:\/\/[^\s]+)/gi, f = /[а-я]+/i;
    var E = {
        ru: [ "1nAvQa5zbIc", "QkZJ9X0UJQs", "TYP72BKy8UI", "PXrZ4X9834Q", "lTKoaY9H_Yw", "udF9dUmwZMU" ],
        en: [ "itcMLwMEeMQ", "Fz9pNRmPmUs" ],
        fr: [ "gh6nK1MFo0I", "_-y_sAlWSC4" ],
        de: [ "Xww_oaafCBA" ]
    };
    const L = [ {
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
    } ].map((({id: e}) => e));
    class p extends class {
        constructor(e) {
            this.canShowSubtitles = !1, this.canTranslateStream = !1, this.enableOverVideoPositioning = !1, 
            this.shouldCheckCLD = !1, this.shouldWaitForLoading = !1, this.predefinedLanguages = {}, 
            this.targetLanguages = h.languages, this.blockedLanguages = v, this.errors = [], 
            this.forceLanguageSelect = !1, void 0 !== (null == e ? void 0 : e.forceLanguageSelect) && (this.forceLanguageSelect = e.forceLanguageSelect);
        }
        async checkIsStreamWhitelisted() {
            return !0;
        }
        async getChannelId() {
            return "";
        }
        getLanguageFromLocalFeatures(e) {}
        async videoDataHasCyrillicCharacters(e) {
            const [t, r] = await Promise.all([ this.getTitle(e), this.getDescription(e) ]);
            return this.hasCyrillicSymbols(t) || this.hasCyrillicSymbols(r);
        }
        getTitle(e) {
            return "";
        }
        getDescription(e) {
            return "";
        }
        isAnAd(e) {
            return !1;
        }
        containerPositionIsStatic(e) {
            return !1;
        }
        getSubtitles(e) {
            return [];
        }
        videoIsStream(e) {
            return !Number.isFinite(e.duration);
        }
        getAbsoluteTime(e) {}
        videoIsSeekable() {
            return !0;
        }
        async getVideoIdString(e) {
            return "";
        }
        getVideo() {
            if (u() === a.UNKNOWN) return !1;
            const e = document.querySelector("video");
            return e || !1;
        }
        processResult(e) {
            const {sourceLanguage: t, translationError: r} = e;
            r && this.errors.push(r);
            const i = Boolean(t && this.targetLanguages.includes(t));
            return {
                sourceLanguage: t,
                canTranslate: i,
                translationError: i ? void 0 : this.errors.join("\n")
            };
        }
        getCheckStages() {
            return [ {
                check: e => this.getPredefinedLanguageResult(e)
            }, {
                check: e => this.getLocalApiLanguageResult(e)
            }, {
                check: e => this.getCyrillicLanguageResult(e)
            }, {
                check: e => this.getCLDLanguageResult(e),
                shouldSkip: !this.shouldCheckCLD,
                isFinal: this.shouldCheckCLD
            } ];
        }
        async getSourceLanguage(e) {
            let t;
            this.errors = [];
            const r = this.getCheckStages();
            for (const i of r) {
                if (i.shouldSkip) continue;
                const r = await i.check(e);
                if (t = this.processResult(r), t.sourceLanguage || i.isFinal) return t;
            }
            return this.forceLanguageSelect ? this.processResult({
                sourceLanguage: void 0
            }) : (t = this.processResult({
                sourceLanguage: "en",
                translationError: "Can not detect language, returning default"
            }), t);
        }
        getLocalAPIError(e) {
            return e ? `Language from local API is "${e}"` : "No language from local API";
        }
        async getLocalApiLanguageResult(e) {
            try {
                const t = await this.getLanguageFromLocalFeatures(e);
                if (!t) return {
                    translationError: this.getLocalAPIError()
                };
                if (this.blockedLanguages.includes(t)) return {
                    sourceLanguage: t,
                    translationError: this.getLocalAPIError(t)
                };
                return this.targetLanguages.find((e => e === t)) ? {
                    sourceLanguage: t
                } : {
                    sourceLanguage: t,
                    translationError: this.getLocalAPIError(t)
                };
            } catch (e) {
                return {
                    translationError: String(e)
                };
            }
        }
        removeLinks(e) {
            return e.replace(w, "");
        }
        hasCyrillicSymbols(e) {
            return f.test(e);
        }
        async getCyrillicLanguageResult(e) {
            return await this.videoDataHasCyrillicCharacters(e) ? {
                sourceLanguage: "ru",
                translationError: "Video data includes cyrillic characters"
            } : {};
        }
        async getLanguageGuess(e, t = !0) {
            var r, i, o;
            const a = null !== (i = null === (r = window.yandex) || void 0 === r ? void 0 : r.i18n) && void 0 !== i ? i : null === (o = window.chrome) || void 0 === o ? void 0 : o.i18n;
            if (!(null == a ? void 0 : a.detectLanguage)) return;
            const n = await new Promise((t => a.detectLanguage(e, (e => t(e)))));
            if (t && !n.isReliable) return;
            if (!n.languages.length) return;
            const s = n.languages[0];
            return s.percentage >= 80 ? s.language : void 0;
        }
        async getCLDLanguageResult(e) {
            const t = await this.getTitle(e), r = await this.getDescription(e), i = await this.getLanguageGuess(t, !1), o = r && r.length > 4;
            let a;
            if (o) {
                const e = this.removeLinks(r);
                a = await this.getLanguageGuess(e, !1);
            }
            for (const e of this.targetLanguages) {
                const t = o && e === a;
                if (e === i || t) return {
                    sourceLanguage: e,
                    translationError: this.getCLDError(i, a, e)
                };
            }
            return {
                sourceLanguage: i,
                translationError: this.getCLDError(i, a, i)
            };
        }
        getCLDError(e, t, r) {
            const i = `Languages from CLD: title is "${e}", description is "${t}"`;
            return r ? `${i}, detecting video language as "${r}"` : `${i}, could not detect language`;
        }
        async getPredefinedLanguageResult(e) {
            var t;
            const r = await this.getVideoIdString(e);
            if (!r) return {
                translationError: "Could not retrieve video id for predefined language check"
            };
            for (const e in this.predefinedLanguages) if (null === (t = this.predefinedLanguages[e]) || void 0 === t ? void 0 : t.includes(r)) return {
                sourceLanguage: e,
                translationError: "Returned predefined language"
            };
            return {};
        }
    } {
        constructor() {
            super(...arguments), this.canShowSubtitles = !0, this.canTranslateStream = !0, this.enableOverVideoPositioning = this.isEmbedded(), 
            this.shouldCheckCLD = !0, this.shouldWaitForLoading = !0, this.predefinedLanguages = E, 
            this.youtubeData = m.getYoutubeData();
        }
        async checkIsStreamWhitelisted() {
            if (!await this.videoIsStream()) return !1;
            const {channelId: e} = await this.youtubeData;
            return !!e && L.includes(e);
        }
        async getChannelId() {
            return (await this.youtubeData).channelId || "";
        }
        async getVideoId(e) {
            const t = await this.getVideoIdString();
            return !!t && `https://youtu.be/${t}`;
        }
        isMobile() {
            return /^m\.youtube\.com$/.test(s.getHostname());
        }
        getAutoGeneratedCaptions(e) {
            if (null == e ? void 0 : e.length) return e.find((e => e.isAutoGenerated));
        }
        normalizeLanguage(e) {
            if (!e) return;
            const t = e.indexOf(".");
            return -1 === t ? e : e.substring(t + 1);
        }
        async getLanguageFromLocalFeatures() {
            const e = await this.getTracksInfo(), t = this.getAutoGeneratedCaptions(e);
            return this.normalizeLanguage(null == t ? void 0 : t.languageCode);
        }
        isAnAd(e) {
            const t = this.getPlayer(e);
            return !!t && t.classList.contains("ad-showing");
        }
        async videoIsSeekable() {
            return (await this.youtubeData).isLiveDvrEnabled;
        }
        getPlayer(e) {
            return e.closest(".html5-video-player");
        }
        getPlayerContainer(e) {
            return this.isMobile() ? e.closest("#player-container-id") : this.isEmbedded() ? e.closest("#movie_player") : e.closest("#player-container");
        }
        getAdContainer() {
            return document.querySelector("ytm-companion-ad-renderer");
        }
        isEmbedded() {
            return window.self !== window.top;
        }
        async getTitle() {
            var e;
            return null !== (e = (await this.youtubeData).title) && void 0 !== e ? e : "";
        }
        async getDescription() {
            var e;
            return null !== (e = (await this.youtubeData).description) && void 0 !== e ? e : "";
        }
        async getTracksInfo() {
            return (await this.youtubeData).tracksInfo;
        }
        async getSubtitles() {
            return (await this.youtubeData).tracks;
        }
        async videoIsStream() {
            return (await this.youtubeData).isStream;
        }
        async getAbsoluteTime() {
            return (await this.youtubeData).absoluteTime;
        }
        async getVideoIdString() {
            return (await this.youtubeData).videoId;
        }
    }
    class A extends class extends class {
        constructor(e) {
            this.format = d.CAMEL, this.shouldWaitForRedirect = !1, this.shouldWaitForAds = !1, 
            this.shouldReturnAds = !1, this.findVideoPromise = null, this.waitForAdPromise = null, 
            this.waitForAdPromiseResolver = null, this.videoLoadedPromise = null, this.videoLoadedSuccessPromiseResolver = null, 
            this.videoLoadedFailPromiseResolver = null;
            const r = this.createResourceAdapter(e);
            !function(e, t) {
                if (null == e) throw new i(t);
            }(r, t.UNKNOWN_RESOURCE), this.resourceAdapter = r, this.errorFormatter = this.createDetectErrorFormatter();
        }
        createResourceAdapter(e) {
            return null;
        }
        createDetectErrorFormatter() {
            return new c(this.format);
        }
        async cancel() {
            this.videoLoadedPromise && (this.videoLoadedSuccessPromiseResolver && this.videoLoadedSuccessPromiseResolver(!1), 
            this.videoLoadedFailPromiseResolver && this.videoLoadedFailPromiseResolver(!1), 
            this.videoLoadedPromise = null), this.waitForAdPromise && (this.waitForAdPromiseResolver && this.waitForAdPromiseResolver(!1), 
            this.waitForAdPromise = null), await this.findVideoPromise;
        }
        async waitForAds(e, t) {
            t && this.shouldWaitForAds && (this.waitForAdPromise = new Promise((t => {
                this.waitForAdPromiseResolver = t, e.addEventListener("durationchange", (() => {
                    t();
                }), {
                    once: !0
                });
            })), await this.waitForAdPromise, this.waitForAdPromise = null);
        }
        async waitForVideoLoading(e) {
            if (e.readyState >= 1) return !0;
            this.videoLoadedPromise = new Promise((t => {
                this.videoLoadedSuccessPromiseResolver = t, e.addEventListener("loadedmetadata", (() => {
                    t(!0);
                }), {
                    once: !0
                });
            }));
            const t = await this.videoLoadedPromise;
            return this.videoLoadedPromise = null, t;
        }
        async findVideoAndWaitForLoading(e) {
            const r = null != e ? e : this.resourceAdapter.getVideo();
            if (!g(r)) return t.NO_VIDEO;
            if (this.resourceAdapter.shouldWaitForLoading) {
                if (!await this.waitForVideoLoading(r)) return t.CANCELED;
            }
            return function(e) {
                return Boolean(e.src || e.querySelector("source"));
            }(r) ? this.processVideoDuration(r) : t.NO_VIDEO;
        }
        async waitForFiniteDuration(e) {
            this.hasFiniteDuration(e) || await (async (e, t, r = !1) => {
                let i = !1;
                return Promise.race([ new Promise((async t => {
                    for (;!e() && !i; ) await o(100);
                    t();
                })), new Promise(((e, o) => {
                    window.setTimeout((() => {
                        i = !0, r ? o(new Error(`Wait for condition reached timeout of ${t}`)) : e();
                    }), t);
                })) ]);
            })((() => this.hasFiniteDuration(e)), 5e3);
        }
        async processVideoDuration(e) {
            await this.waitForFiniteDuration(e);
            if (await this.resourceAdapter.videoIsStream(e)) {
                if (!this.resourceAdapter.canTranslateStream) return t.IS_STREAM;
            } else if (e.duration > 14400) return t.MAX_DURATION_EXCEEDED;
            return e;
        }
        async findVideoBase(e) {
            await this.waitForRedirect();
            const r = await this.findVideoAndWaitForLoading(e);
            if (!g(r)) return this.errorFormatter.getError(r);
            const i = r, o = Boolean(this.resourceAdapter.isAnAd(i));
            await this.waitForAds(r, o);
            const a = await this.resourceAdapter.getVideoId(i);
            return a ? o && this.shouldReturnAds ? {
                id: a,
                ad: o
            } : {
                id: a,
                video: i
            } : this.errorFormatter.getError(t.NO_ID);
        }
        async getDownloadlinks() {
            let e = {};
            return "function" == typeof this.resourceAdapter.getDownloadLinks && (e = await this.resourceAdapter.getDownloadLinks()), 
            e;
        }
        async getSyncAbsoluteAndWebCurrentTimes(e) {
            return {
                absoluteTime: await this.resourceAdapter.getAbsoluteTime(e),
                webCurrentTime: e.currentTime
            };
        }
        async getVideoData(e) {
            const {canShowSubtitles: t} = this.resourceAdapter, [{sourceLanguage: r, canTranslate: i, translationError: o}, {subtitlesData: a, subtitlesError: n}, s, u, d, l, {absoluteTime: c, webCurrentTime: g}, {videoDownloadLink: m, subtitlesDownloadLink: v}] = await Promise.all([ this.resourceAdapter.getSourceLanguage(e.video), this.getSubtitlesData(e.video), this.resourceAdapter.videoIsSeekable(), this.resourceAdapter.videoIsStream(e.video), this.resourceAdapter.checkIsStreamWhitelisted(), this.resourceAdapter.getChannelId(), this.getSyncAbsoluteAndWebCurrentTimes(e.video), this.getDownloadlinks() ]);
            return {
                id: e.id,
                sourceLanguage: r,
                canTranslate: i,
                translationError: o,
                canShowSubtitles: t,
                subtitlesData: a,
                subtitlesError: n,
                seekable: s,
                stream: u,
                streamWhitelisted: d,
                channelId: l,
                absoluteTime: c,
                webCurrentTime: g,
                supportedSourceLangs: h.languages,
                videoDownloadLink: m,
                subtitlesDownloadLink: v
            };
        }
        async findTranslatableVideo(e) {
            return this.errorFormatter.getError(t.NOT_IMPLEMENTED);
        }
        async waitForRedirect() {
            if (!this.shouldWaitForRedirect) return;
            const e = new URL(s.getHref()), t = "vtrans" === e.searchParams.get("utm_sup_project"), r = u() === a.YOUTUBE && null !== e.searchParams.get("t");
            (t || r) && await o(1500);
        }
        hasFiniteDuration(e) {
            return !Number.isNaN(e.duration) && Number.isFinite(e.duration);
        }
        async getSubtitlesData(e) {
            try {
                return this.resourceAdapter ? {
                    subtitlesData: await this.resourceAdapter.getSubtitles(e)
                } : {
                    subtitlesData: []
                };
            } catch (e) {
                return {
                    subtitlesData: [],
                    subtitlesError: String(e)
                };
            }
        }
        resultIsAnError(e) {
            return void 0 !== e.error;
        }
        resultIsDetailedError(e) {
            return "subtitlesError" in e || "translationError" in e;
        }
        resultIsAnAd(e) {
            return void 0 !== e.ad;
        }
    } {
        constructor() {
            super(...arguments), this.format = d.CAMEL, this.shouldWaitForRedirect = !0, this.shouldWaitForAds = !1, 
            this.shouldReturnAds = !0, this.ResourceAdapterConstructor = null, this.findVideoPromise = null;
        }
        createResourceAdapter(e) {
            return this.ResourceAdapterConstructor ? new this.ResourceAdapterConstructor(e) : null;
        }
        createDetectErrorFormatter() {
            return new c(this.format);
        }
        async waitForVideoLoading(e) {
            if (e.readyState >= 1) return !0;
            if (!e.yandexVideoTranslation) return !1;
            this.videoLoadedPromise = Promise.race([ new Promise((t => {
                this.videoLoadedSuccessPromiseResolver = t, e.addEventListener("loadedmetadata", (() => {
                    t(!0);
                }), {
                    once: !0
                });
            })), new Promise((t => {
                var r, i, o, a;
                this.videoLoadedFailPromiseResolver = t, null === (i = null === (r = e.yandexVideo) || void 0 === r ? void 0 : r.observeClearing) || void 0 === i || i.call(r, (() => {
                    t(!1);
                })), null === (a = null === (o = e.yandexVideoTranslation) || void 0 === o ? void 0 : o.observeClearing) || void 0 === a || a.call(o, (() => {
                    t(!1);
                }));
            })) ]);
            const t = await this.videoLoadedPromise;
            return this.videoLoadedPromise = null, t;
        }
        async findTranslatableVideo(e) {
            try {
                const r = await this.findVideoBase(e);
                if (this.resultIsDetailedError(r) || this.resultIsAnAd(r)) return r;
                const {sourceLanguage: i, canTranslate: o} = await this.resourceAdapter.getSourceLanguage(r.video);
                return i && o ? {
                    id: r.id,
                    sourceLang: i
                } : {
                    subtitlesError: t.NO_CAPTIONS,
                    translationError: t.NO_CAPTIONS
                };
            } catch (e) {
                return this.errorFormatter.getError(e.message);
            }
        }
        async findVideo(e) {
            try {
                if (!this.resourceAdapter) return this.errorFormatter.getError(t.UNKNOWN_RESOURCE);
                const r = await this.findVideoBase(e);
                if (this.resultIsDetailedError(r) || this.resultIsAnAd(r)) return r;
                const i = await this.getVideoData(r);
                return {
                    id: i.id,
                    sourceLang: i.sourceLanguage,
                    canTranslate: i.canTranslate,
                    translationError: i.translationError,
                    canSubtitles: i.canShowSubtitles ? 1 : 0,
                    subtitlesData: i.subtitlesData,
                    subtitlesError: i.subtitlesError,
                    seekable: i.seekable,
                    stream: i.stream,
                    streamWhitelisted: i.streamWhitelisted,
                    channelId: i.channelId,
                    absoluteTime: i.absoluteTime,
                    webCurrentTime: i.webCurrentTime,
                    supportedSourceLangs: i.supportedSourceLangs,
                    videoDownloadLink: i.videoDownloadLink,
                    subtitlesDownloadLink: i.subtitlesDownloadLink
                };
            } catch (e) {
                return this.errorFormatter.getError(e.toString());
            }
        }
        setFindPromise(e, t) {
            var i;
            return (i = null == t ? void 0 : t.version) && i >= r.SEMANTICS_SETTINGS_SUPPORT ? this.findVideoPromise = this.findVideo(e) : this.findVideoPromise = this.findTranslatableVideo(e), 
            this.findVideoPromise;
        }
    } {
        createResourceAdapter(e) {
            return new p(e);
        }
    }
    const S = (y = A, (e, t) => new y(t).setFindPromise(e, t));
    var y;
    return e.TranslatableVideoDetectorYoutube = A, e.getVideoId = S, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e;
}({});return TranslatableVideoDetectorAPI.getVideoId(video,config);})
