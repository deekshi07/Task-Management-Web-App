import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Priority, Status, Task } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: Omit<Task, 'id'> & { id?: string }) => void;
  existingTitles: string[];
  initial?: Task | null;
}

const priorities: Priority[] = ['High', 'Medium', 'Low'];
const statuses: Status[] = ['Todo', 'In Progress', 'Done'];

export default function TaskForm({ open, onClose, onSubmit, existingTitles, initial }: Props) {
  const [title, setTitle] = useState('');
  const [revenue, setRevenue] = useState<number | ''>('');
  const [timeTaken, setTimeTaken] = useState<number | ''>('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [status, setStatus] = useState<Status | ''>('');
  const [notes, setNotes] = useState('');

  // NEW: input error states
  const [revenueError, setRevenueError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setTitle(initial.title);
      setRevenue(initial.revenue);
      setTimeTaken(initial.timeTaken);
      setPriority(initial.priority);
      setStatus(initial.status);
      setNotes(initial.notes ?? '');
    } else {
      setTitle('');
      setRevenue('');
      setTimeTaken('');
      setPriority('');
      setStatus('');
      setNotes('');
      setRevenueError(null);
      setTimeError(null);
    }
  }, [open, initial]);

  const duplicateTitle = useMemo(() => {
    const current = title.trim().toLowerCase();
    if (!current) return false;
    const others = initial ? existingTitles.filter(t => t.toLowerCase() !== initial.title.toLowerCase()) : existingTitles;
    return others.map(t => t.toLowerCase()).includes(current);
  }, [title, existingTitles, initial]);

  const canSubmit =
    !!title.trim() &&
    !duplicateTitle &&
    typeof revenue === 'number' && Number.isFinite(revenue) && revenue >= 0 &&
    typeof timeTaken === 'number' && Number.isFinite(timeTaken) && timeTaken > 0 &&
    !!priority &&
    !!status;

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === '') {
      setRevenue('');
      setRevenueError('Revenue is required');
      return;
    }
    const num = Number(v);
    if (!Number.isFinite(num) || num < 0) {
      setRevenue(num);
      setRevenueError('Enter a valid non-negative number');
    } else {
      setRevenue(num);
      setRevenueError(null);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === '') {
      setTimeTaken('');
      setTimeError('Time taken is required');
      return;
    }
    const num = Number(v);
    if (!Number.isFinite(num) || num <= 0) {
      setTimeTaken(num);
      setTimeError('Enter a positive number (> 0)');
    } else {
      setTimeTaken(num);
      setTimeError(null);
    }
  };

  const handleSubmit = () => {
    const revNum = typeof revenue === 'number' ? revenue : NaN;
    const timeNum = typeof timeTaken === 'number' ? timeTaken : NaN;

    let valid = true;
    if (!Number.isFinite(revNum) || revNum < 0) {
      setRevenueError('Enter a valid non-negative number');
      valid = false;
    }
    if (!Number.isFinite(timeNum) || timeNum <= 0) {
      setTimeError('Enter a positive number (> 0)');
      valid = false;
    }
    if (!valid) return;

    const safeTime = timeNum > 0 ? timeNum : 1;

    // Build payload including required createdAt and optional completedAt
    const createdAt = initial?.createdAt ?? new Date().toISOString();
    const completedAt = (status === 'Done')
      ? (initial?.completedAt ?? new Date().toISOString())
      : undefined;

    const basePayload: Omit<Task, 'id'> & { id?: string } = {
      title: title.trim(),
      revenue: Number.isFinite(revNum) ? revNum : 0,
      timeTaken: safeTime,
      priority: ((priority || 'Medium') as Priority),
      status: ((status || 'Todo') as Status),
      notes: notes.trim() || undefined,
      createdAt,
      completedAt,
    };

    if (initial && initial.id) {
      basePayload.id = initial.id;
    }

    onSubmit(basePayload);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            error={!!title && duplicateTitle}
            helperText={duplicateTitle ? 'Duplicate title not allowed' : ' '}
            required
            autoFocus
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Revenue"
              type="number"
              value={revenue}
              onChange={handleRevenueChange}
              inputProps={{ min: 0, step: 1 }}
              required
              fullWidth
              error={!!revenueError}
              helperText={revenueError ?? ' '}
            />
            <TextField
              label="Time Taken (h)"
              type="number"
              value={timeTaken}
              onChange={handleTimeChange}
              inputProps={{ min: 1, step: 1 }}
              required
              fullWidth
              error={!!timeError}
              helperText={timeError ?? ' '}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth required>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select labelId="priority-label" label="Priority" value={priority} onChange={e => setPriority(e.target.value as Priority)}>
                {priorities.map(p => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel id="status-label">Status</InputLabel>
              <Select labelId="status-label" label="Status" value={status} onChange={e => setStatus(e.target.value as Status)}>
                {statuses.map(s => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <TextField label="Notes" value={notes} onChange={e => setNotes(e.target.value)} multiline minRows={2} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!canSubmit}>
          {initial ? 'Save Changes' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
