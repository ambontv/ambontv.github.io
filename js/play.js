    function getParameterByName(name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(window.location.href);
    if (results) {
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    // Tambahan: jika format hash-nya seperti #rbulltv dan parameternya 'id'
    var hash = window.location.hash.substring(1); // buang tanda #
    if (!hash.includes('=') && name === 'id' && hash) {
        return decodeURIComponent(hash);
    }

    return null;
}

    var ConfiguracionCanales = {
        
		"tvri": {
            url: "https://streaming.indihometv.com/atm/DASH/TVRI/manifest.mpd",
        },
		
		"antv": {
            url: "https://op-group1-swiftservehd-1.dens.tv/s/s07/index.m3u8?app_type=web&userid=lite&chname=antv",
        },
		
		"tvone": {
            url: "https://op-group1-swiftservehd-1.dens.tv/h/h224/index.m3u8",
        },

		"indosiar": {
            url: "https://op-group1-swiftservehd-1.dens.tv/h/h235/index.m3u8?app_type=web&userid=lite&chname=indosiar",
        },

		"sctv": {
            url: "https://op-group1-swiftservehd-1.dens.tv/h/h217/index.m3u",
        },

		"rbulltv": {
            url: "https://dms.redbull.tv/v5/destination/rbtv/linear-borb/personal_computer/http/id/en/playlist.m3u8",
        },
        "spotv": {
            url: "https://fta4-cdn-flr.visionplus.id/out/v1/997ce8767b604fae9fce05379b3b8b3a/index.mpd",
            k1: "d386001215594043a8995db796ad9e9c",
            k2: "3404792cb4c804902acdc6ca65c1a298"
        }
		
		
		
    };

    var id = getParameterByName('id');
    var config = ConfiguracionCanales[id];

    if (config && config.url) {
        var sources = [];

        // Untuk file M3U8
        if (config.url.includes('.m3u8')) {
            sources.push({
                file: config.url
            });
        }

        // Untuk file MPD dengan atau tanpa ClearKey
        if (config.url.includes('.mpd')) {
            var source = {
                file: config.url
            };

            // Jika kunci ClearKey tersedia, tambahkan DRM
            if (config.k1 && config.k2) {
                source.drm = {
                    "clearkey": {
                        "keyId": config.k1,
                        "key": config.k2
                    }
                };
            }

            sources.push(source);
        }

        // Konfigurasi JW Player
        jwplayer("player").setup({
            playlist: [{
                sources: sources
            }],
            autostart: true,
            width: "100%",
            height: "100%",
            stretching: "exactfit",
            aspectratio: "16:9",
            logo: {
                file: 'https://cdn.jsdelivr.net/gh/missjav/warehouse@main/img/useetv.png',
                link: '',
                position: 'bottom-left'
            }
        });
    } else {
        console.error("Konfigurasi tidak ditemukan atau URL tidak valid.");
        // Anda bisa menampilkan fallback UI di sini
    }
