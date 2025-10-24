// React import not required with new JSX runtime
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { leadsApi } from '../../lib/api'
import { Modal } from '../../ui/components/Modal'
import { Button } from '../../ui/components/Button'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'closed']).default('new'),
})

export function NewLeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const qc = useQueryClient()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ name: string; email: string; phone?: string; status: 'new'|'contacted'|'qualified'|'closed' }>({
    resolver: zodResolver(schema) as any,
    defaultValues: { status: 'new' },
  })

  const create = useMutation({
    mutationFn: leadsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] })
      onClose()
      reset()
    },
  })

  const onSubmit = handleSubmit((data) => create.mutate(data as any))

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-3">New Lead</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="name">Name</label>
          <input id="name" {...register('name')} className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500" />
          {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message as string}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">Email</label>
          <input id="email" {...register('email')} className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500" />
          {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message as string}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="phone">Phone</label>
          <input id="phone" {...register('phone')} className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="status">Status</label>
          <select id="status" {...register('status')} className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={create.isPending}>{create.isPending ? 'Saving…' : 'Create'}</Button>
        </div>
      </form>
    </Modal>
  )
}
