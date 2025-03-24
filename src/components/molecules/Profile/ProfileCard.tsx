import React from 'react';
import CoverUpload from './coverUpload';
import AvatarUpload from './avatarUpload';
import Users from '@typeDefs/user';

interface IProps {
  user: Users;
  edit?: boolean;
}

const ProfileCard: React.FC<IProps> = ({ user = null, edit = false }) => {
  return (
    <div className="md:max-w-full rounded-lg shadow-lg bg-white overflow-hidden">
      <CoverUpload coverId={user?.coverId} edit={edit} />
      <div className="px-6 pb-6 md:flex md:items-start justify-between">
        <div className="md:flex md:items-start">
          {/* Profile image overlapping the cover */}
          <AvatarUpload
            user={{ avatarId: user?.avatarId, firstName: user?.firstName }}
            edit={edit}
          />
          <div className="text-center mt-3 md:text-left md:ml-6">
            <div className="flex items-baseline justify-center md:justify-start">
              <h2 className="text-xl font-bold text-gray-800">
                {user?.lastName}, {user?.firstName}
              </h2>
              <svg className="w-5 h-5 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-600 mt-1">{user?.jobPosition}</p>
            <a href={`tel:${user?.phone}`} className="mt-1 text-blue-600 hover:text-blue-800">
              <p>{user?.phone}</p>
            </a>
            <a href={`mailto:${user?.email}`} className="mt-1 text-blue-600 hover:text-blue-800">
              {user?.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
