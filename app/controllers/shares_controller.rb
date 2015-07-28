class SharesController < ApplicationController

  def browse
    @browse_path = '/'
    browse_request = {
      path: @browse_path,
      sort: "name",
      filters: {
        types: ["file"]
      }
    }
    @result = node_api.browse(browse_request)
    @items = @result['items'] if @result
  end

  def download_setup
    file = params[:file]
    download_request = {
      transfer_requests: [
        transfer_request: {
          source_root: '/',
          paths: [
            {
              source: file
            }
          ]
        }
      ]
    }
    download_setup = node_api.download_setup(download_request)
    render json: download_setup.to_json
  end

  def upload_setup
    upload_request = {}
    upload_setup = node_api.upload_setup(upload_request)
    render json: upload_setup.to_json
  end

  def transfer_status
    transfer_request = {}
    transfer_status = node_api.transfer(transfer_request)
    render json: transfer_status.to_json
  end

  private

  def node_api
    @node_api ||= NodeAPI.new(default_args)
  end

  def default_args
    {
      hostname: Rails.application.config.node_hostname,
      port: Rails.application.config.node_port,
      user: Rails.application.config.node_user,
      password: Rails.application.config.node_password,
      verify_ssl: false
    }
  end

end
