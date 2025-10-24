import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { leadsApi, type Lead } from '../../lib/api'
import { Table, THead, TBody, TR, TH, TD } from '../../ui/components/Table'
import { Button } from '../../ui/components/Button'

export function LeadsTable() {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({ queryKey: ['leads'], queryFn: leadsApi.list })

  const remove = useMutation({
    mutationFn: (id: string) => leadsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['leads'] }),
  })

  if (isLoading) return <p className="text-sm text-muted">Loading leads…</p>
  if (isError) return <p className="text-sm text-danger">Failed to load leads.</p>

  const leads = (data || []) as Lead[]

  return (
    <Table>
      <THead>
        <TR>
          <TH>Name</TH>
          <TH>Email</TH>
          <TH>Phone</TH>
          <TH>Status</TH>
          <TH>Created</TH>
          <TH></TH>
        </TR>
      </THead>
      <TBody>
        {leads.map((l) => (
          <TR key={l.id}>
            <TD>{l.name}</TD>
            <TD>{l.email}</TD>
            <TD>{l.phone || '-'}</TD>
            <TD>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize">
                {l.status}
              </span>
            </TD>
            <TD>{new Date(l.createdAt).toLocaleDateString()}</TD>
            <TD className="text-right">
              <Button variant="outline" size="sm" onClick={() => remove.mutate(l.id)} disabled={remove.isPending}>
                Delete
              </Button>
            </TD>
          </TR>
        ))}
        {leads.length === 0 && (
          <TR>
            <TD colSpan={6}><p className="text-sm text-muted">No leads yet.</p></TD>
          </TR>
        )}
      </TBody>
    </Table>
  )
}
