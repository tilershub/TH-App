# Supabase Edge Functions

## Deploy
```bash
supabase functions deploy push-token-sync
supabase functions deploy moderate-review
```

## Invoke locally
```bash
supabase functions serve --env-file supabase/.env
curl -i --location --request POST 'http://localhost:54321/functions/v1/push-token-sync' \
  --header 'Authorization: Bearer <user_jwt>' \
  --header 'Content-Type: application/json' \
  --data '{ "token": "ExponentPushToken[...]"}'
```

Both functions require `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set in the Edge runtime environment.
