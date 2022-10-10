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
    const s = e => new Promise((t => window.setTimeout(t, e))), o = async (e, t, r = !1) => {
        let i = !1;
        return Promise.race([ new Promise((async t => {
            for (;!e() && !i; ) await s(100);
            t();
        })), new Promise(((e, s) => {
            window.setTimeout((() => {
                i = !0, r ? s(new Error(`Wait for condition reached timeout of ${t}`)) : e();
            }), t);
        })) ]);
    };
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
    }, u = {
        getLocation: () => window.location,
        getHostname: () => window.location.hostname,
        getHref: () => window.location.href,
        getPathname: () => window.location.pathname,
        getOrigin: () => window.location.origin
    }, c = () => {
        const e = u.getHostname();
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
    class g {
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
    const h = e => e instanceof HTMLVideoElement && "VIDEO" === e.tagName;
    var m = {
        languages: [ "it", "en", "es", "fr", "de" ]
    };
    var w = [ "ru" ];
    const L = /(https?:\/\/[^\s]+)/gi, E = /[а-я]+/i;
    class f extends class {
        constructor(e) {
            this.canShowSubtitles = !1, this.canTranslateStream = !1, this.enableOverVideoPositioning = !1, 
            this.shouldCheckCLD = !1, this.shouldWaitForLoading = !1, this.predefinedLanguages = {}, 
            this.targetLanguages = m.languages, this.blockedLanguages = w, this.errors = [], 
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
            if (c() === a.UNKNOWN) return !1;
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
            return e.replace(L, "");
        }
        hasCyrillicSymbols(e) {
            return E.test(e);
        }
        async getCyrillicLanguageResult(e) {
            return await this.videoDataHasCyrillicCharacters(e) ? {
                sourceLanguage: "ru",
                translationError: "Video data includes cyrillic characters"
            } : {};
        }
        async getLanguageGuess(e, t = !0) {
            var r, i, s;
            const o = null !== (i = null === (r = window.yandex) || void 0 === r ? void 0 : r.i18n) && void 0 !== i ? i : null === (s = window.chrome) || void 0 === s ? void 0 : s.i18n;
            if (!(null == o ? void 0 : o.detectLanguage)) return;
            const a = await new Promise((t => o.detectLanguage(e, (e => t(e)))));
            if (t && !a.isReliable) return;
            if (!a.languages.length) return;
            const n = a.languages[0];
            return n.percentage >= 80 ? n.language : void 0;
        }
        async getCLDLanguageResult(e) {
            const t = await this.getTitle(e), r = await this.getDescription(e), i = await this.getLanguageGuess(t, !1), s = r && r.length > 4;
            let o;
            if (s) {
                const e = this.removeLinks(r);
                o = await this.getLanguageGuess(e, !1);
            }
            for (const e of this.targetLanguages) {
                const t = s && e === o;
                if (e === i || t) return {
                    sourceLanguage: e,
                    translationError: this.getCLDError(i, o, e)
                };
            }
            return {
                sourceLanguage: i,
                translationError: this.getCLDError(i, o, i)
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
            super(...arguments), this.enableOverVideoPositioning = !this.isMobile(), this.twitchTargetLanguages = {
                English: "en",
                Английский: "en",
                Español: "es",
                Spanish: "es",
                Испанский: "es",
                Français: "fr",
                French: "fr",
                Французский: "fr",
                Deutsch: "de",
                German: "de",
                Немецкий: "de",
                Italiano: "it",
                Italian: "it",
                Итальянский: "it"
            }, this.twitchBlockedLanguages = {
                Russian: "ru",
                Русский: "ru",
                Russo: "ru",
                Russe: "ru",
                Russisch: "ru"
            };
        }
        getVideoId(e) {
            const t = this.getIdFormLink();
            return t || !1;
        }
        async getLanguageFromLocalFeatures(e) {
            const t = this.getTags();
            for (const e of t) {
                for (const t of Object.keys(this.twitchBlockedLanguages)) if (e === t) return this.twitchBlockedLanguages[t];
                for (const t of Object.keys(this.twitchTargetLanguages)) if (e === t) return this.twitchTargetLanguages[t];
            }
        }
        getPlayerContainer(e) {
            return this.isMobile() ? e.closest("section") : e.closest(".video-ref");
        }
        isMobile() {
            return /^m\.twitch\.tv$/.test(u.getHostname());
        }
        getTags() {
            return [ ...document.body.querySelectorAll('div[class^="ScTag"]') ].map((e => {
                var t;
                return null !== (t = e.textContent) && void 0 !== t ? t : "";
            }));
        }
        async getTitle(e) {
            const t = this.isMobile() ? "p[title]" : '[data-a-target="stream-title"]';
            let r = document.querySelector(t);
            return r || await o((() => null !== document.querySelector(t)), 1e4), r = document.querySelector(t), 
            (null == r ? void 0 : r.textContent) ? r.textContent : "";
        }
        getIdFormLink() {
            if (this.isMobile()) {
                const e = document.head.querySelector('link[rel="canonical"');
                return e && e.href.includes("/videos/") ? e.href : "";
            }
            const e = document.querySelector('a[href*="#sideNav"]');
            return e && e.href.includes("/videos/") ? e.href.replace("#sideNav", "") : "";
        }
        containerPositionIsStatic(e) {
            const t = this.getPlayerContainer(e);
            return !!t && "static" === getComputedStyle(t).position;
        }
    }
    class v extends class extends class {
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
            return new g(this.format);
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
            if (!h(r)) return t.NO_VIDEO;
            if (this.resourceAdapter.shouldWaitForLoading) {
                if (!await this.waitForVideoLoading(r)) return t.CANCELED;
            }
            return function(e) {
                return Boolean(e.src || e.querySelector("source"));
            }(r) ? this.processVideoDuration(r) : t.NO_VIDEO;
        }
        async waitForFiniteDuration(e) {
            this.hasFiniteDuration(e) || await o((() => this.hasFiniteDuration(e)), 5e3);
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
            if (!h(r)) return this.errorFormatter.getError(r);
            const i = r, s = Boolean(this.resourceAdapter.isAnAd(i));
            await this.waitForAds(r, s);
            const o = await this.resourceAdapter.getVideoId(i);
            return o ? s && this.shouldReturnAds ? {
                id: o,
                ad: s
            } : {
                id: o,
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
            const {canShowSubtitles: t} = this.resourceAdapter, [{sourceLanguage: r, canTranslate: i, translationError: s}, {subtitlesData: o, subtitlesError: a}, n, u, c, d, {absoluteTime: l, webCurrentTime: g}, {videoDownloadLink: h, subtitlesDownloadLink: w}] = await Promise.all([ this.resourceAdapter.getSourceLanguage(e.video), this.getSubtitlesData(e.video), this.resourceAdapter.videoIsSeekable(), this.resourceAdapter.videoIsStream(e.video), this.resourceAdapter.checkIsStreamWhitelisted(), this.resourceAdapter.getChannelId(), this.getSyncAbsoluteAndWebCurrentTimes(e.video), this.getDownloadlinks() ]);
            return {
                id: e.id,
                sourceLanguage: r,
                canTranslate: i,
                translationError: s,
                canShowSubtitles: t,
                subtitlesData: o,
                subtitlesError: a,
                seekable: n,
                stream: u,
                streamWhitelisted: c,
                channelId: d,
                absoluteTime: l,
                webCurrentTime: g,
                supportedSourceLangs: m.languages,
                videoDownloadLink: h,
                subtitlesDownloadLink: w
            };
        }
        async findTranslatableVideo(e) {
            return this.errorFormatter.getError(t.NOT_IMPLEMENTED);
        }
        async waitForRedirect() {
            if (!this.shouldWaitForRedirect) return;
            const e = new URL(u.getHref()), t = "vtrans" === e.searchParams.get("utm_sup_project"), r = c() === a.YOUTUBE && null !== e.searchParams.get("t");
            (t || r) && await s(1500);
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
            return new g(this.format);
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
                var r, i, s, o;
                this.videoLoadedFailPromiseResolver = t, null === (i = null === (r = e.yandexVideo) || void 0 === r ? void 0 : r.observeClearing) || void 0 === i || i.call(r, (() => {
                    t(!1);
                })), null === (o = null === (s = e.yandexVideoTranslation) || void 0 === s ? void 0 : s.observeClearing) || void 0 === o || o.call(s, (() => {
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
                const {sourceLanguage: i, canTranslate: s} = await this.resourceAdapter.getSourceLanguage(r.video);
                return i && s ? {
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
            return new f(e);
        }
    }
    const S = (A = v, (e, t) => new A(t).setFindPromise(e, t));
    var A;
    return e.TranslatableVideoDetectorTwitch = v, e.getVideoId = S, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e;
}({});return TranslatableVideoDetectorAPI.getVideoId(video,config);})
