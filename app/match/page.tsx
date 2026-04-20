"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface FormData {
    category: string;
    ecosystem: string;
    stage: string;
    description: string;
    supportNeeded: string[];
}

const MatchPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        category: '',
        ecosystem: '',
        stage: '',
        description: '',
        supportNeeded: [],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const categories = ['DeFi', 'Gaming', 'Infrastructure', 'NFT', 'Tooling'];
    const ecosystems = ['Solana', 'Ethereum', 'Polygon', 'BNB Chain', 'Multichain'];
    const stages = ['Idea', 'Prototype', 'MVP', 'Live'];
    const supportOptions = ['Funding', 'Mentorship', 'Technical', 'Exposure'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setFormData((prev) => ({
                ...prev,
                supportNeeded: checkbox.checked
                    ? [...prev.supportNeeded, value]
                    : prev.supportNeeded.filter((item) => item !== value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Basic validation
        if (!formData.category || !formData.ecosystem || !formData.stage || !formData.description) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
            console.log('Form Data Submitted:', formData);
            // In a real application, you would send this data to an API
            const response = await fetch("/api/match", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            const matches = result.matches || result.grants || [];
            
            localStorage.setItem("matches", JSON.stringify(result))

            
            router.push("/match/results")
        } catch (err) {
            setError('An error occurred during submission. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
                    Find Your Perfect <span className="text-primary">Grant Match</span>
                </h2>
                <p className="text-center text-lg text-gray-500 mb-10">
                    Tell us about your project to get AI-powered grant recommendations.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Project Category */}
                    <div>
                        <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">
                            What is your project category?
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-xl shadow-sm sm:text-lg"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Blockchain Ecosystem */}
                    <div>
                        <label htmlFor="ecosystem" className="block text-lg font-semibold text-gray-700 mb-2">
                            Which blockchain ecosystem are you building on?
                        </label>
                        <select
                            id="ecosystem"
                            name="ecosystem"
                            value={formData.ecosystem}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-xl shadow-sm sm:text-lg"
                        >
                            <option value="">Select an ecosystem</option>
                            {ecosystems.map((eco) => (
                                <option key={eco} value={eco}>
                                    {eco}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Project Stage */}
                    <div>
                        <label htmlFor="stage" className="block text-lg font-semibold text-gray-700 mb-2">
                            What is your project's current stage?
                        </label>
                        <select
                            id="stage"
                            name="stage"
                            value={formData.stage}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-xl shadow-sm sm:text-lg"
                        >
                            <option value="">Select a stage</option>
                            {stages.map((stg) => (
                                <option key={stg} value={stg}>
                                    {stg}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Project Description */}
                    <div>
                        <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
                            Describe your project in 1-2 sentences
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Example: A DeFi lending protocol that allows users to borrow against their NFT collateral..."
                            className="mt-1 block w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-lg"
                        ></textarea>
                    </div>

                    {/* Support Needed */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-3">
                            What type of support do you need most?
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {supportOptions.map((option) => (
                                <div key={option} className="flex items-center">
                                    <input
                                        id={`support-${option}`}
                                        name="supportNeeded"
                                        type="checkbox"
                                        value={option}
                                        checked={formData.supportNeeded.includes(option)}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <label htmlFor={`support-${option}`} className="ml-2 block text-base text-gray-700">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 text-red-700 bg-red-100 border border-red-200 rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-xl font-bold text-white ${loading ? 'bg-primary-dark cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all duration-300 active:scale-95`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Matching...
                            </>
                        ) : (
                            'Get My Matches'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MatchPage;
