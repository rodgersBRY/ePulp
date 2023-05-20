<template>
    <v-dialog v-model="display" width="350px">
        <v-card class="text-center pa-4">
            <v-icon size="100" color="red">mdi-alert-circle-outline</v-icon>
            <v-card-text class="mt-3" v-html="errorText"></v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text block @click="$emit('close-dialog')">close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'error',

    props: {
        display: {
            type: Boolean,
            default: false,
        },
        errorText: String
    },

    // data() {
    //     return {
    //         showDialog: false
    //     }
    // }
}
</script>