Rails.application.routes.draw do
  get '/shares', to: 'shares#browse'
  post '/shares/download_setup', to: 'shares#download_setup'
  root to: 'shares#browse'
end
