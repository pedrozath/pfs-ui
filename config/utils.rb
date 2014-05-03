module OS
  def OS.windows?
    (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  end

  def OS.mac?
   (/darwin/ =~ RUBY_PLATFORM) != nil
  end

  def OS.unix?
    !OS.windows?
  end

  def OS.linux?
    OS.unix? and not OS.mac?
  end
end

class Utils
    def start_server
        spawn "grunt"
        spawn "grunt connect"
        spawn "grunt watch"
    end

    def setup
        puts "Instalando o Grunt..."
        puts "Preciso da sua senha" if OS.mac?
        system "#{"sudo" if OS.mac?} npm -g install grunt"

        puts "Instalando dependencias do Grunt"
        system "npm install --save-dev"

        puts "Atualizando o Rubygems"
        system "gem update --system"

        puts "Instalando o SASS"
        system "gem install sass --verbose"

        puts "Fim"
    end

    def publish
        system "grunt"
    end
end

Utils.new.send ARGV[0]