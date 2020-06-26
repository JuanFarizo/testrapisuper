export const globalMixin = {
  data:()=>({

    imagesFolder: 'images/',
    // isIphone: !!(navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)),
    isIphone: !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
    isLocalhost: (window.location.href.includes("http://localhost") || window.location.href.includes("https://localhost")),
    doneTypingInterval: 300, // time in ms, 0.3 second

    Validate: { streetName: true },
    colorAlert:'primary',
    myAlertTitle:'',
    myAlertActive:false,
    valueInput:'',
    ivaOptions: [0, 10.5, 21],
    get siteName() {
      if (this.isLocalhost) {
        return "http://localhost/Rapisuper/"; // localhost
      }
      return "https://rapisuper.com.ar/"; // web
    },
    get publicPath() {
      if (this.isLocalhost) {
        return this.siteName +'Dual/';
      }
      return this.siteName;
    },

    // static
    defaultNoDataText: 'No hay elementos para mostrar',
  }),

  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    pricing: function (value) {
      if (!value) value = 0;
      return '$'+ value.toFixed(2).replace('.', ',');
    },
  },

  computed: {
  }, // COMPUTED

  // applyDiscount
  // getRandomCode
  // getSubdomain
  // getStock
  // getControlDetailsOfSale
  // getParentsInfo
  // addCategoryToArray
  // addPoints
  // arrayToText
  // callPhone
  // capitalize
  // checkDBResponse
  // checkKeyPressArray
  // closeLoaderMain
  // closeLoadingOfContainer
  // conectToDB
  // copyObj
  // copyToClipboard
  // comparableStr
  // compareSearch
  // dynamicSort
  // filterSearch
  // findInArrayByField
  // getBuyerAddress
  // getFullAddress
  // getFullName
  // getFullReceptionTime
  // getAudio
  // getImg
  // getImgDual
  // getRealPrice
  // getRealPriceType
  // getStockColor
  // getThis
  // isAnyUndefined
  // isUndefined
  // myAlert
  // myConfirm
  // myNotify
  // objIsEmpty
  // openLoadingOfContainer
  // pad
  // pricing
  // renameToLabel
  // removeNoNumber
  // removeWhiteSpaces
  // reproduceAudio
  // reverseString
  // setFocusVsInput
  // showPrice
  // showPaymentPrediction
  // updateProductStock
  // validateFields
  methods: {

    applyDiscount(total, DiscountOrSale, isSale = false) {
      console.log('ENTRO');
      // isSale advertise if is a loadedSale or only a Discount
      let Discount = {}
      if (!isSale) {
        Discount = DiscountOrSale;
      } else {
        let Sale = DiscountOrSale;
        Discount = {
          id: Sale.discountCodeID,
          discountAmount: Sale.discountAmount,
          discountPercentaje: Sale.discountPercentaje,
          discountPercentajeMax: Sale.discountPercentajeMax,
        }
      }
      console.log(Discount);
      if (!Discount.id) return;
      let appliedDiscount = 0;
      // by amount
      if (Discount.discountAmount != 0) {
        appliedDiscount = Discount.discountAmount;
        if (total < appliedDiscount) {
          appliedDiscount = total;
        }
      }
      // by percentaje
      if (Discount.discountPercentaje != 0) {
        appliedDiscount = total * Discount.discountPercentaje /100;
        if (Discount.discountPercentajeMax != 0) {
          if (appliedDiscount > Discount.discountPercentajeMax) {
            appliedDiscount = Discount.discountPercentajeMax;
          }
        }
      }
      return this.showPrice(appliedDiscount);
    },

    getRandomCode(length = 10) {
       var result           = '';
       // I and l are removed
       var characters       = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
       var charactersLength = characters.length;
       for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    },

    getSubdomain() {
      let url = window.location.href;
      if (url.includes("://demo.rapisuper.com.ar")) return 'demo';
      if (url.includes("://test.rapisuper.com.ar")) return 'test';
      if (url.includes("://admin.rapisuper.com.ar")) return '';
      return '';
    },

    getStock(Prod) {
      console.log(Prod);
      if (Prod.hasInfiniteStock) {
        if (Prod.pickUpPlaceHasStock) { return 1000; }
        else { return 0; }
      }
      if (Prod.productParentID) return Math.floor(Prod.productParentStock / Prod.productParentMultiplier);
      return Prod.stock;
    },
    getControlDetailsOfSale(Sale, isList = false) {
      let text = '';
      let content = '';
      content += Sale.boxes            ? `${isList ? '<li>' : ''}${Sale.boxes} Caja${this.isPlural(Sale.boxes)}${isList ? '</li>' : ' | ' }` : '';
      content += Sale.bags             ? `${isList ? '<li>' : ''}${Sale.bags} Bolsa${this.isPlural(Sale.bags)}${isList ? '</li>' : ' | ' }` : '';
      content += Sale.refrigerator     ? `${isList ? '<li>' : ''}${Sale.refrigerator} Heladera${this.isPlural(Sale.refrigerator)}${isList ? '</li>' : ' | ' }` : '';
      content += Sale.freezer          ? `${isList ? '<li>' : ''}${Sale.freezer} Freezer${this.isPlural(Sale.freezer)}${isList ? '</li>' : ' | ' }` : '';
      content += Sale.eggs6            ? `${isList ? '<li>' : ''}${Sale.eggs6} media${this.isPlural(Sale.eggs6)} docena${this.isPlural(Sale.eggs6)} de Huevo${this.isPlural(Sale.eggs6)}${isList ? '</li>' : ' | ' }` : '';
      content += Sale.eggs30           ? `${isList ? '<li>' : ''}${Sale.eggs30} maple${this.isPlural(Sale.eggs30)} de Huevo${this.isPlural(Sale.eggs30)}${isList ? '</li>' : ' | ' }` : '';
      content += Sale.coal3            ? `${isList ? '<li>' : ''}${Sale.coal3} Carbón${this.isPlural(Sale.coal3, 'es')} de 3kg${isList ? '</li>' : ' | ' }` : '';
      content += Sale.coal5            ? `${isList ? '<li>' : ''}${Sale.coal5} Carbón${this.isPlural(Sale.coal5, 'es')} de 5kg${isList ? '</li>' : ' | ' }` : '';
      content += Sale.containerBeer    ? `${isList ? '<li>' : ''}${Sale.containerBeer} Envase${this.isPlural(Sale.containerBeer)} de cerveza${isList ? '</li>' : ' | ' }` : '';
      content += Sale.containerSodaPop ? `${isList ? '<li>' : ''}${Sale.containerSodaPop} Envase${this.isPlural(Sale.containerSodaPop)} de gaseosa${isList ? '</li>' : ' | ' }` : '';
      if (content) {
        text += `Contenido: ${isList ? '</br>' : ''}${content}`;
      }
      if (Sale.controlNotes) {
        text += `${isList ? '</br>' : ''}Notas: ${isList ? '</br>' : ''}`;
        text += `${isList ? '<li>' : ''}${Sale.controlNotes}${isList ? '</li>' : ''}`;
      }
      return text;
    },

    isPlural(num, pluralText = 's') {
      if (num == 1) return '';
      return pluralText;
    },

    getParentsInfo(AllCategories) {
      let CategoriesLeft = [];
      let orderedCategories = []
      // Get categories without parent
      for (let Cat of AllCategories) {
        if (Cat.parentID == 0) { orderedCategories.push(Cat);
        } else { CategoriesLeft.push(Cat); }
      }
      // Add categories to parent
      let counter = 0;
      while (CategoriesLeft.length && counter < 100) {
        counter++;
        AllCategories = CategoriesLeft;
        CategoriesLeft = [];
        for (let Cat of AllCategories) {
          // if (Cat.parentID == 72) {
          //   console.log(Cat.name);
          // }
          if (!this.addCategoryToArray(Cat, orderedCategories)) {
            CategoriesLeft.push(Cat);
          }
        }
      } // end while
      if (counter == 100) {
        this.myNotify('danger', 'Error', 'No se pudieron cargar correctamente las subcategorías');
        console.log('Quedaron sin asignar, las siguientes categorías:');
        console.log(CategoriesLeft);
      }
      return orderedCategories;
    },


    addCategoryToArray(newCategory, AllCategories) {
      // ESTA FUNCIÓN SOLO SIRVE PARA ACOMODAR UNA VEZ. NO PARA LLAMAR AL AGREGAR UNO NUEVO
      // ADD TO ARRAY
      let lastItem = false;
      let parentFinded = newCategory.parentID == 0 ? true :false;
      let addItem = false;
      for (let i = 0; i < AllCategories.length; i++) {
        // Walk sons
        if (parentFinded) {
          if (newCategory.parentID != AllCategories[i].parentID) {
            // parentID != parentID
            addItem = true;
          }
        } // if parentFinded
        // find parent
        if (newCategory.parentID == AllCategories[i].id) {
          parentFinded = true;
          newCategory.parentsAmount = AllCategories[i].parentsAmount+1;
          newCategory.parentsList   = AllCategories[i].parentsList +' - '+ AllCategories[i].name;
          if (i == AllCategories.length-1) {
          // last item of list
            addItem = true;
            lastItem = true; // CHECKEAR ESTO
          }
        }
        // add item to array
        if (addItem) {
          AllCategories.splice(i + (lastItem ? 1 : 0), 0, this.copyObj(newCategory));
          return true;
        }
      } // for in AllCategories
      return false;
    },
    addPoints(val) {
      if (!val || !+val) return '0';
      let isNegative = val < 0;
      val = this.showPrice(Math.abs(val));
      let decimal = val.substring(val.length-2, val.length);
      let int = val.substring(0, val.length-3);
      let reversedInt = this.reverseString(int);
      let reversedRealInt = '';
      for (var i = 0; i < reversedInt.length; i++) {
        reversedRealInt += reversedInt.charAt(i);
        if (i+1 >= reversedInt.length) continue;
        if ((i+1) % 3) continue;
        reversedRealInt += '.';
      }
      let finalInt = this.reverseString(reversedRealInt);
      // let finalValue = finalInt + ',00';
      let finalValue = `${finalInt},${decimal}`;
      if (isNegative) finalValue = '-'+ finalValue;
      return finalValue;
    },
    arrayToText(array) {
      let msg = '';
      for (var i = 0; i < array.length; i++) {
        if (i != 0) {
          msg += i == array.length-1 ? ' y ' : ', ';
        }
        msg += `"${array[i]}"`;
      }
      return msg;
    },
    callPhone(phone) {
      console.log(`Llamo al ${phone}`);
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    checkDBResponse(res) {
      if (typeof res == 'undefined') {
        console.log('Response UNDEFINED');
        return false;
      }
      if (typeof res.data == 'undefined') {
        console.log('ERROR en PHP1:');
        console.log(res);
        return false;
      }
      if (typeof res.data.data == 'undefined') {
        console.log('ERROR en PHP2:');
        console.log(res.data);
        return false;
      }
      if (res.data.error) {
        console.log('ERROR en DB:');
        console.log(res.data.data);
        return false;
      }
      return true;
    },

    checkKeyPressArray(array) {
      // check if an specific key is pressed
      let Dictionary = {
        esc: 27,
        enter: 13,
      }
      document.addEventListener('keyup', function (evt) {
        for (let Item of array) {
          if (Dictionary[Item.key] === evt.keyCode) {
            if (typeof Item.params == 'undefined') {
              Item.callback();
            } else {
              Item.callback(Item.params);
            }
          }
        }
      });
    },

    closeLoaderMain() {
      this.$nextTick(() => {
        // setTimeout( ()=> {
          this.$vs.loading.close()
        // }, 2000);
      });
    },

    closeLoadingOfContainer(container) {
      this.$nextTick(() => {
        this.$vs.loading.close(`${container} > .con-vs-loading`);
      });
    },
    conectToDB(Params, isFormData = false) {
      if (typeof Params.error == 'undefined') {
        Params.error = function(error) { console.log(error); }
      }
      if (typeof Params.params == 'undefined') {
        Params.params = {};
      }
      let url = this.publicPath +'php/'+ Params.file +'.php';
      var RealParams = Params.params;
      let subdomain = this.isLocalhost ? 'localhost' : this.getSubdomain();
      if (!isFormData) {
        RealParams.action = Params.action;
        RealParams._subdomain = subdomain;
      } else { // if isFormData
        RealParams.append('action', Params.action);
        RealParams.append('_subdomain', subdomain);
      }
      this.$http.post(url, RealParams).then(Params.success).catch(Params.error);
    },
    copyArray(array) {
      let newArray = [];
      for (let item of array) {
        newArray.push(this.copyObj(item));
      }
      return newArray;
    },
    copyObj(obj) {
      // Pay atention, this only copy one level of deepness. It's a "shallow copy"
      return Object.assign({}, obj);
    },
    copyToClipboard(text, msg = '') {
      this.$nextTick(() => {
        // RECORDAR SIEMPRE MANDAR EL FUNC EN FORMATO () =>, no en function(), (por el uso del this)
        var copyText = document.getElementById("copyText");
        copyText.textContent = text;
        copyText.style.display = 'block';
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        copyText.style.display = 'none';

        // notifications
        if (msg != '') {
          this.myNotify('success', 'Éxito', msg);
        }
      }); // nextTick
    },
    comparableStr(str) {
      str = this.removeDiacritics(str).toLowerCase();
      str = str+ ' ';
      // doble char
      str = str.split('tt').join('t');
      str = str.split('pp').join('p');
      str = str.split('cc').join('c');

      str = str.split('v' ).join('b' );
      // str = str.split('ci').join('si');
      // str = str.split('ce').join('se');
      str = str.split('z' ).join('s' );
      str = str.split('h' ).join(''  );
      str = str.split('ñ' ).join('ni');
      str = str.split('ka').join('ca');
      str = str.split('ko').join('co');
      str = str.split('qu').join('k' );
      str = str.split('q' ).join('k' );
      str = str.split('ku').join('cu');
      str = str.split('j' ).join('g' );
      // str = str.split('kc').join('c'); comment Para no perder tiempo, porque no se usa nunca
      str = str.split('ck').join('c');
      str = str.split('de ') .join(' ');
      str = str.split('con ').join(' ');
      str = str.split('s ').join(' ');
      return str;
    },
    compareSearch(search, compare) {
      // compare is an array of str to compare
      search = search.split(' ');
      for (let word of search) {
        if (word == '') continue;
        let isFinded = false;
        for (let str of compare) {
          if (str.includes(word)) {
            isFinded = true;
            continue
          }
        }
        if (!isFinded) return false;
      }
      return true;
    },
    dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a,b) {
        var result = (a[property].toUpperCase() < b[property].toUpperCase()) ? -1 : (a[property].toUpperCase() > b[property].toUpperCase()) ? 1 : 0;
        return result * sortOrder;
      }
    },
    filterSearch(Params) {
      // required: search, productsArray, action
      // optionals: finalCallback
      Params.prop = typeof Params.prop == 'undefined' ? 'fullName': Params.prop;
      let search = this.removeWhiteSpaces(Params.search);
      search = this.comparableStr(search);
      // Filter search
      for (let Product of Params.productsArray) {
        let name = this.comparableStr(Product[Params.prop]);

        // FIJARSE SI NO HAY UNA CATEGORÍA CON ESE NOMBRE

        let value = this.compareSearch(search, [name]);
        Params.action(Product, value);
      } // for
      if (typeof Params.finalCallback != 'undefined') {
        Params.finalCallback();
      }
    },
    findInArrayByField(arr, field, value) {
      for (let i in arr) {
        if (arr[i] == value) return arr[i];
      }
      return false;
    },
    getBuyerAddress(Buyer) {
      if (Buyer.buyerCityID == 0) return '';
      let allFields = ['streetName', 'streetNumber', 'floorAndDepartment', 'extraReferences', 'city', ];
      for (let i in allFields) {
        let realField = Buyer['buyer'+ this.capitalize(allFields[i])];
        if (typeof realField != 'undefined') {
          Buyer[allFields[i]] = realField;
        }
      }
      return this.getFullAddress(Buyer);
    },
    getFullAddress(Address, hiddenParam) {
      if (typeof Address == 'undefined') return '';
      if (Address.cityID == 0) return '';
      // check hidden
      let Hidden = {};
      if (typeof hiddenParam == 'string') Hidden[hiddenParam] = true;
      if (typeof hiddenParam == 'object' /* array */) {
        for (var i = 0; i < hiddenParam.length; i++) {
          Hidden[hiddenParam[i]] = true;
        }
      }
      // Add info
      let fullAddress = `${Address.streetName} ${Address.streetNumber}`;
      fullAddress += !Address.floorAndDepartment ? '' : ` ${Address.floorAndDepartment}`;
      fullAddress += !Address.city || Hidden.city ? '' : `, ${Address.city}`;
      fullAddress += !Address.extraReferences || Hidden.extraReferences ? '' : ` (${Address.extraReferences})`;
      return fullAddress;
    },
    getFullName(User) {
      return `${User.name} ${User.surname}`;
    },
    getFullReceptionTime(Sale) {
      return this.minToHour(Sale.receptionTime) +' a '+ this.minToHour(+Sale.receptionTime + +Sale.receptionTimeRange);
    },
    getAudio(path, isStatic = true) {
      let time = isStatic ? '' : '?timestamp=' + new Date().getTime();
      return this.publicPath + '/audio/' + path + time;
    },
    getImg(path, isStatic = true) {
      let time = isStatic ? '' : '?timestamp=' + new Date().getTime();
      return this.publicPath + this.imagesFolder + path + time;
    },
    getImgDual(file) {
      if (this.isIphone) {
        return this.getImg(`catalogue/jpg/${file}.jpg`);
      }
      return this.getImg(`catalogue/${file}.webp`);
    },
    getRealPrice(Item) {
      return this.showPrice(+Item.offert ? Item.offert : Item.price)
    },
    getRealPriceFloat(Item) {
      return +Item.offert ? Item.offert : Item.price;
    },
    getRealPriceType(Item) {
      return +Item.offert == 0 ? 'price' : 'offert';
    },
    getStockColor(stock, stockAlert) {
      if (stock == null) { // hasInfiniteStock
        let pickUpPlaceHasStock = stockAlert;
        if (pickUpPlaceHasStock) { return '#22223E'; }
        else { return 'danger'; }
      }
      if(stock <= 0) return 'danger';
      if(stock <= stockAlert) return 'warning';
      if(stock > stockAlert) return 'success';
      return 'primary';
    },
    getThis() {
      return this;
    },
    isAnyUndefined(values) {
      for (let i in values) {
        if (this.isUndefined(values[i])) {
          return true;
        }
      }
      return false;
    },
    isUndefined(value) {
      return typeof value === 'undefined';
    },
    myAlert(title, text, color = 'primary', func = ()=>{}){
      this.$vs.dialog({
        color: color,
        title: title,
        text:  text,
        accept: func
      });
    },
    myConfirm(type, title, text) {
      this.$vs.notify({
        title   : title,
        text    : text,
        color   : type,
        position: 'bottom-right'
      })
    },
    myNotify(type, title, text) {
      this.$vs.notify({
        title   : title,
        text    : text,
        color   : type,
        position: 'bottom-right'
      });
    },
    myScrollTo(y = 0, x = 0) {
      // to get element height use el.offsetTop
      window.scrollTo({
        top: y,
        left: x,
        behavior: 'smooth'
      });
    },
    objIsEmpty(object) {
      for(var i in object) {
        return false;
      }
      return true;
    },

    openLoadingOfContainer(container, Params = {}) {
      return;
      if (typeof container == 'undefined') return;
      Params.container = container;
      Params.background = typeof Params.background == 'undefined' ? 'primary' : Params.background;
      Params.color = typeof Params.color == 'undefined' ? '#FFF' : Params.color;
      Params.scale = typeof Params.scale == 'undefined' ? 0.45 : Params.scale;
    },

    pad(num, size) {
      return ('000000000' + num).substr(-size);
    },

    pricing(num) {
      return '$'+ parseFloat(num).toFixed(2).replace('.', ',');
    },

    renameToLabel(obj, oldName = 'name') {
      for (var i in obj) {
        obj[i]['label'] = obj[i][oldName];
      }
      return obj;
    },

    removeNoNumber(str, isFloat = false) {
      let newStr = '';
      str = str.toString();
      for (let i = 0; i < str.length; i++) {
        if (str[i] == parseInt(str[i])) {
          newStr += str[i];
        } else if ((isFloat && str[i] == ',') || (isFloat && str[i] == '.')) {
          newStr += '.';
          isFloat = false;
        }
      }
      return newStr;
    },

    removeDiacritics(str) {
      // Elimina los diacríticos de un texto excepto si es una "ñ" (ES6)
      return str
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
        .normalize();
    },
    removeWhiteSpaces(text) {
      text = text.trim();
      text = text.replace(/\s\s+/g, ' '); // replace multiple whitespace with one
      return text;
    },
    reproduceAudio(path) {
      if(path) {
        var audio = new Audio(path);
        audio.play();
      }
    },
    reverseString(str) {
      str = String(str);
      // Step 1. Use the split() method to return a new array
      var splitString = str.split(""); // var splitString = "hello".split("");
      // ["h", "e", "l", "l", "o"]

      // Step 2. Use the reverse() method to reverse the new created array
      var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
      // ["o", "l", "l", "e", "h"]

      // Step 3. Use the join() method to join all elements of the array into a string
      var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
      // "olleh"

      //Step 4. Return the reversed string
      return joinArray; // "olleh"
    },


    setFocusVsInput(ref, select = false) {
      setTimeout(() => {
        let el = this.$refs[ref].$el.children[0].children[0];
        if (!select) { el.focus(); }
        else { el.select(); }
      }, 10);
    },

    showPrice(num) {
      if (num == '') return '0';
      return parseFloat(num).toFixed(2);
    },

    showPaymentPrediction(prediction) {
      if (prediction == '') return '';
      if (prediction == +prediction) return `(Paga $${prediction})`;
      return '';
    },


    updateProductStock(Params) {
      // required Params: productID, amount, websiteZoneID
      let stockIsNotWorking = (!this._Branch.isStockWorking && Params.websiteZoneID == this._localDB.StockChangesWebsiteZoneIDs.sale);
      if (stockIsNotWorking) return;
      console.log('Paso a cambiarlo');
      Params.branchID = this.getBranchID();
      Params.reasonID = Params.reasonID ? Params.reasonID : 0;
      Params.notes = Params.notes ? Params.notes : '';
      Params.employeeID = localStorage.userID ? localStorage.userID : 0;
      Params.websiteZoneID = Params.websiteZoneID ? Params.websiteZoneID : 0;
      Params.change = Params.amount;
      Params.date = Params.date ? Params.date : this.getActualDatetimeToDB();
      console.log(Params);
      const realParams = this.copyObj(Params);
      this.conectToDB({
        file: 'Stock', action: 'updateProductStock', params: realParams,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          console.log(res.data);
          this.updateProductStock_addStockChange(realParams);
        }, error: (error) => {
          this.myNotify('danger', 'Error', error);
          console.log('Falló y pruebo de nuevo');
          this.updateProductStock(Params);
        },
      });
    },
    updateProductStock_addStockChange(Params) {
      this.conectToDB({
        file: 'Stock', action: 'addStockChange', params: this.copyObj(Params),
        success: function(res){
          if (res.data.error) { console.log(res.data.data); return; }
        }
      });
    },

    validateFields(Parent, obj) {
      if (this.Buyer.isAdmin) return true;
      let requireds = [];
      for (let prop in obj) {
        if (Parent[prop]) {
          this.Validate[prop] = false;
        } else {
          this.Validate[prop] = true;
          // this.myNotify('error', 'Error', `Falta completar el campo ${obj[prop]}`);
          requireds.push(obj[prop]);
        }
      }
      let msg = this.arrayToText(requireds)
      if (msg) {
        if (requireds.length == 1) {
          alert(`Falta completar el campo: ${msg}`);
        } else {
          alert(`Faltan completar los campos: ${msg}`);
        }
        return false;
      }
      return true;
    },
  }, // METHODS
}
