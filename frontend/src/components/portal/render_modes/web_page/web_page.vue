
<template>
    <WidgetRenderer :widgets="resource.widgets" />
    <Action_dispatcher :resource="{
        actions: [
            {
                name: 'bookmark',
                icon: 'fa fa-bookmark',
                label: 'Open Bookmarks',
            },
            {
                name: 'wishlist',
                icon: 'fa fa-heart',
                label: 'Open Wishlist',
            },
            {
                name: 'cart',
                icon: 'fa fa-shopping-cart',
                label: 'Open Cart',
            },
            {
                name: 'orders',
                icon: 'fa fa-shopping-bag',
                label: 'Open my Orders',
            },
            {
                name: 'profile',
                icon: 'fa fa-user',
                label: 'Open Profile',
            },
            
        ],
    }" :item="{}" :orientation="'fab'" />
</template>
<script>
import Action_dispatcher from '../../../action_dispatcher.vue';
import WidgetRenderer from '../../../widgets/widget_renderer.vue';
export default {
    components: {
        WidgetRenderer,
        Action_dispatcher
    },
    props: {
        resource: {
            type: Object,
            required: true,
        },
    }
}
</script>