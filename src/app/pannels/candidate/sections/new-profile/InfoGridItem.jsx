export const InfoGridItem = ({ icon, title, children }) => (
          <div className="bg-white px-2 py-2">
            <div className="flex flex-col items-start justify-start -space-y-3">
              <h3 className="text-sm font-medium text-black">{title}</h3>
              <div className='flex items-center -space-x-3'>
                <div className="flex items-start text-[#4B5563]">
                  {icon}
                </div>
                {children}
              </div>
            </div>
          </div>
        );