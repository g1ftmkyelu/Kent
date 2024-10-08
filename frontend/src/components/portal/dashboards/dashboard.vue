<template>
  <div>

    <div v-if="user" class="w-full p-4">
      <div>

        <div class="p-12 card flex flex-col sm:flex-row sm:items-center">
          <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <img :src="user.undefined || 'path/to/default/avatar.png'" alt="Profile" class="h-44 w-44 object-fill" />
          </div>
          <div class="flex-grow pl-4">
            <div class="space-y-3">
              <div class="flex items-center">
                <i class="fas fa-user-tag mr-3"></i>
                <p>{{ user.role }}</p>
              </div>
              <div class="flex items-center">
                <i class="fas fa-envelope mr-3"></i>
                <p>{{ user.email }}</p>
              </div>
              <div class="flex items-center">
                <i class="fas fa-phone mr-3"></i>
                <p>{{ user.phoneNumber }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <QuickActions :actions="actions" :limit="20" />
      <QuickStats :Resources="actions" />
    </div>

    <div v-else>
      <Loader />
    </div>
  </div>


</template>

<script>
import { getUserWithRole } from '../../../executables/getSanitizedUser';
import QuickActions from './quick_actions.vue';
import QuickStats from './quick_stats.vue';
import { getFilteredResources } from "../../../executables/accessControl";
import { Resources as AllResources } from "../../../data/resources";
import Loader from '../../u_i/sf_loader._alt.vue';

export default {
  name: 'Home',
  components: {
    QuickActions,
    Loader,
    QuickStats
  },
  data() {
    return {
      user: null,
      actions: []
    };
  },
  async created() {
    try {
      const roleId = localStorage.getItem("role");
      try {
        // Fetch the user with their role
        this.user = await getUserWithRole(localStorage.getItem('userId'));

        // Fetch all resources based on roleId
        let allActions = await getFilteredResources(roleId);

        // Filter to include only actions where action.name === 'goToView'
        this.actions = allActions.filter(resource =>
          resource.actions.some(action => action.name === 'goToView')
        );

        console.log('Filtered Actions:', this.actions);
      } catch (error) {
        console.error('Error fetching actions:', error);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      this.user = {
        _id: "123",
        fullname: "John Doe",
        username: "john",
        email: "qRb2K@example.com",
        role: "admin",
        phoneNumber: "1234567890",
        undefined: "https://via.placeholder.com/150"
      };

      this.actions = AllResources
    }
  },
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
