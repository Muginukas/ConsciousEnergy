-- favorites
create table if not exists public.favorites (
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  slug text not null,
  created_at timestamptz default now(),
  primary key (user_id, category, slug)
);
alter table public.favorites enable row level security;
create policy "Users manage own favorites" on public.favorites
  for all using (auth.uid() = user_id);

-- practice_logs
create table if not exists public.practice_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  slug text not null,
  practiced_at timestamptz default now(),
  duration_minutes int,
  mood text,
  notes text
);
alter table public.practice_logs enable row level security;
create policy "Users manage own logs" on public.practice_logs
  for all using (auth.uid() = user_id);

-- comments
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  slug text not null,
  body text not null,
  status text not null default 'visible',
  created_at timestamptz default now()
);
alter table public.comments enable row level security;
create policy "Anyone reads visible comments" on public.comments
  for select using (status = 'visible');
create policy "Users insert own comments" on public.comments
  for insert with check (auth.uid() = user_id);
create policy "Users delete own comments" on public.comments
  for delete using (auth.uid() = user_id);

-- ratings
create table if not exists public.ratings (
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  slug text not null,
  stars int not null check (stars between 1 and 5),
  primary key (user_id, category, slug)
);
alter table public.ratings enable row level security;
create policy "Anyone reads ratings" on public.ratings
  for select using (true);
create policy "Users manage own ratings" on public.ratings
  for all using (auth.uid() = user_id);

-- RPC: report_comment — pakeičia komentaro statusą į 'reported'
create or replace function public.report_comment(comment_id uuid)
returns void language plpgsql security definer as $$
begin
  update public.comments set status = 'reported' where id = comment_id;
end;
$$;
