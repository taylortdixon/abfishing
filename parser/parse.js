"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var pdf_table_extractor = require("pdf-table-extractor");
var SPECIAL_BAIT_KEY = "Bait \nl = Bait \nexcept bait \nfish allowed";
var SPECIAL_TROUT_KEY = "Trout\nTotal";
var mapWaterbody = function (rowHeader, waterbodyRow, index) {
    var waterbody = lodash_1._.zipObject(rowHeader, waterbodyRow);
    var mapBaitAllowed = function (baitAllowed) {
        switch (baitAllowed) {
            case "Bait and bait\nfish allowed":
                return "yes";
            case "1":
                return "partially";
            default:
                return "no";
        }
    };
    return {
        bait_allowed: mapBaitAllowed(waterbody[SPECIAL_BAIT_KEY]),
        id: index,
        season: waterbody.Season,
        waterbody: waterbody.Waterbody,
        waterbody_detail: waterbody["Waterbody Detail"],
        fish_limits: {
            walleye: waterbody.WALL,
            northern_pike: waterbody.NRPK,
            yellow_perch: waterbody.YLPR,
            lake_trout: waterbody.LKTR,
            mountain_whitefish: waterbody.MNWH,
            cutthroat_trout: waterbody.CTTR,
            brook_trout: waterbody.BKTR,
            dolly_varden: waterbody.DLVR,
            trout_total: waterbody[SPECIAL_TROUT_KEY]
        }
    };
};
//PDF parsed
function success(result) {
    var regulations = [];
    result.pageTables.forEach(function (page) {
        var _a = page.tables, ignoreHeader = _a[0], rowHeader = _a[1], waterbodies = _a.slice(2);
        var mapped = waterbodies.map(function (waterbody, i) {
            return mapWaterbody(rowHeader, waterbody, page.page + "-" + i);
        });
        regulations = __spreadArray(__spreadArray([], regulations), mapped);
    });
    console.log(regulations);
}
//Error
function error(err) {
    console.error("Error: " + err);
}
pdf_table_extractor("regulations/ES1-Lakes.pdf", success, error);
