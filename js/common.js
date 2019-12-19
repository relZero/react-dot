var LvAllHtml = React.createClass({
    getInitialState: function () {
        return {
            lvNumSum: 0,
            DEFAULTDATA: this.props.defaultData,
            fflNum: [{sOne: 0, sTwo: 0, sThr: 0, sFou: 0, sFiv: 0}][0],
            lvDisNum: "",
            lvDisData: [{selOne: "", selTwo: "", selThr: "", selFou: "", selFiv: ""}][0],
            sumMeOne: "",
            iData: "",
            pmFlag: true
        };
    },
    handleSumChange: function (refName, refMeOne, refMeTwo, refMeThr, lvDisData) {
        var sumMeOne = refMeOne ? parseInt(refMeOne) : 0;
        var sumMeTwo = refMeTwo ? parseInt(refMeTwo) : 0;
        var sumMeThr = refMeThr ? parseInt(refMeThr) : 0;
        var sumMeDis1 = lvDisData.selOne == "" ? 0 : parseInt(lvDisData.selOne);
        var sumMeDis2 = lvDisData.selTwo == "" ? 0 : parseInt(lvDisData.selTwo);
        var sumMeDis3 = lvDisData.selThr == "" ? 0 : parseInt(lvDisData.selThr);
        var sumMeDis4 = lvDisData.selFou == "" ? 0 : parseInt(lvDisData.selFou);
        var sumMeDis5 = lvDisData.selFiv == "" ? 0 : parseInt(lvDisData.selFiv);
        var sumMeAtt = sumMeOne - 1;
        var Hp = sumMeOne == 1 ? 208 : (sumMeTwo * 10) + 208 + ((sumMeAtt + sumMeDis1) * 8);
        var Mp = sumMeOne == 1 ? 205 : (sumMeThr * 10) + 205 + ((sumMeAtt + sumMeDis2) * 5);
        var Atk = sumMeOne == 1 ? 101 : 101 + sumMeAtt + sumMeDis4;
        var Matk = sumMeOne == 1 ? 81 : 81 + sumMeAtt + sumMeDis2;
        var Def = sumMeOne == 1 ? 52 : parseFloat((sumMeAtt + sumMeDis5).mul(2.4) + 52);
        var Mdef = sumMeOne == 1 ? 45 : parseFloat(sumMeAtt.mul(2.2) + sumMeDis1.mul(0.4) + sumMeDis4.mul(0.6) + sumMeDis5.mul(0.2) + sumMeDis2 + 45);
        var Spd = sumMeOne == 1 ? 12 : parseFloat(sumMeAtt.mul(2.1) + (sumMeDis1 + sumMeDis4 + sumMeDis5).mul(0.2) + sumMeDis3.mul(1.5) + 12);
        var DEFAULTDATA = sumMeOne == 0 ? this.props.defaultData : [
            {KeyVal: 1, DefaultVal: Hp, NameVal: "气    血"},
            {KeyVal: 2, DefaultVal: Mp, NameVal: "魔    法"},
            {KeyVal: 3, DefaultVal: Atk, NameVal: "物理伤害"},
            {KeyVal: 4, DefaultVal: Matk, NameVal: "法术伤害"},
            {KeyVal: 5, DefaultVal: Def, NameVal: "物理防御"},
            {KeyVal: 6, DefaultVal: Mdef, NameVal: "法术防御"},
            {KeyVal: 7, DefaultVal: Spd, NameVal: "速    度"},
            {KeyVal: 8, DefaultVal: "", NameVal: "治疗强度"}
        ];
        var lvNumSum = sumMeOne == 0 ? 0 : sumMeOne * 5;
        refName == "cOne" ? this.setState({lvDisData: lvDisData, sumMeOne: sumMeOne, sumMeTwo: sumMeTwo, sumMeThr: sumMeThr, lvNumSum: lvNumSum, DEFAULTDATA: DEFAULTDATA}) : this.setState({
            sumMeOne: sumMeOne,
            sumMeTwo: sumMeTwo,
            sumMeThr: sumMeThr,
            DEFAULTDATA: DEFAULTDATA
        });
    },
    handlePmChange: function (pmName, pmKey) {
        var lvDisData = this.state.lvDisData;
        if (this.state.sumMeOne == "" || (pmName.indexOf("selPlus") >= 0 && this.state.lvNumSum < 10)) {
            return;
        }
        if (pmName.indexOf("selMinus") >= 0) {
            if (pmKey == 1 && lvDisData.selOne >= 10) {
                lvDisData.selOne = lvDisData.selOne == "" ? 0 : parseInt(lvDisData.selOne) - 10;
                var lvNumSum = this.state.lvNumSum + 10;
            } else if (pmKey == 2 && lvDisData.selTwo >= 10) {
                lvDisData.selTwo = lvDisData.selTwo == "" ? 0 : parseInt(lvDisData.selTwo) - 10;
                var lvNumSum = this.state.lvNumSum + 10;
            } else if (pmKey == 3 && lvDisData.selThr >= 10) {
                lvDisData.selThr = lvDisData.selThr == "" ? 0 : parseInt(lvDisData.selThr) - 10;
                var lvNumSum = this.state.lvNumSum + 10;
            } else if (pmKey == 4 && lvDisData.selFou >= 10) {
                lvDisData.selFou = lvDisData.selFou == "" ? 0 : parseInt(lvDisData.selFou) - 10;
                var lvNumSum = this.state.lvNumSum + 10;
            } else if (pmKey == 5 && lvDisData.selFiv >= 10) {
                lvDisData.selFiv = lvDisData.selFiv == "" ? 0 : parseInt(lvDisData.selFiv) - 10;
                var lvNumSum = this.state.lvNumSum + 10;
            } else {
                return;
            }
        } else {
            if (pmKey == 1) {
                lvDisData.selOne = lvDisData.selOne == "" ? 10 : parseInt(lvDisData.selOne) + 10;
            } else if (pmKey == 2) {
                lvDisData.selTwo = lvDisData.selTwo == "" ? 10 : parseInt(lvDisData.selTwo) + 10;
            } else if (pmKey == 3) {
                lvDisData.selThr = lvDisData.selThr == "" ? 10 : parseInt(lvDisData.selThr) + 10;
            } else if (pmKey == 4) {
                lvDisData.selFou = lvDisData.selFou == "" ? 10 : parseInt(lvDisData.selFou) + 10;
            } else if (pmKey == 5) {
                lvDisData.selFiv = lvDisData.selFiv == "" ? 10 : parseInt(lvDisData.selFiv) + 10;
            }
            var lvNumSum = this.state.lvNumSum - 10
        }
        this.setState({lvDisData: lvDisData, pmFlag: false, lvNumSum: lvNumSum});
        this.handleSumChange("", this.state.sumMeOne, this.state.sumMeTwo, this.state.sumMeThr, lvDisData);
    },
    handleInpOnChange: function (inpRef1, inpRef2, inpRef3, inpRef4, inpRef5, inpSumNum) {
        var lvDisData = this.state.lvDisData;
        if (this.state.sumMeOne == "") {
            return;
        }
        lvDisData.selOne = inpRef1;
        lvDisData.selTwo = inpRef2;
        lvDisData.selThr = inpRef3;
        lvDisData.selFou = inpRef4;
        lvDisData.selFiv = inpRef5;
        var lvNumSum = inpSumNum;
        this.setState({lvDisData: lvDisData, lvNumSum: lvNumSum});
        this.handleSumChange("", this.state.sumMeOne, this.state.sumMeTwo, this.state.sumMeThr, lvDisData);
    },
    handleClick: function (lvFflNum) {
        if (this.state.sumMeOne == "") {
            return;
        }
        var disSum = this.state.sumMeOne * 5;
        var lvDisNum = lvFflNum.sOne == lvFflNum.sTwo && lvFflNum.sOne == lvFflNum.sThr && lvFflNum.sOne == lvFflNum.sFou && lvFflNum.sOne == lvFflNum.sFiv ? disSum / 5 : parseInt(disSum / (lvFflNum.sOne + lvFflNum.sTwo + lvFflNum.sThr + lvFflNum.sFou + lvFflNum.sFiv));
        var lvDisData = lvFflNum.sOne == lvFflNum.sTwo && lvFflNum.sOne == lvFflNum.sThr && lvFflNum.sOne == lvFflNum.sFou && lvFflNum.sOne == lvFflNum.sFiv ? [{
            selOne: lvDisNum,
            selTwo: lvDisNum,
            selThr: lvDisNum,
            selFou: lvDisNum,
            selFiv: lvDisNum
        }][0] : [{selOne: parseInt(lvFflNum.sOne * lvDisNum), selTwo: parseInt(lvFflNum.sTwo * lvDisNum), selThr: parseInt(lvFflNum.sThr * lvDisNum), selFou: parseInt(lvFflNum.sFou * lvDisNum), selFiv: parseInt(lvFflNum.sFiv * lvDisNum)}][0];
        var lvDisAn = lvFflNum.sOne == lvFflNum.sTwo && lvFflNum.sOne == lvFflNum.sThr && lvFflNum.sOne == lvFflNum.sFou && lvFflNum.sOne == lvFflNum.sFiv ? 0 : disSum - (parseInt(lvFflNum.sOne * lvDisNum) + parseInt(lvFflNum.sTwo * lvDisNum) + parseInt(lvFflNum.sThr * lvDisNum) + parseInt(lvFflNum.sFou * lvDisNum) + parseInt(lvFflNum.sFiv * lvDisNum));
        var IFFRDATA = document.getElementById("iWidth").offsetWidth;
        this.setState({lvDisData: lvDisData, lvNumSum: lvDisAn, IFFRDATA: IFFRDATA});
        this.handleSumChange("", this.state.sumMeOne, this.state.sumMeTwo, this.state.sumMeThr, lvDisData);
    },
    handleFflClick: function (fflBind, fflCheck) {
        var FflNum = this.state.fflNum;
        FflNum.sOne = fflBind == "sel1" ? parseFloat(fflCheck) : parseFloat(FflNum.sOne);
        FflNum.sTwo = fflBind == "sel2" ? parseFloat(fflCheck) : parseFloat(FflNum.sTwo);
        FflNum.sThr = fflBind == "sel3" ? parseFloat(fflCheck) : parseFloat(FflNum.sThr);
        FflNum.sFou = fflBind == "sel4" ? parseFloat(fflCheck) : parseFloat(FflNum.sFou);
        FflNum.sFiv = fflBind == "sel5" ? parseFloat(fflCheck) : parseFloat(FflNum.sFiv);
        this.setState({lvDisData: [{selOne: "", selTwo: "", selThr: "", selFou: "", selFiv: ""}][0], fflNum: FflNum, lvNumSum: this.state.sumMeOne * 5});
    },
    render: function () {
        return (
            <section className="ui-content">
                <div className="person-select">
                    <div className="title-1"><h2 className="tit-h">加点方案</h2></div>
                    <LvInputAct onCommentSubmit={this.handleSumChange} lvdisdata={this.state.lvDisData}/>
                </div>
                <div className="plus-plan">
                    <div className="title-1"><h2 className="tit-h">加点方案</h2></div>
                    <div className="plan-num jq-plan-num">剩余点数：<b>{this.state.lvNumSum}</b></div>
                    <div className="plan-box">
                        <LvInputFfl onFflClick={this.handleFflClick}/>
                        <LvInputFfr onInpChange={this.handleInpOnChange} onPmChange={this.handlePmChange} iffrdata={this.state.IFFRDATA} sumMeLv={this.state.sumMeOne} lvdisdata={this.state.lvDisData}/>
                        <div className="plan-btn"><a href="javascript:;" className="jq-fast-plus" onClick={this.handleClick.bind(this, this.state.fflNum)}>快速加点</a></div>
                    </div>
                </div>
                <div className="display-fruit">
                    <LvInputSum pdefault={this.state.DEFAULTDATA}/>
                </div>
                <LvRule />
            </section>
        )
    }
});

