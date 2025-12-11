import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { USER_API_ENDPOINT } from '@/utils/constants'
import { LogOut } from 'lucide-react'

export default function FormContent({
  formData,
  editMode,
  handleChange,
  handleSubmit,
  savePromise,
  handleSkillsChange,
  isLoading,
  handleLogout
}: any) {
  // Throw the promise to suspend
  if (savePromise) throw savePromise
  const resumeURL = formData.resumeOriginalName.startsWith('http')
    ? formData.resumeOriginalName
    : `${USER_API_ENDPOINT}/uploads/${formData.resumeOriginalName}`

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label>Full Name</Label>
        <Input
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div>
        <Label>Phone Number</Label>
        <Input
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      <div>
        <Label>Role</Label>
        <Input
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>
      <div>
        <Label>Bio</Label>
        <Input
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>
      <div>
        <Label>Location</Label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          disabled={!editMode}
        />
      </div>

      {/* Skills */}
      <div className="col-span-2">
        <Label>Skills</Label>
        {editMode ? (
          <Input
            name="skills"
            value={formData.skills.join(', ')}
            onChange={handleSkillsChange}
            placeholder="Enter skills separated by comma"
          />
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill: string, i: number) => (
              <span
                key={i}
                className="rounded-full bg-gray-900 px-3 py-1 text-sm text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
      <div>
        <Label>Resume (PDF)</Label>
        <Input
          type="file"
          name="file"
          accept=".pdf"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
              handleChange({
                target: { name: 'file', value: e.target.files[0] }
              } as any)
            }
          }}
          disabled={!editMode}
        />
        {formData.resumeOriginalName && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={formData.file}
            className="mt-1 text-sm text-gray-500"
          >
            Current file: {formData.resumeOriginalName}
          </a>
        )}
      </div>

      {/* Save Button */}
      <div className="col-span-2 w-full">
        <Button type="submit" disabled={isLoading} className="mt-4 w-full">
          {isLoading ? 'Updating...' : 'Save Changes'}
        </Button>
      </div>

      {/* Logout */}
      <div className="col-span-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleLogout}
          className="flex w-full gap-2 rounded-lg bg-red-500 text-white hover:bg-red-600 hover:text-white"
        >
          <LogOut size={16} /> Logout
        </Button>
      </div>
    </form>
  )
}
