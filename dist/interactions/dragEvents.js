/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var DragEvents = (function () {
    function DragEvents() {
        var _this = this;
        this.handleMouseDown = function (event) {
            _this.initCoordinateData(event);
            if (_this.handler != null && _this.handler.onActivate != null) {
                var exitCode = _this.handler.onActivate(event);
                if (exitCode === false) {
                    return;
                }
            }
            _this.isActivated = true;
            event.preventDefault();
            _this.attachDocumentEventListeners();
        };
        this.handleMouseMove = function (event) {
            event.preventDefault();
            if (_this.isActivated) {
                _this.isDragging = true;
            }
            if (_this.isDragging) {
                var coords = _this.updateCoordinateData(event);
                if (_this.handler != null && _this.handler.onDragMove != null) {
                    _this.handler.onDragMove(event, coords);
                }
            }
        };
        this.handleMouseUp = function (event) {
            event.preventDefault();
            if (_this.handler != null) {
                if (_this.isDragging) {
                    var coords = _this.updateCoordinateData(event);
                    if (_this.handler.onDragMove != null) {
                        _this.handler.onDragMove(event, coords);
                    }
                    if (_this.handler.onDragEnd != null) {
                        _this.handler.onDragEnd(event, coords);
                    }
                }
                else if (_this.isActivated) {
                    if (_this.handler.onDoubleClick != null) {
                        if (_this.doubleClickTimeoutToken == null) {
                            // if this the first click of a possible double-click,
                            // we delay the firing of the click event by the
                            // timeout.
                            _this.doubleClickTimeoutToken = setTimeout(function () {
                                delete _this.doubleClickTimeoutToken;
                                if (_this.handler.onClick != null) {
                                    _this.handler.onClick(event);
                                }
                            }, DragEvents.DOUBLE_CLICK_TIMEOUT_MSEC);
                        }
                        else {
                            // otherwise, this is the second click in the double-
                            // click so we cancel the single-click timeout and
                            // fire the double-click event.
                            clearTimeout(_this.doubleClickTimeoutToken);
                            delete _this.doubleClickTimeoutToken;
                            _this.handler.onDoubleClick(event);
                        }
                    }
                    else if (_this.handler.onClick != null) {
                        _this.handler.onClick(event);
                    }
                }
            }
            _this.isActivated = false;
            _this.isDragging = false;
            _this.detachDocumentEventListeners();
        };
    }
    DragEvents.isAdditive = function (event) {
        return event.ctrlKey || event.metaKey;
    };
    DragEvents.prototype.attach = function (element, handler) {
        this.detach();
        this.handler = handler;
        this.element = element;
        if (this.isValidDragHandler(handler)) {
            this.element.addEventListener("mousedown", this.handleMouseDown);
        }
        return this;
    };
    DragEvents.prototype.detach = function () {
        if (this.element != null) {
            this.element.removeEventListener("mousedown", this.handleMouseDown);
            this.detachDocumentEventListeners();
        }
    };
    DragEvents.prototype.isValidDragHandler = function (handler) {
        return handler != null && (handler.onActivate != null
            || handler.onDragMove != null
            || handler.onDragEnd != null
            || handler.onClick != null
            || handler.onDoubleClick != null);
    };
    DragEvents.prototype.attachDocumentEventListeners = function () {
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    };
    DragEvents.prototype.detachDocumentEventListeners = function () {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    };
    DragEvents.prototype.initCoordinateData = function (event) {
        this.activationCoordinates = [event.clientX, event.clientY];
        this.lastCoordinates = this.activationCoordinates;
    };
    DragEvents.prototype.updateCoordinateData = function (event) {
        var currentCoordinates = [event.clientX, event.clientY];
        var deltaCoordinates = [
            currentCoordinates[0] - this.lastCoordinates[0],
            currentCoordinates[1] - this.lastCoordinates[1],
        ];
        var offsetCoordinates = [
            currentCoordinates[0] - this.activationCoordinates[0],
            currentCoordinates[1] - this.activationCoordinates[1],
        ];
        var data = {
            activation: this.activationCoordinates,
            current: currentCoordinates,
            delta: deltaCoordinates,
            last: this.lastCoordinates,
            offset: offsetCoordinates,
        };
        this.lastCoordinates = [event.clientX, event.clientY];
        return data;
    };
    DragEvents.DOUBLE_CLICK_TIMEOUT_MSEC = 500;
    return DragEvents;
}());
exports.DragEvents = DragEvents;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbnRlcmFjdGlvbnMvZHJhZ0V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7QUFJSDtJQUFBO1FBQUEsaUJBNEpDO1FBOUVXLG9CQUFlLEdBQUcsVUFBQyxLQUFpQjtZQUV4QyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFL0IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hELEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNyQixNQUFNLENBQUM7Z0JBQ1gsQ0FBQztZQUNMLENBQUM7WUFFRCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFDeEMsQ0FBQyxDQUFBO1FBRU8sb0JBQWUsR0FBRyxVQUFDLEtBQWlCO1lBQ3hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV2QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDM0IsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWhELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLEtBQUksQ0FBQyxPQUFPLENB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Q1QsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBM0VhLG9DQUF5QixHQUFHLEdBQUcsQ0FBQztJQTJKbEQsaUJBQUM7QUFBRCxDQTVKQSxBQTRKQyxJQUFBO0FBNUpZLGtCQUFVLGFBNEp0QixDQUFBIiwiZmlsZSI6ImludGVyYWN0aW9ucy9kcmFnRXZlbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0IHsgSUNsaWVudENvb3JkaW5hdGVzLCBJQ29vcmRpbmF0ZURhdGEsIElEcmFnSGFuZGxlciB9IGZyb20gXCIuL2RyYWdnYWJsZVwiO1xuXG5leHBvcnQgY2xhc3MgRHJhZ0V2ZW50cyB7XG4gICAgcHVibGljIHN0YXRpYyBET1VCTEVfQ0xJQ0tfVElNRU9VVF9NU0VDID0gNTAwO1xuXG4gICAgcHVibGljIHN0YXRpYyBpc0FkZGl0aXZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVyOiBJRHJhZ0hhbmRsZXI7XG4gICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIHByaXZhdGUgYWN0aXZhdGlvbkNvb3JkaW5hdGVzOiBJQ2xpZW50Q29vcmRpbmF0ZXM7XG4gICAgcHJpdmF0ZSBkb3VibGVDbGlja1RpbWVvdXRUb2tlbjogbnVtYmVyO1xuICAgIHByaXZhdGUgaXNBY3RpdmF0ZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBpc0RyYWdnaW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgbGFzdENvb3JkaW5hdGVzOiBJQ2xpZW50Q29vcmRpbmF0ZXM7XG5cbiAgICBwdWJsaWMgYXR0YWNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBoYW5kbGVyOiBJRHJhZ0hhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkRHJhZ0hhbmRsZXIoaGFuZGxlcikpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlTW91c2VEb3duKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlTW91c2VEb3duKTtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoRG9jdW1lbnRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZhbGlkRHJhZ0hhbmRsZXIoaGFuZGxlcjogSURyYWdIYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyICE9IG51bGwgJiYgKGhhbmRsZXIub25BY3RpdmF0ZSAhPSBudWxsXG4gICAgICAgICAgICB8fCBoYW5kbGVyLm9uRHJhZ01vdmUgIT0gbnVsbFxuICAgICAgICAgICAgfHwgaGFuZGxlci5vbkRyYWdFbmQgIT0gbnVsbFxuICAgICAgICAgICAgfHwgaGFuZGxlci5vbkNsaWNrICE9IG51bGxcbiAgICAgICAgICAgIHx8IGhhbmRsZXIub25Eb3VibGVDbGljayAhPSBudWxsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0dGFjaERvY3VtZW50RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLmhhbmRsZU1vdXNlVXApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGV0YWNoRG9jdW1lbnRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuaGFuZGxlTW91c2VVcCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Q29vcmRpbmF0ZURhdGEoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uQ29vcmRpbmF0ZXMgPSBbZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WV07XG4gICAgICAgIHRoaXMubGFzdENvb3JkaW5hdGVzID0gdGhpcy5hY3RpdmF0aW9uQ29vcmRpbmF0ZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVDb29yZGluYXRlRGF0YShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBjb25zdCBjdXJyZW50Q29vcmRpbmF0ZXMgPSBbZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WV07XG4gICAgICAgIGNvbnN0IGRlbHRhQ29vcmRpbmF0ZXMgPSBbXG4gICAgICAgICAgICBjdXJyZW50Q29vcmRpbmF0ZXNbMF0gLSB0aGlzLmxhc3RDb29yZGluYXRlc1swXSxcbiAgICAgICAgICAgIGN1cnJlbnRDb29yZGluYXRlc1sxXSAtIHRoaXMubGFzdENvb3JkaW5hdGVzWzFdLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBvZmZzZXRDb29yZGluYXRlcyA9IFtcbiAgICAgICAgICAgIGN1cnJlbnRDb29yZGluYXRlc1swXSAtIHRoaXMuYWN0aXZhdGlvbkNvb3JkaW5hdGVzWzBdLFxuICAgICAgICAgICAgY3VycmVudENvb3JkaW5hdGVzWzFdIC0gdGhpcy5hY3RpdmF0aW9uQ29vcmRpbmF0ZXNbMV0sXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBhY3RpdmF0aW9uOiB0aGlzLmFjdGl2YXRpb25Db29yZGluYXRlcyxcbiAgICAgICAgICAgIGN1cnJlbnQ6IGN1cnJlbnRDb29yZGluYXRlcyxcbiAgICAgICAgICAgIGRlbHRhOiBkZWx0YUNvb3JkaW5hdGVzLFxuICAgICAgICAgICAgbGFzdDogdGhpcy5sYXN0Q29vcmRpbmF0ZXMsXG4gICAgICAgICAgICBvZmZzZXQ6IG9mZnNldENvb3JkaW5hdGVzLFxuICAgICAgICB9IGFzIElDb29yZGluYXRlRGF0YTtcbiAgICAgICAgdGhpcy5sYXN0Q29vcmRpbmF0ZXMgPSBbZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WV07XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTW91c2VEb3duID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG5cbiAgICAgICAgdGhpcy5pbml0Q29vcmRpbmF0ZURhdGEoZXZlbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXIgIT0gbnVsbCAmJiB0aGlzLmhhbmRsZXIub25BY3RpdmF0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBleGl0Q29kZSA9IHRoaXMuaGFuZGxlci5vbkFjdGl2YXRlKGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChleGl0Q29kZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hEb2N1bWVudEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVNb3VzZU1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodGhpcy5pc0FjdGl2YXRlZCkge1xuICAgICAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMudXBkYXRlQ29vcmRpbmF0ZURhdGEoZXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyICE9IG51bGwgJiYgdGhpcy5oYW5kbGVyLm9uRHJhZ01vdmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlci5vbkRyYWdNb3ZlKGV2ZW50LCBjb29yZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVNb3VzZVVwID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmRzID0gdGhpcy51cGRhdGVDb29yZGluYXRlRGF0YShldmVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyLm9uRHJhZ01vdmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXIub25EcmFnTW92ZShldmVudCwgY29vcmRzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyLm9uRHJhZ0VuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlci5vbkRyYWdFbmQoZXZlbnQsIGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQWN0aXZhdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFuZGxlci5vbkRvdWJsZUNsaWNrICE9IG51bGwpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb3VibGVDbGlja1RpbWVvdXRUb2tlbiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIHRoZSBmaXJzdCBjbGljayBvZiBhIHBvc3NpYmxlIGRvdWJsZS1jbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIGRlbGF5IHRoZSBmaXJpbmcgb2YgdGhlIGNsaWNrIGV2ZW50IGJ5IHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGltZW91dC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG91YmxlQ2xpY2tUaW1lb3V0VG9rZW4gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb3VibGVDbGlja1RpbWVvdXRUb2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyLm9uQ2xpY2sgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXIub25DbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgRHJhZ0V2ZW50cy5ET1VCTEVfQ0xJQ0tfVElNRU9VVF9NU0VDKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSwgdGhpcyBpcyB0aGUgc2Vjb25kIGNsaWNrIGluIHRoZSBkb3VibGUtXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbGljayBzbyB3ZSBjYW5jZWwgdGhlIHNpbmdsZS1jbGljayB0aW1lb3V0IGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlyZSB0aGUgZG91YmxlLWNsaWNrIGV2ZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZG91YmxlQ2xpY2tUaW1lb3V0VG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZG91YmxlQ2xpY2tUaW1lb3V0VG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXIub25Eb3VibGVDbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYW5kbGVyLm9uQ2xpY2sgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXIub25DbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNBY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGV0YWNoRG9jdW1lbnRFdmVudExpc3RlbmVycygpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==