export default function Timeline({ steps }) {
    return (
        <div className="relative">
            {steps.map((step, index) => (
                <div key={step.id} className="relative pl-10 pb-8 last:pb-0">
                    {/* Vertical Line */}
                    {index !== steps.length - 1 && (
                        <div className="absolute left-[15px] top-8 w-0.5 h-full bg-sky-200" />
                    )}
                    
                    {/* Step Number Circle */}
                    <div className="absolute left-0 top-0 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {step.step_number}
                    </div>
                    
                    {/* Content */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">{step.step_title}</h4>
                        <p className="text-sm text-gray-600">{step.step_description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
