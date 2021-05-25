<template>
    <component :is="tag" :to="link" @click.native="ClickEvent">
        <b-icon :icon="icon"></b-icon>{{content}}
    </component>
</template>
<script>
export default {
    name:"base-sidebar-link",
    props:{
        tag:{
            type:String,
            default: "router-link"
        },
        icon:{
            type:String
        },
        content:{
            type:String
        },
        link:{
            type:String,
            default:"#"
        }
    },
    methods:{
        ClickEvent:function(){
            this.$sidebar.displaySidebar(false);
        }
    }
}
</script>