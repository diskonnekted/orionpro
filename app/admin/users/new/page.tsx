
import { createUser } from '../actions';

export default function NewUserPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Add New User</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form action={createUser} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">Username <span className="text-red-500">*</span></label>
              <input type="text" name="username" id="username" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <p className="text-xs text-slate-500">Usernames cannot be changed.</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label>
              <input type="email" name="email" id="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="first_name" className="block text-sm font-medium text-slate-700">First Name</label>
              <input type="text" name="first_name" id="first_name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">Last Name</label>
              <input type="text" name="last_name" id="last_name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2">
              <label htmlFor="display_name" className="block text-sm font-medium text-slate-700">Display Name Publicly as</label>
              <input type="text" name="display_name" id="display_name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label htmlFor="user_avatar" className="block text-sm font-medium text-slate-700">Avatar</label>
              <input type="file" name="user_avatar" id="user_avatar" accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition" />
              <p className="text-xs text-slate-500 mt-1">Allowed formats: JPG, PNG, WEBP.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password <span className="text-red-500">*</span></label>
              <input type="password" name="password" id="password" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
            <select name="role" id="role" className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
              <option value="operator">Operator</option>
              <option value="administrator">Administrator</option>
              <option value="editor">Editor</option>
              <option value="author">Author</option>
              <option value="contributor">Contributor</option>
              <option value="subscriber">Subscriber</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm">
              Add New User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
