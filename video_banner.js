!function() {
    "use strict";
    function e(e) {
        const t = `subtitles-${Date.now()}`;
        return new Promise((n => {
            const i = function(e, t = document.body) {
                const n = document.createElement("script");
                return n.text = e, t.appendChild(n), () => {
                    n.remove();
                };
            }(`\n      (function() {\n        const evaluatedScript = (${e})()\n\n        if (evaluatedScript instanceof Promise) {\n          evaluatedScript.then(response => {\n            window.postMessage({\n              messageId: '${t}',\n              response,\n            }, "*");\n          });\n        }\n      })();\n    `), r = e => {
                if (e.data.messageId === t) {
                    const {source: t, data: {response: a}} = e;
                    if (t !== window) return;
                    window.removeEventListener("message", r), i(), n(a);
                }
            };
            window.addEventListener("message", r);
        }));
    }
    var t = {
        youtube: {
            ru: [ "1nAvQa5zbIc", "QkZJ9X0UJQs", "TYP72BKy8UI", "PXrZ4X9834Q", "lTKoaY9H_Yw", "udF9dUmwZMU" ],
            en: [ "itcMLwMEeMQ", "Fz9pNRmPmUs" ],
            fr: [ "gh6nK1MFo0I", "_-y_sAlWSC4" ],
            de: [ "Xww_oaafCBA" ]
        }
    };
    const n = () => {
        const e = (() => {
            const e = new URL(window.location), t = e.searchParams.get("v");
            if (t) return t;
            if (e.pathname.includes("embed/")) {
                const t = e.pathname.split("/"), n = t[t.length - 1];
                if (n) return n;
            }
            return "";
        })();
        return t.youtube.ru.includes(e) ? "en" : "ru";
    }, i = new Map([ [ "ru", Object.freeze({
        descriptionDefault: "Нейросети Яндекса переведут и озвучат видео",
        descriptionAvailableOrActivated: "Нейросети Яндекса переведут и озвучат видео",
        titleProcessingOrInQueue: "Видео переводится",
        descriptionProcessingOrInQueue: "Наши нейросети трудятся над переводом. Ждите уведомления",
        titleError: "Попробуйте позже",
        descriptionError: "В данный момент слишком много запросов на перевод",
        titleOtherError: "Не удалось перевести видео",
        descriptionOtherError: "Возвращайтесь попозже – нейросеть скоро научится",
        buttonLabelEnable: "Включить",
        buttonLabelDisable: "Отключить",
        buttonLabelInProgress: "Переводим",
        titleProcessing: "Перевод займёт примерно $1. Когда будет готово, вам придёт уведомление",
        titleProcessingLong: "Перевод займёт больше часа. Включите уведомления, чтобы узнать, когда всё будет готово.",
        titleProcessingOneMinute: "$1 минуту",
        titleProcessingFewinute: "$1 минуты",
        titleProcessingManyMinute: "$1 минут"
    }) ], [ "ru-ru", Object.freeze({
        titleDefault: "Смотрите сразу на русском",
        titleAvailableOrActivated: "Смотрите сразу на русском"
    }) ], [ "ru-en", Object.freeze({
        titleDefault: "Смотрите сразу на английском",
        titleAvailableOrActivated: "Смотрите сразу на английском"
    }) ], [ "en", Object.freeze({
        descriptionDefault: "Translate and dub this video using Yandex's neural networks",
        descriptionAvailableOrActivated: "Translate and dub this video using Yandex's neural networks",
        titleProcessingOrInQueue: "Your video is being translated",
        descriptionProcessingOrInQueue: "Translation is in progress right now. You'll receive a message when it's done",
        titleError: "Please, try again later",
        descriptionError: "The neural networks are busy at the moment",
        titleOtherError: "Sorry, couldn't translate this video",
        descriptionOtherError: "Something went wrong. Please, try again later",
        buttonLabelEnable: "Enable",
        buttonLabelDisable: "Disable",
        buttonLabelInProgress: "Translating",
        titleProcessing: "The translation will take about $1. You'll receive a notification when it's ready.",
        titleProcessingLong: "The translation will take more than an hour. Turn on your notifications to find out when everything is ready.",
        titleProcessingOneMinute: "$1 minute",
        titleProcessingFewinute: "$1 minutes",
        titleProcessingManyMinute: "$1 minutes"
    }) ], [ "en-ru", Object.freeze({
        titleDefault: "Watch this in Russian right now",
        titleAvailableOrActivated: "Watch this in Russian right now"
    }) ], [ "en-en", Object.freeze({
        titleDefault: "Watch this in English right now",
        titleAvailableOrActivated: "Watch this in English right now"
    }) ], [ "kk", Object.freeze({
        descriptionDefault: "Яндекс нейрожелілері видеоны аударып, дыбыстайды",
        descriptionAvailableOrActivated: "Яндекс нейрожелілері видеоны аударып, дыбыстайды",
        titleProcessingOrInQueue: "Видео аударылуда",
        descriptionProcessingOrInQueue: "Нейрожелілеріміз аудармамен жұмыстануда. Хабарламаны күтіңіз",
        titleError: "Кейінірек байқап көріңіз",
        descriptionError: "Қазіргі уақытта аудармаға сұраным тым көп",
        titleOtherError: "Видеоны аудару мүмкін болмады",
        descriptionOtherError: "Кейінірек оралыңыз - нейрожелі жақын уақытта үйренеді",
        buttonLabelEnable: "Қосу",
        buttonLabelDisable: "Өшіру",
        buttonLabelInProgress: "Аудару",
        titleProcessing: "Аударма шамамен $1 уақытты алады. Дайын болған кезде, сізге хабарландыру келеді.",
        titleProcessingLong: "Аудармаға бір сағаттан артық уақыт кетеді. Бәрі дайын болғанын білу үшін хабарландыруларды қосыңыз.",
        titleProcessingOneMinute: "$1 минут",
        titleProcessingFewinute: "$1 минут",
        titleProcessingManyMinute: "$1 минут"
    }) ], [ "kk-ru", Object.freeze({
        titleDefault: "Бірден орыс тілінде қараңыз",
        titleAvailableOrActivated: "Бірден орыс тілінде қараңыз"
    }) ], [ "kk-en", Object.freeze({
        titleDefault: "Бірден орыс тілінде қараңыз",
        titleAvailableOrActivated: "Бірден орыс тілінде қараңыз"
    }) ], [ "uk", Object.freeze({
        descriptionDefault: "Нейромережі Яндекса перекладуть та озвучать відео",
        descriptionAvailableOrActivated: "Нейромережі Яндекса перекладуть та озвучать відео",
        titleProcessingOrInQueue: "Відео перекладається",
        descriptionProcessingOrInQueue: "Наші нейромережі працюють над перекладом. Чекайте на сповіщення",
        titleError: "Спробуйте пізніше",
        descriptionError: "У цей момент забагато запитів на переклад",
        titleOtherError: "Не вдалося перекласти відео",
        descriptionOtherError: "Повертайтеся пізніше — нейромережа скоро навчиться",
        buttonLabelEnable: "Увімкнути",
        buttonLabelDisable: "Вимкнути",
        buttonLabelInProgress: "Перекладаємо",
        titleProcessing: "Переклад займе приблизно $1. Коли буде готово, вам прийде сповіщення",
        titleProcessingLong: "Переклад займе більше години. Увімкніть сповіщення, щоб дізнатися, коли все буде готово.",
        titleProcessingOneMinute: "$1 хвилину",
        titleProcessingFewinute: "$1 хвилини",
        titleProcessingManyMinute: "$1 хвилин"
    }) ], [ "uk-ru", Object.freeze({
        titleDefault: "Дивіться відразу російською",
        titleAvailableOrActivated: "Дивіться відразу російською"
    }) ], [ "uk-en", Object.freeze({
        titleDefault: "Дивіться відразу російською",
        titleAvailableOrActivated: "Дивіться відразу російською"
    }) ], [ "be", Object.freeze({
        descriptionDefault: "Нейрасеткі Яндекса перакладуць і агучаць відэа",
        descriptionAvailableOrActivated: "Нейрасеткі Яндекса перакладуць і агучаць відэа",
        titleProcessingOrInQueue: "Відэа перакладаецца",
        descriptionProcessingOrInQueue: "Нашы нейрасеткі працуюць над перакладам Чакайце апавяшчэння",
        titleError: "Паспрабуйце пазней",
        descriptionError: "У дадзены момант занадта шмат запытаў на пераклад",
        titleOtherError: "Не атрымалася перакласці відэа",
        descriptionOtherError: "Вяртайцеся пазней – нейрасетка навучыцца неўзабаве",
        buttonLabelEnable: "Уключыць",
        buttonLabelDisable: "Адключыць",
        buttonLabelInProgress: "Перакладаем",
        titleProcessing: "Пераклад зойме прыкладна $1. Калі будзе гатова, вам прыйдзе апавяшчэнне",
        titleProcessingLong: "Пераклад зойме больш за гадзіну. Уключыце апавяшчэнни, каб даведацца, калі ўсё будзе гатова.",
        titleProcessingOneMinute: "$1 хвіліну",
        titleProcessingFewinute: "$1 хвіліны",
        titleProcessingManyMinute: "$1 хвілін"
    }) ], [ "be-ru", Object.freeze({
        titleDefault: "Глядзіце адразу на рускай",
        titleAvailableOrActivated: "Глядзіце адразу на рускай"
    }) ], [ "be-en", Object.freeze({
        titleDefault: "Глядзіце адразу на рускай",
        titleAvailableOrActivated: "Глядзіце адразу на рускай"
    }) ] ]), r = () => {
        const e = window.yandex.i18n ? window.yandex.i18n : window.chrome.i18n, t = (null == e ? void 0 : e.getUILanguage) ? e.getUILanguage() : navigator.language;
        if (!t) return "en";
        const n = t.toLowerCase().split(";")[0].trim().split("-")[0];
        return i.has(n) ? n : "en";
    }, a = (e, t, n, i) => (e => {
        switch (e) {
          case "kk":
            return (e, t) => t;

          case "ru":
          case "be":
          case "uk":
            return (e, t, n, i) => e % 10 == 1 && e % 100 != 11 ? t : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? n : i;

          case "en":
            return (e, t, n) => 1 === Math.abs(e) ? t : n;

          default:
            return (e, t) => t;
        }
    })(r())(e, t, n, i), o = Object.freeze({
        AVAILABLE: "available",
        PROCESSING: "processing",
        ACTIVATED: "activated",
        ERROR: "error",
        NO_TRANSLATION: "no_translation",
        IN_QUEUE: "in_queue",
        OTHER_ERROR: "other_error"
    }), l = () => {
        const e = document.createElement("y-banner"), t = (() => {
            const e = r(), t = `${e}-${n()}`, a = i.get(e), o = i.get(t);
            return Object.assign(Object.assign({}, a), o);
        })();
        e.style = '\n    position: absolute;\n    top: -48px;\n    left: -4px;\n    width: calc(100% + 8px);\n    height: 48px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    background: #FDDE55;\n    overflow: hidden;\n    border-radius: 6px 6px 0 0;\n    font: normal 14px/18px "YS Text", "Segoe UI", BlinkMacSystemFont, Arial, sans-serif;\n    user-select: none;', 
        e.innerHTML = `\n    <div style="flex: 0 0 auto; height: 48px;">\n      <svg width="103" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path d="M-3.311 11.68l6.817 17.86M2.213 15.6l2.807 7.354M20.803 7.682l2.807 7.354M2.39 5.516l9.49 24.864M8.582 11.188l4.144 10.856m-1.96-15.689l6.817 17.861M12.606-3.248L24.769 28.62" stroke="#00E6C5" stroke-width="1.556"/>\n        <path d="M55.266 48.107c9.079-3.618 16.544-6.933 16.809-7.817.672-2.235-11.113-34.109-13.096-35.372C56.996 3.655 9.53 20.726 8.859 22.961c-.423 1.408 4.034 15.006 7.997 25.146h38.41z" fill="#000"/>\n        <path d="M70.67 33.688c-2.305.85-9.95 1.197-12.553 2.17-2.46.919-8.004 6.046-11.769 7.44l-.072.027c-3.645 1.35-7.73.65-10.738-1.791-1.348-1.093-2.686-1.999-3.547-1.957-2.354.117-2.889 1.925-4.59 2.093-2.353.233-7.677-6.392-10.003-5.348-2.334 1.047-2.09 4.032-1.03 10.319 0 0 2.596 6.27 2.673 6.469 2.09 5.154 2.938 5.623 3.77 6 2.418 1.098 49.03-16.296 49.7-18.524.232-.774 0-1.563-1.842-6.898z" fill="#000"/>\n        <path d="M74.972 34.457c-.674 2.256-48.204 19.516-50.641 18.405-2.437-1.111-13.73-32.786-13.056-35.042.674-2.256 48.53-19.945 50.523-18.67 1.993 1.275 13.85 33.052 13.174 35.307z" fill="#FC0"/>\n        <path d="M73.085 27.441c-2.305.868-9.95 1.22-12.553 2.211-2.46.937-8.004 6.16-11.769 7.582l-.072.027c-3.645 1.375-7.73.662-10.738-1.825-1.348-1.114-2.686-2.036-3.547-1.994-2.354.119-2.889 1.961-4.59 2.133-2.353.236-7.677-6.514-10.003-5.45-2.333 1.068-2.09 4.11-1.03 10.514 0 0 2.596 6.388 2.673 6.59 2.09 5.252 2.938 5.73 3.77 6.115 2.419 1.118 49.03-16.604 49.7-18.874.232-.789 0-1.593-1.841-7.029z" fill="#fff"/>\n        <path d="M35.91 18.428c-.47 1.096 4.322 15.015 5.5 15.257 1.178.241 10.046-10.729 9.923-12.376-.174-2.31-14.684-4.6-15.422-2.88z" fill="#000"/>\n        <path d="M55.198 13.983c2.4 0 4.347-1.936 4.347-4.325 0-2.39-1.947-4.326-4.347-4.326-2.401 0-4.347 1.937-4.347 4.326 0 2.389 1.946 4.325 4.347 4.325z" fill="#fff"/>\n        <g clip-path="url(#a)">\n          <path d="M82.335 30.71c5.984-2.034 9.177-8.51 7.133-14.464-2.045-5.954-8.552-9.132-14.536-7.097-5.984 2.034-9.177 8.51-7.133 14.464 2.045 5.954 8.553 9.132 14.536 7.098z" fill="#000"/>\n          <path d="M79.727 23.114c-.068.138.032-.24 0 0-.695-.68-1.425-1.464-2.055-2.626.788-.727 1.681-1.145 2.507-1.426l.619-.21c.008 1.029-.224 2.369-.8 3.711l-.272.552zm-3.013 2.974c-.344.002-.69.005-.898-.268-.73-.784-.434-2.605.694-4.02.732 1.127 1.636 2.081 2.33 2.762-.648.794-1.471 1.418-2.126 1.526zm8.078-8.02c-.763-.544-1.455-.882-2.525-.977-.143-.754-.252-1.405-.393-1.816l-1.547.526c.105.308.143.754.216 1.303-1.308.215-2.682.912-3.848 1.881a83.995 83.995 0 0 0-1.155-2.359c4.64-1.922 7.142-4.033 7.245-4.068l-1.113-1.227s-2.295 2.041-6.66 3.755c-.389-1.13-.497-1.78-.532-1.883l-1.548.526c.106.308.214.96.531 1.883l-.103.035c-1.444.491-2.821.845-3.13.95l.563 1.643c.516-.175 1.583-.424 2.925-.88l.413-.14c.42.889.876 1.88 1.47 2.94-1.64 1.934-2.549 4.994-.915 6.732.592.716 1.49.984 2.49.874l.515-.176c.929-.315 1.82-1.077 2.64-2.044.936.714 1.629 1.052 1.767 1.12l.747-1.516s-.657-.235-1.49-.984c.24-.31.34-.689.475-.964.61-1.583.873-3.164.898-4.433.38.1.899.268 1.281.71 1.148 1.33.854 3.494.31 4.596l1.42.779c.987-1.826 1.105-4.503-.461-6.379" fill="#fff"/>\n          <path d="M74.727 46.14c5.984-2.034 9.177-8.51 7.133-14.464-2.045-5.954-8.553-9.132-14.536-7.098-5.984 2.035-9.177 8.51-7.133 14.465 2.045 5.954 8.553 9.132 14.536 7.097z" fill="red"/>\n          <path d="M73.233 35.412l-3.921 1.333.233-5.698 3.688 4.365zm-3.78-7.315l-1.754.596-.855 14.624 2.167-.737.178-3.844 5.365-1.824 2.505 2.932 2.167-.737-9.67-11.045-.102.035z" fill="#fff"/>\n        </g>\n        <defs>\n          <clipPath id="a">\n            <path fill="#fff" transform="rotate(-18.777 66.014 -135.109) skewX(.172)" d="M0 0h43.593v43.424H0z"/>\n          </clipPath>\n        </defs>\n      </svg>\n    </div>\n    <div id="y-banner-title"\n         style="flex: 0 0 auto; font-weight: bold; margin-right: 12px;">\n      ${t.titleDefault}\n    </div>\n    <div id="y-banner-desc"\n          style="flex: 1 1 auto; opacity: 0.6; overflow: hidden;\n                white-space: nowrap; text-overflow: ellipsis;\n                margin-right: 12px;">\n      ${t.descriptionDefault}\n    </div>\n    <div id="y-banner-button"\n          style="flex: 0 0 auto; font-size: 13px; line-height: 16px;\n                border-radius: 5px; padding: 5px 8px;\n                background: #FFF; cursor: pointer;">\n      ${t.buttonLabelDisable}\n    </div>\n    <div id="y-banner-close"\n          style="flex: 0 0 auto; padding: 0 18px; cursor: pointer;\n                width: 14px; height: 14px;">\n      <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">\n        <path opacity=".4" d="M2 2l5 5m5 5L7 7m0 0l5-5M7 7l-5 5" stroke="#000" stroke-width="1.5"/>\n      </svg>\n    </div>\n  `;
        let l = -1;
        return e.setState = n => {
            const i = e.querySelector("#y-banner-title"), r = e.querySelector("#y-banner-desc"), s = e.querySelector("#y-banner-button");
            switch (i.style.fontWeight = "bold", s.style.background = "#FFF", s.style.opacity = 1, 
            s.style.display = "", n) {
              case o.ACTIVATED:
                i.textContent = t.titleAvailableOrActivated, r.textContent = t.descriptionAvailableOrActivated, 
                s.textContent = t.buttonLabelDisable, s.style.background = "rgba(46,47,52,0.1)";
                break;

              case o.PROCESSING:
              case o.IN_QUEUE:
                i.textContent = t.titleProcessingOrInQueue, r.textContent = (() => {
                    if (l <= 0) return t.descriptionProcessingOrInQueue;
                    const e = Math.max(1, Math.round(l / 60));
                    if (e > 60) return t.titleProcessingLong;
                    const n = a(e, t.titleProcessingOneMinute, t.titleProcessingFewinute, t.titleProcessingManyMinute).replace("$1", e);
                    return t.titleProcessing.replace("$1", n);
                })(), s.textContent = t.buttonLabelInProgress, s.style.opacity = .2;
                break;

              case o.ERROR:
                i.textContent = t.titleError, r.textContent = t.descriptionError, s.textContent = t.buttonLabelEnable;
                break;

              case o.OTHER_ERROR:
                i.textContent = t.titleOtherError, i.style.fontWeight = "normal", r.textContent = t.descriptionOtherError, 
                s.style.display = "none";
                break;

              case o.AVAILABLE:
              default:
                i.textContent = t.titleAvailableOrActivated, r.textContent = t.descriptionAvailableOrActivated, 
                s.textContent = t.buttonLabelEnable;
            }
        }, e.setProgress = e => {
            l = e;
        }, e;
    }, s = {
        banner: null,
        border: null,
        mainColumn_: null,
        playerContainer_: null,
        get mainColumn() {
            return this.mainColumn_ || (this.mainColumn_ = document.querySelector("#primary-inner")), 
            this.mainColumn_;
        },
        get playerContainer() {
            return this.playerContainer_ || (this.playerContainer_ = document.querySelector("#player-container-inner")), 
            this.playerContainer_;
        },
        get video() {
            return document.querySelector("#player-container-inner video");
        },
        reset() {
            this.banner = null, this.border = null, this.mainColumn_ = null, this.playerContainer_ = null;
        }
    }, d = {
        lastState: "",
        lastProgress: -1,
        metadataHandlers_: new WeakMap,
        isAvailable() {
            var e;
            return Boolean(null === (e = s.video) || void 0 === e ? void 0 : e.yandexVideoTranslation);
        },
        toggleTranslationEnabled() {
            var e, t, n, i, r, a;
            d.lastState !== o.ACTIVATED && d.lastState !== o.AVAILABLE && d.lastState !== o.ERROR || ((null === (t = null === (e = s.video) || void 0 === e ? void 0 : e.yandexVideoTranslation) || void 0 === t ? void 0 : t.active) ? null === (i = null === (n = s.video) || void 0 === n ? void 0 : n.yandexVideoTranslation) || void 0 === i || i.disable() : null === (a = null === (r = s.video) || void 0 === r ? void 0 : r.yandexVideoTranslation) || void 0 === a || a.enable());
        },
        observeStatus(e) {
            var t, n;
            null === (n = null === (t = s.video) || void 0 === t ? void 0 : t.yandexVideoTranslation) || void 0 === n || n.observeStatus((t => {
                const n = "string" == typeof t ? t : null == t ? void 0 : t.state;
                d.lastState = n, e(n);
            }));
        },
        observeProgress(e) {
            var t, n;
            null === (n = null === (t = s.video) || void 0 === t ? void 0 : t.yandexVideoTranslation) || void 0 === n || n.observeProgress((t => {
                d.lastProgress = "number" == typeof t ? t : -1, e(t);
            }));
        },
        observeButtonVisibility(e) {
            var t, n;
            null === (n = null === (t = s.video) || void 0 === t ? void 0 : t.yandexVideoTranslation) || void 0 === n || n.observeButtonVisibility(e);
        },
        setMetadataHandler(e) {
            s.video && (d.removeMetadataHandler_(), s.video.addEventListener("loadeddata", e), 
            d.metadataHandlers_.set(s.video, e));
        },
        removeMetadataHandler_() {
            s.video && d.metadataHandlers_.has(s.video) && s.video.removeEventListener("loadeddata", d.metadataHandlers_.get(s.video));
        },
        reset() {
            var e, t, n;
            null === (e = s.video.yandexVideoTranslation) || void 0 === e || e.observeStatus((() => {})), 
            null === (t = s.video.yandexVideoTranslation) || void 0 === t || t.observeProgress((() => {})), 
            null === (n = s.video.yandexVideoTranslation) || void 0 === n || n.observeButtonVisibility((() => {})), 
            d.removeMetadataHandler_(), d.lastState = o.NO_TRANSLATION, d.lastProgress = -1;
        }
    }, c = {
        drawPromise: null,
        pagechanged: !1
    }, u = e => {
        var t;
        switch (e) {
          case o.ACTIVATED:
          case o.AVAILABLE:
          case o.PROCESSING:
          case o.IN_QUEUE:
          case o.ERROR:
          case o.OTHER_ERROR:
            null === (t = s.banner) || void 0 === t || t.setState(e);
            break;

          case o.NO_TRANSLATION:
          default:
            h();
        }
    }, b = e => {
        var t, n;
        null === (t = s.banner) || void 0 === t || t.setProgress(e), null === (n = s.banner) || void 0 === n || n.setState(d.lastState);
    }, v = e => {
        m() || e && !s.banner && p();
    }, g = async () => {
        var t;
        const n = Date.now();
        for (;!s.mainColumn || !s.playerContainer || !s.video; ) if (await new Promise((e => window.setTimeout(e, 200))), 
        c.pagechanged || Date.now() - n > 3e4) return;
        const i = await (async () => e((async function() {
            var e, t;
            const n = document.querySelector("#movie_player");
            return null === (t = null === (e = n.getPlayerResponse) || void 0 === e ? void 0 : e.call(n).videoDetails) || void 0 === t ? void 0 : t.isLive;
        })))();
        if (!d.isAvailable() || i) return;
        for (;(null === (t = s.video) || void 0 === t ? void 0 : t.readyState) < 2; ) if (await new Promise((e => window.setTimeout(e, 250))), 
        c.pagechanged || Date.now() - n > 3e4) return;
        if (c.pagechanged) return;
        const r = () => {
            d.observeButtonVisibility(v), d.observeStatus(u), d.observeProgress(b);
        };
        r(), d.setMetadataHandler(r);
    }, p = () => {
        document.querySelectorAll("y-banner, y-border").length || (s.banner = l(), s.border = (() => {
            const e = document.createElement("y-border");
            return e.style = "\n    display: block;\n    position: absolute;\n    top: 0;\n    left: -4px;\n    width: calc(100% - 2px);\n    height: calc(100% - 1px);\n    border: 5px solid #FDDE55;\n    border-radius: 0 0 6px 6px;\n    border-top: none;\n    pointer-events: none;", 
            e;
        })(), s.banner.querySelector("#y-banner-close").addEventListener("click", (() => y())), 
        s.banner.querySelector("#y-banner-button").addEventListener("click", (() => d.toggleTranslationEnabled())), 
        s.banner.setState(d.lastState), s.mainColumn.attributeStyleMap.set("padding-top", CSS.px(48)), 
        s.mainColumn.attributeStyleMap.set("position", "relative"), s.playerContainer.insertBefore(s.banner, s.playerContainer.firstChild), 
        s.playerContainer.insertBefore(s.border, s.playerContainer.firstChild));
    }, h = () => {
        var e, t, n, i;
        (s.banner || s.border) && (null === (e = s.banner) || void 0 === e || e.remove(), 
        null === (t = s.border) || void 0 === t || t.remove(), null === (n = s.mainColumn) || void 0 === n || n.attributeStyleMap.delete("padding-top"), 
        null === (i = s.mainColumn) || void 0 === i || i.attributeStyleMap.delete("position"), 
        d.reset(), s.reset());
    }, f = async () => {
        m() || c.pagechanged || (c.pagechanged = !0, await c.drawPromise, h(), c.pagechanged = !1, 
        "/watch" === window.location.pathname && (c.drawPromise = g()));
    }, y = () => {
        h(), localStorage.setItem("y-promo-banner-closed", "1"), document.removeEventListener("yt-page-data-fetched", f);
    }, m = () => Boolean(localStorage.getItem("y-promo-banner-closed"));
    !async function() {
        f(), document.addEventListener("yt-page-data-fetched", f);
    }();
}();
