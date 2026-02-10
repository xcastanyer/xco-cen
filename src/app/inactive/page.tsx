import LogoutButton from "@/components/auth/LogoutButton";

export default function InactivePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <div className="mb-6">
                    <svg
                        className="mx-auto h-16 w-16 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Cuenta Pendiente de Activación</h2>
                <p className="text-gray-600 mb-8">
                    Tu cuenta ha sido registrada pero aún no está activa. Por favor, espera a que un administrador active tu acceso.
                </p>
                <div className="flex justify-center">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}
