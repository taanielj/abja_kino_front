<template>
    <div class="text text-wrap">
        <input ref="imageInputRef" type="file" v-on:change="handleImage" accept="image/x-png,image/jpeg,image/gif">
    </div>
</template>

<script>
export default {
    name: 'ImageInput',
    data() {
        return {
            imageDataBase64: String
        }
    },
    methods: {
        handleImage(event) {
            try {
                const selectedImage = event.target.files[0];
                if (selectedImage) {
                    this.emitBase64(selectedImage);
                } else {
                    this.$emit('event-emit-base64', '');
                }
            } catch (error) {
                console.log("No file selected");
            }
        },
        emitBase64(fileObject) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imageDataBase64 = reader.result;
                this.$emit('event-emit-base64', this.imageDataBase64)
            };
            reader.onerror = function (error) {
                alert(error);
            }
            reader.readAsDataURL(fileObject);
        },
        resetImageDataBase64(imageDataBase64) {
            this.imageDataBase64 = imageDataBase64;
            this.$refs.imageInputRef.value = "";
        }
    }
}
</script>
