import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useJobCartStore = create(
    persist(
        (set, get) => ({
            jobs: [],
            addJob: (job) => {
                console.log("Adding job:", job);

                // Ensure job is valid
                if (!job || typeof job !== 'object' || !job.id) {
                    console.error("Invalid job object:", job);
                    return;
                }

                // Ensure jobs is an array and filter out null values
                const currentJobs = Array.isArray(get().jobs) ? get().jobs.filter(j => j) : [];

                // Prevent duplicates
                if (currentJobs.some((j) => j.id === job.id)) {
                    console.warn("Job already exists in the cart");
                    return;
                }

                // Add the job
                set({ jobs: [...currentJobs, job] });

                console.log("Updated jobs:", JSON.parse(localStorage.getItem("job-cart-storage")));
            },
            removeJob: (jobId) => {
                console.log("Removing job with ID:", jobId);
                set((state) => ({
                    jobs: state.jobs.filter((job) => job && job.id !== jobId),
                }));
                console.log("Updated jobs after removal:", JSON.parse(localStorage.getItem("job-cart-storage")));
            },
            clearCart: () => {
                console.log("Clearing job cart...");
                set({ jobs: [] });
                console.log("Cart cleared:", JSON.parse(localStorage.getItem("job-cart-storage")));
            },
        }),
        { name: 'job-cart-storage' } // Saves to localStorage
    )
);