var LvInputFfl = React.createClass({
    handleSelChange: function (oBind, event) {
        var selOp = event.target;
        for (var i = 0; i < selOp.length; i++) {
            var option = selOp.options[i];
            if (option.selected) {
                var opCheck = option.value
            }
        }
        this.props.onFflClick(oBind, opCheck);
    },
    render: function () {
        var selectName = [{SelKey: 1, SelName: "体力"}, {SelKey: 2, SelName: "魔力"}, {SelKey: 3, SelName: "敏捷"}, {SelKey: 4, SelName: "力量"}, {SelKey: 5, SelName: "耐力"}];
        var oRows = [];
        var oNums = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
        oNums.forEach(function (opNums) {
            oRows.push(<option key={opNums} value={opNums}>{opNums}</option>);
        });
        return (
            <div className="f-fl">
                <ul>
                    {selectName.map(function (selName) {
                        return (
                            <li key={selName.SelKey}>
                                <span className="sel-word">{selName.SelName}</span>
                                <span className="sel-input">
                                    <select className="select-int" name={"sel" + selName.SelKey} defaultValue="0" onChange={this.handleSelChange.bind(this, "sel" + selName.SelKey)}>{oRows}</select>
                                </span>
                            </li>
                        );
                    }, this)}
                </ul>
            </div>
        )
    }
});

