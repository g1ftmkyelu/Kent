import axios from "axios";
import Swal from "sweetalert2";
import { getSystemConfig } from "./getSystemConfig";
import { useRouter } from "vue-router";
import store from "../stores";
import { effects } from "./effects";
import { helpers } from "./helpers";
const Config = getSystemConfig();

const router = useRouter();

const resourceFunctions = [
  {
    name: "get",
    icon: "fa fa-eye",
    key: "getResources",
    value: async (payload) => {
      const { resource, params } = payload;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/${resource}`,
          { params }
        );

        console.log(response.data.data, "my data");

        return {
          resources: response.data.data,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages,
        };
      } catch (error) {
        console.error("Error fetching resource:", error);
        throw error;
      }
    },
  },
  {
    name: "create",
    icon: "fa fa-plus",
    key: "addResource",
    value: async (payload) => {
      const { resource, data } = payload;

      try {
        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/${resource}/user`,
          data
        );
        return `added an item in ${resource}`;
      } catch (error) {
        console.error(`Error adding ${resource}:`, error.message);
        throw error;
      }
    },
  },
  {
    name: "update",
    icon: "fa fa-edit",
    key: "updateResource",
    value: async (payload) => {
      const { resource, data } = payload;
      const id = data._id || data.id;

      try {
        await axios.patch(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/${resource}/${id}`,
          data
        );
        return `updated an item in ${resource}`;
      } catch (error) {
        console.error(`Error updating ${resource}:`, error.message);
        throw error;
      }
    },
  },
  {
    name: "delete",
    icon: "fa fa-trash",
    key: "deleteResource",
    value: async (payload) => {
      const { resource, id, router } = payload;

      try {
        // Show a confirmation dialog using SweetAlert
        const result = await Swal.fire({
          title: "Are you sure?",
          text: `Do you want to delete this ${resource}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        });

        // If the user confirms, delete the record
        if (result.isConfirmed) {
          await axios.delete(
            `${import.meta.env.VITE_APP_API_URL}/api/v1/${resource}/${id}`
          );
          await Swal.fire({
            title: "Success",
            text: `Item deleted from ${resource} successfully`,
            icon: "success",
            timer: 1000, // Timer in milliseconds (2 seconds)
            timerProgressBar: true,
            showConfirmButton: false, // Optional: Hides the "OK" button
          });

          window.location.reload();
          return;
        } else {
          // If the user cancels, show a message that the record is safe
          await Swal.fire({
            title: "Canceled",
            text: `The ${resource} is safe.`,
            icon: "info",
          });
          return `Deletion canceled for ${resource}`;
        }
      } catch (error) {
        console.error(`Error deleting ${resource}:`, error.message);
        throw error;
      }
    },
  },
  {
    name: "view",
    icon: "fa fa-eye",
    key: "goToView",
    value: async (payload) => {
      const { resource, path, id, router, mode, fullResource } = payload;
      let url;
      console.log(mode, "nde render mode");

      if (mode === "object") {
        url = `/dashboard/${path}/${id}/object`;
      } else {
        if (fullResource.isPortal) {
          url = `/${fullResource.portalDefinition.name}?myParam=${id}`;
        } else {
          url = `/dashboard/${path}/${id}/view`;
        }
      }

      // Using vue-router's programmatic navigation
      router.push(url); // Use `router.replace(url)` if you want to replace the current route in history
    },
  },
  {
    name: "edit",
    icon: "fa fa-edit",
    key: "goToEdit",
    value: async (payload) => {
      const { resource, path, id, router } = payload;
      const url = `/dashboard/${path}/${id}/edit`;

      // Using vue-router's programmatic navigation
      router.push(url);
    },
  },
  {
    name:"navigateToAdd",
    icon:"fa fa-plus",
    key:"navigateToAdd",
    value:async(payload)=>{
      const {resource,path,router}=payload
      const url=`/dashboard/${path}/item/add`
      router.push(url)
    }
  },
  {
    name: "invoice",
    icon: "fa fa-file-invoice",
    key: "generateInvoice",
    value: async (payload) => {
      const { id } = payload;
      const url = `/dashboard/invoice/${id}`;
      window.open(url, "_blank");
    },
  },
  {
    name: "ActivateAccount",
    icon: "fa fa-check",
    key: "ActivateAccount",
    value: async (payload) => {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to activate this account?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, activate it!",
      });

      if (confirmation.isConfirmed) {
        const { id } = payload;

        try {
          // Attempt to activate the account
          await axios.patch(
            `${import.meta.env.VITE_APP_API_URL}/api/v1/users/${id}`,
            { isAccountActive: true }
          );
          await effects.sendWebPushNotification(
            "Notification Title",
            "This is the notification body",
            "https://firebasestorage.googleapis.com/v0/b/server-services-50a49.appspot.com/o/logo%2FScreenshot_20240909_032140-removebg-preview.png?alt=media&token=9a1f7696-5ea8-45dd-839c-4476d1c7bd0a",
            [
              "foEDhQg4S5p4kBJWCZjK-J:APA91bHC72Y7Kx2RNAJ4V2MNLAt03vKsMuisBdysZOD2GHGBo4ui3L9Rqbl4YkueVWG6hfbC0Rpkcflj6xEgPXl8YeGnC83BkLsW6lw5bmJRpw4a6tAJ55wQa8gnjF7KQuPDo94nVHiS",
            ]
          );
          // Show success message
          await Swal.fire({
            title: "Success",
            text: "Account activated successfully",
            icon: "success",
            timer: 1000, // Timer in milliseconds (1 second)
            timerProgressBar: true,
            showConfirmButton: false, // Optional: Hides the "OK" button
          });

          // Reload the page after success
          //  window.location.reload();
          return "Account activated successfully";
        } catch (error) {
          // Handle errors
          console.error("Error activating account:", error);

          // Show error message based on the type of error
          let errorMessage =
            "An unexpected error occurred. Please try again later.";
          if (error.response) {
            // The request was made and the server responded with a status code
            errorMessage = `Error: ${
              error.response.data.message || "Failed to activate account."
            }`;
          } else if (error.request) {
            // The request was made but no response was received
            errorMessage =
              "Network error: Please check your internet connection.";
          }

          await Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "Try Again",
          });

          return "Account activation failed"; // Optional: Return a fallback message
        }
      }
    },
  },
  {
    name: "DeactivateAccount",
    icon: "fa fa-times",
    key: "DeactivateAccount",
    value: async (payload) => {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to deactivate this account?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, deactivate it!",
      });

      if (confirmation.isConfirmed) {
        const { id } = payload;

        try {
          // Attempt to deactivate the account
          await axios.patch(
            `${import.meta.env.VITE_APP_API_URL}/api/v1/users/${id}`,
            { isAccountActive: false }
          );

          // Show success message
          await Swal.fire({
            title: "Success",
            text: "Account deactivated successfully",
            icon: "success",
            timer: 1000, // Timer in milliseconds (1 second)
            timerProgressBar: true,
            showConfirmButton: false, // Optional: Hides the "OK" button
          });

          // Reload the page after success
          window.location.reload();
          return "Account deactivated successfully";
        } catch (error) {
          // Handle errors
          console.error("Error deactivating account:", error);

          // Show error message based on the type of error
          let errorMessage =
            "An unexpected error occurred. Please try again later.";
          if (error.response) {
            // The request was made and the server responded with a status code
            errorMessage = `Error: ${
              error.response.data.message || "Failed to deactivate account."
            }`;
          } else if (error.request) {
            // The request was made but no response was received
            errorMessage =
              "Network error: Please check your internet connection.";
          }

          await Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "Try Again",
          });

          return "Account deactivation failed"; // Optional: Return a fallback message
        }
      }
    },
  },
  {
    name: "ResetPassword",
    icon: "fa fa-key",
    key: "ResetPassword",
    value: async (payload) => {
      const { id } = payload;
      const defaultPassword = "password123";

      try {
        // Attempt to reset the password
        await axios.patch(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/users/${id}`,
          { password: defaultPassword }
        );

        // Show success message
        await Swal.fire({
          title: "Success",
          text: "Password reset successfully",
          icon: "success",
          timer: 1000, // Timer in milliseconds (1 second)
          timerProgressBar: true,
          showConfirmButton: false, // Optional: Hides the "OK" button
        });

        // Reload the page after success
        window.location.reload();
        return "Password reset successfully";
      } catch (error) {
        // Handle errors
        console.error("Error resetting password:", error);

        // Show error message based on the type of error
        let errorMessage =
          "An unexpected error occurred. Please try again later.";
        if (error.response) {
          // The request was made and the server responded with a status code
          errorMessage = `Error: ${
            error.response.data.message || "Failed to reset password."
          }`;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage =
            "Network error: Please check your internet connection.";
        }

        await Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Try Again",
        });

        return "Password reset failed"; // Optional: Return a fallback message
      }
    },
  },
  {
    name: "ApproveClaim",
    icon: "fa fa-check",
    key: "ApproveClaim",
    value: async (payload) => {
      const { id } = payload;
      try {
        const approval = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to approve this claim?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, approve it!",
        });

        if (approval.isConfirmed) {
          const response = await axios.patch(
            `${import.meta.env.VITE_APP_API_URL}/api/v1/claims/${id}`,
            { status: "Approved" }
          );

          const claimant = await helpers.getResource({
            resource: "users",
            id: response.data.claimant,
          });
          await effects.sendWebPushNotification(
            "Claim Approval",
            `Dear ${claimant.data.fullname}, We are pleased to inform you that your claim has been approved.`,
            "https://www.google.com",
            claimant.data.fcmTokens,
            claimant.data._id
          );

          // Show success message
          await Swal.fire({
            title: "Success",
            text: "Claim approved successfully",
            icon: "success",
            timer: 1000, // Timer in milliseconds (1 second)
            timerProgressBar: true,
            showConfirmButton: false, // Optional: Hides the "OK" button
          });

          // Reload the page after success
          window.location.reload();
          console.log(response.data);
          return response.data.message || "Claim approved"; // Adjusted to return the server's message if available
        }

        return "Claim approval canceled"; // Message for when the user cancels the approval
      } catch (error) {
        console.error("Error approving claim:", error);
        return "Failed to approve claim"; // Error message for catch block
      }
    },
  },
  {
    name: "RejectClaim",
    icon: "fa fa-times",
    key: "RejectClaim",
    value: async (payload) => {
      const { id } = payload;
      try {
        const rejection = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to reject this claim?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, reject it!",
        });

        if (rejection.isConfirmed) {
          const response = await axios.patch(
            `${import.meta.env.VITE_APP_API_URL}/api/v1/claims/${id}`,
            { status: "Rejected" }
          );

          const claimant = await helpers.getResource({
            resource: "users",
            id: response.data.claimant,
          });
          await effects.sendWebPushNotification(
            "Claim Rejection",
            `Dear ${claimant.data.fullname}, We are sorry to inform you that, your claim has been rejected.`,
            "https://www.google.com",
            claimant.data.fcmTokens,
            claimant.data._id
          );

          console.log(claimant.data.fcmTokens);
          // Show success message
          await Swal.fire({
            title: "Success",
            text: "Claim rejected successfully",
            icon: "success",
            timer: 1000, // Timer in milliseconds (1 second)
            timerProgressBar: true,
            showConfirmButton: false, // Optional: Hides the "OK" button
          });

          // Reload the page after success
          //window.location.reload();
          //console.log(response.data);
          return response.data.message || "Claim rejected"; // Adjusted to return the server's message if available
        }

        return "Claim rejection canceled"; // Message for when the user cancels the rejection
      } catch (error) {
        console.error("Error rejecting claim:", error);
        return "Failed to reject claim"; // Error message for catch block
      }
    },
  },
  {
    name: "OpenModal",
    icon: "fa fa-eye",
    key: "OpenModal",
    value: async (payload) => {
      // payload should contain the modalType and any data you want to pass to the modal
      const { data } = payload;
      const { modalType, modalData } = data;
      await store.dispatch("modal/showModal", { modalType, modalData });
    },
  },
];

export default resourceFunctions;
