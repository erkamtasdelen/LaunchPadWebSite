const factoryAddress = "0xD4E12993f146fc7d4a5634eb00843742Ff322eA6";
const busdAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";


connectWallet()


const network = {
    Id: 97,
    Hex: "0x61",
    Name: "BSC Testnet",
    nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com"]
}

var provider;
var idoFactoryContract;
var signer;
var inProgressIDOs = [];
var finishedIDOs = [];
var doesIDOsSet = false;
var userAddress;

async function startPoint() {
    // check metamask etc.
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        checkNetwork();
    } else {
        window.alert("Please install Metamask! And reload the page!");
        window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
    }
}

startPoint();

async function checkNetwork() {
    await provider.getNetwork().then(async (res) => {
        if (res.chainId === network.Id) {
            document.getElementById("wrongnetwork").style.display = "none";
            initialize();
        } else {
            console.log("Wrong network!");
        }
    })
}

async function initialize() {
    try {

        // if user connected
        provider.listAccounts().then((res) => {
            if (res.length !== 0) {
                document.getElementById("CreateRegu").style.display = "none";
                signer = provider.getSigner();
                userAddress = res[0];
            }
        });

        // if user have installed provider, set contracts
        idoFactoryContract = new ethers.Contract(factoryAddress, FACTORYABI, provider);
        if (!doesIDOsSet) {
            doesIDOsSet = true;
            setIDOs();
        }
    } catch (err) {
        console.log("Error with initializing!");
        console.log(err);
    }
}

