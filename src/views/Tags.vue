<template>
    <div>
        <template>
            <div style="background-color: #ececec; padding: 20px;">
                <template>
                    <div v-for="tag in tags" :key="tag.id">
                        <p>{{tag.name}}</p>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    name: 'tags',
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getTags()
    },
    metaInfo: {
        title: 'TagDefinition',
        meta: {
            
        }
    },
    data() {
        return {
            tags: []
        }
    },
    methods: { 
        ...mapActions({
            getTagCollection: 'tag/getCollection'
        }),
        async getTags() {
            let response = await this.getTagCollection()
            this.tags = response.data.data
        }
    }
}
</script>