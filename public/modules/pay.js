// use: setPayAndPay(montoApagar, 'descripcion del pago');
// para configurar el pago y pagar 

// o
// use: setPay(montoApagar, 'descripcion del pago');
// para configurar el pago

// luego: pay();
// para pagar

// nota: pay() no debe ser utilizado seguido de setPay() [en su defecto use setPayAndPay()]
// ya que setPay() es una funcion asincrona y tarda unos segundos en completarse (1s aprox)

export const pay = () => {
	pfWallet.messageBus.emit('openPayment');
}

export const setPay = (amount, description) =>  {

	//const getUrlParam = (key) => new URLSearchParams(window.location.search).get(key);

	pfWallet = pfWallet || {};
	let apiKey = "brEyQRSzMm2UwQa5v0NsobRa3U8nH5xT|DIRcgBAWK5ceVzQeAvEg2XBxz";
	let cclw = "18D85FC72A84FFACEF1B6BC7B67820984F9254FF8D24654E9C215AD145C190F49F74B3BC4B7819CCA928757E9D03B5CFE6CFF50AE35D252FEE544466255A079F";

	// let amount = 16.99;
	// let description = 'PruebaHeineken2';
	let embedded = true;

	// Modificar para usar con cuenta real (false)
	pfWallet.useAsSandbox(true);

	pfWallet.openService({
		apiKey: apiKey,
		cclw: cclw
	}).then(function (merchantSetup) {
		startMerchantForm(merchantSetup)
	}, function (error) {
		console.log(error);
	});
	let sdk;
	function startMerchantForm(merchantSetup) {
		let paymentInfo = {
			amount: parseFloat(amount),
			discount: 0.0,
			taxAmount: 0.0,
			description: description
		};
		console.log("merchantSetup", merchantSetup);
		let setup = {
			lang: 'es',
			embedded: embedded,
			// type: 'lk',
			// code: 'LK-MAIMLMD1FKSQKCHU',
			container: 'container-form',
			onError: function (data) {
				console.error("errors", data);
			},
			onTxSuccess: function (data) {
				console.log("onTxSuccess", data);
				window.location.href = pfWallet.pfHostViews + `/pf/default-receipt/${data?.Oper}`;
			},
			onTxError: function (data) {
				console.error("when the onTxError, in other process", data);
			},
			onClose: function () {
				console.log("onClose called");
			}
		};
		sdk = merchantSetup.init(
			merchantSetup.dataMerchant,
			paymentInfo,
			setup
		);
	}
}

export const setPayAndPay = (amount, description) =>  {

	//const getUrlParam = (key) => new URLSearchParams(window.location.search).get(key);

	pfWallet = pfWallet || {};
	let apiKey = "brEyQRSzMm2UwQa5v0NsobRa3U8nH5xT|DIRcgBAWK5ceVzQeAvEg2XBxz";
	let cclw = "18D85FC72A84FFACEF1B6BC7B67820984F9254FF8D24654E9C215AD145C190F49F74B3BC4B7819CCA928757E9D03B5CFE6CFF50AE35D252FEE544466255A079F";

	// let amount = 16.99;
	// let description = 'PruebaHeineken2';
	let embedded = true;

	// Modificar para usar con cuenta real (false)
	pfWallet.useAsSandbox(true);

	pfWallet.openService({
		apiKey: apiKey,
		cclw: cclw
	}).then(function (merchantSetup) {
		startMerchantForm(merchantSetup)
	}, function (error) {
		console.log(error);
	});
	let sdk;
	function startMerchantForm(merchantSetup) {
		let paymentInfo = {
			amount: parseFloat(amount),
			discount: 0.0,
			taxAmount: 0.0,
			description: description
		};
		console.log("merchantSetup", merchantSetup);
		pfWallet.messageBus.emit('openPayment');
		let setup = {
			lang: 'es',
			embedded: embedded,
			// type: 'lk',
			// code: 'LK-MAIMLMD1FKSQKCHU',
			container: 'container-form',
			onError: function (data) {
				console.error("errors", data);
			},
			onTxSuccess: function (data) {
				console.log("onTxSuccess", data);
				window.location.href = pfWallet.pfHostViews + `/pf/default-receipt/${data?.Oper}`;
			},
			onTxError: function (data) {
				console.error("when the onTxError, in other process", data);
			},
			onClose: function () {
				console.log("onClose called");
			}
		};
		sdk = merchantSetup.init(
			merchantSetup.dataMerchant,
			paymentInfo,
			setup
		);
	}
}