var LvInputFfr = React.createClass({
    getInitialState: function () {
        return {PMDIS: [{selOne: "", selTwo: "", selThr: "", selFou: "", selFiv: ""}][0]}
    },
    handlePmClick: function (pmName, pmKey) {
        this.props.onPmChange(pmName, pmKey);
        var IFFRDATA = document.getElementById("iWidth").offsetWidth;
        this.setState({IFFRDATA: IFFRDATA});
    },
    handleInpChange: function (inpName, event) {
        var inpVal = {};
        inpVal[inpName] = event.target.value;
        if (isNaN(inpVal[inpName])) {
            return
        }
        this.setState(inpVal);
        var inpRef1 = this.refs.inpRef1.value == "" ? 0 : parseInt(this.refs.inpRef1.value);
        var inpRef2 = this.refs.inpRef2.value == "" ? 0 : parseInt(this.refs.inpRef2.value);
        var inpRef3 = this.refs.inpRef3.value == "" ? 0 : parseInt(this.refs.inpRef3.value);
        var inpRef4 = this.refs.inpRef4.value == "" ? 0 : parseInt(this.refs.inpRef4.value);
        var inpRef5 = this.refs.inpRef5.value == "" ? 0 : parseInt(this.refs.inpRef5.value);
        var inpSumNum = (this.props.sumMeLv * 5) - (inpRef1 + inpRef2 + inpRef3 + inpRef4 + inpRef5);
        if (inpSumNum < 0) {
            alert("你的点数不足！");
            return;
        }
        this.props.onInpChange(this.refs.inpRef1.value, this.refs.inpRef2.value, this.refs.inpRef3.value, this.refs.inpRef4.value, this.refs.inpRef5.value, inpSumNum);
    },
    handleInpFocus: function () {
        var IFFRDATA = document.getElementById("iWidth").offsetWidth;
        this.setState({IFFRDATA: IFFRDATA});
    },
    render: function () {
        var SUMMELV = this.props.sumMeLv ? "(" + this.props.sumMeLv + ")" : "";
        var PLUSDIS = this.props.lvdisdata;
        var plusName = [{PlusKey: 1, PlusName: "体力", PlusDis: PLUSDIS.selOne}, {PlusKey: 2, PlusName: "魔力", PlusDis: PLUSDIS.selTwo}, {PlusKey: 3, PlusName: "敏捷", PlusDis: PLUSDIS.selThr}, {PlusKey: 4, PlusName: "力量", PlusDis: PLUSDIS.selFou}, {PlusKey: 5, PlusName: "耐力", PlusDis: PLUSDIS.selFiv}];
        var sStyles = this.props.iffrdata ? this.props.iffrdata : this.state.IFFRDATA;
        var selStyles = {
            paddingLeft: sStyles + "px"
        };
        return (
            <div className="f-fr">
                <ul>
                    {plusName.map(function (plusDataName) {
                        return (
                            <li key={plusDataName.PlusKey}>
                                <span className="sel-word">{plusDataName.PlusName}</span>
                                <div className="sel-plan">
                                    <a className="sel-minus" name={"selMinus" + plusDataName.PlusKey} href="javascript:;" onClick={this.handlePmClick.bind(this, "selMinus" + plusDataName.PlusKey, plusDataName.PlusKey)}> </a>
                                    <span className="sel-input sel-pad jp-sel-input" style={selStyles}><i id="iWidth">{SUMMELV}</i><input type="text" ref={"inpRef" + plusDataName.PlusKey} name={"inpName" + plusDataName.PlusKey} className="input-int" value={plusDataName.PlusDis} onFocus={this.handleInpFocus} onChange={this.handleInpChange.bind(this, "inpName" + plusDataName.PlusKey)}/></span>
                                    <a className="sel-plus" name={"selPlus" + plusDataName.PlusKey} href="javascript:;" onClick={this.handlePmClick.bind(this, "selPlus" + plusDataName.PlusKey, plusDataName.PlusKey)}> </a>
                                </div>
                            </li>
                        );
                    }, this)};
                </ul>
            </div>
        )
    }
});

