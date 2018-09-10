<template>
    <div>
        <v-text-field prepend-icon="attach_file" clearable @click:clear="cleared" single-line
                      v-model="file" :label="message" required
                      @click.native="onFocus"
                      ref="fileTextField"></v-text-field>
        <input type="file" multiple="false"
               ref="fileInput" @change="onFileChange">
    </div>
</template>

<script>
export default {
	props: ['value', 'message'],
	data() {
		return {
			file: ''
		};
	},
	methods: {
		onFocus() {
			if (!this.disabled) {
				this.$refs.fileInput.click();
			}
		},
		cleared() {
			console.log('remove file');
			this.$refs.fileInput.value = null;
			this.$emit('input', null);
		},
		onFileChange($event) {
			const files = $event.target.files || $event.dataTransfer.files;
			const file = files[0];
			this.file = file.name;
			this.$emit('input', file);
		}
	}
};
</script>
<style scoped>
input[type='file'] {
	position: absolute;
	left: -99999px;
}
</style>
