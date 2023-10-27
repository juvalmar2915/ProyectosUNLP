class MainController < ApplicationController

  before_action :authenticate_user!

  def home
    #@user = User.find(params[:id])
  end
end
