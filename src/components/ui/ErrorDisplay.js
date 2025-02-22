import { WarningCircle, X } from '@phosphor-icons/react/dist/ssr'
import React from 'react'
import { cn, ConditionalRender } from '@/lib/utils'

const ErrorDisplay = ({ errors, message, onClose }) => {
    const errorContent = message ? [message] : errors

    const renderError = error => {
        if (typeof error === 'string') {
            return error
        }
        if (typeof error === 'object' && error !== null) {
            if (
                Object.keys(error).length === 1 &&
                error.otp &&
                Array.isArray(error.otp)
            ) {
                return error.otp[0]
            }
            return (
                <ul className="list-disc list-inside">
                    {Object.entries(error).map(([key, value], index) => (
                        <li key={index}>
                            <strong>{key}:</strong>{' '}
                            {typeof value === 'string'
                                ? value
                                : JSON.stringify(value)}
                        </li>
                    ))}
                </ul>
            )
        }
        return 'Unknown error'
    }
    if (!errors && !message) {
        return null
    }
    return (
        <div className="mt-2 text-red-500 space-y-2">
            <ConditionalRender condition={Array.isArray(errorContent)}>
                {errorContent.map((error, index) => (
                    <div
                        key={index}
                        role="alert"
                        className={cn(
                            'bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center justify-between transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105',
                        )}>
                        <div className="flex items-start">
                            <WarningCircle
                                size={24}
                                className="flex-shrink-0 mr-2"
                            />
                            <p className="text-xs font-semibold break-all">
                                Error - {renderError(error)}
                            </p>
                        </div>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="ml-2 p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-full">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                ))}
            </ConditionalRender>
            <ConditionalRender condition={!Array.isArray(errorContent)}>
                <div
                    role="alert"
                    className={cn(
                        'bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-start justify-between transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105 overflow-hidden',
                    )}>
                    <div className="flex items-start">
                        <WarningCircle
                            size={24}
                            className="flex-shrink-0 mr-2"
                        />
                        <p className="text-xs font-semibold break-all">
                            Error - {renderError(errorContent)}
                        </p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="ml-2 p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-full">
                            <X size={16} />
                        </button>
                    )}
                </div>
            </ConditionalRender>
        </div>
    )
}

export default ErrorDisplay
