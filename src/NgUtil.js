/* 
 * @Author: Naga Srinivas
 * @Date Created: 24-Sep-2015
 * NgUtil will provides some utility functions to help your javascript related activities
 */
(function (pub) {

    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // Private Properties Section - START
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    /**
     * This is the abstract class to represent the Concurrency
     * @returns {NgUtil_L6.Concurrency}
     */
    function Concurrency() {
        this.events = [];
        this.completeCb;
        this._currIndex = 0;
    }
    Concurrency.prototype = {
        join: function (event) {
            var ME = this;
            ME.events.push(event);
            return this;
        },
        _onEventExecuted: function () {
        },
        _beforeEventCompleted: function () {
            var ME = this;
            ME._currIndex++;
        },
        _onEventCompleted: function () {
            var ME = this;
            ME._beforeEventCompleted();
            if (ME._currIndex < ME.events.length) {
                ME._onEventExecuted();
            }
            ME._afterEventCompleted();
        },
        _afterEventCompleted: function () {
            var ME = this;
            if (ME._currIndex === ME.events.length) {
                ME.completeCb();
            }
        },
        perform: function () {
        },
        onComplete: function (cb) {
            this.completeCb = cb;
            return this;
        }
    };

    /**
     * This class handles the Async Related Operations
     * @returns {NgUtil_L6.Async}
     */
    function Async() {
    }
    Async.prototype = new Concurrency();
    Async.prototype.constructor = Async;
    Async.prototype.perform = function () {
        var ME = this;
        for (var i = 0; i < ME.events.length; i++) {
            ME.events[i](function () {
                ME._onEventCompleted.call(ME);
            });
        }
        return this;
    };

    /**
     * This class handles the Sync Related Operations
     * @returns {NgUtil_L6.Sync}
     */
    function Sync() {
    }
    Sync.prototype = new Concurrency();
    Sync.prototype.constructor = Sync;
    Sync.prototype._onEventExecuted = function () {
        var ME = this;
        ME.events[ME._currIndex](function () {
            ME._onEventCompleted.call(ME);
        });
    };
    Sync.prototype.perform = function () {
        var ME = this;
        ME.events[0](function () {
            ME._onEventCompleted.call(ME);
        });
        return this;
    };



    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // Public Properties Section - START
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    pub.async = function () {
        return new Async();
    };
    pub.sync = function () {
        return new Sync();
    };
})(window.NgUtil = window.NgUtil || {});
