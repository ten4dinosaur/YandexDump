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
    const o = e => new Promise((t => window.setTimeout(t, e))), s = async (e, t, r = !1) => {
        let i = !1;
        return Promise.race([ new Promise((async t => {
            for (;!e() && !i; ) await o(100);
            t();
        })), new Promise(((e, o) => {
            window.setTimeout((() => {
                i = !0, r ? o(new Error(`Wait for condition reached timeout of ${t}`)) : e();
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
    }, d = {
        getLocation: () => window.location,
        getHostname: () => window.location.hostname,
        getHref: () => window.location.href,
        getPathname: () => window.location.pathname,
        getOrigin: () => window.location.origin
    }, u = () => {
        const e = d.getHostname();
        for (const t in n) if (Object.prototype.hasOwnProperty.call(n, t)) {
            if (new RegExp(t).test(e)) return n[t];
        }
        return a.UNKNOWN;
    };
    var l;
    !function(e) {
        e.SNAKE = "snake", e.CAMEL = "camel";
    }(l || (l = {}));
    const c = e => e.replace(/[A-Z]/g, (e => `_${e.toLowerCase()}`));
    class g {
        constructor(e) {
            this.format = e;
        }
        getError(e) {
            return ((e, t) => {
                for (const r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
                    let i;
                    switch (t) {
                      case l.CAMEL:
                        i = r.replace(/_[a-z]/g, (e => `${e[1].toUpperCase()}`));
                        break;

                      case l.SNAKE:
                        i = c(r);
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
    const w = e => e.toLowerCase().split(";")[0].trim().split(/-|_/)[0];
    var v = [ "ru" ];
    const L = /(https?:\/\/[^\s]+)/gi, f = /[а-я]+/i;
    class E extends class {
        constructor(e) {
            this.canShowSubtitles = !1, this.canTranslateStream = !1, this.enableOverVideoPositioning = !1, 
            this.shouldCheckCLD = !1, this.shouldWaitForLoading = !1, this.predefinedLanguages = {}, 
            this.targetLanguages = m.languages, this.blockedLanguages = v, this.errors = [], 
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
            return e.replace(L, "");
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
            const s = null !== (i = null === (r = window.yandex) || void 0 === r ? void 0 : r.i18n) && void 0 !== i ? i : null === (o = window.chrome) || void 0 === o ? void 0 : o.i18n;
            if (!(null == s ? void 0 : s.detectLanguage)) return;
            const a = await new Promise((t => s.detectLanguage(e, (e => t(e)))));
            if (t && !a.isReliable) return;
            if (!a.languages.length) return;
            const n = a.languages[0];
            return n.percentage >= 80 ? n.language : void 0;
        }
        async getCLDLanguageResult(e) {
            const t = await this.getTitle(e), r = await this.getDescription(e), i = await this.getLanguageGuess(t, !1), o = r && r.length > 4;
            let s;
            if (o) {
                const e = this.removeLinks(r);
                s = await this.getLanguageGuess(e, !1);
            }
            for (const e of this.targetLanguages) {
                const t = o && e === s;
                if (e === i || t) return {
                    sourceLanguage: e,
                    translationError: this.getCLDError(i, s, e)
                };
            }
            return {
                sourceLanguage: i,
                translationError: this.getCLDError(i, s, i)
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
            super(...arguments), this.enableOverVideoPositioning = this.isEmbedded() || !this.isMobile(), 
            this.shouldCheckCLD = !0, this.getConfigUrl = e => `https://player.vimeo.com/video/${e}/config`, 
            this.getOembedDataUrl = e => `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${e}`;
        }
        isEmbedded() {
            return /^player\.vimeo\.com$/.test(d.getHostname());
        }
        isMobile() {
            var e;
            return null === (e = window.vimeo) || void 0 === e ? void 0 : e.is_mobile;
        }
        getVideoIdNumber(e) {
            return this.isEmbedded() ? this.getIdFromEmbed() : this.getIdFromPlayer(e);
        }
        getVideoId(e) {
            const t = this.getVideoIdNumber(e);
            return !!t && `https://vimeo.com/${t}`;
        }
        getIdFromPlayer(e) {
            const t = this.getPlayerContainer(e), r = (null == t ? void 0 : t.hasAttribute("data-clip-id")) ? t.getAttribute("data-clip-id") : null == t ? void 0 : t.id;
            return null != r ? r : "";
        }
        getIdFromEmbed() {
            const e = new URL(d.getHref()).pathname.split("/"), t = e[e.length - 1];
            return null != t ? t : "";
        }
        getPlayerContainer(e) {
            return e.closest(".player");
        }
        getAdContainer() {
            return null;
        }
        async getTitle(e) {
            var t, r, i;
            const o = this.getVideoIdNumber(e);
            if (!o) return "";
            const a = await this.getVideoData(o);
            if (null == a ? void 0 : a.title) return a.title;
            const n = '\n      #main h1,\n      h1.js-title.title a.title_text,\n      [class^="VideoName__ViewTitle"]\n    ';
            return await s((() => Boolean(document.querySelector(n))), 5e3), null !== (i = null === (r = null === (t = document.querySelector(n)) || void 0 === t ? void 0 : t.textContent) || void 0 === r ? void 0 : r.trim()) && void 0 !== i ? i : "";
        }
        async getDescription(e) {
            var t;
            const r = this.getVideoIdNumber(e);
            try {
                return null !== (t = (await (await fetch(this.getOembedDataUrl(r))).json()).description) && void 0 !== t ? t : "";
            } catch (e) {
                return "";
            }
        }
        hasReferenceLanguage(e, t) {
            if (!e) return !1;
            const r = w(e);
            return t.some((e => r === e));
        }
        getReferenceCaptionsLanguage(e, t) {
            var r;
            if (null == e ? void 0 : e.length) for (const i of e) {
                let e = null !== (r = i.lang) && void 0 !== r ? r : i.language;
                if (e && (e = w(e), ("subtitles" === i.kind || "captions" === i.kind) && t.includes(e))) return e;
            }
        }
        async getLanguageFromLocalFeatures(e) {
            const t = this.getVideoIdNumber(e);
            if (!t) return;
            const r = await this.getVideoData(t), i = null == r ? void 0 : r.lang;
            if (i) return i;
            const o = this.getReferenceCaptionsLanguage(null == r ? void 0 : r.captions, this.targetLanguages);
            return o || void 0;
        }
        async videoDataHasCyrillicCharacters(e) {
            const t = await this.getTitle(e), r = await this.getDescription(e);
            return this.hasCyrillicSymbols(t) || this.hasCyrillicSymbols(r);
        }
        async requestVideoData(e) {
            try {
                const t = this.getConfigUrl(e), r = await (await fetch(t)).json();
                return {
                    id: r.video.id,
                    lang: r.video.lang,
                    title: r.video.title,
                    captions: r.request.text_tracks
                };
            } catch (e) {
                return;
            }
        }
        getVideoDataFromInlineScript(e) {
            var t, r, i;
            const o = document.body.querySelector("script");
            if (o) try {
                let s = o.innerText;
                s = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}") - 1), s = s.substring(s.indexOf("{")), 
                s = s.substr(0, s.indexOf("; if (!config.request)"));
                const a = JSON.parse(s);
                if (!a) return;
                return {
                    id: parseInt(e, 10),
                    lang: null === (t = a.video) || void 0 === t ? void 0 : t.lang,
                    title: null === (r = a.video) || void 0 === r ? void 0 : r.title,
                    captions: null === (i = a.request) || void 0 === i ? void 0 : i.text_tracks
                };
            } catch (e) {
                return;
            }
        }
        async getVideoDataFromWindowApiMobile(e) {
            Object.keys(window.vimeo.mobile.player_objects).length || await s((() => Object.keys(window.vimeo.mobile.player_objects).length > 0), 2e4);
            const t = window.vimeo.mobile.player_objects;
            return Object.keys(t).map((e => {
                const r = t[e];
                return {
                    id: r.videoId,
                    lang: r.config.video.lang,
                    title: r.videoTitle,
                    captions: r.textTracks
                };
            })).find((t => String(t.id) === e));
        }
        async getVideoDataFromWindowApiDesktop(e) {
            Object.keys(window.vimeo.clips).length || await s((() => Object.keys(window.vimeo.clips).length > 0), 2e4);
            const t = window.vimeo.clips;
            return Object.keys(t).map((e => {
                const r = t[e];
                return {
                    id: r.video.id,
                    lang: r.video.lang,
                    title: r.video.title,
                    captions: r.request.text_tracks
                };
            })).find((t => String(t.id) === e));
        }
        async getVideoDataFromWindowApi(e) {
            return this.isMobile() ? this.getVideoDataFromWindowApiMobile(e) : this.getVideoDataFromWindowApiDesktop(e);
        }
        async getVideoData(e) {
            const t = await this.requestVideoData(e);
            return t || (this.isEmbedded() ? this.getVideoDataFromInlineScript(e) : this.getVideoDataFromWindowApi(e));
        }
    }
    class p extends class extends class {
        constructor(e) {
            this.format = l.CAMEL, this.shouldWaitForRedirect = !1, this.shouldWaitForAds = !1, 
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
            this.hasFiniteDuration(e) || await s((() => this.hasFiniteDuration(e)), 5e3);
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
            const i = r, o = Boolean(this.resourceAdapter.isAnAd(i));
            await this.waitForAds(r, o);
            const s = await this.resourceAdapter.getVideoId(i);
            return s ? o && this.shouldReturnAds ? {
                id: s,
                ad: o
            } : {
                id: s,
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
            const {canShowSubtitles: t} = this.resourceAdapter, [{sourceLanguage: r, canTranslate: i, translationError: o}, {subtitlesData: s, subtitlesError: a}, n, d, u, l, {absoluteTime: c, webCurrentTime: g}, {videoDownloadLink: h, subtitlesDownloadLink: w}] = await Promise.all([ this.resourceAdapter.getSourceLanguage(e.video), this.getSubtitlesData(e.video), this.resourceAdapter.videoIsSeekable(), this.resourceAdapter.videoIsStream(e.video), this.resourceAdapter.checkIsStreamWhitelisted(), this.resourceAdapter.getChannelId(), this.getSyncAbsoluteAndWebCurrentTimes(e.video), this.getDownloadlinks() ]);
            return {
                id: e.id,
                sourceLanguage: r,
                canTranslate: i,
                translationError: o,
                canShowSubtitles: t,
                subtitlesData: s,
                subtitlesError: a,
                seekable: n,
                stream: d,
                streamWhitelisted: u,
                channelId: l,
                absoluteTime: c,
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
            const e = new URL(d.getHref()), t = "vtrans" === e.searchParams.get("utm_sup_project"), r = u() === a.YOUTUBE && null !== e.searchParams.get("t");
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
            super(...arguments), this.format = l.CAMEL, this.shouldWaitForRedirect = !0, this.shouldWaitForAds = !1, 
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
                var r, i, o, s;
                this.videoLoadedFailPromiseResolver = t, null === (i = null === (r = e.yandexVideo) || void 0 === r ? void 0 : r.observeClearing) || void 0 === i || i.call(r, (() => {
                    t(!1);
                })), null === (s = null === (o = e.yandexVideoTranslation) || void 0 === o ? void 0 : o.observeClearing) || void 0 === s || s.call(o, (() => {
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
            return new E(e);
        }
    }
    const b = (S = p, (e, t) => new S(t).setFindPromise(e, t));
    var S;
    return e.TranslatableVideoDetectorVimeo = p, e.getVideoId = b, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e;
}({});return TranslatableVideoDetectorAPI.getVideoId(video,config);})
