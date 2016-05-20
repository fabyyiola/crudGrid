(function ($) {
    try {
        var cols = {
            getContent: function (column, value) {
                var res;
                res = cols.eval.html(column, value);
                if (res == false) {
                    res = cols.eval.type(column, value);
                }
                if (res == false) {
                    res = value;
                }
                var dataType = "";
                if (isSet(column.type)) {
                    dataType = "data-coltype='checkbox'";
                }
                var td = $("<td " + dataType + ">" + res + "</td>");
                if (isSet(column.css)) {
                    td.attr("style", column.css);
                }
                cols.eval.width(column, td);
                cols.eval.visible(column, td);
                if (value != null) {
                    td.attr("data-origVal", value.toString());
                } else {
                    td.attr("data-origVal", "");
                }
                return td;
            },
            evalAddRowTemplateProps: function (input, td, colProps) {
                input = $(input);
                if (isSet(colProps, "addRow.defaultValue")) {
                    if (typeof colProps.addRow.defaultValue == "function") {
                        if (input.find("input").attr("type") == "checkbox") {
                            input.prop(checked, colProps.addRow.defaultValue());
                        } else {
                            input.val(colProps.addRow.defaultValue());
                        }
                    } else {
                        if (input.find("input").attr("type") == "checkbox") {
                            input.find("input").prop("checked", colProps.addRow.defaultValue);
                        } else {
                            input.val(colProps.addRow.defaultValue);
                        }
                    }
                }
                if (isSet(colProps, "addRow.enabled")) {
                    if (colProps.addRow.enabled == false) {
                        if (input.find("input").attr("type") == "checkbox") {
                            input.find("input").prop("disabled", true);
                        } else {
                            input.attr("disabled", "true");
                        }
                    }
                }
                if (isSet(colProps, "addRow.required")) {
                    if (colProps.addRow.required == true) {
                        if (input.find("input").attr("type") != "checkbox") {
                            input.attr("required", "true");
                        }
                    }
                }
            },
            eval: {
                html: function (column, value) {
                    if (isSet(column.html)) {
                        return column.html(value);
                    } else {
                        return false;
                    }
                },
                type: function (column, value) {
                    if (isSet(column.type)) {
                        if (column.type.toUpperCase() == "BIT") {
                            if (value == true || value.toString().toUpperCase() == "TRUE" || value == 1 || value.toString() == "1") {
                                return '<div class="checkbox c-checkbox"><label><input type="checkbox" checked="" disabled><span class="fa fa-check" style="border-color: #5d9cec !important;background-color: #5d9cec !important;"></span></label></div>';
                            } else if (!(value == true || value.toString().toUpperCase() == "TRUE" || value == 1 || value.toString() == "1")) {
                                return '<div class="checkbox c-checkbox"><label><input type="checkbox" disabled><span class="fa fa-check" style="border-color: #ccc !important;background-color: white !important;"></span></label></div>';
                            }
                        } else {
                            console.log('Column type ' + column.type + ' not handled.')
                            return false;
                        }
                    } else {
                        return false;
                    }
                },
                width: function (column, td) {
                    if (isSet(column.width)) {
                        td.css("width", column.width);
                    }
                },
                visible: function (column, td) {
                    if (isSet(column.visible)) {
                        if (column.visible == false) {
                            td.css("display", "none");
                        }
                    }
                }
            }
        }
        var table = {
            evalTableProperties: function (options) {
                var tbl = options.self;
                if (isSet(options.editable)) {
                    table.editable(tbl, options);
                }
                //in case the grid is not editable check if its deletable
                if ((!isSet(options.editable)) && isSet(options.deletable)) {
                    table.editable(tbl, options, true);
                }
                if (isSet(options.addRow)) {
                    table.addRow(options);
                }
            },
            editable: function (tbl, options, onlyEditable) {
                tbl = $(tbl);
                $.each(tbl.find("tbody > tr"), function () {
                    if ($(this).hasClass("empty")) {
                        return false;
                    }
                    $(this).mouseup(function (e) {
                        self = $(this);
                        if (self.hasClass("editing")) {
                            return false;
                        }
                        tbl.find(".trEdit").detach();
                        $.each(tbl.find(".editing"), function () {
                            $(this).removeClass("editing");
                            $.each($(this).find("td"), function () {
                                var res = $(this).attr("data-origval");
                                var td = cols.getContent(options.mapping[$(this).index()], res);
                                $(this).children().detach();
                                $(this)[0].innerHTML = $(td)[0].innerHTML;
                            });
                        });
                        self.addClass("editing");
                        tbl.find("tbody > tr").css("border", "");
                        $(this).css("border", "2px solid #C7C3C3");
                        var div = $('<div class="divBtnsAction" style="margin-bottom: 21px; display: block;"></div>');
                        var btnCancel = $('<button class="btn btn-sm btn-warning gkcTblNewBtn" style="border-bottom-left-radius:0px;">Cancel</button>').click(function (e) {
                            self.css("border", "");
                            self.removeClass("editing");
                            tbl.find(".trEdit").detach();
                            $.each(self.find("td"), function () {
                                var res = $(this).attr("data-origval");
                                var td = cols.getContent(options.mapping[$(this).index()], res);
                                $(this).children().detach();
                                $(this)[0].innerHTML = $(td)[0].innerHTML;
                            });
                            e.preventDefault();
                        });
                        var btnSave = $('<button class="btn btn-sm btn-success gkcTblNewBtn btnUpdate" style="border-bottom-right-radius:0px;">Update</button>').click(function (e) {
                            if (isSet(options.onUpdate)) {
                                values = table.getRowValues(tbl, options, "UPDATE");
                                var deferred;
                                try {
                                    deferred = options.onUpdate(values);
                                } catch (ex) {
                                    console.log(ex);
                                    $(tbl).notify("Menu saved correctly.", "success");
                                }
                                if (deferred != null) {
                                    div.prepend('<div id="divWaiting" style="position: absolute;height: 31px;width: 100%;margin-top: -1px;border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;background: linear-gradient(      rgba(0, 0, 0, 0.4),       rgba(0, 0, 0, 0.4)    );text-align: center;"><i class="fa fa-spinner fa-pulse fa-fw margin-bottom" style="color: white;margin-top: 9px;"></i></div>');
                                    $.when(deferred).done(function () {
                                        $.each(self.find("td"), function () {
                                            var res = $(this).children("input").val();
                                            if ($(this).data().coltype == "checkbox") {
                                                res = $(this).find("input").prop("checked");
                                            }
                                            var td = cols.getContent(options.mapping[$(this).index()], res);
                                            $(this).attr("data-origval", res);
                                            $(this).children().detach();
                                            $(this)[0].innerHTML = $(td)[0].innerHTML;
                                        });
                                        self.css("border", "");
                                        self.removeClass("editing");
                                        tbl.find(".trEdit").detach();
                                    });
                                } else {
                                    console.log("The deferred object not being returned by onUpdate function");
                                    $(tbl).notify("Record inserted, but a problem ocured during data rendering.", { position: "bottom right", autoHide: false, clickToHide: true });
                                }
                            } else {
                                console.log('The onUpdate event is not handled.');
                                $(tbl).notify("Record unable to update. (click to close.)", { position: "bottom right", autoHide: false, clickToHide: true });
                            }
                            e.preventDefault();
                        });
                        var btnDelete = $('<button class="btn btn-sm btn-danger gkcTblNewBtn btnUpdate" style="border-radius:0px;">Delete</button>').click(function (e) {
                            if (isSet(options.onDelete)) {
                                try {
                                    options.onDelete(self);
                                }
                                catch (ex) {
                                    console.log(ex);
                                    $(tbl).notify("Record unable to delete. (click to close.)", { position: "bottom right", autoHide: false, clickToHide: true });
                                }
                            } else {
                                console.log("The event onDelete is not handled.");
                                $(tbl).notify("Record unable to delete. (click to close.)", { position: "bottom right", autoHide: false, clickToHide: true });
                            }
                            self.next().detach();
                            self.detach();
                            e.preventDefault();
                        });
                        if (onlyEditable == true) {
                            btnDelete.css("border-top-left-radius", "0px");
                            btnDelete.css("border-top-right-radius", "0px");
                            btnDelete.css("border-bottom-left-radius", "3px");
                            btnDelete.css("border-bottom-right-radius", "3px");
                            div.append(btnDelete);
                        } else {
                            if (isSet(options.deletable)) {
                                if (options.deletable) {
                                    div.append(btnSave, btnDelete, btnCancel);
                                } else {
                                    div.append(btnSave, btnCancel);
                                }
                            } else {
                                div.append(btnSave, btnCancel);
                            }
                            $.each($(this).find("td"), function () {
                                var input;
                                if ($(this).attr("data-coltype") == "checkbox") {
                                    input = $('<div class="checkbox c-checkbox"><label><input type="checkbox"><span class="fa fa-check"></span></label></div>');
                                    input.find("input").prop("checked", $(this).find("input").prop("checked"));
                                } else {
                                    input = $("<input class='form-control' type='text' style='width:100%' value='" + $(this).attr("data-origval") + "'/>");
                                }
                                $(this).children().detach();
                                $(this).text("");
                                $(this).append(input);
                            });
                        }
                        var tr = $("<tr class='trEdit' style='position: absolute;z-index: 9999;margin-top: -1px;margin-left: -2px;'></tr>");
                        tr.append($("<td style='border: none;padding: 0px;'></td>").append(div));
                        $(this).after(tr);
                        tbl.addClass("editing");
                    });
                });
            },
            getRowValues: function (tbl, options, type) {
                var values = [];
                if (type.toUpperCase() == "SAVE") {
                    $.each(tbl.find(".trAdd").find("td"), function () {
                        var res = $(this).children("input").val();
                        if ($(this).data().coltype == "checkbox") {
                            res = $(this).find("input").prop("checked");
                        }
                        values.push({ field: $(tbl.find("th:visible")[$(this).index()]).attr("data-datafield"), value: res });
                    });
                    if (isSet(options.extraParamsOnSave)) {
                        if (typeof options.extraParamsOnSave != "function") {
                            console.log("The property extraParamsOnSave should be a function.");
                            $(tbl).notify("There was a conflict with the configuration of this grid, please contact IT. (click to close.)", { position: "bottom right", autoHide: false, clickToHide: true });
                        } else {
                            values = $.merge(values, options.extraParamsOnSave())
                        }
                    }
                } else if (type.toUpperCase() == "UPDATE") {
                    $.each(tbl.find(".editing").find("td"), function () {
                        var res = $(this).children("input").val();
                        if ($(this).data().coltype == "checkbox") {
                            res = $(this).find("input").prop("checked");
                        }
                        values.push({ field: $(tbl.find("th")[$(this).index()]).attr("data-datafield"), value: res });
                    });
                    if (isSet(options.extraParamsOnUpdate)) {
                        if (typeof options.extraParamsOnUpdate != "function") {
                            console.log("The property extraParamsOnUpdate should be a function.");
                            $(tbl).notify("There was a conflict with the configuration of this grid, please contact IT. (click to close.)", { position: "bottom right", autoHide: false, clickToHide: true });
                        } else {
                            values = $.merge(values, options.extraParamsOnUpdate())
                        }
                    }
                }
                return values;
            },
            addRow: function (options) {
                tbl = $(options.self);
                tbl.css("margin-bottom", "0px");
                var colsQty = tbl.find("tr").first().find("th").length;
                var tr = $("<tr class='trAdd'></tr>");
                //New button
                var divNew = $("<div style='margin-bottom:21px'></div>").append($("<button class='btn bg-primary gkcTblNewBtn'>New</button>").click(function (e) {
                    tbl.addClass("adding");
                    tbl.find("tbody").append(tr);
                    tr.children().detach();
                    $.each(tbl.find("thead > tr").first().find("th"), function () {
                        if ($(this).css("display").toUpperCase() != "NONE") {
                            var colProps = options.mapping[$(this).index()];
                            var input;
                            var td = $("<td></td>");
                            if ($(this).data().coltype == "checkbox") {
                                td.attr("data-coltype", "checkbox");
                                input = $('<div class="checkbox c-checkbox"><label><input type="checkbox"><span class="fa fa-check"></span></label></div>');
                            } else {
                                input = $("<input class='input-sm form-control' type='text' placeholder='" + $(tbl.find("th")[$(this).index()]).text() + "' style='width:100%' value=''/>");
                            }
                            td.append(input);
                            tr.append(td);
                            cols.evalAddRowTemplateProps(input, td, colProps);
                        }
                    });
                    tbl.find("tbody").append(tr);
                    $(this).parent().css("display", "none");
                    divBtns.css("display", "block");
                    e.preventDefault();
                }));
                var divBtns = $("<div style='margin-bottom:21px'></div>");
                //Save button
                divBtns.append($("<button class='btn bg-success gkcTblNewBtn' style='border-bottom-right-radius:0px;'>Save</button>").click(function (e) {
                    var isValid = true;
                    $.each($("input[required='required']"), function () {
                        if ($(this).parsley().validate() != true) {
                            isValid = false;
                            return false;
                        }
                    })
                    if (isValid) {
                        if (isSet(options.onSave)) {
                            values = table.getRowValues(tbl, options, "Save");
                            try {
                                options.onSave(values);
                            }
                            catch (ex) {
                                console.log(ex);
                                $(options.self).notify("Record unable to save. (click to close.)", { position: "bottom right", autoHide: false, clickToHide: true });
                            }
                        } else {
                            console.log('The onSave event is not handled.');
                            $(options.self).notify("Record unable to save. (click to close.)", { position: "bottom right", autoHide: false, clickToHide: true });
                        }
                        tbl.gkcTable_('refresh');
                    }
                    e.preventDefault();
                }));
                //Cancel button
                divBtns.append($("<button class='btn bg-warning gkcTblNewBtn' style='border-bottom-left-radius:0px;'>Cancel</button>").click(function (e) {
                    tbl.find(".trAdd").detach();
                    divNew.css("display", "block");
                    divBtns.css("display", "none");
                    tbl.removeClass("adding");
                    e.preventDefault();
                }));
                //Attaching to DOM
                tbl.after(divBtns);
                tbl.after(divNew);
                divBtns.css("display", "none");
            }
        }
        var methods = {
            init: function (options) {
                options.self.children().detach();
                options.self.parent().find("div").detach();
                options.self.data('config', options);
                var wrapper = $("<div class='tblWrapper'></div>");
                options.self.after(wrapper);
                wrapper.append(options.self);
                var thead = $("<thead></thead>");
                var headers = $("<tr></tr>");
                var tbody = $("<tbody></tbody>");
                thead.append(headers);
                options.self.append(thead);
                options.self.append(tbody);
                options.self.attr("class", "table table-striped table-bordered table-hover");
                if (!isSet(options.mapping)) {
                    options.mapping = [];
                    for (var property in options.source.columns) {
                        if (options.source.columns.hasOwnProperty(property)) {
                            var map = {};
                            map.dataField = property;
                            map.colText = property;
                            options.mapping.push(map);
                        }
                    }
                }
                $.each(options.mapping, function () {
                    var th = $("<th data-datafield='" + this.dataField + "'>" + this.colText + "</th>");
                    if (isSet(this.visible)) {
                        if (this.visible == false) {
                            th.css("display", "none");
                        }
                    }
                    if (isSet(this.type)) {
                        if (this.type.toUpperCase() == "BIT") {
                            th.attr("data-coltype", "checkbox");
                        }
                    }
                    headers.append(th);
                });
                $.each(options.source.rows, function () {
                    var tr = $("<tr></tr>")
                    var row = this;
                    var columns = options.source.columns;
                    var colIndex = 0;
                    $.each(options.mapping, function () {
                        var found = false;
                        for (var property in columns) {
                            if (columns.hasOwnProperty(property)) {
                                var destiny = property;
                                var source = this.dataField;
                                if (compare(options.caseSensitive, false)) {
                                    destiny = this.dataField.toUpperCase();
                                    source = property;
                                }
                                if (source == destiny) {
                                    found = true;
                                    if (row[columns[property]] != null) {
                                        var td = cols.getContent(this, row[columns[property]]);
                                        td.attr("col", colIndex);
                                        tr.append(td);
                                    } else {
                                        tr.append("<td></td>")
                                    }
                                }
                            }
                        }
                        if (!found) {
                            if (isSet(this.dummy)) {
                                var td = cols.getContent(this, "");
                                td.attr("col", colIndex);
                                tr.append(td);
                            } else {
                                tr.append("<td><small><i>#NOTBOUND<i><small></td>");
                            }
                        }
                        colIndex += 1;
                    });
                    tbody.append(tr);
                });
                if ($(options.self).find("tbody").find("tr").length <= 0) {
                    $(options.self).find("tbody").append("<tr class='empty'><td colspan='" + $(options.self).find("th").length + "'>No Info</td></tr>");
                }
                table.evalTableProperties(options);
                if (isSet(options.afterRender)) {
                    options.afterRender.call(options.self);
                }
                return options.self;
            },
            refresh: function (options) {
                var config = $(options.self).data().config;
                if (isSet(config.onRefresh)) {
                    try {
                        var deferred = config.onRefresh();
                        if (deferred != null) {
                            $.when(deferred).done(function (response) {
                                var cols = response.data.columns;
                                response.data.columns = {};
                                var idx = 0;
                                $.each(cols, function () {
                                    response.data.columns[this.toString()] = idx;
                                    idx += 1;
                                });
                                config.source = response.data;
                                $(options.self).gkcTable_(config);
                            });
                        }
                    }
                    catch (ex) {
                        console.log(ex);
                        $(options.self).notify("Table is unable to refresh. (click to close.)", { position: "bottom right", autoHide: false, clickToHide: true });
                    }
                } else {
                    console.log('The refresh event is not handled.');
                }
            }
        }
        //******** Constructor ********\\
        $.fn.gkcTable_ = function (method, options) {
            return executePlugin(methods, method, options, this);
        };
    }
    catch (err) {
        throw err;
    }
} (jQuery));