var LvInputAct = React.createClass({
    getInitialState: function () {
        return {cOne: "", cTwo: "", cThr: ""};
    },
    handleChange: function (name, event) {
        var newVal = {};
        newVal[name] = event.target.value;
        var refOneNum = parseInt(this.refs.refMeOne.value);
        if (isNaN(newVal[name])) {
            return
        }
        if (newVal["cOne"] > 100) {
            alert("抱歉，输入的等级必须低于100级");
            return
        }
        if (newVal["cTwo"] > refOneNum + 10 || newVal["cThr"] > refOneNum + 10) {
            alert("抱歉，强身和冥想等级不能大于人物等级10级");
            return
        }
        if (name == "cOne"){
            var lvDisData = [{selOne: "", selTwo: "", selThr: "", selFou: "", selFiv: ""}][0];
        }
        this.setState(newVal);
        this.props.onCommentSubmit(name, this.refs.refMeOne.value, this.refs.refMeTwo.value, this.refs.refMeThr.value, lvDisData);
    },
    render: function () {
        return (
            <ul>
                <li>
                    <span className="sel-word">门派</span>
                    <span className="sel-input">
                        <select>
                            <option>大唐官府</option>
                            <option>龙宫</option>
                            <option>普陀山</option>
                            <option>方寸山</option>
                            <option>狮驼岭</option>
                            <option>阴曹地府</option>
                        </select>
                    </span>
                </li>
                <li>
                    <span className="sel-word">等级</span>
                    <span className="sel-input" id="jq-plan-leave"><input type="text" name="cOne" ref="refMeOne" value={this.state.cOne} onChange={this.handleChange.bind(this, "cOne")}/></span>
                </li>
                <li>
                    <span className="sel-word">强身</span>
                    <span className="sel-input" id="jq-plan-pow"><input type="text" name="cTwo" ref="refMeTwo" value={this.state.cTwo} onChange={this.handleChange.bind(this, "cTwo")}/></span>
                </li>
                <li>
                    <span className="sel-word">冥想</span>
                    <span className="sel-input" id="jq-plan-muse"><input type="text" name="cThr" ref="refMeThr" value={this.state.cThr} onChange={this.handleChange.bind(this, "cThr")}/></span>
                </li>
            </ul>
        )
    }
});

