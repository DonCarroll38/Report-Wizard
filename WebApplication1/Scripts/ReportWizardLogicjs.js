
$(document).ready(function () {
    QueryString();
    LoadRecord($("#ReportID").val());

    DisableAcctButton("btnAddAcctNo");
    DisableAcctRemoveButton("btnRemoveAcctNo");
    ManageButtonsController("Multi", "selAvail", "selSelected", "btnSelectOne", "btnSelectAll", "btnUnSelectOne", "btnUnSelectAll");
    ManageButtonsController("One", "selSelOrderFrom", "selSelOrderTo", "btnSelOrderOne", "", "btnUnSelOrderOne", "");
    ManageButtonsController("Multi", "selStateAvail", "selStateSel", "btnSelectOneState", "btnSelectAllState", "btnUnSelectOneState", "btnUnSelectAllState");

    $("#btnSortOrd_Up").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
    $("#btnSortOrd_Down").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");

    $(function () {
        $("#txtFromDate").datepicker({
            changeMonth: true,
            numberOfMonths: 3,
            format: 'm/d/Y',
            date: new Date(),
            maxDate: new Date(),
            current: new Date(),
            mode: 'single',
            starts: 1,
            position: 'bottom',
            onBeforeShow: function () { },
            onChange: function (formated, dates) {
                $('#txtFromDate').val(formated);
                $('#txtFromDate').DatePickerHide();
                $('#txtFromDate').focus();
                $('#txtFromDate').change();
            },
            onClose: function (selectedDate) {
                $("#txtToDate").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#txtToDate").datepicker({
            changeMonth: true,
            numberOfMonths: 3,
            format: 'm/d/Y',
            date: new Date(),
            maxDate: new Date(),
            current: new Date(),
            mode: 'single',
            starts: 1,
            position: 'bottom',
            onBeforeShow: function () { },
            onChange: function (formated, dates) {
                $('#txtToDate').val(formated);
                $('#txtToDate').DatePickerHide();
                $('#txtToDate').focus();
                $('#txtToDate').change();
            },
            onClose: function (selectedDate) {
                $("#txtFromDate").datepicker("option", "maxDate", selectedDate);
            }
        });
    });

    //This jQuery calendar communicates with the WCF properly but it looks terrible.
    //    $('#txtFromDate').DatePicker({
    //        changeMonth: true,
    //        numberOfMonths: 3,
    //        format: 'm/d/Y',
    //        date: new Date(),
    //        maxDate: new Date(),
    //        current: new Date(),
    //        starts: 1,
    //        mode: 'single',
    //        position: 'bottom',
    //        onBeforeShow: function () { },
    //        onChange: function (formated, dates) {
    //            $('#txtFromDate').val(formated);
    //            $('#txtFromDate').DatePickerHide();
    //            $('#txtFromDate').focus();
    //            $('#txtFromDate').change();
    //        },
    //        onClose: function (selectedDate) {
    //            $("#txtToDate").datepicker("option", "minDate", selectedDate);
    //        }
    //    });

    //    $('#txtFromDate').live('keydown', function (e) {
    //        var keyCode = e.keyCode || e.which;
    //        if (keyCode == 9) {
    //            $('#txtFromDate').DatePickerHide();
    //        }
    //    });

    //    $('#txtToDate').DatePicker({
    //        changeMonth: true,
    //        numberOfMonths: 3,
    //        format: 'm/d/Y',
    //        date: new Date(),
    //        maxDate: new Date(),
    //        current: new Date(),
    //        starts: 1,
    //        mode: 'single',
    //        position: 'bottom',
    //        onBeforeShow: function () { },
    //        onChange: function (formated, dates) {
    //            $('#txtToDate').val(formated);
    //            $('#txtToDate').DatePickerHide();
    //            $('#txtToDate').focus();
    //            $('#txtToDate').change();
    //        },
    //        onClose: function (selectedDate) {
    //            $("#txtFromDate").datepicker("option", "maxDate", selectedDate);
    //        }
    //    });

    //    $('#txtToDate').live('keydown', function (e) {
    //        var keyCode = e.keyCode || e.which;
    //        if (keyCode == 9) {
    //            $('#txtToDate').DatePickerHide();
    //        }
    //    });

    EnableButton("btnSelectAll", "selSelected", "selAvail", "moveAll");

    $("#optIs_Occurring_CreateNewRpt").click(function () {
        $("#Step5_Schedule_Report_Panel").removeClass("Step5PanelHide");
        $("#RecurReport").css("display", "block");
        $("#OneTimeReport").css("display", "none");
        $("#FilterByDays_DateRange_Options_Div").css("height", "87px");
        $("#VerticalDateSelectionLine").css("height", "62px");
    });
    $("#optIs_Occurring_OneTimeRpt").click(function () {
        $("#Step5_Schedule_Report_Panel").addClass("Step5PanelHide");
        $("#RecurReport").css("display", "none");
        $("#OneTimeReport").css("display", "block");
        $("#FilterByDays_DateRange_Options_Div").css("height", "100px");
        $("#VerticalDateSelectionLine").css("height", "75px");
    });

    //$("#ModalContentControl").css("display", "none");
});

function ManageButtonsController(mode, lstFromName, lstToName, btnSelOneName, btnSelAllName, btnUnSelOneName, btnUnSelAllName) {
    var moveButtonFunctionName = "";

    if (lstFromName == "selAvail" || lstFromName == "selSelected") {
        lstFromName = "selAvail";
        lstToName = "selSelected";
        moveButtonFunctionName = "move";
    } else if (lstFromName == "selSelOrderFrom" || lstFromName == "selSelOrderTo") {
        lstFromName = "selSelOrderFrom";
        lstToName = "selSelOrderTo";
        moveButtonFunctionName = "moveSel";
    } else if (lstFromName == "selStateAvail" || lstFromName == "selStateSel") {
        lstFromName = "selStateAvail";
        lstToName = "selStateSel";
        moveButtonFunctionName = "move";
    }

    var lstFrom = document.getElementById(lstFromName);
    var lstTo = document.getElementById(lstToName);

    //mode: One=Only set the Select One item buttons, Multi=Also set the Select All buttons.
    //First check the From listbox.

    switch (CheckLstBoxItemsSelectedAndItemRowLocation(lstFrom)) {
        case "First":
        case "Last":
        case "Middle":
        case "Only One And Selected":
        case "Multi":
            EnableButton(btnSelOneName, lstFromName, lstToName, moveButtonFunctionName);
            if (mode == "Multi") { EnableButton(btnSelAllName, lstFromName, lstToName, "moveAll"); }
            break;
        case "Only One And Not Selected":
        case "None":
            DisableButton(btnSelOneName);
            if (mode == "Multi") {
                if (lstFrom.options.length == 0) { DisableButton(btnSelAllName); } else { EnableButton(btnSelAllName, lstFromName, lstToName, "moveAll"); }
            }
            break;
    }

    //Next check the To listbox.
    switch (CheckLstBoxItemsSelectedAndItemRowLocation(lstTo)) {
        case "First":
        case "Last":
        case "Middle":
        case "Only One And Selected":
        case "Multi":
            EnableButton(btnUnSelOneName, lstToName, lstFromName, moveButtonFunctionName);
            if (mode == "Multi") { EnableButton(btnUnSelAllName, lstToName, lstFromName, "moveAll"); }
            break;
        case "Only One And Not Selected":
        case "None":
            DisableButton(btnUnSelOneName);
            if (mode == "Multi") {
                if (lstTo.options.length == 0) { DisableButton(btnUnSelAllName); } else { EnableButton(btnUnSelAllName, lstToName, lstFromName, "moveAll"); }
            }
            break;
    }

    var strUpName = "";
    var strDownName = "";

    if (lstFromName == "selAvail" || lstFromName == "selSelected") {
        strUpName = "btnColListOrder_MoveUp";
        strDownName = "btnColListOrder_MoveDown";
    } else {
        strUpName = "btnPriorListOrd_Up";
        strDownName = "btnPriorListOrd_Down";
    }

    if (lstFromName != "selStateAvail" && lstFromName != "selStateSel") {
        //Next check the To listbox.
        switch (CheckLstBoxItemsSelectedAndItemRowLocation(lstTo)) {
            case "First":
                Up_Gray(strUpName);
                Down_MouseOut(strDownName, lstFromName, lstToName);
                break;
            case "Last":
                Up_MouseOut(strUpName, lstFromName, lstToName);
                Down_Gray(strDownName);
                break;
            case "Middle":
                Up_MouseOut(strUpName, lstFromName, lstToName);
                Down_MouseOut(strDownName, lstFromName, lstToName);
                break;
            case "Only One":
                Up_Gray(strUpName);
                Down_Gray(strDownName);
                break;
            case "Multi":
                Up_Gray(strUpName);
                Down_Gray(strDownName);
                break;
            case "None":
                Up_Gray(strUpName);
                Down_Gray(strDownName);
        }
    }


    //var lstFrom = document.getElementById(lstFromName);
    var lstTo = document.getElementById(lstToName);
    //var bolMulItmsSel = false;

    //intFromLen = GetLstBoxOptsTotal(lstFrom);

    ////Un select all items in the LstTo listbox.
    //UnselectAllLstBoxitems(lstTo);

    ////Check if there are multiple list items selected in the fromlistbox
    //bolMulItmsSel = AreMultipleItemsSelInLstBox(lstFrom);


    if (lstToName == "selSelOrderTo") {
        //iterate through each option of the listbox
        if (lstTo.options.length <= 0) {
            $("#btnSortOrd_Up").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
            $("#btnSortOrd_Down").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
        } else {
            for (var count = 0; count < lstTo.options.length; count++) {
                //if the option is selected, delete the option
                if (lstTo.options[count].selected == true) {
                    var option = lstTo.options[count];
                    var strText = option.text.split(" - ");
                    AscDesc(strText[1]);

                    break;
                }
            }
        }
    }
}

function EnableButton(BtnName, strJSFunctionParam1, strJSFunctionParam2, strJSFunctionParam3) {
    $("#" + BtnName).removeAttr("style").attr("onclick", "javascript:" + strJSFunctionParam3 + "('" + strJSFunctionParam1 + "','" + strJSFunctionParam2 + "');return false;").attr("Href", "#");
}

function DisableButton(BtnName) {
    $("#" + BtnName).attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
}

//Step 2 and 3: Choose Columns and setup sorting-------------------------------------------------------------------------
//Mouse Over - Change buttons to dark blue                                                                           //--
function Up_MouseOver(BtnName, strJSFunctionParam1, strJSFunctionParam2) {                                                                                  //--
    $("#" + BtnName).html("<img onmouseout='Up_MouseOut()' src='_images/ButtonUpArrow_HoverOver.jpg' />").removeAttr("style").attr("Href", "#").attr("onclick", "javascript:moveUpDown('Up','" + strJSFunctionParam1 + "','" + strJSFunctionParam2 + "');return false;");     //--
}                                                                                                                    //--
//Mouse Out - Change buttons to light blue                                                                           //--
function Up_MouseOut(BtnName, strJSFunctionParam1, strJSFunctionParam2) {                                                                                 //--
    $("#" + BtnName).html("<img onmouseover='Up_MouseOver()' src='_images/ButtonUpArrow.jpg' />").removeAttr("style").attr("Href", "#").attr("onclick", "javascript:moveUpDown('Up','" + strJSFunctionParam1 + "','" + strJSFunctionParam2 + "');return false;");             //--
}                                                                                                                    //--
//Gray - Change buttons to gray                                                                                      //--
function Up_Gray(BtnName) {                                                                                       //--
    $("#" + BtnName).html("<img src='_images/ButtonUpArrow_Gray.jpg' />").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");                                     //--
}                                                                                                                    //--
//Mouse Over - Change buttons to dark blue                                                                           //--
function Down_MouseOver(BtnName, strJSFunctionParam1, strJSFunctionParam2) {                                                                                //--
    $("#" + BtnName).html("<img onmouseout='Down_MouseOut()' src='_images/ButtonDownArrow_HoverOver.jpg' />").removeAttr("style").attr("Href", "#").attr("onclick", "javascript:moveUpDown('Down','" + strJSFunctionParam1 + "','" + strJSFunctionParam2 + "');return false;"); //--
}                                                                                                                    //--
//Mouse Out - Change buttons to light blue                                                                           //--
function Down_MouseOut(BtnName, strJSFunctionParam1, strJSFunctionParam2) {                                                                                 //--
    $("#" + BtnName).html("<img onmouseover='Down_MouseOver()' src='_images/ButtonDownArrow.jpg' />").removeAttr("style").attr("Href", "#").attr("onclick", "javascript:moveUpDown('Down','" + strJSFunctionParam1 + "','" + strJSFunctionParam2 + "');return false;");         //--
}                                                                                                                    //--
//Gray - Change buttons to gray                                                                                      //--
function Down_Gray(BtnName) {                                                                                     //--
    $("#" + BtnName).html("<img src='_images/ButtonDownArrow_Gray.jpg' />").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");                                   //--
}                                                                                                                    //--
//-----------------------------------------------------------------------------------------------------------------------

function moveUpDown(UpOrDown, lstFromName, lstToName) {
    var lstFrom = document.getElementById(lstFromName);
    var lstBoxCol = document.getElementById(lstToName);
    var lstItemText = "";
    var lstItemValue = 0;

    //iterate through each option of the listbox
    for (var count = 0; count < lstBoxCol.options.length; count++) {
        //if the option is selected, delete the option
        if (lstBoxCol.options[count].selected == true) {
            if (UpOrDown == "Up") {
                lstItemText = lstBoxCol.options[(count - 1)].text;
                lstItemValue = lstBoxCol.options[(count - 1)].value;
                lstBoxCol.options[(count - 1)].text = lstBoxCol.options[count].text;
                lstBoxCol.options[(count - 1)].value = lstBoxCol.options[count].value;
                lstBoxCol.options.selectedIndex = (count - 1)
                lstBoxCol.options[count].text = lstItemText;
                lstBoxCol.options[count].value = lstItemValue;
            } else if (UpOrDown == "Down") {
                lstItemText = lstBoxCol.options[(count + 1)].text;
                lstItemValue = lstBoxCol.options[(count + 1)].value;
                lstBoxCol.options[(count + 1)].text = lstBoxCol.options[count].text;
                lstBoxCol.options[(count + 1)].value = lstBoxCol.options[count].value;
                lstBoxCol.options.selectedIndex = (count + 1)
                lstBoxCol.options[count].text = lstItemText;
                lstBoxCol.options[count].value = lstItemValue;
            }

            break;
        }
    }

    ManageButtonsController("Multi", lstFromName, lstToName, 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');
}

//When clicking on Claim or Contract template type change the label caption of the To and From date textboxes.
function ClaimTemplateType_Selected() {
    $("#lblToDate").text("To Claim Date");
    $("#txtToDate").attr("placeholder", "Enter To Claim Date");
    $("#lblFromDate").text("From Claim Date");
    $("#txtFromDate").attr("placeholder", "Enter From Claim Date");
    //selStatus

    $("#selStatus").html("<option>Approved</option><option>Corrected</option><option>DistReview</option><option>MfgReview</option><option>Paid</option><option>PendingPay</option><option>QAReview</option><option>Rejected</option>");
}

function ContractTemplateType_Selected() {
    $("#lblToDate").text("To Purchase Date");
    $("#txtToDate").attr("placeholder", "Enter To Purchase Date");
    $("#lblFromDate").text("From Purchase Date");
    $("#txtFromDate").attr("placeholder", "Enter From Purchase Date");

    $("#selStatus").html("<option>Approved</option><option>Canceled</option><option>Pre-Bill</option><option>Billed</option><option>PendBill</option>");
}

//Step3_MoveUpDownButtons
function MoveButtons_Up_Gray(buttonDiv, BtnSectionName, BtnName) {

    $("#" + buttonDiv).html("<label for='ColListOrder'>Column List Order:</label><br /><br /><img src='_images/ButtonUpArrow_Gray.jpg' /><reference path='_images/ButtonUpArrow_Gray.jpg' /><br /><br /><a href='#' id='btnPriorListOrd_Down' class='btn btn-info btn-sm DownButton DownButtons'><img onmouseover='Down_MouseOver()' onmouseout='Down_MouseOut()' src='_images/ButtonDownArrow.jpg' /></a><br /><br />");
}

function MoveButtons_Down_Gray(buttonDiv, BtnSectionName, BtnName) {
    $("#" + buttonDiv).html("<label for='ColListOrder'>Column List Order:</label><br /><br /><a href='#' id='btnPriorListOrd_Up' class='btn btn-info btn-sm UpButton UpButtons'><img onmouseover='Up_MouseOver()' onmouseout='Up_MouseOut()' src='_images/ButtonUpArrow.jpg' /></a><br /><br /><img src='_images/ButtonDownArrow_Gray.jpg' /><br /><br />");
}

function MoveButtons_Both_Enabled(buttonDiv, BtnSectionName, BtnName) {
    $("#" + buttonDiv).html("<label for='ColListOrder'>Column List Order:</label><br /><br /><a href='#' id='btnPriorListOrd_Up' class='btn btn-info btn-sm UpButton UpButtons'><img onmouseover='Up_MouseOver()' onmouseout='Up_MouseOut()' src='_images/ButtonUpArrow.jpg' /></a><br /><br /><img src='_images/ButtonDownArrow_Gray.jpg' /><br /><br />");
}

function MoveButtons_Both_Gray(buttonDiv, BtnSectionName, BtnName) {
    $("#" + buttonDiv).html("<label for='ColListOrder'>Column List Order:</label><br /><br /><img src='_images/ButtonUpArrow_Gray.jpg' /><br /><br /><img src='_images/ButtonDownArrow_Gray.jpg' /><br /><br />");
}

function AscDesc(strAscOrDesc) {
    var lstFrom = document.getElementById("selSelOrderTo");
    var lstBoxLen = lstFrom.options.length;
    var strItemText = "";

    //iterate through each option of the listbox
    for (var count = 0; count < lstBoxLen; count++) {
        if (lstFrom.options[count].selected == true) {
            var strText = lstFrom.options[count].text.split(" - ");
            //remove the first option item in the listbox for each iteration.
            if (strAscOrDesc == "Asc") {
                lstFrom.options[count].text = strText[0] + " - Asc";
                $("#btnSortOrd_Up").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
                $("#btnSortOrd_Down").attr("style", "width:50px;font-weight:bolder;").attr("Href", "#").attr("onclick", "javascript:AscDesc('Desc');return false;");
            } else {
                lstFrom.options[count].text = strText[0] + " - Desc";
                $("#btnSortOrd_Up").attr("style", "width:50px;font-weight:bolder;").attr("Href", "#").attr("onclick", "javascript:AscDesc('Asc');return false;");
                $("#btnSortOrd_Down").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
            }
        }
    }
}

function moveAll(lstFromName, lstToName) {
    var lstFrom = document.getElementById(lstFromName);
    var lstTo = document.getElementById(lstToName);
    var lstFromOrderSel = document.getElementById("selSelOrderFrom");
    var lstToOrderSel = document.getElementById("selSelOrderTo");

    var lstBoxLen = lstFrom.options.length;

    //iterate through each option of the listbox
    for (var count = 0; count < lstBoxLen; count++) {
        //remove the first option item in the listbox for each iteration.
        var option = lstFrom.options[0];

        var newOption = document.createElement("option");
        newOption.value = option.value;
        newOption.text = option.text;
        newOption.selected = true;

        if (lstFromName == "selAvail") {
            var newOrderSelOption = document.createElement("option");
            newOrderSelOption.value = option.value;
            newOrderSelOption.text = option.text;
            newOrderSelOption.selected = true;
        }

        try {
            lstTo.add(newOption, null); //Standard
            lstFrom.remove(0, null);
            if (lstFromName == "selAvail") {
                lstFromOrderSel.add(newOrderSelOption, null);
            } //Standard
            else if (lstFromName == "selSelected") {
                lstFromOrderSel.remove(0, null);
            }
        } catch (error) {
            lstTo.add(newOption); // IE only
            lstFrom.remove(0);
            if (lstFromName == "selAvail") {
                lstFromOrderSel.add(newOrderSelOption);
            } //IE only
            else if (lstFromName == "selSelected") {
                lstFromOrderSel.remove(0);
            }
        }
    }

    //Now remove everything from the "selSelOrderTo" listbox.
    var lstBoxLen2 = lstToOrderSel.options.length;
    for (var count2 = 0; count2 < lstBoxLen2; count2++) {
        try {
            lstToOrderSel.remove(0, null);
        } catch (error) {
            lstToOrderSel.remove(0);
        }
    }

    if (lstFromName == "selAvail" || lstFromName == "selSelected") {
        ManageButtonsController("Multi", lstFromName, lstToName, 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');
        ManageButtonsController("One", "selSelOrderFrom", "selSelOrderTo", 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');
    } else if (lstFromName == "selStateAvail" || lstFromName == "selStateSel") {
        ManageButtonsController("Multi", lstFromName, lstToName, 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');
    }
}

function move(lstFromName, lstToName) { //, mode, btnSelOneName, btnSelAllName, btnUnSelOneName, btnUnSelAllName
    var lstFrom = document.getElementById(lstFromName);
    var lstTo = document.getElementById(lstToName);
    var lstFromOrderSel = document.getElementById("selSelOrderFrom");
    var lstToOrderSel = document.getElementById("selSelOrderTo");
    var bolMulItmsSel = false;
    var lstBoxItemText = "";

    intFromLen = GetLstBoxOptsTotal(lstFrom);

    //Un select all items in the LstTo listbox.
    UnselectAllLstBoxitems(lstTo);
    if (lstFromName == "selAvail") { UnselectAllLstBoxitems(lstFromOrderSel); }

    //Check if there are multiple list items selected in the fromlistbox
    bolMulItmsSel = AreMultipleItemsSelInLstBox(lstFrom);

    //iterate through each option of the listbox
    for (var count = 0; count < lstFrom.options.length; count++) {
        //if the option is selected, delete the option
        if (lstFrom.options[count].selected == true) {
            lstBoxItemText = lstFrom.options[count].text; //This is used right after the Try/Catch section below.
            var option = lstFrom.options[count];

            var newOption = document.createElement("option");
            newOption.value = option.value;
            newOption.text = option.text;
            newOption.selected = true;

            if (lstFromName == "selAvail") {
                var newOrderSelOption = document.createElement("option");
                newOrderSelOption.value = option.value;
                newOrderSelOption.text = option.text;
                newOrderSelOption.selected = true;
            }

            try {
                lstTo.add(newOption, null); //Standard
                lstFrom.remove(count, null);
                if (lstFromName == "selAvail") {
                    lstFromOrderSel.add(newOrderSelOption, null);
                } //Standard
            } catch (error) {
                lstTo.add(newOption); // IE only
                lstFrom.remove(count);
                if (lstFromName == "selAvail") {
                    lstFromOrderSel.add(newOrderSelOption);
                } //IE only
            }

            if (lstFromName == "selSelected") {
                for (var count2 = 0; count2 < lstFromOrderSel.options.length; count2++) {
                    if (lstFromOrderSel.options[count2].text == lstBoxItemText) {
                        try {
                            lstFromOrderSel.remove(count2, null);
                        } catch (error) {
                            lstFromOrderSel.remove(count2);
                        }
                    }
                }

                for (var count3 = 0; count3 < lstToOrderSel.options.length; count3++) {
                    var strText = lstToOrderSel.options[count3].text.split(" - ");
                    if (strText[0] == lstBoxItemText) {
                        try {
                            lstToOrderSel.remove(count3, null);
                        } catch (error) {
                            lstToOrderSel.remove(count3);
                        }
                    }
                }
            }

            intFromLen--;

            //If there is only one item selected in the from listbox then go into this if statement below and reselect the same index or the previous index if the current index is greater than the total items in the listbox.
            if (bolMulItmsSel == false) {
                //Check if the current From option item is the last one in the listbox.  If its greater than the total listbox length variable 'intFromLen' then it is the last one.
                if (count >= intFromLen) {
                    if ((count - 1) < 0) { count = 1 };
                    if (lstFromName == "selAvail" || lstFromName == "selStateAvail") {
                        lstFrom.options.selectedIndex = (count - 1);
                    } else {
                        lstFrom.options.selectedIndex = (count - 1);
                        lstFromOrderSel.options.selectedIndex = (count - 1);
                    }
                }
                else {
                    if (lstFromName == "selAvail" || lstFromName == "selStateAvail") {
                        lstFrom.options.selectedIndex = count;
                    } else {
                        lstFrom.options.selectedIndex = count;
                        lstFromOrderSel.options.selectedIndex = count;
                    }
                }
            }
            else {
                count--;
            }
        }
    }

    if (lstFromName == "selAvail") {
        ManageButtonsController("Multi", lstFromName, lstToName, 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');
        ManageButtonsController("One", "selSelOrderFrom", "selSelOrderTo", 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');
    } else if (lstFromName == "selSelected") {
        ManageButtonsController("Multi", lstToName, lstFromName, 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');
        ManageButtonsController("One", "selSelOrderFrom", "selSelOrderTo", 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');
    } else if (lstFromName == "selStateAvail") {
        ManageButtonsController("Multi", lstFromName, lstToName, 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');
    } else if (lstFromName == "selStateSel") {
        ManageButtonsController("Multi", lstToName, lstFromName, 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');
    }
}

function moveSel(lstFromName, lstToName) { //, mode, btnSelOneName, btnSelAllName, btnUnSelOneName, btnUnSelAllName
    var lstFrom = document.getElementById(lstFromName);
    var lstTo = document.getElementById(lstToName);
    var bolMulItmsSel = false;

    intFromLen = GetLstBoxOptsTotal(lstFrom);

    //Un select all items in the LstTo listbox.
    UnselectAllLstBoxitems(lstTo);

    //Check if there are multiple list items selected in the fromlistbox
    bolMulItmsSel = AreMultipleItemsSelInLstBox(lstFrom);

    //iterate through each option of the listbox
    for (var count = 0; count < lstFrom.options.length; count++) {
        //if the option is selected, delete the option
        if (lstFrom.options[count].selected == true) {
            var option = lstFrom.options[count];

            var newOption = document.createElement("option");
            newOption.value = option.value;
            if (lstFromName == "selSelOrderFrom") {
                newOption.text = option.text + " - Asc";
                $("#btnSortOrd_Up").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
                $("#btnSortOrd_Down").attr("style", "width:50px;font-weight:bolder;").attr("Href", "#").attr("onclick", "javascript:AscDesc('Desc');return false;");
            } else if (lstFromName == "selSelOrderTo") {
                var strText = option.text.split(" - ");
                newOption.text = strText[0];

                if (lstFrom.options.length <= 1) {
                    $("#btnSortOrd_Up").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
                    $("#btnSortOrd_Down").attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;").removeAttr("onclick").removeAttr("Href");
                }
            }
            newOption.selected = true;

            try {
                lstTo.add(newOption, null); //Standard
                lstFrom.remove(count, null);
            } catch (error) {
                lstTo.add(newOption); // IE only
                lstFrom.remove(count);
            }

            intFromLen--;

            //If there is only one item selected in the from listbox then go into this if statement below and reselect the same index or the previous index if the current index is greater than the total items in the listbox.
            if (bolMulItmsSel == false) {
                //Check if the current From option item is the last one in the listbox.  If its greater than the total listbox length variable 'intFromLen' then it is the last one.
                if (count >= intFromLen) {
                    if ((count - 1) < 0) { count = 1 };
                    lstFrom.options.selectedIndex = (count - 1);
                }
                else {
                    lstFrom.options.selectedIndex = count;
                }
            }
            else {
                count--;
            }
        }
    }

    ManageButtonsController("One", lstFromName, lstToName, 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');
}

function ChangeSchType(intRecur_Option) {
    switch (intRecur_Option) {
        case 1:
            $("#Type_Day").css("display", "inline");
            $("#Type_Week").css("display", "none");
            $("#Type_Month").css("display", "none");
            break;
        case 2:
            $("#Type_Day").css("display", "none");
            $("#Type_Week").css("display", "inline");
            $("#Type_Month").css("display", "none");
            break;
        case 3:
            $("#Type_Day").css("display", "none");
            $("#Type_Week").css("display", "none");
            $("#Type_Month").css("display", "inline");
            break;
    }
}

function DateRangeType(intType) {
    switch (intType) {
        case 1:
            $("#divChooseDateRange").css("display", "inline");
            $("#divEnterDateRange").css("display", "none");
            break;
        case 2:
            $("#divChooseDateRange").css("display", "none");
            $("#divEnterDateRange").css("display", "inline");
            break;
    }
}

function AddAcctNos() {
    var lstAccts = document.getElementById("selAccounts");
    var AcctNo = document.getElementById("txtAccountNo").value;
    var bolFound = false;

    var newOption = document.createElement("option");
    newOption.value = AcctNo;
    newOption.text = AcctNo;

    //Deselect all items in the listbox
    for (var count = 0; count < lstAccts.options.length; count++) {
        if (lstAccts.options[count].selected == true) {
            lstAccts.options[count].selected = false;
        }
    }

    for (var count = 0; count < lstAccts.options.length; count++) {
        if (lstAccts.options[count].text == AcctNo) {
            bolFound = true;
            lstAccts.options[count].selected = true;
            EnableAcctRemoveButton("btnRemoveAcctNo")
        }
    }

    if (bolFound == false) {
        try {
            lstAccts.add(newOption, 0); //Standard
        } catch (error) {
            lstAccts.add(newOption); // IE only
        }

        newOption.selected = true;
        EnableAcctRemoveButton("btnRemoveAcctNo")
    }

    document.getElementById("txtAccountNo").value = "";
    document.getElementById("txtAccountNo").focus();
}

function EnableOrDisableByAcctTextbox() {
    if (document.getElementById("txtAccountNo").value == "") {
        DisableAcctButton("btnAddAcctNo");
    } else {
        EnableAcctButton("btnAddAcctNo");
    }
}

function EnableAcctButton(BtnName) {
    $("#" + BtnName).attr("style", "position:relative;top:1px;text-align:center;width:70px;").attr("onclick", "javascript:AddAcctNos();return false;").attr("Href", "#");
}

function DisableAcctButton(BtnName) {
    $("#" + BtnName).attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;position:relative;top:1px;text-align:center;width:70px;").removeAttr("onclick").removeAttr("Href");
}

function RemoveAcctNos() {
    var lstAccts = document.getElementById("selAccounts");

    for (var count = 0; count < lstAccts.options.length; count++) {
        if (lstAccts.options[count].selected == true) {

            try {
                lstAccts.remove(count, null); //Standard
            } catch (error) {
                lstAccts.remove(count); // IE only
            }

            count--;
        }
    }

    DisableAcctRemoveButton("btnRemoveAcctNo");
}

function selAccounts_OnClick() {
    var lstAccts = document.getElementById("selAccounts");
    var bolFound = false;

    for (var count = 0; count < lstAccts.options.length; count++) {
        if (lstAccts.options[count].selected == true) {
            bolFound = true;
        }
    }

    if (bolFound == true) {
        EnableAcctRemoveButton("btnRemoveAcctNo");
    } else {
        DisableAcctRemoveButton("btnRemoveAcctNo");
    }
}

function EnableAcctRemoveButton(BtnName) {
    $("#" + BtnName).attr("style", "position:relative;top:1px;text-align:center;width:70px;").attr("onclick", "RemoveAcctNos();").attr("Href", "#");
}

function DisableAcctRemoveButton(BtnName) {
    $("#" + BtnName).attr("style", "background-color:rgb(215,214,212);border-color:rgb(178,178,178);cursor:default;position:relative;top:1px;text-align:center;width:70px;").removeAttr("onclick").removeAttr("Href");
}

function GetLstBoxOptsTotal(lstBoxObj) {
    for (var i = 0; i < lstBoxObj.options.length; i++) {
        i++;
    }

    return (i - 1);
}

function AreMultipleItemsSelInLstBox(lstBoxObj) {
    var bolOptSel = false;
    var bolMulSel = false;

    for (var i = 0; i < lstBoxObj.options.length; i++) {
        if (lstBoxObj.options[i].selected == true) {
            if (bolOptSel == false) {
                bolOptSel = true;
            }
            else if (bolOptSel == true) {
                bolMulSel = true;
            }
        }
    }

    return bolMulSel;
}

function UnselectAllLstBoxitems(lstBoxObj) {
    for (var i = 0; i < lstBoxObj.options.length; i++) {
        if (lstBoxObj.options[i].selected == true) {
            lstBoxObj.options[i].selected = false;
        }
    }
}

function CheckLstBoxItemsSelectedAndItemRowLocation(lstBoxObj) {
    var SelCount = 0;
    var strRowLocSel = "";

    for (var i = 0; i < lstBoxObj.options.length; i++) {
        if (lstBoxObj.options[i].selected == true) {
            SelCount++;
            if (i == 0) {
                strRowLocSel = "First";
            }
            else if (i == (lstBoxObj.options.length - 1)) {
                strRowLocSel = "Last";
            }
            else {
                strRowLocSel = "Middle";
            }
        }
    }

    if (i == 1) {
        if (strRowLocSel == "") {
            strRowLocSel = "Only One And Not Selected";
        } else {
            strRowLocSel = "Only One And Selected";
        }
    }
    else if (SelCount > 1) {
        strRowLocSel = "Multi";
    }
    else if (SelCount == 0) {
        strRowLocSel = "None";
    }

    //return selcount + ":" + strRowLocSel;
    return strRowLocSel;
}

function testAfunction() {
    var lstBoxObj = document.getElementById("selSelected");
    var response = CheckLstBoxItemsSelectedAndItemRowLocation(lstBoxObj);

    alert(response);
}

function testAlert() {
    //alert("display = " + $("#TestAlert").css("display"));
    if ($("#TestAlert").css("display") == "none") {
        $("#TestAlert").css("display", "inline");
    } else {
        $("#TestAlert").css("display", "none");
    }
}

function SaveMessage(bolSuccess, message) {
    if (bolSuccess == true) {
        $("#SaveContainer").html("<div class='alert alert-success' id='SaveAlertSuccess' style='font-size:small' role='alert'>The report has been saved successfully!</div>");

        bootbox.alert("The report has been saved successfully!<br /><br />You will now be taken back to the report home page.", function () {
            btnCloseRptWizard_click();
        });

    } else {
        $("#SaveContainer").html("<div class='alert alert-danger' id='SaveAlertError' style='font-size:small' role='alert'>An error has occurred and the report wasn't saved!<br /><br />" + message + "</div>");

        bootbox.alert("An error has occurred and the report wasn't saved!<br /><br />" + message);
    }
}

//        function CheckForQuestionMark(StringText) {
//            var strText = 
//            for (var count = 0; count < StringText.length; count++) {
//                //if the option is selected, delete the option
//                if (lstTo.options[count].selected == true) {
//                    var option = lstTo.options[count];
//                    var strText = option.text.split(" - ");
//                    AscDesc(strText[1]);

//                    break;
//                }
//            }
//        }

function QueryString() {
    var inStr = 0;
    var ReportIDValue = 0;
    var hrefQS = window.location.href;
    inStr = hrefQS.indexOf("?");
    if (inStr > 0) {
        var QueryStringSection = hrefQS.split("?");

        inStr = QueryStringSection[1].search("=");
        if (inStr > 0) {
            var ReportIDQS = QueryStringSection[1].split("=");
            var ReportIDQSString = ReportIDQS[1];

            if (ReportIDQS[0] == "ReportID") {
                inStr = ReportIDQSString.search("#");
                if (inStr > 0) {
                    ReportIDValue = ReportIDQSString.slice(0, inStr);
                } else {
                    ReportIDValue = ReportIDQSString;
                }
            } else {
                ReportIDValue = "0";
            }
        } else {
            ReportIDValue = "0";
        }
    } else {
        ReportIDValue = "0";
    }

    $("#ReportID").val(ReportIDValue);
}



function LoadRecord(ReportID) {
    //bootbox.alert("<div class='fa fa-spinner fa-spin'>Loading Record</div>");
    //            bootbox.dialog({
    //                title: "Loading Data",
    //                message: "<div class='modal-dialog modal-sm' style='width:50px;'> <div class='modal-content' id='ModalContentControl'>Loading Record</div></div>"
    //            });

    if (ReportID == "0") {
        $("#ReportID").val("0");

        var optRadio = document.getElementById("optChooseDateRange");
        optRadio.checked = true;
        DateRangeType(1); //1=Set previous number of days;2=Enter in a date range.

        //$("#optTemplate_id_Claim").checked(true);
        var optRadio = document.getElementById("optTemplate_id_Claim");
        optRadio.checked = true;

        $("#Type_Day").css("display", "inline"); //This means the Schedule by Daily is going to be selected and visible to the user in the 5th panel section.
    } else {
        $("#collapse1").addClass("in");
        $("#collapse2").addClass("in");
        $("#collapse3").addClass("in");
        $("#collapse4").addClass("in");
        $("#collapse5").addClass("in");

        RetrieveReportRequest($("#ReportID").val());
    }
}

function testAlertBootBox() {
    bootbox.alert("The report has been saved successfully!");

    //            bootbox.alert("Hello world!", function () {
    //                Example.show("Hello world callback");
    //            });
}

function btnCloseRptWizard_click() {
    window.location.replace("default.aspx");
}

function TestMovingUp() {
    var lstToBox = document.getElementById("selSelected");
    $("#selSelected").html("<option value='1'>Claim #</option><option value='2'>Claim Type</option><option value='4'>Submit Date</option>")
    lstToBox.selectedIndex = 1;
}

//        function TestingThisConfirmButton() {
//            bootbox.confirm("Are you sure?", function (result) {
//                //Example.show("Confirm result: " + result);
//                alert(result);

//                if (result == true) {
//                    alert("You selected Yes!");
//                } else if (result == false) {
//                    alert("You selected No!");
//                }
//            });
//        }
