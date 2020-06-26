<template>
  <div class="allImgContainer">
    <h5 class="text-center mt-2 mb-2" v-if="title">{{ title }}</h5>
    <!-- Button -->
    <div class="loadImgBTN" @click="$refs.fileInput.click()" v-if="photoData.length == 0">Imagen</div>
    <!-- preview -->
    <div class="imgPreview" v-if="photoData.length > 0">
      <img :src="photoData" alt="Imagen">
      <!-- Close button -->
      <feather-icon icon="XIcon" class="deleteImgBTN"  @click="photoData = ''" v-if="photoData != ''"></feather-icon>
    </div>
    <!-- Real input -->
    <input type="file" @change="uploadPhoto($event)" ref="fileInput" accept="image/*" v-show="false">
  </div>
</template>

<script>
export default {
  name: 'UploadPhoto',
  props: {
    value: { type: String, default: '' }, // we will store base64 format of image in this string
    title: { type: String, default: '', },
    fileName: { type: String, required: true, },
    format: { type: String, required: true, },
    destinationURL: { type: String, required: true, },
  }, // PROPS
  data() {
    return {
      // photoData: '',
    } // return DATA
  }, // DATA

  computed: {
    photoData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  }, // COMPUTED

  methods: {
    uploadPhoto(event) {
      let format = this.format;
      this.response = event;
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (!input.files || !input.files[0]) return;
      // Check file extension
      let fileName = input.files[0].name;
      let ext3 = fileName.substring(fileName.length-3, fileName.length);
      let ext4 = fileName.substring(fileName.length-4, fileName.length);
      if (ext3 != format && ext4 != format) {
        this.myNotify('danger', '¡Error!', `Solo se permite el formato .${format}`);
        return;
      }
      // create a new FileReader to read this image and convert to base64 format
      var reader = new FileReader();
      // Define a callback function to run, when FileReader finishes its job
      reader.onload = (e) => {
        // Note: arrow function used here, so that "this.photoData" refers to the photoData of Vue component
        // Read image as base64 and set to photoData
        this.photoData = e.target.result;
      }
      // Start the reader job - read file as a data url (base64 format)
      reader.readAsDataURL(input.files[0]);

      // Send it by ajax -
      var formData = new FormData();
      formData.append("file", input.files[0]);

      // // Show info
      // for (var pair of formData.entries()) {
      //   console.log(pair[0]);
      //   console.log(pair[1]);
      //   console.log('---------');
      // }

      formData.append('fileName', this.fileName);
      formData.append('destinationURL', `images/${this.destinationURL}/`);
      let isFormData = true;
      this.conectToDB({
        file: 'Uploads', action: 'newUpload', params: formData,
        success: (res) => {
          if (res.data.error) { console.log(res.data.data); return; }
          console.log('newIMG', res.data);
        }, error: (error) => { this.myNotify('danger', 'Error', error); console.log(error); },
      }, isFormData);
    }, // uploadPhoto

  }, // METHODS

} // export default
</script>

<style lang="scss" scoped>

  .allImgContainer {
    width: 100%;
    position: relative;
    margin-top: 5px;
  }
  .loadImgBTN {
    // Para que esté default se puede usar la clase con-input-upload
    background-color: #F5F5F5;
    border-radius: 5px;
    height: 200px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: 1px dashed rgba(0,0,0,.1);
    font-weight: 600;
    cursor: pointer;
  }
  .loadImgBTN:hover {
    border-color: rgba(21, 176, 206, .5); /* 50% of #15B0CE */
  }
  .loadImgBTN:focus {
    // border-color: #15B0CE;
  }
  .deleteImgBTN {
    background-color: rgba(0, 0, 0, .25);
    height: 35px;
    width: 35px;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.1);
    color: white;
    position: absolute !important;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
  .imgPreview {
    position: relative;
    width: 100%;
    height: 250px;
  }
  .imgPreview img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
    display: block;
    margin-right: auto;
    margin-left: auto;
  }

</style>