var LvInputSum = React.createClass({
    render: function () {
        var liList = [];
        var pdfVal = this.props.pdefault;
        pdfVal.forEach(function (pdfValData) {
            liList.push(<LvSumLi pdfname={pdfValData.NameVal} pdfval={pdfValData.DefaultVal} key={pdfValData.KeyVal}/>);
        });
        return (
            <div className="display-fruit">
                <div className="title-1"><h2 className="tit-h">结果显示</h2></div>
                <ul>{liList}</ul>
                <div className="plan-btn"><a href="javascript:;" className="jq-plan-clear">全部清空</a></div>
            </div>
        )
    }
});

var LvSumLi = React.createClass({
    render: function () {
        return (
            <li>
                <span className="sel-word">{this.props.pdfname}</span>
                <span className="sel-input jq-fruit-inp"><em>{this.props.pdfval}</em></span>
            </li>
        )
    }
});

var LvRule = React.createClass({
    render: function () {
        return (
            <div className="plan-rule">
                <p>1、本加点模拟器由搞趣网梦幻西游手游专区提供，仅供参考。</p>
                <p>2、本计算器计算出来的结果为基础数据，不包含装备所带来的附加属性。</p>
                <p>3、填写门派、等级获得剩余潜力点数；强身、冥思可得出加成的气血与魔法值。</p>
                <p>4、使用加点方案功能分配属性点。（梦幻西游手游中人物每升一级获得5点属性点供玩家分配）如：3力量、1体质、1耐力，不分配的点数属性选择0。（所有的分配属性点总和不得超过5）分配完成后点击快速加点获得人物数据结果。</p>
                <p>5、玩家也可手动分配属性点，点击计算得到人物数据结果。</p>
                <p>6、此加点模拟器只作为玩家分配属性点的参考来使用，不作为游戏的任何依据。</p>
            </div>
        )
    }
});

/*var cOneVal = document.getElementsByName("cOne").value;                     80 90这80 90这80 90这
 alert(cOneVal);*/

var DEFAULTDATA = [
    {KeyVal: 1, DefaultVal: "", NameVal: "气    血"},
    {KeyVal: 2, DefaultVal: "", NameVal: "魔    法"},
    {KeyVal: 3, DefaultVal: "", NameVal: "物理伤害"},
    {KeyVal: 4, DefaultVal: "", NameVal: "法术伤害"},
    {KeyVal: 5, DefaultVal: "", NameVal: "物理防御"},
    {KeyVal: 6, DefaultVal: "", NameVal: "法术防御"},
    {KeyVal: 7, DefaultVal: "", NameVal: "速    度"},
    {KeyVal: 8, DefaultVal: "", NameVal: "治疗强度"}
];

ReactDOM.render(<LvAllHtml defaultData={DEFAULTDATA}/>, document.getElementById("reactInputAll"));
//ReactDOM.render(<LvInputSum />, document.getElementById("reactInputSum"));

function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};

