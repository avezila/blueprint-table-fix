/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var rect_1 = require("./common/rect");
var utils_1 = require("./common/utils");
var Locator = (function () {
    function Locator(tableElement, bodyElement, grid) {
        var _this = this;
        this.tableElement = tableElement;
        this.bodyElement = bodyElement;
        this.grid = grid;
        this.convertCellIndexToClientX = function (index) {
            var bodyRect = _this.getBodyRect();
            return bodyRect.left + _this.grid.getCumulativeWidthAt(index);
        };
        this.convertCellIndexToClientY = function (index) {
            var bodyRect = _this.getBodyRect();
            return bodyRect.top + _this.grid.getCumulativeHeightAt(index);
        };
    }
    Locator.prototype.setGrid = function (grid) {
        this.grid = grid;
    };
    Locator.prototype.getViewportRect = function () {
        return new rect_1.Rect(this.bodyElement.scrollLeft, this.bodyElement.scrollTop, this.bodyElement.clientWidth, this.bodyElement.clientHeight);
    };
    Locator.prototype.getWidestVisibleCellInColumn = function (columnIndex) {
        var cellClasses = [
            (".bp-table-cell-col-" + columnIndex),
            ".bp-table-column-name",
        ];
        var cells = this.tableElement.querySelectorAll(cellClasses.join(", "));
        var max = 0;
        for (var i = 0; i < cells.length; i++) {
            var contentWidth = utils_1.Utils.measureElementTextContent(cells.item(i)).width;
            var cellWidth = Math.ceil(contentWidth) + Locator.CELL_HORIZONTAL_PADDING * 2;
            if (cellWidth > max) {
                max = cellWidth;
            }
        }
        return max;
    };
    Locator.prototype.convertPointToColumn = function (clientX) {
        var tableRect = this.getTableRect();
        if (!tableRect.containsX(clientX)) {
            return -1;
        }
        return utils_1.Utils.binarySearch(clientX, this.grid.numCols - 1, this.convertCellIndexToClientX);
    };
    Locator.prototype.convertPointToRow = function (clientY) {
        var tableRect = this.getTableRect();
        if (!tableRect.containsY(clientY)) {
            return -1;
        }
        return utils_1.Utils.binarySearch(clientY, this.grid.numRows - 1, this.convertCellIndexToClientY);
    };
    Locator.prototype.convertPointToCell = function (clientX, clientY) {
        var col = utils_1.Utils.binarySearch(clientX, this.grid.numCols - 1, this.convertCellIndexToClientX);
        var row = utils_1.Utils.binarySearch(clientY, this.grid.numRows - 1, this.convertCellIndexToClientY);
        return { col: col, row: row };
    };
    Locator.prototype.getTableRect = function () {
        return rect_1.Rect.wrap(this.tableElement.getBoundingClientRect());
    };
    Locator.prototype.getBodyRect = function () {
        return this.unscrollElementRect(this.bodyElement);
    };
    /**
     * Subtracts the scroll offset from the element's bounding client rect.
     */
    Locator.prototype.unscrollElementRect = function (element) {
        var rect = rect_1.Rect.wrap(element.getBoundingClientRect());
        rect.left -= element.scrollLeft;
        rect.top -= element.scrollTop;
        return rect;
    };
    Locator.CELL_HORIZONTAL_PADDING = 10;
    return Locator;
}());
exports.Locator = Locator;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUdILHFCQUFxQixlQUFlLENBQUMsQ0FBQTtBQUNyQyxzQkFBc0IsZ0JBQWdCLENBQUMsQ0FBQTtBQTRCdkM7SUFHSSxpQkFDWSxZQUF5QixFQUN6QixXQUF3QixFQUN4QixJQUFVO1FBTjFCLGlCQTBGQztRQXRGZSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUN6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBMkVkLDhCQUF5QixHQUFHLFVBQUMsS0FBYTtZQUM5QyxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUE7UUFFTyw4QkFBeUIsR0FBRyxVQUFDLEtBQWE7WUFDOUMsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFBO0lBakZELENBQUM7SUFFTSx5QkFBTyxHQUFkLFVBQWUsSUFBVTtRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0saUNBQWUsR0FBdEI7UUFDSSxNQUFNLENBQUMsSUFBSSxXQUFJLENBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQ2hDLENBQUM7SUFDTixDQUFDO0lBRU0sOENBQTRCLEdBQW5DLFVBQW9DLFdBQW1CO1FBQ25ELElBQU0sV0FBVyxHQUFHO1lBQ2hCLHlCQUFzQixXQUFXLENBQUU7WUFDbkMsdUJBQXVCO1NBQzFCLENBQUM7UUFDRixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxJQUFNLFlBQVksR0FBRyxhQUFLLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMxRSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUM7WUFDaEYsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLHNDQUFvQixHQUEzQixVQUE0QixPQUFlO1FBQ3ZDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUM7UUFDRCxNQUFNLENBQUMsYUFBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTSxtQ0FBaUIsR0FBeEIsVUFBeUIsT0FBZTtRQUNwQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGFBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sb0NBQWtCLEdBQXpCLFVBQTBCLE9BQWUsRUFBRSxPQUFlO1FBQ3RELElBQU0sR0FBRyxHQUFHLGFBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUMvRixJQUFNLEdBQUcsR0FBRyxhQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0YsTUFBTSxDQUFDLEVBQUMsUUFBRyxFQUFFLFFBQUcsRUFBQyxDQUFDO0lBQ3RCLENBQUM7SUFFTyw4QkFBWSxHQUFwQjtRQUNJLE1BQU0sQ0FBQyxXQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTyw2QkFBVyxHQUFuQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7T0FFRztJQUNLLHFDQUFtQixHQUEzQixVQUE0QixPQUFvQjtRQUM1QyxJQUFNLElBQUksR0FBRyxXQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUE5RWMsK0JBQXVCLEdBQUcsRUFBRSxDQUFDO0lBeUZoRCxjQUFDO0FBQUQsQ0ExRkEsQUEwRkMsSUFBQTtBQTFGWSxlQUFPLFVBMEZuQixDQUFBIiwiZmlsZSI6ImxvY2F0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgeyBHcmlkIH0gZnJvbSBcIi4vY29tbW9uL2dyaWRcIjtcbmltcG9ydCB7IFJlY3QgfSBmcm9tIFwiLi9jb21tb24vcmVjdFwiO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9jb21tb24vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJTG9jYXRvciB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgd2lkdGggdGhhdCBhIGNvbHVtbiBtdXN0IGJlIHRvIGNvbnRhaW4gYWxsIHRoZSBjb250ZW50IG9mXG4gICAgICogaXRzIGNlbGxzIHdpdGhvdXQgdHJ1bmNhdGluZyBvciB3cmFwcGluZy5cbiAgICAgKi9cbiAgICBnZXRXaWRlc3RWaXNpYmxlQ2VsbEluQ29sdW1uOiAoY29sdW1uSW5kZXg6IG51bWJlcikgPT4gbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogTG9jYXRlcyBhIGNvbHVtbidzIGluZGV4IGdpdmVuIHRoZSBjbGllbnQgWCBjb29yZGluYXRlLiBSZXR1cm5zIC0xIGlmXG4gICAgICogdGhlIGNvb3JkaW5hdGUgaXMgbm90IG92ZXIgYSBjb2x1bW4uXG4gICAgICovXG4gICAgY29udmVydFBvaW50VG9Db2x1bW46IChjbGllbnRYOiBudW1iZXIpID0+IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIExvY2F0ZXMgYSByb3cncyBpbmRleCBnaXZlbiB0aGUgY2xpZW50IFkgY29vcmRpbmF0ZS4gUmV0dXJucyAtMSBpZlxuICAgICAqIHRoZSBjb29yZGluYXRlIGlzIG5vdCBvdmVyIGEgcm93LlxuICAgICAqL1xuICAgIGNvbnZlcnRQb2ludFRvUm93OiAoY2xpZW50WTogbnVtYmVyKSA9PiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBMb2NhdGVzIGEgY2VsbCdzIHJvdyBhbmQgY29sdW1uIGluZGV4IGdpdmVuIHRoZSBjbGllbnQgWFxuICAgICAqIGNvb3JkaW5hdGUuIFJldHVybnMgLTEgaWYgdGhlIGNvb3JkaW5hdGUgaXMgbm90IG92ZXIgYSB0YWJsZSBjZWxsLlxuICAgICAqL1xuICAgIGNvbnZlcnRQb2ludFRvQ2VsbDogKGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyKSA9PiB7Y29sOiBudW1iZXIsIHJvdzogbnVtYmVyfTtcbn1cblxuZXhwb3J0IGNsYXNzIExvY2F0b3IgaW1wbGVtZW50cyBJTG9jYXRvciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgQ0VMTF9IT1JJWk9OVEFMX1BBRERJTkcgPSAxMDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB0YWJsZUVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBwcml2YXRlIGJvZHlFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBHcmlkLFxuICAgICkge1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRHcmlkKGdyaWQ6IEdyaWQpIHtcbiAgICAgICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Vmlld3BvcnRSZWN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFJlY3QoXG4gICAgICAgICAgICB0aGlzLmJvZHlFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICAgICAgICB0aGlzLmJvZHlFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIHRoaXMuYm9keUVsZW1lbnQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICB0aGlzLmJvZHlFbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0V2lkZXN0VmlzaWJsZUNlbGxJbkNvbHVtbihjb2x1bW5JbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY2VsbENsYXNzZXMgPSBbXG4gICAgICAgICAgICBgLmJwLXRhYmxlLWNlbGwtY29sLSR7Y29sdW1uSW5kZXh9YCxcbiAgICAgICAgICAgIFwiLmJwLXRhYmxlLWNvbHVtbi1uYW1lXCIsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGNlbGxzID0gdGhpcy50YWJsZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChjZWxsQ2xhc3Nlcy5qb2luKFwiLCBcIikpO1xuICAgICAgICBsZXQgbWF4ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29udGVudFdpZHRoID0gVXRpbHMubWVhc3VyZUVsZW1lbnRUZXh0Q29udGVudChjZWxscy5pdGVtKGkpKS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxXaWR0aCA9IE1hdGguY2VpbChjb250ZW50V2lkdGgpICsgTG9jYXRvci5DRUxMX0hPUklaT05UQUxfUEFERElORyAqIDI7XG4gICAgICAgICAgICBpZiAoY2VsbFdpZHRoID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgbWF4ID0gY2VsbFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbnZlcnRQb2ludFRvQ29sdW1uKGNsaWVudFg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHRhYmxlUmVjdCA9IHRoaXMuZ2V0VGFibGVSZWN0KCk7XG4gICAgICAgIGlmICghdGFibGVSZWN0LmNvbnRhaW5zWChjbGllbnRYKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVdGlscy5iaW5hcnlTZWFyY2goY2xpZW50WCwgdGhpcy5ncmlkLm51bUNvbHMgLSAxLCB0aGlzLmNvbnZlcnRDZWxsSW5kZXhUb0NsaWVudFgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb252ZXJ0UG9pbnRUb1JvdyhjbGllbnRZOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB0YWJsZVJlY3QgPSB0aGlzLmdldFRhYmxlUmVjdCgpO1xuXG4gICAgICAgIGlmICghdGFibGVSZWN0LmNvbnRhaW5zWShjbGllbnRZKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVdGlscy5iaW5hcnlTZWFyY2goY2xpZW50WSwgdGhpcy5ncmlkLm51bVJvd3MgLSAxLCB0aGlzLmNvbnZlcnRDZWxsSW5kZXhUb0NsaWVudFkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb252ZXJ0UG9pbnRUb0NlbGwoY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY29sID0gVXRpbHMuYmluYXJ5U2VhcmNoKGNsaWVudFgsIHRoaXMuZ3JpZC5udW1Db2xzIC0gMSwgdGhpcy5jb252ZXJ0Q2VsbEluZGV4VG9DbGllbnRYKTtcbiAgICAgICAgY29uc3Qgcm93ID0gVXRpbHMuYmluYXJ5U2VhcmNoKGNsaWVudFksIHRoaXMuZ3JpZC5udW1Sb3dzIC0gMSwgdGhpcy5jb252ZXJ0Q2VsbEluZGV4VG9DbGllbnRZKTtcbiAgICAgICAgcmV0dXJuIHtjb2wsIHJvd307XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUYWJsZVJlY3QoKSB7XG4gICAgICAgIHJldHVybiBSZWN0LndyYXAodGhpcy50YWJsZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Qm9keVJlY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVuc2Nyb2xsRWxlbWVudFJlY3QodGhpcy5ib2R5RWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3VidHJhY3RzIHRoZSBzY3JvbGwgb2Zmc2V0IGZyb20gdGhlIGVsZW1lbnQncyBib3VuZGluZyBjbGllbnQgcmVjdC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVuc2Nyb2xsRWxlbWVudFJlY3QoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IFJlY3Qud3JhcChlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICAgICAgcmVjdC5sZWZ0IC09IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgICAgcmVjdC50b3AgLT0gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIHJldHVybiByZWN0O1xuICAgIH1cblxuICAgIHByaXZhdGUgY29udmVydENlbGxJbmRleFRvQ2xpZW50WCA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGJvZHlSZWN0ID0gdGhpcy5nZXRCb2R5UmVjdCgpO1xuICAgICAgICByZXR1cm4gYm9keVJlY3QubGVmdCArIHRoaXMuZ3JpZC5nZXRDdW11bGF0aXZlV2lkdGhBdChpbmRleCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb252ZXJ0Q2VsbEluZGV4VG9DbGllbnRZID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgYm9keVJlY3QgPSB0aGlzLmdldEJvZHlSZWN0KCk7XG4gICAgICAgIHJldHVybiBib2R5UmVjdC50b3AgKyB0aGlzLmdyaWQuZ2V0Q3VtdWxhdGl2ZUhlaWdodEF0KGluZGV4KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
