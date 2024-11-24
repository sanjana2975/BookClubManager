
import React, { useState } from 'react';

function Dialog(props){
    if (!props.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={props.onClose}
            />

            {/* Dialog positioning */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Dialog panel */}
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    {/* Close button */}
                    <button
                        onClick={props.onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Content */}
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;