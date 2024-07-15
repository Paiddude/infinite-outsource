(function($) {
    'use strict';
    var JetSearch = {
        addedScripts: [],
        addedStyles: [],
        addedPostCSS: [],
        assetsPromises: [],
        initElementor: function() {
            var widgets = {
                'jet-ajax-search.default': JetSearch.widgetAjaxSearch,
                'jet-search-suggestions.default': JetSearch.widgetSearchSuggestions
            };
            $.each(widgets, function(widget, callback) {
                window.elementorFrontend.hooks.addAction('frontend/element_ready/' + widget, callback)
            });
            window.elementorFrontend.elements.$window.on('elementor/nested-tabs/activate', (event, content) => {
                const $content = $(content);
                JetSearch.reinitSlickSlider($content);
                JetSearch.initElementsHandlers($content)
            })
        },
        initBricks: function($scope) {
            if (window.bricksIsFrontend) {
                return
            }
            $scope = $scope || $('body');
            JetSearch.initBlocks($scope)
        },
        initBlocks: function($scope) {
            $scope = $scope || $('body');
            window.JetPlugins.init($scope, [{
                block: 'jet-search/ajax-search',
                callback: JetSearch.widgetAjaxSearch
            }, {
                block: 'jet-search/search-suggestions',
                callback: JetSearch.widgetSearchSuggestions
            }])
        },
        widgetAjaxSearch: function($scope) {
            var settings = {
                searchClass: '.jet-ajax-search',
                searchFormClass: '.jet-ajax-search__form',
                fieldsHolderClass: '.jet-ajax-search__fields-holder',
                inputClass: '.jet-ajax-search__field',
                settingsInput: 'input[name="jet_ajax_search_settings"]',
                submitClass: '.jet-ajax-search__submit',
                chosenClass: '.jet-ajax-search__categories select[name="jet_ajax_search_categories"]',
                resultsAreaClass: '.jet-ajax-search__results-area',
                resultsHeaderClass: '.jet-ajax-search__results-header',
                resultsFooterClass: '.jet-ajax-search__results-footer',
                listHolderClass: '.jet-ajax-search__results-holder',
                listClass: '.jet-ajax-search__results-list',
                listInnerClass: '.jet-ajax-search__results-list-inner',
                listSlideClass: '.jet-ajax-search__results-slide',
                itemClass: '.jet-ajax-search__results-item',
                inlineSuggestionsAreaClass: '.jet-ajax-search__suggestions-inline-area',
                inlineSuggestionsItemClass: '.jet-ajax-search__suggestions-inline-area-item',
                resultsSuggestionsAreaClass: '.jet-ajax-search__results-suggestions-area',
                resultsSuggestionItemClass: '.jet-ajax-search__results-suggestions-area-item',
                countClass: '.jet-ajax-search__results-count',
                messageHolderClass: '.jet-ajax-search__message',
                fullResultsClass: '.jet-ajax-search__full-results',
                navigationClass: '.jet-ajax-search__navigation-holder',
                navButtonClass: '.jet-ajax-search__navigate-button',
                bulletClass: '.jet-ajax-search__bullet-button',
                numberClass: '.jet-ajax-search__number-button',
                prevClass: '.jet-ajax-search__prev-button',
                nextClass: '.jet-ajax-search__next-button',
                activeNavClass: '.jet-ajax-search__active-button',
                disableNavClass: '.jet-ajax-search__navigate-button-disable',
                spinnerClass: '.jet-ajax-search__spinner-holder',
                handlerId: 'jetSearchSettings',
                isRtl: (window.elementorFrontend && window.elementorFrontend.config.is_rtl) ? window.elementorFrontend.config.is_rtl : $('body').hasClass('rtl')
            };
            if ($scope.hasClass('jet-ajax-search-block')) {
                var resultAreaWidthBy = $scope.find(settings.searchClass).data('settings')['results_area_width_by'],
                    resultAreaCustomWidth = $scope.find(settings.searchClass).data('settings')['results_area_custom_width'],
                    resultAreaCustomWidthPosition = $scope.find(settings.searchClass).data('settings')['results_area_custom_position'],
                    resultAreaContainer = $('.jet-ajax-search__results-area', $scope);
                if ("custom" === resultAreaWidthBy) {
                    if ("" !== resultAreaCustomWidth) {
                        resultAreaContainer.width(resultAreaCustomWidth)
                    }
                    switch (resultAreaCustomWidthPosition) {
                        case 'left':
                            resultAreaContainer.css("left", 0);
                            resultAreaContainer.css("right", "auto");
                            break;
                        case 'center':
                            resultAreaContainer.css("left", "50%");
                            resultAreaContainer.css("right", "auto");
                            resultAreaContainer.css("-webkit-transform", "translateX(-55%)");
                            resultAreaContainer.css("transform", "translateX(-50%)");
                            break;
                        case 'right':
                            resultAreaContainer.css("left", "auto");
                            resultAreaContainer.css("right", 0);
                            break
                    }
                }
            }
            $scope.find(settings.searchClass).jetAjaxSearch(settings);
            var $chosenSelect = $scope.find(settings.chosenClass);
            if ($chosenSelect[0]) {
                $chosenSelect.chosen({
                    disable_search: !0,
                    placeholder_text: '',
                    placeholder_text_single: ''
                })
            }
        },
        widgetSearchSuggestions: function($scope) {
            let $target = $scope.find('.jet-search-suggestions'),
                settings = {
                    searchClass: '.jet-search-suggestions',
                    searchFormClass: '.jet-search-suggestions__form',
                    fieldsHolderClass: '.jet-search-suggestions__fields-holder',
                    inputClass: '.jet-search-suggestions__field',
                    spinnerClass: '.jet-search-suggestions__spinner-holder',
                    messageHolderClass: '.jet-search-suggestions__message',
                    settingsInput: 'input[name="jet_search_suggestions_settings"]',
                    submitClass: '.jet-search-suggestions__submit',
                    chosenClass: '.jet-search-suggestions__categories select[name="jet_search_suggestions_categories"]',
                    inlineClass: '.jet-search-suggestions__inline-area',
                    inlineItemClass: '.jet-search-suggestions__inline-area-item',
                    focusClass: '.jet-search-suggestions__focus-area',
                    focusHolderClass: '.jet-search-suggestions__focus-results-holder',
                    focusItemClass: '.jet-search-suggestions__focus-area-item',
                    handlerId: 'jetSearchSettings',
                    isRtl: (window.elementorFrontend && window.elementorFrontend.config.is_rtl) ? window.elementorFrontend.config.is_rtl : $('body').hasClass('rtl')
                },
                $chosenSelect = $scope.find(settings.chosenClass);
            $target.jetAjaxSearchSuggestions(settings);
            if ($chosenSelect[0]) {
                $chosenSelect.chosen({
                    disable_search: !0,
                    placeholder_text: '',
                    placeholder_text_single: ''
                })
            }
        },
        setFormSuggestion: function(name, form, url = '') {
            const ajaxSettings = window.jetSearchSettings.searchSuggestions || {},
                sendData = {
                    name: name
                },
                nonce = ajaxSettings.nonce_rest;
            const ajaxData = {
                action: ajaxSettings.set_action,
                data: sendData || {}
            };
            $.ajax({
                type: 'POST',
                url: ajaxSettings.add_suggestions_rest_api_url,
                data: ajaxData,
                dataType: 'json',
                beforeSend: function(jqXHR) {
                    jqXHR.setRequestHeader('X-WP-Nonce', nonce)
                },
                complete: function() {
                    if ('' != url) {
                        url = JetSearch.getResultsUrl(form, url);
                        window.location.href = url
                    } else {
                        form.submit()
                    }
                }
            })
        },
        getResultsUrl: function(form, url = '') {
            let redirectUrl = '';
            if ('' != url) {
                redirectUrl = url
            } else {
                redirectUrl = form.attr('action')
            }
            let formData = {},
                result = '';
            formData = form.serializeArray().reduce(function(obj, item) {
                obj[item.name] = item.value;
                return obj
            }, {});
            if (Object.keys(formData).length > 0) {
                result = redirectUrl + '?' + $.param(formData).replace(/=&/g, '&').replace(/=$/, '')
            } else {
                result = redirectUrl
            }
            return result
        },
        suggestionsPreloader: function(is_active, state, preloader) {
            if (!is_active) {
                return
            }
            if ('' != preloader) {
                if ('show' === state) {
                    preloader.addClass('show')
                } else if ('hide' === state) {
                    preloader.removeClass('show')
                }
            }
        },
        getUrlParams: function() {
            let params = {},
                queryString = window.location.search.slice(1);
            if (queryString) {
                let pairs = queryString.split('&');
                for (let i = 0; i < pairs.length; i++) {
                    let pair = pairs[i].split('=');
                    params[pair[0]] = decodeURIComponent(pair[1] || '')
                }
            }
            return params
        },
        md5: function(str) {
            let hash = '';
            for (let i = 0; i < str.length; i++) {
                let char = str.charCodeAt(i);
                hash += char
            }
            return hash
        },
        generateHash: function(string, length = 6) {
            let md5Hash = JetSearch.md5(string),
                hash = '';
            for (let i = 0; i < length; i++) {
                hash += md5Hash.charAt(Math.floor(Math.random() * md5Hash.length))
            }
            hash = hash.toLowerCase();
            return hash
        },
        generateRandomId: function() {
            let hash = JetSearch.generateHash(Math.random().toString());
            return hash
        },
        initElementsHandlers: function($selector) {
            window.JetPlugins.init($selector);
            $selector.find('[data-element_type]').each(function() {
                var $this = $(this),
                    elementType = $this.data('element_type');
                if (!elementType) {
                    return
                }
                if ('widget' === elementType) {
                    elementType = $this.data('widget_type');
                    window.elementorFrontend.hooks.doAction('frontend/element_ready/widget', $this, $)
                }
                window.elementorFrontend.hooks.doAction('frontend/element_ready/global', $this, $);
                window.elementorFrontend.hooks.doAction('frontend/element_ready/' + elementType, $this, $)
            });
            if (window.elementorFrontend) {
                const elementorLazyLoad = new Event("elementor/lazyload/observe");
                document.dispatchEvent(elementorLazyLoad)
            }
            if (window.JetPopupFrontend && window.JetPopupFrontend.initAttachedPopups) {
                window.JetPopupFrontend.initAttachedPopups($selector)
            }
        },
        reinitSlickSlider: function($scope) {
            var $slider = $scope.find('.slick-initialized');
            if ($slider.length) {
                $slider.each(function() {
                    $(this).slick('unslick')
                })
            }
        },
        enqueueAssetsFromResponse: function(response) {
            if (response.data.scripts) {
                JetSearch.enqueueScripts(response.data.scripts)
            }
            if (response.data.styles) {
                JetSearch.enqueueStyles(response.data.styles)
            }
        },
        enqueueScripts: function(scripts) {
            $.each(scripts, function(handle, scriptHtml) {
                JetSearch.enqueueScript(handle, scriptHtml)
            })
        },
        enqueueStyles: function(styles) {
            $.each(styles, function(handle, styleHtml) {
                JetSearch.enqueueStyle(handle, styleHtml)
            })
        },
        enqueueScript: function(handle, scriptHtml) {
            if (-1 !== JetSearch.addedScripts.indexOf(handle)) {
                return
            }
            if (!scriptHtml) {
                return
            }
            var selector = 'script[id="' + handle + '-js"]';
            if ($(selector).length) {
                return
            }
            var scriptsTags = scriptHtml.match(/<script[\s\S]*?<\/script>/gm);
            if (scriptsTags.length) {
                for (var i = 0; i < scriptsTags.length; i++) {
                    JetSearch.assetsPromises.push(new Promise(function(resolve, reject) {
                        var $tag = $(scriptsTags[i]);
                        if ($tag[0].src) {
                            var tag = document.createElement('script');
                            tag.type = $tag[0].type;
                            tag.src = $tag[0].src;
                            tag.id = $tag[0].id;
                            tag.async = !1;
                            tag.onload = function() {
                                resolve()
                            };
                            document.body.append(tag)
                        } else {
                            $('body').append(scriptsTags[i]);
                            resolve()
                        }
                    }))
                }
            }
            JetSearch.addedScripts.push(handle)
        },
        enqueueStyle: function(handle, styleHtml) {
            if (-1 !== handle.indexOf('google-fonts')) {
                JetSearch.enqueueGoogleFonts(handle, styleHtml);
                return
            }
            if (-1 !== JetSearch.addedStyles.indexOf(handle)) {
                return
            }
            var selector = 'link[id="' + handle + '-css"],style[id="' + handle + '"]';
            if ($(selector).length) {
                return
            }
            $('head').append(styleHtml);
            JetSearch.addedStyles.push(handle);
            if (-1 !== handle.indexOf('elementor-post')) {
                var postID = handle.replace('elementor-post-', '');
                JetSearch.addedPostCSS.push(postID)
            }
        },
        enqueueGoogleFonts: function(handle, styleHtml) {
            var selector = 'link[id="' + handle + '-css"]';
            if ($(selector).length) {}
            $('head').append(styleHtml)
        },
        reinitBricksScripts: function(_this) {
            if (!$('body').hasClass('theme-bricks')) {
                return
            }
            const resultsArea = $('.jet-ajax-search__results-list', _this);
            resultsArea.find('[data-script-id]').each(function() {
                const newId = JetSearch.generateRandomId();
                $(this).attr('data-script-id', newId)
            });
            resultsArea.find('[id^="brxe-"]').each(function() {
                var id = $(this).attr('id');
                $(this).addClass(id)
            });
            const bricksScripts = {
                ".bricks-lightbox": 'bricksPhotoswipe',
                ".brxe-accordion, .brxe-accordion-nested": 'bricksAccordion',
                ".brxe-animated-typing": 'bricksAnimatedTyping',
                ".brxe-audio": 'bricksAudio',
                ".brxe-countdown": 'bricksCountdown',
                ".brxe-counter": 'bricksCounter',
                ".brxe-video": 'bricksVideo',
                ".bricks-lazy-hidden": 'bricksLazyLoad',
                ".brx-animated": 'bricksAnimation',
                ".brxe-pie-chart": 'bricksPieChart',
                ".brxe-progress-bar .bar span": 'bricksProgressBar',
                ".brxe-form": 'bricksForm',
                ".brx-query-trail": 'bricksInitQueryLoopInstances',
                "[data-interactions]": 'bricksInteractions',
                ".brxe-alert svg": 'bricksAlertDismiss',
                ".brxe-tabs, .brxe-tabs-nested": 'bricksTabs',
                ".bricks-video-overlay, .bricks-video-overlay-icon, .bricks-video-preview-image": 'bricksVideoOverlayClickDetector',
                ".bricks-background-video-wrapper": 'bricksBackgroundVideoInit',
                ".brxe-toggle": 'bricksToggle',
                ".brxe-offcanvas": 'bricksOffcanvas',
                '.brxe-slider': 'bricksSwiper',
                '.brxe-slider-nested': 'bricksSplide',
                '.brxe-image': 'bricksSwiper'
            };
            const contentWrapper = resultsArea[0];
            for (const key in bricksScripts) {
                const widget = contentWrapper.querySelector(key);
                if (widget && typeof window[bricksScripts[key]] === "function" && bricksScripts[key]) {
                    window[bricksScripts[key]]()
                }
            }
        }
    };
    $.fn.getSuggestionsList = function(options, settings, showSpinner, hightlightText = !1, callback = () => {}) {
        let self = this[0],
            outputHtml = '',
            listPosition = options.list_position,
            inlineItemTemplate = wp.template('jet-search-inline-suggestion-item'),
            focusItemTemplate = wp.template('jet-search-focus-suggestion-item'),
            spinner = $(settings.spinnerClass, self),
            manualList = [];
        const ajaxSettings = window.jetSearchSettings.searchSuggestions || {};

        function highlightMatches(item) {
            let searched = options.value.trim();
            if (searched !== "") {
                let reg = new RegExp("[\>][^\<]*" + searched + "[^\<]*[\<]", "gi"),
                    reg2 = new RegExp(searched, "gi"),
                    regHtml = new RegExp("<\/?[a-z](.*?)[\s\S]*>", "gi");
                if (reg.test(item)) {
                    item = item.replace(reg, function(item) {
                        let subRegex = new RegExp(searched, "gi");
                        return item.replace(subRegex, `<mark>${searched}</mark>`)
                    })
                }
                if (regHtml.test(item)) {
                    return item
                } else {
                    item = item.replace(reg2, str => `<mark>${str}</mark>`)
                }
            }
            return item
        }
        if ('manual' === options.list_type) {
            if (options.manual_list.length) {
                let list = options.manual_list.split(",");
                list.map(function(suggestion, i) {
                    manualList[i] = {
                        name: suggestion
                    }
                });
                if ('inline' === listPosition) {
                    manualList.map(function(suggestion) {
                        outputHtml += inlineItemTemplate(suggestion)
                    });
                    $(self).html(outputHtml)
                } else if ('focus' === listPosition) {
                    manualList.map(function(suggestion) {
                        outputHtml += focusItemTemplate(suggestion)
                    });
                    $(settings.focusHolderClass, self).html(outputHtml);
                    if (typeof callback === 'function') {
                        callback()
                    }
                    JetSearch.suggestionsPreloader(showSpinner, 'hide', spinner)
                }
            }
            return
        }
        let sendData = {
                list_type: options.list_type || '',
                value: options.value || '',
                limit: options.limit
            },
            ajaxData = {
                action: ajaxSettings.get_action,
                data: sendData || {}
            };
        jQuery.ajax({
            type: 'GET',
            url: ajaxSettings.get_suggestions_rest_api_url,
            data: ajaxData,
            dataType: 'json',
            cache: !1,
            processData: !0,
            error: function(jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR)
            },
            success: function(response, textStatus, jqXHR) {
                successCallback(response);
                if (typeof callback === 'function') {
                    callback()
                }
            }
        });
        const successCallback = function(response) {
            if (response) {
                JetSearch.suggestionsPreloader(showSpinner, 'hide', spinner);
                if ('inline' === listPosition) {
                    response.map(function(suggestion) {
                        outputHtml += inlineItemTemplate(suggestion)
                    });
                    $(self).html(outputHtml)
                } else if ('focus' === listPosition) {
                    response.map(function(suggestion) {
                        if (options.value && ("yes" === hightlightText || !0 === hightlightText)) {
                            suggestion.name = highlightMatches(suggestion.name)
                        }
                        outputHtml += focusItemTemplate(suggestion)
                    });
                    $(settings.focusHolderClass, self).html(outputHtml)
                }
            }
        }
        const errorCallback = function(jqXHR) {
            if ('abort' !== jqXHR.statusText) {
                JetSearch.suggestionsPreloader(showSpinner, 'hide', spinner)
            }
        }
    };
    $.fn.jetAjaxSearchSuggestions = function(args) {
        let self = this[0],
            settings = args,
            options = $(self).data('settings') || {},
            timer = null,
            showformList = options.show_search_suggestions_list_inline || !1,
            showfocusList = options.show_search_suggestions_list_on_focus || !1,
            formListType = options.search_suggestions_list_inline || !1,
            focusListType = options.search_suggestions_list_on_focus || !1,
            searchSuggestionsLimit = options.search_suggestions_quantity_limit || 10,
            inlineLimit = options.search_suggestions_list_inline_quantity || 5,
            focusLimit = options.search_suggestions_list_on_focus_quantity || 5,
            showSpinner = options.show_search_suggestions_list_on_focus_preloader || '',
            hightlightText = options.highlight_searched_text || '',
            spinner = $(settings.spinnerClass, self),
            formFocusClass = settings.searchFormClass.replace('.', '') + '--focus',
            form = $(settings.searchFormClass, self),
            focusTarget = $(settings.focusHolderClass, self),
            disableInputs = !1,
            customResultUrl = options.search_results_url || '',
            useSession = 'false',
            focusItem;
        if (window.elementorFrontend) {
            var editMode = Boolean(window.elementorFrontend.isEditMode())
        } else {
            var editMode = !1
        }
        if (!self.isInit) {
            self.isInit = !0;
            self.ajaxSettings = window[settings.handlerId].searchSuggestions || {};
            customResultUrl = $.trim(customResultUrl);
            useSession = self.ajaxSettings.use_session;
            self.selectSuggestion = function(event) {
                const keyCode = event.keyCode || event.which;
                let value = event.target.innerText.trim();
                if (!1 === disableInputs && !editMode) {
                    if ('keydown' === event.type) {
                        if (13 === keyCode) {
                            disableInputs = !0;
                            $(settings.inputClass, self)[0].value = value;
                            JetSearch.setFormSuggestion(value, form, customResultUrl)
                        }
                    } else if ('click' === event.type) {
                        disableInputs = !0;
                        $(settings.inputClass, self)[0].value = value;
                        JetSearch.setFormSuggestion(value, form, customResultUrl)
                    }
                }
            }
            self.focusItemsNav = function() {
                focusItem = $('.jet-search-suggestions__focus-area-item', self);
                if (0 < focusItem.length) {
                    focusItem.on('keydown', function(e) {
                        const keyCode = e.keyCode || e.which;
                        switch (keyCode) {
                            case 40:
                                e.preventDefault();
                                var next = $(this).next();
                                if (next.length > 0) {
                                    focusItem.removeClass('focused');
                                    next.addClass('focused');
                                    next.focus()
                                }
                                break;
                            case 38:
                                e.preventDefault();
                                var prev = $(this).prev();
                                if (prev.length > 0) {
                                    focusItem.removeClass('focused');
                                    prev.addClass('focused');
                                    prev.focus()
                                } else {
                                    focusItem.removeClass('focused');
                                    $(settings.inputClass, self).focus()
                                }
                                break;
                            case 13:
                                e.preventDefault();
                                let value = e.target.innerText.trim();
                                $(settings.inputClass, self)[0].value = value;
                                JetSearch.setFormSuggestion(value, form, customResultUrl);
                                break
                        }
                        if ($(this).is(':focus-visible')) {
                            focusItem.removeClass('focused')
                        }
                    })
                }
            }
            if (formListType || focusListType) {
                if ('' != formListType && ("yes" === showformList || !0 === showformList)) {
                    let listOptions = {
                        list_position: 'inline',
                        list_type: formListType,
                        limit: inlineLimit
                    };
                    if ('manual' === formListType) {
                        listOptions.manual_list = options.search_suggestions_list_inline_manual
                    }
                    $(settings.inlineClass, self).getSuggestionsList(listOptions, settings, showSpinner, !1, () => {
                        let inlineItem = $('.jet-search-suggestions__inline-area-item', self);
                        if (0 < inlineItem.length) {
                            inlineItem.on('focus', function() {
                                if ($(this).is(':focus-visible')) {
                                    self.hideList()
                                }
                            })
                        }
                        inlineItem.on('keydown', function(e) {
                            const keyCode = e.keyCode || e.which;
                            let value = e.target.innerText.trim();
                            if (13 === keyCode) {
                                $(settings.inputClass, self)[0].value = value;
                                JetSearch.setFormSuggestion(value, form, customResultUrl)
                            }
                        })
                    })
                }
                if ('' != focusListType && ("yes" === showfocusList || !0 === showfocusList)) {
                    let listOptions = {
                        list_position: 'focus',
                        list_type: focusListType,
                        limit: focusLimit
                    };
                    if ('manual' === focusListType) {
                        listOptions.manual_list = options.search_suggestions_list_on_focus_manual
                    }
                    $(settings.focusClass, self).getSuggestionsList(listOptions, settings, showSpinner, !1, () => {
                        self.focusItemsNav()
                    })
                }
            }
            self.inputChangeHandler = function(event) {
                let value = $(event.target).val(),
                    listOptions = {
                        list_position: 'focus',
                        value: value,
                        limit: searchSuggestionsLimit
                    };
                if ('' != value) {
                    focusTarget.empty();
                    self.showList();
                    JetSearch.suggestionsPreloader(showSpinner, 'show', spinner);
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        $(settings.focusClass, self).getSuggestionsList(listOptions, settings, showSpinner, hightlightText, () => {
                            self.focusItemsNav()
                        })
                    }, 450)
                } else {
                    clearTimeout(timer);
                    focusTarget.empty();
                    JetSearch.suggestionsPreloader(showSpinner, 'hide', spinner);
                    if (!1 != focusListType && ("yes" === showfocusList || !0 === showfocusList)) {
                        JetSearch.suggestionsPreloader(showSpinner, 'show', spinner);
                        listOptions.limit = focusLimit;
                        if ('manual' === focusListType) {
                            listOptions.list_type = focusListType;
                            listOptions.manual_list = options.search_suggestions_list_on_focus_manual
                        }
                        $(settings.focusClass, self).getSuggestionsList(listOptions, settings, showSpinner, !1, () => {
                            self.focusItemsNav()
                        })
                    }
                }
            };
            self.hideList = function(event) {
                $(settings.focusClass, self).removeClass('show');
                $('.chosen-single', self).removeClass('focused');
                if (focusItem && 0 < focusItem.length) {
                    focusItem.removeClass('focused')
                }
            };
            self.showList = function() {
                $(settings.focusClass, self).addClass('show')
            };
            self.focusHandler = function(event) {
                $(settings.searchFormClass, self).addClass(formFocusClass);
                self.showList()
            };
            self.chosenFocusHandler = function() {
                self.hideList()
            };
            self.formClick = function(event) {
                event.stopPropagation()
            };
            self.changeHandler = function(event) {
                let target = $(event.target),
                    settingsInput = $(settings.settingsInput, self),
                    querySettings = JSON.parse(settingsInput.val()),
                    globalQuerySettings = $(self).data('settings');
                querySettings.category__in = target.val();
                globalQuerySettings.category__in = target.val();
                settingsInput.val(JSON.stringify(querySettings));
                $(self).data('settings', globalQuerySettings);
                self.inputChangeHandler({
                    target: $(settings.inputClass, self)
                })
            };
            self.formSubmit = function(event) {
                let keyCode = event.keyCode || event.which;
                if (!1 === disableInputs) {
                    let value = event.target.value;
                    if (13 === keyCode && value.length != 0) {
                        disableInputs = !0;
                        event.preventDefault();
                        JetSearch.setFormSuggestion(value, form, customResultUrl)
                    }
                }
                if (40 === keyCode) {
                    if (focusItem && 0 < focusItem.length) {
                        event.preventDefault();
                        focusItem.removeClass('focused');
                        focusItem.first().addClass('focused');
                        focusItem.first().focus()
                    }
                }
            }
            self.blurHandler = function(event) {
                $(settings.searchFormClass, self).removeClass(formFocusClass)
            };
            self.clickFullResults = function(event) {
                if (!1 === disableInputs) {
                    disableInputs = !0;
                    var searchInput = $(settings.inputClass, self),
                        value = searchInput.val();
                    event.preventDefault();
                    JetSearch.setFormSuggestion(value, form, customResultUrl)
                }
            };
            $(settings.inputClass, self).on('input' + settings.searchClass, self.inputChangeHandler).on('focus' + settings.searchClass, self.focusHandler).on('blur' + settings.searchClass, self.blurHandler).on('keydown' + settings.searchClass, self.formSubmit);
            $(settings.submitClass, self).on('click' + settings.searchClass, self.clickFullResults);
            $(self).on('click' + settings.searchClass, settings.focusItemClass, self.selectSuggestion).on('click keydown' + settings.searchClass, settings.inlineItemClass, self.selectSuggestion).on('click' + settings.searchClass, self.formClick).on('change', settings.chosenClass, self.changeHandler).on('touchend' + settings.searchClass, self.formClick).on('chosen:showing_dropdown', settings.chosenClass, self.chosenFocusHandler);
            $(self).on('keydown', function(e) {
                const keyCode = e.keyCode || e.which;
                if (9 === keyCode) {
                    setTimeout(() => {
                        const focusedElement = document.activeElement;
                        if ($(focusedElement).is('.chosen-search-input')) {
                            $('.chosen-single', self).addClass('focused')
                        } else {
                            $('.chosen-single', self).removeClass('focused')
                        }
                        if ($(focusedElement).is('.jet-search-suggestions__inline-area-item')) {
                            self.hideList()
                        }
                    }, 50)
                }
            });
            $(settings.inputClass, self).on('click' + settings.searchClass, () => {
                $('.chosen-single', self).removeClass('focused')
            });
            $('body').on('click' + settings.searchClass, self.hideList).on('touchend' + settings.searchClass, self.hideList);
            if ('0' !== $(settings.chosenClass, self).val()) {
                $(settings.chosenClass, self).trigger('change')
            }
        }
    };
    $.fn.jetAjaxSearch = function(args) {
        var self = this[0],
            settings = args,
            timer = null,
            itemTemplate = null,
            resultsArea = $(settings.resultsAreaClass, self),
            resultsHolder = $(settings.listHolderClass, resultsArea),
            resultsHeader = $(settings.resultsHeaderClass, resultsArea),
            resultsFooter = $(settings.resultsFooterClass, resultsArea),
            countHolder = $(settings.countClass, resultsArea),
            fullResults = $(settings.fullResultsClass, resultsArea),
            resultsList = $(settings.listClass, resultsArea),
            resultsListInner = $(settings.listInnerClass, resultsArea),
            resultsHeaderNav = $(settings.navigationClass, resultsHeader),
            resultsFooterNav = $(settings.navigationClass, resultsFooter),
            messageHolder = $(settings.messageHolderClass, resultsArea),
            spinner = $(settings.spinnerClass, resultsArea),
            form = $(settings.searchFormClass, self),
            resultsSuggestions = $(settings.resultsSuggestionsAreaClass, self),
            inlineSuggestions = $(settings.inlineSuggestionsAreaClass, self),
            data = $(self).data('settings') || [],
            customResultUrl = data.search_results_url || '',
            hightlightText = data.highlight_searched_text || '',
            formFocusClass = settings.searchFormClass.replace('.', '') + '--focus',
            customResultUrl = data.search_results_url || '',
            searchLogging = data.search_logging || '',
            currentPosition = 1,
            lang = '',
            disableInputs = !1,
            allowEmptyString = !1,
            allowSubmitOnEnter = 1,
            urlParams = JetSearch.getUrlParams(),
            listingID = data.listing_id || '',
            categoryIndex = urlParams.jet_ajax_search_categories || '',
            getResultsOnFocus = !0,
            maxUserSearches = 20,
            showSearchSuggestions = data.show_search_suggestions || !1,
            suggestionsTitle = '',
            suggestionsType = data.search_suggestions_source || !1,
            suggestionsPosition = data.search_suggestions_position || !1,
            searchSuggestionsLimits = data.search_suggestions_limits || 20,
            storedUserSearches = JSON.parse(localStorage.getItem('jetUserSearches')) || [],
            suggestionsList = [];
        if ('yes' === data.search_by_empty_value || !0 === data.search_by_empty_value) {
            allowEmptyString = !0
        }
        if (!self.isInit) {
            self.isInit = !0;
            self.ajaxRequest = null;
            self.suggestionsListLoaded = !1;
            if (data.hasOwnProperty('lang')) {
                lang = data.lang;
                delete data.lang
            }
            self.ajaxSettings = window[settings.handlerId] || {};
            if (self.ajaxSettings.ajaxSearchSuggestionsLimits) {
                maxUserSearches = self.ajaxSettings.ajaxSearchSuggestionsLimits
            }
            if ('yes' === data.submit_on_enter || !0 === data.submit_on_enter) {
                allowSubmitOnEnter = !1
            } else {
                allowSubmitOnEnter = !0
            }
            if ('' === self.ajaxSettings.sumbitOnEnter) {
                allowSubmitOnEnter = !1
            }
            if (window.elementorFrontend) {
                var editMode = Boolean(window.elementorFrontend.isEditMode())
            } else {
                var editMode = !1
            }
            self.suggestionsListHTML = function(suggestionsList) {
                let resultsSuggestionsTemplate = wp.template('jet-ajax-search-results-suggestion-item'),
                    inlineSuggestionsTemplate = wp.template('jet-ajax-search-inline-suggestion-item'),
                    inlineOutputHtml = '',
                    resultsOutputHtml = '';
                suggestionsList.forEach(item => {
                    let inlineListItemHtml = '',
                        resultsListItemHtml = '';
                    if ('under_form' === suggestionsPosition) {
                        inlineListItemHtml = inlineSuggestionsTemplate(item)
                    } else if ('inside_results_area' === suggestionsPosition) {
                        resultsListItemHtml = resultsSuggestionsTemplate(item)
                    }
                    inlineOutputHtml += inlineListItemHtml;
                    resultsOutputHtml += resultsListItemHtml
                });
                if ('under_form' === suggestionsPosition) {
                    suggestionsTitle = inlineSuggestions.html();
                    inlineSuggestions.html(inlineOutputHtml).prepend(suggestionsTitle)
                } else if ('inside_results_area' === suggestionsPosition) {
                    suggestionsTitle = resultsSuggestions.html();
                    resultsSuggestions.html(resultsOutputHtml).prepend(suggestionsTitle)
                }
            };
            self.showSuggestions = function() {
                if (suggestionsType) {
                    if ('popular' === suggestionsType) {
                        if (!1 === window.bricksIsFrontend) {
                            let sendData = {
                                    list_type: 'popular',
                                    value: '',
                                    limit: searchSuggestionsLimits
                                },
                                ajaxData = {
                                    action: self.ajaxSettings.searchSuggestions.get_action,
                                    data: sendData || {}
                                };
                            $.ajax({
                                type: 'GET',
                                url: self.ajaxSettings.searchSuggestions.get_suggestions_rest_api_url,
                                data: ajaxData,
                                dataType: 'json',
                                cache: !1,
                                processData: !0,
                                error: function(jqXHR, textStatus, errorThrown) {
                                    errorCallback(jqXHR)
                                },
                                success: function(response, textStatus, jqXHR) {
                                    if (response.length) {
                                        suggestionsList = $.map(response, function(obj) {
                                            return obj.name
                                        });
                                        self.suggestionsListLoaded = !0;
                                        self.suggestionsListHTML(suggestionsList)
                                    }
                                }
                            })
                        } else {
                            suggestionsList = self.ajaxSettings.ajaxSearchPopularSuggestions || []
                        }
                    } else if ('user' === suggestionsType) {
                        let userSearches = localStorage.getItem('jetUserSearches');
                        if (userSearches) {
                            suggestionsList = JSON.parse(userSearches) || [];
                            suggestionsList.reverse()
                        } else {
                            resultsSuggestions.hide();
                            inlineSuggestions.hide()
                        }
                    }
                }
                suggestionsList = suggestionsList.slice(0, searchSuggestionsLimits);
                if (suggestionsList.length) {
                    self.suggestionsListHTML(suggestionsList)
                } else {
                    resultsSuggestions.hide();
                    inlineSuggestions.hide()
                }
            };
            if ('yes' === showSearchSuggestions || !0 === showSearchSuggestions) {
                self.showSuggestions()
            }
            self.inputChangeHandler = function(event) {
                var value = $(event.target).val(),
                    symbolNumberForStart = 'number' === $.type(data.symbols_for_start_searching) ? data.symbols_for_start_searching : 2;
                if ('number' === $.type(symbolNumberForStart) && symbolNumberForStart > value.length) {
                    if ('inside_results_area' === suggestionsPosition && suggestionsList.length) {
                        resultsHeader.hide();
                        resultsFooter.hide();
                        resultsList.hide();
                        resultsSuggestions.show();
                        resultsSuggestions.addClass('active');
                        resultsHolder.addClass('show');
                        self.showList()
                    } else {
                        self.hideList()
                    }
                    return !1
                }
                if ('inside_results_area' === suggestionsPosition && suggestionsList.length) {
                    resultsSuggestions.removeClass('active');
                    resultsHeader.show();
                    resultsFooter.show();
                    resultsList.show()
                }
                resultsHolder.removeClass('show');
                self.outputMessage('', '');
                resultsListInner.css('transform', 'translateX(0)');
                resultsList.css('height', 'auto');
                if (value) {
                    self.showList();
                    spinner.addClass('show');
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        data.value = value;
                        data.deviceMode = window.elementorFrontend && window.elementorFrontend.getCurrentDeviceMode() ? window.elementorFrontend.getCurrentDeviceMode() : !1;
                        self.ajaxSendData(data, lang)
                    }, 450)
                } else {
                    self.hideList()
                }
            };
            self.successCallback = function(response) {
                if (response.error) {
                    spinner.removeClass('show');
                    self.outputMessage(data.server_error, 'error show');
                    return
                }
                JetSearch.enqueueAssetsFromResponse(response);
                var responseData = response.data,
                    error = responseData.error,
                    message = responseData.message,
                    posts = responseData.posts,
                    listingItems = responseData.listing_items,
                    post = null,
                    outputHtml = '',
                    listItemHtml = '',
                    listHtml = '<div class="' + settings.listSlideClass.replace('.', '') + '">%s</div>';
                resultsHolder.removeClass('show');
                spinner.removeClass('show');
                currentPosition = 1;
                resultsListInner.html('');
                if ('' != listingID && 0 !== responseData.post_count && !error && window.JetEngine) {
                    var outputHtml = '',
                        listItemHtml = '',
                        listHtml = '<div class="jet-listing-base ' + settings.listSlideClass.replace('.', '') + '">%s</div>';
                    if (listingItems.length) {
                        $.each(listingItems, (i, item) => {
                            listItemHtml += item;
                            if ((parseInt(i) + 1) % responseData.limit_query == 0 || parseInt(i) === listingItems.length - 1) {
                                outputHtml += listHtml.replace('%s', listItemHtml);
                                listItemHtml = ''
                            }
                        })
                    }
                    messageHolder.removeClass('show');
                    $('span', countHolder).html(responseData.post_count);
                    resultsListInner.html(outputHtml).data('columns', responseData.columns);
                    Promise.all(JetSearch.assetsPromises).then(function() {
                        JetSearch.initElementsHandlers(resultsListInner);
                        JetSearch.reinitBricksScripts(self);
                        JetSearch.assetsPromises = []
                    });
                    resultsHeaderNav.html(responseData.results_navigation.in_header);
                    resultsFooterNav.html(responseData.results_navigation.in_footer);
                    if (!countHolder[0] && !responseData.results_navigation.in_header) {
                        resultsHeader.addClass('is-empty')
                    } else {
                        resultsHeader.removeClass('is-empty')
                    }
                    if (!fullResults[0] && !responseData.results_navigation.in_footer) {
                        resultsFooter.addClass('is-empty')
                    } else {
                        resultsFooter.removeClass('is-empty')
                    }
                    resultsList.css('height', 'auto');
                    resultsHolder.addClass('show');
                    return
                }
                const allowedHighlightFields = ['title', 'after_content', 'after_title', 'before_content', 'before_title', 'content', 'price'];

                function highlightMatches(item) {
                    let searched = responseData.search_value.trim();
                    if (searched !== "") {
                        let reg = new RegExp("[\>][^\<]*" + searched + "[^\<]*[\<]", "gi"),
                            reg2 = new RegExp(searched, "gi"),
                            regHtml = new RegExp("<\/?[a-z](.*?)[\s\S]*>", "gi");
                        if (reg.test(item)) {
                            item = item.replace(reg, function(item) {
                                let subRegex = new RegExp(searched, "gi");
                                return item.replace(subRegex, `<mark>${searched}</mark>`)
                            })
                        }
                        if (regHtml.test(item)) {
                            return item
                        } else {
                            item = item.replace(reg2, str => `<mark>${str}</mark>`)
                        }
                    }
                    return item
                }

                function highlightFields(fields, allowHighlightFields) {
                    $.each(fields, function(key, value) {
                        if (-1 != $.inArray(key, allowHighlightFields) && (null != value && '' != value)) {
                            fields[key] = highlightMatches(value)
                        }
                    });
                    return fields
                }
                if (0 !== responseData.post_count && !error) {
                    messageHolder.removeClass('show');
                    itemTemplate = wp.template('jet-ajax-search-results-item');
                    for (post in posts) {
                        if (responseData.search_highlight && !0 === responseData.search_highlight) {
                            if ('' != hightlightText && ("yes" === hightlightText || !0 === hightlightText)) {
                                highlightFields(posts[post], allowedHighlightFields)
                            }
                        }
                        if (posts[post].is_product) {
                            let productType = posts[post].product_type,
                                productTypeClass = 'add-to-cart-button';
                            if ('product_type_variable' === productType) {
                                productTypeClass = 'select-options-button'
                            }
                            posts[post].add_to_cart = '<div class="jet-ajax-search__item-add-to-cart"><button data-quantity="1" class="jet-ajax-search__results-item-cart-button ' + productTypeClass + '" data-product_id="' + posts[post].product_id + '" data-product_sku="' + posts[post].product_sku + '" aria-label="' + posts[post].product_label + '" data-product_url="' + posts[post].product_url + '" rel="nofollow" target="_blank">' + posts[post].product_add_text + '</button></div>'
                        }
                        let templateResult = itemTemplate(posts[post]);
                        listItemHtml += templateResult;
                        if ((parseInt(post) + 1) % responseData.limit_query == 0 || parseInt(post) === posts.length - 1) {
                            outputHtml += listHtml.replace('%s', listItemHtml);
                            listItemHtml = ''
                        }
                    }
                    $('span', countHolder).html(responseData.post_count);
                    resultsListInner.html(outputHtml).data('columns', responseData.columns);
                    $('.jet-ajax-search__results-item-cart-button.add-to-cart-button', self).on('click', function(e) {
                        e.preventDefault();
                        let _this = $(this);
                        if (_this.attr('data-product_id')) {
                            let addToCartData = {};
                            $.each(_this[0].dataset, function(key, value) {
                                addToCartData[key] = value
                            });
                            _this.prop('disabled', !0);
                            $.ajax({
                                type: 'POST',
                                url: wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'),
                                dataType: 'json',
                                data: addToCartData,
                                success: function(response) {
                                    $(document.body).trigger('wc_fragment_refresh');
                                    _this.prop('disabled', !1)
                                },
                                error: function(xhr, status, error) {
                                    _this.prop('disabled', !1)
                                }
                            })
                        }
                    });
                    $('.jet-ajax-search__results-item-cart-button.select-options-button', self).on('click', function(e) {
                        e.preventDefault();
                        const productUrl = $(this).data('product_url');
                        window.open(productUrl, '_blank')
                    });
                    resultsHeaderNav.html(responseData.results_navigation.in_header);
                    resultsFooterNav.html(responseData.results_navigation.in_footer);
                    if (!countHolder[0] && !responseData.results_navigation.in_header) {
                        resultsHeader.addClass('is-empty')
                    } else {
                        resultsHeader.removeClass('is-empty')
                    }
                    if (!fullResults[0] && !responseData.results_navigation.in_footer) {
                        resultsFooter.addClass('is-empty')
                    } else {
                        resultsFooter.removeClass('is-empty')
                    }
                    resultsHolder.addClass('show');
                    resultsListInner.imagesLoaded(function() {
                        resultsList.css('height', $(settings.listSlideClass, resultsListInner).eq(0).outerHeight())
                    });
                    $(document).trigger('jet-ajax-search/show-results', [resultsHolder]);
                    var inputField = $('.jet-ajax-search__field', self),
                        resultsItem = $('.jet-ajax-search__item-link', self),
                        focusedItem = resultsItem.filter(':focus');
                    inputField.on('keydown', function(e) {
                        const keyCode = e.keyCode || e.which;
                        if (40 === keyCode) {
                            e.preventDefault();
                            var position = currentPosition - 1,
                                activeSlide = $(settings.listSlideClass, resultsListInner).eq(position),
                                next = activeSlide.find('.jet-ajax-search__item-link').first();
                            if (focusedItem.length === 0) {
                                setTimeout(() => {
                                    resultsItem.removeClass('focused');
                                    next.addClass('focused');
                                    next.focus()
                                }, 0)
                            }
                        }
                    });
                    resultsItem.on('keydown', function(e) {
                        const keyCode = e.keyCode || e.which;
                        switch (keyCode) {
                            case 40:
                                e.preventDefault();
                                var next = $(this).parent().next().find('.jet-ajax-search__item-link').first();
                                if (0 < next.length) {
                                    resultsItem.removeClass('focused');
                                    next.addClass('focused');
                                    next.focus()
                                }
                                break;
                            case 38:
                                e.preventDefault();
                                var prev = $(this).parent().prev().find('.jet-ajax-search__item-link').first();
                                if (0 < prev.length) {
                                    resultsItem.removeClass('focused');
                                    prev.addClass('focused');
                                    prev.focus()
                                } else {
                                    resultsItem.removeClass('focused');
                                    inputField.focus()
                                }
                                break;
                            case 37:
                                var prevSlide = $(this).closest('.jet-ajax-search__results-slide').prev();
                                if (0 < prevSlide.length) {
                                    $(settings.prevClass + ':not( ' + settings.disableNavClass + ' )').click();
                                    resultsItem.removeClass('focused');
                                    setTimeout(() => {
                                        $(settings.listSlideClass, resultsListInner).eq(currentPosition - 1).find('.jet-ajax-search__item-link').first().focus().addClass('focused')
                                    }, 350)
                                }
                                break;
                            case 39:
                                var nextSlide = $(this).closest('.jet-ajax-search__results-slide').next();
                                if (0 < nextSlide.length) {
                                    $(settings.nextClass + ':not( ' + settings.disableNavClass + ' )').click();
                                    resultsItem.removeClass('focused');
                                    setTimeout(() => {
                                        $(settings.listSlideClass, resultsListInner).eq(currentPosition - 1).find('.jet-ajax-search__item-link').first().focus().addClass('focused')
                                    }, 350)
                                }
                                break;
                            case 9:
                                resultsItem.removeClass('focused');
                                break
                        }
                    })
                } else {
                    self.outputMessage(message, 'show')
                }
            };
            self.errorCallback = function(jqXHR) {
                if ('abort' !== jqXHR.statusText) {
                    spinner.removeClass('show');
                    self.outputMessage(data.server_error, 'error show')
                }
            };
            self.ajaxSendData = function(sendData, lang = '') {
                var ajaxData = {
                    action: self.ajaxSettings.action,
                    data: sendData || {}
                };
                if ('' != lang) {
                    ajaxData.lang = lang
                }
                self.ajaxRequest = jQuery.ajax({
                    type: 'GET',
                    url: self.ajaxSettings.rest_api_url,
                    data: ajaxData,
                    dataType: 'json',
                    cache: !1,
                    processData: !0,
                    beforeSend: function(jqXHR, ajaxSettings) {
                        if (null !== self.ajaxRequest) {
                            self.ajaxRequest.abort()
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        self.errorCallback(jqXHR)
                    },
                    success: function(response, textStatus, jqXHR) {
                        self.successCallback(response)
                    }
                })
            };
            self.hideList = function() {
                resultsArea.removeClass('show');
                $('.chosen-single', self).removeClass('focused')
            };
            self.showList = function() {
                resultsArea.addClass('show')
            };
            self.focusHandler = function(event) {
                var value = event.target.value,
                    symbolNumberForStart = 'number' === $.type(data.symbols_for_start_searching) ? data.symbols_for_start_searching : 2;
                $(settings.searchFormClass, self).addClass(formFocusClass);
                if ('inside_results_area' === suggestionsPosition && suggestionsList.length) {
                    if (value && getResultsOnFocus) {
                        spinner.addClass('show');
                        data.value = value;
                        data.deviceMode = window.elementorFrontend && window.elementorFrontend.getCurrentDeviceMode() ? window.elementorFrontend.getCurrentDeviceMode() : !1;
                        self.ajaxSendData(data, lang);
                        getResultsOnFocus = !1
                    }
                    if ('' === value) {
                        resultsHeader.hide();
                        resultsFooter.hide();
                        resultsList.hide();
                        resultsSuggestions.addClass('active');
                        resultsHolder.addClass('show');
                        self.showList()
                    }
                }
                if ('number' === $.type(symbolNumberForStart) && symbolNumberForStart > value.length) {
                    return
                }
                self.showList()
            };
            self.blurHandler = function(event) {
                $(settings.searchFormClass, self).removeClass(formFocusClass)
            };
            self.outputMessage = function(message, messageClass) {
                message = message.replace(/\\/g, '');
                message = message.replace(/\\*"/g, '');
                messageHolder.removeClass('error show').addClass(messageClass).html(message)
            };
            self.formClick = function(event) {
                event.stopPropagation()
            };
            self.clickFullResults = function(event) {
                var searchInput = $(settings.inputClass, self),
                    value = searchInput.val(),
                    url = JetSearch.getResultsUrl(form);
                event.preventDefault();
                if (value.length != 0 || !0 === allowEmptyString) {
                    if (!1 === disableInputs) {
                        disableInputs = !0;
                        if ('' != customResultUrl) {
                            customResultUrl = $.trim(customResultUrl);
                            url = customResultUrl
                        }
                        if ('yes' === showSearchSuggestions || !0 === showSearchSuggestions) {
                            self.addUserSearch(value)
                        }
                        if ('yes' === searchLogging || !0 === searchLogging) {
                            JetSearch.setFormSuggestion(value, form, url)
                        } else {
                            url = JetSearch.getResultsUrl(form, url);
                            window.location.href = url
                        }
                    }
                }
            };
            self.changeSlide = function(number) {
                var currentSlide = $(settings.listSlideClass, resultsListInner).eq(number),
                    direction = settings.isRtl ? 1 : -1,
                    position = number * 100 * direction;
                currentSlide.scrollTop(0);
                resultsListInner.css('transform', 'translateX(' + position + '%)');
                resultsList.css('height', currentSlide.outerHeight())
            };
            self.clickBulletHandler = function(event) {
                var target = $(event.target);
                currentPosition = target.data('number');
                self.syncNavigation();
                self.changeSlide(currentPosition - 1)
            };
            self.clickNavigationButtonHandler = function(event) {
                var target = $(event.target),
                    direction = target.data('direction');
                currentPosition = currentPosition + direction;
                self.syncNavigation();
                self.changeSlide(currentPosition - 1)
            };
            self.syncNavigation = function() {
                var lastPosition = resultsListInner.data('columns'),
                    disableClass = settings.disableNavClass.replace('.', ''),
                    activeClass = settings.activeNavClass.replace('.', '');
                $(settings.activeNavClass, self).removeClass(activeClass);
                $(settings.disableNavClass, self).removeClass(disableClass);
                $(settings.navButtonClass + '[data-number="' + currentPosition + '"]', self).addClass(activeClass);
                if (1 === currentPosition) {
                    $(settings.prevClass, self).addClass(disableClass)
                }
                if (lastPosition === currentPosition) {
                    $(settings.nextClass, self).addClass(disableClass)
                }
            };
            self.formSubmit = function(event) {
                var value = event.target.value,
                    url = JetSearch.getResultsUrl(form);
                if ((1 > value.length && !1 === allowEmptyString) && (13 === event.keyCode || 'click' === event.type)) {
                    return !1
                } else {
                    if (13 === event.keyCode && allowSubmitOnEnter) {
                        if (!1 === disableInputs) {
                            disableInputs = !0;
                            event.preventDefault();
                            if ('' != customResultUrl) {
                                customResultUrl = $.trim(customResultUrl);
                                url = customResultUrl
                            }
                            self.addUserSearch(value);
                            if ('yes' === searchLogging || !0 === searchLogging) {
                                JetSearch.setFormSuggestion(value, form, url)
                            } else {
                                url = JetSearch.getResultsUrl(form, url);
                                window.location.href = url
                            }
                        }
                    }
                }
            };
            self.changeHandler = function(event) {
                var target = $(event.target),
                    globalQuerySettings = $(self).data('settings');
                globalQuerySettings.category__in = target.val();
                data.category__in = target.val();
                $(self).data('settings', globalQuerySettings);
                self.inputChangeHandler({
                    target: $(settings.inputClass, self)
                })
            };
            self.chosenFocusHandler = function() {
                self.hideList()
            };
            self.setResultsAreaWidth = function() {
                if ('fields_holder' !== data.results_area_width_by) {
                    return
                }
                resultsArea.css('width', $(settings.fieldsHolderClass, self).outerWidth())
            };
            self.addUserSearch = function(newSearchRequest) {
                if ('user' === suggestionsType) {
                    newSearchRequest = newSearchRequest.trim();
                    if (!storedUserSearches.some(search => search === newSearchRequest)) {
                        if (storedUserSearches.length >= maxUserSearches) {
                            storedUserSearches.shift()
                        }
                        storedUserSearches.push(newSearchRequest);
                        localStorage.setItem('jetUserSearches', JSON.stringify(storedUserSearches))
                    }
                }
            }
            self.selectSuggestion = function(event) {
                const keyCode = event.keyCode || event.which;
                let value = event.target.innerText.trim(),
                    url = JetSearch.getResultsUrl(form);
                if ('' != customResultUrl) {
                    customResultUrl = $.trim(customResultUrl);
                    url = customResultUrl
                }
                if (!1 === disableInputs && !editMode) {
                    if ('keydown' === event.type) {
                        if (13 === keyCode) {
                            disableInputs = !0;
                            $(settings.inputClass, self)[0].value = value;
                            self.addUserSearch(value);
                            if ('yes' === searchLogging || !0 === searchLogging) {
                                JetSearch.setFormSuggestion(value, form, url)
                            } else {
                                url = JetSearch.getResultsUrl(form, url);
                                window.location.href = url
                            }
                        }
                    } else if ('click' === event.type) {
                        disableInputs = !0;
                        $(settings.inputClass, self)[0].value = value;
                        self.addUserSearch(value);
                        if ('yes' === searchLogging || !0 === searchLogging) {
                            JetSearch.setFormSuggestion(value, form, url)
                        } else {
                            url = JetSearch.getResultsUrl(form, url);
                            window.location.href = url
                        }
                    }
                }
            }
            self.customUrlActions = {
                selectorOnClick: 'a[href^="#jet-engine-action"][href*="event=click"]',
                selectorOnHover: 'a[href^="#jet-engine-action"][href*="event=hover"], [data-url^="#jet-engine-action"][data-url*="event=hover"]',
                init: function() {
                    var timeout = null;
                    $(document).on('click.JetSearch', this.selectorOnClick, function(event) {
                        event.preventDefault();
                        self.customUrlActions.actionHandler(event)
                    });
                    $(document).on('click.JetSearch', this.selectorOnHover, function(event) {
                        if ('A' === event.currentTarget.nodeName) {
                            event.preventDefault()
                        }
                    });
                    $(document).on({
                        'mouseenter.JetSearch': function(event) {
                            if (timeout) {
                                clearTimeout(timeout)
                            }
                            timeout = setTimeout(function() {
                                self.customUrlActions.actionHandler(event)
                            }, window.JetEngineSettings.hoverActionTimeout)
                        },
                        'mouseleave.JetSearch': function() {
                            if (timeout) {
                                clearTimeout(timeout);
                                timeout = null
                            }
                        },
                    }, this.selectorOnHover)
                },
                actions: {},
                addAction: function(name, callback) {
                    this.actions[name] = callback
                },
                actionHandler: function(event) {
                    var url = $(event.currentTarget).attr('href') || $(event.currentTarget).attr('data-url');
                    this.runAction(url)
                },
                runAction: function(url) {
                    var queryParts = url.split('&'),
                        settings = {};
                    queryParts.forEach(function(item) {
                        if (-1 !== item.indexOf('=')) {
                            var pair = item.split('=');
                            settings[pair[0]] = decodeURIComponent(pair[1])
                        }
                    });
                    if (!settings.action) {
                        return
                    }
                    var actionCb = this.actions[settings.action];
                    if (!actionCb) {
                        return
                    }
                    actionCb(settings)
                }
            };
            self.handleListingItemClick = function(event) {
                var url = $(this).data('url'),
                    target = $(this).data('target') || !1;
                if (url) {
                    event.preventDefault();
                    if (window.elementorFrontend && window.elementorFrontend.isEditMode()) {
                        return
                    }
                    if (-1 !== url.indexOf('#jet-engine-action')) {
                        self.customUrlActions.runAction(url)
                    } else {
                        if ('_blank' === target) {
                            window.open(url);
                            return
                        }
                        window.location = url
                    }
                }
            };
            $(settings.inputClass, self).on('input' + settings.searchClass, self.inputChangeHandler).on('focus' + settings.searchClass, self.focusHandler).on('blur' + settings.searchClass, self.blurHandler).on('keydown' + settings.searchClass, self.formSubmit);
            $(settings.submitClass, self).on('click' + settings.searchClass, self.clickFullResults);
            $(self).on('click' + settings.searchClass, self.formClick).on('touchend' + settings.searchClass, self.formClick).on('click' + settings.searchClass, settings.fullResultsClass, self.clickFullResults).on('click' + settings.searchClass, settings.countClass, self.clickFullResults).on('click' + settings.searchClass, settings.bulletClass, self.clickBulletHandler).on('click' + settings.searchClass, settings.numberClass, self.clickBulletHandler).on('click' + settings.searchClass, settings.prevClass + ':not( ' + settings.disableNavClass + ' )', self.clickNavigationButtonHandler).on('click' + settings.searchClass, settings.nextClass + ':not( ' + settings.disableNavClass + ' )', self.clickNavigationButtonHandler).on('click keydown' + settings.searchClass, settings.inlineSuggestionsItemClass, self.selectSuggestion).on('click keydown' + settings.searchClass, settings.resultsSuggestionItemClass, self.selectSuggestion).on('change', settings.chosenClass, self.changeHandler).on('chosen:showing_dropdown', settings.chosenClass, self.chosenFocusHandler).on('click' + settings.searchClass, '.jet-engine-listing-overlay-wrap:not([data-url*="event=hover"])', self.handleListingItemClick);
            if (!allowSubmitOnEnter) {
                $(window).keydown(function(event) {
                    if (13 === event.keyCode && event.target.className.includes('jet-ajax-search')) {
                        event.preventDefault();
                        return !1
                    }
                })
            }
            $(self).on('keydown', function(e) {
                const keyCode = e.keyCode || e.which;
                if (9 === keyCode) {
                    setTimeout(() => {
                        const focusedElement = document.activeElement;
                        if ($(focusedElement).is('.chosen-search-input')) {
                            $('.chosen-single', self).addClass('focused')
                        } else {
                            $('.chosen-single', self).removeClass('focused')
                        }
                    }, 50)
                }
            });
            $(settings.inputClass, self).on('click' + settings.searchClass, () => {
                $('.chosen-single', self).removeClass('focused')
            });
            if ('' != categoryIndex) {
                let target = $(settings.chosenClass, self),
                    globalQuerySettings = $(self).data('settings'),
                    categorySelect = $('.jet-ajax-search__categories-select', self),
                    currentCategory = '';
                categorySelect.find('option').each(function() {
                    var value = $(this).val();
                    if (value === categoryIndex) {
                        currentCategory = $(this).text()
                    }
                });
                categorySelect.find('option:contains("' + currentCategory + '")').attr('selected', 'selected');
                globalQuerySettings.category__in = target.val();
                data.category__in = target.val();
                $(self).data('settings', globalQuerySettings)
            } else {
                if ('0' !== $(settings.chosenClass, self).val()) {
                    $(settings.chosenClass, self).trigger('change')
                }
            }
            $('body').on('click' + settings.searchClass, self.hideList).on('touchend' + settings.searchClass, self.hideList);
            self.setResultsAreaWidth();
            $(window).on('resize' + settings.searchClass, self.setResultsAreaWidth)
        } else {
            return 'is init: true'
        }
    };
    $(window).on('elementor/frontend/init', JetSearch.initElementor);
    JetSearch.initBlocks();
    window.jetSearchBricks = function() {
        JetSearch.initBricks()
    }
}(jQuery))