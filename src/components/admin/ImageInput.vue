<template>
    <div>
        <input type="file" @change="handleImage" accept="image/x-png,image/jpeg,image/gif">
    </div>
</template>

<script>
export default {
    name: 'ImageInput',
    data() {
        return {
            pictureDataBase64: ''
        }
    },
    methods: {
        handleImage(event) {
            const selectedImage = event.target.files[0];
            this.emitBase64(selectedImage);
        },

        emitBase64(fileObject) {
            const reader = new FileReader();
            reader.onload = () => {
                this.pictureDataBase64 = reader.result;
                this.$emit('event-emit-base64', this.pictureDataBase64)
            };
            reader.onerror = function (error) {
                alert(error);
            }
            reader.readAsDataURL(fileObject);
        },

        setPictureDataBase64(pictureDataBase64) {
            this.pictureDataBase64 = pictureDataBase64
        },
    }
}
</script>