const handleDeleteProfile = async (userId, freelancerId) => {
    setIsSubmitting(true);
    try {
        // Delete user profile
        const userDeleteResponse = await processDeleteProfile(userId);
        
        // Delete freelancer profile if freelancerId is provided
        let freelancerDeleteResponse;
        if (freelancerId) {
            freelancerDeleteResponse = await processDeleteFreelance(freelancerId);
        }

        // Check if both deletions were successful
        if (userDeleteResponse && (!freelancerId || freelancerDeleteResponse)) {
            toast.success("User profile deleted successfully");
            window.location.reload(); // Reload the page to reflect changes
        } else {
            toast.error("Failed to delete profile");
        }

    } catch (error) {
        toast.error("Failed to delete profile");
        console.error("Delete profile error:", error);
    } finally {
        setIsSubmitting(false);
    }
};