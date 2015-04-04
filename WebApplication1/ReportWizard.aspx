<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="ReportWizard.aspx.cs" Inherits="WebApplication1._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
   <link href="_css/style.css" rel="stylesheet" type="text/css" />
    <link href="_css/stylePopUp.css" rel="stylesheet" type="text/css" />
    <link href="_css/datepicker.css" rel="stylesheet" type="text/css" />
    <link href="_css/jquery-ui-1.8.14.custom.css" rel="stylesheet" type="text/css"
        media="screen" />
    <link href="_css/CustomReportsSyles/ReportHistory.css" rel="Stylesheet" type="text/css" />
    <!--<link href="_css/bootstrap.min.css" rel="Stylesheet" type="text/css" />
    <link href="_css/bootstrap-responsive.min.css" rel="Stylesheet" type="text/css" />-->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
    
    <script type="text/javascript" language="javascript">
        var WebServiceServer = '<%=ConfigurationManager.AppSettings["WebServiceServer"]%>';
        var local = Boolean('<%=ConfigurationManager.AppSettings["local"]%>');
        var showerror = Boolean('<%=ConfigurationManager.AppSettings["showerror"]%>');
        var debugging = Boolean('<%=ConfigurationManager.AppSettings["debugging"]%>');
    </script>

    <script type="text/javascript" src="Scripts/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="Scripts/jquery-ui-1.8.4.custom.min.js"></script>
    <script src="Scripts/ReportWizardLogicjs.js" type="text/javascript"></script>
    <script type="text/javascript" src="Scripts/bootbox.min.js"></script>
    <script type="text/javascript" src="Scripts/datepicker.js"></script>
 </asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    <span class="divider-big"></span>
    <div class="fields-container">
        <div class="container">
            <div style="text-align: center;" class="head">
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Report Builder Wizard
                </h2>
            </div>
            <br />
            <br />
            <form role="form">
            <span class="icon-customer-information"></span>
            <div class="form-option" style="width: 75%;" runat="server" id="Distpanel">
                <br />
                <h2 style="text-align: center;">
                    Create New Report</h2>
                <br />
                <input type="text" id="ReportID" value="0" style="display:none;" />
                <input type="text" id="PartnerID" value="0" style="display:none;" />
                <div class="panel-group" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title" style="width: 100%; height: 100%;">
                                <a data-toggle="collapse" style="font-size: large;" data-parent="#accordion" href="#collapse1">
                                    Step 1: Template Type and Report Name
                                </a>
                            </h4>
                        </div>
                        <div id="collapse1" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                        <div class="col-sm-4 col-md-4 col-lg-4" style="border-radius: 15px; background-color: rgb(252,252,252);
                                            border: 1px solid rgb(204,204,204);">
                                            <div class="radio">
                                                <label>
                                                    <input id="optIs_Occurring_CreateNewRpt" type="radio" name="optRptType" />Create
                                                    New Recurring Report</label>
                                            </div>
                                            <div class="radio">
                                                <label>
                                                    <input id="optIs_Occurring_OneTimeRpt" type="radio" name="optRptType" />Create New
                                                    One Time Report</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                        <div class="col-sm-4 col-md-4 col-lg-4" style="border-radius: 15px; background-color: rgb(252,252,252);
                                            border: 1px solid rgb(204,204,204);">
                                            <div class="radio">
                                                <label>
                                                    <input onclick="ClaimTemplateType_Selected()" id="optTemplate_id_Claim" type="radio"
                                                        value="1" name="optTemplateType" />Claim</label>
                                            </div>
                                            <div class="radio">
                                                <label>
                                                    <input onclick="ContractTemplateType_Selected()" id="optTemplate_id_Contract" type="radio"
                                                        value="2" name="optTemplateType" />Service Contract Detail</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                        <div class="col-sm-10 col-md-10 col-lg-10">
                                            <label for="txtRptName">
                                                Report Name:</label>
                                            <input type="text" maxlength="40" class="form-control" id="txtRptName" placeholder="New Report Name Goes Here..." />
                                        </div>
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" style="width: 100%; height: 100%; font-size: large;" data-parent="#accordion"
                                    href="#collapse2">Step 2: Choose Columns</a>
                            </h4>
                        </div>
                        <div id="collapse2" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="form-group">
                                    &nbsp;
                                    <table>
                                        <tr style="background-color: white;">
                                            <td style="width: 165px;">
                                                <label class="ControlTitles" for="selAvail">
                                                    Available Columns:</label>
                                                <select multiple class="form-control" style="width: 250px; height: 315px;" id="selAvail"
                                                    onkeydown="ManageButtonsController('Multi', 'selAvail', 'selSelected', 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');"
                                                    onkeyup="ManageButtonsController('Multi', 'selAvail', 'selSelected', 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');"
                                                    onclick="ManageButtonsController('Multi', 'selAvail', 'selSelected', 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');">
                                                    <option>Column1</option>
                                                    <option>House</option>
                                                    <option>Level</option>
                                                    <option>floor</option>
                                                    <option>inside</option>
                                                    <option>outside</option>
                                                    <option>flow</option>
                                                    <option>hello</option>
                                                    <option>work</option>
                                                    <option>delegate</option>
                                                    <option>persuasion</option>
                                                    <option>x-ray</option>
                                                    <option>wheels</option>
                                                    <option>night</option>
                                                    <option>Over The Hill</option>
                                                    <option>oops</option>
                                                    <option>nation</option>
                                                    <option>conspiracy</option>
                                                    <option>leftovers</option>
                                                    <option>down</option>
                                                    <option>up</option>
                                                    <option>forget</option>
                                                    <option>flying</option>
                                                    <option>book</option>
                                                    <option>Watch Out</option>
                                                    <option>Nose</option>
                                                    <option>mouth</option>
                                                    <option>afternoon</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div>
                                                    &nbsp;&nbsp;&nbsp;<a id="btnSelectOne" onclick="javascript:move('selAvail','selSelected');return false;"
                                                        href="#" class="btn btn-info btn-sm SelectButtons">&nbsp;&gt;&nbsp;</a>&nbsp;&nbsp;&nbsp;
                                                    <br />
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp;<a id="btnSelectAll" onclick="javascript:moveAll('selAvail','selSelected');return false;"
                                                        href="#" class="btn btn-info btn-sm SelectButtons">&gt;&gt;</a>&nbsp;&nbsp;&nbsp;
                                                    <br />
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp;<a id="btnUnSelectOne" onclick="javascript:move('selSelected','selAvail');return false;"
                                                        href="#" class="btn btn-info btn-sm SelectButtons">&nbsp;&lt;&nbsp;</a>&nbsp;&nbsp;&nbsp;
                                                    <br />
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp;<a id="btnUnSelectAll" onclick="javascript:moveAll('selSelected','selAvail');return false;"
                                                        href="#" class="btn btn-info btn-sm SelectButtons">&lt;&lt;</a>&nbsp;&nbsp;&nbsp;
                                                </div>
                                            </td>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;
                                                <div style="border-radius: 10px; width: 420px; background-color: rgb(252,252,252);
                                                    border: 1px solid rgb(204,204,204); top: 0px; height: 390px;">
                                                    &nbsp;&nbsp
                                                    <table style="width: 250px; height: 250px;">
                                                        <tr style="background-color: rgb(252,252,252);">
                                                            <td style="width: 160px;">
                                                                <div style="padding-top: 15px; height: 250px; left: 30px;">
                                                                    <label class="ControlTitles" style="position: relative; top: -20px;" for="selSelected">
                                                                        Selected Columns:</label>
                                                                    <select multiple class="form-control" style="position: relative; top: -20px; width: 250px;
                                                                        height: 315px;" id="selSelected" onkeydown="ManageButtonsController('Multi', 'selAvail', 'selSelected', 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');"
                                                                        onkeyup="ManageButtonsController('Multi', 'selAvail', 'selSelected', 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');"
                                                                        onclick="ManageButtonsController('Multi', 'selAvail', 'selSelected', 'btnSelectOne', 'btnSelectAll', 'btnUnSelectOne', 'btnUnSelectAll');">
                                                                    </select>
                                                                    <br />
                                                                </div>
                                                            </td>
                                                            <td style="width: 0px;">
                                                                <div id="ColListOrderButtons" style="position: relative; top: -30px; width: 130px;
                                                                    left: 15px; background-color: transparent;">
                                                                    <label class="ControlTitles" for="ColListOrder">
                                                                        Column List Order:</label><br />
                                                                    <br />
                                                                    <a id="btnColListOrder_MoveUp" style="background: rgb(214,214,214); border: rgb(214,214,214);padding:0px 0px 0px 0px;"
                                                                        class="btn btn-info btn-sm UpButton UpButtons">
                                                                        <img src="_images/ButtonUpArrow_Gray.jpg" /></a><br />
                                                                    <br />
                                                                    <a id="btnColListOrder_MoveDown" style="background: rgb(214,214,214); border: rgb(214,214,214);padding:0px 0px 0px 0px;"
                                                                        class="btn btn-info btn-sm DownButton DownButtons">
                                                                        <img src="_images/ButtonDownArrow_Gray.jpg" /></a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" style="width: 400px; height: 40px; font-size: large;" data-parent="#accordion"
                                    href="#collapse3">Step 3: Sort Order of Selected Columns</a>
                            </h4>
                        </div>
                        <div id="collapse3" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="form-group">
                                    &nbsp;
                                    <table>
                                        <tr style="background-color: white;">
                                            <td>
                                                <label class="ControlTitles" style="position: relative; top: -10px;" for="selSelOrderBy">
                                                    Selected Columns:</label>
                                                <select multiple class="form-control" style="height: 315px; position: relative; top: -10px;"
                                                    id="selSelOrderFrom" onkeydown="ManageButtonsController('One', 'selSelOrderFrom', 'selSelOrderTo', 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');"
                                                    onkeyup="ManageButtonsController('One', 'selSelOrderFrom', 'selSelOrderTo', 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');"
                                                    onclick="ManageButtonsController('One', 'selSelOrderFrom', 'selSelOrderTo', 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');">
                                                </select>
                                            </td>
                                            <td>
                                                <div>
                                                    &nbsp;&nbsp;&nbsp;<a href="#" style="color:White;font-weight:bold;" onclick="javascript:moveSel('selSelOrderFrom','selSelOrderTo');return false;"
                                                        id="btnSelOrderOne" class="btn btn-info btn-sm SelectButtons">&nbsp;&gt;&nbsp;</a>&nbsp;&nbsp;&nbsp;
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    &nbsp;&nbsp;&nbsp;<a href="#" style="color:White;font-weight:bold;" onclick="javascript:moveSel('selSelOrderTo','selSelOrderFrom');return false;"
                                                        id="btnUnSelOrderOne" class="btn btn-info btn-sm SelectButtons">&nbsp;&lt;&nbsp;</a>&nbsp;&nbsp;&nbsp;
                                                </div>
                                            </td>
                                            <td>
                                                <div style="border-radius: 10px; width: 420px; background-color: rgb(252,252,252);
                                                    border: 1px solid rgb(204,204,204); top: -50px; height: 300px;">
                                                    &nbsp;&nbsp
                                                    <table style="width: 250px; height: 175px;">
                                                        <tr style="background-color: rgb(252,252,252);">
                                                            <td style="width: 160px;">
                                                                <div style="position: relative; padding-top: 15px; height: 175px; left: 20px; top: -25px;">
                                                                    <label class="ControlTitles" style="position: relative; top: -10px;" for="selSelOrderTo">
                                                                        Sort By:</label>
                                                                    <select multiple class="form-control" style="position: relative; top: -10px; width: 250px;
                                                                        height: 175px;" id="selSelOrderTo" onkeydown="ManageButtonsController('One', 'selSelOrderFrom', 'selSelOrderTo', 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');"
                                                                        onkeyup="ManageButtonsController('One', 'selSelOrderFrom', 'selSelOrderTo', 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');"
                                                                        onclick="ManageButtonsController('One', 'selSelOrderFrom', 'selSelOrderTo', 'btnSelOrderOne', '', 'btnUnSelOrderOne', '');">
                                                                    </select>
                                                                    <br />
                                                                </div>
                                                            </td>
                                                            <td style="width: 0px;">
                                                                <div style="position: relative; top: -10px; width: 130px; left: 15px; background-color: transparent;">
                                                                    <label class="ControlTitles" for="PriorityListOrder">
                                                                        Priority List<br />
                                                                        Order:</label><br />
                                                                    <a href="#" id="btnPriorListOrd_Up" style="background: rgb(214,214,214);" class="btn btn-info btn-sm UpButton UpButtons">
                                                                        <img src="_images/ButtonUpArrow_Gray.jpg" /></a><br />
                                                                    <br />
                                                                    <a href="#" id="btnPriorListOrd_Down" style="background: rgb(214,214,214);" class="btn btn-info btn-sm DownButton DownButtons">
                                                                        <img src="_images/ButtonDownArrow_Gray.jpg" /></a><br />
                                                                    <br />
                                                                    <label class="ControlTitles" for="SortOrder">
                                                                        Sort Order:</label><br />
                                                                    <a href="#" id="btnSortOrd_Up" onclick="javascript:AscDesc('Asc');return false;"
                                                                        style="width: 50px; font-weight: bolder;color:White;font-weight:bold;" class="btn btn-info btn-sm">Asc</a><br />
                                                                    <br />
                                                                    <a href="#" id="btnSortOrd_Down" onclick="javascript:AscDesc('Desc');return false;"
                                                                        style="width: 50px; font-weight: bolder;color:White;font-weight:bold;" class="btn btn-info btn-sm">Desc</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" style="width: 400px; height: 40px; font-size: large;" data-parent="#accordion"
                                    href="#collapse4">Step 4: Filter By</a>
                            </h4>
                        </div>
                        <div id="collapse4" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                        <div class="col-sm-6 col-md-6 col-lg-6">
                                            <div class="container-fluid">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-sm-12 col-md-12 col-lg-12" style="border-radius: 15px; background-color: rgb(252,252,252);
                                                            border: 1px solid rgb(204,204,204);">
                                                            <div class="container-fluid">
                                                                <div class="form-group">
                                                                    <div class="row">
                                                                        <div class="col-sm-12 col-md-12 col-lg-12">
                                                                            <label class="ControlTitles" for="txtAccountNo" id="lblAccountNo" style="visibility:hidden;">
                                                                                Account #:</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-sm-9 col-md-9 col-lg-9" style="height: 54px;">
                                                                            <input type="text" class="form-control" style="position:relative;top:-10px;" onkeydown="EnableOrDisableByAcctTextbox();"
                                                                                id="txtAccountNo" placeholder="Enter Account #" />
                                                                        </div>
                                                                        <div class="col-sm-3 col-md-3 col-lg-3" style="height: 54px;">
                                                                            <a id="btnAddAcctNo" href="#" style="position: relative; top: 1px; text-align: center;
                                                                                width: 70px;color:White;font-weight:bold;" onclick="javascript:AddAcctNos();return false;" class="btn btn-info btn-sm SelectButtons">
                                                                                Add</a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                                                            <select multiple class="form-control" onclick="selAccounts_OnClick();" style="position: relative;
                                                                                top: -20px; height: 230px;" id="selAccounts">
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-sm-3 col-md-3 col-lg-3" style="height: 54px;">
                                                                            <a id="btnRemoveAcctNo" href="#" style="position: relative; top: 1px; text-align: center;
                                                                                width: 70px;color:White;font-weight:bold;" onclick="RemoveAcctNos();" class="btn btn-info btn-sm SelectButtons">
                                                                                Remove</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-md-4 col-lg-4">
                                            <label class="ControlTitles" for="selStatus">
                                                Status:</label>
                                            <select class="form-control" id="selStatus" multiple style="height: 200px;">
                                                <option>Approved</option>
                                                <option>Corrected</option>
                                                <option>DistReview</option>
                                                <option>MfgReview</option>
                                                <option>Paid</option>
                                                <option>PendingPay</option>
                                                <option>QAReview</option>
                                                <option>Rejected</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                        <div class="col-sm-10 col-md-10 col-lg-10">
                                            <div class="container-fluid">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <table>
                                                            <tr style="background-color: white;">
                                                                <td style="width: 50px;">
                                                                </td>
                                                                <td style="width: 165px;">
                                                                    <label class="ControlTitles" for="selStateAvail">
                                                                        Available States:</label>
                                                                    <select class="form-control" id="selStateAvail" multiple style="width: 250px; height: 315px;"
                                                                        onkeydown="ManageButtonsController('Multi', 'selStateAvail', 'selStateSel', 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');"
                                                                        onkeyup="ManageButtonsController('Multi', 'selStateAvail', 'selStateSel', 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');"
                                                                        onclick="ManageButtonsController('Multi', 'selStateAvail', 'selStateSel', 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');">
                                                                        <option>AB - Alberta</option>
                                                                        <option>AK - Alaska</option>
                                                                        <option>AL - Alabama</option>
                                                                        <option>AR - Arkansas</option>
                                                                        <option>AS - American Samoa</option>
                                                                        <option>AZ - Arizona</option>
                                                                        <option>BC - British Columbia</option>
                                                                        <option>CA - California</option>
                                                                        <option>CO - Colorado</option>
                                                                        <option>CT - Connecticut</option>
                                                                        <option>DC - District of Columbia</option>
                                                                        <option>DE - Delaware</option>
                                                                        <option>FL - Florida</option>
                                                                        <option>GA - Georgia</option>
                                                                        <option>GU - Guam</option>
                                                                        <option>HI - Hawaii</option>
                                                                        <option>IA - Iowa</option>
                                                                        <option>ID - Idaho</option>
                                                                        <option>IL - Illinois</option>
                                                                        <option>IN - Indiana</option>
                                                                        <option>KS - Kansas</option>
                                                                        <option>KY - Kentucky</option>
                                                                        <option>LA - Louisiana</option>
                                                                        <option>MA - Massachusetts</option>
                                                                        <option>MB - Manitoba</option>
                                                                        <option>MD - Maryland</option>
                                                                        <option>ME - Maine</option>
                                                                        <option>MI - Michigan</option>
                                                                        <option>MN - Minnesota</option>
                                                                        <option>MO - Missouri</option>
                                                                        <option>MP - Northern Mariana Islands</option>
                                                                        <option>MS - Mississippi</option>
                                                                        <option>MT - Montana</option>
                                                                        <option>NB - New Brunswick</option>
                                                                        <option>NC - North Carolina</option>
                                                                        <option>ND - North Dakota</option>
                                                                        <option>NE - Nebraska</option>
                                                                        <option>NH - New Hampshire</option>
                                                                        <option>NJ - New Jersey</option>
                                                                        <option>NL - Newfoundland and Labrador</option>
                                                                        <option>NM - New Mexico</option>
                                                                        <option>NS - Nova Scotia</option>
                                                                        <option>NT - Northwest Territories</option>
                                                                        <option>NU - Nunavut</option>
                                                                        <option>NV - Nevada</option>
                                                                        <option>NY - New York</option>
                                                                        <option>OH - Ohio</option>
                                                                        <option>OK - Oklahoma</option>
                                                                        <option>ON - Ontario</option>
                                                                        <option>OR - Oregon</option>
                                                                        <option>PA - Pennsylvania</option>
                                                                        <option>PE - Prince Edward Island</option>
                                                                        <option>PR - Puerto Rico</option>
                                                                        <option>QC - Quebec</option>
                                                                        <option>RI - Rhode Island</option>
                                                                        <option>SC - South Carolina</option>
                                                                        <option>SD - South Dakota</option>
                                                                        <option>SK - Saskatchewan</option>
                                                                        <option>TN - Tennessee</option>
                                                                        <option>TX - Texas</option>
                                                                        <option>UM - United States Minor Outlying Islands</option>
                                                                        <option>UT - Utah</option>
                                                                        <option>VA - Virginia</option>
                                                                        <option>VI - Virgin Islands, U.S.</option>
                                                                        <option>VT - Vermont</option>
                                                                        <option>WA - Washington</option>
                                                                        <option>WI - Wisconsin</option>
                                                                        <option>WV - West Virginia</option>
                                                                        <option>WY - Wyoming</option>
                                                                        <option>XX - Unknown</option>
                                                                    </select>
                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        &nbsp;&nbsp;&nbsp;<a id="btnSelectOneState" style="color:White;font-weight:bold;" onclick="javascript:move('selStateAvail','selStateSel');return false;"
                                                                            href="#" class="btn btn-info btn-sm SelectButtons">&nbsp;&gt;&nbsp;</a>&nbsp;&nbsp;&nbsp;
                                                                        <br />
                                                                        <br />
                                                                        &nbsp;&nbsp;&nbsp;<a id="btnSelectAllState" style="color:White;font-weight:bold;" onclick="javascript:moveAll('selStateAvail','selStateSel');return false;"
                                                                            href="#" class="btn btn-info btn-sm SelectButtons">&gt;&gt;</a>&nbsp;&nbsp;&nbsp;
                                                                        <br />
                                                                        <br />
                                                                        &nbsp;&nbsp;&nbsp;<a id="btnUnSelectOneState" style="color:White;font-weight:bold;" onclick="javascript:move('selStateSel','selStateAvail');return false;"
                                                                            href="#" class="btn btn-info btn-sm SelectButtons">&nbsp;&lt;&nbsp;</a>&nbsp;&nbsp;&nbsp;
                                                                        <br />
                                                                        <br />
                                                                        &nbsp;&nbsp;&nbsp;<a id="btnUnSelectAllState" style="color:White;font-weight:bold;" onclick="javascript:moveAll('selStateSel','selStateAvail');return false;"
                                                                            href="#" class="btn btn-info btn-sm SelectButtons">&lt;&lt;</a>&nbsp;&nbsp;&nbsp;
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <label class="ControlTitles" for="selStateSel">
                                                                        Selected States:</label>
                                                                    <select multiple class="form-control" style="position: relative; width: 250px; height: 315px;"
                                                                        id="selStateSel" onkeydown="ManageButtonsController('Multi', 'selStateAvail', 'selStateSel', 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');"
                                                                        onkeyup="ManageButtonsController('Multi', 'selStateAvail', 'selStateSel', 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');"
                                                                        onclick="ManageButtonsController('Multi', 'selStateAvail', 'selStateSel', 'btnSelectOneState', 'btnSelectAllState', 'btnUnSelectOneState', 'btnUnSelectAllState');">
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-sm-1 col-md-1 col-lg-1">
                                                </div>
                                                <div id="FilterByDays_DateRange_Options_Div" class="col-sm-10 col-md-10 col-lg-10" style="border-radius: 15px; background-color: rgb(252,252,252);
                                                    border: 1px solid rgb(204,204,204); height: 100px;">
                                                    <div class="col-sm-4 col-md-4 col-lg-4">
                                                        <div class="radio" style="position: relative; top: 5px;">
                                                            <label>
                                                                <input id="optChooseDateRange" onclick="javascript:DateRangeType(1);" type="radio"
                                                                    name="optDateRange" />Filter by Days</label>
                                                        </div>
                                                        <div class="radio" style="position: relative; top: 10px;">
                                                            <label>
                                                                <input id="optEnterDateRange" onclick="javascript:DateRangeType(2);" type="radio"
                                                                    name="optDateRange" />Date Range</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 col-md-1 col-lg-1">
                                                        <div class="container-fluid">
                                                            <div class="row">
                                                                <div class="col-sm-11 col-md-11 col-lg-11">
                                                                </div>
                                                                <div id="VerticalDateSelectionLine" class="col-sm-1 col-md-1 col-lg-1" style="border-left: 1px solid rgb(204,204,204);
                                                                    position: relative; top: 10px; height: 60px;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="divChooseDateRange" class="col-sm-7 col-md-7 col-lg-7" style="position: relative;
                                                        top: 10px; display: none;">
                                                        <div class="container-fluid">
                                                            <div class="row">
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <label for="txtFilterByDays" style="font-style: normal; position: relative; top: 20px;">
                                                                        Filter By last</label>
                                                                </div>
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <input type="number" class="form-control" id="txtFilterByDays" style="width: 75px;
                                                                        font-style: normal; position: relative; top: 10px;" />
                                                                </div>
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <label for="txtFilterByDays" style="font-style: normal; position: relative; top: 20px;">
                                                                        &nbsp;Days</label>
                                                                </div>
                                                            </div><br />
                                                            <label for="txtDayOfMonth" id="RecurReport" style="font-weight:normal;text-align:center;display:none;">Report will be created at 7:00 am</label>
                                                            <label for="txtDayOfMonth" id="OneTimeReport" style="font-weight:normal;display:none;">If you have selected 180 days or less, the report will be created immediately, else the report will be created at 8:00 pm tonight.</label>
                                                        </div>
                                                    </div>
                                                    <div id="divEnterDateRange" class="col-sm-7 col-md-7 col-lg-7" style="height: 50px;
                                                        display: none;">
                                                        <div class="container-fluid">
                                                            <div class="row">
                                                                <div class="col-sm-6 col-md-6 col-lg-6">
                                                                    <label id="lblFromDate" style="position: relative; top: 10px;" for="txtFromDate">
                                                                        From Date:</label>
                                                                    <input type="text" style="position: relative; top: 10px;" onclick="DatePickingTime();"
                                                                        class="form-control" id="txtFromDate" placeholder="Enter From Date" />
                                                                </div>
                                                                <div class="col-sm-6 col-md-6 col-lg-6">
                                                                    <label id="lblToDate" style="position: relative; top: 10px;" for="txtToDate">
                                                                        &nbsp;&nbsp;&nbsp;To Date:</label>
                                                                    <input type="text" style="position: relative; top: 10px;" onclick="DatePickingTime();"
                                                                        class="form-control" id="txtToDate" placeholder="Enter To Date" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-1 col-md-1 col-lg-1">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default" id="Step5_Schedule_Report_Panel">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" style="width: 400px; height: 40px; font-size: large;" data-parent="#accordion"
                                    href="#collapse5">Step 5: Schedule Report</a>
                            </h4>
                        </div>
                        <div id="collapse5" class="panel-collapse collapse">
                            <div class="panel-body">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                        <div class="col-sm-10 col-md-10 col-lg-10" style="border-radius: 15px; background-color: rgb(252,252,252);
                                            border: 1px solid rgb(204,204,204);">
                                            <div class="container-fluid">
                                                <div class="row">
                                                    <div class="col-sm-1 col-md-1 col-lg-1">
                                                    </div>
                                                    <div class="col-sm-3 col-md-3 col-lg-3">
                                                        <div class="radio">
                                                            <label>
                                                                <input id="optDaily" onclick="javascript:ChangeSchType(1);" type="radio" name="optRecurType" />Daily</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label>
                                                                <input id="optWeekly" onclick="javascript:ChangeSchType(2);" type="radio" name="optRecurType" />Weekly</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label>
                                                                <input id="optMonthly" onclick="javascript:ChangeSchType(3);" type="radio" name="optRecurType" />Monthly</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 col-md-1 col-lg-1" style="border-left: 1px solid rgb(204,204,204);
                                                        position: relative; top: 10px; height: 70px;">
                                                    </div>
                                                    <div id="Type_Day" class="col-sm-6 col-md-6 col-lg-6" style="position: relative;
                                                        top: 10px; display: none;">
                                                        <div class="radio">
                                                            <label>
                                                                <input id="optEvDay" type="radio" name="optRecurOptionDaily" />Every Day</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label>
                                                                <input id="optEvWeekDay" type="radio" name="optRecurOptionDaily" />Every Week Day</label>
                                                        </div>
                                                    </div>
                                                    <div id="Type_Week" class="col-sm-6 col-md-6 col-lg-6" style="height: 50px; display: none;">
                                                        <div class="container-fluid" style="height: 50px;">
                                                            <div class="row">
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input id="optSunday" type="radio" name="optRecurOptionWeekly" />Sunday</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input id="optMonday" type="radio" name="optRecurOptionWeekly" />Monday</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input id="optTuesday" type="radio" name="optRecurOptionWeekly" />Tuesday</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row" style="position: relative; top: -15px;">
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input id="optWednesday" type="radio" name="optRecurOptionWeekly" />Wednesday</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input id="optThursday" type="radio" name="optRecurOptionWeekly" />Thursday</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input id="optFriday" type="radio" name="optRecurOptionWeekly" />Friday</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row" style="position: relative; top: -30px;">
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input id="optSaturday" type="radio" name="optRecurOptionWeekly" />Saturday</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="Type_Month" class="col-sm-6 col-md-6 col-lg-6" style="position: relative;
                                                        top: 25px; display: none;">
                                                        <div class="container-fluid" style="height: 50px;">
                                                            <div class="row">
                                                                <div class="col-sm-2 col-md-2 col-lg-2">
                                                                    <label for="txtDayOfMonth" class="DayOfMonthTextBox_Show">
                                                                        Day
                                                                    </label>
                                                                </div>
                                                                <div class="col-sm-4 col-md-4 col-lg-4">
                                                                    <input type="number" class="form-control" id="txtDayOfMonth" />
                                                                </div>
                                                                <div class="col-sm-6 col-md-6 col-lg-6">
                                                                    <label for="txtDayOfMonth" style="font-style: normal; position: relative; top: 10px;">
                                                                        &nbsp;of the month</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 col-md-1 col-lg-1">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-1 col-md-1 col-lg-1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="form-group">
                    <div class="row">
                        <div id="SaveContainer" class="col-sm-12 col-md-12 col-lg-12">
                        </div>
                        <div class="col-sm-12" style="text-align: right;">
                            <!--<input type="button" id="Testing" onclick="javascript:TestingThisConfirmButton();return false;" />-->
                            <a href="#" class="btn btn-info btn-md" style="font-weight: bolder; text-align: center;color:White;" >Save Report</a>&nbsp;&nbsp; <a href="#" id="btnCloseRptWizard" onclick="javascript:btnCloseRptWizard_click();return false;"
                                    class="btn btn-info btn-md" style="font-weight: bolder; text-align: center;color:White;">Close</a>&nbsp;&nbsp;
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</asp:Content>