async function buy(form) {
    var idoAddress, amount;
    idoAddress = form.idoadres.value;
    amount = form.amountform.value;
    try {
        if (signer !== undefined) {
            amount = ethers.utils.parseEther(amount);
            const idoContractWithSignature = new ethers.Contract(idoAddress, IDOABI, signer);
            const busdContractWithSignature = new ethers.Contract(busdAddress, TOKENABI, signer);
            const busdContract = new ethers.Contract(busdAddress, TOKENABI, provider);

            await busdContract.allowance(userAddress, idoAddress).then(async (res) => {
                if (res.lt(amount)) {
                    const approveTx = await busdContractWithSignature.approve(idoAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935");
                    await approveTx.wait();
                }
            })

            const buyTx = await idoContractWithSignature.buyTokens(amount);
            await buyTx.wait();
        } else {
            connectWallet();
        }
    } catch (err) {
        window.alert("Error with: ", idoAddress, " while buying.");
    }
}

async function buyAfterSale(form) {
    var idoAddress, amount;
    idoAddress = form.idoadres.value;
    amount = form.amountform.value;
    try {
        if (signer !== undefined) {
            amount = ethers.utils.parseEther(amount);
            const idoContractWithSignature = new ethers.Contract(idoAddress, IDOABI, signer);
            const busdContractWithSignature = new ethers.Contract(busdAddress, TOKENABI, signer);
            const busdContract = new ethers.Contract(busdAddress, TOKENABI, provider);

            await busdContract.allowance(userAddress, idoAddress).then(async (res) => {
                if (res.lt(amount)) {
                    const approveTx = await busdContractWithSignature.approve(idoAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935");
                    await approveTx.wait();
                }
            })

            const buyTx = await idoContractWithSignature.buyAfterSale(amount);
            await buyTx.wait();
        } else {
            connectWallet();
        }
    } catch (err) {
        window.alert("Error with: ", idoAddress, " while buying.");
    }
}

function formatDate(epoch) {
    var a = new Date(epoch * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function createele(_newIdo) {
    var loading =document.getElementById("loading-wrapper");
    loading.setAttribute("style","display:none;")
    const saleStart = _newIdo.saleStartTime;
    const saleEnd = _newIdo.saleEndTime;
    const secondsSinceEpoch = (Math.round(Date.now() / 1000)).toString()

    const newcontainer = document.createElement('div');
    newcontainer.classList.add('courses-container');

    const newcourse = document.createElement('div');
    newcourse.classList.add('course');

    const newcoursepreview = document.createElement('div');
    newcoursepreview.classList.add('course-preview');

    const newcourseinfo = document.createElement('div');
    newcourseinfo.classList.add('course-info');


    const newcoinicons = document.createElement('img');
    newcoinicons.classList.add('coinicons');

    const newpoola = document.createElement('a');
    newpoola.innerHTML = "Pool";
    newpoola.href = "https://bscscan.com/address/" + _newIdo["address"];
    newpoola.classList.add('poola');

    const newh6_1 = document.createElement('h6');
    newh6_1.innerHTML = _newIdo["projectName"];
    newh6_1.classList.add('h6_1');

    const newhelptip = document.createElement('div');
    newhelptip.style = "background-color: #2A265F;";
    newhelptip.classList.add('help-tip');

    const newdescphelp = document.createElement('p');
    newdescphelp.classList.add('descphelp-tip');

    const newfundsandtyps = document.createElement('h2');
    newfundsandtyps.innerHTML = _newIdo["maxCap"] + "  /  " + _newIdo["price"] + "$"
    newfundsandtyps.classList.add('fundsandtyps');

    const newlistsulofcoin = document.createElement('div');
    newlistsulofcoin.classList.add('listsulofcoin');

    const newprogress = document.createElement('div');
    newprogress.classList.add('progress');


    const newformforbuy = document.createElement('form');
    newformforbuy.classList.add('formforbuy');
    newformforbuy.setAttribute("onsubmit", "return false")



    document.getElementById('sectionofbsc').appendChild(newcontainer);
    newcontainer.appendChild(newcourse);
    newcourse.appendChild(newcoursepreview);
    newcourse.appendChild(newcourseinfo);
    newcoursepreview.appendChild(newcoinicons);
    newcoursepreview.appendChild(newpoola);
    newcourseinfo.appendChild(newh6_1);
    newcourseinfo.appendChild(newhelptip);
    newhelptip.appendChild(newdescphelp);
    newcourseinfo.appendChild(newfundsandtyps);
    newcourseinfo.appendChild(newprogress);
    newcourseinfo.appendChild(newlistsulofcoin);
    newcourseinfo.appendChild(newformforbuy);

    const newliststartend = document.createElement('ul');
    newliststartend.classList.add('liststartend');

    const newliststartendli = document.createElement('li');
    newliststartendli.classList.add('liststartendli');
    newliststartendli.innerHTML = "Start: " + formatDate(_newIdo["saleStartTime"]);

    const newliststartendli2 = document.createElement('li');
    newliststartendli2.classList.add('liststartendli');
    newliststartendli2.innerHTML = "End: " + formatDate(_newIdo["saleEndTime"]);



    const newliststartend2 = document.createElement('ul');
    newliststartend2.classList.add('liststartend');


    newlistsulofcoin.appendChild(newliststartend)
    newlistsulofcoin.appendChild(newliststartend2)
    newliststartend.appendChild(newliststartendli)
    newliststartend.appendChild(newliststartendli2)

    
    if (secondsSinceEpoch >= saleStart && secondsSinceEpoch <= saleEnd && _newIdo.totalBusdReceivedInAllTier < _newIdo.maxCap) {
        const newinputamount = document.createElement('input');
        newinputamount.classList.add('inputamount');
        newinputamount.name = "amountform";
        const newbtn = document.createElement('input');
        newbtn.classList.add('btn');
        newbtn.type = "submit";
        newbtn.value = "Buy";
        newbtn.setAttribute("onClick", "buy(this.form)")
        
        newformforbuy.appendChild(newinputamount);
        newinputamount.placeholder = "0";
        newformforbuy.appendChild(newbtn);
    } else if ( secondsSinceEpoch >= saleEnd && parseInt(_newIdo.totalBusdReceivedInAllTier) < parseInt(_newIdo.maxCap)) {
        const newinputamount = document.createElement('input');
        newinputamount.classList.add('inputamount');
        newinputamount.name = "amountform";
        const newbtn = document.createElement('input');
        newbtn.classList.add('btn');
        newbtn.type = "submit";
        newbtn.value = "Buy After IDO";
        newbtn.setAttribute("onClick", "buyAfterSale(this.form)")

        newformforbuy.appendChild(newinputamount);
        newinputamount.placeholder = "0";
        newformforbuy.appendChild(newbtn);
    }

    // if sale over and there are still unbought tokens
    if (secondsSinceEpoch >= saleEnd && _newIdo.totalBusdReceivedInAllTier < _newIdo.maxCap) {
        const newliststartendli3 = document.createElement('li');
        newliststartendli3.classList.add('liststartendli');
        newliststartendli3.innerHTML = "You can buy: " + _newIdo["afterSaleMaxAmount"];
        newliststartend2.appendChild(newliststartendli3)
    }



    const newprogresstobar = document.createElement('div');
    newprogresstobar.classList.add('progress-bar');
    newprogresstobar.classList.add('progress-bar-striped');
    newprogresstobar.classList.add('progress-bar-animated');
    newprogresstobar.classList.add('progresstext');
    newprogresstobar.role = "progressbar";
    newprogresstobar.style = "width: " + _newIdo.percentage + "%";
    newprogresstobar.innerHTML = _newIdo["percentage"] + "%";

    newprogress.appendChild(newprogresstobar);

    const newinputadress = document.createElement('input');
    newinputadress.classList.add('inputamount');
    newformforbuy.appendChild(newinputadress);
    newinputadress.name = "idoadres";
    newinputadress.value = _newIdo["address"];
    newinputadress.style = "display:none;";



}


async function setIDOs() {
    try {
        await idoFactoryContract.getAllInProgressIDOs().then(async (inProgressList) => {
            for (let i = 0; i < inProgressList.length; i++) {
                const idoContract = new ethers.Contract(inProgressList[i], IDOABI, provider);
                const _maxCap = await idoContract.maxCap();
                const _totalBusdReceivedInAllTier = await idoContract.totalBusdReceivedInAllTier();
                const _newIdo = {
                    address: inProgressList[i],
                    projectName: await idoContract.projectName(),
                    maxCap: beautify(_maxCap),
                    saleEndTime: (await idoContract.saleEndTime()).toString(),
                    saleStartTime: (await idoContract.saleStartTime()).toString(),
                    afterSaleMaxAmount: beautify(await idoContract.afterSaleMaxAmount()),
                    totalBusdReceivedInAllTier: beautify(_totalBusdReceivedInAllTier),
                    price: beautify(await idoContract.price()),
                    percentage: ((_totalBusdReceivedInAllTier.mul(100)).div(_maxCap)).toString()
                }
                if (!inProgressIDOs.includes(_newIdo)) {
                    inProgressIDOs.push(_newIdo);
                }
            }
        });
    } catch (err) {
        console.log("Error with setting in progress IDOs!");
        console.log(err)
    }

    try {
        await idoFactoryContract.getAllFinishedIDOs().then(async (finishedList) => {
            for (let i = 0; i < finishedList.length; i++) {
                const idoContract = new ethers.Contract(finishedList[i], IDOABI, provider);
                const _maxCap = await idoContract.maxCap();
                const _totalBusdReceivedInAllTier = await idoContract.totalBusdReceivedInAllTier();
                const _newIdo = {
                    address: finishedList[i],
                    projectName: await idoContract.projectName(),
                    maxCap: beautify(_maxCap),
                    saleEndTime: (await idoContract.saleEndTime()).toString(),
                    saleStartTime: (await idoContract.saleStartTime()).toString(),
                    afterSaleMaxAmount: beautify(await idoContract.afterSaleMaxAmount()),
                    totalBusdReceivedInAllTier: beautify(_totalBusdReceivedInAllTier),
                    price: beautify(await idoContract.price()),
                    percentage: ((_totalBusdReceivedInAllTier.mul(100)).div(_maxCap)).toString()
                }
                if (!inProgressIDOs.includes(_newIdo)) {
                    inProgressIDOs.push(_newIdo);
                }
            }
        });
    } catch (err) {
        console.log("Error with setting finished IDOs");
        console.log(err)
    }

    updateInterface();
}

// PROOF OF CONCEPT
function updateInterface() {
    for (let i = 0; i < inProgressIDOs.length; i++) {
        createele(inProgressIDOs[i]);
    }

    for (let i = 0; i < finishedIDOs.length; i++) {
        createele(finishedIDOs[i]);
    }
}

async function connectWallet() {
    ethereum.request({
        method: 'eth_requestAccounts'
    }).then(() => {
        document.getElementById("CreateRegu").style.display = "none";
    });
    // after connection, we can get values
    initialize();
}

async function switchOrAddNetwork() {
    const connectInfo = await provider.getNetwork();

    try {
        if (connectInfo.chainId != network.Id) {
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{
                    chainId: network.Hex,
                }],
            });
        }
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: network.Hex,
                        chainName: network.Name,
                        nativeCurrency: network.nativeCurrency,
                        rpcUrls: network.rpcUrls,
                        blockExplorerUrls: network.blockExplorerUrls,
                    },],
                });
            } catch (addError) {
                console.log("Please use" + network.Name + " network!", addError);
            }
        }
    }

}

function beautify(bigNumber) {
    var value = ethers.utils.formatEther(bigNumber).toString();
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
}

ethereum.on("connect", async (connectInfo) => {
    startPoint();
});

ethereum.on('accountsChanged', (accounts) => {
    initialize();
});

ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
});